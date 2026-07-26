'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Heart } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Showcase', href: '#project' },
    { label: 'Service', href: '#service' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/didanfarizz', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/didan-fariz-abqari-4a8ba422b/', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://www.instagram.com/didanfarizz', label: 'Instagram' },
    { icon: SiThreads, href: 'https://www.threads.com/@didanfarizz', label: 'Threads' },
  ];

  return (
    <footer className="w-full bg-secondary/15 backdrop-blur-2xl border-t border-purple/20 text-textMain transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Subtle Ambient Glow behind Footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-primary/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-purple/15">
          
          {/* Brand Info */}
          <div className="space-y-3 text-center md:text-left max-w-md">
            <Link href="#home" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-white bg-gradient-to-r from-primary via-purple to-pink-500 bg-clip-text text-transparent">
                didanfarizz
              </span>
            </Link>
            <p className="text-xs text-textMain/80 leading-relaxed">
              Crafting immersive web applications &amp; intelligent machine learning solutions. Turning complex logic into clean, functional digital realities.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold">
            {navLinks.map((link, idx) => (
              <Link 
                key={idx} 
                href={link.href}
                className="text-textMain/80 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-md px-1.5 py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Icons & Back To Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              {socialLinks.map(({ icon: Icon, href, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-secondary/30 border border-purple/15 text-textMain/80 hover:text-primary hover:bg-primary/15 hover:border-primary/40 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-primary text-white hover:bg-purple transition-all duration-300 shadow-md shadow-primary/20 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Credit Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-textMain/70 gap-4">
          <p className="text-center sm:text-left font-mono">
            &copy; {new Date().getFullYear()} Didan Fariz Abqari. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 font-mono text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
            <span>using Next.js &amp; Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}