import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import PathCard from "./PathCard";
import Motivation from "./MotivationSection";
import Tilt from "react-parallax-tilt";

// next link
import Link from "next/link";

// data
import { homeDataEng } from "../data/TemporaryData/staticData/eng/homeData";
import { homeData } from "../data/TemporaryData/staticData/arab/homeData";
import { useRouter } from "next/router";
import Image from "next/image";

const Welcome = () => {
  const { locale } = useRouter();

  // state
  const [HeaderData, setData] = useState(homeData);

  useEffect(() => {
    locale === "arab" ? setData(homeData) : setData(homeDataEng);
  }, [locale]);

  const tab = [
    {
      icon: "/assets/imgs/ask_ques.png",
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
      <div
        className={`pt-4 ${
          locale === "arab" ? "flex-row-reverse text-end" : "text-start"
        } d-flex relative `}
      >
        <div className="welcom  col-md-6  pt-5 mt-3 fw-bolder">
          <div className="welcome_title pt-md-5  fw-bolder display-1">
            {HeaderData.header.title}
            <div className="yellow_line w-25 ml-auto"></div>
          </div>
          <p className="welcome_text h6 font-light">
            {HeaderData.header.description}
          </p>
          <Link href="/questions">
            <Button className="explore_btn px-7 fw-medium  signup">
              {HeaderData.header.action}
            </Button>
          </Link>
          <img
            src="/assets/imgs/colorShapes.png"
            width="400px"
            className={`mt-16 ${locale === "arab" ? "ml-auto" : ""}  `}
          ></img>
        </div>
        <div
          className="col-6 pt-4 mt-8 d-none d-md-block"
          style={{ marginTop: 40 }}
        >
          <Tilt tiltReverse>
            <Image
              src="/assets/imgs/homeillustration.svg"
              width={500}
              height={500}
              className="block mx-auto cursor-pointer"
              alt="almorafik home illustration"
              style={{ width: "500px" }}
            />
          </Tilt>
        </div>
        <img
          src={
            locale === "arab"
              ? "/assets/imgs/cloud.png"
              : "/assets/imgs/cloud.png"
          }
          className={`mx-auto position-absolute top-0 ${
            locale === "arab" ? "end-0" : "start-0"
          } homeShape1`}
        ></img>

        {/* <img
          src={
            locale === "arab"
              ? "/assets/imgs/homeShape.svg"
              : "/assets/imgs/homeShape2.svg"
          }
          className={`d-md-block d-none block mx-auto position-absolute bottom-0 ${
            locale === "arab" ? "start-0" : "end-0"
          }  homeShape2`}
        ></img> */}
      </div>
      <div className="my-md-5">
        <div className="fs-1 fw-bolder text-center">
          <div className=" fw-bolder w-fit mx-auto">
            {HeaderData.howItWorks.title}
            <div className="yellow_line mb-5 w-25 mx-auto"></div>
          </div>

          <div
            className={`d-md-flex justify-content-center  my-5 px-5  HowItWorks ${
              locale === "arab" ? "flex-md-row-reverse" : ""
            }`}
          >
            {HeaderData.howItWorks.steps.map((elem, key) => (
              <div className="col-md-4 " key={key}>
                <PathCard
                  Title={elem.title}
                  icon={elem.icon}
                  Text={elem.text}
                ></PathCard>
              </div>
            ))}
          </div>
          <div className="mt-5 ">
            <p className="mt-5 py-5 px-md-10 px-2 fs-md-1 fs-2 fw-bolder w-75 mx-auto">
              {HeaderData.howItWorks.quote}
            </p>
            <Link href="/askQuestion">
              <Button className="askQuestionButton fw-bold">
                {HeaderData.howItWorks.action}
              </Button>
            </Link>
          </div>
          <Motivation></Motivation>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
