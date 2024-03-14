import { backEndAccountValidation } from "../../../../../utils/validations-types/jobPost";
import DbMongoose from "../../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import EmployerModel from "../../../models/Employer";
import { getServerSession } from "next-auth";
import JobPosteModel from "@/app/api/models/JobPost";

export async function POST(request: Request) {
  try {
    const sessionData = await getServerSession();
    const data = await request.json();

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

    const email = sessionData.user?.email?.toLowerCase().trim();

    await DbMongoose();

    const user = await EmployerModel.findOne({
      email,
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

    const accountValidations = backEndAccountValidation();

    // validate and sanitize the input
    const isValid = await accountValidations.validate(data);
    const {
      companyDetails,
      websiteUrl,
      location,
      industry,
      position,
      jobDescription,
      requiredQualifications,
      workingHoursPerDay,
    } = isValid;
      
    await JobPosteModel.create({
      companyName: user.name,
      companyDetails,
      websiteUrl,
      location,
      industry,
      position,
      jobDescription,
      requiredQualifications,
      workingHoursPerDay,
      employer:user._id
    });

    return NextResponse.json(
      {
        message: "Job post successfully created!",
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
