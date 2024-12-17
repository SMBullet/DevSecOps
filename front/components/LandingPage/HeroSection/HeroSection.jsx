'use client';

import * as React from 'react';
import Button from './Button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '../../../public/assets';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/sign-in');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center w-full px-4 min-h-screen"
    >
      <div className="flex flex-col items-center justify-center w-full text-center max-w-[1400px] max-md:max-w-full">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center items-start pt-5 pb-8 max-w-full text-7xl font-black tracking-tighter leading-none text-stone-800 w-[1100px] max-md:text-4xl"
        >
          <div className="flex flex-col items-center px-20 min-w-[240px] w-[1100px] max-md:px-5 max-md:text-4xl">
            <div className="flex z-10 flex-col mt-0 max-w-full w-[800px] max-md:text-4xl">
              <div className="flex flex-col items-center justify-center gap-1 max-md:text-4xl">
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex justify-center items-center gap-2 w-full"
                >
                  <span className="text-center text-justify">A radically</span>
                  <Image
                    src={assets.icon1}
                    alt="Decorative element"
                    className="object-contain shrink-0 mt-2 aspect-[1.34] w-[108px] animate-float"
                    width={108}
                    height={108}
                  />
                </motion.div>

                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex justify-center items-center gap-2 w-full"
                >
                  <Image
                    src={assets.icon2}
                    alt="Decorative element"
                    className="object-contain shrink-0 mt-2 aspect-[1.34] w-[108px] animate-float"
                    width={108}
                    height={108}
                  />
                  <span className="text-center text-justify">easy-to-use</span>
                </motion.div>

                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex justify-center items-center gap-2 w-full"
                >
                  <span className="text-center text-justify">management tool</span>
                  <Image
                    src={assets.icon3}
                    alt="Decorative element"
                    className="object-contain shrink-0 aspect-[0.74] w-[59px] animate-float"
                    width={59}
                    height={59}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex justify-center items-start self-stretch pb-2.5 text-2xl leading-loose text-stone-800 max-md:max-w-full"
        >
          <div className="flex flex-col items-center px-48 min-w-[240px] max-md:px-5 max-md:max-w-full">
            <div className="max-md:max-w-full">
              The ultimate end-of-studies management system.
            </div>
            <div className="max-md:max-w-full">
              Organize, schedule and store in minutes with Homerun.
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex items-start pt-8 text-lg"
        >
          <div className="flex gap-4 items-start min-w-[240px]">
            <Button variant="secondary" className="w-[250px] group">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc0cf72ea4fd817c7494e7b4850d9fd307dfad52355f9be96c6cc41571c96094"
                alt="Play icon"
                className="object-contain shrink-0 w-6 aspect-square transition-transform group-hover:scale-110"
                width={24}
                height={24}
              />
              <span>Demo video</span>
            </Button>
            <Button variant="primary" onClick={handleLoginClick}>
              Login to your space           
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;