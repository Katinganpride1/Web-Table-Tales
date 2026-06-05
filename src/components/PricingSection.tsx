/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Booking } from '../types';
import { Calendar, Users, Armchair, Clock, MapPin, CheckCircle, Ticket, Heart } from 'lucide-react';

export default function PricingSection() {
  const [fullName, setFullName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('16:00');
  const [players, setPlayers] = useState(4);
  const [vibe, setVibe] = useState<'Sofa' | 'Lesehan' | 'Dining'>('Sofa');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);
  const [activeTicket, setActiveTicket] = useState<Booking | null>(null);

  // Load existing bookings from local storage
  useEffect(() => {
    const data = localStorage.getItem('table-and-tales-bookings');
    if (data) {
      try {
        setBookingHistory(JSON.parse(data));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !date) {
      alert('Mohon isi nama lengkap dan pilih tanggal reservasi Anda!');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const newBooking: Booking = {
        id: 'TKT-' + Math.floor(1000 + Math.random() * 9000),
        fullName,
        date,
        time,
        playersCount: players,
        vibe,
        createdAt: new Date().toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      const updated = [newBooking, ...bookingHistory];
      setBookingHistory(updated);
      localStorage.setItem('table-and-tales-bookings', JSON.stringify(updated));
      
      setActiveTicket(newBooking);
      setIsSubmitting(false);

      // Clean inputs
      setFullName('');
      setDate('');
    }, 800);
  };

  const passes = [
    {
      title: 'Regular Hourly',
      price: 'Rp 15.000',
      period: 'per jam / orang',
      bg: 'bg-white',
      border: 'border-[#e1dfdc]',
      features: ['Akses ke 200+ koleksi game', 'Rekomendasi Game Master', 'WiFi Cepat & Port Charger', 'Free air minum isi ulang']
    },
    {
      title: 'Cozy All-Day Pass',
      price: 'Rp 40.000',
      period: 'sepuasnya seharian',
      bg: 'bg-[#ffdbd2]/20',
      border: 'border-[#ffdbd2] ring-1 ring-[#b9583e]/20',
      features: ['Bermain sampai puas 12 jam', 'Full bimbingan Game Master', 'WiFi Berkecepatan tinggi', 'Free air minum isi ulang', 'Bebas ganti game sesuka hati'],
      recommended: true
    },
    {
      title: 'Bundling Hemat',
      price: 'Rp 55.000',
      period: 'per sesi / orang',
      bg: 'bg-white',
      border: 'border-[#e1dfdc]',
      features: ['All-day game pass sepuasnya', 'Dapatkan 1 camilan (Churros/Roti)', 'Dapatkan 1 Seduhan signature/kopi', 'Full bimbingan set-up & aturan']
    }
  ];

  return (
    <section className="pt-24 pb-16 px-4 md:px-6 max-w-[1200px] mx-auto animate-fade-in">
      
      {/* Page Title Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a1c1c] mb-3">
          Sewa Meja &amp; Paket Bermain
        </h1>
        <p className="font-sans text-sm md:text-base text-[#56423d] max-w-[600px] leading-relaxed">
          Pilihlah skenario paket bermain analog yang paling menyenangkan untuk kelompokmu. Hubungi AI Game Master kami jika ingin menanyakan rekomendasi kustomisasi!
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {passes.map((pass, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 md:p-8 border flex flex-col relative ${pass.bg} ${pass.border} shelf-shadow transition-transform hover:-translate-y-1 duration-300`}
          >
            {pass.recommended && (
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-[#9a4029] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-md">
                Group Favorite
              </span>
            )}
            
            <h3 className="text-xl font-serif font-bold text-[#1a1c1c] mb-2">{pass.title}</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl md:text-4xl font-extrabold font-serif text-[#9a4029]">{pass.price}</span>
              <span className="text-xs text-neutral-400 font-sans tracking-tight">{pass.period}</span>
            </div>
            
            <div className="h-px bg-neutral-200/60 mb-6" />

            <ul className="text-xs text-[#56423d] space-y-3 flex-1 mb-8">
              {pass.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-1.5 font-sans font-medium">
                  <CheckCircle className="w-4 h-4 text-[#496455] shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                const formEl = document.getElementById('booking-form-element');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full py-3 rounded-lg font-sans text-xs font-bold transition-transform active:scale-95 ${
                pass.recommended
                  ? 'bg-[#b9583e] hover:bg-[#9a4029] text-white shadow-md'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-[#56423d]'
              }`}
            >
              Pesan Paket Ini
            </button>
          </div>
        ))}
      </div>

      {/* Booking Form and Directions Row */}
      <div id="booking-form-element" className="grid lg:grid-cols-2 gap-12 mb-16">
        
        {/* Reservation Form */}
        <div className="bg-white rounded-3xl border border-[#e1dfdc] shelf-shadow p-6 md:p-8 relative">
          <div className="absolute inset-0 wood-grain-texture pointer-events-none" />
          
          <h2 className="text-2xl font-serif font-bold text-[#1a1c1c] mb-4">
            Isi Formulir Reservasi Meja Cozy
          </h2>
          <p className="font-sans text-xs text-[#56423d] mb-6 leading-relaxed">
            Meja Anda akan ditahan selama maksimal 20 menit dari jam pemesanan. Layanan panduan set-up permainan oleh Game Master sudah otomatis termasuk secara gratis!
          </p>

          <form onSubmit={handleCreateBooking} className="space-y-5">
            {/* Fullname input */}
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
              <input
                type="text"
                required
                placeholder="Contoh: Syamsul Bakhri"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#faf9f8] border border-neutral-200 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#b9583e] transition-all"
              />
            </div>

            {/* Date and Time selectors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Tanggal</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#faf9f8] border border-neutral-200 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#b9583e] transition-all text-neutral-500"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Jam Kedatangan</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#faf9f8] border border-neutral-200 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#b9583e] transition-all text-[#1a1c1c]"
                >
                  <option value="10:00">10:00 WIB</option>
                  <option value="13:00">13:00 WIB</option>
                  <option value="16:00">16:00 WIB</option>
                  <option value="19:00">19:00 WIB</option>
                  <option value="21:00">21:00 WIB</option>
                </select>
              </div>
            </div>

            {/* Players count select */}
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Jumlah Pemain</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPlayers(Math.max(1, players - 1))}
                  className="w-10 h-10 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[#1a1c1c] flex items-center justify-center font-bold font-sans active:scale-90 transition-transform"
                >
                  -
                </button>
                <span className="w-12 text-center text-base font-sans font-bold text-[#1a1c1c]">{players} Orang</span>
                <button
                  type="button"
                  onClick={() => setPlayers(Math.min(12, players + 1))}
                  className="w-10 h-10 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[#1a1c1c] flex items-center justify-center font-bold font-sans active:scale-90 transition-transform"
                >
                  +
                </button>
              </div>
            </div>

            {/* Vibes radio selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Gaya Duduk / Vibe Area</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Sofa', 'Lesehan', 'Dining'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVibe(v)}
                    className={`py-3 rounded-lg border font-sans text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                      vibe === v
                        ? 'border-[#b9583e] bg-[#ffdbd2]/20 text-[#b9583e]'
                        : 'border-neutral-200 bg-[#faf9f8] text-[#56423d] hover:bg-neutral-100'
                    }`}
                  >
                    <span>{v}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#b9583e] hover:bg-[#9a4029] disabled:bg-neutral-300 text-white py-3.5 rounded-xl font-sans text-sm font-bold shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Mencatat Meja...' : 'Verifikasi & Terbitkan Tiket'}
            </button>
          </form>
        </div>

        {/* Directions / Operational and Maps Card */}
        <div className="flex flex-col gap-6">
          
          {/* Operational hours card */}
          <div className="bg-white p-6 rounded-3xl border border-[#e1dfdc] shelf-shadow flex items-center gap-4">
            <div className="bg-[#496455]/10 text-[#496455] w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-serif font-bold text-[#1a1c1c] mb-0.5">Jam Operasional Kafe</h4>
              <p className="font-sans text-xs text-[#56423d]">Setiap Hari: 10:00 - 23:00 WIB (Sembahyang &amp; Libur Nasional Tetap Buka)</p>
            </div>
          </div>

          {/* Locations card and Map Hotlink integration */}
          <div className="bg-white rounded-3xl border border-[#e1dfdc] shelf-shadow overflow-hidden flex-1 flex flex-col">
            <div className="p-6 pb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#b9583e]/10 text-[#b9583e] w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-[#1a1c1c] mb-0.5">Lokasi Palangkaraya</h4>
                  <p className="font-sans text-xs text-[#56423d]">Jl. Tjilik Riwut No. 45, Palangkaraya, Kalimantan Tengah</p>
                </div>
              </div>
            </div>

            <div className="relative flex-1 min-h-[220px] bg-neutral-100 border-t border-neutral-100 overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL5BxHETExJIISKSRAW1kUp0U7gKSrcro1sNxf1ZYt7uRrG7PmUZp_J-_MLeK2DlhJEMfHgzEB3NKPYmy_qRtdLxFpr78lJeDZ54Psmwy8kYH59f9P64VRP8FuEHvi3cAM4OnFPqWDf6Gs8Rtkjg0MflWtj-UNnvLsPBq-MSKCO7A30uTm25HevNdB4WV8RJxEwAHROaGxbUr8iyh79L_5P5rVsg58VmW_xgf2tbznEKWIv0MxoduKnUe5dhxwdOH66yLbzUi1gBGX"
                alt="Table and Tales Palangkaraya Location Map Map"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Ticket Overlay popup if successful */}
      {activeTicket && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf9f8] rounded-3xl shelf-shadow w-full max-w-sm overflow-hidden animate-scale-up relative border border-[#e1dfdc]">
            <div className="absolute inset-0 wood-texture pointer-events-none opacity-4" />
            
            {/* Ticket Header decorative meeple */}
            <div className="bg-[#b9583e] text-white p-6 text-center relative">
              <Ticket className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <h3 className="text-lg font-serif font-bold text-white mb-1">Tiket Board Game Kamu</h3>
              <p className="font-mono text-xs opacity-75 font-semibold text-[#ffd1c3]">TABLE &amp; TALES PASSPORT</p>
            </div>

            {/* Ticket Details Body */}
            <div className="p-6 space-y-4 font-sans text-[#1a1c1c] text-sm relative">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-neutral-300">
                <span className="text-neutral-400 text-xs font-bold tracking-wide">ID TIKET</span>
                <span className="font-mono font-bold text-[#b9583e] text-base">{activeTicket.id}</span>
              </div>
              
              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-400 text-xs font-bold tracking-wide">NAMA PEMAIN</span>
                <span className="font-bold">{activeTicket.fullName}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-400 text-xs font-bold tracking-wide">TANGGAL</span>
                <span className="font-bold">{activeTicket.date}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-400 text-xs font-bold tracking-wide">JAM MASUK</span>
                <span className="font-bold">{activeTicket.time} WIB</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-400 text-xs font-bold tracking-wide">PESERTA</span>
                <span className="font-bold">{activeTicket.playersCount} Orang</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-400 text-xs font-bold tracking-wide">VIBE AREA</span>
                <span className="bg-[#496455]/10 text-[#496455] px-2.5 py-0.5 rounded font-bold text-xs uppercase">{activeTicket.vibe} Lounge</span>
              </div>

              {/* Decorative circular notch cuts on ticket margins */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-6 h-6 bg-neutral-950/60 rounded-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-6 h-6 bg-neutral-950/60 rounded-full" />
            </div>

            {/* Ticket close button */}
            <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 bg-[#496455] hover:bg-[#394e42] text-white py-3 rounded-lg font-sans text-xs font-bold shadow-md active:scale-95 transition-transform"
              >
                Cetak Tiket
              </button>
              <button
                onClick={() => setActiveTicket(null)}
                className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-[#56423d] py-3 rounded-lg font-sans text-xs font-bold active:scale-95 transition-transform"
              >
                Tutup Saja
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
