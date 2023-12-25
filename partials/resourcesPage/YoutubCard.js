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
import Link from "next/link";

const YoutubCard = ({ data }) => {
  // router
  const router = useRouter();

  const { locale } = useRouter();

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
    <div className="QuestionBox h-full  px-md-4 py-3 px-3  border-secondary">
      <div
        className={`d-flex  gap-4 ${
          locale === "arab" ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className=" w-30 d-none d-md-block"
          style={{
            width: "35%",
            overflow: "hidden",
          }}
        >
          <Image
            src={"/uploads/ressources/" + data.image}
            width={200}
            height={200}
            className="rounded-circle "
            alt={data.image}
            style={{
              width: "200px !important",
              height: "200px !important",
            }}
          />
          <div className="rounded-md p-1 w-fit border border-secondary mx-auto mt-2 ">
            <Link href={data.link} target="_blank">
              <Image
                src="/assets/imgs/youtube-logo.png"
                width={20}
                height={20}
                alt="youtub logo"
              />
            </Link>
          </div>
        </div>

        <div className={`w-full ${locale === "arab" ? "text-end" : ""}`}>
          <div
            className={`flex gap-2 ${
              locale === "arab" ? "flex-row-reverse" : ""
            }`}
          >
            <div className="d-md-none">
              <Image
                src={"/uploads/ressources/" + data.image}
                width={35}
                height={35}
                className="rounded-circle mt-1 "
                alt={data.image}
                style={{
                  width: "50px !important",
                  height: "50px !important",
                }}
              />
            </div>
            <div>
              <p className="channelTitle md:text-lg text-md">{data.title}</p>
              <p className="channelUserName text-sm">{data.subTitle}</p>
            </div>
          </div>
          <div
            className={`flex   gap-2 ${
              locale != "arab"
                ? "flex-row-reverse justify-start"
                : "justify-end"
            }`}
          >
            <div className="w-full">
              <div className="channelDescription h-[100px] w-full">
                {data.description.length < 200 ? (
                  data.description
                ) : (
                  <p className={`flex flex-row-reverse`}>
                    {" "}
                    {data.description.slice(0, 200)} ...
                  </p>
                )}
              </div>
              <div
                className={
                  locale === "arab"
                    ? "d-flex justify-content-end mt-4"
                    : "d-flex justify-content-start mt-4"
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
            </div>

            <div className="md:hidden block  " style={{ width: "15px" }}></div>
          </div>

          <p></p>
        </div>
        <div >
          <div className="w-fit ">
            <button className="" onClick={() => saveChannel()}>
              <FontAwesomeIcon
                icon={isQuestionSaved ? solidBookMark : faBookmark}
                style={{ fontSize: "20" }}
                className="text-warning "
              />
            </button>
          </div>
          {/* <div className="align-items-center fs-6 mt-3  mx-auto text-center h-fit   px-1">
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
        </div>{" "} */}
        </div>
      </div>
      <div className="my-3 ">
        <button
          className="btn_answer btn block mx-auto w-75 d-md-none d-block"
          style={{ fontSize: 11 }}
        >
          Youtube Channel{" "}
        </button>
      </div>
    </div>
  );
};

export default YoutubCard;
