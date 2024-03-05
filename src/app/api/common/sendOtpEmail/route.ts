import { NextResponse } from "next/server";

import { randomString } from "../../../../lib/auth";
import mail from "@sendgrid/mail";
import DbMongoose from "../../../../lib/db_mongoose";
import Candidates from "../../models/Candidate";
import { Constant } from "../../../../utils/Constents";
import Employer from "../../models/Employer";

const apiKey: string = `${process.env.SENDGRID_API_KEY}`

export async function POST(request: Request) {
  try {
    await DbMongoose();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let { email, userType } = await request.json();

    const checkValidEmail = () => {
      email.test(emailRegex);
    };

    if (!checkValidEmail) {
      return NextResponse.json(
        {
          message: "Invalid email",
        },
        {
          status: 422,
        }
      );
    }

    email = email.toLowerCase().trim();

    const [user] =
      userType === "employer"
        ? await Employer.find({ email })
        : await Candidates.find({ email });

    if (user && user?.emailVerification?.status) {
      return NextResponse.json(
        {
          message: `This User already exist`,
        },
        {
          status: 403,
        }
      );
    }

    const otpCode = await randomString(4);

    // save record
    if (userType === "employer") {
      if (user?.email && !user?.name) {
        await Employer.findOneAndUpdate(
          {
            email,
          },
          {
            emailVerification: {
              otpCode: `${otpCode}`,
            },
          }
        );
      } else {
        await Employer.create({
          email,
          emailVerification: {
            otpCode: `${otpCode}`,
          },
        });
      }
    } else {
      if (user?.email && !user?.name) {
        await Candidates.findOneAndUpdate(
          {
            email,
          },
          {
            emailVerification: {
              otpCode: `${otpCode}`,
            },
          }
        );
      } else {
        await Candidates.create({
          email,
          emailVerification: {
            otpCode: `${otpCode}`,
          },
        });
      }
    }

    //  Send the verification email
    const verifyCode = otpCode;
    const templateData = { verifyCode, name: user.name };
    mail.setApiKey(apiKey);
    await mail.send({
      to: email,
      from: {
        name: `${Constant?.companyName}`,
        email: `${Constant?.companyEmail}`,
      },
      templateId: "d-3f9f400bac984a70a92e6ccd78b7f99d",
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
