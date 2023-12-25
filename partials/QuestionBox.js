import React, { useState, useContext, useEffect } from "react";
import router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faTrashCan,
  faPen,
  faBookmark as solidBookMark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";
import AuthContext from "../utils/AuthContext";

import { displayDate } from "../utils/date";
import { noteQuestionMut, saveQuestionMut } from "../services/questions";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";

const QuestionBox = (props) => {
  //
  const { locale } = useRouter();

  const [numLikes, setNumLikes] = useState(props.number_of_likes);
  const [isQuestionSaved, setSaved] = useState(props.saved);
  const [myNote, setMynote] = useState(props.userNote);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {}, [user]);

  const updateQuesLikes = (num) => {
    if (user) {
      setNumLikes(numLikes + num);
      const queUpdates = fetch(`/api/questions/updateLikes/${props.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addedValue: num }),
      });
    } else {
      router.push("/signUp");
    }
  };

  const editQuestion = () => {
    alert("Will be available Soon !");
  };

  const supQuestion = async (id) => {
    alert("do you want to delete !!");
    const re = await fetch(`/api/questions/${id}`, {
      method: "DELETE",
    });
    router.push("/questions");
  };

  const getQuestion = () => {
    router.push(`/questions/${props.id}`);
  };

  // save question
  const saveQuestion = async () => {
    const response = await saveQuestionMut(props.id);
    setSaved(!isQuestionSaved);
  };

  // save question
  const noteQuestion = async (note) => {
    setMynote(myNote + note);
    setNumLikes(numLikes + note);
    try {
      const repsonse = noteQuestionMut({
        questionId: props.id,
        note: note,
      });
    } catch {}
  };

  const renderMathQuill = (latex) => {
    if (typeof window !== "undefined") {
      const {
        addStyles,
        EditableMathField,
        StaticMathField,
      } = require("react-mathquill");
      addStyles();
      return (
        <div>
          <StaticMathField
            className={` text-light bg-dark border px-3 py-2 outline-none border-dark rounded w-100 my-2`}
          >
            {latex}
          </StaticMathField>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="QuestionBox my-3 px-md-5 py-2 px-3  border-secondary">
      <div
        className={`Question_info d-flex justify-content-between  ${
          locale === "arab" ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`pt-3 px-2 d-flex gap-2 ${
            locale === "arab" ? "flex-row-reverse" : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faCircleUser}
            style={{ fontSize: "30", marginRight: 10 }}
            className="text-dark"
          />
          <div
            className={`pt-1 d-flex gap-2  ${
              locale === "arab" ? "flex-row-reverse" : ""
            }`}
          >
            <p> {props.staticData.questionsBox.askedBy}</p>
            <b className="text-dark underline">{props.creator}</b>
            <b className="text-dark">{displayDate(props.Time)}</b>
          </div>
        </div>
        <button className="" onClick={() => saveQuestion()}>
          <FontAwesomeIcon
            icon={isQuestionSaved ? solidBookMark : faBookmark}
            style={{ fontSize: "28" }}
            className="text-warning "
          />
        </button>
      </div>
      <div
        className={`d-flex   ${locale === "arab" ? "flex-row-reverse" : ""}`}
      >
        <div className="align-items-center fs-4  mx-auto text-center h-fit my-auto  px-1">
          {myNote != 1 ? (
            <FontAwesomeIcon
              icon={faCaretUp}
              className="fs-1 "
              onClick={() => noteQuestion(1)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCaretDown}
              className="fs-1 "
              style={{ color: "transparent" }}
            />
          )}
          <div>{numLikes}</div>
          {myNote != -1 ? (
            <FontAwesomeIcon
              icon={faCaretDown}
              className="fs-1"
              onClick={() => noteQuestion(-1)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCaretDown}
              className="fs-1 "
              style={{ color: "transparent" }}
            />
          )}
        </div>
        <div className="px-md-5 py-3 px-2 w-100">
          <div
            className={`fw-bold fs-4 mb-2 ${
              locale === "arab" ? " text-end" : " text-start"
            }`}
          >
            {props.title}
          </div>
          <p
            className={`bg-light p-3  rounded-3 border cursor-pointer ${
              locale === "arab" ? " text-end" : " text-start"
            }`}
            onClick={getQuestion}
          >
            {props.Question.split("|||").map((elem, key) =>
              key % 2 === 0 ? (
                <pre
                  key={key}
                  style={{
                    direction: "rtl",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {elem}
                </pre>
              ) : (
                renderMathQuill(elem)
              )
            )}
          </p>
          <p
            className={`question_details ${
              locale === "arab" ? " text-end" : " text-start"
            }`}
          >
            {props.More_details}
          </p>
          <div className="rounded-3">
            <div
              className={`d-flex   ${
                locale === "arab" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className="mt-1 underline cursor-pointer"
                onClick={() => router.push(`/questions/${props.id}`)}
              >
                {props.number_of_answers}{" "}
                {props.staticData.questionsBox.answers}
              </div>
              <div className="px-4 mt-1">
                {numLikes} {props.staticData.questionsBox.likes}{" "}
              </div>
              <div
                className={`   ${locale === "arab" ? "mr-auto" : "ml-auto"}`}
              >
                <button
                  className="btn  mt-1 btn_answer "
                  onClick={() => router.push(`/questions/${props.id}`)}
                >
                  {props.staticData.questionsBox.answer}
                </button>
              </div>
            </div>
            <div
              className={
                locale === "arab"
                  ? "d-flex justify-content-end"
                  : "d-flex justify-content-start"
              }
            >
              {props.tags.map((tag, key) => (
                <span
                  className="px-2 rounded-2 quesTag text-dark bg-light  fw-light py-1"
                  key={key}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <FacebookShareButton
              url={"https://sa-9-sini-website.vercel.app/questions/" + props.id}
              quote={props.title + "\n" + "Ouael"}
              hashtag={"#ALMORAFIK"}
              windowHeight={700}
              windowWidth={800}
            >
              <FacebookIcon size={25} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={"https://sa-9-sini-website.vercel.app/questions/" + props.id}
              title={"سؤال على منصة المرافق:" + "\n" + props.title + "\n" + ""}
              windowHeight={700}
              windowWidth={800}
            >
              <TwitterIcon size={25} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={"https://sa-9-sini-website.vercel.app/questions/" + props.id}
              title={"سؤال على منصة المرافق:" + "\n" + props.title + "\n" + ""}
              windowHeight={700}
              windowWidth={800}
            >
              <WhatsappIcon size={25} round />
            </WhatsappShareButton>
            <EmailShareButton
              url={"https://sa-9-sini-website.vercel.app/questions/" + props.id}
              title={"سؤال على منصة المرافق:" + "\n" + props.title + "\n" + ""}
              windowHeight={700}
              windowWidth={800}
            >
              <EmailIcon size={25} round />
            </EmailShareButton>
          </div>

          {user && user.email == props.creatorEmail && (
            <div>
              <button className="btn border mx-1" onClick={editQuestion}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                className="btn border mx-1"
                onClick={() => supQuestion(props.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
