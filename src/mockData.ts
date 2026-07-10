import { Product, User } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'PG Unleashed RX-78-2 Gundam',
    price: 11500,
    grade: 'PG',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=400', // Robot silhouette / futuristic
    description: 'The absolute pinnacle of Gunpla engineering. Features multiple layers of inner frame, custom metal-etched parts, and built-in LED lighting units for ultimate realism.',
    rating: 5.0,
    reviewsCount: 148,
    releaseYear: 2021
  },
  {
    id: '2',
    name: 'MGEX Strike Freedom Gundam',
    price: 6800,
    grade: 'MG',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?auto=format&fit=crop&q=80&w=400',
    description: 'Master Grade Extreme. Features the highest level of metallic gold inner frame finishes (yellow, copper, white gold, and real gold plating) with striking multi-layer articulation.',
    rating: 4.9,
    reviewsCount: 96,
    releaseYear: 2022
  },
  {
    id: '3',
    name: 'HG Gundam Calibarn',
    price: 950,
    grade: 'HG',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400',
    description: 'From "Mobile Suit Gundam: The Witch from Mercury". Comes with its signature Variable Rod Rifle resembling a witch\'s broomstick and shimmering iridescent shell parts.',
    rating: 4.8,
    reviewsCount: 212,
    releaseYear: 2023
  },
  {
    id: '4',
    name: 'RG RX-93-v2 Hi-v Gundam',
    price: 1950,
    grade: 'RG',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1627645835237-0743e51b9e7d?auto=format&fit=crop&q=80&w=400',
    description: 'Real Grade detail compressed into 1/144 scale. Amazing density, color-separation, and individual movable fin funnels with multi-joint support.',
    rating: 4.9,
    reviewsCount: 184,
    releaseYear: 2021
  },
  {
    id: '5',
    name: 'Unisex Gunpla Builder T-Shirt (White)',
    price: 590,
    grade: 'Apparel',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400', // Premium White T-Shirt
    description: 'Unisex White T-Shirt featuring a clean minimalist schematic blueprint of an RX-78-2 chest plate. Made from 100% heavy combed cotton for maximum comfort during long model kit building sessions.',
    rating: 4.7,
    reviewsCount: 42,
    releaseYear: 2024
  },
  {
    id: '6',
    name: 'Professional Single-Blade Nipper',
    price: 1250,
    grade: 'Tools',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400', // Tool lookalike
    description: 'Ultra-thin single-edge side cutter designed specifically for gating plastic runner parts. Delivers razor-sharp, smooth cuts with minimal stress to prevent plastic whitening.',
    rating: 4.9,
    reviewsCount: 75,
    releaseYear: 2023
  },
  {
    id: '7',
    name: 'HG Aerial Gundam (Rebuild) - Limited Edition',
    price: 850,
    grade: 'HG',
    status: 'Inactive',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=400',
    description: 'The upgraded variant of the main protagonist suit from Witch from Mercury. Featuring redesigned flight pack and blue shield bits.',
    rating: 4.6,
    reviewsCount: 51,
    releaseYear: 2023
  }
];

export const MOCK_USERS: User[] = [
  {
    username: 'admin',
    displayName: 'Amuro Ray (Admin)',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Amuro&backgroundColor=b6e3f4',
    role: 'Admin'
  },
  {
    username: 'customer',
    displayName: 'Banagher Links',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Banagher&backgroundColor=ffdf7a',
    role: 'Customer'
  }
];
