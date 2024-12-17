import * as React from "react";
import { motion } from 'framer-motion';
import { IntegrationHeader } from "./IntegrationHeader";
const IntegrationsSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut"
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex justify-center gap-8 overflow-hidden text-white max-md:mt-10 mt-12 w-full max-w-[1400px] mx-auto px-6"
    >
      {/* Left Integration Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ 
          opacity: 1, 
          x: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2
          }
        }}
        viewport={{ once: true }}
        className="flex flex-col rounded-2xl bg-stone-800 w-[880px] pt-8"
      >
        <IntegrationHeader />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7ae18116598e68bfdb4520194fb656d0effd2b701b975679ea7ed506fb08074?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73"
          alt="Integration tools"
          className="object-contain mt-10 w-full max-md:max-w-full rounded-b-2xl"
        />
      </motion.div>

      {/* Right Showcase Section */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ 
          opacity: 1, 
          x: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: 0.3
          }
        }}
        viewport={{ once: true }}
        className="flex flex-col p-8 rounded-2xl bg-[#4F5AED] w-[480px] overflow-hidden"
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4">Showcase</h2>
            <p className="text-gray-100 text-xl">
              Get inspired by the creative ways our customers attract talent with
              Homerun.
            </p>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b62c87d2edd392c382e8fe20d243cac40b016c99c873b1ba68ff3aa739cbf241?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73"
            alt="showcase"
            className="object-contain mt-8 aspect-[1.82] max-md:max-w-full self-start -ml-8"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IntegrationsSection;