import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

const CalculatorTableRow = ({ module, data, setData, updateData }) => {
  const { locale } = useRouter();

  const [moduleData, setModule] = useState(module);

  // setModule Note
  const setModuleNote = (note) => {
    let newData = data;
    setModule({
      ...moduleData,
      note: note,
    });
    data.map((m, index) => {
      if (m.name === moduleData.name) {
        newData[index] = {
          ...moduleData,
          note: note,
        };

        setData(newData);
      }

      updateData();
    });
  };

  const checkModule = () => {
    let newData = data;
    setModule({ ...moduleData, active: !moduleData.active });
    data.map((m, index) => {
      if (m.name === moduleData.name) {
        newData[index] = {
          ...moduleData,
          active: !moduleData.active,
        };

        setData(newData);
      }

      updateData();
    });
  };

  return (
    <div
      className={`bg-blue-500/5 w-full h-fit border-t border-white  flex rounded-t-md overflow-hidden  ${
        locale === "arab" ? "flex-row-reverse " : ""
      }
      ${!moduleData.active && module.optional ? "opacity-30" : ""}
      `}
    >
      <div className="w-[24%] border-r px-2 border-white pt-1 h-full">
        {moduleData.name}{" "}
        <input
          type="checkbox"
          className={moduleData.optional ? "" : "hidden"}
          checked={moduleData.active}
          onChange={checkModule}
        />
      </div>
      <div className="w-[24%] border-r p-1  border-white  h-full">
        <input
          value={moduleData.note}
          className="bg-white shadow-inner outline-none px-2  rounded-md w-full h-[30px]"
          type="number"
          onChange={(e) => setModuleNote(e.target.value)}
        />
      </div>
      <div className="w-[24%] border-r p-1 border-white pt-1 h-full">
        <div className="bg-white/40 outline-none px-2  rounded-md w-full h-[30px] shadow-inner border border-gray-400 pt-[2px]">
          {moduleData.coef}
        </div>
      </div>
      <div className="w-[24%] border-r p-1 border-white pt-1 h-full">
        <input
          value={moduleData.note * moduleData.coef}
          className="bg-white/40 outline-none px-2  rounded-md w-full h-[30px] shadow-inner border border-gray-400"
          disabled
        ></input>
      </div>
    </div>
  );
};

export default CalculatorTableRow;
