import { models, model, Schema } from "mongoose";
import QuestionModel from "./Question";

const JobPostSchema = new Schema(
  {
    companyName: String,
    employer: {
      type: Schema.Types.ObjectId,
      ref: "Employer",
    },
    companyDetails: String,
    jobExpirationDate: Date,
    websiteUrl: String,
    location: String,
    industry: String,
    jobType: String,
    position: String,
    jobDescription: String,
    requiredQualifications: Array,
    questionsSet: [
      {
        question: { type: Schema.Types.ObjectId, ref: QuestionModel },
      },
    ],
    workingHoursPerDay: {
      type: Number,
      default: 8,
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

const JobPostModel = models.JobPost || model("JobPost", JobPostSchema);

export default JobPostModel;
