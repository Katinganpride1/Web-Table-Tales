/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BOARD_GAMES } from '../data';
import { Game } from '../types';
import { Search, Filter, Clock, Users, ShieldAlert, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface BoardGamesSectionProps {
  askGMAboutGame: (gameTitle: string) => void;
}

export default function BoardGamesSection({ askGMAboutGame }: BoardGamesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const filters = ['All', 'Strategy/Euro Games', 'Family Games', 'Party Games', 'Local Games'];

  const filteredGames = BOARD_GAMES.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || game.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="pt-24 pb-16 px-4 md:px-6 max-w-[1200px] mx-auto animate-fade-in">
      
      {/* Dynamic Shelf Title */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a1c1c] mb-3">
          Perpustakaan Board Game Kami
        </h1>
        <p className="font-sans text-sm md:text-base text-[#56423d] max-w-[600px] leading-relaxed">
          Pilihlah petualanganmu dari ratusan judul yang tersedia. Saring berdasarkan genre, durasi, jumlah pemain, atau tanyakan langsung panduan aturan mainnya ke Virtual GM!
        </p>
      </div>

      {/* Control Panel (Search and Filters) */}
      <div className="bg-white rounded-2xl border border-[#e1dfdc] shelf-shadow p-5 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Cari kelayakan game atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#faf9f8] border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 font-sans text-sm focus:outline-none focus:border-[#b9583e] focus:ring-1 focus:ring-[#b9583e] transition-all"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-bold transition-all ${
                activeFilter === filter
                  ? 'bg-[#b9583e] text-white shadow-sm'
                  : 'bg-neutral-100 text-[#56423d] hover:bg-neutral-200'
              }`}
            >
              {filter === 'All' ? 'Semua Kategori' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Shelf Layout for Games */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <div
              key={game.id}
              className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col overflow-hidden relative group cursor-pointer ${
                selectedGameId === game.id
                  ? 'border-[#b9583e] ring-2 ring-[#b9583e]/10 shadow-lg translate-y-[-4px]'
                  : 'border-[#e1dfdc] shelf-shadow hover:translate-y-[-4px] hover:border-[#b9583e]/50'
              }`}
              onClick={() => setSelectedGameId(selectedGameId === game.id ? null : game.id)}
            >
              <div className="absolute inset-0 wood-grain-texture pointer-events-none opacity-5 scroll-smooth" />

              {/* Game Poster Image */}
              <div className="relative h-48 bg-[#f5f5f5] overflow-hidden select-none">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Difficulty tag */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-neutral-200/50 text-[#1a1c1c] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#b9583e]" />
                  {game.difficulty}
                </div>

                {/* Left category tag */}
                <span className="absolute bottom-3 left-3 bg-[#b9583e] text-white text-[10px] font-bold uppercase tracking-wider px-2 md:px-2.5 py-1 rounded">
                  {game.typeBadge}
                </span>
              </div>

              {/* Game Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs text-neutral-400 mb-1 font-semibold uppercase tracking-wider">
                  {game.category}
                </div>
                
                <h3 className="text-xl font-serif font-bold text-[#1a1c1c] mb-3 group-hover:text-[#9a4029] transition-colors">
                  {game.title}
                </h3>
                
                <p className="font-sans text-xs text-[#56423d] leading-relaxed mb-4 line-clamp-3">
                  {game.description}
                </p>

                {/* Quick stats panel */}
                <div className="grid grid-cols-2 gap-2 p-2 bg-[#faf9f8] rounded-xl text-xs font-sans font-semibold text-[#56423d] mb-4 mt-auto border border-neutral-200/30">
                  <div className="flex items-center gap-1.5 justify-center py-1">
                    <Users className="w-4 h-4 text-neutral-400" />
                    <span>{game.players}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center py-1">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span>{game.duration}</span>
                  </div>
                </div>

                {/* Expanded content */}
                {selectedGameId === game.id && (
                  <div className="border-t border-neutral-100 pt-4 mt-2 animate-scale-up">
                    <h4 className="text-xs font-bold text-[#1a1c1c] uppercase tracking-wider mb-2">Nilai Tambah &amp; Aturan:</h4>
                    <ul className="text-xs text-[#56423d] space-y-1 mb-4">
                      {game.features?.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#b9583e]" />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    {/* AI GM Trigger for specifically this game */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        askGMAboutGame(game.title);
                      }}
                      className="w-full bg-[#b9583e]/10 hover:bg-[#b9583e]/20 text-[#b9583e] py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border border-[#b9583e]/20"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Tanyakan Cara Bermain ke AI GM
                    </button>
                  </div>
                )}
                
                {selectedGameId !== game.id && (
                  <div className="text-[11px] text-center text-primary font-bold group-hover:underline mt-1 flex items-center justify-center gap-1">
                    Detail Game &amp; Tanya AI Master
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <HelpCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-black text-[#1a1c1c] mb-1">Game tidak ditemukan</h3>
            <p className="font-sans text-sm text-[#56423d]">Cobalah mengganti kata pencarian atau pilih kategori lain.</p>
          </div>
        )}
      </div>

    </section>
  );
}
