import DbMongoose from "../../../../lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CandidateModel from "../../models/Candidate";
import ApplicationModel from "../../models/Application";
import moment from "moment";

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

    const currentDate = moment();
    const futureDate = moment().add(7, "days");

    const candidateRecentInterviews = await ApplicationModel.countDocuments({
      candidate: user._id,
      "interview.scheduleDate": {
        $gte: currentDate.toISOString(),
        $lte: futureDate.toISOString(),
      },
    });

    return NextResponse.json(
      {
        message: "Success",
        data: candidateRecentInterviews,
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
