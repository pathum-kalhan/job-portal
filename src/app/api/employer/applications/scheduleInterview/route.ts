import DbMongoose from "../../../../../lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CandidateModel from "../../../models/Candidate";
import EmployerModel from "../../../models/Employer";
import ApplicationModel from "../../../models/Application";
import mail from "@sendgrid/mail";
import { Constant } from "../../../../../utils/Constents";
import { twentyFourToTwelveHours } from "../../../../../utils/convert/twentyFourToTwelveHours";

const apiKey: string = `${process.env.SENDGRID_API_KEY}`;

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

    const { candidateId, jobId, scheduleInfo, jobApplicationId } =
      await request.json();

    const candidate = await CandidateModel.findOneAndUpdate(
      {
        _id: candidateId,
        "appliedJobs.job": jobId,
      },
      {
        $set: {
          "appliedJobs.$.interview.scheduleDate": scheduleInfo?.dateAndTime,
          "appliedJobs.$.interview.status": "scheduled",
          "appliedJobs.$.interview.interviewType": scheduleInfo?.interviewType,
          "appliedJobs.$.interview.meetingUrl": scheduleInfo?.meetingUrl,
          "appliedJobs.$.interview.notes": scheduleInfo?.notes,
        },
      },
      { new: true }
    );

    const application = await ApplicationModel.findOneAndUpdate(
      {
        _id: jobApplicationId,
      },
      {
        $set: {
          "interview.scheduleDate": scheduleInfo?.dateAndTime,
          "interview.status": "scheduled",
          "interview.interviewType": scheduleInfo?.interviewType,
          "interview.meetingUrl": scheduleInfo?.meetingUrl,
          "interview.notes": scheduleInfo?.notes,
        },
      },
      { new: true }
    ).populate("job");

    //  Send the schedule email
    const templateData = {
      position: application.job.position,
      companyName: application.job.companyName,
      companyDetails: application.job.companyDetails,
      location: application.job.location,
      industry: application.job.industry,
      jobDescription: application.job.jobDescription,

      scheduleDate: `${scheduleInfo?.dateAndTime.split("T")[0]} at ${twentyFourToTwelveHours(scheduleInfo?.dateAndTime.split("T")[1])}`,
      interviewType: scheduleInfo?.interviewType,
      meetingUrl: scheduleInfo?.meetingUrl ?? "#",
      notes: scheduleInfo?.notes,
    };

    // Interview
    mail.setApiKey(apiKey);
    await mail.send({
      to: candidate?.email,
      from: {
        name: `${Constant?.companyName}`,
        email: `${Constant?.companyEmail}`,
      },
      templateId: scheduleInfo?.interviewType === "remote" ? "d-1b1310e9ddcc4204ace12b9be79602e4" : "d-e5dc3de473bd4169baabc61ae0a2fe24",
      dynamicTemplateData: templateData,
    });

    return NextResponse.json(
      {
        message: "Interview Scheduled Successfully",
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
