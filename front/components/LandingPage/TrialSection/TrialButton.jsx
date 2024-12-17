import * as React from "react";

const TrialButton = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="px-7 pt-4 pb-4 text-lg leading-none text-center text-white bg-blue-500 rounded-[30px] max-md:px-5"
  >
    {text}
  </button>
);

export default TrialButton;