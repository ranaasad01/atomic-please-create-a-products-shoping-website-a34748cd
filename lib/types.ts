export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviewCount: number;
  badge?: "New" | "Sale" | "Out of Stock" | "Hot";
  inStock: boolean;
  tags: string[];
  reviews: Review[];
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: CartItem[];
  total: number;
  shippingAddress: Address;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  image: string;
}
