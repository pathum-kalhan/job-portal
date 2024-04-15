import DbMongoose from "../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import * as Yup from "yup";
import CandidateModel from "../../models/Candidate";
import EmployerModel from "../../models/Employer";
import bcrypt from "bcryptjs";
import AdminModel from "../../models/Admin";

export async function POST(request: Request) {
  try {
    await DbMongoose();

    const { newPassword, userType, token } = await request.json();

    const passwordValidation = Yup.object().shape({
      newPassword: Yup.string()
        .required("Password is required.")
        .max(15, "Maximum length for the password is 15.")
        .min(8, "Minimum length for the password is 8."),
    });

    const isPasswordValid = await passwordValidation?.validate({ newPassword });

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Invalid Password",
        },
        {
          status: 401,
        }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPassword, salt);

    const user =
      userType === "candidate"
        ? await CandidateModel.findOneAndUpdate(
            { resetToken: token },
            { password: encryptedPassword, resetToken: null },
            {
              new: true,
            }
          )
        : userType === "employer"
        ? await EmployerModel.findOneAndUpdate(
            { resetToken: token },
            { password: encryptedPassword, resetToken: null },
            {
              new: true,
            }
          )
        : userType === "admin"
        ? await AdminModel.findOneAndUpdate(
            { resetToken: token },
            { password: encryptedPassword, resetToken: null },
            {
              new: true,
            }
          )
        : null;

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid Token",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Password Updated",
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
