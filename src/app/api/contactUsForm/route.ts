import { NextResponse } from "next/server";
import mail from "@sendgrid/mail";
import { Constant } from "../../../utils/Constents";

export async function POST(request: Request) {
  const apiKey: string = `${process.env.SENDGRID_API_KEY}`;

  try {

    const { message, senderEmail, SenderName} = await request.json();

    // send mail
    const templateData = {
      name: SenderName,
      message,
      email: senderEmail,
    };
      
    mail.setApiKey(apiKey);

    await mail.send({
      to: Constant?.companyEmail,
      from: {
        name: Constant?.companyName,
        email: Constant?.companyEmail,
      },
      subject: "New contact us enquiry",
      templateId: "d-7303392af9604be3be29fa5dd8d4d89c",
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
