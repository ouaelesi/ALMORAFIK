import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  subTitle: String,
  type: String,
  tags: [String],
  description: String,
  likes: {
    type: Number,
    default: 0,
  },
  image: String,
  link: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

let resources =
  mongoose.models.resources || mongoose.model("resources", postSchema);

export default resources;
