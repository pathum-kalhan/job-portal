import DbMongoose from "../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import Employer from "../../models/Employer";
import { getServerSession } from "next-auth";
import JobPosteModel from "../../models/JobPost";

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

    const user = await Employer.findOne({ email: normalizedEmail });

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

    const createdJobs = await JobPosteModel.find({
      employer: user._id,
    }).select(
      "jobType jobExpirationDate companyName companyDetails companyWebsite location industry position jobDescription requiredQualifications workingHoursPerDay jobRole websiteUrl"
    ).sort({ createdAt: -1 })

    return NextResponse.json(
      {
        message: "Success",
        data: createdJobs,
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
