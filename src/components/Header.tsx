/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Page } from '../types';
import { Menu, X, CalendarDays, Compass } from 'lucide-react';

interface HeaderProps {
  activePage: Page;
  setActivePage: Dispatch<SetStateAction<Page>>;
}

export default function Header({ activePage, setActivePage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', value: 'home' as Page },
    { label: 'Board Games', value: 'board-games' as Page },
    { label: 'Menu', value: 'menu' as Page },
    { label: 'Pricing & Booking', value: 'pricing' as Page }
  ];

  return (
    <header
      id="top-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full border-b ${
        isScrolled
          ? 'bg-[#faf9f8]/90 backdrop-blur-md h-16 shadow-md border-neutral-200'
          : 'bg-[#faf9f8] h-20 border-[#dcc1ba]'
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-5 md:px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
          className="text-2xl font-serif font-bold text-primary active:scale-95 transition-transform"
        >
          Table &amp; Tales
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => setActivePage(link.value)}
              className={`font-sans text-sm font-semibold transition-all transition-opacity relative py-1 hover:text-primary ${
                activePage === link.value
                  ? 'text-primary font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary'
                  : 'text-[#56423d]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Action Button & Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('pricing')}
            className="bg-[#b9583e] text-white px-5 py-2.5 rounded-lg font-sans text-sm font-bold shadow-md active:scale-95 transition-transform hover:bg-[#9a4029] flex items-center gap-2"
          >
            <CalendarDays className="w-4 h-4" />
            <span className="hidden sm:inline">Book a Table</span>
            <span className="sm:hidden">Book</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1a1c1c] active:scale-90 transition-transform"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#faf9f8] border-b border-[#dcc1ba] shadow-xl p-5 z-40 animate-fade-in animate-duration-150">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  setActivePage(link.value);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-base font-sans font-semibold py-2 px-3 rounded-lg transition-all ${
                  activePage === link.value
                    ? 'bg-[#ffdbd2]/40 text-primary font-bold'
                    : 'text-[#56423d] hover:bg-[#e9e8e7]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
