'use client';

import Blob from './blob';
import CardImage from './image';
import Sosmed from './sosmed';
import DownloadCv from './DownloadCv';
import { motion } from 'framer-motion';

export default function Dashboard() {
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
    <div className="text-white">
      <div className="flex flex-col-reverse lg:flex-row flex-wrap justify-between mx-auto items-center p-4 md:px-20 md:py-16">
        <motion.div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left space-y-4 mt-8 lg:mt-0" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold">
            Hi, I&apos;m Didan
          </motion.h3>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-white to-[#fff] text-transparent bg-clip-text">
            Web Developer &
          </motion.h1>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-white to-[#fff] text-transparent bg-clip-text">
            ML Engineer
          </motion.h1>
          <motion.p variants={itemVariants} className="max-w-xl">
            Welcome to my Portfolio! I am an Information Systems student... 🚀
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start items-start">
            <Sosmed />
          </motion.div>
          <motion.div variants={itemVariants} className="">
            <DownloadCv />
          </motion.div>
        </motion.div>

        <motion.div className="w-full lg:w-1/2 flex justify-center items-center mx-auto mb-8 lg:mb-0" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}>
          <Blob />
          <div className="pr-12 pb-0 md:pr-32 md:pb-10">
            <CardImage />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
