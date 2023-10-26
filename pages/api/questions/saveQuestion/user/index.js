import dbConnection from "../../../../../utils/dbConnect";

dbConnection();
const ques = async (req, res) => {
  const method = req.method;

  switch (method) {
    case "GET":
      // getUserSavedQuestions(req, res);
      
      break;
    case "POST":
      break;
  }
};

export default ques;
