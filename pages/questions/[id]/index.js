import React, { useState, useEffect, useContext } from "react";
import fetch from "isomorphic-unfetch";
import QuestionBox from "../../../partials/QuestionBox";
import router from "next/router";
import BoxAnswer from "../../../partials/BoxAnswer";
import axios from "axios";
import AuthContext from "../../../utils/AuthContext";

const AnswerQuestion = ({ id }) => {
  const { user } = useContext(AuthContext);

  const [questionData, setquestionData] = useState({});
  const [answers, setanswers] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [answerBody, setAnswerBody] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setquestionData(data);
      })
      .then(() =>
        fetch(`/api/answers/answerQu/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setanswers(data);
            setLoading(false);
          })
      );
  }, [id, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createAnswer();
    router.reload(`/questions/${questionData._id}`);
  };
  const handleChange = (e) => {
    setAnswerBody({
      ...answerBody,
      [e.target.name]: e.target.value,
      creator: user.email,
      question: questionData._id,
      sharedFile: String,
      likes: 0,
    });
  };

  // create question
  const createAnswer = async () => {
    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerBody),
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  if (isLoading)
    return (
      <div className="h-screen pt-20">
        <div className="spinner-border block mx-auto" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  const data = questionData && answers;
  if (!data) return <p>No profile data</p>;

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
          {answers
            .sort((a, b) => {
              return a.likes === b.likes ? 0 : a.likes < b.likes ? 1 : -1;
            })
            .map((elem, key) => (
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
            ></textarea>{" "}
            <br />
            <button
              type="submit"
              className="bg-warning px-3 py-2 my-2 rounded "
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnswerQuestion;

export async function getServerSideProps({ query: { id } }) {
  return { props: { id: id } };
}
