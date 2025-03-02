'use client'

import React from 'react';
import { FaFileDownload } from 'react-icons/fa';

const DownloadCv = () => {
  const hundleDownload = () => {
    const cvUrl = '/cv-didanfariz.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.setAttribute('download', 'CV_ATS_Didan_Fariz_Abqari.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <button onClick={hundleDownload} className="bg-primary text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-purple hover:transition-all hover:ease-in-out hover:shadow-md hover:shadow-primary">
        <p>Download CV</p>
        <FaFileDownload />
      </button>
    </div>
  );
};

export default DownloadCv;
