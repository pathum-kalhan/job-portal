import DbMongoose from "../../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import CandidateModel from "@/app/api/models/Candidate";
import ApplicationModel from "@/app/api/models/Application";

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

    await CandidateModel.findOneAndUpdate(
      { email: user.email },
      {
        $addToSet: {
              appliedJobs: {
                job: data.jobId,
                appliedDate: new Date()
              },        
        },
      }
    );
      
      await ApplicationModel.create({
          company: data.companyId,
          candidate: user._id,
          jobPost: data.jobId,
    });

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
