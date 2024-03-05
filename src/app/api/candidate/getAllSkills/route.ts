import DbMongoose from "@/lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CandidateModel from "../../models/Candidate";

export async function GET() {
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

    const user = await CandidateModel.findOne({
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
      
    const getAllSkills = await CandidateModel.aggregate([
        { $unwind: "$skills" },
        { $group: { _id: "$skills" } },
        { $project: { _id: 0, skill: "$_id" } },
    ]);
      
      const skills = getAllSkills ? getAllSkills?.map(item => item?.skill) : []
      
      return NextResponse.json(
          {
              message: "Success" ,
              data: skills
          },
          {
              status:200
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
