import dbConnection from "../../../utils/dbConnect";
import { logIn } from "../../../controlers/users";

dbConnection();
const logInFun = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "POST":
      logIn(req, res);
      break;
  }
};

export default logInFun;
