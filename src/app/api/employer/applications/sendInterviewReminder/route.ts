import DbMongoose from "../../../../../lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
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

    const { jobApplicationId } = await request.json();


    const application = await ApplicationModel.findOne(
      {
        _id: jobApplicationId,
      }
    ).populate("job candidate");

    //  Send the Reminder email
    const templateData = {
      position: application?.job?.position,
      companyName: application?.job?.companyName,
      companyDetails: application?.job?.companyDetails,
      location: application?.job?.location,
      industry: application?.job?.industry,
      jobDescription: application?.job?.jobDescription,

      scheduleDate: `${application?.interview?.scheduleDate?.split("T")[0]} at ${twentyFourToTwelveHours(application?.interview?.scheduleDate?.split("T")[1])}`,
      interviewType: application?.interview?.interviewType,
      meetingUrl: application?.interview?.meetingUrl ?? "#",
      notes: application?.interview?.notes,
    };

    // Interview
    mail.setApiKey(apiKey);
    await mail.send({
      to: application?.candidate?.email,
      from: {
        name: `${Constant?.companyName}`,
        email: `${Constant?.companyEmail}`,
      },
      templateId: application?.interview?.interviewType === "remote" ? "d-0ebc740b94fa463394cd632cf5e3e1f8" : "d-cbf4c511a09f443b970f283877f821fa",
      dynamicTemplateData: templateData,
    });

    return NextResponse.json(
      {
        message: "Reminder sent Successfully",
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
