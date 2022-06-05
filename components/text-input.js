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
      <textarea
        className="grow h-screen bg-blue-300 outline-none text-left p-2"
        onChange={handleInput}
        placeholder="Enter Input"
      />
    </div>
  );
};

export default TextInput;
