import DbMongoose from "../../../lib/db_mongoose";
import { Message } from "../models/Messages";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const {
      employeeId,
      employerId,
      role,
      message,
      timestamp,
      displayName,
      photoURL,
    } = body;

    await DbMongoose();

    const newMessage = await Message.create({
      employeeId,
      employerId,
      message,
      role,
      timestamp,
      displayName,
      photoURL,
    });

    return NextResponse.json(
      {
        message: "Message sent",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to send message",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url, process.env.NEXTAUTH_URL as string);
  const employerId = searchParams.get("employerId");
  const employeeId = searchParams.get("employeeId");
  await DbMongoose();

  const senderMessage = await Message.find({
    employerId: employerId,
    employeeId: employeeId,
  });

  return NextResponse.json(
    {
      message: senderMessage,
    },
    {
      status: 200,
    }
  );
};
