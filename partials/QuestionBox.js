import React, { useState, useContext, useEffect } from "react";
import router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../utils/AuthContext";

const QuestionBox = (props) => {
  const [numLikes, setNumLikes] = useState(props.number_of_likes);
  const { user } = useContext(AuthContext);

  useEffect(() => {}, [user]);

  const updateQuesLikes = (num) => {
    setNumLikes(numLikes + num);
    const queUpdates = fetch(`/api/questions/updateLikes/${props.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ addedValue: num }),
    });
  };
  const editQuestion = () => {};
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
  return (
    <div className="">
      <div className="Question_info">
        <img src={props.user_photo}></img>
        Asked By <b className="text-dark">{props.creator}</b> At{" "}
        <b className="text-dark">{props.Time}</b>
      </div>
      <div className="d-flex">
        <div className="align-items-center fs-4  mx-auto text-center pt-4">
          <FontAwesomeIcon
            icon={faCaretUp}
            style={{ fontSize: 50 }}
            onClick={() => updateQuesLikes(1)}
          />
          <div>{numLikes}</div>
          <FontAwesomeIcon
            icon={faCaretDown}
            style={{ fontSize: 50 }}
            onClick={() => updateQuesLikes(-1)}
          />
        </div>
        <div className="px-5 py-3 col-11">
          <p className="bg-light p-3  rounded-3 border" onClick={getQuestion}>
            {props.Question}
          </p>
          <p className="question_details">{props.More_details}</p>
          <div className="rounded-3">
            <div className="d-flex">
              <div className="mt-2">{props.number_of_answers} Answers</div>
              <div className="px-4 mt-2">{props.number_of_likes} Likes </div>
              <div className="ml-auto">
                <button
                  className="btn btn-warning px-4 mt-2"
                  onClick={() => router.push(`/questions/${props.id}`)}
                >
                  Answer
                </button>
              </div>
            </div>
            <div className="mb-4">
              {props.tags.map((tag, key) => (
                <span
                  className="px-2 rounded-3 bg-dark mx-1 text-light fw-light"
                  key={key}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {user.email == props.creatorEmail && (
            <div>
              <button
                className="btn btn-light border mx-1"
                onClick={editQuestion}
              >
                edit
              </button>
              <button
                className="btn btn-light border mx-1"
                onClick={() => supQuestion(props.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default QuestionBox;
