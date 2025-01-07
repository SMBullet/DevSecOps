import * as React from 'react';
import { useRouter } from 'next/navigation';

const NavButton = ({ text, variant, href }) => {
  const router = useRouter();
  const baseStyles = "text-lg leading-none text-center px-6 py-3.5 rounded-[30px] transition-all duration-200 hover:transform hover:scale-105";
  const variantStyles = variant === 'primary' 
    ? "text-white bg-blue-500 hover:bg-blue-600 shadow-md"
    : "text-stone-800  hover:bg-gray-100";

  const handleClick = () => {
    router.push(href || '/sign-in');
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default NavButton;