import { NextRequest, NextResponse } from "next/server";
import DbMongoose from "../../../../../lib/db_mongoose";
import { Message } from "../../../models/Messages";
import CandidateModel from "../../../models/Candidate";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url, process.env.NEXTAUTH_URL as string);
  const employerId = searchParams.get("employerId");
  await DbMongoose();
  console.log(employerId);
  const messages = await Message.find({
    employerId: employerId,
  });

  const candidateIds = messages.map((message) => message.employeeId);
  const uniqueEmployees = Array.from(new Set(candidateIds));

  let candidates = [];

  for (let i = 0; i < uniqueEmployees.length; i++) {
    const candidate = await CandidateModel.findById(uniqueEmployees[i]);
    if (!candidate) continue;
    candidates.push(candidate);
  }

  return NextResponse.json(
    {
      message: candidates,
    },
    {
      status: 200,
    }
  );
};
