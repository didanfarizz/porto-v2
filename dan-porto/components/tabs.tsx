'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faCode } from '@fortawesome/free-solid-svg-icons';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 4;

  const tabs = ['Projects', 'Certificates', 'My Skills'];
  const projects = [
    {
      title: 'TechnoFair 11 | Website',
      image: '/tf.png',
      link: 'https://bemfikti-gunadarma.web.id/technofair',
      github: 'https://github.com/PtiBemFikti/Fikti-App/tree/master/src/components/technofair',
    },
    {
      title: 'Pemira 2024-2025 | Website',
      image: '/pemira.png',
      link: 'https://bemfikti-gunadarma.web.id/pemira',
      github: 'https://github.com/PtiBemFikti/Fikti-App/tree/master/src/components/pemira',
    },
    {
      title: 'My Portfolio V1 | Website',
      image: '/porto-v1.png',
      link: 'https://web-didanfarizz-portfolio.netlify.app/',
      github: 'https://github.com/didanfarizz/myPortfolio',
    },
    {
      title: 'CodeSync - Real-time Code Collaboration',
      image: '/images/codesync.jpg',
      link: '#',
      github: '#',
    },
  ];

  const currentProjects = projects.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6 bg-gradient-to-b from-purple-900 to-black min-h-screen flex flex-col items-center">
      <ul className="flex space-x-2 text-sm font-medium text-center text-white bg-foreground rounded-full mb-8">
        {tabs.map((tab) => (
          <li key={tab}>
            <button
              onClick={() => {
                setActiveTab(tab);
                setPage(0);
              }}
              className={`px-4 py-2 rounded-lg transition-all text-sm tracking-wide text-center hover:bg-gradient-to-r hover:from-primary hover:to-darkPurple hover:rounded-full ${activeTab === tab ? 'text-white' : 'hover:text-gray-300'}`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="w-full max-w-5xl p-6 bg-secondary bg-transparent rounded-xl shadow-xl text-white min-h-[300px]">
        {activeTab === 'Projects' && (
          <div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              {currentProjects.map((project, index) => (
                <div key={index} className="bg-foreground bg-opacity-40 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                  <Image src={project.image} alt={project.title} width={500} height={150} className="rounded-md shadow-xl transition-all duration-300 hover:shadow-purple" />
                  <h3 className="mt-2">{project.title}</h3>
                  <div className="space-x-2 flex justify-center items-center">
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      <div className="mt-4 bg-primary px-4 py-2 rounded-md text-white flex items-center gap-2">
                        <FontAwesomeIcon icon={faUpRightFromSquare} />
                        Live
                      </div>
                    </Link>
                    <Link href={project.github as string} target="_blank" rel="noopener noreferrer">
                      <div className="mt-4 bg-gray-700 px-4 py-2 rounded-md text-white flex items-center gap-2">
                        <FontAwesomeIcon icon={faCode} />
                        Code
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" disabled={page === 0} onClick={() => setPage((prev) => prev - 1)}>
                Previous
              </Button>
              <span className="self-center">
                Page {page + 1} of {totalPages}
              </span>
              <Button variant="outline" disabled={page >= totalPages - 1} onClick={() => setPage((prev) => prev + 1)}>
                Next
              </Button>
            </div>
          </div>
        )}
        {activeTab === 'Certificates' && <p className="text-gray-300">Dashboard Content</p>}
        {activeTab === 'My Skills' && <p className="text-gray-300">Settings Content</p>}
      </div>
    </div>
  );
}
