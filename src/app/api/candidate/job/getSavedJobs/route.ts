import DbMongoose from "../../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import Employer from "../../../models/Employer";
import { getServerSession } from "next-auth";
import JobPosteModel from "../../../models/Jobpost";
import CandidateModel from "../../../models/Candidate";

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
    const data = await request.json();

    const normalizedEmail = data?.email?.toLowerCase().trim();

    const user = await CandidateModel.findOne({ email: normalizedEmail }).populate("savedJobs");

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

    return NextResponse.json(
      {
        message: "Success",
        data: user.savedJobs,
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
