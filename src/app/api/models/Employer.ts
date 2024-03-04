import { models, model, Schema } from "mongoose";

const EmployerSchema = new Schema({
  name: String,
  email: String,
  companyDetails: String,
  dateOfBirth: String,
  websiteUrl: String,
  profilePic: {
    image: String,
    status: {
      type: Boolean,
      default: false,
    },
  },
  password: String,
  contactNo: String,
  location: String,
  resetToken: String,
  emailVerification: {
    otpCode: String,
    status: {
      type: Boolean,
      default: false,
    },
  },
  userType: {
    type: String,
    default: "employer",
  }
},
{
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
  });

const EmployerModel = models.Employer || model("Employer", EmployerSchema);

export default EmployerModel;
