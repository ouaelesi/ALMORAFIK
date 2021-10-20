import mongoose from "mongoose";
const URL =
  "mongodb+srv://ouaelSahbi:esi123aze123aze@cluster0.swcln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`we are connecting to ${connection.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
