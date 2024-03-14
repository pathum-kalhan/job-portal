import DbMongoose from "../../../lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CandidateModel from "../models/Candidate";
import EmployerModel from "../models/Employer";

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

    const {
      userType,
      name,
      linkedInProfileUrl,
      contactNo,
      companyDetails,
      location,
      education,
      experience,
      skills,
      websiteUrl,
    } = await request.json();

    const user =
      userType === "candidate"
        ? await CandidateModel.findOne({ email: sessionData?.user?.email })
        : await EmployerModel.findOne({
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

    if (userType === "candidate") {
      await CandidateModel.findOneAndUpdate(
        { email: sessionData?.user?.email },
        {
          name,
          linkedInProfileUrl,
          contactNo,
          education,
          experience,
          skills,
        }
      );
    } else {
      await EmployerModel.findOneAndUpdate(
        { email: sessionData?.user?.email },
        {
          name,
          contactNo,
          companyDetails,
          location,
          websiteUrl
        }
      );
    }

    return NextResponse.json(
      {
        message: "Profile updated successfully",
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
