'use client';

import { motion } from 'framer-motion';
import { Terminal, Brain, Palette, ArrowUpRight } from 'lucide-react';

export default function Service() {
  const services = [
    {
      id: '01',
      name: 'FullStack Web Development',
      icon: Terminal,
      description:
        'Designing and developing robust end-to-end digital solutions, from intuitive and responsive interfaces to scalable server-side logic. Collaborating to transform ideas into functional products.',
    },
    {
      id: '02',
      name: 'Machine Learning',
      icon: Brain,
      description:
        'Processing, analyzing, and transforming data using statistical techniques and machine learning, combined with optimal feature engineering to enhance model accuracy.',
    },
    {
      id: '03',
      name: 'UI / UX Design',
      icon: Palette,
      description:
        'Designing intuitive user flows and ensuring accessibility. Developing wireframes and interactive prototypes in Figma to visualize concepts and enhance overall experience.',
    },
  ];

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
    <div className="px-4 md:px-20 py-16 flex flex-col justify-center items-center">
      {/* Title */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-textMain to-textMain text-transparent bg-clip-text text-center mb-4"
      >
        My Quality Services
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-textMain text-center text-sm md:text-base max-w-lg mb-12"
      >
        Delivering state-of-the-art applications, intelligence models, and immersive user experiences.
      </motion.p>

      {/* Cards Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-4" 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.1 }}
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="bg-secondary/20 hover:bg-secondary/40 backdrop-blur-md border border-purple/10 hover:border-primary/30 p-8 rounded-2xl relative shadow-lg transition-all duration-300 group overflow-hidden flex flex-col justify-between"
            >
              {/* Top sliding gradient border decoration */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-purple to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              
              <div>
                {/* Header card info */}
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-purple/50 font-mono text-sm tracking-wider font-semibold group-hover:text-primary transition-colors">
                    {service.id}
                  </span>
                </div>

                {/* Body Content */}
                <h2 className="text-xl md:text-2xl font-bold text-textMain mb-3 group-hover:text-primary transition-colors">
                  {service.name}
                </h2>
                <p className="text-textMain/70 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Arrow details */}
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider group-hover:text-textMain transition-colors cursor-pointer mt-4">
                <span>Read More</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
