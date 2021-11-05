import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import QuestionBox from "../../../partials/QuestionBox";
import router from "next/router";
import BoxAnswer from "../../../partials/BoxAnswer";

const answerQuestion = ({ questionData, answers }) => {
  const [answerBody, setAnswerBody] = useState({
    answer: "",
    creator: "sahbi",
    question: questionData._id,
    sharedFile: String,
    likes: 1,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createAnswer();
    alert(questionData._id)
    router.push(`/questions/${questionData._id}`)
  };
  const handleChange = (e) => {
    setAnswerBody({
      ...answerBody,
      [e.target.name]: e.target.value,
    });
  };

  // create question
  const createAnswer = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/answers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerBody),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='Question_container'>
      <div className='Questions_section' >
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

      <h1>Answers</h1>
      {answers.map((elem) => (
         //<div>{elem.answer}</div>
        <BoxAnswer data={elem}></BoxAnswer>
      ))}
      {/* ADD answer */}
      <div>
        <h4>Answer Question</h4>
      <form onSubmit={handleSubmit}>
        <input name="answer" onChange={handleChange}></input>
        <button type="submit">submit</button>
      </form>
      </div>
     
      </div>
    
    </div>
  );
};

export default answerQuestion;

answerQuestion.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/questions/${id}`);
  const Data = await res.json();

  // fetching the answers data
  const res2 = await fetch(`http://localhost:3000/api/answers/answerQu/${id}`);
  const data2 = await res2.json();
  return { questionData: Data, answers: data2 };
};
