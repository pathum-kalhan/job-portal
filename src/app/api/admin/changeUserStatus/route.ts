import DbMongoose from "../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
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


    const user =
      data?.userRole === "candidate"
        ? await CandidateModel.findOneAndUpdate(
            { _id: data?.userId },
            { profileStatus: data?.profileStatus },
            {
              new: true,
            }
          )
        : data?.userRole === "employer"
        ? await EmployerModel.findOneAndUpdate(
            { _id: data?.userId },
            { profileStatus: data?.profileStatus },
            {
              new: true,
            }
          )
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

    return NextResponse.json(
      {
        message: `Successfully change user status to ${data?.profileStatus}`,
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
