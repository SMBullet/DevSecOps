import * as React from "react";
import TemplateCard from "./TemplateCard";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const templateData = [
  {
    title: "Chatting with students or teachers",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e697ce9e88dd1aae7b25171b6cd2e01f4ab943553926de41eba1a9955820281d?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/17842c8faa5433f04fd682a2dedf093d1678734e6ea7334eb55c4e1ecda646f0?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73"
  },
  {
    title: "Managing your project in seconds",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e697ce9e88dd1aae7b25171b6cd2e01f4ab943553926de41eba1a9955820281d?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9545a1e78d23a441e650f76a7abb3b5dc3564d50c6f16e41b7539eabc5fee509?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73"
  },
  {
    title: "See whats on your schedule",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e697ce9e88dd1aae7b25171b6cd2e01f4ab943553926de41eba1a9955820281d?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/8a9493a3adae687f899fe50fc3f05382886172599f00fb940639b3d565ca1a40?placeholderIfAbsent=true&apiKey=be1db21a3f504db6b31d0e10490cbe73"
  }
];

const TemplatesSection = () => {
  const router = useRouter(); // Add this
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? templateData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === templateData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleStartNow = () => {
    router.push('/sign-in');
  };

  return (
    <div className="flex justify-center w-full px-4">
      <motion.section 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut"
          }
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex overflow-hidden flex-col items-center pt-40 pb-0 mt-20 bg-[#1C1C1C] rounded-[40px] max-md:mt-10 max-md:pt-20 w-full max-w-[1400px]"
        aria-labelledby="templates-heading"
      >
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="flex flex-col items-center pb-16 text-center px-24"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut"
                }
              }
            }}
            className="text-2xl font-medium text-yellow-500 font-mono uppercase tracking-wider"
          >
            Services
          </motion.div>
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut"
                }
              }
            }}
            id="Project-heading" 
            className="max-w-[1000px] mt-10 text-[64px] font-black leading-[1.2] text-white max-md:px-5"
          >
            Your solution to manage your end of studies projects
          </motion.h2>
          <motion.button 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut"
                }
              }
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 mt-14 text-xl font-medium bg-[#E6E6E6] rounded-full hover:bg-[#d1d1d1] transition-colors duration-300"
            aria-label="Explore all templates"
            onClick={handleStartNow} // Add this
          >
            Start Now
          </motion.button>
        </motion.div>

        <div className="relative w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="flex w-full gap-6 p-6 md:flex-row flex-col relative"
          >
            {/* Navigation Arrows - Updated styling */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 xl:hidden backdrop-blur-sm hover:scale-110"
              aria-label="Previous template"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 xl:hidden backdrop-blur-sm hover:scale-110"
              aria-label="Next template"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Mobile View - Updated animation and positioning */}
            <div className="lg:hidden w-full px-4">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.4, 0, 0.2, 1] 
                }}
                className="w-full"
              >
                <TemplateCard
                  title={templateData[currentIndex].title}
                  iconSrc={templateData[currentIndex].iconSrc}
                  imageSrc={templateData[currentIndex].imageSrc}
                  index={currentIndex}
                />
                {/* Updated dots navigation */}
                <div className="flex justify-center gap-3 mt-6 md:hidden">
                  {templateData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        currentIndex === index 
                          ? 'bg-white scale-125' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to template ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:flex w-full gap-6">
              {templateData.map((template, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { 
                      opacity: 0,
                      y: 50,
                      scale: 0.95
                    },
                    visible: { 
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    }
                  }}
                  className="flex-1"
                >
                  <TemplateCard
                    title={template.title}
                    iconSrc={template.iconSrc}
                    imageSrc={template.imageSrc}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};
export default TemplatesSection;