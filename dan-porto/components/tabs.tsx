'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faCode } from '@fortawesome/free-solid-svg-icons';
import { SiFigma } from 'react-icons/si';
import { BLUR_DATA_URL } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 4;

  const tabs = ['Projects', 'Certificates', 'Tech Stack'];
  // ... data projects dan certificates ...
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
      title: 'Asy-Syifa | Website',
      category: 'Web Development',
      image: '/asy-syifa.png',
      link: 'https://asy-syifa.xo.je/',
      github: 'https://github.com/didanfarizz/asy-syifa',
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
    {
      icon: <Image src={'/icons/HTML5.png'} alt="html" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'HTML',
    },
    {
      icon: <Image src={'/icons/CSS3.png'} alt="css" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'CSS',
    },
    {
      icon: <Image src={'/icons/JavaScript.png'} alt="js" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'JavaScript',
    },
    {
      icon: <Image src={'/icons/React.png'} alt="react" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'React.js',
    },
    {
      icon: <Image src={'/icons/Next.js.png'} alt="nextjs" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'Next.js',
    },
    {
      icon: <Image src={'/icons/Vite.js.png'} alt="vite" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'Vite',
    },
    {
      icon: <Image src={'/icons/Node.js.png'} alt="nodejs" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'Node.js',
    },
    {
      icon: <Image src={'/icons/Laravel.png'} alt="laravel" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'Laravel',
    },
    {
      icon: <Image src={'/icons/CodeIgniter.png'} alt="ci" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'CodeIgniter',
    },
    {
      icon: <Image src={'/icons/Tailwind.png'} alt="tailwind" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'Tailwind CSS',
    },
    {
      icon: <Image src={'/icons/Bootstrap.png'} alt="bootstrap" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'Bootstrap',
    },
    {
      icon: <Image src={'/icons/MySQL.png'} alt="mysql" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'MySQL',
    },
    {
      icon: <Image src={'/icons/Git.png'} alt="git" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'Git',
    },
    {
      icon: <Image src={'/icons/Python.png'} alt="python" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'Python',
    },
    {
      icon: <Image src={'/icons/Figma.png'} alt="Figma" width={48} height={48} placeholder="blur" blurDataURL={BLUR_DATA_URL} />,
      name: 'Figma',
    },
  ];

  const currentProjects = projects.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const currentCertificates = certificates.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const totalPagesCertificates = Math.ceil(certificates.length / ITEMS_PER_PAGE);

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-b from-purple-900 to-black min-h-screen flex flex-col items-center">
      <ul className="flex flex-wrap justify-center gap-2 text-sm font-medium text-center text-white bg-foreground rounded-2xl mb-8 p-1.5">
        {tabs.map((tab) => (
          <li key={tab}>
            <button
              onClick={() => {
                setActiveTab(tab);
                setPage(0);
              }}
              className={`px-4 py-2 rounded-full transition-all text-sm tracking-wide text-center ${activeTab === tab ? 'bg-gradient-to-r from-primary to-darkPurple text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="w-full max-w-5xl p-4 sm:p-6 bg-secondary bg-transparent rounded-xl shadow-xl text-white min-h-[300px]">
        {/* Project Start */}
        {activeTab === 'Projects' && (
          <div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4" variants={gridVariants} initial={'hidden'} animate="visible">
              {currentProjects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="bg-foreground bg-opacity-40 p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={281}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="rounded-md shadow-xl transition-all duration-300 hover:shadow-purple w-full h-48 object-cover object-center"
                  />
                  <h3 className="mt-4">{project.title}</h3>
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
                            <FontAwesomeIcon icon={faCode} /> Code
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mt-4">
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
        {/* Project End */} {/* Certificate Start */}
        {activeTab === 'Certificates' && (
          <div className="">
            <motion.div variants={gridVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {currentCertificates.map((certificate, index) => (
                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  key={index}
                  className="bg-foreground bg-opacity-40 p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                >
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    width={500}
                    height={281}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="rounded-md shadow-xl transition-all duration-300 hover:shadow-purple w-full h-48 object-cover object-center"
                  />
                  <h3 className="mt-4">{certificate.title}</h3>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mt-4">
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
        {/* Certificate End */} {/* Skills Start */}
        {activeTab === 'Tech Stack' && (
          <div className="">
            <div className="flex justify-center items-center gap-6 mt-4">
              {activeTab === 'Tech Stack' && (
                <div>
                  <motion.div variants={gridVariants} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {skills.map((skill, index) => (
                      <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.1, y: -5 }}
                        key={index}
                        className="bg-transparent bg-opacity-10 p-4 md:p-6 hover:shadow-primary hover:shadow-lg hover:transition-shadow hover:ease-in-out bg-white border-primary border rounded-lg shadow-md flex flex-col items-center text-center"
                      >
                        <div className="text-4xl sm:text-5xl text-primary">{skill.icon}</div> <h3 className="mt-2 text-sm sm:text-base">{skill.name}</h3>
                      </motion.div>
                    ))}
                  </motion.div>
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
