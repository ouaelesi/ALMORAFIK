import { useRouter } from "next/router";
import React from "react";

import { toolsPageDataAr } from "../../data/TemporaryData/staticData/arab/toolsPage";
import { toolsPageDataEng } from "../../data/TemporaryData/staticData/eng/toolsPage";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import CalculatorTable from "../../partials/toolsPage/calculator/CalculatorTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFieldArray } from "react-hook-form";

import { getUrlParams, updateTabUrlParams } from "../../utils/router";

const Calculator = () => {
  const Tab = getUrlParams("spec");

  const { locale } = useRouter();
  const router = useRouter();

  const [average, setAverage] = useState(0);

  const [memePic, setMemePic] = useState("");

  const [data, setData] = useState(
    locale === "arab" ? toolsPageDataAr : toolsPageDataEng
  );

  const [profileTablerData, setProfileTablerData] = useState(
    data.calculator.spetialities
  );

  const [activeTab, setTab] = useState(profileTablerData[0]);

  const getPic = (average) => {
    if (average === 0) {
      setMemePic("/calculating.gif");
    }
    if (average > 0 && average <= 4) {
      setMemePic("/assets/mr-incredible/p0.png");
    }
    if (average > 4 && average <= 5) {
      setMemePic("/assets/mr-incredible/p1.png");
    }
    if (average > 5 && average <= 6) {
      setMemePic("/assets/mr-incredible/p2.png");
    }
    if (average > 6 && average <= 8) {
      setMemePic("/assets/mr-incredible/p3.png");
    }
    if (average > 8 && average <= 9.9) {
      setMemePic("/assets/mr-incredible/p4.png");
    }
    if (average > 9.9 && average <= 12) {
      setMemePic("/assets/mr-incredible/p5.png");
    }

    if (average > 12 && average <= 16.9) {
      let pic = average - (average % 1) - 6;
      setMemePic("/assets/mr-incredible/p" + pic + ".png");
    }

    if (average >= 17 && average < 18) {
      setMemePic("/assets/mr-incredible/p12.png");
    }
    if (average >= 18 && average <= 20) {
      setMemePic("/assets/mr-incredible/p13.png");
    }
    
  };

  useEffect(() => {
    setData(locale === "arab" ? toolsPageDataAr : toolsPageDataEng);
  }, [locale]);

  useEffect(() => {
    router.push(updateTabUrlParams(activeTab.label, "spec"));
  }, [activeTab]);

  useEffect(() => {
    getPic(average);
  }, [average]);

  return (
    <div
      className={`Question_container bg-white ${
        locale === "arab" ? "text-end" : ""
      }`}
    >
      <div className="Questions_section px-2 py-3  ">
        <div
          className={`px-md-5 px-3   py-5   QuestionMenu  border-2 border-light text-white fs-2 ${
            locale === "arab" ? "text-end" : ""
          }`}
        >
          {data.calculator.title}
        </div>
        <div className="font-semibold text-lg mt-4">
          {data.calculator.chooseSpetiality}
        </div>
        <div
          className={`d-md-flex  mt-4 md:w-fit w-full  p-1 border-2 rounded-md bg-light ${
            locale === "arab" ? "flex-row-reverse ml-auto" : ""
          }`}
        >
          {profileTablerData.map((tab, key) => (
            <div
              key={key}
              className={`
              
              ${
                tab.name === activeTab.name
                  ? "text-white  bg-blue-color fw-semibold"
                  : ""
              }
      
              ${locale === "arab" ? "md:justify-end" : "md:justify-start"}
              cursor-pointer justify-center hover-text-warning px-4 py-2 rounded-md d-flex gap-2`}
              onClick={() => setTab(tab)}
            >
              {tab.name}
            </div>
          ))}
        </div>
        <div
          className={` flex ${locale === "arab" ? "flex-row-reverse " : ""}`}
        >
          <div className="md:w-[75%] w-full">
            <CalculatorTable setAverage={setAverage} />
          </div>

          <div className="w-[24%] mt-5 hidden md:block">
            <Image
              src={memePic}
              width={150}
              height={150}
              className="block mx-auto"
              alt="calculator almorafik w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
