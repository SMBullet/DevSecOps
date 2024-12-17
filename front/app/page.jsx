'use client'
import { useState, useEffect } from 'react';
import { LandingPage } from "../components/LandingPage";
import Loader from "../components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for actual data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <LandingPage />
      )}
    </>
  );
}
