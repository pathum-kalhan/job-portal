import { models, model, Schema } from "mongoose";

const JobPostSchema = new Schema(
  {
    companyName: String,
    employer: {
      type: Schema.Types.ObjectId,
      ref: "Employer",
    },
    companyDetails: String,
    websiteUrl: String,
    location: String,
    industry: String,
    position: String,
    jobDescription: String,
    requiredQualifications: Array,
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
