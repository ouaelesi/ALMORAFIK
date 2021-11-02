import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import QuestionBox from "../../../partials/QuestionBox";
import router from 'isomorphic-unfetch'

const answerQuestion = ({ questionData }) => {
  const [answerBody, setAnswerBody] = useState({
    answer: "",
    creator: "sahbi",
    question: "61703e51ef4b6e525ada0d1e",
    sharedFile: String,
    likes: 1,
  });
  const handleSubmit = (e) =>{ 
      e.preventDefault() ; 
      createAnswer() ; 
      alert("done")
  }
  const handleChange = (e) => {
    setAnswerBody({
      ...answerBody,
      [e.target.name]: e.target.value,
    });
  };
  
  // create question
  const createAnswer = async ()=>{
      try{
        const res = await fetch('http://localhost:3000/api/answers' , {
            method : 'POST' , 
            headers : {
              "Accept" : "application/json" , 
              "Content-Type" : "application/json"
            }, 
            body : JSON.stringify(answerBody) 
        })
      }catch(err){
          console.log(err);
      }
     
      
  }


  return (
    <div>
      <QuestionBox
        id={questionData._id}
        Time={questionData.createdAt}
        user_photo={questionData.user_photo}
        creator={questionData.creator}
        More_details={questionData.More_details}
        Question={questionData.question}
        number_of_answers={questionData.answers.length}
        number_of_likes={questionData.likeCount}
      ></QuestionBox>

      <form onSubmit={handleSubmit}>
        <input name="answer" onChange={handleChange}></input>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default answerQuestion;

answerQuestion.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/questions/${id}`);
  const Data = await res.json();
  return { questionData: Data };
};
