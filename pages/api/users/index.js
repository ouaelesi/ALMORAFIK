import dbConnection from "../../../utils/dbConnect";
import { getUsers, signUp } from "../../../controlers/users";
import nextConnect from 'next-connect';
import upload from '../../../middleware/upload';

dbConnection();

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('profilePicture'));

apiRoute.get((req, res) => {
  try {
    getUsers(req, res);
  } catch (err) {
    res.status(400).send("error");
  }
});

apiRoute.post((req, res) => {
  signUp(req, res);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, since we're using multer
  },
};