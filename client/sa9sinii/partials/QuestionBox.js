import { Row } from "reactstrap";
import React from "react";
import router from "next/router";

const QuestionBox = (props) => {
  const editQuestion = () => {};
  const deleteQuestion = ()=>{} ; 
  const getQuestion = () => {
    router.push(`/questions/${props.id}`);
  };
  return (
    <div>
      <div className="Question_info">
        <img src={props.user_photo}></img>
        {props.creator} Asked {props.Time}
      </div>
      <button onClick={editQuestion}>edit</button>
      <button onClick={deleteQuestion}>Delete</button>
      <div className="question_section">
        <p className="question" onClick={getQuestion}>
          {props.Question}
        </p>
        <p className="question_details">{props.More_details}</p>
        <div className="stat ">
          <Row className="info_row d-flex align-items-center ">
            <div className="col-4 col-sm-3">
              <button className="btn Question_Statistics">
                {props.number_of_answers} Answers
              </button>
            </div>
            <div className="col-4 col-sm-3">
              <button className="btn Question_Statistics">
                {props.number_of_likes} Likes{" "}
              </button>{" "}
            </div>
            <div className="col-4 col-sm-3 ml-auto">
              <button
                className="btn btn_answer"
                onClick={() => router.push(`/questions/${props.id}`)}
              >
                Answer
              </button>
            </div>
          </Row>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default QuestionBox;
