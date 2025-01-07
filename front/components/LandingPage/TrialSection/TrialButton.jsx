import * as React from "react";
import { useRouter } from "next/navigation";

const TrialButton = ({ text }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/sign-in");
  };

  return (
    <button
      onClick={handleClick}
      className="px-7 pt-4 pb-4 text-lg leading-none text-center text-white bg-blue-500 rounded-[30px] max-md:px-5"
    >
      {text}
    </button>
  );
};

export default TrialButton;