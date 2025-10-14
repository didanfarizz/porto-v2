'use client';

import { motion } from 'framer-motion';

export default function Service() {
  const services = [
    {
      id: '01',
      name: 'FullStack Web Development',
      description:
        'Designing and developing robust end-to-end digital solutions, from intuitive and responsive interfaces to scalable server-side logic. Effectively collaborating with designers, developers, and stakeholders to transform ideas into functional and innovative digital products.',
    },
    {
      id: '02',
      name: 'Machine Learning',
      description: 'Processing, analyzing, and transforming data using statistical techniques and machine learning, combined with optimal feature engineering to enhance model accuracy and derive valuable insights.',
    },
    {
      id: '03',
      name: 'UI / UX',
      description:
        'Designing intuitive user flows and ensuring accessibility to accommodate a diverse range of users. Developing wireframes and interactive prototypes in Figma to visualize concepts and enhance the overall user experience.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="px-4 md:px-20 py-10 flex justify-center items-center flex-col bg-foreground">
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-white to-[#fefefe] text-transparent bg-clip-text text-center mb-8"
      >
        My Quality Services
      </motion.h1>

      <motion.div className="w-full" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {services.map((service, index) => (
          <motion.div key={index} variants={itemVariants} className="w-full py-10 flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-8 border-b border-gray-700 last:border-b-0">
            {/* ... isi dari item service ... */}
            <div className="w-full lg:w-1/2 flex justify-start items-center gap-8 text-white font-bold">
              <p className="text-purple text-xl">{service.id}</p>
              <h2 className="text-xl md:text-2xl">{service.name}</h2>
            </div>
            <div className="w-full lg:w-1/2 text-white/80">
              <p>{service.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
