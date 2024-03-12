import DbMongoose from "../../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import Employer from "../../../models/Employer";
import { getServerSession } from "next-auth";
import JobPosteModel from "../../../models/Jobpost";
import CandidateModel from "../../../models/Candidate";

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

    const user = await CandidateModel.findOne({ email: normalizedEmail });

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

    const jobsData = await JobPosteModel.aggregate([
      {
        $project: {
          companyName: 1,
          companyDetails: 1,
          companyWebsite: 1,
          location: 1,
          industry: 1,
          position: 1,
          jobDescription: 1,
          requiredQualifications: 1,
          workingHoursPerDay: 1,
          jobRole: 1,
          websiteUrl: 1,
          savedJob: {
            $cond: {
              if: { $in: ["$_id", user.savedJobs] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return NextResponse.json(
      {
        message: "Success",
        data: jobsData,
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
