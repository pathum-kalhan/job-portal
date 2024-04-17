import DbMongoose from "../../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
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
    const user = await CandidateModel.findOne({ email: normalizedEmail }).populate("appliedJobs.job")

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

    const reMapJobData = user.appliedJobs.map((item:any) => { 
      return {
        _id: item?.job?._id,
        websiteUrl: item?.job?.websiteUrl,
        companyName: item?.job?.companyName,
        companyDetails: item?.job?.companyDetails,
        location: item?.job?.location,
        industry: item?.job?.industry,
        position: item?.job?.position,
        jobDescription: item?.job?.jobDescription,
        requiredQualifications: item?.job?.requiredQualifications,
        workingHoursPerDay: item?.job?.workingHoursPerDay,
        employer: item?.job?.employer,
        cvReviewStatus: item?.cvReviewStatus,
        appliedDate: item?.appliedDate,
        jobExpirationDate: item?.job?.jobExpirationDate,
        jobType: item?.job?.jobType,
      }
    })

    return NextResponse.json(
      {
        message: "Success",
        data: reMapJobData,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error)
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
