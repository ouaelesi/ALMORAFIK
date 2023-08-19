import { useRouter } from "next/router";
import React, { Component } from "react";

const AskingSteps = ({ staticData }) => {
  const {locale} = useRouter() ; 

  return (
    <div className="QuestionSteps ">
      <div className="">
        <img src="/assets/imgs/ask_ques.png" className="quesstepicon" np></img>
      </div>
      <div className="ques_step_txt border-2 border-secondary">
        <p className="text-center font-weight-bold card_steps">
          {staticData.howTo.title}
        </p>
        <p className="pt-2 text-center">{staticData.howTo.description}</p>
        <div className={`steps gap-3 d-flex ${locale==="arab"? "flex-row-reverse" : ""}`}>
          <img
            src="/assets/imgs/1.png"
            className="mr-4 mt-3"
            width="20px"
          ></img>
          <p> {staticData.howTo.steps[0]}</p>
        </div>
        <div className={`steps gap-3 d-flex ${locale==="arab"? "flex-row-reverse" : ""}`}>
          <img
            src="/assets/imgs/2.png"
            className="mr-4 mt-3"
            width="20px"
          ></img>
          <p> {staticData.howTo.steps[1]}</p>
        </div>
        <div className={`steps gap-3 d-flex ${locale==="arab"? "flex-row-reverse" : ""}`}>
          <img
            src="/assets/imgs/3.png"
            className="mr-4 mt-3"
            width="20px"
          ></img>
          <p> {staticData.howTo.steps[2]}</p>
        </div>
      </div>
    </div>
  );
};

export default AskingSteps;
