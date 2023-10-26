import React, { useEffect, useState } from "react";
import AskingSteps from "../partials/AskingSteps";
import QuestionBody from "../partials/QuestionBody";
import { useRouter } from "next/router";
import { askQuestionData } from "../data/TemporaryData/staticData/arab/askQuestionData";
import { askQuestionEnData } from "../data/TemporaryData/staticData/eng/askQuestionData";

const CollectQuestions = () => {
  const { locale } = useRouter();

  const [staticData, setStaticData] = useState(askQuestionData);



  useEffect(() => {
    locale === "arab"
      ? setStaticData(askQuestionData)
      : setStaticData(askQuestionEnData);
  }, [locale]);

  return (
    <div
      className={`QuestionStepscontainer ${
        locale === "arab" ? "text-end" : "text-start"
      }`}
    >
      <div className="AskQuestions">
        <div className="row">
          <div
            className={`col-12 col-md-8 my-4 ${
              locale === "arab" ? "order-2" : "order-1"
            }`}
          >
            <QuestionBody staticData={staticData}></QuestionBody>
          </div>
          <div
            className={`col-sm-8 col-11 col-md-4 ml-auto mr-auto order-first  ${
              locale === "arab" ? "order-1" : "order-md-2"
            }`}
          >
            <AskingSteps staticData={staticData}></AskingSteps>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectQuestions;
