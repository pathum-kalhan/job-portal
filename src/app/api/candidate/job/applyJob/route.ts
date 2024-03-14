import DbMongoose from "../../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import CandidateModel from "../../../models/Candidate";
import ApplicationModel from "../../../models/Application";

export async function POST(request: Request) {
  try {
    const sessionData = await getServerSession();
    const data = await request.json();

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

    const email = sessionData.user?.email?.toLowerCase().trim();

    await DbMongoose();

    const user = await CandidateModel.findOne({
      email,
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

    if (!data.companyId || !user._id || !data.jobId) {
      return NextResponse.json(
        {
          message: `${!data.companyId ? "Company Id," :""} ${!user._id ? "User Id," : ""} ${!data.jobId ? "Job Id," : ""} was missing}`,
        },
        {
          status: 401,
        }
      );
    }

    const alreadyApplied = await ApplicationModel.findOne({
      company: data.companyId,
      candidate: user._id,
      job: data.jobId,
    });

    if (alreadyApplied) {
      return NextResponse.json(
        {
          message: "You Applied for the job already!",
        },
        {
          status: 403,
        }
      );
    }


    await ApplicationModel.create({
      company: data.companyId,
      candidate: user._id,
      job: data.jobId,
    });


    await CandidateModel.findOneAndUpdate(
      { email: user.email },
      {
        $addToSet: {
          appliedJobs: {
            job: data.jobId,
            appliedDate: new Date(),
          },
        },
      }
    );


    return NextResponse.json(
      {
        message: "Applied for the job successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
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
