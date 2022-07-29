import dbConnection from "../../../../utils/dbConnect";
import { findUserQuestions } from "../../../../controlers/questions";

dbConnection();
const UsersQuestions = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      try {
        findUserQuestions(req, res);
      } catch (err) {
        res.status(400).send("eroor");
      }
      break;
    case "POST":
      break;
  }
};
export default UsersQuestions;
