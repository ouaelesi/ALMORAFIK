import { useRouter } from "next/router";
import React, { Component, useEffect, useState } from "react";
import { aboutUsData } from "../data/TemporaryData/staticData/arab/aboutUsData";
import { aboutUsDataEng } from "../data/TemporaryData/staticData/eng/aboutUsData";

const WhoAreWe = () => {
  const { locale } = useRouter();

  // state
  const [data, setData] = useState(aboutUsData);

  useEffect(() => {
    locale === "arab" ? setData(aboutUsData) : setData(aboutUsDataEng);
  }, [locale]);

  return (
    <div className="whoarewe ">
      <div className={`d-flex justify-between ${locale === "arab" ? "flex-row-reverse text-end" : "text-start"}`}>
        <div className="col-md-5  fw-bolder pt-36 ">
          <div className="fs-1 fw-bolder ">
            {data.header.title}
            <div className="yellow_line w-25 mx-auto"></div>
          </div>
          <p className=" fs-4 fw-lighter mt-3 ">{data.header.description}</p>
          <img src="/assets/imgs/colorShapes.png" width="300px"></img>
        </div>
        <div className="col-md-5 pt-20">
          <img src="/assets/imgs/whoarewe.png" width="1000px"></img>
      
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;
