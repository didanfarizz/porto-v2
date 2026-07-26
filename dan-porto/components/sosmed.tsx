'use client';
import React, { useState } from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';

const buttons = [
  { 
    id: 'instagram', 
    icon: FaInstagram, 
    tooltip: 'Instagram', 
    bg: 'bg-gradient-to-tr from-yellow-300 via-red-600 to-pink-600', 
    link: 'https://www.instagram.com/didanfarizz' 
  },
  { 
    id: 'threads', 
    icon: SiThreads, 
    tooltip: 'Threads', 
    bg: 'bg-gradient-to-tr from-black via-[#262626] to-[#404040]', 
    link: 'https://www.threads.com/@didanfarizz' 
  },
  { 
    id: 'linkedin', 
    icon: FaLinkedin, 
    tooltip: 'LinkedIn', 
    bg: 'bg-gradient-to-tr from-blue-700 to-blue-500', 
    link: 'https://www.linkedin.com/in/didan-fariz-abqari-4a8ba422b/' 
  },
  { 
    id: 'github', 
    icon: FaGithub, 
    tooltip: 'GitHub', 
    bg: 'bg-gradient-to-tr from-[#141414] to-[#464646]', 
    link: 'https://github.com/didanfarizz' 
  },
];

const Sosmed = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="flex items-center space-x-3">
      {buttons.map(({ id, icon: Icon, tooltip, bg, link }) => (
        <div key={id} className="relative flex items-center justify-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tooltip}
            className={`p-2.5 bg-secondary text-textMain border border-purple/10 hover:text-white rounded-xl shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
              hoveredButton === id ? bg : ''
            }`}
            onMouseEnter={() => setHoveredButton(id)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <Icon size={20} />
          </a>
          {hoveredButton === id && (
            <div className={`absolute bottom-full mb-2 px-3 py-1.5 text-xs font-bold text-white rounded-lg shadow-lg ${bg} whitespace-nowrap z-20`}>
              {tooltip}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sosmed;
