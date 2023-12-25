import { useRouter } from "next/router";
import React from "react";

import { toolsPageDataAr } from "../../data/TemporaryData/staticData/arab/toolsPage";
import { toolsPageDataEng } from "../../data/TemporaryData/staticData/eng/toolsPage";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

const ToolsPage = () => {
  const { locale } = useRouter();
  const router = useRouter();

  const [data, setData] = useState(
    locale === "arab" ? toolsPageDataAr : toolsPageDataEng
  );

  useEffect(() => {
    setData(locale === "arab" ? toolsPageDataAr : toolsPageDataEng);
  }, [locale]);
  return (
    <div
      className={`Question_container ${locale === "arab" ? "text-end" : ""}`}
    >
      <div className="Questions_section px-2 py-3 ">
        <div
          className={`px-md-5 px-3   py-5   QuestionMenu  border-2 border-light text-white fs-2 ${
            locale === "arab" ? "text-end" : ""
          }`}
        >
          {data.title}
        </div>

        <div
          className={`flex ${locale === "arab" ? "flex-row-reverse" : ""} py-4`}
        >
          <div className="md:w-1/3 w-full bg-white rounded-md px-4 pt-2 pb-3">
            <Image
              width="200"
              height={200}
              src="/assets/imgs/Calculator.gif"
              className=" block mx-auto"
              alt="calculator gif"
            />
            <div className={`font-bold text-lg my-2`}>
              {data.calculator.title}
            </div>
            <div>{data.calculator.description}</div>
            <button
              className="btn btn_answer w-75 d-block mx-auto my-2 "
              onClick={() => {
                router.push("/tools/calculator");
              }}
            >
              {data.calculator.cardAction}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
