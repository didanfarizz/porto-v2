'use client';

import Lanyard from './Lanyard';
import Sosmed from './sosmed';
import DownloadCv from './DownloadCv';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { scrollY } = useScroll();
  
  // Parallax calculations: text moves slightly slower, image moves faster
  const yText = useTransform(scrollY, [0, 500], [0, 80]);
  const yImage = useTransform(scrollY, [0, 500], [0, 120]);
  
  // Fade out Hero section as you scroll down
  const opacityHero = useTransform(scrollY, [0, 450], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 } 
    },
  };

  return (
    <div className="text-textMain relative overflow-hidden">
      {/* Background soft glowing spot behind Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto py-12 sm:py-20 px-4 sm:px-10 lg:px-12 min-h-[85vh]">
        
        {/* Left Side: Hero Info */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6" 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
          style={{ y: yText, opacity: opacityHero }}
        >
          {/* Status Pill Hanger */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span>Open for Opportunities</span>
          </motion.div>

          {/* Heading Title */}
          <div className="space-y-2">
            <motion.h3 variants={itemVariants} className="text-xl sm:text-2xl font-bold tracking-tight text-textMain/70">
              Hi, I&apos;m
            </motion.h3>
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-primary via-purple to-pink-500 text-transparent bg-clip-text"
            >
              Didan Farizz
            </motion.h1>
            <motion.p 
              variants={itemVariants} 
              className="text-lg sm:text-xl font-mono font-bold text-primary tracking-wide"
            >
              Web Developer & ML Engineer
            </motion.p>
          </div>

          {/* Intro Description */}
          <motion.p 
            variants={itemVariants} 
            className="text-sm sm:text-base text-textMain/75 leading-relaxed max-w-lg"
          >
            I am an Information Systems student passionate about building immersive, interactive web experiences and developing machine learning solutions. Let&apos;s turn complex logic into gorgeous, functional digital realities!
          </motion.p>

          {/* Social Icons Wrapper */}
          <motion.div variants={itemVariants} className="pt-2">
            <Sosmed />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap items-center gap-4 justify-center lg:justify-start w-full"
          >
            <DownloadCv />
            <a 
              href="#contact" 
              className="bg-gradient-to-r from-primary to-purple hover:opacity-95 text-white py-3.5 px-8 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 flex items-center gap-2 group/talk hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4 group-hover/talk:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Interactive Lanyard Profile */}
        <motion.div 
          className="w-full lg:w-1/2 flex justify-center items-center relative" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          style={{ y: yImage, opacity: opacityHero }}
        >
          {/* Subtle glow spot behind the 3D canvas */}
          <div className="absolute w-60 h-60 rounded-full bg-primary/10 blur-3xl pointer-events-none -z-10 animate-pulse" />
          
          <Lanyard />
        </motion.div>

      </div>
    </div>
  );
}
