import DbMongoose from "../../../../../lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import EmployerModel from "../../../models/Employer";
import JobPostModel from "../../../models/JobPost";
import ApplicationModel from "../../../models/Application";

export async function POST() {
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

    const applications = await ApplicationModel.find({
      company: user._id,
      cvReviewStatus: "shortListed",
    })
      .populate({ path: "job", model: JobPostModel })
      .populate("candidate").sort({ createdAt: -1 })

    const reMapApplications = applications.map((item) => {
      const jobSkills = item?.job?.requiredQualifications?.map(
        (itemSkill: string, i: number) =>
          i === item?.candidate?.skills?.length - 1
            ? `${itemSkill}`
            : `${itemSkill}, `
      );

      const candidateSkills = item?.candidate?.skills?.map(
        (itemSkill: string, i: number) =>
          i === item?.candidate?.skills?.length - 1
            ? `${itemSkill}`
            : `${itemSkill}, `
      );

      const interview =
        item?.interview.status !== "not-scheduled"
          ? {
              jobApplicationId: item?._id,
              jobId: item?.job?._id,
              candidateId: item?.candidate?._id,
              applicationStatus: item?.cvReviewStatus,

              status: item?.interview.status,
              scheduleDate: item?.interview?.scheduleDate,
              interviewType: item?.interview?.interviewType,
              meetingUrl: item?.interview?.meetingUrl,
              notes: item?.interview?.notes,
            }
          : {
              jobApplicationId: item?._id,
              jobId: item?.job?._id,
              candidateId: item?.candidate?._id,
              applicationStatus: item?.cvReviewStatus,

              status: "",
              scheduleDate: "",
              interviewType: "",
              meetingUrl: "",
              notes: "",
            };

      return {
        _id: item?._id,
        jobId: item?.job?._id,
        candidateId: item?.candidate?._id,
        candidateCVUrl: item?.candidate?.cvUrl,
        name: item?.candidate?.name,
        email: item?.candidate?.email,
        dateOfBirth: item?.candidate?.dateOfBirth,
        jobRole: item?.job?.position,
        applicationStatus: item?.cvReviewStatus,
        industry: item?.job?.industry,
        jobSkills,
        candidateSkills,
        resultOfTheQuiz: item?.candidate?.quiz.latestScore ?? "Not done yet",
        interview,
      };
    });

    return NextResponse.json(
      {
        message: "Success",
        data: reMapApplications,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
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
