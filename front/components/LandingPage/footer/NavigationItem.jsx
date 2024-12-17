import * as React from "react";

const NavigationItem = ({ text, delay = 0 }) => (
  <a 
    href="#" 
    className="mt-4 text-gray-600 hover:text-stone-800 transition-colors duration-200 text-lg"
    style={{ animationDelay: `${delay}ms` }}
  >
    {text}
  </a>
);

export default NavigationItem;