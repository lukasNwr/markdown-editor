import React, { useState, useContext } from "react";
import { TextDataContext } from "../pages/index";

const TextInput = () => {
  const { textData, setTextData } = useContext(TextDataContext);

  const handleInput = (event) => {
    setTextData(event.target.value);
  };

  return (
    <div>
      <div className=" flex w-full bg-darkShade font-manrope font-regular text-bold text-whiteText text-sm h-8 items-center px-2">
        <span className="uppercase">markdown</span>
      </div>
      <textarea
        className="grow w-full h-screen bg-mainBg text-darkText outline-none text-left font-sourceCodePro p-4 placeholder-darkText"
        onChange={handleInput}
        placeholder="Enter Input"
      />
    </div>
  );
};

export default TextInput;
