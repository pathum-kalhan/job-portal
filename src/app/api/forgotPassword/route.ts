import DbMongoose from "@/lib/db_mongoose";
import CandidateModel from "../models/Candidate";
import { NextResponse } from "next/server";
import { Constant } from "@/utils/Constents";
import { randomString } from "@/lib/auth";
import mail from "@sendgrid/mail";
import EmployerModel from "../models/Employer";

const apiKey: string = `${process.env.SENDGRID_API_KEY}`

export async function POST(request: Request) {
  try {
    await DbMongoose();
    const { email, userType } = await request.json();
    const normalizedEmail = email.toLowerCase().trim();

    const user =
      userType === "candidate"
        ? await CandidateModel.findOne({ email: normalizedEmail })
        : await EmployerModel.findOne({ email: normalizedEmail });

    if (!user && !user.name) {
      return NextResponse.json(
        {
          message: `User not exists in our database.`,
        },
        {
          status: 404,
        }
      );
    }

    const resetToken = await randomString(2048);

    if (userType === "candidate") {
      await CandidateModel.findOneAndUpdate(
        { email: normalizedEmail },
        { resetToken }
      );
    } else {
      await EmployerModel.findOneAndUpdate(
        { email: normalizedEmail },
        { resetToken }
      );
    }

    const encodeEmail = encodeURIComponent(email);

    //  Send the verification email
    const resetLink = `${process.env.NEXTAUTH_URL}/${userType}/new-password?token=${resetToken}&email=${encodeEmail}`;
    const templateData = { resetLink, name: user.name };
    
    mail.setApiKey(apiKey);

    await mail.send({
      to: normalizedEmail,
      from: {
        name: `${Constant.companyName}`,
        email: `${Constant.companyEmail}`,
      },
      templateId: "d-01c05991ca9c4523836a50c9c50a49b3",
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
