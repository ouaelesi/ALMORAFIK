import dbConnection from "../../../utils/dbConnect";
import { addUser, getUsers } from "../../../controlers/users";

dbConnection();
const singUp = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      try {
        // const {cookies} = req ;
        // const jwt = cookies.OurSiteJWT ;
        // if (!jwt){
        //    console.log("user dont have cookies yet") ;
        // }
        getUsers(req, res);
      } catch (err) {
        res.status(400).send("eroor");
      }
      break;
    case "POST":
      addUser(req, res);
      break;
  }
};
export default singUp;
