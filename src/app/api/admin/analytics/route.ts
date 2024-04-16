import DbMongoose from "../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import AdminModel from "../../models/Admin";
import CandidateModel from "../../models/Candidate";
import EmployerModel from "../../models/Employer";

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
    const data = await request.json();

    const normalizedEmail = data?.email?.toLowerCase().trim();

    const user = await AdminModel.findOne({ email: normalizedEmail });

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

    const { startDate, endDate } = data;

    const query: any = {};

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = startDate;
      }
      if (endDate) {
        query.createdAt.$lte = endDate;
      }
    }

    const employersRegistrationCount = await EmployerModel.countDocuments(query);
    const candidatesRegistrationCount = await CandidateModel.countDocuments(query);
      const activeTotalEmployerCount = await EmployerModel.countDocuments({
         profileStatus: "active" 
    });
      
      const responseData = {
          employersRegistrationCount,
          candidatesRegistrationCount,
          activeTotalEmployerCount,
      }

    return NextResponse.json(
      {
        message: "Success",
        data: responseData,
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
