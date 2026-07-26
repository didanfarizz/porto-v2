'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast, smooth loading progress completion within < 1 second
    const startTime = performance.now();
    const duration = 650; // ms

    const updateProgress = () => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(onComplete, 200);
      }
    };

    const rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

  // Prevent body scrolling during splash load
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
        scale: 0.98,
        transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } 
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
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary/40 border-b-primary/10 border-l-primary/10"
          />
          <span className="text-3xl font-black bg-gradient-to-r from-primary to-white bg-clip-text text-transparent select-none">
            D
          </span>
        </div>

        {/* Title and progress */}
        <div className="text-center space-y-2">
          <h2 className="text-lg font-bold tracking-widest bg-gradient-to-r from-primary via-white to-white bg-clip-text text-transparent uppercase">
            Didan Fariz
          </h2>
          <p className="text-xs tracking-widest text-white/60 font-mono">
            INITIALIZING PORTFOLIO
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage text */}
        <span className="text-sm font-mono text-primary font-bold">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
}
