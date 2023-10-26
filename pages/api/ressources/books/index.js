import {
  addYoutubRes,
  getBooksMut,
  getYoutubeChannels,
} from "../../../../controlers/ressources/youtube/youtubeResController";
import dbConnection from "../../../../utils/dbConnect";

dbConnection();
const booksManager = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      try {
        getBooksMut(req, res);
      } catch (err) {
        res.status(400).send(err);
      }
      break;
    case "POST":
      try {
        addYoutubRes(req, res);
      } catch (err) {
        res.status(400).send(err);
      }
      break;
  }
};
export default booksManager;
