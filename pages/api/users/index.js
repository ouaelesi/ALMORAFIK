import dbConnection from "../../../utils/dbConnect";
import { addUser, getUsers, signUp } from "../../../controlers/users";

dbConnection();
const singUp = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      try {
        getUsers(req, res);
      } catch (err) {
        res.status(400).send("error");
      }
      break;
    case "POST":
      signUp(req, res);
      break;
  }
};
export default singUp;
