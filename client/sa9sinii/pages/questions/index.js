import React, { Component } from "react";
import QuestionsMenu from "../../partials/QuestionsMenu";
import QuestionBox from "../../partials/QuestionBox";
import NextPrevious from "../../partials/NextPrevious";
import Question from "../../TemporaryData/Question";
import fetch from "isomorphic-unfetch";

const Questions = ({ questions }) => {
  return (
    <div>
      <div className="Question_container">
        <div className="Questions_section">
          <QuestionsMenu></QuestionsMenu>
          {questions.map((elem, key) => (
            <QuestionBox
              key={key}
              id={elem._id}
              Time={elem.createdAt}
              user_photo={elem.user_photo}
              creator={elem.creator}
              More_details={elem.More_details}
              Question={elem.question}
              tags={elem.tags}
              number_of_answers={elem.answers.length}
              number_of_likes={elem.likeCount}
            />
          ))}
          <NextPrevious></NextPrevious>
        </div>
      </div>
    </div>
  );
};

export default Questions;

Questions.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/questions");
  const data = await res.json();
  return { questions: data };
};
