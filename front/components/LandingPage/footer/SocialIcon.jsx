import * as React from "react";

const SocialIcon = ({ src, alt }) => (
  <div className="flex justify-center items-center pt-2.5 pr-2 w-12 h-full max-w-[311px]">
    <div className="flex justify-center items-center self-stretch px-1 my-auto w-10 h-10 bg-stone-800 max-w-[303px] min-h-[40px] rounded-[100px]">
      <div className="flex justify-center items-start self-stretch my-auto max-w-[40px] min-h-[34px] w-[34px]">
        <img loading="lazy" src={src} alt={alt} className="object-contain aspect-square w-[34px]" />
      </div>
    </div>
  </div>
);

export default SocialIcon;