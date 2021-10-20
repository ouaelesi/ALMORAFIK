import questionModel from "../models/question.js";

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

export const deleteQuestion = (req ,res) => {
    const id = req.params.id ; 
    questionModel.findByIdAndDelete(id)
      .then(data=>{
          if(!data){
            res.status(404).send({message : `can not delete message ${id}`})
          }else{
             res.send("Message deleted succesfully!!")
          }
      })
      .catch(err=>{
          res.status(400).send({message : err.message || "error occured!"})
      })
};

export const updateQuestion = (req, res) => {
  if (!req.body) {
    res.status(400).send("body empty !!");
    return;
  }

  const id = req.params.id;

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

export const findQuestion = (req, res) => {
  questionModel
    .find()
    .then((question) => res.send(question))
    .catch((err) =>
      res.status(400).send({ message: err.message || "error occured !!" })
    );
};
