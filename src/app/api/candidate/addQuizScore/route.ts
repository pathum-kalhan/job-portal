import DbMongoose from "../../../../lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CandidateModel from "../../models/Candidate";

export async function POST(request: Request) {
  try {
    const data = await request.json();
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

    const user = await CandidateModel.findOneAndUpdate(
      {
        email: sessionData?.user?.email,
      },
      {
        $set: { 
          "quiz.latestScore": data.score, 
      },
        $push: {
          "quiz.attempts": {
            score: data.score,
            questionsIds: data.questionsIds,
            quizAttemptedDate: new Date(),
          },
        },
      },
      {
        new: true,
      }
    );

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
        score: "skills",
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
