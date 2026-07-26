'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code2, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ProfileCard() {
  return (
    <div className="w-[310px] sm:w-[380px] relative select-none group perspective-1000">
      {/* Background Soft Glow Aura */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple to-pink-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-700 pointer-events-none" />

      {/* Main Glass Card Container */}
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative rounded-3xl bg-secondary/20 backdrop-blur-2xl border border-primary/30 p-6 shadow-2xl overflow-hidden flex flex-col items-center"
      >
        {/* Top Status Pill */}
        <div className="w-full flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider text-primary bg-primary/10 border border-primary/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
            <span>Verified Portfolio</span>
          </div>

          <div className="w-7 h-7 rounded-full bg-purple/20 border border-purple/30 flex items-center justify-center text-primary">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
        </div>

        {/* Profile Image Frame with Gradient Border Ring */}
        <div className="relative w-48 h-60 sm:w-56 sm:h-64 rounded-2xl p-1 bg-gradient-to-tr from-primary via-purple to-pink-500 shadow-xl group-hover:shadow-primary/40 transition-shadow duration-500 mb-6">
          <div className="w-full h-full rounded-[14px] overflow-hidden relative bg-[#180E29]">
            <Image
              src="/profil-4.jpeg"
              alt="Didan Farizz Profile"
              fill
              sizes="(max-width: 768px) 220px, 260px"
              className="object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
              priority
            />

            {/* Inner Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0716]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating Pill Tag 1: Software Developer (Floats at top-left edge OUTSIDE face) */}
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute -top-3 -left-6 z-20 bg-[#0F0716]/95 backdrop-blur-xl border border-primary/50 text-white px-3.5 py-1.5 rounded-xl shadow-2xl flex items-center gap-1.5 text-[11px] font-bold font-mono tracking-wide"
          >
            <Code2 className="w-3.5 h-3.5 text-primary" />
            <span>Software Developer</span>
          </motion.div>

          {/* Floating Pill Tag 2: AI & ML Enthusiast (Floats at bottom-right edge OUTSIDE photo) */}
          <motion.div 
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-3 -right-6 z-20 bg-[#0F0716]/95 backdrop-blur-xl border border-purple/50 text-white px-3.5 py-1.5 rounded-xl shadow-2xl flex items-center gap-1.5 text-[11px] font-bold font-mono tracking-wide"
          >
            <Cpu className="w-3.5 h-3.5 text-purple" />
            <span>AI &amp; ML Enthusiast</span>
          </motion.div>
        </div>

        {/* Name & Title Summary */}
        <div className="text-center space-y-1">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-textMain group-hover:text-primary transition-colors">
            Didan Fariz Abqari
          </h3>
          <p className="text-xs font-mono font-semibold text-textMain/80">
            Information Systems Student
          </p>
        </div>
      </motion.div>
    </div>
  );
}
