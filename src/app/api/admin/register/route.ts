import { backEndAccountValidation } from "../../../../utils/backend-yup-validations/candidateAccount";
import DbMongoose from "../../../../lib/db_mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import AdminModel from "../../models/Admin";
import CandidateModel from "../../models/Candidate";
import EmployerModel from "../../models/Employer";

export async function POST(request: Request) {
  try {
    await DbMongoose();
    if (request.method === "POST") {
      const data = await request.json();
      const accountValidations = backEndAccountValidation();

      // validate and sanitize the input
      const isValid = await accountValidations.validate(data);
      const { name, password, email } = isValid;

      const emailLowerCase = email.toLowerCase().trim();

      const candidate = await CandidateModel.findOne({ email: emailLowerCase });
      if (candidate && candidate?.name) {
        return NextResponse.json({
          message: `User already exists in our database as other user.
          this email can't register as a Admin`,
        });
      }

      const employer = await EmployerModel.findOne({ email: emailLowerCase });
      if (employer && employer?.name) {
        return NextResponse.json({
          message: `User already exists in our database as other user.
          this email can't register as a Admin`,
        });
      }

      const user = await AdminModel.findOne({ email: emailLowerCase });

      if (user && user?.name) {
        return NextResponse.json(
          {
            message: "User already exists in our database as admin.",
          },
          {
            status: 422,
          }
        );
      }

      // hash the password
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      // save record
      await AdminModel.findOneAndUpdate(
        {
          email: emailLowerCase,
        },
        {
          name,
          password: encryptedPassword,
          role: "admin",
        },
        {
          upsert: true,
          new: true,
        }
      );

      return NextResponse.json(
        {
          message: "Registration Success",
        },
        {
          status: 200,
        }
      );
    }
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
