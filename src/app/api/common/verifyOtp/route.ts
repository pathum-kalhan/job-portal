import { NextResponse } from "next/server";
import DbMongoose from "../../../../lib/db_mongoose";
import Employer from "../../models/Employer";
import Candidates from "../../models/Candidate";

const apiKey: string = process.env.SENDGRID_API_KEY!;

export async function POST(request: Request) {
  try {
    await DbMongoose();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let { email, otpCode, userType } = await request.json();
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

    if (user.emailVerification.otpCode === otpCode) {
      // save record
      if (userType === "candidate") {
        const getCandidate = await Candidates.findOneAndUpdate(
          { email },
          {
            emailVerification: {
              status: true,
            },
          },
          {
            upsert: true,
            new: true,
          }
        );
        
      } else {
        const getEmployer = await Employer.findOneAndUpdate(
          { email },
          {
            emailVerification: {
              status: true,
            },
          },
          {
            upsert: true,
            new: true,
          }
        );

      }

      return NextResponse.json(
        {
          message: `User is verified`,
        },
        {
          status: 200,
        }
      );
    }

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
