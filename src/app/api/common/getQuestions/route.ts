import { NextRequest, NextResponse } from "next/server";
import DbMongoose from "../../../../lib/db_mongoose";
import CandidateModel from "../../models/Candidate";
import { getServerSession } from "next-auth";
import JobPostModel from "../../models/JobPost";

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
          message: "Questions not found, please try again!, Redirecting to the applied jobs...",
        },
        {
          status: 404,
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

    const getQuestionsIdArray = await JobPostModel.findById(jobId)
      .populate("questionsSet.question")
      .lean()
      .exec();

    // @ts-ignore
    const remapQuestions = getQuestionsIdArray?.questionsSet?.map(
      (item: { question: any }) => item?.question
    ).filter((item: any)=> item)
    return NextResponse.json(
      {
        message: "Success",
        data: remapQuestions,
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
