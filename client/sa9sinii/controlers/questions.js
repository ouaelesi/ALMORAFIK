import questionModel from "../models/question";
import answerModel from '../models/answer'

// add question 
export const addQuestion = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "request empty!!", data: req.body });
    return;
  }
  const question = new questionModel({
    question: req.body.question,
    creator: req.body.creator,
    tags: req.body.tags,
    selectedFile: req.body.selectedFile,
    likeCount: req.body.likes,
    createdAt: req.body.createdAt,
    answers: req.body.answers,
  });
  question
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some errors occured",
      });
    });
};

// delete one question by id 
export const deleteQuestion = (req, res) => {
  const id = req.query.id;
  questionModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `can not delete message ${id}` });
      } else {
        res.send("Message deleted succesfully!!");
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message || "error occured!" });
    });
};


// update one question by id 
export const updateQuestion = (req, res) => {
  if (!req.body) {
    res.status(400).send("body empty !!");
    return;
  }

  const id = req.query.id;

  questionModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `can not update question ${id}` });
      } else {
        res.send(data);
      }
    })
    .catch((err) =>
      res.status(400).send({ massage: err.message || "error occured !!" })
    );
};

// Get question by id 
export const findOneQuestion = (req, res) => {
  const id = req.query.id;
  questionModel.findById(id).then((question) => res.status(200).send(question));
};

// get all questions
export const findQuestion = (req, res) => {
  questionModel
    .find()
    .then((question) => res.send(question))
    .catch((err) =>
      res.status(400).send({ message: err.message || "error occured !!" })
    );
};

export const test = (req, res) => {
  res.send("this is working from the tast function ! ");
};

// find all the answers of the question
export const findQuestionsAnswers =async (req , res)=>{
  const id = req.query.id ; 
  var table = []
  await questionModel.findById(id).then(question=>{
    //res.send(getAnswers(question))
    // answerModel.findById(question.answers[1]).then(answer=>{table[0] = answer ; res.send()})
    question.answers.map( (answerID)=>{
      answerModel.findById(answerID).then(answer=>{
          res.send([...res , answer])
    })
  })
  })
}

const getAnswers =(question)=>{
  var repose = [] ; 
  question.answers.map( (answerID)=>{
     answerModel.findById(answerID).then(answer=>{
        repose.push(answer)
        console.log(repose)
     })
   })
   
  return(repose)
}