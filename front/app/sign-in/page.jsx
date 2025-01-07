'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from 'react';

// LoginPage Component
export default function LoginPage() {
  const [isResetPassword, setIsResetPassword] = React.useState(false);

  return (
    <main className="min-h-screen bg-[#EEE9DF] flex flex-col lg:flex-row overflow-hidden relative">
      {/* Static image section with basketball bounce animation */}
      <motion.div 
        initial={{ x: -400, y: -400, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ 
          y: {
            type: "spring",
            stiffness: 100,
            damping: 5,
            mass: 1,
            duration: 2
          },
          x: {
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 1
          },
          opacity: {
            duration: 0.5
          }
        }}
        className="w-full lg:w-1/2 flex items-center justify-center lg:mt-0 -mb-8 lg:mb-0"
      >
        <div className="flex flex-col w-full max-w-[622px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6afe41a4703fa7a86f6a0daa7beaf138ce6cb6676411ecdf1c3ec03402c0527"
            alt=""
            className="w-full aspect-square object-contain lg:-mt-60"
          />
        </div>
      </motion.div>

      {/* Forms section with simple fade transition */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.6,
          delay: 0.2
        }}
        className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-0 lg:py-0"
      >
        <AnimatePresence mode="wait">
          {!isResetPassword ? (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <LoginForm onForgotPassword={() => setIsResetPassword(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="reset"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ResetPasswordForm onBack={() => setIsResetPassword(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

// Divider Component
function Divider({ text }) {
  return (
    <div className="flex items-center">
      <div className="shrink-0 h-px border border-solid border-zinc-800" />
      <span className="px-2 text-neutral-400">{text}</span>
      <div className="shrink-0 h-px border border-solid border-zinc-800" />
    </div>
  );
}

// Updated Checkbox Component
function Checkbox({ label }) {
  return (
    <label className="flex gap-2 items-center text-sm text-gray-600 cursor-pointer">
      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
      <span>{label}</span>
    </label>
  );
}

// Updated InputField Component
function InputField({ type, id, placeholder, "aria-label": ariaLabel }) {
  return (
    <div className="mt-8">
      <label htmlFor={id} className="sr-only">{ariaLabel}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full px-6 py-4 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
      />
    </div>
  );
}

// Updated GoogleButton Component
function GoogleButton() {
  useEffect(() => {
    // Initialize Google Sign-In
    const loadGoogleScript = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '1078873613017-o3t2335553914evlaaher2ja4dumst2s.apps.googleusercontent.com' // Replace with your client ID
        });
      });
    };

    // Add Google's script dynamically
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = loadGoogleScript;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, []);

  const handleGoogleSignIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      const id_token = googleUser.getAuthResponse().id_token;
      // Send token to your backend
      fetch('http://localhost:5050/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: id_token })
      })
      .then(response => response.json())
      .then(data => {
        // Handle successful login
        console.log('Google sign-in successful:', data);
      })
      .catch(error => {
        console.error('Error during Google sign-in:', error);
      });
    });
  };

  return (
    <button 
      type="button"
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-3 px-6 py-4 mt-6 text-white rounded-xl border bg-gray-900 hover:bg-[#4A3E3E] text-lg font-medium"
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/92b1215a7b4b4f42d1da0cb321f7f35e3ef4eea4e81e1aaf4ae255988e831bfc"
        alt=""
        className="w-6 h-6"
      />
      <span>Log in with Google</span>
    </button>
  );
}

// Updated LoginForm Component
function LoginForm({ onForgotPassword }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
  
    try {
      const response = await fetch('http://localhost:5050/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      console.log('Login successful:', data);
  
      // Extract and store the JWT in localStorage
      const token = data.token; // Assuming the token is in `data.token`
      sessionStorage.setItem('authToken', token); // Store token in localStorage
  
      // Extract and decode the JWT to get the user's role
      const base64Payload = token.split('.')[1]; // Extract payload
      const decodedPayload = JSON.parse(atob(base64Payload)); // Decode and parse
      const role = decodedPayload.role; // Get the role
  
      console.log('Decoded Role:', role);
  
      // Redirect based on role
      if (role === 'ADMIN') {
        window.location.href = '/admin/dashboard';
      } else if (role === 'TEACHER') {
        window.location.href = '/teacher/dashboard';
      } else {
        window.location.href = '/student/dashboard';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="bg-[#FBF9F5] rounded-[32px] p-6 lg:p-16 shadow-[0_4px_24px_rgba(0,0,0,0.04)] w-full max-w-[580px] mx-auto font-gt-alpina"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl font-semibold text-center text-gray-900 tracking-tight"
      >
        Welcome Back!
      </motion.h1>
      <motion.p 
        variants={itemVariants}
        className="mt-3 text-lg text-center text-gray-600"
      >
        Please enter your details
      </motion.p>
      
      <div className="mt-12 space-y-8">
        <InputField
          type="text"
          id="username"
          name="username"
          placeholder="Your username"
          aria-label="username"
        />
        
        <InputField
          type="password"
          id="password"
          placeholder="************"
          aria-label="Password"
        />
      </div>
      
      <div className="flex justify-between items-center mt-8">
        <label className="flex gap-3 items-center text-base text-gray-600 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded-md border-2 border-gray-300 appearance-none checked:bg-gray-900 checked:border-gray-900 transition-all cursor-pointer"
            />
            <svg 
              className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 [input:checked+&]:opacity-100" 
              viewBox="0 0 12 12" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M10 3L4.5 8.5L2 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span>Remember for 30 days</span>
        </label>
        <button 
          type="button" 
          onClick={onForgotPassword}
          className="text-base text-gray-600 hover:text-gray-900 transition-colors duration-200 h-fit"
        >
          Forgot Password?
        </button>
      </div>

      <button 
        type="submit" 
        className="w-full px-6 py-4 mt-10 text-white bg-gray-900 rounded-xl text-lg font-medium hover:bg-gray-800 transition-all duration-200 hover:shadow-lg"
      >
        Log in
      </button>

      <div className="relative mt-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-base">
          <span className="px-6 text-gray-500 bg-[#FBF9F5]">or</span>
        </div>
      </div>

      <GoogleButton />

      <p className="mt-12 text-base text-center text-gray-500 leading-relaxed">
        You acknowledge that you read, and agree, to our{" "}
        <a href="#" className="text-gray-900 hover:underline font-medium">Terms of Service</a> and our{" "}
        <a href="#" className="text-gray-900 hover:underline font-medium">Privacy Policy</a>.
      </p>
    </motion.form>
  );
}

// Add the ResetPasswordForm component
function ResetPasswordForm({ onBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="bg-[#FBF9F5] rounded-[32px] p-6 lg:p-16 shadow-[0_4px_24px_rgba(0,0,0,0.04)] w-full max-w-[580px] mx-auto font-gt-alpina"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl font-semibold text-center text-gray-900 tracking-tight"
      >
        Reset Password
      </motion.h1>
      <motion.p 
        variants={itemVariants}
        className="mt-3 text-lg text-center text-gray-600"
      >
        Enter your email to reset your password
      </motion.p>
      
      <div className="mt-12">
        <InputField
          type="email"
          id="reset-email"
          placeholder="Your email"
          aria-label="Email address"
        />
      </div>

      <button 
        type="submit" 
        className="w-full px-6 py-4 mt-10 text-white bg-gray-900 rounded-xl text-lg font-medium hover:bg-gray-800 transition-all duration-200 hover:shadow-lg"
      >
        Send Reset Link
      </button>

      <button 
        type="button" 
        onClick={onBack}
        className="w-full px-6 py-4 mt-4 text-gray-900 border border-gray-200 rounded-xl text-lg font-medium hover:bg-gray-50 transition-all duration-200"
      >
        Back to Login
      </button>

      <p className="mt-12 text-base text-center text-gray-500 leading-relaxed">
        Remember your password?{" "}
        <button
          type="button"
          onClick={onBack}
          className="text-gray-900 hover:underline font-medium"
        >
          Log in
        </button>
      </p>
    </motion.form>
  );
}