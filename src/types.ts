/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Page = 'home' | 'board-games' | 'menu' | 'pricing';

export interface Game {
  id: string;
  title: string;
  category: string; // 'Strategy' | 'Family' | 'Party' | 'Co-Op'
  typeBadge: string; // e.g. 'Tile-Placement', 'Route-Building', 'Deduction', etc.
  players: string;
  duration: string;
  difficulty: 'Easy' | 'Easy-Medium' | 'Medium' | 'Medium-Hard' | 'Hard' | 'Very Easy';
  image: string;
  description: string;
  features?: string[];
  rulesExcerpt?: string;
}

export interface Booking {
  id: string;
  fullName: string;
  date: string;
  time: string;
  playersCount: number;
  vibe: 'Sofa' | 'Lesehan' | 'Dining';
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Snacks' | 'Signature Drinks' | 'Coffee' | 'Main Course';
  price: string;
  description: string;
  image: string;
  isPopular?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'gm';
  text: string;
  timestamp: string;
}
