'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faCode } from '@fortawesome/free-solid-svg-icons';
import { BLUR_DATA_URL } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, ChevronRight, Award, Users, Activity } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  image: string;
  link: string;
  github?: string;
  techStack?: string[];
  description?: string;
}

interface Certificate {
  title: string;
  image: string;
}

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const ITEMS_PER_PAGE = 6;

  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const tabs = ['Projects', 'Certificates'];

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projRes, certRes] = await Promise.all([
          fetch('/api/showcase/projects'),
          fetch('/api/showcase/certificates')
        ]);
        const [projData, certData] = await Promise.all([
          projRes.json(),
          certRes.json()
        ]);
        setProjects(projData);
        setCertificates(certData);
      } catch (error) {
        console.error('Error fetching showcase collection data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter projects dynamically
  const rawCategories = Array.from(new Set(projects.map((p) => p.category))).filter((cat) => cat !== 'UIUX Design');
  const projectCategories = ['All', ...rawCategories];
  
  const filteredProjects = selectedCategory === 'All'
    ? projects.filter((p) => p.category !== 'UIUX Design')
    : projects.filter((p) => p.category === selectedCategory);

  const currentProjects = filteredProjects.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const currentCertificates = certificates.slice(page * 4, (page + 1) * 4);
  const totalPagesCertificates = Math.ceil(certificates.length / 4);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 120, damping: 16 }
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
            className={`relative z-10 px-6 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
              activeTab === tab ? 'text-white' : 'text-textMain/80 hover:text-textMain'
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
            <p className="text-textMain/80 text-sm font-medium tracking-wide">Loading collection...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* Projects View: Sleek Interactive List Bar Layout */}
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
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                        selectedCategory === cat
                          ? 'bg-primary/20 text-primary border-primary/40 shadow-sm scale-105'
                          : 'bg-transparent text-textMain/80 border-purple/20 hover:text-textMain hover:border-purple/40'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Ultra-Fast Interactive Row List */}
                <motion.div 
                  className="flex flex-col gap-4" 
                  variants={listVariants} 
                  initial="hidden" 
                  animate="visible"
                >
                  {currentProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      variants={rowVariants}
                      whileHover={{ x: 4 }}
                      onClick={() => setSelectedProject(project)}
                      className="bg-secondary/20 hover:bg-secondary/40 backdrop-blur-xl border border-purple/15 hover:border-primary/40 p-4 sm:p-5 rounded-2xl shadow-lg group transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer relative overflow-hidden"
                    >
                      {/* Left Subtle Highlight Strip */}
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-primary to-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        {/* Thumbnail Image */}
                        <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-purple/15 bg-[#180E29]">
                          <Image
                            src={project.image}
                            alt={`${project.title} thumbnail`}
                            fill
                            sizes="96px"
                            quality={80}
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Title, Category & Description */}
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                              {project.category}
                            </span>
                            {project.title.includes('SIDIA') && (
                              <span className="text-[10px] font-mono font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                                Skripsi
                              </span>
                            )}
                          </div>

                          <h3 className="text-base sm:text-lg font-extrabold text-textMain group-hover:text-primary transition-colors line-clamp-1">
                            {project.title}
                          </h3>

                          {project.description && (
                            <p className="text-xs text-textMain/75 line-clamp-1 max-w-xl">
                              {project.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right Actions & Tech Stack Badges */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-purple/15">
                        {/* Tech Pills */}
                        {project.techStack && project.techStack.length > 0 && (
                          <div className="hidden lg:flex items-center gap-1.5">
                            {project.techStack.slice(0, 3).map((tech, tIdx) => (
                              <span 
                                key={tIdx} 
                                className="text-[10px] font-medium font-mono px-2 py-0.5 rounded-md bg-purple/10 text-purple/90 border border-purple/20"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.techStack.length > 3 && (
                              <span className="text-[10px] font-mono text-purple/60">
                                +{project.techStack.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <div className="px-3.5 py-1.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all text-xs font-bold flex items-center gap-1">
                            <span>Details</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>

                          {project.link !== '#' && (
                            <Link 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-xl bg-secondary/40 border border-purple/15 text-textMain/80 hover:text-white hover:bg-primary transition-colors"
                              title="Live Demo"
                            >
                              <FontAwesomeIcon icon={faUpRightFromSquare} className="w-3.5 h-3.5" />
                            </Link>
                          )}
                          {project.github && project.github !== '#' && (
                            <Link 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-colors border border-white/10"
                              title="Source Code"
                            >
                              <FontAwesomeIcon icon={faCode} className="w-3.5 h-3.5" />
                            </Link>
                          )}
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
                    className="border-purple/30 text-textMain hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    Previous
                  </Button>
                  <span className="self-center text-sm font-semibold text-textMain">
                    Page {page + 1} of {totalPages}
                  </span>
                  <Button 
                    variant="outline" 
                    disabled={page >= totalPages - 1} 
                    onClick={() => setPage((prev) => prev + 1)}
                    className="border-purple/30 text-textMain hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
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
                  variants={listVariants} 
                  initial="hidden" 
                  animate="visible"
                >
                  {currentCertificates.map((certificate, index) => (
                    <motion.div
                      key={index}
                      variants={rowVariants}
                      whileHover={{ y: -6 }}
                      className="bg-secondary/20 hover:bg-secondary/40 backdrop-blur-md rounded-2xl border border-purple/15 hover:border-primary/40 p-5 shadow-lg group transition-all duration-300 flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        <div className="relative rounded-xl overflow-hidden shadow-md h-48 w-full group/img mb-5 border border-purple/10">
                          <Image
                            src={certificate.image}
                            alt={`${certificate.title} credential certificate`}
                            width={500}
                            height={281}
                            sizes="(max-width: 768px) 100vw, 500px"
                            quality={85}
                            className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <h3 className="text-base font-bold text-textMain line-clamp-2 leading-snug mb-2">
                          {certificate.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between w-full mt-4 pt-4 border-t border-purple/15">
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-purple/15 text-purple border border-purple/30 font-semibold uppercase tracking-wider">
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
                    className="border-purple/30 text-textMain hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    Previous
                  </Button>
                  <span className="self-center text-sm font-semibold text-textMain">
                    Page {page + 1} of {totalPagesCertificates}
                  </span>
                  <Button 
                    variant="outline" 
                    disabled={page >= totalPagesCertificates - 1} 
                    onClick={() => setPage((prev) => prev + 1)}
                    className="border-purple/30 text-textMain hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Glassmorphic Project Detail Modal / Popup */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0F0716]/95 backdrop-blur-2xl border border-primary/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-textMain space-y-6 scrollbar-thin"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-secondary/40 border border-purple/20 text-textMain hover:text-white hover:bg-primary transition-colors focus-visible:outline-none z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Header Frame */}
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-purple/20 shadow-xl bg-[#180E29]">
                <Image
                  src={selectedProject.image}
                  alt={`${selectedProject.title} detail preview`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  quality={90}
                />
                <div className="absolute top-4 left-4 z-10 bg-black/75 backdrop-blur-md text-primary text-xs font-mono font-bold px-3 py-1 rounded-lg border border-primary/30 uppercase tracking-wider">
                  {selectedProject.category}
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 inline-block">
                    Project Overview
                  </span>
                  {selectedProject.title.includes('SIDIA') && (
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Final Year Project (Skripsi)</span>
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-textMain dark:text-white tracking-tight">
                  {selectedProject.title}
                </h2>
              </div>

              {/* Project Description & Key Academic Highlights */}
              <div className="space-y-4 bg-secondary/20 p-5 rounded-2xl border border-purple/15">
                <h3 className="text-sm font-bold text-textMain dark:text-white uppercase tracking-wider font-mono">
                  Description &amp; Research Highlights
                </h3>
                <p className="text-sm text-textMain/90 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Special Research Metrics Highlights for SIDIA */}
                {selectedProject.title.includes('SIDIA') && (
                  <div className="space-y-3 pt-3 border-t border-purple/15">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-center">
                        <Award className="w-4 h-4 text-primary mx-auto mb-1" />
                        <div className="text-sm font-black text-textMain dark:text-white">CVI 1.00</div>
                        <div className="text-[10px] text-textMain/75 font-mono">3 Doctors Validated</div>
                      </div>
                      <div className="p-3 rounded-xl bg-purple/10 border border-purple/20 text-center">
                        <Users className="w-4 h-4 text-purple mx-auto mb-1" />
                        <div className="text-sm font-black text-textMain dark:text-white">20+ Test Users</div>
                        <div className="text-[10px] text-textMain/75 font-mono">Academic Testing</div>
                      </div>
                      <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                        <Activity className="w-4 h-4 text-green-400 mx-auto mb-1" />
                        <div className="text-sm font-black text-textMain dark:text-white">94% UAT Index</div>
                        <div className="text-[10px] text-textMain/75 font-mono">Excellent Feasibility</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
                      <div className="flex items-start gap-2 text-textMain/90">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Early risk screening for Type 2 Diabetes Mellitus</span>
                      </div>
                      <div className="flex items-start gap-2 text-textMain/90">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Forward Chaining &amp; Certainty Factor reasoning (%)</span>
                      </div>
                      <div className="flex items-start gap-2 text-textMain/90">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Interactive NLP AI Medical Chatbot Assistant</span>
                      </div>
                      <div className="flex items-start gap-2 text-textMain/90">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>100% Success Rate (Black Box &amp; Inference Testing)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tech Stack List */}
              {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold text-textMain/70 uppercase tracking-wider">
                    Technologies &amp; Architecture
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono font-semibold px-3 py-1 rounded-xl bg-purple/15 text-purple border border-purple/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Link Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-purple/20">
                {selectedProject.link !== '#' && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-purple transition-all shadow-lg flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Threads Post / Demo</span>
                  </a>
                )}
                {selectedProject.github && selectedProject.github !== '#' && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-gray-800 text-white text-xs font-bold hover:bg-gray-700 transition-all border border-white/10 flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
