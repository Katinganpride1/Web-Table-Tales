/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import BoardGamesSection from './components/BoardGamesSection';
import MenuSection from './components/MenuSection';
import PricingSection from './components/PricingSection';
import VirtualGMModal from './components/VirtualGMModal';
import Footer from './components/Footer';
import { Page } from './types';
import { Sparkles, MessageSquare, Ticket } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isGMOpen, setIsGMOpen] = useState(false);
  const [gameGMQuery, setGameGMQuery] = useState<string>('');

  // Scroll back to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Helper trigger to summon GM with dedicated pre-defined game question
  const handleAskGMAboutGame = (gameTitle: string) => {
    setGameGMQuery(gameTitle);
    setIsGMOpen(true);
  };

  const handleClearGMQuery = () => {
    setGameGMQuery('');
  };

  return (
    <div className="relative min-h-screen bg-[#faf9f8] flex flex-col pt-16 selection:bg-[#b9583e] selection:text-white">
      {/* Organic radial dotted texture overlay */}
      <div className="absolute inset-0 wooden-accent pointer-events-none z-0" />
      
      {/* 1. Header Toolbar */}
      <Header activePage={activePage} setActivePage={setActivePage} />

      {/* 2. Active Screen Content Segment */}
      <main className="flex-1 relative z-10">
        {activePage === 'home' && (
          <HomeSection setActivePage={setActivePage} openGM={() => setIsGMOpen(true)} />
        )}
        
        {activePage === 'board-games' && (
          <BoardGamesSection askGMAboutGame={handleAskGMAboutGame} />
        )}
        
        {activePage === 'menu' && (
          <MenuSection />
        )}
        
        {activePage === 'pricing' && (
          <PricingSection />
        )}
      </main>

      {/* Fixed bottom-right absolute conversational floating trigger */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Playful Floating tooltip box */}
        <div className="bg-white border border-[#e1dfdc] px-3.5 py-2.5 rounded-xl shelf-shadow max-w-[200px] text-right pointer-events-auto backdrop-blur-sm bg-white/95 animate-fade-in animate-duration-300 shadow-md">
          <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#b9583e] mb-0.5 flex items-center justify-end gap-1">
            <Sparkles className="w-3 h-3 text-[#b9583e]" />
            AI GAME MASTER
          </p>
          <span className="text-[11px] text-[#56423d] font-sans font-semibold leading-tight">Punya pertanyaan aturan atau rekomendasi?</span>
        </div>

        {/* Core Bubble button */}
        <button
          onClick={() => setIsGMOpen(true)}
          className="bg-[#496455] hover:bg-[#394e42] text-white p-4.5 rounded-2xl shadow-xl hover:-translate-y-1 transition-all active:scale-95 pointer-events-auto flex items-center justify-center border border-white/20"
          title="Tanya Game Master AI"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* virtual assistant system modal drawer */}
      <VirtualGMModal
        isOpen={isGMOpen}
        onClose={() => setIsGMOpen(false)}
        initialPrompt={gameGMQuery}
        clearInitialPrompt={handleClearGMQuery}
      />

      {/* 3. Footer area */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

