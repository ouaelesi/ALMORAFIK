import { useRouter } from "next/router";
import React, { Component } from "react";
const LoginSteps = ({ staticData }) => {
  const { locale } = useRouter();
  return (
    <div className="loginstepsContainer ">
      <div className="JOINUS">{staticData.signUp.joinUs.title}</div>
      <div className="loginsteps">
        <div
          className={`loginstep my-3 d-flex ${
            locale === "arab" ? "flex-row-reverse" : ""
          }`}
        >
          <img
            className="mr-3"
            src="/assets/imgs/ask_ques.png"
            width="60px"
          ></img>{" "}
          {staticData.signUp.joinUs.steps[0]}
        </div>
        <div
          className={`loginstep my-3 d-flex ${
            locale === "arab" ? "flex-row-reverse" : ""
          }`}
        >
          <img
            className="mr-3"
            src="/assets/imgs/answer.png"
            width="60px"
          ></img>{" "}
          {staticData.signUp.joinUs.steps[1]}
        </div>
        <div
          className={`loginstep my-3 d-flex ${
            locale === "arab" ? "flex-row-reverse" : ""
          }`}
        >
          <img
            className="mr-3"
            src="/assets/imgs/answer.png"
            width="60px"
          ></img>{" "}
          {staticData.signUp.joinUs.steps[2]}
        </div>
      </div>
    </div>
  );
};

export default LoginSteps;
