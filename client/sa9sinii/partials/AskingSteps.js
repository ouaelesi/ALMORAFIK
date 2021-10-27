import React, { Component } from "react";

class AskingSteps extends Component {
  render() {
    return (
      <div className="QuestionSteps">
        <div className="">
          <img src="/assets/imgs/ask_ques.png" className="quesstepicon" np></img>
        </div>
        <div className="ques_step_txt">
          <p className="text-center font-weight-bold card_steps">
            How to draft your question
          </p>
          <p className="">
            The community is here to help you with specific questions, exercises
            , or subjects.
          </p>
          <div className="steps">
            <img src="/assets/imgs/1.png" className="mr-4 mt-3" width="9%"></img> Asking your
            question
          </div>
          <div className="steps">
            <img src="/assets/imgs/2.png" className="mr-4 mt-3" width="9%"></img>Include more
            informations
          </div>
          <div className="steps">
            <img src="/assets/imgs/3.png" className="mr-4 mt-3" width="9%"></img>Add a field
          </div>
        </div>
      </div>
    );
  }
}

export default AskingSteps;
