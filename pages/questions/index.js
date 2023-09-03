import React, { useState, useEffect } from "react";
import QuestionsMenu from "../../partials/QuestionsMenu";
import QuestionBox from "../../partials/QuestionBox";
import NextPrevious from "../../partials/NextPrevious";
import fetch from "isomorphic-unfetch";

import { questionsArData } from "../../data/TemporaryData/staticData/arab/questionsPage";
import { questionsEngData } from "../../data/TemporaryData/staticData/eng/questionsPage";
import { useRouter } from "next/router";

const Questions = ({ questions }) => {
  const { locale } = useRouter();

  // state
  const [questionsData, setQuestionsData] = useState(questionsArData);

  useEffect(() => {
    locale === "arab"
      ? setQuestionsData(questionsArData)
      : setQuestionsData(questionsEngData);
  }, [locale]);

  // Pagination vars and Functions
  const QuetionsPerPage = 5;
  const [maxNumPages, setMaxPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const IsOnCurrentPage = (id) => {
    return Math.floor(id / QuetionsPerPage) === currentPage;
  };

  // data fetching
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setMaxPages(Math.floor((data.length - 1) / QuetionsPerPage) + 1);
        setLoading(false);
      });
  }, []);

  // Rendring Content
  if (isLoading)
    return (
      <div className="h-screen Questions_section">
        <QuestionsMenu data={questionsData}></QuestionsMenu>
        <div className="spinner-border block mx-auto mt-5" role="status">
          <span className="sr-only ">Loading...</span>
        </div>
      </div>
    );
  if (!data) return <p>No profile data</p>;
  return (
    <div>
      <div className="Question_container py-3 px-2">
        <div className="Questions_section ">
          <QuestionsMenu data={questionsData}></QuestionsMenu>
          {data
            .sort((a, b) => {
              return a.likeCount === b.likeCount
                ? 0
                : a.likeCount < b.likeCount
                ? 1
                : -1;
            })
            .map(
              (elem, key) =>
                IsOnCurrentPage(key) && (
                  <QuestionBox
                    key={key}
                    id={elem._id}
                    Time={elem.createdAt}
                    user_photo={elem.user_photo}
                    creator={elem.creator}
                    creatorEmail={elem.creatorEmail}
                    More_details={elem.More_details}
                    Question={elem.question}
                    tags={elem.tags}
                    number_of_answers={elem.answers.length}
                    number_of_likes={elem.likeCount}
                    title={elem.title}
                    staticData={questionsData}
                  />
                )
            )}
          <NextPrevious
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            maxNumPages={maxNumPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Questions;
