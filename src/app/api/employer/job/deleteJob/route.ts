import DbMongoose from "@/lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import EmployerModel from "../../../models/Employer";
import JobPosteModel from "../../../models/JobPost";

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

    const { jobId } = await request.json();

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

    await JobPosteModel.findOneAndDelete({ _id: jobId });

    return NextResponse.json(
      {
        message: "Job Deleted Successfully",
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
