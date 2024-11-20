import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QuestionBox from "../../partials/QuestionBox";
import QuestionsMenu from "../../partials/QuestionsMenu";

const SearchPage = () => {
  const router = useRouter();
  const { searchQuery } = router.query;
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`/api/questions/search/${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data);
        setLoading(false);
      });
  }, [, searchQuery]);
  if (isLoading)
    return (
      <div className=" pt-20">
        <div className="spinner-border block mx-auto" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (!searchResult && !isLoading) return <div>there is no result</div>;
  return (
    <div className="Question_container">
      <div className="Questions_section Question_container py-4">
        <QuestionsMenu />
        {searchResult.map((elem, key) => (
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
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
