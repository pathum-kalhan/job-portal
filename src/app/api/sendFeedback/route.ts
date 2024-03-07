import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import CandidateModel from "../models/Candidate";
import EmployerModel from "../models/Employer";
import mail from "@sendgrid/mail";
import { Constant } from "@/utils/Constents";

export async function POST(response: Response) {
  const apiKey: string = `${process.env.SENDGRID_API_KEY}`;

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

    const formData = await response.formData();
    const subject = formData.get("subject");
    const message = formData.get("message");
    const priorityLevel = formData.get("priorityLevel");
    const userRole = formData.get("userRole");
    const attachment = formData.get("image");
    const fileExtension = formData.get("fileExtension");
    const attachmentFileType = formData.get("fileType");
    const attachmentBlob = new Blob([attachment as BlobPart], {
      type: attachmentFileType as string,
    });

    const blobBuffer = await attachmentBlob.arrayBuffer();

    // Convert the Buffer to base64
    const base64Data = Buffer.from(blobBuffer).toString("base64");

    const user =
      userRole === "candidate"
        ? await CandidateModel.findOne({ email: sessionData?.user?.email })
        : userRole === "employer"
        ? await EmployerModel.findOne({ email: sessionData?.user?.email })
        : null;

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

    // send mail
    const templateData = {
      userRole,
      name: user.name,
      issue: subject,
      explanation: message,
      priorityLevel,
    };
    mail.setApiKey(apiKey);

    await mail.send({
      to: Constant?.companyEmail,
      from: {
        name: `${Constant?.companyName}`,
        email: Constant?.companyEmail,
      },
      subject: "New Support Ticket",
      attachments: [
        {
          content: base64Data,
          filename: `${user.name}_Attached_Image.${fileExtension}`,
          type: attachmentFileType as string,
          disposition: "attachment",
        },
      ],

      templateId: "d-19566d5ea6394e0c89e5136e9f65ac3e",
      dynamicTemplateData: templateData,
    });

    return NextResponse.json(
      {
        message: "Success",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
