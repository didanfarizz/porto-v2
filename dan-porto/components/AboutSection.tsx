'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Brain, Sparkles, FolderCheck, Award, Clock, Star } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { label: 'GPA Score', value: '3.83 / 4.00', icon: Star },
    { label: 'Completed Projects', value: '10+', icon: FolderCheck },
    { label: 'Certifications', value: '5+', icon: Award },
    { label: 'Years Experience', value: '1+', icon: Clock },
  ];

  const highlights = [
    {
      title: 'Education',
      subtitle: 'Universitas Gunadarma (3.83/4.00)',
      desc: 'Bachelor of Information Systems undergraduate with academic achievements including 1st Place USB Article Writing Competition.',
      icon: GraduationCap,
    },
    {
      title: 'Full-Stack Development',
      subtitle: 'Web & Mobile Applications',
      desc: 'Experienced in building responsive web applications, RESTful APIs, database-driven systems, and secure role-based applications (RBAC).',
      icon: Code2,
    },
    {
      title: 'Final Year Research',
      subtitle: 'SIDIA Medical Expert System',
      desc: 'Developing a prototype-based expert system integrated with a rule-based medical chatbot for Diabetes Diagnosis.',
      icon: Brain,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <div className="py-20 px-4 sm:px-10 max-w-6xl mx-auto text-textMain flex flex-col items-center">
      {/* Section Badge */}
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20 inline-block">
          About Me
        </span>
        <h2 className="bg-gradient-to-r from-primary via-textMain to-textMain text-transparent bg-clip-text text-3xl sm:text-4xl font-extrabold tracking-tight">
          Crafting Web Systems &amp; Medical AI Solutions
        </h2>
        <p className="text-sm text-textMain/80 max-w-xl mx-auto leading-relaxed">
          Information Systems undergraduate with over 1 years of experience developing responsive web &amp; mobile applications.
        </p>
      </div>

      {/* Main Grid: Bio + Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full mb-16 items-stretch">
        
        {/* Left Side: Bio Paragraphs */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 bg-secondary/20 backdrop-blur-xl border border-purple/15 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4 text-sm sm:text-base text-textMain/90 leading-relaxed">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Professional Summary</span>
            </div>
            
            <p>
              I&apos;m <strong className="text-textMain font-black">Didan Fariz Abqari</strong>, an Information Systems undergraduate at <strong className="text-textMain font-black">Universitas Gunadarma (GPA 3.83/4.00)</strong> with over 1 years of hands-on experience developing web and mobile applications through academic projects, organizational leadership, freelance work, and professional internships.
            </p>
            
            <p>
              My expertise spans building responsive web applications, RESTful APIs, database-driven systems, and secure Role-Based Access Control (RBAC) applications using modern tech stacks including <strong className="text-primary font-bold">Next.js, React, CodeIgniter 4, Node.js, and Flutter</strong>.
            </p>

            <p>
              For my final-year project, I am developing <strong className="text-primary font-bold">SIDIA</strong> — a prototype-based expert system integrated with a rule-based medical chatbot for Diabetes Diagnosis.
            </p>
          </div>

          {/* Quick Stats Grid inside Bio */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-purple/15">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center p-3 rounded-2xl bg-secondary/30 border border-purple/10">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-base font-black text-textMain">{stat.value}</div>
                  <div className="text-[10px] font-mono text-textMain/70 uppercase tracking-wider">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Side: 3 Key Highlight Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col gap-5 justify-between"
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-secondary/20 hover:bg-secondary/40 backdrop-blur-xl border border-purple/15 hover:border-primary/40 rounded-2xl p-6 shadow-lg transition-all duration-300 group flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-textMain group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-primary block">
                    {item.subtitle}
                  </span>
                  <p className="text-xs text-textMain/80 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
