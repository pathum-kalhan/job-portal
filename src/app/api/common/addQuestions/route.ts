import { NextResponse } from "next/server";
import DbMongoose from "../../../../lib/db_mongoose";
import QuestionMModel from "../../models/Question";

const apiKey: string = `${process.env.SENDGRID_API_KEY}`;

export async function POST(request: Request) {
  try {
    await DbMongoose();

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
