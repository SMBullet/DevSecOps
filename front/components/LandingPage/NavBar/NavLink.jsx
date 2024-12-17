import * as React from 'react';

const NavLink = ({ text }) => {
  return (
    <div className="relative group cursor-pointer overflow-hidden">
      <div className="text-xl leading-none text-stone-800 group-hover:text-amber-900 group-hover:-translate-y-0.5 transition-all duration-300 ease-out">
        {text}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
    </div>
  );
};

export default NavLink;