import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  answer: String,
  creator: String,
  question: String,
  sharedFile: String,
  likes: {
    type: Number,
    default: 0,
  },
});

const answer = mongoose.models.answer || mongoose.model("answer", postSchema);

export default answer;
