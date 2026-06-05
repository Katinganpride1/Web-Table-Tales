/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Dispatch, SetStateAction } from 'react';
import { Page } from '../types';
import { Mail, Compass, HelpCircle, Heart } from 'lucide-react';

interface FooterProps {
  setActivePage: Dispatch<SetStateAction<Page>>;
}

export default function Footer({ setActivePage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16 grid md:grid-cols-3 gap-8">
        
        {/* Branch 1: Branding block */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-white tracking-tight">Table &amp; Tales</h3>
          <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed max-w-sm">
            Kafe game papan cozy pertama di Palangkaraya, Kalimantan Tengah. Membawa kembali kebahagiaan sejati bertatap muka, beraliansi tulus, dan bernostalgia tanpa gawai digital.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="mailto:syamsulbakhri775@gmail.com"
              className="w-10 h-10 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors shadow-inner"
              title="Hubungi Kami"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Branch 2: Sitemap Navigation */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase font-bold tracking-widest text-white">Navigasi Kafe</h4>
          <ul className="space-y-2.5 font-sans text-sm text-neutral-400">
            {([
              { label: 'Jendela Utama (Home)', val: 'home' },
              { label: 'Koleksi Library Game', val: 'board-games' },
              { label: 'Sajian Camilan & Kopi', val: 'menu' },
              { label: 'Sewa & Reservasi Meja', val: 'pricing' }
            ] as const).map((lnk) => (
              <li key={lnk.val}>
                <button
                  onClick={() => {
                    setActivePage(lnk.val);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  {lnk.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Branch 3: Localized Info */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase font-bold tracking-widest text-white">Lokasi &amp; Kontak</h4>
          <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed">
            Jalan Tjilik Riwut No. 45<br />
            Palangkaraya, Central Kalimantan (Sebelah Gedung Kalteng)<br />
            Telepon / WA: +62 812-3456-7890
          </p>
          <div className="text-xs text-neutral-500 font-sans flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" />
            <span>syamsulbakhri775@gmail.com</span>
          </div>
        </div>

      </div>

      {/* Decorative Bottom copyright */}
      <div className="bg-neutral-950 py-6 border-t border-neutral-900 text-center text-xs text-neutral-500">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans font-semibold">
          <span>&copy; {currentYear} Table &amp; Tales Cafe. Hak Cipta Dilindungi.</span>
          <span className="flex items-center gap-1">
            Dibuat dengan cinta untuk masa depan tulus
            <Heart className="w-3 h-3 text-[#b9583e] fill-[#b9583e]" />
            di Palangkaraya.
          </span>
        </div>
      </div>
    </footer>
  );
}
