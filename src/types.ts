export interface Product {
  id: string;
  name: string;
  price: number;
  grade: 'HG' | 'RG' | 'MG' | 'PG' | 'Tools' | 'Apparel';
  status: 'Active' | 'Inactive';
  image: string;
  description: string;
  rating: number;
  reviewsCount: number;
  releaseYear: number;
}

export type TabType = 'Home' | 'Add' | 'Products' | 'Categories';

export interface User {
  username: string;
  displayName: string;
  avatar: string;
  role: 'Admin' | 'Customer';
}
