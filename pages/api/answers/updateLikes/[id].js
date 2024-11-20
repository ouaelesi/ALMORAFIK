import dbConnection from "../../../../utils/dbConnect";
import { updateAnsLikes } from "../../../../controlers/answers";

dbConnection();
const ans = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      break;
    case "POST":
      updateAnsLikes(req, res);
      break;
  }
};

export default ans;
