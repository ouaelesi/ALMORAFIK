import React, { useState } from "react";
import CalcuatorTableHeader from "./CalcuatorTableHeader";
import CalculatorTableRow from "./CalculatorTableRow";
import CalculatorTableFooter from "./CalculatorTableFooter";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { toolsPageDataAr } from "../../../data/TemporaryData/staticData/arab/toolsPage";
import { toolsPageDataEng } from "../../../data/TemporaryData/staticData/eng/toolsPage";
import { getUrlParams } from "../../../utils/router";

const CalculatorTable = ({ setAverage }) => {
  const { locale } = useRouter();
  const router = useRouter();

  const [data, setData] = useState(
    locale === "arab" ? toolsPageDataAr : toolsPageDataEng
  );

  const Tab = getUrlParams("spec");

  const [modules, setModules] = useState(null);

  useEffect(() => {
    setModules(null);
    setTotalNotes(0);
    setTotalCoef(1);
  }, [Tab]);

  useEffect(() => {
    !modules && setModules(data.calculator.modules[Tab ? Tab : "sci"]);
  }, [modules]);

  const [totalNotes, setTotalNotes] = useState(0);
  const [totalCoef, setTotalCoef] = useState(1);

  const getTotalCoef = () => {
    let total = 0;
    modules?.map((module) => {
      if ((module.optional && module.active) || !module.optional) {
        total += module.coef;
      }
    });
    setTotalCoef(total);
  };

  const reCalculate = () => {
    let total = 0;
    modules?.map((module) => {
      if ((module.optional && module.active) || !module.optional) {
        total += module.note * module.coef;
      }
    });

    setTotalNotes(total);
  };

  useEffect(() => {
    modules && getTotalCoef();
  }, [modules]);

  useEffect(() => {
    setAverage(totalNotes / totalCoef);
  }, [totalCoef, totalNotes]);

  return (
    <div className="my-4">
      <CalcuatorTableHeader />
      {modules ? (
        modules?.map((module, key) => (
          <CalculatorTableRow
            module={module}
            key={module._id}
            data={modules}
            setData={setModules}
            updateData={() => {
              reCalculate();
              getTotalCoef();
            }}
          />
        ))
      ) : (
        <div className="bg-blue-500/5 w-full h-[500px]"></div>
      )}

      <CalculatorTableFooter totalNotes={totalNotes} totalCoef={totalCoef} />

      <div
        className={`bg-blue-500/20 my-2 w-full h-[60px]  border border-white  flex rounded-md overflow-hidden  ${
          locale === "arab" ? "flex-row-reverse " : ""
        }`}
      >
        <div className="w-[24%] text-xl font-bold pt-2 border-r px-2 border-white  h-full">
          المعدل
        </div>

        <div className="w-[74%] border-r p-1 border-white pt-1 h-full">
          <div className="bg-white/40 text-2xl outline-none px-2  rounded-md w-full h-full shadow-inner border border-gray-400 pt-2">
            {totalNotes / totalCoef}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorTable;
