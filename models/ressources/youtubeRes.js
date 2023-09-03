import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  channel: String,
  userName: String,
  followers: String,
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

const youtuberes =
  mongoose.models.youtuberes || mongoose.model("youtuberes", postSchema);

export default youtuberes;
