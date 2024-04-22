import DbMongoose from "../../../../lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import EmployerModel from "../../models/Employer";
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

    const user = await EmployerModel.findOne({
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

    const employerAllInterviews = await ApplicationModel.find({
      company: user._id,
      "interview.scheduleDate": {
        $gte: new Date().toISOString(),
      },
    });

    return NextResponse.json(
      {
        message: "Success",
        data: employerAllInterviews,
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
