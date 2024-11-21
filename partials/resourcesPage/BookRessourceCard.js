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
import { ressourcePageDataAr } from "../../data/TemporaryData/staticData/arab/ressourcesPageAr";
import { ressourcePageDataEn } from "../../data/TemporaryData/staticData/eng/ressourcesPageEn";
import { useEffect } from "react";

const BookRessourcesCard = ({ data }) => {
  const { locale } = useRouter();

  const [pageData, setPageData] = useState(
    locale === "arab" ? ressourcePageDataAr : ressourcePageDataEn
  );
  const [isQuestionSaved, setSaved] = useState(false);

  // functions
  const saveChannel = () => {
    setSaved(!isQuestionSaved);
  };

  useEffect(() => {
    setPageData(locale === "arab" ? ressourcePageDataAr : ressourcePageDataEn);
  }, [locale]);

  return (
    <div className="QuestionBox px-md-4 py-3 px-3">
      <div
        className={`d-flex     border-secondary gap-4 ${
          locale === "arab" ? "flex-row-reverse" : ""
        }`}
      >
        <div className="d-md-block d-none">
          <Image
            src={data.image}
            width={120}
            height={200}
            className=""
            alt={data.title}
            style={{
              width: "650px",
            }}
          />
          <div className="my-3">
            <button
              className="btn_answer btn block mx-auto"
              style={{ fontSize: 11 }}
            >
              {pageData.books.bookAction}
            </button>
          </div>
        </div>
        <div className={`${locale === "arab" ? "text-end" : ""}`}>
          <p className="channelTitle">{data.title}</p>
          <p className="channelUserName">{data.subTitle}</p>
          <p className="channelDescription">{data.description}</p>
          <div
            className={
              locale === "arab"
                ? "d-flex  flex-wrap gap-2  justify-content-end mt-2"
                : "d-flex  flex-wrap gap-2  justify-content-start mt-2"
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
          {pageData.books.bookAction}
        </button>
      </div>
    </div>
  );
};

export default BookRessourcesCard;
