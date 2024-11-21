import dbConnection from "../../../../utils/dbConnect";
import { trackViewedQuestion } from "../../../../controlers/questions";
import nextConnect from 'next-connect';

dbConnection();

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post((req, res) => {
    trackViewedQuestion(req, res);
});

export default apiRoute;
