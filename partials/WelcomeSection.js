import React from "react";
import { Button } from "reactstrap";
import PathCard from "./PathCard";
import Motivation from "./MotivationSection";

class Welcome extends React.Component {
  render() {
    const tab = [
      {
        icon: "/assets/imgs/answer.png",
        title: "Ask question",
        text: "Small description that explains this step",
      },
      {
        icon: "/assets/imgs/answer.png",
        title: "Answer questions",
        text: "Small description that explains this step",
      },
      {
        icon: "/assets/imgs/validate.png",
        title: "Validate answer",
        text: "Small description that explains this step ",
      },
    ];
    return (
      <div className="">
        <div className="welcom row">
          <div className="col-12 col-md-6 ">
            <div className="welcome_title">
              WELCOME WITH US
              <div className="yellow_line"></div>
            </div>
            <p className="welcome_text h6 font-light">
              A learning platform to ask questions about everything related by
              studying in all materials , proposed for all the streams who have
              baccalaureate exam to find the answer from teachers , colleagues
              or baccalaurate holders .
            </p>
            <Button className="explore_btn signup">Explore more</Button>
          </div>
        </div>
        <div className="my-5">
          <div className="works_title">
            HOW IT WORKS
            <div className="yellow_line mb-5"></div>
            <div className="d-md-flex justify-content-center  my-5 px-5 ">
              {tab.map((elem, key) => (
                <div className="col-md-4" key={key}>
                  <PathCard
                    Title={tab[key].title}
                    icon={tab[key].icon}
                    Text={tab[key].text}
                  ></PathCard>
                </div>
              ))}
            </div>
            <div className="mt-5 ">
              <p className="mt-5 py-5 px-5 h1 ">
                Questions are everywhere, answers are on HERE <br />
                So start ask your questions
              </p>
              <Button className="askQuestionButton">Ask Your Question</Button>
            </div>
            <Motivation></Motivation>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
