import * as React from "react";

const InfoItem = ({ icon, text }) => (
  <div className="flex gap-1.5 items-start self-stretch my-auto w-[161px]">
    <img
      loading="lazy"
      src={icon}
      alt=""
      className="object-contain shrink-0 my-auto w-3 aspect-[1.5]"
    />
    <div className="self-start pb-px pl-px">
      {text}
    </div>
  </div>
);

export default InfoItem;