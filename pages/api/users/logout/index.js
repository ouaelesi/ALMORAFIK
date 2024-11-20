import dbConnection from "../../../../utils/dbConnect";
import { logOut } from "../../../../controlers/users";

dbConnection();
const logout = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      try {
      } catch (err) {}
      break;
    case "POST":
      try {
        logOut(req, res);
      } catch (err) {
        res.send(err.message);
      }
      break;
  }
};
export default logout;
