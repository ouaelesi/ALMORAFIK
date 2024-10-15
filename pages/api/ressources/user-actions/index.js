import { noteResource } from "../../../../controlers/ressources/user-actions";
import dbConnection from "../../../../utils/dbConnect";

dbConnection();
const resourceUserActions = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      res.status(400).send("its here ");

      break;
    case "POST":
      try {
        noteResource(req, res);
      } catch {
        (err) => {
          res.status(500).send("some error occured");
        };
      }

      break;
  }
};
export default resourceUserActions;
