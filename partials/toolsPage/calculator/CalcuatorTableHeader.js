import { useRouter } from "next/router";
import React from "react";

const CalcuatorTableHeader = () => {
  const { locale } = useRouter();

  return (
    <div
      className={`bg-blue-500/10 w-full h-[40px] border-t border-white  flex rounded-t-md overflow-hidden  ${
        locale === "arab" ? "flex-row-reverse " : ""
      }`}
    >
      <div className="w-[24%] border-r px-2 border-white pt-1 h-full">المادة</div>
      <div className="w-[24%] border-r px-2 border-white pt-1 h-full">النقطة		</div>
      <div className="w-[24%] border-r px-2 border-white pt-1 h-full">	المعامل	</div>
      <div className="w-[24%] border-r px-2 border-white pt-1 h-full">		الناتج</div>
    </div>
  );
};

export default CalcuatorTableHeader;
