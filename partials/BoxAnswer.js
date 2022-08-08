import router from "next/router";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

const BoxAnswer = (props) => {
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
  return (
    <div className="my-4">
      <div className="d-flex">
        <FontAwesomeIcon
          icon={faCircleUser}
          style={{ fontSize: "30", marginRight: 10 }}
          className="text-dark"
        />
        <div>
          Answered by:
          <label className=" underline">{props.data.creator}</label>{" "}
        </div>
      </div>

      <div className="d-flex  p-md-4 py-2">
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
            {props.data.answer}
          </div>
          <button className="btn m-2  border" onClick={editAnsw}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button className="btn m-2  border" onClick={supAnswer}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>

      <div>likes: {props.data.likes}</div>
      <hr />
    </div>
  );
};

export default BoxAnswer;
