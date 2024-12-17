'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import  NavLink  from './NavLink';
import  NavButton  from './NavButton';
import { HiMenu } from 'react-icons/hi';

const NavigationBar = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar if scrolling up or at the top
      setShouldShow(currentScrollY <= 0 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      className="fixed top-4 left-0 right-0 z-50 flex justify-center"
      initial={{ y: 0 }}
      animate={{ y: shouldShow ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <motion.nav
        className="flex flex-wrap gap-4 py-4 px-8 bg-white/80 backdrop-blur-md rounded-[50px] w-[800px] max-w-[50%] shadow-lg max-md:px-5 max-md:w-[90%]"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d3fa0acda4709463088d8534ef29b8770e2f51881da9808562b6afb12e42adf"
          className="object-contain shrink-0 my-auto max-w-full aspect-[4.59] w-[110px]"
          alt="Company Logo"
        />
        <div className="flex flex-auto gap-4 justify-between items-center pl-4 max-md:pl-2">
          <div className="hidden md:flex gap-8 items-center mx-auto">
            <NavLink text="Home" />
            <NavLink text="My Space" />
            <NavLink text="Contact" />
          </div>
          
          <div className="hidden md:flex gap-2.5 items-center">
            <NavButton text="Log in" variant="secondary" />
          </div>

          <div className="md:hidden relative group ml-auto">
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <HiMenu className="w-6 h-6" />
            </button>
            
            <div
              className="absolute top-14 right-0 bg-white rounded-xl shadow-lg py-4 px-6 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:opacity-100 hover:visible transition-[opacity,visibility] duration-100"
            >
              <div className="flex flex-col gap-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink text="Home" />
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink text="My Space" />
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink text="Contact" />
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="pt-2 border-t"
                >
                  <NavButton text="Log in" variant="secondary" className="w-full" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default NavigationBar;