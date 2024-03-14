import { models, model, Schema } from "mongoose";

const QuizSchema = new Schema(
  {
    name: String,
    questions: {
      question: String,
      options: Array,
      answer: Schema.Types.Mixed,
    },
    questionsCount: Number,
    pointsPerQuestion: Number
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

const QuizModel = models.Quiz || model("Quiz", QuizSchema);

export default QuizModel;
