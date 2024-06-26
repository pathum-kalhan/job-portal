import { NextResponse } from "next/server";
import DbMongoose from "../../../../lib/db_mongoose";
import QuestionModel from "../../models/Question";
import EmployerModel from "../../models/Employer";
import { getServerSession } from "next-auth";
import AdminModel from "../../models/Admin";

const apiKey: string = `${process.env.SENDGRID_API_KEY}`;

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
    await DbMongoose();
    const user =
      data.createdUserRole === "employer"
        ? await EmployerModel.findOne({
            email: sessionData?.user?.email,
          })
        : data.createdUserRole === "admin"
        ? await AdminModel.findOne({
            email: sessionData?.user?.email,
          })
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

    await QuestionModel.create(data);

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
