import DbMongoose from "../../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import CandidateModel from "../../../models/Candidate";
import mongoose from "mongoose";

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

    const user = await CandidateModel.findOne({
      email: normalizedEmail,
    }).populate("savedJobs");

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

    const getAllAppliedJobs = user.appliedJobs.map(
      (item: {
        job: mongoose.Types.ObjectId;
        appliedDate: Date;
        cvReviewStatus: String;
      }) => {
        return item.job.toString();
      }
    );

    const filteredSavedJobs = user.savedJobs.map((item: any) => {
      if (getAllAppliedJobs.includes(item._id.toString())) {
        return {
          _id: item._id,
          companyName: item.companyName,
          employer: item.employer,
          companyDetails: item.companyDetails,
          websiteUrl: item.websiteUrl,
          location: item.location,
          industry: item.industry,
          position: item.position,
          jobDescription: item.jobDescription,
          requiredQualifications: item.requiredQualifications,
          workingHoursPerDay: item.workingHoursPerDay,
          alreadyApplied: true,
          jobExpirationDate: item.jobExpirationDate,
          jobType: item.jobType,
        };
      }
      return {
        _id: item._id,
        companyName: item.companyName,
        employer: item.employer,
        companyDetails: item.companyDetails,
        websiteUrl: item.websiteUrl,
        location: item.location,
        industry: item.industry,
        position: item.position,
        jobDescription: item.jobDescription,
        requiredQualifications: item.requiredQualifications,
        workingHoursPerDay: item.workingHoursPerDay,
        alreadyApplied: false,
        jobExpirationDate: item.jobExpirationDate,
        jobType: item.jobType,
      };
    });

    return NextResponse.json(
      {
        message: "Success",
        data: filteredSavedJobs,
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
