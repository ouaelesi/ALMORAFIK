import dbConnection from "../../../../utils/dbConnect";
import { getUserById } from "../../../../controlers/users";

dbConnection();
const singleUserApi = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      try {
        console.log("rani hna ");
        getUserById(req, res);
      } catch (err) {
        res.status(400).send("eroor");
      }
      break;
    case "POST":
      break;
  }
};
export default singleUserApi;
