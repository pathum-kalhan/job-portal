import { models, model, Schema } from "mongoose";

const AdminSchema = new Schema(
  {
    name: String,
    email: String,
    profilePic: {
      image: String,
      status: {
        type: Boolean,
        default: false,
      },
    },
    password: String,
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
      default: "admin",
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

const AdminModel = models.Admin || model("Admin", AdminSchema);

export default AdminModel;
