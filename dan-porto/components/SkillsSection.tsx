'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Cpu, Wrench, CheckCircle } from 'lucide-react';

interface Skill {
  name: string;
  iconUrl: string;
  level: string;
  proficiency: number; // percentage 0-100
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend & Mobile',
    icon: Layout,
    skills: [
      { name: 'React.js', iconUrl: '/icons/React.png', level: 'Advanced', proficiency: 90 },
      { name: 'Next.js', iconUrl: '/icons/Next.js.png', level: 'Advanced', proficiency: 90 },
      { name: 'JavaScript', iconUrl: '/icons/JavaScript.png', level: 'Advanced', proficiency: 90 },
      { name: 'Tailwind CSS', iconUrl: '/icons/Tailwind.png', level: 'Advanced', proficiency: 90 },
      { name: 'HTML5', iconUrl: '/icons/HTML5.png', level: 'Expert', proficiency: 95 },
      { name: 'CSS3', iconUrl: '/icons/CSS3.png', level: 'Expert', proficiency: 90 },
      { name: 'Vite', iconUrl: '/icons/Vite.js.png', level: 'Intermediate', proficiency: 80 },
      { name: 'Bootstrap', iconUrl: '/icons/Bootstrap.png', level: 'Intermediate', proficiency: 85 },
    ],
  },
  {
    title: 'Backend & Databases',
    icon: Server,
    skills: [
      { name: 'Node.js', iconUrl: '/icons/Node.js.png', level: 'Intermediate', proficiency: 85 },
      { name: 'MySQL', iconUrl: '/icons/MySQL.png', level: 'Advanced', proficiency: 85 },
      { name: 'Laravel', iconUrl: '/icons/Laravel.png', level: 'Intermediate', proficiency: 80 },
      { name: 'CodeIgniter', iconUrl: '/icons/CodeIgniter.png', level: 'Intermediate', proficiency: 80 },
    ],
  },
  {
    title: 'AI & Data Science',
    icon: Cpu,
    skills: [
      { name: 'Python', iconUrl: '/icons/Python.png', level: 'Advanced', proficiency: 85 },
    ],
  },
  {
    title: 'Tools & Ecosystem',
    icon: Wrench,
    skills: [
      { name: 'Git', iconUrl: '/icons/Git.png', level: 'Advanced', proficiency: 85 },
      { name: 'Figma', iconUrl: '/icons/Figma.png', level: 'Advanced', proficiency: 80 },
    ],
  },
];

const softSkills = [
  'Problem Solving',
  'Adaptability',
  'Good Communication',
  'Teamwork',
  'Critical Thinking',
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].title);

  const currentCategory = skillCategories.find((cat) => cat.title === activeCategory) || skillCategories[0];

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 120, damping: 14 }
    },
  };

  return (
    <div className="py-20 px-4 sm:px-10 max-w-6xl mx-auto text-textMain flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20 inline-block">
          Technical Arsenal &amp; Capabilities
        </span>
        <h2 className="bg-gradient-to-r from-primary via-textMain to-textMain text-transparent bg-clip-text text-3xl sm:text-4xl font-extrabold tracking-tight">
          Skills &amp; Proficiency Levels
        </h2>
        <p className="text-sm text-textMain/80 max-w-md mx-auto">
          Frameworks, programming languages, and databases with estimated proficiency bars.
        </p>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.title;
          return (
            <button
              key={category.title}
              onClick={() => setActiveCategory(category.title)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                  : 'bg-secondary/20 hover:bg-secondary/40 text-textMain hover:text-primary border border-purple/15'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.title}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid with Progress Bars */}
      <div className="w-full mb-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full"
          >
            {currentCategory.skills.map((skill, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.03 }}
                className="bg-secondary/20 hover:bg-secondary/40 backdrop-blur-xl border border-purple/15 hover:border-primary/40 p-5 rounded-3xl shadow-lg flex flex-col justify-between group relative overflow-hidden transition-all duration-300 min-h-[160px]"
              >
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />

                <div className="flex flex-col items-center text-center">
                  {/* Skill Icon */}
                  <div className="w-11 h-11 mb-2.5 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 flex items-center justify-center relative filter drop-shadow-[0_4px_10px_rgba(131,80,235,0.25)]">
                    <Image 
                      src={skill.iconUrl} 
                      alt={`${skill.name} icon`} 
                      fill
                      sizes="44px"
                      className="object-contain"
                    />
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-sm font-bold text-textMain group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                </div>

                {/* Animated Progress Bar & Percentage */}
                <div className="w-full mt-3 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono font-semibold">
                    <span className="text-purple/80">{skill.level}</span>
                    <span className="text-primary font-bold">{skill.proficiency}%</span>
                  </div>
                  
                  {/* Outer Bar Track */}
                  <div className="w-full h-2 rounded-full bg-purple/15 border border-purple/20 overflow-hidden relative">
                    {/* Inner Animated Bar */}
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-purple shadow-sm shadow-primary/30"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Soft Skills Section Banner */}
      <div className="w-full bg-secondary/15 backdrop-blur-xl border border-purple/15 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-extrabold text-textMain">Soft Skills &amp; Work Ethic</h4>
          <p className="text-xs text-textMain/80">Key professional attributes that drive team success.</p>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-end gap-2.5">
          {softSkills.map((soft, idx) => (
            <span 
              key={idx}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{soft}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
