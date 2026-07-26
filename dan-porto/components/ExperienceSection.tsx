'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Users, Calendar, MapPin, ChevronRight, Award } from 'lucide-react';

interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  category: 'Work' | 'Organization' | 'Education';
  description: string[];
  techUsed: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: 'Sep 2025 - Dec 2025',
    role: 'Web Programmer Intern',
    organization: 'Dinas Komunikasi dan Informatika (Diskominfo) - Kota Tangerang',
    location: 'Kota Tangerang, Indonesia',
    category: 'Work',
    description: [
      'Developed and maintained modules for an internal web-based project management system using CodeIgniter 4 and MySQL.',
      'Implemented REST API integration to support efficient data communication across application modules.',
      'Implemented Role-Based Access Control (RBAC) to enforce secure access permissions for multiple internal roles, including Web Developers, System Analysts, IT Support, and department management.',
      'Maintained master data and transaction modules while improving application functionality based on internal user requirements.',
      'Collaborated with developers and stakeholders to deliver reliable software solutions for internal operational workflows.',
    ],
    techUsed: ['CodeIgniter 4', 'MySQL', 'REST API', 'RBAC', 'PHP', 'System Analysis'],
  },
  {
    period: 'Nov 2023 - Sep 2024',
    role: 'Information Technology Development Staff',
    organization: 'Badan Eksekutif Mahasiswa (BEM) FIKTI - Gunadarma University',
    location: 'Depok, Indonesia',
    category: 'Organization',
    description: [
      'Developed the official website application for the TechnoFair 11.0 national technology event, including informational pages and supporting features.',
      'Built an Open Recruitment Volunteer website featuring registration forms, data management, and user-friendly administrative interfaces.',
      'Developed the PEMIRA BEM FIKTI 2024/2025 website used by students for the online election of the student executive board president.',
      'Implemented clear UI structure and user flows to ensure digital accessibility for non-technical users.',
    ],
    techUsed: ['Next.js', 'React', 'TailwindCSS', 'TypeScript', 'Git', 'Figma'],
  },
  {
    period: 'Sep 2022 - Sep 2026 (Expected)',
    role: 'Bachelor of Information Systems (GPA: 3.82 / 4.00)',
    organization: 'Universitas Gunadarma',
    location: 'Jakarta & Depok, Indonesia',
    category: 'Education',
    description: [
      '1st Place Winner, USB (Unlimited Software Building) Article Writing Competition, Faculty of Computer Science and Information Technology.',
      'Currently developing a prototype-based expert system integrated with a rule-based medical chatbot for Diabetes Diagnosis (SIDIA) as a final-year project.',
      'Coursework focused on Software Engineering, Database Systems, Web & Mobile App Development, and Data Science.',
    ],
    techUsed: ['System Analysis', 'Expert System', 'SQL', 'Flutter', 'Data Mining', 'Python'],
  },
];

export default function ExperienceSection() {
  const [filterCategory, setFilterCategory] = useState<'All' | 'Work' | 'Organization' | 'Education'>('All');

  const filteredExperiences = filterCategory === 'All' 
    ? experiences 
    : experiences.filter((exp) => exp.category === filterCategory);

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    },
  };

  return (
    <div className="py-20 px-4 sm:px-10 max-w-5xl mx-auto text-textMain flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20 inline-block">
          Official CV Timeline
        </span>
        <h2 className="bg-gradient-to-r from-primary via-textMain to-textMain text-transparent bg-clip-text text-3xl sm:text-4xl font-extrabold tracking-tight">
          Work &amp; Organisational Experience
        </h2>
        <p className="text-sm text-textMain/80 max-w-xl mx-auto leading-relaxed">
          Over 1 years of experience in web application development, professional internships, organizational leadership, and academic excellence.
        </p>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap justify-center items-center gap-2.5 mb-12">
        {(['All', 'Work', 'Organization', 'Education'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
              filterCategory === cat
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : 'bg-secondary/20 hover:bg-secondary/40 text-textMain hover:text-primary border border-purple/15'
            }`}
          >
            {cat === 'All' ? 'All Roles' : cat === 'Work' ? 'Work Experience' : cat === 'Organization' ? 'Organisational' : 'Education'}
          </button>
        ))}
      </div>

      {/* Vertical Interactive Timeline */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={filterCategory}
          className="relative w-full border-l-2 border-primary/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
        >
          {filteredExperiences.map((exp) => {
            const CategoryIcon = exp.category === 'Work' ? Briefcase : exp.category === 'Organization' ? Users : GraduationCap;

            return (
              <motion.div key={exp.organization + exp.role} variants={itemVariants} className="relative group">
                {/* Node Icon Circle */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-full bg-[#0F0716] border-2 border-primary text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-md">
                  <CategoryIcon className="w-4 h-4" />
                </div>

                {/* Card Frame */}
                <div className="bg-secondary/20 hover:bg-secondary/40 backdrop-blur-xl border border-purple/15 hover:border-primary/40 rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300">
                  
                  {/* Header Info */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-3 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 font-bold uppercase tracking-wider inline-block">
                          {exp.category === 'Work' ? 'Professional Work' : exp.category === 'Organization' ? 'Organisational' : 'Education'}
                        </span>
                        {exp.category === 'Education' && (
                          <span className="text-xs font-mono font-extrabold text-amber-400 flex items-center gap-1 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                            <Award className="w-3.5 h-3.5" />
                            <span>GPA 3.82 / 4.00</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-extrabold text-textMain group-hover:text-primary transition-colors pt-1">
                        {exp.role}
                      </h3>
                      <h4 className="text-sm font-semibold text-textMain/90">
                        {exp.organization}
                      </h4>
                    </div>

                    <div className="flex flex-col items-start sm:items-end text-xs font-mono text-textMain/70 space-y-1">
                      <span className="flex items-center gap-1.5 bg-secondary/40 px-3 py-1 rounded-lg border border-purple/15 font-semibold text-primary">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] pt-0.5">
                        <MapPin className="w-3 h-3 text-purple" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description Bullet List */}
                  <ul className="space-y-2 mb-5">
                    {exp.description.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-textMain/85 flex items-start gap-2.5 leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech & Skill Tags */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-purple/15">
                    {exp.techUsed.map((tech, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-purple/10 text-purple border border-purple/20 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
