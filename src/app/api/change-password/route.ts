import DbMongoose from "../../../lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CandidateModel from "../models/Candidate";
import EmployerModel from "../models/Employer";
import bcrypt from "bcryptjs";

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
    const { oldPassword, newPassword, userType } = await request.json();
  

    // check old password is correct
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
      )
    }
    
    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user?.password
    );

    if (!isOldPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Incorrect old password",
        },
        {
          status: 401,
        }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const newEncryptedPassword = await bcrypt.hash(newPassword, salt);

    if (userType === "candidate") {
  await CandidateModel.findOneAndUpdate(
        { email: sessionData?.user?.email },
        { password: newEncryptedPassword },
        { new: true }
      );
    } else {
      await EmployerModel.findOneAndUpdate(
        { email: sessionData?.user?.email },
        { password: newEncryptedPassword },
        { new: true }
      );
    }

    return NextResponse.json(
      {
        message: "Password updated successfully",
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
