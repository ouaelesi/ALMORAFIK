import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  role: {
    type : mongoose.Schema.Types.ObjectId,
    ref : "role",
    required: true
  },
  photo: {
    type: String,
    default: null,
  },
  level: {
    type: Number,
    default: 0,
  },
  googleId : {
    type: String,
    default: null
  },
  wilaya : {
    type : String,
    default: null
  },
  level: {
    type: String,
    enum: ["1AS", "2AS", "3AS"],
    default: "3AS",
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
});

UserSchema.methods.comparePassword = (password, hashPassWord) => {
  return bcrypt.compareSync(password, hashPassWord);
};

let user = mongoose.models.user || mongoose.model("user", UserSchema);

export default user;
