import { NextRequest, NextResponse } from "next/server";
import DbMongoose from "../../../../../lib/db_mongoose";
import { getServerSession } from "next-auth";
import QuestionModel from "../../../models/Question";
import AdminModel from "../../../models/Admin";

export async function POST(request: NextRequest, response: NextResponse) {
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
    const { jobId } = await request.json();
    if (!jobId) {
      return NextResponse.json(
        {
          message:
            "Questions not found, please try again!, Redirecting to the applied jobs...",
        },
        {
          status: 404,
        }
      );
    }

    await DbMongoose();

    const user = await AdminModel.findOne({
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

    const questions = await QuestionModel.find({
      createdUserId: user?._id,
      createdUserRole:"admin"
    }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Success",
        data: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(
      {
        message:
          error.message === "string" ? error.message : "Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
