import React, { useState, useEffect, useContext, useRef } from "react";
import fetch from "isomorphic-unfetch";
import QuestionBox from "../../../partials/QuestionBox";
import { useRouter } from "next/router";
import BoxAnswer from "../../../partials/BoxAnswer";
import axios from "axios";
import AuthContext from "../../../utils/AuthContext";
import Head from "next/head";
import { questionsArData } from "../../../data/TemporaryData/staticData/arab/questionsPage";
import { questionsEngData } from "../../../data/TemporaryData/staticData/eng/questionsPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faPlus,
  faSquareRootVariable,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const AnswerQuestion = () => {
  const { locale } = useRouter();
  const router = useRouter();
  const id = router.query.id;

  const [latex, setLatex] = useState("\\frac{1}{\\sqrt{2}}\\cdot 2");

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
    !answers &&
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
  }, [id, answers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let answerText = "";
    answersBoxs.forEach((elem) => {
      if (elem.type === "text") {
        answerText = answerText + elem.value + " ";
      } else {
        answerText = answerText + "|||" + elem.value + "||| ";
      }
    });

    console.log(answerText);

    if (user) {
      createAnswer({
        answer: answerText,
        creator: user ? user.email : "",
        question: questionData._id,
        sharedFile: String,
        likes: 0,
      });
      setanswers(null);
      // router.reload(`/questions/${questionData._id}`);
    } else {
      router.push(`/signUp`);
    }
  };

  const handleChange = (_id, value) => {
    let values = answersBoxs;
    values.forEach((elem, key) => {
      if (elem._id === _id) values[key].value = value;
    });

    setAnswersBoxs(values);
  };

  const createAnswer = async (answerBody) => {
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

  const [isUpdateBoxs, updateBoxs] = useState(false);

  const [answersBoxs, setAnswersBoxs] = useState([
    {
      _id: 0,
      value: "",
      type: "text",
      component: (
        <textarea
          key={0}
          name="answer"
          onChange={(e) => handleChange(0, e.target.value)}
          required="true"
          id="answerInput"
          placeholder={questionsData.questionAnswers.placeholder}
          className={`bg-light border px-3 py-2 outline-none border-dark rounded w-100 h-32 ${
            locale == "arab" ? "text-end" : "text-start"
          }`}
          style={{ direction: locale === "arab" ? "rtl" : "ltr" }}
        ></textarea>
      ),
    },
  ]);

  useEffect(() => {}, [answersBoxs, isUpdateBoxs]);

  const removeBox = (_id) => {
    let arr = answersBoxs;
    arr.forEach((elem, key) => {
      if (elem._id === _id) arr.splice(key, 1);
    });
    console.log(arr);
    setAnswersBoxs(arr);
  };

  const data = questionData && answers;
  if (!answers)
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

  const renderMathQuill = (_id) => {
    if (typeof window !== "undefined") {
      const { addStyles, EditableMathField } = require("react-mathquill");
      addStyles();
      return (
        <div className="" key={_id}>
          <div className="d-flex justify-between">
            <div
              className="bg-dark text-white  px-1  w-fit ml-3"
              style={{
                fontSize: 10,
                borderRadius: "5px 5px 0 0",
                fontFamily: "monospace",
              }}
            >
              Equation
            </div>
          </div>

          <EditableMathField
            latex={""}
            onChange={(mathField) => {
              handleChange(_id, mathField.latex());
            }}
            className={`bg-light border px-3 py-2 outline-none border-dark rounded w-100 `}
          />
        </div>
      );
    }
    return null;
  };

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
              {answersBoxs?.map((elem, key) => (
                <div key={elem._id} className="d-flex my-2">
                  {key != 0 && (
                    <div
                      className="bg-light  border-dark  p-1 px-2 mt-4 w-fit h-fit cursor-pointer"
                      style={{
                        fontSize: 7,
                        borderRadius: " 7px  0 0 7px",
                        fontFamily: "monospace",
                        border: "solid 1px",
                        borderRight : "none"
                      }}
                      onClick={() => {
                        removeBox(elem._id);
                        updateBoxs(!isUpdateBoxs);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faX}
                        style={{ fontSize: "10", marginTop: 4 }}
                        className=""
                      />
                    </div>
                  )}
                  <div className="w-100">{elem.component}</div>
                </div>
              ))}

              <div
                className={`d-flex gap-2 mb-5 ${
                  locale === "arab" ? " flex-row-reverse" : ""
                }`}
              >
                <button
                  className={`btn bg-light border d-flex gap-2 border-dark ${
                    locale === "arab" ? " flex-row-reverse" : ""
                  }`}
                  type="button"
                  onClick={() => {
                    let arr = answersBoxs;
                    arr.push({
                      _id: arr.length,
                      value: "",
                      type: "text",
                      component: (
                        <textarea
                          key={arr.length}
                          name="answer"
                          onChange={(e) =>
                            handleChange(arr.length - 1, e.target.value)
                          }
                          required="true"
                          placeholder={
                            questionsData.questionAnswers.placeholder
                          }
                          className={`bg-light border px-3 py-2 outline-none border-dark rounded w-100 h-32 ${
                            locale == "arab" ? "text-end" : "text-start"
                          }`}
                          style={{
                            direction: locale === "arab" ? "rtl" : "ltr",
                          }}
                        ></textarea>
                      ),
                    });
                    setAnswersBoxs(arr);
                    updateBoxs(!isUpdateBoxs);
                    console.log(answersBoxs);
                  }}
                >
                  {questionsData.questionAnswers.addTextBlock}
                  <FontAwesomeIcon
                    icon={faComment}
                    style={{ fontSize: "15", marginTop: 5 }}
                    className="text-dark"
                  />
                </button>{" "}
                <button
                  className={`btn bg-light border d-flex gap-2 border-dark ${
                    locale === "arab" ? " flex-row-reverse" : ""
                  }`}
                  type="button"
                  onClick={() => {
                    let arr = answersBoxs;
                    arr.push({
                      _id: arr.length,
                      value: "",
                      type: "latex",
                      component: renderMathQuill(arr.length),
                    });
                    setAnswersBoxs(arr);
                    updateBoxs(!isUpdateBoxs);
                  }}
                >
                  {questionsData.questionAnswers.addLatexBlock}
                  <FontAwesomeIcon
                    icon={faSquareRootVariable}
                    style={{ fontSize: "15", marginTop: 5 }}
                    className="text-dark"
                  />
                </button>
              </div>
              <button type="submit" className=" px-3 py-2 my-2 rounded ask_btn">
                {user
                  ? questionsData.questionAnswers.action
                  : questionsData.questionAnswers.condition}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerQuestion;
