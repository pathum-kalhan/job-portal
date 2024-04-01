import { models, model, Schema } from "mongoose";
import JobPost from "./JobPost";

const ApplicationSchema = new Schema(
  {
    company: { type: Schema.Types.ObjectId, ref: "Employer" },
    candidate: { type: Schema.Types.ObjectId, ref: "Candidate" },
    job: { type: Schema.Types.ObjectId, ref: JobPost },
    cvReviewStatus: {
      type: String,
      enum: ["received", "shortListed", "rejected"],
      default: "received",
    },
    interview: {
      scheduleDate: String,
      status: {
        type: String,
        enum: ["not-scheduled", "scheduled", "done", "canceled"],
        default: "not-scheduled",
      },
      notes: String,
      interviewType: String,
      meetingUrl: { type: String, default: null },
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
