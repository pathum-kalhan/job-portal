import DbMongoose from "../../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import JobPosteModel from "../../../models/JobPost";
import CandidateModel from "../../../models/Candidate";
import mongoose from "mongoose";
import moment from "moment";

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

    const getAllAppliedJobs = user.appliedJobs.map(
      (item: {
        job: mongoose.Types.ObjectId;
        appliedDate: Date;
        cvReviewStatus: String;
      }) => {
        return new mongoose.Types.ObjectId(item.job.id);
      }
    );

    const currentDate = moment().toDate();

    const jobsData = await JobPosteModel.aggregate([
      {
        $match: {
          $and: [
            { _id: { $nin: getAllAppliedJobs } },
            { jobExpirationDate: { $gt: currentDate } } 
          ]
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          companyName: 1,
          employer: 1,
          companyDetails: 1,
          companyWebsite: 1,
          location: 1,
          industry: 1,
          position: 1,
          jobDescription: 1,
          requiredQualifications: 1,
          jobExpirationDate: 1,
          jobType: 1,
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
