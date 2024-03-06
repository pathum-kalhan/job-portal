import DbMongoose from "@/lib/db_mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CandidateModel from "../../models/Candidate";
import { storage } from "@/utils/firebase";
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

    const formData = await request.formData();
    const cv = formData.get("cv");
    const fileName = formData.get("fileName");
    const userRole = formData.get("userRole");
    const cvBlob = new Blob([cv as BlobPart]);

    const user =
      userRole === "candidate"
        ? CandidateModel.findOne({ email: sessionData?.user?.email })
        : EmployerModel.findOne({ email: sessionData?.user?.email });

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

    if (!cv) {
      return NextResponse.json(
        {
          message: "CV upload failed!",
        },
        {
          status: 422,
        }
      );
    }
    const storageRef = storage.ref();
    const fileRef = storageRef.child(
      `JobPortal/${userRole}/CV/${sessionData?.user?.email}/${fileName}`
    );

    const uploadTaskSnapshot = await fileRef.put(cvBlob, {
      contentType: "application/pdf",
    });

    const pdfUrl = await uploadTaskSnapshot.ref.getDownloadURL();

    if (pdfUrl) {
      if (userRole === "candidate") {
        await CandidateModel.findOneAndUpdate(
          { email: sessionData?.user?.email },
          {
            cvUrl: pdfUrl,
          },
          { new: true }
        );
      } else if (userRole === "employer") {
        await EmployerModel.findOneAndUpdate(
          { email: sessionData?.user?.email },
          {
            cvUrl: pdfUrl,
          },
          { new: true }
        );
      } else {
        return NextResponse.json(
          {
            message: "CV upload failed!",
          },
          {
            status: 422,
          }
        );
      }

      return NextResponse.json(
        {
          message: "CV updated!",
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "CV upload failed!",
        },
        {
          status: 422,
        }
      );
    }
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
