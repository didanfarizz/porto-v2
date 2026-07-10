'use client';

import React, { useState, Suspense } from 'react';
import Navbar from '@/components/navbar';
import Dashboard from '@/components/dashboard';
import ParallaxText from '@/components/parallax';
import Service from '@/components/service';
import Project from '@/components/project';
import Contact from '@/components/Contact';
import Footer from '@/components/footer';
import ClientSideScroll from '@/components/ClientSideComponent';
import { MotionWrapper } from '@/components/motion/MotionWrapper';
import ClientBackground from '@/components/ClientBackground';
import LoadingScreen from '@/components/LoadingScreen';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();

  // Slow moving parallax backgrounds
  const yGlow1 = useTransform(scrollY, [0, 2000], [0, 350]);
  const yGlow2 = useTransform(scrollY, [0, 2000], [0, 500]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
              <ClientSideScroll />
            </Suspense>
            <div className="overflow-hidden relative w-full min-h-screen">
              <ClientBackground />
              
              {/* Glow spots with parallax scrolling */}
              <motion.div 
                style={{ y: yGlow1 }}
                className="bg-purple w-64 h-64 right-0 rounded-full absolute translate-x-20 -translate-y-1/2 blur-3xl pointer-events-none"
              />
              <motion.div 
                style={{ y: yGlow2 }}
                className="bg-primary/10 w-80 h-80 left-0 rounded-full absolute -translate-x-24 top-[60vh] blur-3xl pointer-events-none"
              />

              <div id="home" className="py-20">
                <Dashboard />
                <MotionWrapper delay={0.3}>
                  <ParallaxText />
                </MotionWrapper>
              </div>

              <MotionWrapper>
                <div id="service" className="py-16">
                  <Service />
                </div>
              </MotionWrapper>

              <MotionWrapper>
                <div id="project" className="py-32">
                  <Project />
                </div>
              </MotionWrapper>

              <MotionWrapper>
                <div id="contact" className="mt-16">
                  <Contact />
                </div>
              </MotionWrapper>

              <MotionWrapper>
                <Footer />
              </MotionWrapper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
