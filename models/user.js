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
  }
});

UserSchema.methods.comparePassword = (password, hashPassWord) => {
  return bcrypt.compareSync(password, hashPassWord);
};

let user = mongoose.models.user || mongoose.model("user", UserSchema);

export default user;
