import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { homeData } from "../data/TemporaryData/staticData/arab/homeData";
import { homeDataEng } from "../data/TemporaryData/staticData/eng/homeData";

const Motivation = () => {
  const { locale } = useRouter();

  // state
  const [HeaderData, setData] = useState(homeData);

  useEffect(() => {
    locale === "arab" ? setData(homeData) : setData(homeDataEng);
  }, [locale]);
  return (
    <div className="Motivation">
      <div className="box p-3 fw-bolder  px-md-4 bg-light border border-dark">
        <div className="fs-1 fw-bolder py-4">{HeaderData.motivation.title}</div>
        <div
          className={`content  fs-5 mb-2 ${
            locale === "arab" ? "text-end" : "text-end"
          }`}
        >
          {HeaderData.motivation.description}
        </div>
        <Button className="my-3"> {HeaderData.motivation.action}</Button>
      </div>
    </div>
  );
};

export default Motivation;
