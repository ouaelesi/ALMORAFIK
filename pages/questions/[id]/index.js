import React, { useState, useEffect, useContext } from "react";
import fetch from "isomorphic-unfetch";
import QuestionBox from "../../../partials/QuestionBox";
import router, { useRouter } from "next/router";
import BoxAnswer from "../../../partials/BoxAnswer";
import axios from "axios";
import AuthContext from "../../../utils/AuthContext";
import Head from "next/head";
import { questionsArData } from "../../../data/TemporaryData/staticData/arab/questionsPage";
import { questionsEngData } from "../../../data/TemporaryData/staticData/eng/questionsPage";

const AnswerQuestion = ({ id }) => {
  const { locale } = useRouter();

  // state
  const [questionsData, setQuestionsData] = useState(questionsArData);

  useEffect(() => {
    locale === "arab"
      ? setQuestionsData(questionsArData)
      : setQuestionsData(questionsEngData);
  }, [locale]);

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
        setLoading(false);
        console.log(data);
      })
      .then(() =>
        fetch(`/api/answers/answerQu/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setanswers(data);
            setLoading(false);
          })
      )
      .catch((err) => console.log(err.message));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      createAnswer();
      router.reload(`/questions/${questionData._id}`);
    } else {
      router.push(`/signUp`);
    }
  };
  const handleChange = (e) => {
    setAnswerBody({
      ...answerBody,
      [e.target.name]: e.target.value,
      creator: user ? user.email : "",
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
  const data = questionData && answers;
  if (isLoading || !data)
    return (
      <div className="h-screen Questions_section p-2">
        <div className="px-md-5 px-3   py-5   QuestionMenu  border-2 border-light text-white fs-2 ">
          The Question Answers
        </div>
        <div className="spinner-border block mx-auto mt-5" role="status">
          <span className="sr-only ">Loading...</span>
        </div>
      </div>
    );

  return (
    <div
      className={`Question_container py-2 ${
        locale == "arab" ? "text-end" : "text-start"
      }`}
    >
      <Head>
        <title>SASINI-Question:{questionData.title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="Questions_section px-2">
        <div className="px-md-5 px-3   py-5   QuestionMenu  border-2 border-light text-white fs-2 ">
          {questionsData.questionAnswers.title}
        </div>
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
          title={questionData.title}
          staticData={questionsData}
        ></QuestionBox>
        <div className="AnswersBox my-3 px-md-5 py-2 px-3 border-2 border-secondary   ">
          <h1 className="font-bold fs-2 my-3">
            {questionsData.questionAnswers.answers}
          </h1>
          <hr></hr>

          <div className="">
            {answers
              .sort((a, b) => {
                return a.likes === b.likes ? 0 : a.likes < b.likes ? 1 : -1;
              })
              .map((elem, key) => (
                //<div>{elem.answer}</div>
                <BoxAnswer
                  data={elem}
                  key={key}
                  staticData={questionsData}
                ></BoxAnswer>
              ))}
          </div>
          {/* ADD answer */}
          <div>
            <label className="fs-3">
              {questionsData.questionAnswers.submitAnswer}
            </label>
            <form onSubmit={handleSubmit} className="my-2">
              <textarea
                name="answer"
                onChange={handleChange}
                required="true"
                id="answerInput"
                placeholder={questionsData.questionAnswers.placeholder}
                className={`bg-light border px-3 py-2 outline-none border-dark rounded w-100 h-60 ${
                  locale == "arab" ? "text-end" : "text-start"
                }`}
              ></textarea>{" "}
              <br />
              <button type="submit" className=" px-3 py-2 my-2 rounded ask_btn">
                {user
                  ? questionsData.questionAnswers.action
                  :questionsData.questionAnswers.condition}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerQuestion;

export async function getServerSideProps({ query: { id } }) {
  return { props: { id: id } };
}
