import * as React from "react";

const TemplateCard = ({ title, iconSrc, imageSrc }) => {
  return (
    <div className="flex flex-col w-full md:w-[420px] h-[420px] bg-[#4A3E3E] rounded-3xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-transform duration-300">
      <div className="flex flex-col flex-1 p-8">
        <div className="flex justify-between items-start mb-auto">
          <h3 className="text-3xl font-bold text-white whitespace-pre-line">{title}</h3>
          <img src={iconSrc} alt="" className="w-8 h-8" />
        </div>
        <div className="mt-auto">
          <img 
            src={imageSrc} 
            alt="" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;