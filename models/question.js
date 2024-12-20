import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  question: String,
  creator: String,
  creatorEmail: String,
  tags: [String],
  files: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  answers: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ["default", "suspended", "approved", "blocked"],
    default: "default",
  },
  speciality: {
    type: String,
    enum: [
      "mathematics",
      "experimental_sciences",
      "technical_maths",
      "literature_and_philosophy",
      "management_and_economics",
      "foreign_languages"
    ],
    default: "mathematics",
  },
  module:{
    type: String,
  }

  

});

let question =
  mongoose.models.question || mongoose.model("question", postSchema);

export default question;
