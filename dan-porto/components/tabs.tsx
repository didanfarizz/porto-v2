'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faCode } from '@fortawesome/free-solid-svg-icons';
import { SiFigma } from 'react-icons/si';
import { BLUR_DATA_URL } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  image: string;
  link: string;
  github?: string;
}

interface Certificate {
  title: string;
  image: string;
}

interface Skill {
  name: string;
  iconUrl: string;
}

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const ITEMS_PER_PAGE = 4;

  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = ['Projects', 'Certificates', 'Tech Stack'];

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projRes, certRes, skillRes] = await Promise.all([
          fetch('/api/showcase/projects'),
          fetch('/api/showcase/certificates'),
          fetch('/api/showcase/skills')
        ]);
        const [projData, certData, skillData] = await Promise.all([
          projRes.json(),
          certRes.json(),
          skillRes.json()
        ]);
        setProjects(projData);
        setCertificates(certData);
        setSkills(skillData);
      } catch (error) {
        console.error('Error fetching showcase collection data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter projects dynamically
  const projectCategories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const currentProjects = filteredProjects.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const currentCertificates = certificates.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const totalPagesCertificates = Math.ceil(certificates.length / ITEMS_PER_PAGE);

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    },
  };

  return (
    <div className="p-4 sm:p-6 bg-transparent w-full flex flex-col items-center">
      {/* Sliding Pill Tabs Bar */}
      <div className="relative flex justify-center items-center bg-secondary/30 backdrop-blur-md border border-purple/10 rounded-full p-1.5 mb-10 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setPage(0);
            }}
            className={`relative z-10 px-6 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-300 focus:outline-none ${
              activeTab === tab ? 'text-white' : 'text-textMain/60 hover:text-textMain'
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-gradient-to-r from-primary to-purple rounded-full -z-10 shadow-md shadow-primary/30"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full max-w-5xl p-2 sm:p-6 min-h-[300px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-textMain/60 text-sm font-medium tracking-wide">Loading collection...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* Projects View */}
            {activeTab === 'Projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2.5 mb-8 justify-center">
                  {projectCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setPage(0);
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                        selectedCategory === cat
                          ? 'bg-primary/20 text-primary border-primary/30 shadow-sm'
                          : 'bg-transparent text-textMain/60 border-purple/10 hover:text-textMain hover:border-purple/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8" 
                  variants={gridVariants} 
                  initial="hidden" 
                  animate="visible"
                >
                  {currentProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{ y: -8 }}
                      className="bg-secondary/15 hover:bg-secondary/35 backdrop-blur-md rounded-2xl border border-purple/10 hover:border-primary/30 p-5 shadow-lg group transition-all duration-300 flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        {/* Image Frame with Overlay */}
                        <div className="relative rounded-xl overflow-hidden shadow-md h-48 w-full group/img mb-5 border border-purple/5">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={500}
                            height={281}
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                            className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                          />
                          {/* Hover Overlay Buttons */}
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                            {project.category === 'UIUX Design' ? (
                              <Link 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-3 bg-primary text-white rounded-full hover:bg-purple hover:scale-110 transition-all shadow-md shadow-primary/30"
                                title="View Figma Design"
                              >
                                <SiFigma className="w-5 h-5" />
                              </Link>
                            ) : (
                              <>
                                {project.category !== 'Machine Learning' && (
                                  <Link 
                                    href={project.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="p-3 bg-primary text-white rounded-full hover:bg-purple hover:scale-110 transition-all shadow-md shadow-primary/30"
                                    title="Live Demo"
                                  >
                                    <FontAwesomeIcon icon={faUpRightFromSquare} className="w-4 h-4" />
                                  </Link>
                                )}
                                <Link 
                                  href={project.github || '#'} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 hover:scale-110 transition-all shadow-md"
                                  title="Source Code"
                                >
                                  <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
                                </Link>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Project Title */}
                        <h3 className="text-lg font-bold text-textMain group-hover:text-primary transition-colors line-clamp-1 mb-2">
                          {project.title}
                        </h3>
                      </div>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between w-full mt-4 pt-4 border-t border-purple/10">
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-semibold uppercase tracking-wider">
                          {project.category}
                        </span>
                        
                        <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:text-textMain transition-colors">
                          <span>Demo & Code</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mt-8">
                  <Button 
                    variant="outline" 
                    disabled={page === 0} 
                    onClick={() => setPage((prev) => prev - 1)}
                    className="border-purple/20 text-textMain hover:bg-primary/10"
                  >
                    Previous
                  </Button>
                  <span className="self-center text-sm font-semibold text-textMain/80">
                    Page {page + 1} of {totalPages}
                  </span>
                  <Button 
                    variant="outline" 
                    disabled={page >= totalPages - 1} 
                    onClick={() => setPage((prev) => prev + 1)}
                    className="border-purple/20 text-textMain hover:bg-primary/10"
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Certificates View */}
            {activeTab === 'Certificates' && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8" 
                  variants={gridVariants} 
                  initial="hidden" 
                  animate="visible"
                >
                  {currentCertificates.map((certificate, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{ y: -8 }}
                      className="bg-secondary/15 hover:bg-secondary/35 backdrop-blur-md rounded-2xl border border-purple/10 hover:border-primary/30 p-5 shadow-lg group transition-all duration-300 flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        {/* Image Frame */}
                        <div className="relative rounded-xl overflow-hidden shadow-md h-48 w-full group/img mb-5 border border-purple/5">
                          <Image
                            src={certificate.image}
                            alt={certificate.title}
                            width={500}
                            height={281}
                            className="w-full h-full object-cover object-center group-hover/img:scale-102 transition-transform duration-500"
                          />
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-textMain line-clamp-2 leading-snug mb-2">
                          {certificate.title}
                        </h3>
                      </div>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between w-full mt-4 pt-4 border-t border-purple/10">
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-purple/10 text-purple border border-purple/20 font-semibold uppercase tracking-wider">
                          Credential
                        </span>
                        <div className="text-purple flex items-center gap-1.5 text-xs font-semibold">
                          <span>Verified badge</span>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mt-8">
                  <Button 
                    variant="outline" 
                    disabled={page === 0} 
                    onClick={() => setPage((prev) => prev - 1)}
                    className="border-purple/20 text-textMain hover:bg-primary/10"
                  >
                    Previous
                  </Button>
                  <span className="self-center text-sm font-semibold text-textMain/80">
                    Page {page + 1} of {totalPagesCertificates}
                  </span>
                  <Button 
                    variant="outline" 
                    disabled={page >= totalPagesCertificates - 1} 
                    onClick={() => setPage((prev) => prev + 1)}
                    className="border-purple/20 text-textMain hover:bg-primary/10"
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Tech Stack View */}
            {activeTab === 'Tech Stack' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center w-full"
              >
                <motion.div 
                  variants={gridVariants} 
                  initial="hidden" 
                  animate="visible" 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full"
                >
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{ y: -5, scale: 1.03 }}
                      className="bg-secondary/15 hover:bg-secondary/35 backdrop-blur-md border border-purple/10 hover:border-primary/30 p-5 rounded-2xl shadow-md flex flex-col items-center justify-center text-center text-textMain transition-all duration-300 group relative min-h-[110px]"
                    >
                      {/* Subtle light glow behind skill icon */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                      <div className="w-12 h-12 mb-3 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 flex items-center justify-center relative filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_10px_rgba(131,80,235,0.25)]">
                        <Image 
                          src={skill.iconUrl} 
                          alt={skill.name} 
                          fill
                          sizes="48px"
                          className="object-contain"
                        />
                      </div> 
                      <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-textMain/80 group-hover:text-primary transition-colors">
                        {skill.name}
                      </h3>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
