import express from "express";
import router from "./routes/router.js";
import connectDB from "./data/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "config.env" });

const server = express();
connectDB();
const PORT = process.env.PORT || 8000;

server.use(express.json());
server.use(express.urlencoded({extended : true}))
server.use("/", router);


server.listen(PORT, () => {
  console.log("listening !! to " + PORT);
});

//   mongoose.set('useFindAndModify', false);
