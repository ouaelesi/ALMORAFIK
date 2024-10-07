import router, { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faPen,
  faTrashCan,
  faThumbtack,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import AuthContext from "../utils/AuthContext";

const BoxAnswer = (props) => {
  const { locale } = useRouter();

  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(Number(props.data.likes));
  const supAnswer = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/answers/${props.data._id}`, {
      method: "DELETE",
    });
    router.reload(window.location.pathname);
  };
  const editAnsw = async (e) => {
    alert("Will Be available Soon!");
  };
  const updateAnsLikes = async (num) => {
    setLikes(likes + num);
    const updatedAns = await fetch(
      `/api/answers/updateLikes/${props.data._id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ num: Number(num) }),
      }
    );
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
    <div className="my-4">
      {props.pinned && (
        <div className="pinned-marker">
          <FontAwesomeIcon icon={faThumbtack} className="text-warning" />
          <span className="ml-2">Pinned</span>
        </div>
      )}
      <div
        className={`d-flex gap-2 ${locale == "arab" ? "flex-row-reverse" : ""}`}
      >
        <FontAwesomeIcon
          icon={faCircleUser}
          style={{ fontSize: "30", marginRight: 10 }}
          className="text-dark"
        />
        <p>{props.staticData.questionAnswers.answredBy}</p>
        <div>
          <label className=" underline">{props.data.creator}</label>{" "}
        </div>
      </div>

      <div
        className={`d-flex  p-md-4 py-2 ${
          locale == "arab" ? "flex-row-reverse" : ""
        }`}
      >
        <div className="fs-4 px-md-4 px-1 text-center h-fit my-auto">
          <FontAwesomeIcon
            icon={faCaretUp}
            className="fs-1"
            onClick={() => {
              updateAnsLikes(1);
            }}
          />
          <div>{likes}</div>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="fs-1"
            onClick={() => {
              updateAnsLikes(-1);
            }}
          />
        </div>
        <div className="px-2 w-100 ">
          <div className="bg-light px-3 py-2  rounded-3 border">
            {props.data.answer.split("|||").map((elem, key) =>
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
          </div>
          {user && user.email == props.data.creator && (
            <div>
              <button className="btn m-2  border" onClick={editAnsw}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button className="btn m-2  border" onClick={supAnswer}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        {props.staticData.questionAnswers.likes} {props.data.likes}
      </div>
      <hr />
    </div>
  );
};

export default BoxAnswer;