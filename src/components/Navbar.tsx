'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, GraduationCap, Calendar, FileCheck, PhoneCall } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Admission Form', path: '/admission-form' },
    { name: 'Programs', path: '/programs' },
    { name: 'Students Directory', path: '/students' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHome = pathname === '/';
  const isDarkBg = !isHome || scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none print:hidden ${
        isDarkBg 
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-emerald-500/50 bg-emerald-950/40 flex items-center justify-center transition-all duration-350 group-hover:scale-105 group-hover:border-emerald-400 overflow-hidden p-[2px]">
              <img src="/assets/Logo.png" alt="Jamia Islamabad Logo" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-sm tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
                جامعہ اسلام آباد
              </span>
              <span className="text-emerald-500/80 text-[10px] font-mono font-bold tracking-wider leading-none mt-1">
                JAMIA ISLAMABAD
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-xs font-bold tracking-wide transition-all duration-200 hover:text-emerald-400 ${
                    isActive 
                      ? 'text-emerald-400 border-b-2 border-emerald-500 pb-1' 
                      : 'text-zinc-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/admission-form"
              className="px-4.5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-extrabold shadow-md hover:shadow-lg hover:shadow-emerald-950/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5" />
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 absolute top-full left-0 right-0 p-4 shadow-xl flex flex-col gap-3 animate-fade-in select-none">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-emerald-950/50 text-emerald-400 border-l-4 border-emerald-500' 
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/admission-form"
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full py-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all text-center flex items-center justify-center gap-2"
          >
            <FileCheck className="w-4 h-4" />
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  );
}
