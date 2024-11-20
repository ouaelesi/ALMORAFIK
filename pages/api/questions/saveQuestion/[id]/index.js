import {
  isQuestionSaved,
  saveQuestion,
} from "../../../../../controlers/questionActions/saveQuestions";
import dbConnection from "../../../../../utils/dbConnect";

dbConnection();
const ques = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      isQuestionSaved(req, res);
      break;
    case "POST":
      saveQuestion(req, res);
      break;
  }
};

export default ques;
