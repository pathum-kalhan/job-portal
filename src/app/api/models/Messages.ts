import { models, model, Schema } from "mongoose";

const ChatSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  employerId: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
  },
});

export const Message = models.Message || model("Message", ChatSchema);
