import DbMongoose from "@/lib/db_mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import CandidateModel from "@/app/api/models/Candidate";
import EmployerModel from "@/app/api/models/Employer";

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

    const { userRole, featureUpdatesOptIn } = await request.json();

    const user =
      userRole === "candidate"
        ? await CandidateModel.findOne({ email: sessionData?.user?.email })
        : userRole === "employer"
        ? await EmployerModel.findOne({ email: sessionData?.user?.email })
        : null;

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

    if (userRole === "candidate") {
      await CandidateModel.findOneAndUpdate(
        { email: sessionData?.user?.email },
        { featureUpdatesOptIn }
      );
    } else if (userRole === "employer") {
      await EmployerModel.findOneAndUpdate(
        { email: sessionData?.user?.email },
        { featureUpdatesOptIn }
      );
    }

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
