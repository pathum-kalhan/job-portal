import { NextResponse } from "next/server";
import DbMongoose from "../../../../lib/db_mongoose";
import QuestionMModel from "../../models/Question";
import EmployerModel from "../../models/Employer";
import { getServerSession } from "next-auth";

const apiKey: string = `${process.env.SENDGRID_API_KEY}`;

export async function POST(request: Request) {

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
 
  try {
    await DbMongoose();

    const user = await EmployerModel.findOne({
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


    const data = await request.json();

    await QuestionMModel.create(data);

    return NextResponse.json(
      {
        message: "Success",
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
