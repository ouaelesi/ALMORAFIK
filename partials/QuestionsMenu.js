import React, { Component, useState } from "react";
import { Row } from "reactstrap";
import router from "next/router";

const QuestionsMenu = () => {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = document.getElementById("SerchInput").value;
    router.push(`search/${searchQuery}`);
  };

  return (
    <>
      <div className="categories pt-3">
        <form
          className="form-group align-middle d-flex"
          onSubmit={handleSearch}
        >
          <input
            className="form-control search-form"
            placeholder="search"
            id="SerchInput"
          ></input>
          <button type="submit" className="btn btn-light">
            Search
          </button>
        </form>
        <Row className="pt-3">
          <div className="col-6 font-weight-bold ask_text align-items-center">
            All Questions
          </div>
          <div className="col-4 ml-auto ">
            {" "}
            <a href="/askQuestion">
              <button className="btn btn-light ask_btn">
                Ask Your Question
              </button>
            </a>{" "}
          </div>
        </Row>
        <div
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
        </div>
      </div>
    </>
  );
};

export default QuestionsMenu;
