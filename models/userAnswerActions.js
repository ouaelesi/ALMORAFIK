import mongoose from "mongoose";

const answerVoteSchema = new mongoose.Schema({
  userId: String,
  answerId: String,
  note: {
    type: Number,
    default: 0,
  },
});

let userAnswerActions =
  mongoose.models.userAnswerActions ||
  mongoose.model("userAnswerActions", answerVoteSchema);

export default userAnswerActions;