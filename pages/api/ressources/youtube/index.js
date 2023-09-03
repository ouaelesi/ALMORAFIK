import {
  addYoutubRes,
  getYoutubeChannels,
} from "../../../../controlers/ressources/youtube/youtubeResController";
import dbConnection from "../../../../utils/dbConnect";

dbConnection();
const youtubManager = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      try {
        console.log("here");
        getYoutubeChannels(req, res);
      } catch (err) {
        res.status(400).send("eroor");
      }
      break;
    case "POST":
      try {
        addYoutubRes(req, res);
      } catch (err) {
        res.status(400).send("eroor");
      }
      break;
  }
};
export default youtubManager;
