import dbConnection from "../../../../utils/dbConnect";
import { seachQuestions } from "../../../../controlers/questions";

dbConnection();
const search = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      try {
        seachQuestions(req, res);
      } catch (err) {
        res.status(400).send("eroor");
      }
      break;
    case "POST":
      break;
  }
};

export default search;
