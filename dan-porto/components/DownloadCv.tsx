'use client';

import React from 'react';
import { FaFileDownload } from 'react-icons/fa';

const DownloadCv = () => {
  const handleDownload = () => {
    const cvUrl = '/cv-didanfariz.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.setAttribute('download', 'CV_ATS_Didan_Fariz_Abqari.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={handleDownload} 
      className="border border-primary/40 hover:border-primary text-primary hover:bg-primary/10 py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    >
      <span>Download CV</span>
      <FaFileDownload className="w-4 h-4" />
    </button>
  );
};

export default DownloadCv;
