import dbConnection from "../../../../utils/dbConnect";
import { saveQuestion } from "../../../../controlers/saveQuestions";

dbConnection();
const ques = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      break;
    case "POST":
      saveQuestion(req, res);
      break;
  }
};

export default ques;
