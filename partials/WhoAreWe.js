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
      <div className={`row ${locale === "arab" ? "text-end" : "text-start"}`}>
        <div className="col-md-5  fw-bolder">
          <div className="fs-1 fw-bolder ">
            {data.header.title}
            <div className="yellow_line w-25 mx-auto"></div>
          </div>
          <p className=" fs-4 fw-lighter mt-3 ">{data.header.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;
