import express from "express";
import {
  homeRender,
  getQuestions,
  getQuestion,
  LoginPageRender,
  singInRender,
  aboutUsRender,
} from "../services/render.js";
import {
  findQuestion,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from "../controlers/questions.js";
import { addUser , deleteUser, getUsers, updateUser} from "../controlers/users.js";
import { addAnswer, deleteAnswer , getAnswers, updateAnswer} from "../controlers/answers.js";

const router = express.Router();
// Router: Home page
// Methode: Get
router.get("/home", homeRender);

//Router : about page
//Mthode : Get
router.get("/aboutUs", aboutUsRender);

//Router: Question Page
//Methode : Get
router.get("/questions", getQuestions);

//Router: Question details
//Methode: Get
router.get("/questions/:id", getQuestion);

//router : Login
//Methode : get
router.get("/Login", LoginPageRender);

//Router : SignIN
// Methode : get
router.get("/signIn", singInRender);

// Questions API
router.get("/api/questions", findQuestion);
router.post("/api/questions", addQuestion);
router.delete("/api/questions/:id", deleteQuestion);
router.put("/api/questions/:id", updateQuestion);

// Users Apis 
router.get('/api/users', getUsers)
router.post('/api/users' , addUser)
router.put('/api/users/:id' , updateUser)
router.delete('/api/users/:id' , deleteUser)

// answers apis 
router.post('/api/answers' , addAnswer)
router.delete('/api/answers/:id' , deleteAnswer )
router.get('/api/answers' , getAnswers)
router.put('/api/answers/:id' , updateAnswer)
export default router;
