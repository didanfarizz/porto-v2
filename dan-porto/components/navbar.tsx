'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  // State untuk mengontrol visibilitas menu di mobile
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
      // Default is dark mode
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
      const sections = ['home', 'service', 'project', 'contact'];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          // Offset -100 agar link aktif sedikit lebih awal saat scroll
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top - 100 && scrollPosition < top + height - 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Panggil sekali saat komponen dimuat
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getLinkClass = (section: string) => {
    return `block py-2 px-3 hover:text-primary underline-hover ${
      activeSection === section ? 'text-primary' : 'text-textMain'
    }`;
  };
    
  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/30 backdrop-blur-sm border-b border-purple transition-colors duration-300">
        {/* Mengurangi padding horizontal di mobile (px-4) dan menambahkannya di desktop (md:px-20) */}
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 md:px-20 md:py-6">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-textMain">didanfarizz</span>
          </a>
          
          {/* Action buttons: theme toggle + hamburger menu */}
          <div className="flex items-center space-x-2 md:order-2">
            <button 
              onClick={toggleTheme} 
              className="p-2.5 rounded-full text-textMain hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Tombol Hamburger (Hanya muncul di mobile) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button" 
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" 
              aria-controls="navbar-sticky" 
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Ikon Hamburger atau Ikon Close (X) */}
              {isMenuOpen ? (
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
              )}
            </button>
          </div>

          {/* Wrapper untuk menu links */}
          {/* Kondisi: 'block' jika isMenuOpen true, 'hidden' jika false. 'md:flex' akan selalu berlaku di layar medium ke atas */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-700 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <Link href="#home" className={getLinkClass('home')} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="#service" className={getLinkClass('service')} onClick={() => setIsMenuOpen(false)}>
                  Service
                </Link>
              </li>
              <li>
                <Link href="#project" className={getLinkClass('project')} onClick={() => setIsMenuOpen(false)}>
                  Showcase
                </Link>
              </li>
              <li>
                <Link href="#contact" className={getLinkClass('contact')} onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}