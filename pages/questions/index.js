import React, { useState, useEffect } from "react";
import QuestionsMenu from "../../partials/QuestionsMenu";
import QuestionBox from "../../partials/QuestionBox";
import NextPrevious from "../../partials/NextPrevious";
import fetch from "isomorphic-unfetch";

const Questions = ({ questions }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  if (isLoading)
    return (
      <div className="h-screen pt-">
        <div className="spinner-border block mx-auto" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (!data) return <p>No profile data</p>;
  return (
    <div>
      <div className="Question_container">
        <div className="Questions_section">
          <QuestionsMenu></QuestionsMenu>
          {data.map((elem, key) => (
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
