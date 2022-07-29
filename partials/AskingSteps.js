import React, { Component } from "react";

class AskingSteps extends Component {
  render() {
    return (
      <div className="QuestionSteps">
        <div className="">
          <img
            src="/assets/imgs/ask_ques.png"
            className="quesstepicon"
            np
          ></img>
        </div>
        <div className="ques_step_txt">
          <p className="text-center font-weight-bold card_steps">
            How to draft your question
          </p>
          <p className="pt-2">
            The community is here to help you with specific questions, exercises
            , or subjects.
          </p>
          <div className="steps">
            <img
              src="/assets/imgs/1.png"
              className="mr-4 mt-3"
              width="20px"
            ></img>
            <p> Asking your question</p>
          </div>
          <div className="steps">
            <img
              src="/assets/imgs/2.png"
              className="mr-4 mt-3"
              width="20px"
            ></img>
            <p>Include more informations</p>
          </div>
          <div className="steps">
            <img
              src="/assets/imgs/3.png"
              className="mr-4 mt-3"
              width="20px"
            ></img>
            <p>Add a field</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AskingSteps;
