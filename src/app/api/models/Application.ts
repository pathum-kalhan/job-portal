import { models, model, Schema } from "mongoose";

const ApplicationSchema = new Schema(
  {
    company: [{ type: Schema.Types.ObjectId, ref: "Employer" }],
    candidate: [{ type: Schema.Types.ObjectId, ref: "Candidate" }],
    jobPost: [{ type: Schema.Types.ObjectId, ref: "JobPost" }],
    cvReviewStatus: {
      type: String,
      enum: ["received", "shortListed", "rejected"],
      default: "received",
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

const ApplicationModel =
  models.Application || model("Application", ApplicationSchema);

export default ApplicationModel;
