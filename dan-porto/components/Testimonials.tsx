'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'BEM FIKTI Gunadarma Team',
    role: 'Project Lead & Teammate',
    quote: 'Didan is an exceptionally talented developer. His dedication to crafting TechnoFair & Pemira web portals with clean architecture and fast load times was key to our event success.',
    stars: 5,
  },
  {
    name: 'Academic Mentor',
    role: 'Information Systems Supervisor',
    quote: 'Didan bridges machine learning concepts and full-stack web engineering effortlessly. His work on predictive model deployments shows deep technical maturity.',
    stars: 5,
  },
  {
    name: 'ScooTer App Client',
    role: 'Micromobility Product Owner',
    quote: 'Working with Didan was seamless. From Figma UI/UX designs to responsive React integration, he delivered a sleek, user-focused application ahead of deadline.',
    stars: 5,
  },
];

export default function Testimonials() {
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
      {/* Title */}
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20 inline-block">
          Testimonials
        </span>
        <h2 className="bg-gradient-to-r from-primary via-textMain to-textMain text-transparent bg-clip-text text-3xl sm:text-4xl font-extrabold tracking-tight">
          What People Say
        </h2>
        <p className="text-sm text-textMain/80 max-w-md mx-auto">
          Endorsements from project leads, mentors, and collaborators.
        </p>
      </div>

      {/* Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {testimonials.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="bg-secondary/20 hover:bg-secondary/40 backdrop-blur-md border border-purple/15 hover:border-primary/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between relative group transition-all duration-300"
          >
            <div className="space-y-4">
              {/* Quote Icon & Stars */}
              <div className="flex items-center justify-between">
                <Quote className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors" />
                <div className="flex items-center space-x-1">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Quote text */}
              <p className="text-sm text-textMain/90 leading-relaxed italic">
                &quot;{item.quote}&quot;
              </p>
            </div>

            {/* Author */}
            <div className="mt-6 pt-4 border-t border-purple/15">
              <h4 className="text-sm font-bold text-textMain group-hover:text-primary transition-colors">
                {item.name}
              </h4>
              <p className="text-xs font-mono text-textMain/70">
                {item.role}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
