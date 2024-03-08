import DbMongoose from "@/lib/db_mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import CandidateModel from "@/app/api/models/Candidate";

export async function POST(request: Request) {
  try {
    await DbMongoose();

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

    const { jobAlerts } = await request.json();

    const user = await CandidateModel.findOne({
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

    await CandidateModel.findOneAndUpdate(
      { email: sessionData?.user?.email },
      { jobAlerts }
    );

    return NextResponse.json(
      {
        message: "Success",
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
