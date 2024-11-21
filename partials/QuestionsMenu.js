import React, { Component, useState } from "react";
import { Row } from "reactstrap";
import router, { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const QuestionsMenu = ({ data }) => {
  const { locale } = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = document.getElementById("SerchInput").value;
    router.push(`search/${searchQuery}`);
  };

  return (
    <>
      <div className="px-md-5 px-3   py-5   QuestionMenu  border-2 border-light">
        <form
          className={`  d-flex  search-form  border px-2 rounded-3   ${
            locale === "arab" ? "flex-row-reverse" : ""
          } `}
          onSubmit={handleSearch}
        >
          <input
            className={`px-2 rounded-3   w-100 bg-transparent  search-form  
                ${locale === "arab" ? "text-end" : "text-start"} `}
            placeholder={data.search.placeholder}
            id="SerchInput"
          ></input>
          <button
            type="submit"
            className="btn text-white bg-dark bg-opacity-10 "
          >
            {data.search.action}
          </button>
        </form>
        <div
          className={`pt-3 d-flex justify-content-between mt-2 text-white ${
            locale === "arab" ? "flex-row-reverse " : ""
          }`}
        >
          <div className=" font-weight-bold ask_text align-items-center pt-1 gap-2 d-flex">
            {data.search.filters}
            <FontAwesomeIcon icon={faAngleDown} style={{ fontSize: "20" }} />
          </div>
          <div className="  ">
            <Link href="/askQuestion">
              <button className="btn  ask_btn bg-warning">
                {data.search.askQuestion}
              </button>
            </Link>{" "}
          </div>
        </div>
        {/* <div
          className="btn-group fields"
          role="group"
          aria-label="Basic example"
        >
          <button type="button" className="btn btn-secondary">
            RECENT QUESTIONS
          </button>
          <button type="button" className="btn btn-secondary">
            MATH
          </button>
          <button type="button" className="btn btn-secondary">
            SCIENCE
          </button>
          <button type="button" className="btn btn-secondary">
            PHISICS
          </button>
          <button type="button" className="btn btn-secondary">
            {" "}
            ....{" "}
          </button>
        </div> */}
      </div>
    </>
  );
};

export default QuestionsMenu;
