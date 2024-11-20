import React from "react";

const ProfilQuesBox = ({ QuestionData }) => {
  return (
    <div className="py-2 ">
      <div>Created at {QuestionData.createdAt}</div>
      <div className="bg-light p-3  rounded-3 border my-2">
        {QuestionData.question}
      </div>
      <div className="d-flex flex-row justify-content-end ">
        <button className="btn btn-warning mb-2">View Answers</button>
      </div>

      <hr />
    </div>
  );
};

export default ProfilQuesBox;
