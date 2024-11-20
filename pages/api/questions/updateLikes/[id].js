import dbConnection from "../../../../utils/dbConnect";
import { updateLikes } from "../../../../controlers/questions";

dbConnection();
const ques = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      break;
    case "POST":
      updateLikes(req, res);
      break;
  }
};

export default ques;
