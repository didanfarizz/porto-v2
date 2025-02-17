'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faCode } from '@fortawesome/free-solid-svg-icons';
import { FaReact, FaNodeJs, FaHtml5, FaCss3, FaJs, FaPython } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiPostgresql, SiFigma, SiVite, SiBootstrap, SiMysql, SiGit, SiExpress } from 'react-icons/si';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 4;

  const tabs = ['Projects', 'Certificates', 'My Skills'];
  const projects = [
    {
      title: 'TechnoFair 11 | Website',
      category: 'Web Development',
      image: '/tf.png',
      link: 'https://bemfikti-gunadarma.web.id/technofair',
      github: 'https://github.com/PtiBemFikti/Fikti-App/tree/master/src/components/technofair',
    },
    {
      title: 'Pemira 2024-2025 | Website',
      category: 'Web Development',
      image: '/pemira.png',
      link: 'https://bemfikti-gunadarma.web.id/pemira',
      github: 'https://github.com/PtiBemFikti/Fikti-App/tree/master/src/components/pemira',
    },
    {
      title: 'My Portfolio V1 | Website',
      category: 'Web Development',
      image: '/porto-v1.png',
      link: 'https://web-didanfarizz-portfolio.netlify.app/',
      github: 'https://github.com/didanfarizz/myPortfolio',
    },
    {
      title: 'ScooTer | Website',
      category: 'Web Development',
      image: '/scooter.png',
      link: 'https://scooter-app-beta.vercel.app/',
      github: 'https://github.com/didanfarizz/scooTer',
    },
    {
      title: 'Breast Cancer Classification | Machine Learning',
      category: 'Machine Learning',
      image: '/breast-cancer.png',
      link: '#',
      github: 'https://github.com/didanfarizz/Breast-Cancer-Classifier---Logistic-Regression',
    },
    {
      title: 'Flight Price Prediction | Machine Learning',
      category: 'Machine Learning',
      image: '/harga.png',
      link: '#',
      github: 'https://github.com/didanfarizz/Flight-Price-Prediction-2025---Regression',
    },
    {
      title: 'Adult Sallary Classification | Machine Learning',
      category: 'Machine Learning',
      image: '/gaji.png',
      link: '#',
      github: 'https://github.com/didanfarizz/Adult-Sallary-Classifier---KNN-Models',
    },
    {
      title: 'Gym Member Classification | Machine Learning',
      category: 'Machine Learning',
      image: '/member.png',
      link: '#',
      github: 'https://github.com/didanfarizz/Classification-Gym-Member-Experience-KNN-Models',
    },
    {
      title: 'Depression Classification | Machine Learning',
      category: 'Machine Learning',
      image: '/depresi.png',
      link: '#',
      github: 'https://github.com/didanfarizz/Depression-Classification-KNN-Models',
    },
    {
      title: 'ScooTer | UIUX',
      category: 'UIUX Design',
      image: '/scooter-design.png',
      link: 'https://www.figma.com/design/wovPXQJNuzpfcdycd6J7eQ/Scooter-Website---PBW?m=auto&t=m98ncYAntmCcx2EY-6',
      github: '#',
    },
    {
      title: 'SwiftRide | UIUX',
      category: 'UIUX Design',
      image: '/swiftride.png',
      link: 'https://www.figma.com/design/scQGgo7aMVvUWAkpS8Q5Bg/SwiftRide?m=auto&t=m98ncYAntmCcx2EY-6',
      github: '#',
    },
  ];
  const certificates = [
    {
      title: 'Article Writing Competition - Universitas Gunadarma',
      image: '/sertif-1.jpg',
    },
    {
      title: 'Building a Career as Software Developer - Dicoding',
      image: '/sertif-2.jpg',
    },
    {
      title: 'Programming Logic Introduction - Dicoding',
      image: '/sertif-3.jpg',
    },
  ];
  const skills = [
    { icon: <FaHtml5 style={{ color: '#E34F26' }} />, name: 'HTML' },
    { icon: <FaCss3 style={{ color: '#1572B6' }} />, name: 'CSS' },
    { icon: <FaJs style={{ color: '#F7DF1E' }} />, name: 'JavaScript' },
    { icon: <FaReact style={{ color: '#61DAFB' }} />, name: 'React.js' },
    { icon: <SiNextdotjs style={{ color: '#000' }} />, name: 'Next.js' },
    { icon: <SiVite style={{ color: '#646CFF' }} />, name: 'Vite' },
    { icon: <FaNodeJs style={{ color: '#339933' }} />, name: 'Node.js' },
    { icon: <SiExpress style={{ color: '#000' }} />, name: 'Express.js' },
    { icon: <SiTailwindcss style={{ color: '#38B2AC' }} />, name: 'Tailwind CSS' },
    { icon: <SiBootstrap style={{ color: '#7952B3' }} />, name: 'Bootstrap' },
    { icon: <SiMysql style={{ color: '#4479A1' }} />, name: 'MySQL' },
    { icon: <SiPostgresql style={{ color: '#336791' }} />, name: 'PostgreSQL' },
    { icon: <FaPython style={{ color: '#3776AB' }} />, name: 'Python' },
    { icon: <SiGit style={{ color: '#F05032' }} />, name: 'Git' },
    { icon: <SiFigma style={{ color: '#F24E1E' }} />, name: 'Figma' },
  ];

  const currentProjects = projects.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const currentCertificates = certificates.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const totalPagesCertificates = Math.ceil(certificates.length / ITEMS_PER_PAGE);

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
        {/* Project Start */}
        {activeTab === 'Projects' && (
          <div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              {currentProjects.map((project, index) => (
                <div key={index} className="bg-foreground bg-opacity-40 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                  <Image src={project.image} alt={project.title} width={500} height={150} className="rounded-md shadow-xl transition-all duration-300 hover:shadow-purple" />
                  <h3 className="mt-2">{project.title}</h3>
                  <div className="space-x-2 flex justify-center items-center">
                    {project.category === 'UIUX Design' ? (
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        <div className="mt-4 bg-primary px-4 py-2 rounded-md text-white flex items-center gap-2">
                          <SiFigma />
                        </div>
                      </Link>
                    ) : (
                      <>
                        {project.category !== 'Machine Learning' && (
                          <Link href={project.link} target="_blank" rel="noopener noreferrer">
                            <div className="mt-4 bg-primary px-4 py-2 rounded-md text-white flex items-center gap-2">
                              <FontAwesomeIcon icon={faUpRightFromSquare} />
                            </div>
                          </Link>
                        )}
                        <Link href={project.github || '#'} target="_blank" rel="noopener noreferrer">
                          <div className="mt-4 bg-gray-700 px-4 py-2 rounded-md text-white flex items-center gap-2">
                            <FontAwesomeIcon icon={faCode} />
                            Code
                          </div>
                        </Link>
                      </>
                    )}
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
        {/* Project End */}
        {/* Certificate Start */}
        {activeTab === 'Certificates' && (
          <div className="">
            <div className="grid grid-cols-2 gap-6 mt-4">
              {currentCertificates.map((certificate, index) => (
                <div key={index} className="bg-foreground bg-opacity-40 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                  <Image src={certificate.image} alt={certificate.title} width={500} height={150} className="rounded-md shadow-xl transition-all duration-300 hover:shadow-purple" />
                  <h3 className="mt-2">{certificate.title}</h3>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" disabled={page === 0} onClick={() => setPage((prev) => prev - 1)}>
                Previous
              </Button>
              <span className="self-center">
                Page {page + 1} of {totalPagesCertificates}
              </span>
              <Button variant="outline" disabled={page >= totalPagesCertificates - 1} onClick={() => setPage((prev) => prev + 1)}>
                Next
              </Button>
            </div>
          </div>
        )}
        {/* Certificate End */}
        {/* Skills Start */}
        {activeTab === 'My Skills' && (
          <div className="">
            <div className="flex justify-center items-center gap-6 mt-4">
              {activeTab === 'My Skills' && (
                <div>
                  <div className="grid grid-cols-6 space-x-5 mt-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="bg-transparent backdrop-blur-lg bg-opacity-30 border-opacity-20 rounded-lg shadow-md flex flex-col items-center text-center">
                        <div className="text-5xl text-primary">{skill.icon}</div>
                        <h3 className="mt-2">{skill.name}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Skills End */}
      </div>
    </div>
  );
}
