import DbMongoose from "@/lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CandidateModel from "../models/Candidate";
import { storage } from "@/utils/firebase";
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

    const formData = await request.formData();
    const image = formData.get("image");
    const fileName = formData.get("fileName");
    const userRole = formData.get("userRole");
    const imageBlob = new Blob([image as BlobPart]);

    const user =
      userRole === "candidate"
        ? await CandidateModel.findOne({ email: sessionData?.user?.email })
        : await EmployerModel.findOne({ email: sessionData?.user?.email });

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

    if (!image) {
      return NextResponse.json(
        {
          message: "Profile pic upload failed!",
        },
        {
          status: 422,
        }
      );
    }
    const storageRef = storage.ref();
    const fileRef = storageRef.child(
      `JobPortal/${userRole}/profilePics/${sessionData?.user?.email}/${sessionData?.user?.name?.split(" ")[0]}_ProfilePic`
    );

    const uploadTaskSnapshot = await fileRef.put(imageBlob, {
      contentType: "image/jpeg",
    });

    const imageUrl = await uploadTaskSnapshot.ref.getDownloadURL();

    if (imageUrl) {
      if (userRole === "candidate") {
        await CandidateModel.findOneAndUpdate(
          { email: sessionData?.user?.email },
          {
            profilePic: {
              image: imageUrl,
              status: true,
            },
          },
          { new: true }
        );
      } else {
        await EmployerModel.findOneAndUpdate(
          { email: sessionData?.user?.email },
          {
            profilePic: {
              image: imageUrl,
              status: true,
            },
          },
          { new: true }
        );
      }

      return NextResponse.json(
        {
          message: "Profile pic updated!",
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Profile pic upload failed!",
        },
        {
          status: 422,
        }
      );
    }
  } catch (error) {
    console.log("error", error)
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
