/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Game, MenuItem } from './types';

export const BOARD_GAMES: Game[] = [
  {
    id: 'carcassonne',
    title: 'Carcassonne',
    category: 'Strategy/Euro Games',
    typeBadge: 'Tile-Placement',
    players: '2-5 Players',
    duration: '30-45 Mins',
    difficulty: 'Easy-Medium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnuoggF5HE5rfhsLkWXo6Fd_bEg2IaHcJbjpxmQ20aiZMRynA0AOwNJkdiLQirrGJItdr7BgXXxsT0EVuTCJd9Zxkr5WCZO2QLZHDD53m-o_QHLIlueQWHsv-pEGsjT2rzLUak2XL_RUPah0LoLVPgy6B-ksAwQqqO2SC90PHtdGwP5_Hg8lDBoYC6LHfuY5rrhLwQw689NpsKhdfNOGIyYqBVM4FJfs5mFXLBufF2ffJr2nYDaamfZJNMcammZ_zrymlP7lq8bhV2',
    description: 'A modern classic tile-placement game. Players draw and place tiles to construct roads, cities, monasteries, and fields, scoring points by placing meeples on them.',
    features: ['Infinite map variations', 'Highly tactical', 'Great for 2 players'],
    rulesExcerpt: 'Draw a tile, place it so roads and walls connect correctly. Optionally place a meeple. Score points when roads, cities, or monasteries are completed.'
  },
  {
    id: 'ticket-to-ride',
    title: 'Ticket to Ride',
    category: 'Family Games',
    typeBadge: 'Route-Building',
    players: '2-5 Players',
    duration: '30-60 Mins',
    difficulty: 'Easy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqWjGh__vapWjNMgdMqC_3ylwcRwR_tqUAEZKFW58yC7NUKDaGPEMT7J7QLQoC6QsrwDFyc1D5Df-N9pr8u4uz9SNx1IOXEu0-lP_szKJLGM7E7Vfueqw9pmc7pYMUwYhnKv7Vi-IMyGyvpVm699GZ0NOIo6jhXLCz5-KAZrsbgGAO_ck5h0OZu9FYpKJULP3wAL91NbvJqFRsUUF5v0306lfe9DzN8bWWFGXd8JySTfI6iU3Z0A1Pw89w-S0YQoWCxpCAryaLUVh2',
    description: 'Connect iconic cities in this cross-country train adventure. Simple rules, deep strategic choices, and a satisfying tactical progression keep everyone engaged.',
    features: ['Easy to learn, hard to master', 'Colorful components', 'Family-friendly route-blocking'],
    rulesExcerpt: 'On your turn, either draw train cards, claim a route between cities on the map, or draw additional Destination Tickets to fulfill.'
  },
  {
    id: 'pandemic',
    title: 'Pandemic',
    category: 'Strategy/Euro Games',
    typeBadge: 'Co-Op',
    players: '2-4 Players',
    duration: '45 Mins',
    difficulty: 'Medium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlDiQaNXUba_6tcRuo9tiqpEqBxeK_yhPN8vpjNEBiq-uMiOLIjzEoxt_9VNy2aZKE55knorVahj_jKViHy88NrN1QQRDvIyxdkT5qp2romFXdqZEAzpTf66iNxUWsL2SNegQNFRdqW_YHINJROU3QuH5kk1v6DBEHXEi4YWu5VZ-Re-tZhuIqASL2yRmssDDtXjFhAAhWdc-YcKqmuD1HMLeLTbeFv4x81ixUOCSP45L7skRDVSv14_dJwQaksuJNsruV8SfxnpcZ',
    description: 'You and your team are disease-fighting specialists cooperating to cure four deadly plagues before they overrun the globe. Communication and planning are key to survival.',
    features: ['Full cooperative play', 'Unique character special abilities', 'High tension & replayability'],
    rulesExcerpt: 'Players take 4 actions to travel, treat disease, share knowledge, or discover a cure. Then, new infections spread. Win by curing all four diseases.'
  },
  {
    id: 'codenames',
    title: 'Codenames',
    category: 'Party Games',
    typeBadge: 'Deduction',
    players: '2-8 Players',
    duration: '15-30 Mins',
    difficulty: 'Very Easy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFDIQS5jBGw9fADChha9t-WNatcFoP3Jh40D3MQe0jlMB2HHuhMrpTi-A1DJtlwtse3f09omdk22a_SJR8mfNozWoY206kc9Q5uahwRcP4a8JfEOXT0NfektdDWC-H28VDpBmRLcfNRmsdhApZ3B0JXv0hBJ_F6WYR0ZJbKX4iO8XqI2KUHxG8zZ4DHjnXL7eGlSd9YPQDx-O5lyqXpuCBgQea0eRsgU93-SMSVjSohJST_kLWsSUFoQ_MHze9l-y1xEaeda7sIE8t',
    description: 'The premier word association party game. Two rival Spymasters know the secret identities of 25 agents. They can only give one-word clues to help their team find them.',
    features: ['Extremely social', 'Great for large groups', 'Clever word connections'],
    rulesExcerpt: 'Spymaster gives a clue in the form of "Word, Number" (e.g., "Water, 2"). Field operatives scan the grid to touch cards matching that clue.'
  },
  {
    id: 'catan',
    title: 'Settlers of Catan',
    category: 'Strategy/Euro Games',
    typeBadge: 'Trading/Negotiation',
    players: '3-4 Players',
    duration: '60-90 Mins',
    difficulty: 'Medium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkn_zIwKSGk2V1HH7oW0-vgkOxfK1ZWwanlTieYjXLbHXYlLOTLevRKAcZoUoU2QPxhU3aw6sKPQYVrOcqhKBJqJIv67RSUn9WYskgnZ1MOmcUPVsysLagKgJ-W6eSGQ5YcvtxaXF3eDg2ZLBDHPcXc_z8F6aNnfD3coInRFf2HVygHlpm3_qhV3eZUqm5_Um3t9C-C_fTpGDw1OoytLFNmOn6nSDxeoi6XvLtAaP8O_dUo9knjzJSdIM0B8w4uNHkeKq66OJZK6Y5',
    description: 'Establish settlements, construct roads, and trade sheep, wood, brick, ore, and wheat to build your empire on the fertile island of Catan.',
    features: ['High interactive trading', 'Variable hex layout', 'Classic gateway board game'],
    rulesExcerpt: 'Roll two dice to harvest resources from adjacent hexes. Spend resources to build roads, settlements, cities, or development cards.'
  },
  {
    id: 'splendor',
    title: 'Splendor',
    category: 'Family Games',
    typeBadge: 'Engine-Building',
    players: '2-4 Players',
    duration: '30 Mins',
    difficulty: 'Easy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuzqrWwjLn6DtRdWAZKI2SisbSy3wg0QpKx4DZourn3oivga4G6gJ9aYD82djkFFzb3GdR85xaq71O4gHaWSereBh6Gc1CY_amRU7_ZnXJwBLJPKMG1htBUlGRmw47XD2JDMFXqV4kdx1Nr6ihuBpl0RJ8uarEa7MMG3MxNj0nMmLRX-NK2oF5DJOnpCl75r9lAKQczgcbDojAnTPp8b3lIDMVEN5kAE4tFbror3QIJoalqnuMkCYwFuGQdt-JTbShi_jsnhZse5LX',
    description: 'As a wealthy Renaissance merchant, acquire mines, transport details, and artisans to turn raw gems into beautiful jewelry, earning prestige points to win.',
    features: ['Satisfying heavy gem chips', 'Snappy, fast-paced turns', 'Pure math/strategy alignment'],
    rulesExcerpt: 'Take gem tokens, buy a card from the table, or reserve a card. Cards you own grant permanent resource discounts for future cards.'
  },
  {
    id: 'exploding-kittens',
    title: 'Exploding Kittens',
    category: 'Party Games',
    typeBadge: 'Drafting/Luck',
    players: '2-5 Players',
    duration: '15 Mins',
    difficulty: 'Very Easy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg1p8kbgBNOFSbRg1ZhteBXueq3UHJaBoREsXtbxFKSAlK7usfB8JQChGV7m7DI5r9L2JhwklBWX-v8SuhBXLAbg1dsTCPI6qqG7UQ-knxSG7D-VQX2G0KHxtILeCSVoAGi7xQf3Dix8NQzpl_kwEQIPveIPR1ITQc_howXzaxu4CB6t3aoOV6mAFOdPCMH7MPR9IYsOUGc44C2jFQ4AGKywmD29Uy6syNigA5zqozMdQomYk8NbSEru2TzdgM73kEZReD8w2d0LxP',
    description: 'A whimsical, highly interactive card game of Russian Roulette where players draw cards until someone draws an Exploding Kitten, exploding and exiting the game.',
    features: ['Hilarious card art', 'Extremely chaotic and fast', 'Great icebreaker for all levels'],
    rulesExcerpt: 'Play cards from your hand (skips, defuses, peeking) to manipulate the deck, then draw a card. If you draw a kitten and cannot defuse it, you explode.'
  },
  {
    id: 'congklak',
    title: 'Congklak (Dakon)',
    category: 'Local Games',
    typeBadge: 'Mathematical',
    players: '2 Players',
    duration: '20-30 Mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1601987177651-8edfe6c20009?q=80&w=600&auto=format&fit=crop',
    description: 'The ancient Indonesian mancala game played with a beautiful carved wooden boat-like board and tiny Cowrie shells. Requires tactical counting and circular strategy.',
    features: ['Rich Indonesian heritage', 'Calming wooden auditory feedback', 'Deeply educational counting'],
    rulesExcerpt: 'Sow shells into consecutive small pits. If your last shell lands in a loaded pit, scoop all of them up and continue sowing. Fill your master treasury.'
  },
  {
    id: 'gaple',
    title: 'Kartu Gaple (Domino)',
    category: 'Local Games',
    typeBadge: 'Tile-Matching',
    players: '4 Players',
    duration: '15-20 Mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1595015655511-c52222ff5a22?q=80&w=600&auto=format&fit=crop',
    description: 'Indonesia’s most famous social card/tile game. Four players play individually or in pairs, aligning matching domino numbers to discard their entire hand.',
    features: ['Lively high-energy play', 'Local coffee-stall styling', 'Block strategy calculations'],
    rulesExcerpt: 'Place a card matching the numbers on either open end of the chain. If unable to place, pass. First to empty their hand wins.'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'churros',
    name: 'Tactile Churros with Hot Cocoa',
    category: 'Snacks',
    price: 'Rp 28.000',
    description: 'Crispy, golden-fried dough sticks rolled in premium cinnamon sugar, served steamy with rich, thick dark chocolate dip.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDau5sJhhNCcGv1IHWZ4fmSoDKTccJ73sdu4kad2EL18I5pbnNMHV3dZiNFBGf9_khqAMkHGGfQT76DdJByXJLtFcA-34uuIWC8ohPmZY-dG-lsWE99TQTZVPmfHpcxLx1_5YjyOsHY6KnmW9W3DEm7t78ajZJEIlB5pY9Rj7Y3XN7zf_dSSJFrLxzqNXh-kVzEaNcNt6STAkecu0nqmLTaXrIZ7Xn8CbUtOZsY6bn8qfVJ_JZQO9gkN_m-x-PprgoY6T7y2n97Jwcy',
    isPopular: true
  },
  {
    id: 'terracotta-latte',
    name: 'Terracotta Signature Latte',
    category: 'Signature Drinks',
    price: 'Rp 24.000',
    description: 'Our proprietary espresso brew blended with soft, roasted hazelnut syrup, cream, and a dash of home-ground cinnamon nutmeg spice.',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?q=80&w=400&auto=format&fit=crop',
    isPopular: true
  },
  {
    id: 'forest-matcha',
    name: 'Forest Green Cream Iced Matcha',
    category: 'Signature Drinks',
    price: 'Rp 26.000',
    description: 'Pure ceremonial-grade green tea powder whisked to perfection, served over iced dairy with a rich brown-sugar cloud foam topper.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'singapore-toast',
    name: 'Living Room Kaya Toast',
    category: 'Snacks',
    price: 'Rp 20.000',
    description: 'Perfectly crisped local brioche toast filled with home-cooked sweet coconut-egg pandan jam and slices of cold butter.',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'sengkuang-fries',
    name: 'Sengkuang Seasoned Wedges',
    category: 'Snacks',
    price: 'Rp 22.000',
    description: 'Crispy cut seasoned root potato wedges tossed with local Kalteng garlic-chili herbs, served with standard garlic dip.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'manual-brew-gayo',
    name: 'V60 Manual Gayo Specialty',
    category: 'Coffee',
    price: 'Rp 22.000',
    description: 'Light, fruity, single-origin Arabica from the Gayo highlands brewed meticulously by hand for perfect extraction.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'nasi-goreng-story',
    name: 'Game Master Special Fried Rice',
    category: 'Main Course',
    price: 'Rp 35.000',
    description: 'Wok-fired fragrant jasmine rice with shredded chicken, local spices, sunny side-up egg, and authentic Kalimantan crackers.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=400&auto=format&fit=crop',
    isPopular: true
  }
];
