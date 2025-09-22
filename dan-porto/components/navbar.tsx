'use client';

// import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
// import Image from 'next/image';
export default function Navbar() {
  // const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'service', 'project', 'contact'];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
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
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getLinkClass = (section: string) => {
    return `block py-2 px-3 hover:text-primary underline-hover ${
      activeSection === section ? 'text-primary' : 'text-white'
    }`;
  };
    
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky top-0 z-50 bg-black/30 backdrop-blur-sm border-b border-purple">
        <div className="flex flex-wrap items-center justify-between mx-auto px-20 py-6">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">didanfarizz</span>
          </a>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="#home" className={getLinkClass('home')}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="#service" className={getLinkClass('service')}>
                  Service
                </Link>
              </li>
              <li>
                <Link href="#project" className={getLinkClass('project')}>
                  Showcase
                </Link>
              </li>
              <li>
                <Link href="#contact" className={getLinkClass('contact')}>
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
