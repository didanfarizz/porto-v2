'use client';

import { motion } from 'framer-motion';

export default function ScrollAnimationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }} 
      transition={{ duration: 0.6, ease: 'easeOut' }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}