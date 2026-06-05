/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized GoogleGenAI client helper
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a dummy client or throw helper so that developer is notified via JSON
      console.warn('GEMINI_API_KEY env variable is not configured. Virtual Game Master will simulation-mock answers.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || 'DUMMY_KEY',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// AI Virtual Game Master Chat Assistant Route
app.post('/api/gemini/gm', async (req, res) => {
  const { prompt, history } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // If API Key is not set, provide simulated expert gameplay helper answers
  if (!process.env.GEMINI_API_KEY) {
    console.log('No GEMINI_API_KEY found, simulating Expert GM response...');
    // Simulated smart responses for common board games
    const answer = getSimulatedResponse(prompt);
    return res.json({ text: answer });
  }

  try {
    const ai = getGenAI();
    
    // Construct sequential contents compatible with @google/genai API (role: user/model)
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === 'gm' ? 'model' : 'user',
          parts: [{ text: h.text }],
        });
      });
    }
    
    contents.push({
      role: 'user',
      parts: [{ text: prompt }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: `You are the resident expert "Game Master" at Table & Tales, a warm, cozy board game cafe located in Palangkaraya, Central Kalimantan.
Your personality is incredibly welcoming, helpful, smart, and enthusiastic about analog board games. You treat the user like a treasured guest in your cozy living room.
Your goal is to explain board game rules simply, recommend games based on players count or preferred mood, and offer strategies for newcomers (such as for Carcassonne, Ticket to Ride, Pandemic, Codenames, Catan, or Splendor).
Answer in friendly Indonesian. Keep responses clear, warm, formatted in easy-to-read markdown, and relatively concise so they fit neatly in a chat bubble.
If the player inquires about reserving tables, operating hours, or prices at Table & Tales, politely share that they can do so on our "Pricing & Reservation" or "Menu" pages!`,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text });
  } catch (err: any) {
    console.error('Gemini GM error:', err);
    return res.status(500).json({ 
      error: 'Failed to query AI Game Master', 
      details: err.message 
    });
  }
});

// Helper: fallback simulated responder when no API key is specified
function getSimulatedResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('halo') || p.includes('tanya') || p.includes('hi ') || p.includes('pagi') || p.includes('siang') || p.includes('malam')) {
    return `Halo petualang! Selamat datang di **Table & Tales Palangkaraya**! 🎲 

Saya adalah **Game Master** resident di sini. Ada yang bisa saya bantu hari ini? 
Apakah Anda sedang mencari *rekomendasi game* seru, membutuhkan bimbingan *aturan bermain draf pertama* untuk Carcassonne/Ticket to Ride, atau ingin tahu tentang cara reservasi meja cozy kami? Tanyakan saja! ✨`;
  }
  if (p.includes('carcassonne')) {
    return `### 🏰 Tips & Aturan Carcassonne
**Carcassonne** adalah game penempatan ubin (tile-placement) yang sangat taktis! Aturan dasarnya:
1. **Ambil Ubin:** Ambil secara acak dan letakkan sedemikian rupa agar jalan menyambung jalan, benteng menyambung benteng, dan padang rumput menyambung padang rumput.
2. **Klaim Tanah:** Letakkan pembantu (*meeple*) Anda untuk menguasai jalan, kota, atau biara sebelum ubin tertutup.
3. **Tips Master:** Jangan terburu-buru menghabiskan meeple Anda di awal fase permainan! Simpan beberapa untuk merebut kota musuh atau biang poin jangka panjang di lapangan padang rumput (*farmers*). 😁`;
  }
  if (p.includes('ticket') || p.includes('train')) {
    return `### 🚂 Cara Bermain Ticket to Ride
Dalam **Ticket to Ride**, Anda berlomba membangun jaringan kereta api antar kota:
* **Kumpulkan Kartu Gerbong:** Pilih warna gerbong yang Anda butuhkan untuk membangun rute.
* **Klaim Rute:** Tukarkan set kartu warna gerbong yang sama untuk menaruh bidak gerbong kayu Anda ke atas peta permainan.
* **Selesaikan Tiket Tujuan:** Selesaikan rute rahasia Anda antar kota untuk bonus poin besar, tapi hati-hati: tiket yang tidak selesai akan memotong poin Anda di akhir game!`;
  }
  if (p.includes('rekomendasi') || p.includes('recom') || p.includes('game apa') || p.includes('main apa')) {
    return `### Rekomendasi Game Master Terpopuler:
1. **Cari Ketawa & Ramai?** Mainkan **Codenames** (permainan tebak kata mata-mata seru) atau **Exploding Kittens** (kartu kucing rusia roulette yang super rusuh).
2. **Baru Belajar Strategi Ringan?** Cobalah **Ticket to Ride** atau **Carcassonne**, aturan mainnya selesai dipelajari dalam 5 menit!
3. **Senang Kerjasama Menegangkan?** Mainkan **Pandemic**, di mana semua pemain bersekutu melawan virus dunia!
4. **Sentuhan Budaya Lokal?** Coba **Congklak (Dakon)** tradisional kami di atas papan kayu jati yang sejuk. 🎋`;
  }
  if (p.includes('harga') || p.includes('pricing') || p.includes('berapa') || p.includes('bayar') || p.includes('reservasi') || p.includes('pesan') || p.includes('booking')) {
    return `### 📅 Reservasi & Harga Bermain di Table & Tales
Kami memiliki beberapa pilihan terbaik untuk petualangan Anda:
* **Regular Pass:** Hanya **Rp15.000 / orang per jam** (Dapatkan akses penuh ke 200+ koleksi game!).
* **All-Day Pass:** Hanya **Rp40.000 / orang** (Bebas bermain sepuasnya tanpa batas waktu seharian penuh!).
* **Bundling Hemat (Pilihan Terbaik! Group Favorite):** Hanya **Rp55.000 / orang** (Sudah termasuk All-Day Game Pass + 1 Pilihan Minuman/Camilan Signature dan Free WiFi perkasa).

Sobat bisa langsung melakukan pengisian formulir reservasi yang sangat mudah di tab **Pricing & Reservation** di atas! Kami tunggu kehadirannya di Jl. Tjilik Riwut No. 45 ya! ☕🥨`;
  }
  
  return `### Aturan dari Game Master:
Pertanyaan yang menarik! Bermain game papan (*board gaming*) adalah cara terhebat untuk mengistirahatkan mata dari gawai digital (*Digital Detox*) dan terhubung secara tulus dengan orang-orang tercinta Anda.

Apakah Anda tahu? Di **Table & Tales**, Resident Game Master siap mendampingi meja Anda, merapikan set-up papan, serta mengajarkan aturan dari nol sehingga Anda tidak perlu pusing membaca buku peraturan tebal! 

Ada pertanyaan spesifik lain seputar taktik atau menu camilan kami? 🍵🍫`;
}

// Vite and static build delivery middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite routing middleware loaded in local development.');
  } else {
    // Serve static files in production container
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production builds static delivery layers.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Table & Tales server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
