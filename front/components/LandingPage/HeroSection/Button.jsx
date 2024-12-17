'use client';

import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = `
    transition-all duration-300 
    hover:scale-105 
    hover:shadow-lg 
    active:scale-95
    font-semibold
    px-8 py-3
    rounded-xl
    backdrop-blur-sm
    flex justify-center items-center gap-2
  `;
  
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-custom-blue via-custom-purple to-custom-pink 
      border border-white/20 
      hover:border-white/40
      hover:shadow-custom-purple/25
    `,
    secondary: `
      border border-stone-200/20 
      hover:border-stone-300/40 
      bg-white/10 
      hover:bg-white/20
      hover:shadow-stone-200/20
    `
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.replace(/\s+/g, ' ').trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;