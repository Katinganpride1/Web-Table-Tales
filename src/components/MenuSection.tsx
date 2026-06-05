/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MENU_ITEMS } from '../data';
import { Sparkles, Utensils, Zap, HelpCircle } from 'lucide-react';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Snacks' | 'Signature Drinks' | 'Coffee' | 'Main Course'>('All');

  const categories: ('All' | 'Snacks' | 'Signature Drinks' | 'Coffee' | 'Main Course')[] = [
    'All',
    'Snacks',
    'Signature Drinks',
    'Coffee',
    'Main Course'
  ];

  const filteredItems = activeCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="pt-24 pb-16 px-4 md:px-6 max-w-[1200px] mx-auto animate-fade-in">
      
      {/* Menu Header banner */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a1c1c] mb-3">
          Camilan &amp; Seduhan di Table &amp; Tales
        </h1>
        <p className="font-sans text-sm md:text-base text-[#56423d] max-w-[600px] leading-relaxed">
          Temukan kenikmatan bermain dengan sajian premium cita rasa lokal. Kami menyajikan seduhan kopi yang menggugah, snack manis renyah, hingga makan malam Game Master yang legendaris.
        </p>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center md:justify-start border-b border-[#e1dfdc] pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2.5 rounded-xl font-sans text-xs md:text-sm font-bold transition-all relative ${
              activeCategory === cat
                ? 'bg-[#ffdbd2]/40 text-[#9a4029] border border-[#ffdbd2]'
                : 'text-[#56423d] hover:bg-[#e9e8e7]'
            }`}
          >
            {cat === 'All' ? 'Semua Sajian' : cat}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#e1dfdc] overflow-hidden shelf-shadow flex flex-col group transition-transform hover:-translate-y-1 duration-300"
          >
            <div className="relative h-48 bg-[#faf9f8] overflow-hidden select-none">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Popular Tag */}
              {item.isPopular && (
                <div className="absolute top-3 left-3 bg-[#9a4029] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  GM Favorite
                </div>
              )}

              {/* Price Block */}
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-neutral-200/50 shadow-sm text-sm font-sans font-bold text-[#b9583e]">
                {item.price}
              </div>
            </div>

            {/* Menu Description body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#496455]">
                  {item.category}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#1a1c1c] mt-1 mb-2">
                  {item.name}
                </h3>
                <p className="font-sans text-xs text-[#56423d] leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How to Order Banner */}
      <div className="bg-[#496455]/10 border border-[#496455]/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="bg-[#496455] text-white w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
          <Utensils className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-lg font-serif font-bold text-[#1a1c1c] mb-1">
            Sambil Bermain, Pesan Langsung dari Mejamu!
          </h4>
          <p className="font-sans text-sm text-[#56423d] leading-relaxed">
            Tidak perlu beranjak berdiri menyela pertempuran serumu. Cukup sentuh barcode QR di sudut meja keping kayu, tim kru meja kami siap membawakan pesananmu hangat-hangat seketika!
          </p>
        </div>
      </div>

    </section>
  );
}
