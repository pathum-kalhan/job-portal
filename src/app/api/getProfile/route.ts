
import DbMongoose from "../../../lib/db_mongoose";
import Candidates from "../models/Candidate";
import { NextResponse } from "next/server";
import Employer from "../models/Employer";

export async function POST(request: Request) {
  try {
    await DbMongoose();

    const data = await request.json();

    const normalizedEmail = data.email.toLowerCase().trim();

    const [user] = data.userRole === 'candidate' ?  await Candidates.find({ email: normalizedEmail }) :  await Employer.find({ email: normalizedEmail })

    return NextResponse.json(
      {
        message: "Success",
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
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