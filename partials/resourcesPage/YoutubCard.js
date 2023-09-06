import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import {
  faCaretUp,
  faCaretDown,
  faBookmark as solidBookMark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useRouter } from "next/router";

const YoutubCard = ({ data }) => {
  // router
  const router = useRouter();

  const [isQuestionSaved, setSaved] = useState(false);
  const [numLikes, setNumLikes] = useState(data.likes);

  // functions
  const saveChannel = () => {
    setSaved(!isQuestionSaved);
  };

  const updateNumLikes = (n) => {
    setNumLikes(numLikes + n);
  };
  return (
    <div className="d-flex QuestionBox  px-md-4 py-3 px-3  border-secondary gap-4">
      <div>
        <Image
          src={data.image}
          width={200}
          height={200}
          className="rounded-circle "
          alt={data.title}
        />
        <div
          className="rounded-md p-1 w-fit border border-secondary mx-auto mt-2 "
          onClick={() => router.push(data.link)}
        >
          <Image
            src="/assets/imgs/youtube-logo.png"
            width={20}
            height={20}
            alt="youtub logo"
          />
        </div>
      </div>
      <div className="w-100">
        <p className="channelTitle">{data.title}</p>
        <p className="channelUserName">{data.subTitle}</p>
        <p className="channelDescription">{data.description}</p>
        <div
          className={
            false
              ? "d-flex justify-content-end mt-2"
              : "d-flex justify-content-start mt-2"
          }
        >
          {data.tags.map((tag, key) => (
            <span
              className="px-2 rounded-2 quesTag text-dark bg-light  fw-light py-1"
              key={key}
            >
              {tag}
            </span>
          ))}
        </div>{" "}
        <p></p>
      </div>
      <div style={{ width: "80px" }}>
        <div className="w-fit mx-auto">
          <button className="" onClick={() => saveChannel()}>
            <FontAwesomeIcon
              icon={isQuestionSaved ? solidBookMark : faBookmark}
              style={{ fontSize: "25" }}
              className="text-warning "
            />
          </button>
        </div>
        <div className="align-items-center fs-6 mt-3  mx-auto text-center h-fit   px-1">
          <FontAwesomeIcon
            icon={faCaretUp}
            style={{ fontSize: "22" }}
            onClick={() => updateNumLikes(1)}
          />
          <div>{numLikes}</div>
          <FontAwesomeIcon
            icon={faCaretDown}
            style={{ fontSize: "22" }}
            onClick={() => updateNumLikes(-1)}
          />
        </div>{" "}
      </div>
    </div>
  );
};

export default YoutubCard;
