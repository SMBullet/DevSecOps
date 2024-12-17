import * as React from "react";
import NavigationItem from "./NavigationItem";

const NavigationSection = ({ items }) => {
  return (
    <nav className="flex flex-col">
      {items.map((item, index) => (
        <NavigationItem 
          key={index} 
          {...item} 
          delay={index * 50}
        />
      ))}
    </nav>
  );
};

export default NavigationSection;