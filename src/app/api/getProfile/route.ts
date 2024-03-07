import DbMongoose from "../../../lib/db_mongoose";
import Candidates from "../models/Candidate";
import { NextResponse } from "next/server";
import Employer from "../models/Employer";
import { getServerSession } from "next-auth";

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

    await DbMongoose();
    const data = await request.json();

    const normalizedEmail = data?.email?.toLowerCase().trim();

    const user =
      data?.userRole === "candidate"
        ? await Candidates.findOne({ email: normalizedEmail })
        : data?.userRole === "employer"
        ? await Employer.findOne({ email: normalizedEmail })
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
