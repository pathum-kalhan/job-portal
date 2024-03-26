import { NextRequest, NextResponse } from "next/server";
import DbMongoose from "../../../../../lib/db_mongoose";
import { Message } from "../../../models/Messages";
import EmployerModel from "../../../models/Employer";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url, process.env.NEXTAUTH_URL as string);
  const employeeId = searchParams.get("employeeId");
  await DbMongoose();

  const messages = await Message.find({});

  const employerIds = messages.map((message) => message.employerId);
  const uniqueEmployers = Array.from(new Set(employerIds));
  let employers = [];

  for (let i = 0; i < uniqueEmployers.length; i++) {
    const employer = await EmployerModel.findById(uniqueEmployers[i]);
    employers.push(employer);
  }

  return NextResponse.json(
    {
      message: employers,
    },
    {
      status: 200,
    }
  );
};
