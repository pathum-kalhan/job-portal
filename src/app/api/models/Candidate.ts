import { models, model, Schema } from "mongoose";

const CandidateSchema = new Schema({
  name: String,
  email: String,
  dateOfBirth: String,
  linkedInProfileUrl: String,
  profilePic: {
    image: String,
    status: {
      type: Boolean,
      default: false,
    },
  },
  password: String,
  contactNo: String,
  emailVerification: {
    otpCode: String,
    status: {
      type: Boolean,
      default: false,
    },
  },
  userType: {
    type: String,
    default: "candidate",
  },
  cvUrl: String,
  appliedJobs: [
    {
      job: { type: Schema.Types.ObjectId, ref: "JobPost" },
      date: Date,
      cvReviewStatus: {
        type: String,
        enum: ["received", "shortListed", "rejected"],
        default: "received",
      },
    },
  ],
  experience: String,
  skills: [
    {
      skill: String,
    },
  ],
  education: String,
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

const CandidateModel = models.Candidate || model("Candidate", CandidateSchema);

export default CandidateModel;
