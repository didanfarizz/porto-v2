'use client';

import { motion } from 'framer-motion';

const Blob = () => {
  return (
    <div className="absolute w-full h-full flex items-center justify-center overflow-hidden -z-10">
      {/* Blob */}
      <motion.div
        className="absolute w-1/2 blur-2xl"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#482A81", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#8350EB", stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          <motion.path
            fill="url(#gradient)"
            d="M38.5,-41.3C48.9,-28.2,55.6,-14.1,57.1,1.5C58.6,17.1,55,34.3,44.6,43.9C34.3,53.5,17.1,55.6,-1.6,57.2C-20.2,58.8,-40.5,59.7,-56.2,50.1C-72,40.5,-83.2,20.2,-80.5,2.8C-77.7,-14.7,-61,-29.5,-45.2,-42.7C-29.5,-55.9,-14.7,-67.5,-0.3,-67.2C14.1,-66.9,28.2,-54.5,38.5,-41.3Z"
            transform="translate(100 100)"
            animate={{
              d: [
                "M38.5,-41.3C48.9,-28.2,55.6,-14.1,57.1,1.5C58.6,17.1,55,34.3,44.6,43.9C34.3,53.5,17.1,55.6,-1.6,57.2C-20.2,58.8,-40.5,59.7,-56.2,50.1C-72,40.5,-83.2,20.2,-80.5,2.8C-77.7,-14.7,-61,-29.5,-45.2,-42.7C-29.5,-55.9,-14.7,-67.5,-0.3,-67.2C14.1,-66.9,28.2,-54.5,38.5,-41.3Z",
                "M33.9,-35.2C44.7,-23.1,54.8,-11.5,59.4,4.6C63.9,20.6,62.9,41.3,52.1,51.8C41.3,62.3,20.6,62.7,1.9,60.8C-16.8,58.8,-33.5,54.6,-45.2,44C-57,33.5,-63.6,16.8,-62.4,1.2C-61.1,-14.3,-52,-28.6,-40.3,-40.7C-28.6,-52.8,-14.3,-62.7,-1.4,-61.3C11.5,-59.9,23.1,-47.3,33.9,-35.2Z",
                "M54.7,-48.5C69,-40.4,77.4,-20.2,75.8,-1.7C74.1,16.8,62.3,33.7,48,47.4C33.7,61.2,16.8,72,3.2,68.8C-10.5,65.7,-21.1,48.6,-37.2,34.8C-53.3,21.1,-75,10.5,-77.4,-2.3C-79.7,-15.2,-62.7,-30.4,-46.5,-38.5C-30.4,-46.5,-15.2,-47.4,2.5,-49.9C20.2,-52.4,40.4,-56.5,54.7,-48.5Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default Blob;
