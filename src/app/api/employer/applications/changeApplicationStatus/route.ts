import DbMongoose from "../../../../../lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CandidateModel from "../../../models/Candidate";
import EmployerModel from "../../../models/Employer";
import ApplicationModel from "../../../models/Application";

export async function POST(request: Request) {
  try {
    const sessionData = await getServerSession();
    if (!sessionData) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await DbMongoose();

    const user = await EmployerModel.findOne({
      email: sessionData?.user?.email,
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { jobId, candidateId, jobApplicationId, cvReviewStatus } =
      await request.json();

    await CandidateModel.updateOne(
      {
        _id: candidateId,
        "appliedJobs.job": jobId,
      },
      {
        $set: {
          "appliedJobs.$.cvReviewStatus": cvReviewStatus,
        },
      }
    );

    await ApplicationModel.updateOne(
      {
        _id: jobApplicationId,
      },
      {
        $set: {
          cvReviewStatus: cvReviewStatus,
        },
      }
    );

    return NextResponse.json(
      {
        message: "Job status changed Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
