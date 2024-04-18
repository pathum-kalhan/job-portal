import { models, model, Schema } from "mongoose";
import JobPost from "./JobPost";

const CandidateSchema = new Schema(
  {
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
    industry: Array,
    emailVerification: {
      otpCode: String,
      status: {
        type: Boolean,
        default: false,
      },
    },
    profileStatus: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    userType: {
      type: String,
      default: "candidate",
    },
    cvUrl: {
      type: String,
      default: null,
    },
    appliedJobs: [
      {
        job: { type: Schema.Types.ObjectId, ref: JobPost },
        appliedDate: Date,
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
    ],
    quiz: {
      latestScore: { type: String, default: "Not done yet" },
      attempts: [
        {
          score: { type: String, default: null },
          questionsIds: [{ type: Schema.Types.ObjectId, ref: "Question" }],
          quizAttemptedDate: Date,
        },
      ],
    },
    savedJobs: [{ type: Schema.Types.ObjectId, ref: JobPost }],
    experience: String,
    skills: Array,
    education: String,
    resetToken: String,
    promoAndNewsLetterOptIn: {
      type: Boolean,
      default: false,
    },
    featureUpdatesOptIn: {
      type: Boolean,
      default: false,
    },
    jobApplicationStatus: {
      type: Boolean,
      default: false,
    },
    jobAlerts: {
      type: Boolean,
      default: false,
    },
    suspiciousActivitiesOptIn: {
      type: Boolean,
      default: false,
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

const CandidateModel = models.Candidate || model("Candidate", CandidateSchema);

export default CandidateModel;
