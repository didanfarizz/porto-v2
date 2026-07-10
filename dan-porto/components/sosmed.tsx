'use client';
import React, { useState } from 'react';
import { FaInstagram, FaLinkedin, FaTiktok, FaGithub, FaFacebook } from 'react-icons/fa';

const buttons = [
  { 
    id: 'instagram', 
    icon: FaInstagram, 
    tooltip: 'Instagram', 
    bg: 'bg-gradient-to-tr from-yellow-300 via-red-600 to-pink-600', 
    link: 'https://www.instagram.com/didanfarizz' 
  },
  { 
    id: 'tiktok', 
    icon: FaTiktok, 
    tooltip: 'TikTok', 
    bg: 'bg-gradient-to-tr from-black to-[#464646]', 
    link: 'https://www.tiktok.com/@xdan26?_t=ZS-8tsaAt2eiSG&_r=1' 
  },
  { 
    id: 'facebook', 
    icon: FaFacebook, 
    tooltip: 'Facebook', 
    bg: 'bg-gradient-to-tr from-blue-600 to-blue-400', 
    link: 'https://www.facebook.com/didan.fariz' 
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
    <div className="flex justify-between items-center space-x-3">
      {buttons.map(({ id, icon: Icon, tooltip, bg, link }) => (
        <div key={id} className="relative flex items-center justify-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 bg-secondary text-textMain border border-purple/10 hover:text-white rounded-[10px] shadow-lg transition duration-300 ${
              hoveredButton === id ? bg : ''
            }`}
            onMouseEnter={() => setHoveredButton(id)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <Icon size={24} />
          </a>
          {hoveredButton === id && (
            <div className={`absolute bottom-full mb-2 px-3 py-2 text-sm text-white rounded-lg shadow-lg ${bg}`}>
              {tooltip}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sosmed;
