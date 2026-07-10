'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast progress counter up to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait 300ms before fading out
          setTimeout(onComplete, 300);
          return 100;
        }
        // Random increment for realistic load speed
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Prevent scrolling when loading is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -50,
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F0716] text-white"
    >
      {/* Decorative blur elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-purple/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center space-y-6">
        {/* Spinning gradient ring */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary/40 border-b-primary/10 border-l-primary/10"
          />
          {/* Initial "D" in the center */}
          <span className="text-3xl font-black bg-gradient-to-r from-primary to-white bg-clip-text text-transparent select-none">
            D
          </span>
        </div>

        {/* Title and progress */}
        <div className="text-center space-y-2">
          <h2 className="text-lg font-bold tracking-widest bg-gradient-to-r from-primary via-white to-white bg-clip-text text-transparent uppercase">
            Didan Fariz
          </h2>
          <p className="text-xs tracking-widest text-white/40 font-mono">
            INITIALIZING PORTFOLIO
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Percentage text */}
        <span className="text-sm font-mono text-primary font-bold">
          {Math.min(progress, 100)}%
        </span>
      </div>
    </motion.div>
  );
}
