import { models, model, Schema } from "mongoose";

const QuestionSchema = new Schema(
  {
    createdUserRole: String,
    createdUserId: String,
    question: String,
    answers: [
      {
        text: String,
        isCorrect: Boolean,
      },
    ],
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

const QuestionModel = models.Question || model("Question", QuestionSchema);

export default QuestionModel;
