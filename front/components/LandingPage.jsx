'use client';

import React from 'react';
import NavigationBar from './LandingPage/NavBar/NavigationBar';
import HeroSection from './LandingPage/HeroSection/HeroSection';
import { motion } from 'framer-motion';
import TemplatesSection from './LandingPage/TemplateSec/TemplatesSection';
import IntegrationsSection from './LandingPage/IntegrationSec/IntergrationSection';
import TrialSection from './LandingPage/TrialSection/TrialSection';
export const LandingPage = () => {
  return (

    <div className='min-h-screen bg-[#EEE9DF] relative pt-24 w-full'>
      <div className="mx-4">
        <div className="bg-[#FBF9F5] rounded-[50px] shadow-lg overflow-hidden relative -mt-10 min-h-[95vh] pb-10">
          <NavigationBar />
          <div className="px-8 md:px-16">
            <HeroSection />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 1,
                    staggerChildren: 0.2
                  }
                }
              }}
            >
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { 
                  opacity: 0,
                  x: 100,
                  rotate: 5
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  rotate: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }
              }}
            >              
            <TemplatesSection />
            <IntegrationsSection />
            </motion.div>
          </div>
        </div>
        <TrialSection />
        </div>
    </div>
  );
};