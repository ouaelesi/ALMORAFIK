import { useRouter } from "next/router";
import React from "react";

const CalculatorTableFooter = ({ totalNotes, totalCoef }) => {
  const { locale } = useRouter();

  return (
    <div
      className={`bg-blue-500/20 w-full h-[40px] border-b border-t border-white  flex rounded-b-md overflow-hidden  ${
        locale === "arab" ? "flex-row-reverse " : ""
      }`}
    >
      <div className="w-[24%] border-r px-2 border-white pt-1 h-full">
        المجموع
      </div>
      <div className="w-[24%] border-r p-1  border-white  h-full"></div>
      <div className="w-[24%] border-r p-1 border-white pt-1 h-full">
        <div className="bg-white/40 outline-none px-2  rounded-md w-full h-full shadow-inner border border-gray-400 pt-[2px]">
          {totalCoef}
        </div>
      </div>
      <div className="w-[24%] border-r p-1 border-white pt-1 h-full">
        <div className="bg-white/40 outline-none px-2  rounded-md w-full h-full shadow-inner border border-gray-400">
          {totalNotes}
        </div>
      </div>
    </div>
  );
};

export default CalculatorTableFooter;
