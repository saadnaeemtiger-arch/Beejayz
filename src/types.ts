/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price?: number;
  rating: number;
  servings?: string;
  flavors: string[];
  popular?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
  date: string;
  cakeType?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CustomCake {
  theme: string;
  tiers: number;
  flavor: string;
  frosting: string;
  toppings: string[];
  inscription: string;
  priceEstimate: number;
  deliveryType: 'pickup' | 'delivery';
  deliveryDate: string;
  notes?: string;
}

export interface CartItem {
  id: string;
  type: 'signature' | 'custom';
  product?: Product;
  customCake?: CustomCake;
  quantity: number;
  selectedFlavor?: string;
  selectedSize?: string;
}

export interface CakeInquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  status: 'pending' | 'reviewed' | 'confirmed';
  items: CartItem[];
  totalEstimate: number;
  specialInstructions?: string;
}
