import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  _idUser: String,
  _idResource: String,
  note: {
    type: Number,
    default: 0,
  },
  saved: {
    type: Boolean,
    default: false,
  },
});

const resourceUserActions =
  mongoose.models.resourceUserActions ||
  mongoose.model("resourceUserActions", postSchema);

export default resourceUserActions;
