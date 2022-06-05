import React, { useState } from "react";

const TextInput = () => {
  const [input, setInput] = useState(" ");

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const logValue = () => {
    console.log(input);
  };

  return (
    <div>
      <div className=" flex w-full bg-slate-600 text-bold text-gray-200 text-sm h-8 items-center px-2">
        <span className="uppercase">markdown</span>
      </div>
      <textarea
        className="grow w-full h-screen bg-blue-300 outline-none text-left p-2"
        onChange={handleInput}
        placeholder="Enter Input"
      />
    </div>
  );
};

export default TextInput;
