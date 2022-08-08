import React, { useState, useContext, useEffect } from "react";
import router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faTrashCan,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";
import AuthContext from "../utils/AuthContext";

const QuestionBox = (props) => {
  const [numLikes, setNumLikes] = useState(props.number_of_likes);
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
  return (
    <div className="QuestionBox my-3 px-md-5 py-2 px-2 border border-secondary">
      <div className="Question_info d-flex justify-content-between ">
        <div className="pt-3 px-2 d-flex">
          <FontAwesomeIcon
            icon={faCircleUser}
            style={{ fontSize: "30", marginRight: 10 }}
            className="text-dark"
          />
          <div className="pt-1">
            Asked By <b className="text-dark underline">{props.creator}</b> At{" "}
            <b className="text-dark">{props.Time}</b>
          </div>
        </div>
        <button className="" onClick={() => alert("Will Be available Soon!")}>
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ fontSize: "28" }}
            className="text-warning"
          />
        </button>
      </div>
      <div className="d-flex">
        <div className="align-items-center fs-4  mx-auto text-center h-fit my-auto  px-1">
          <FontAwesomeIcon
            icon={faCaretUp}
            className="fs-1 "
            onClick={() => updateQuesLikes(1)}
          />
          <div>{numLikes}</div>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="fs-1"
            onClick={() => updateQuesLikes(-1)}
          />
        </div>
        <div className="px-md-5 py-3 px-2 w-100">
          <div className="fw-bold fs-4 mb-2">{props.title}</div>
          <p
            className="bg-light p-3  rounded-3 border cursor-pointer"
            onClick={getQuestion}
          >
            {props.Question}
          </p>
          <p className="question_details">{props.More_details}</p>
          <div className="rounded-3">
            <div className="d-flex">
              <div
                className="mt-1 underline cursor-pointer"
                onClick={() => router.push(`/questions/${props.id}`)}
              >
                {props.number_of_answers} Answers
              </div>
              <div className="px-4 mt-1">{numLikes} Likes </div>
              <div className="ml-auto">
                <button
                  className="btn  mt-1 btn_answer "
                  onClick={() => router.push(`/questions/${props.id}`)}
                >
                  Answer
                </button>
              </div>
            </div>
            <div className="my-2">
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
