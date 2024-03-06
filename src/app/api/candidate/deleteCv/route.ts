import DbMongoose from "@/lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CandidateModel from "../../models/Candidate";
import EmployerModel from "../../models/Employer";

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
        ? CandidateModel.findOne({ email: sessionData?.user?.email })
        : EmployerModel.findOne({ email: sessionData?.user?.email });

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
      await CandidateModel.findOneAndUpdate(
        { email: sessionData?.user?.email },
        { cvUrl: null }
      );
    } else {
      await EmployerModel.findOneAndUpdate(
        { email: sessionData?.user?.email },
        { cvUrl: null }
      );
    }

    return NextResponse.json(
      {
        message: "Cv Deleted Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
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
