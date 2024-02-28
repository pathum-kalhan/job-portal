import { hashPassword } from "../../../../lib/auth";
import { backEndAccountValidation } from "../../../../utils/validations-types/employerAccount";
import DbMongoose from "../../../../lib/db_mongoose";
import Employer from "../../models/Employer";
import { Constant } from "../../../../utils/Constents";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await DbMongoose();
    if (request.method === "POST") {
      const data = await request.json();

      const accountValidations = backEndAccountValidation();

      // validate and sanitize the input
      const isValid = await accountValidations.validate(data);
      const {
        name,
        password,
        contactNo,
        websiteUrl,
        location,
        companyDetails,
      } = isValid;

      let { email } = isValid;
      email = email.toLowerCase().trim();

      const [user] = await Employer.find({ email });

      if (user && user.name) {
        return NextResponse.json(
          {
            message: `User already exists in our database. 
            If you have problems in account creation feel free to reach tech support via Email
            ${Constant?.companyEmail}`,
          },
          {
            status: 422,
          }
        );
      }

      // hash the password
      const hashedPassword = await hashPassword(password);
      // save record
      await Employer.findOneAndUpdate(
        {
          email,
        },
        {
          name,
          password: hashedPassword,
          role: "candidate",
          contactNo,
          websiteUrl,
          location,
          companyDetails,
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
