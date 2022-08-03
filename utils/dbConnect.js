import mongoose from "mongoose";

const dbConnected = {};
const dbConnection = async () => {
  if (dbConnected.isConnected) {
  } else {
    try {
      const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`we are connecting `);
      dbConnected.isConnected = db.connections[0].readyState;
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  }
};

export default dbConnection;
