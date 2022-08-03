import router from "next/router";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const BoxAnswer = (props) => {
  const [likes, setLikes] = useState(Number(props.data.likes));
  const supAnswer = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/answers/${props.data._id}`, {
      method: "DELETE",
    });
    router.push("/questions");
  };
  const editAnsw = async (e) => {
    const input = document.getElementById("answerInput");
    input.value = props.data.answer;
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
  return (
    <div className="my-4">
      <div>Answered by: {props.data.creator}</div>
      <div className="d-flex">
        <div className="align-items-center fs-4  mx-auto text-center pt-4">
          <FontAwesomeIcon
            icon={faCaretUp}
            style={{ fontSize: 50 }}
            onClick={() => {
              updateAnsLikes(1);
            }}
          />
          <div>{likes}</div>
          <FontAwesomeIcon
            icon={faCaretDown}
            style={{ fontSize: 50 }}
            onClick={() => {
              updateAnsLikes(-1);
            }}
          />
        </div>
        <div className="bg-light p-3  rounded-3 border col-11">
          {props.data.answer}
        </div>
      </div>

      <button
        className="bg-light px-3 mt-2 rounded-3 border"
        onClick={editAnsw}
      >
        edit
      </button>
      <button
        className="bg-light px-3 mt-2 rounded-3 border"
        onClick={supAnswer}
      >
        delete
      </button>
      <div>likes: {props.data.likes}</div>
      <hr />
    </div>
  );
};

export default BoxAnswer;
