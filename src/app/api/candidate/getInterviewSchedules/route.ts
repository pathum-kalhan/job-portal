import DbMongoose from "../../../../lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CandidateModel from "../../models/Candidate";
import ApplicationModel from "../../models/Application";

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

    const data = await request.json();
    const normalizedEmail = data?.email?.toLowerCase().trim();

    await DbMongoose();

    const user = await CandidateModel.findOne({
      email: normalizedEmail,
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

    const candidateAllInterviews = await ApplicationModel.find({
      candidate: user._id,
      "interview.scheduleDate": {
        $gte: new Date().toISOString(),
      },
    });

    return NextResponse.json(
      {
        message: "Success",
        data: candidateAllInterviews,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
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
