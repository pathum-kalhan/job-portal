import { NextResponse } from "next/server";
import DbMongoose from "../../../../lib/db_mongoose";
import QuestionMModel from "../../models/Question";
import CandidateModel from "../../models/Candidate";
import { getServerSession } from "next-auth";

const apiKey: string = `${process.env.SENDGRID_API_KEY}`;

export async function GET() {
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

    const user = await CandidateModel.findOne({ email: sessionData?.user?.email })

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


     const randomQuestions = await QuestionMModel.aggregate([
        { $sample: { size: 10 } }
      ]);
 
    return NextResponse.json(
      {
        message: "Success",
        data:randomQuestions
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
