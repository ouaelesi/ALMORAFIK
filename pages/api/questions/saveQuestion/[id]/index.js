import dbConnection from "../../../../../utils/dbConnect";
import {
  isQuestionSaved,
  saveQuestion,
} from "../../../../../controlers/saveQuestions";

dbConnection();
const ques = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      isQuestionSaved(req , res);
      break;
    case "POST":
      //   saveQuestion(req, res);
      break;
  }
};

export default ques;
