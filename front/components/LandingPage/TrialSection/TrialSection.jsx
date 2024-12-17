import * as React from "react";
import InfoItem from "./InfoItem";
import TrialButton from "./TrialButton";

const infoItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/64228c73c056afc906865b25ef5a037621d33b39c8f2dbe1ff0534daf33e085a?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73", text: "The first job is free" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/679aa027c47a2e593e979729110db0c9847975979dbace804eea64f500523b62?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73", text: "No credit card needed" }
];

const TrialSection = () => {
  const handleStartTrial = () => {
    // Handle trial start
  };

  return (
    <section className="flex flex-col items-center pt-20 pr-96 pb-16 pl-96 mt-10 bg-stone-800 rounded-[40px] max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col items-center max-md:max-w-full">
        <div className="flex justify-center items-start pb-5 max-w-full w-[250px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/05950dfaa58ddd2e20c7452327c639767a084defb5820ca7592717b0d67a0fe1?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73"
            alt="Homerun logo"
            className="object-contain aspect-[3.33] max-w-[250px] min-w-[240px] w-[250px]"
          />
        </div>
        <h1 className="flex justify-center items-start pt-2.5 pb-8 text-7xl font-black tracking-tighter text-center text-white leading-[66px] max-md:max-w-full max-md:text-4xl max-md:leading-10">
          <div className="px-4 pb-px min-w-[240px] max-md:max-w-full max-md:text-4xl max-md:leading-10">
            What are you waiting for?
            <br />
            Login to your space now
          </div>
        </h1>
        
        <TrialButton text="Log in" onClick={handleStartTrial} />
        
        <div className="flex justify-center items-center pt-6 pb-5 text-base leading-none text-center text-stone-500">
          <div className="flex gap-5 justify-center items-center self-stretch px-2.5 my-auto min-w-[240px]">
            {infoItems.map((item, index) => (
              <InfoItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrialSection;