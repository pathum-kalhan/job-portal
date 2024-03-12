import DbMongoose from "@/lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
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

    const { jobIdToAdd, saveStatus } = await request.json();

    if (saveStatus === "remove") {
      await CandidateModel.findOneAndUpdate(
        { email: user?.email },
        { $pull: { savedJobs: jobIdToAdd } }
      );
      return NextResponse.json(
        {
          message: "Job removed Successfully",
        },
        {
          status: 200,
        }
      );
    }

    await CandidateModel.findOneAndUpdate(
      { email: user?.email },
      { $addToSet: { savedJobs: jobIdToAdd } }
    );

    return NextResponse.json(
      {
        message: "Job saved Successfully",
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
