import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: String,
  questionId: String,
});

let savedQuestions =
  mongoose.models.savedQuestions ||
  mongoose.model("savedQuestions", postSchema);

export default savedQuestions;
