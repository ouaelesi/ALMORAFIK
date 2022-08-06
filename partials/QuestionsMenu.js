import React, { Component, useState } from "react";
import { Row } from "reactstrap";
import router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const QuestionsMenu = () => {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = document.getElementById("SerchInput").value;
    router.push(`search/${searchQuery}`);
  };

  return (
    <>
      <div className="px-md-5 px-3   py-5   QuestionMenu  border-2 border-light">
        <form
          className="form-group align-middle d-flex"
          onSubmit={handleSearch}
        >
          <input
            className="px-2 rounded-3 border  search-form"
            placeholder="search"
            id="SerchInput"
          ></input>
          <button
            type="submit"
            className="btn text-white bg-dark bg-opacity-10 border"
          >
            Search
          </button>
        </form>
        <div className="pt-3 d-flex justify-content-bettween mt-2 text-white">
          <div className=" font-weight-bold ask_text align-items-center pt-1 gap-2 d-flex">
            All Questions
            <FontAwesomeIcon icon={faAngleDown} style={{ fontSize: "20" }} />
          </div>
          <div className=" ml-auto ">
            <a href="/askQuestion">
              <button className="btn  ask_btn bg-warning">
                Ask Your Question
              </button>
            </a>{" "}
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
