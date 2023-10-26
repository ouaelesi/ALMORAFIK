import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: String,
  questionId: String,
  note: {
    type: Number,
    default: 0,
  },
  saved: {
    type: Boolean,
    default: false,
  },
});

let userQuestionsActions =
  mongoose.models.userQuestionsActions ||
  mongoose.model("userQuestionsActions", postSchema);

export default userQuestionsActions;
