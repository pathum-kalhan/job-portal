import { models, model, Schema } from "mongoose";

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
    cvUrl: {
      type: String,
      default: null,
    },
    appliedJobs: [
      {
        job: { type: Schema.Types.ObjectId, ref: "JobPost" },
        appliedDate: Date,
        cvReviewStatus: {
          type: String,
          enum: ["received", "shortListed", "rejected"],
          default: "received",
        },
        quiz: {
        score: { type: Number, default: null },
        status: { type: String, enum: ["completed", "incomplete"], default: "incomplete" },
        quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
        quizResult: { type: String, enum: ["pass", "fail"], default: "incomplete" },
        quizAttemptedDate: {type:Date, default:null},
        quizCompletedDate: {type:Date, default:null},
        quizAttempted: { type: Boolean, default: false },
        quizCompleted: { type: Boolean, default: false },
      }
      },
    ],
    savedJobs: [{ type: Schema.Types.ObjectId, ref: "JobPost" }],
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
