import { models, model, Schema } from "mongoose";

const QuestionSchema = new Schema(
  {
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

const QuestionMModel = models.Question || model("Question", QuestionSchema);

export default QuestionMModel;
