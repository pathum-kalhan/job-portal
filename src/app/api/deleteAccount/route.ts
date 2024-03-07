import DbMongoose from "@/lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CandidateModel from "../models/Candidate";
import EmployerModel from "../models/Employer";

export async function DELETE(request: Request) {
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

    const { userRole } = await request.json();

    const user =
      userRole === "candidate"
        ? await CandidateModel.findOne({ email: sessionData?.user?.email })
        : userRole === "employer"
        ? await EmployerModel.findOne({ email: sessionData?.user?.email })
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

    if (userRole === "candidate") {
      await CandidateModel.findOneAndDelete({
        email: user?.email,
      });
    } else if (userRole === "employer") {
      await EmployerModel.findOneAndDelete({ email: user?.email });
    }

    return NextResponse.json(
      {
        message: "Account Deleted Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error);
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
