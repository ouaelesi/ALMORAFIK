import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import QuestionBox from "../../../partials/QuestionBox";
import router from "next/router";
import BoxAnswer from "../../../partials/BoxAnswer";
import axios from "axios";

const AnswerQuestion = ({ questionData, answers }) => {
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
    alert(questionData._id);
    router.push(`/questions/${questionData._id}`);
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
    <div className="Question_container">
      <div className="Questions_section">
        <QuestionBox
          id={questionData._id}
          Time={questionData.createdAt}
          user_photo={questionData.user_photo}
          creator={questionData.creator}
          More_details={questionData.More_details}
          Question={questionData.question}
          tags={questionData.tags}
          number_of_answers={questionData.answers.length}
          number_of_likes={questionData.likeCount}
        ></QuestionBox>

        <h1 className="font-bold text-xl my-3">Answers</h1>
      
        <div className="px-5">
        {answers.map((elem, key) => (
          //<div>{elem.answer}</div>
          <BoxAnswer data={elem} key={key}></BoxAnswer>
        ))}
        </div>
        {/* ADD answer */}
        <div>
          <h4>Answer Question</h4>
          <form onSubmit={handleSubmit} className="my-2">
            <textarea
              name="answer"
              onChange={handleChange}
              id="answerInput"
              className="bg-light border px-3 py-2 outline-none  rounded w-7/12 h-60"
            ></textarea> <br/>
            <button type="submit" className='bg-warning px-3 py-2 my-2 rounded '>submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnswerQuestion;

export async function getServerSideProps ({ query: { id } }) {
    const res = await axios.get(`http://localhost:3000/api/questions/${id}`);
    const Data = await res.data;

  // fetching the answers data
  const res2 = await axios.get(`http://localhost:3000/api/answers/answerQu/${id}`);
  const data2 = await res2.data;
  return { props : {questionData: Data, answers: data2 }};
};
