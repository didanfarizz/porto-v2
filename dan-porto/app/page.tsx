'use client';

import React, { useState, Suspense } from 'react';
import Navbar from '@/components/navbar';
import Dashboard from '@/components/dashboard';
import ParallaxText from '@/components/parallax';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
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
            transition={{ duration: 0.6 }}
          >
            <Navbar />
            <Suspense fallback={null}>
              <ClientSideScroll />
            </Suspense>
            <div className="overflow-hidden relative w-full min-h-screen">
              <ClientBackground />
              
              {/* Glow spots with parallax scrolling */}
              <motion.div 
                style={{ y: yGlow1 }}
                className="bg-purple/20 w-72 h-72 right-0 rounded-full absolute translate-x-20 -translate-y-1/2 blur-3xl pointer-events-none"
              />
              <motion.div 
                style={{ y: yGlow2 }}
                className="bg-primary/10 w-80 h-80 left-0 rounded-full absolute -translate-x-24 top-[60vh] blur-3xl pointer-events-none"
              />

              {/* 1. Hero Section */}
              <div id="home" className="py-20">
                <Dashboard />
                <MotionWrapper delay={0.2}>
                  <ParallaxText />
                </MotionWrapper>
              </div>

              {/* 2. About Me Section */}
              <MotionWrapper>
                <div id="about" className="py-12">
                  <AboutSection />
                </div>
              </MotionWrapper>

              {/* 3. Experience & CV Timeline Section */}
              <MotionWrapper>
                <div id="experience" className="py-12">
                  <ExperienceSection />
                </div>
              </MotionWrapper>

              {/* 4. Tech Skills Section */}
              <MotionWrapper>
                <div id="skills" className="py-12">
                  <SkillsSection />
                </div>
              </MotionWrapper>

              {/* 5. Projects & Certificates Showcase */}
              <MotionWrapper>
                <div id="project" className="py-16">
                  <Project />
                </div>
              </MotionWrapper>

              {/* 6. Services Section */}
              <MotionWrapper>
                <div id="service" className="py-16">
                  <Service />
                </div>
              </MotionWrapper>

              {/* 7. Contact Section */}
              <MotionWrapper>
                <div id="contact" className="mt-12">
                  <Contact />
                </div>
              </MotionWrapper>

              {/* Footer */}
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
