import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  _idUser: { type: String, required: true },
  _idResource: { type: String, required: true },
  note: {
    type: Number,
    default: 0,
  },
  saved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const resourceUserActions =
  mongoose.models.resourceUserActions ||
  mongoose.model("resourceUserActions", postSchema);

export default resourceUserActions;