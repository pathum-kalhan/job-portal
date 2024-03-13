import DbMongoose from "@/lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
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

    const data = await request.json();

    await DbMongoose();

    const user =
      data.userRole === "candidate"
        ? await CandidateModel.findOne({ email: sessionData?.user?.email })
        : data.userRole === "employer"
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

    const getAllSkills = await CandidateModel.aggregate([
      { $unwind: "$skills" },
      { $group: { _id: "$skills" } },
      { $project: { _id: 0, skill: "$_id" } },
    ]);

    const skills = getAllSkills ? getAllSkills?.map((item) => item?.skill) : [];

    return NextResponse.json(
      {
        message: "Success",
        data: skills,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error)
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
