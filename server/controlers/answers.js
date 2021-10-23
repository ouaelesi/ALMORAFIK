import answerModel from "../models/answer.js";
import questionModel from "../models/question.js";

// add answer
export const addAnswer = (req, res) => {
  const answer = new answerModel({
    answer: req.body.answer,
    creator: req.body.creator,
    question: req.body.question,
    sharedFile: req.body.sharedFile,
    likes: req.body.likes,
  });

  answer
    .save()
    .then((answer) => res.send(answer))
    .catch((err) => res.send({ message: err.message }));
  let newAnswers = [] ; 
  questionModel.findById(req.body.question)
    .then(question => {
      newAnswers = question.answers ; 
      // adding the new answer id 
      newAnswers.push(answer._id) ; 
      // updating the question's answers 
      questionModel.findByIdAndUpdate(req.body.question, {answers : newAnswers})
      .then((question) => {
    if (!question) {
      console.log("yaw makanch question");
    } else {
      console.log(question);
    }
  });
    })
};

// delete answer 
export const deleteAnswer = (req , res)=>{
    
}
