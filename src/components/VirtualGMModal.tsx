/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { Send, X, Bot, Sparkles, MessageSquare, Coffee, ShieldAlert } from 'lucide-react';

interface VirtualGMModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  clearInitialPrompt?: () => void;
}

export default function VirtualGMModal({
  isOpen,
  onClose,
  initialPrompt,
  clearInitialPrompt
}: VirtualGMModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'gm',
      text: 'Halo petualang! Selamat datang di **Table & Tales Palangkaraya**! 🎲\n\nSaya adalah **Resident Game Master** digital Anda di sini. Ada peraturan game yang membuat pusing? Atau sedang mencari saran game papan terbaik untuk kelompok bermain Anda? Ketikkan saja pertanyaan Anda di bawah!',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle triggered initial prompt from catalog button triggers
  useEffect(() => {
    if (isOpen && initialPrompt) {
      handleSendPrompt(`Bagaimana cara bermain game board ${initialPrompt}? Terangkan aturan ringkasnya.`);
      if (clearInitialPrompt) clearInitialPrompt();
    }
  }, [isOpen, initialPrompt]);

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Map chat messages to API format history structure
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.sender === 'gm' ? 'gm' : 'user',
          text: m.text
        }));

      const res = await fetch('/api/gemini/gm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: textToSend,
          history
        })
      });

      const data = await res.json();
      
      const gmMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'gm',
        text: data.text || 'Maaf petualang, saya sedang merapikan kartu di meja. Coba tanyakan sekali lagi!',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, gmMsg]);
    } catch (err) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        sender: 'gm',
        text: 'Aduh! Koneksi saya terputus sejenak dari perpustakaan game. Tapi jangan khawatir, silakan tanyakan lagi atau pastikan server berjalan!',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = input;
    setInput('');
    handleSendPrompt(msg);
  };

  const quickPrompts = [
    { label: '🎲 Rekomendasi Game', text: 'Tolong berikan rekomendasi game papan seru untuk pemula beranggotakan 4 orang.' },
    { label: '🏰 Aturan Carcassonne', text: 'Bagaimana cara menaruh ubin dan mencetak skor di board game Carcassonne?' },
    { label: '🥨 Camilan Paling Pas', text: 'Apa menu camilan dan kopi signature favorit di cafe Table & Tales?' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#faf9f8] w-full max-w-[550px] h-[600px] rounded-3xl shelf-shadow flex flex-col overflow-hidden relative border border-[#e1dfdc] animate-scale-up">
        <div className="absolute inset-0 wood-texture pointer-events-none opacity-4" />

        {/* Modal Header */}
        <div className="bg-[#496455] text-white px-6 py-4 flex items-center justify-between relative shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base md:text-lg flex items-center gap-1.5">
                Resident Game Master
                <Sparkles className="w-4 h-4 text-[#ffd1c3] fill-[#ffd1c3]" />
              </h3>
              <p className="text-[10px] font-sans font-semibold tracking-wider text-green-200 uppercase">Interactive AI Assistant</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-all active:scale-90"
            aria-label="Tutup chatbot"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chats Messages Window */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#faf9f8] hide-scrollbar select-text">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* GM Avatar */}
              {msg.sender === 'gm' && (
                <div className="w-8 h-8 rounded-lg bg-[#4a6355] border border-neutral-300 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Message Bubble wrapper */}
              <div className="flex flex-col">
                <div
                  className={`p-4 rounded-2xl text-xs md:text-sm font-sans leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-[#b9583e] text-white rounded-tr-none shadow-sm'
                      : 'bg-white text-[#1a1c1c] border border-[#e1dfdc] rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className={`text-[9px] text-neutral-400 mt-1 font-semibold ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Loading Blocks */}
          {isTyping && (
            <div className="flex gap-3 max-w-[80%] mr-auto items-center">
              <div className="w-8 h-8 rounded-lg bg-[#4a6355] border border-neutral-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white animate-bounce" />
              </div>
              <div className="bg-white border border-[#e1dfdc] px-4 py-3 rounded-2xl rounded-tl-none text-xs font-sans font-medium text-neutral-500 italic flex items-center gap-1.5 shadow-sm">
                <span>Sedang menyusun kepingan dadu aturan...</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-75" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-300" />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Inputs and Templates Panel */}
        <div className="p-4 bg-white border-t border-[#e1dfdc] shrink-0 space-y-3 relative z-10">
          
          {/* Lazy Suggestive Tag Prompts */}
          {messages.length === 1 && !isTyping && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 block px-1">Pertanyaan Cepat:</span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((qp, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput('');
                      handleSendPrompt(qp.text);
                    }}
                    className="bg-[#faf9f8] hover:bg-[#ffdbd2]/15 text-[#56423d] border border-stone-200 hover:border-[#b9583e]/40 px-2.5 py-1.5 rounded-lg text-[10px] md:text-xs font-sans font-bold transition-all text-left"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Core Submit Input Form */}
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Tanya set-up board game, aturan main..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#faf9f8] border border-neutral-200 rounded-xl px-4 py-3 font-sans text-xs focus:outline-none focus:border-[#b9583e] focus:ring-1 focus:ring-[#b9583e] transition-all text-[#1a1c1c]"
            />
            
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-[#b9583e] hover:bg-[#9a4029] disabled:bg-neutral-200 text-white p-3 rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center shrink-0 disabled:scale-100"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
