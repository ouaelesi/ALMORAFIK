import dbConnection from "../../../../utils/dbConnect";
import { updateQuestion, deleteQuestion , findOneQuestion } from "../../../../controlers/questions";

dbConnection();
export default async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      findOneQuestion(req, res);
      break;
    case "PUT":
      updateQuestion(req, res);
      break;
    case "DELETE":
      deleteQuestion(req, res);
      break;
  }
};
