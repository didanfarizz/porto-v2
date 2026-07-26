'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'project', 'service', 'contact'];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top - 120 && scrollPosition < top + height - 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'project', label: 'Showcase', href: '#project' },
    { id: 'service', label: 'Services', href: '#service' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-3 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* Desktop & Tablet Floating Glass Pill */}
      <nav className="pointer-events-auto w-full max-w-5xl bg-secondary/25 dark:bg-[#0F0716]/80 backdrop-blur-2xl border border-purple/30 shadow-2xl rounded-2xl md:rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300">
        
        {/* Brand Logo */}
        <Link 
          href="#home" 
          className="flex items-center space-x-2 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none group"
        >
          <span className="text-xl font-black tracking-tight text-white bg-gradient-to-r from-primary via-purple to-pink-500 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            didanfarizz
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                  isActive ? 'text-white' : 'text-textMain/80 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-primary/30 border border-primary/50 rounded-full -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Actions: Theme Toggle + Mobile Menu Trigger */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full text-textMain hover:text-white hover:bg-white/10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-purple" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button" 
            className="p-2 rounded-lg text-textMain/80 hover:text-white md:hidden hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none" 
            aria-label="Open main menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="pointer-events-auto absolute top-16 left-4 right-4 bg-[#0F0716]/95 backdrop-blur-2xl border border-purple/30 rounded-2xl p-4 shadow-2xl md:hidden flex flex-col space-y-2 z-50"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive 
                    ? 'bg-primary/20 text-primary border border-primary/30' 
                    : 'text-textMain/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </motion.div>
      )}
    </header>
  );
}