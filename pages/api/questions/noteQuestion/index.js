import dbConnection from "../../../../utils/dbConnect";
import { noteQuestion } from "../../../../controlers/questionActions/noteQuestion";

dbConnection();
const ques = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      break;
    case "POST":
      noteQuestion(req, res);
      break;
  }
};

export default ques;
