import DbMongoose from "../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import AdminModel from "../../models/Admin";
import CandidateModel from "../../models/Candidate";
import EmployerModel from "../../models/Employer";
import JobPostModel from "../../models/JobPost";
import ApplicationModel from "../../models/Application";

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

    const user = await AdminModel.findOne({ email: normalizedEmail });

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

    const { startDate, endDate } = data;

    const query: any = {};

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = startDate;
      }
      if (endDate) {
        query.createdAt.$lte = endDate;
      }
    }
    // counts with filtering
    const employersRegistrationCount = await EmployerModel.countDocuments(
      query
    );
    const candidatesRegistrationCount = await CandidateModel.countDocuments(
      query
    );

    // Calculate the monthly average registration count for candidates
    const candidateMonthlyAvgReg = await CandidateModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          totalMonths: { $sum: 1 },
          totalCount: { $sum: "$count" },
        },
      },
      {
        $project: {
          monthlyAverage: { $divide: ["$totalCount", "$totalMonths"] },
        },
      },
    ]);

    // Calculate the monthly average registration count for employers
    const employerMonthlyAvgReg = await EmployerModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          totalMonths: { $sum: 1 },
          totalCount: { $sum: "$count" },
        },
      },
      {
        $project: {
          monthlyAverage: { $divide: ["$totalCount", "$totalMonths"] },
        },
      },
    ]);

    // Total counts
    const activeTotalEmployerCount = await EmployerModel.countDocuments({
      profileStatus: "active",
    });

    const activeJobs = await JobPostModel.countDocuments({
      jobExpirationDate: {
        $gt: new Date(),
      },
    });

    const successRateCount = await ApplicationModel.aggregate([
      {
        $match: {
          cvReviewStatus: "shortListed",
        },
      },
      {
        $lookup: {
          from: "jobposts",
          localField: "job",
          foreignField: "_id",
          as: "job",
        },
      },
      {
        $lookup: {
          from: "candidates",
          localField: "candidate",
          foreignField: "_id",
          as: "candidate",
        },
      },
      {
        $unwind: "$job",
      },
      {
        $unwind: "$candidate",
      },
      {
        $addFields: {
          matchingSkills: {
            $filter: {
              input: "$job.requiredQualifications",
              as: "reqQualification",
              cond: {
                $in: ["$$reqQualification", "$candidate.skills"],
              },
            },
          },
        },
      },
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  "$job.industry",
                  { $arrayElemAt: ["$candidate.industry", 0] },
                ],
              },
              { $ne: ["$matchingSkills", []] },
            ],
          },
        },
      },
      {
        $count: "count",
      },
    ]);
    

    const activeCandidatesCount = await CandidateModel.countDocuments({
      profileStatus: "active",
    });

    const candidateSuccessRate =
      (successRateCount[0].count / activeCandidatesCount) * 100;

    const employerSuccessRates = await JobPostModel.aggregate([
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "job",
          as: "applications",
        },
      },
      {
        $group: {
          _id: null,
          totalJobPosts: { $sum: 1 },
          totalShortlistedCandidates: {
            $sum: {
              $size: {
                $filter: {
                  input: "$applications",
                  as: "app",
                  cond: { $eq: ["$$app.cvReviewStatus", "shortListed"] },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          overallSuccessRate: {
            $multiply: [
              { $divide: ["$totalShortlistedCandidates", "$totalJobPosts"] },
              100,
            ],
          },
        },
      },
    ]);

    const responseData = {
      employersRegistrationCount: employersRegistrationCount ?? 0,
      candidatesRegistrationCount: candidatesRegistrationCount ?? 0,
      activeTotalEmployerCount: activeTotalEmployerCount ?? 0,
      activeJobs: activeJobs ?? 0,
      jobMatchedAndShortlisted: successRateCount[0]?.count ?? 0,
      candidateSuccessRate: `${Math.ceil(candidateSuccessRate ?? 0)}%`,
      EmployerSuccessRate: `${Math.ceil(
        employerSuccessRates[0]?.overallSuccessRate ?? 0
      )}%`,
      candidateMonthlyAvgReg: Math.floor(
        candidateMonthlyAvgReg[0]?.monthlyAverage ?? 0
      ),
      employerMonthlyAvgReg: Math.floor(
        employerMonthlyAvgReg[0]?.monthlyAverage ?? 0
      ),
    };

    return NextResponse.json(
      {
        message: "Success",
        data: responseData,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);
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
