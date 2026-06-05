/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Dispatch, SetStateAction } from 'react';
import { Page } from '../types';
import { Sparkles, Calendar, BookOpen, Coffee, MessageSquare, ArrowRight, Heart } from 'lucide-react';

interface HomeSectionProps {
  setActivePage: Dispatch<SetStateAction<Page>>;
  openGM: () => void;
}

export default function HomeSection({ setActivePage, openGM }: HomeSectionProps) {
  return (
    <section className="pt-24 pb-16 px-4 md:px-6 max-w-[1200px] mx-auto animate-fade-in">
      
      {/* 1. Hero Showcase Block */}
      <div className="relative rounded-3xl overflow-hidden shelf-shadow bg-[#f0ede9] border border-[#e1dfdc] mb-12 flex flex-col lg:flex-row min-h-[500px]">
        {/* Wood backdrop layer */}
        <div className="absolute inset-0 wood-texture pointer-events-none" />
        
        {/* Hero Left Content */}
        <div className="relative z-10 flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-[#b9583e]/10 border border-[#b9583e]/20 text-[#b9583e] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-tight mb-6 w-fit uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Cozy Board Game Cafe Palangkaraya
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1a1c1c] leading-tight tracking-tight mb-6">
            Mulai Ceritamu.<br />
            <span className="text-[#9a4029] italic font-normal">Satu Langkah, Ribuan Petualangan.</span>
          </h1>
          
          <p className="font-sans text-base md:text-lg text-[#56423d] leading-relaxed mb-8 max-w-[500px]">
            Tinggalkan gawai digitalmu (*digital detox*). Masuki dunia penuh tawa, strategi tulus, dan koneksi hangat di Palangkaraya. Ditemani camilan lezat dan Game Master andal kami.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setActivePage('pricing')}
              className="bg-[#b9583e] text-white px-8 py-4 rounded-xl font-sans text-base font-bold shadow-md hover:bg-[#9a4029] transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Reservasi Meja
            </button>
            <button
              onClick={() => setActivePage('board-games')}
              className="bg-white border border-[#dcc1ba] text-[#56423d] px-8 py-4 rounded-xl font-sans text-base font-bold hover:bg-[#ffdbd2]/10 transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Katalog Game Board
            </button>
          </div>
        </div>
        
        {/* Hero Right Visual Column */}
        <div className="relative flex-1 min-h-[300px] lg:min-h-[auto] overflow-hidden lg:border-l border-[#dcc1ba]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzooiSlWGVE8PM-kRyi0MNnCG1nGj25skdT67dpHM8l2JSrEqjkWF_OUwpAfA_skoo27NrrJtQumbhzWStY5MNzlLMryfVv7hekkTpsgpNJFO7F9Gd-57s57dRwIseLVzHTGpbVJ81Yh6xu-EedhW7Kv0GchLLbkKSAlBEf9NK8AWW5G6dMuWkgNioqUeHt5uEPkAJfKqDaefJlBbPtghWvqyJep5f2suwoz9FKmFDD1gd4BSlJX3IfXH3LHvPpZMn-eGIswumtDuZ"
            alt="Cozy library shelf"
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#faf9f8]/10 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* 2. Interactive Highlights / Philosophy Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-7 rounded-2xl md:p-8 border border-[#e1dfdc] shelf-shadow transition-transform hover:-translate-y-1">
          <div className="bg-[#b9583e]/10 text-[#b9583e] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#1a1c1c] mb-3">Makanan &amp; Kopi Hangat</h3>
          <p className="font-sans text-sm text-[#56423d] leading-relaxed">
            Dari racikan premium *Terracotta Espresso Signature* hingga Churros renyah bertabur bubuk kayu manis. Camilan yang sempurna untuk mendampingi tawa Anda.
          </p>
        </div>

        <div className="bg-white p-7 rounded-2xl md:p-8 border border-[#e1dfdc] shelf-shadow transition-transform hover:-translate-y-1">
          <div className="bg-[#496455]/10 text-[#496455] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#1a1c1c] mb-3">Komunitas analog tulus</h3>
          <p className="font-sans text-sm text-[#56423d] leading-relaxed">
            Lebih dari sekadar kafe biasa. Kami merangkul budaya *digital detox* di mana handphone ditaruh sejenak untuk membangun interaksi tulus berdua atau bertiga.
          </p>
        </div>

        <div className="bg-white p-7 rounded-2xl md:p-8 border border-[#e1dfdc] shelf-shadow transition-transform hover:-translate-y-1">
          <div className="bg-[#705740]/10 text-[#705740] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#1a1c1c] mb-3">Virtual Game Master 24/7</h3>
          <p className="font-sans text-sm text-[#56423d] leading-relaxed">
            Pusing membaca lembaran peraturan game papan yang sangat tebal? AI Game Master interaktif kami siap menceritakan ringkasan cara main kapan saja!
          </p>
        </div>
      </div>

      {/* 3. Spotlighting the Game Master Column (Dual-row card with Chat trigger) */}
      <div className="bg-white rounded-3xl border border-[#e1dfdc] shelf-shadow overflow-hidden p-8 md:p-12 mb-16 relative">
        <div className="absolute inset-0 wood-grain-texture pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-[#fffbff] shadow-lg transform rotate-[-2deg] transition-transform hover:rotate-0 duration-300">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKztqZ_9T0xfz1O2WTCJXo3MrusOaL3_4F8CaSLHI7iGUfKe_4LvVU1BDxK61lVNCDCY3N5aFgcTU3I_bOHEdsEXZaVr3a5aoq-nEDj-VXGVlKPnlvJzMOPB_o_8-gEAJcoW1_t9OR1jElZVykOG9rhoRTvRD4tpD9j0QA19JTdmoJpGUd70F5mnHGuxHE2WCj_FwuBu9X4F8D1y_Z66NydzwwVf8iP-ETXG4YEUGP0iHbtClBH7s9WnV7usO2TaqPmzuGUd5JPFRu"
                alt="Expert Game Master"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="w-full lg:w-2/3">
            <div className="inline-flex items-center gap-1.5 bg-[#496455]/10 text-[#496455] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider mb-4 uppercase">
              <Sparkles className="w-3" />
              Resident Butler &amp; Rules Solver
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a1c1c] mb-5 leading-tight">
              Biarkan Game Master Mengajarkannya Untukmu!
            </h2>
            
            <p className="font-sans text-[#56423d] leading-relaxed mb-6">
              Di **Table &amp; Tales**, Anda tidak perlu membuang waktu 30 menit berkutat dengan buku aturan game yang kaku. Game Master resident kami yang berdedikasi akan mengatur set-up papan kayu Anda, menerangkan skenario utama, dan menjaga keharmonisan tawa di ruangan.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={openGM}
                className="bg-[#496455] text-white px-6 py-3.5 rounded-lg font-sans text-sm font-bold shadow-md hover:bg-[#394e42] transition-transform active:scale-95 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Ngobrol dengan Virtual GM
              </button>
              <button
                onClick={() => setActivePage('board-games')}
                className="bg-neutral-100 hover:bg-neutral-200 text-[#56423d] px-6 py-3.5 rounded-lg font-sans text-sm font-bold transition-transform active:scale-95 flex items-center gap-1.5"
              >
                Lihat Koleksi Game
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
        </div>
      </div>

    </section>
  );
}
