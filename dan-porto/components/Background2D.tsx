'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Background2D() {
  return (
    <div className="absolute inset-0 w-full h-full -z-40 pointer-events-none bg-background transition-colors duration-500 overflow-hidden">
      {/* Subtle Dot Matrix Tech Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#8350EB 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Floating Animated Gradient Orbs */}
      {/* Orb 1: Top Right Purple Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: 'easeInOut',
        }}
        className="absolute top-[-5%] right-[-5%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-gradient-to-br from-purple/30 via-primary/20 to-transparent blur-[120px] opacity-60 pointer-events-none"
      />

      {/* Orb 2: Center Left Primary Glow */}
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-[40%] left-[-10%] w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-gradient-to-tr from-primary/25 via-purple/15 to-transparent blur-[140px] opacity-50 pointer-events-none"
      />

      {/* Orb 3: Bottom Right Accent Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-[-10%] right-[10%] w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] rounded-full bg-gradient-to-tl from-pink-500/15 via-primary/20 to-transparent blur-[130px] opacity-45 pointer-events-none"
      />
    </div>
  );
}
