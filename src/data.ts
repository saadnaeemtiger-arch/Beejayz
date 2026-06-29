/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Product, Testimonial, FAQItem } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'birthday',
    name: 'Birthday Cakes',
    description: 'Charming, vibrant, and personalized cakes to make birthdays extra magical.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'wedding',
    name: 'Wedding Cakes',
    description: 'Bespoke, multi-tiered masterpieces matching your dream wedding aesthetic.',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'custom',
    name: 'Custom Cakes',
    description: 'Artistic, highly tailored statement creations representing any theme or vision.',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f8011b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    description: 'Bite-sized elegance with gourmet fillings and silky smooth frosting crowns.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'pastries',
    name: 'Pastries',
    description: 'Buttery, flaky viennoiserie, fruit tarts, and delicate eclairs baked fresh.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'cheesecakes',
    name: 'Cheesecakes',
    description: 'Silky, rich, slow-baked New York style cheesecakes with artisan toppings.',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Elegant French macarons, rich chocolate verrines, and signature treat platters.',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'cookies',
    name: 'Gourmet Cookies',
    description: 'Soft-baked, premium cookies stuffed with artisanal chocolates and nut butter.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800',
  },
];

export const SIGNATURE_CAKES: Product[] = [
  {
    id: 'sig-01',
    name: 'Blush Rose Gold Cascade',
    description: 'A luxurious blush pink buttercream cake accented with hand-painted 24k edible gold leaf flakes, delicate pink macarons, and fresh organic roses.',
    image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&q=80&w=800',
    category: 'custom',
    price: 125,
    rating: 5,
    servings: '12-15 servings',
    flavors: ['Red Velvet Blossom', 'Rich Dark Chocolate', 'Velvet Vanilla'],
    popular: true,
    tags: ['Best Seller', 'Elegant', 'Floral'],
  },
  {
    id: 'sig-02',
    name: 'Elysian Meadow Wedding Masterpiece',
    description: 'A breathtaking 3-tiered cake featuring cascading hand-sculpted white sugar flowers, subtle pearlescent textures, and elegant minimalist borders.',
    image: 'https://images.unsplash.com/photo-1527488258414-f44ab8b82ff6?auto=format&fit=crop&q=80&w=800',
    category: 'wedding',
    price: 480,
    rating: 5,
    servings: '40-50 servings',
    flavors: ['Luscious Lemon Berry', 'Classic White Wedding', 'Salted Caramel Pecan'],
    popular: true,
    tags: ['Masterpiece', 'Wedding', 'Artisanal'],
  },
  {
    id: 'sig-03',
    name: 'Gilded Chocolate Decadence',
    description: 'Decadent rich dark chocolate cake, smothered in silky espresso chocolate ganache, finished with a golden caramel drip, and premium truffles.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    category: 'birthday',
    price: 95,
    rating: 4.9,
    servings: '10-12 servings',
    flavors: ['Rich Dark Chocolate', 'Salted Caramel Pecan'],
    popular: true,
    tags: ['Popular', 'Chocolate', 'Drip Cake'],
  },
  {
    id: 'sig-04',
    name: 'Pastel Unicorn Fantasy',
    description: 'A playful and enchanting unicorn-themed cake with swirling pastel buttercream mane, golden edible horn, and sparkling rainbow sprinkle core.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=800',
    category: 'birthday',
    price: 110,
    rating: 4.8,
    servings: '12-15 servings',
    flavors: ['Confetti Funfetti', 'Velvet Vanilla'],
    popular: false,
    tags: ['Kids Birthday', 'Magical', 'Pastel'],
  },
  {
    id: 'sig-05',
    name: 'Elegant Raspberry Crown Cheesecake',
    description: 'Slow-baked creamy New York style cheesecake with a gluten-free speculoos crust, topped with a luscious handmade red raspberry coulis and fresh organic berries.',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&q=80&w=800',
    category: 'cheesecakes',
    price: 65,
    rating: 4.9,
    servings: '8-10 servings',
    flavors: ['Vanilla Bean Cream'],
    popular: false,
    tags: ['Fresh', 'Cheesecake', 'Fruity'],
  },
  {
    id: 'sig-06',
    name: 'Bespoke Gourmet Cupcake Collection',
    description: 'An elegant baker-curated selection of twelve signature cupcakes, including double chocolate ganache, red velvet velvet-cream, and lemon curd blossom.',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=800',
    category: 'cupcakes',
    price: 45,
    rating: 5,
    servings: '12 standard pieces',
    flavors: ['Assorted Signature Flavors'],
    popular: true,
    tags: ['Party Favor', 'Assorted', 'Signature'],
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Premium Ingredients',
    description: 'We source only organic free-range eggs, premium Belgian chocolates, Madagascan vanilla beans, and seasonal organic fruits.',
    icon: 'Sparkles',
  },
  {
    title: 'Handmade Daily with Love',
    description: 'Every dessert, pastry, and cake is handcrafted fresh from scratch every single morning, ensuring unparalleled taste and freshness.',
    icon: 'Heart',
  },
  {
    title: 'Artistic Custom Designs',
    description: 'Our expert bakers and sugar-craft designers work with you closely to bring your exact imaginative dreams to life.',
    icon: 'Palette',
  },
  {
    title: 'Five-Star Premium Quality',
    description: 'Over 1,200 successful celebrations, wedding reviews, and design awards confirming our commitment to luxurious taste and aesthetics.',
    icon: 'Award',
  },
  {
    title: 'Flexible & Affordable pricing',
    description: 'Elegant custom options carefully engineered to fit your party budget without ever compromising on flavor or breathtaking style.',
    icon: 'Coins',
  },
  {
    title: 'Meticulous Safe Delivery',
    description: 'Climate-controlled specialty bakery delivery vehicles safely transport fragile multi-tiered cakes directly to your venue doorstep.',
    icon: 'Truck',
  },
  {
    title: 'Exquisite Presentation',
    description: 'Every cake is elegantly boxed in glass-clear boutique packaging, tied with premium double-satin ribbon, ready to take center stage.',
    icon: 'Gift',
  },
  {
    title: 'Warm & Friendly Service',
    description: 'Direct consultation, real-time updates of your baking progress, and attentive service that treats you like close family.',
    icon: 'Smile',
  },
];

export const GALLERY_ITEMS = [
  {
    title: 'Elysian Wedding Tower',
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1527488258414-f44ab8b82ff6?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Blush Macaron Pearl Custom',
    category: 'custom',
    image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Bespoke Velvet Cupcakes',
    category: 'cupcakes',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Chocolate Golden Drip Celebration',
    category: 'birthday',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Flaky Artisanal Croissants',
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Elegant Macaron Tower Platter',
    category: 'dessert-table',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Boutique Bakery Interior',
    category: 'bakery-interiors',
    image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Strawberry Infused Birthday Crown',
    category: 'birthday',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Bespoke Painted Canvas Cake',
    category: 'custom',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f8011b?auto=format&fit=crop&q=80&w=800',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Genevieve Sinclair',
    role: 'Bride',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'We ordered our 3-tier Elysian Wedding cake from Beejayz, and it was a absolute work of art. The guests were completely blown away by both the design and the Lemon Berry flavor. Thank you for making our day unforgettable!',
    date: '2026-05-14',
    cakeType: 'Wedding Cake',
  },
  {
    id: 't-2',
    name: 'Marcus Sterling',
    role: 'Event Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'As an event planner, I demand excellence. Beejayz delivers flawless precision every single time. Their custom dessert tables are absolute showstoppers. I cannot recommend their service and attention to detail enough.',
    date: '2026-06-02',
    cakeType: 'Custom Dessert Table',
  },
  {
    id: 't-3',
    name: 'Sophia Chen',
    role: 'Mother of two',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: "The chocolate drip cake we got for my daughter's 10th birthday was spectacular. It looked exactly like the Pinterest sketch we sent them, and tasted so moist and rich. The custom cake customizer on their site is amazing!",
    date: '2026-06-20',
    cakeType: "10th Birthday Drip Cake",
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I place an order?',
    answer: 'You can order in multiple ways: Browse our Signature Collection and click "Order Now" to add items to your Inquiry Cart, or use our interactive Custom Cake Designer to engineer your dream cake. Once you submit, our expert staff will contact you via phone or email/WhatsApp to finalize details, confirm delivery, and secure payment.',
    category: 'ordering',
  },
  {
    id: 'faq-2',
    question: 'How much notice is required for custom cakes?',
    answer: 'For signature cakes and cupcakes, we prefer at least 3-4 days in advance. For intricate multi-tier wedding cakes or fully bespoke custom masterpieces, we require 14 days notice to design, order specialty ingredients, and craft custom hand-sculpted details.',
    category: 'notice',
  },
  {
    id: 'faq-3',
    question: 'Do you make gluten-free, vegan, or nut-free cakes?',
    answer: 'Yes! We offer organic, gluten-free, and vegan recipe options for select cake flavors and cheesecakes. Please make sure to highlight any severe allergies or dietary preferences in the "Special Instructions" box of your online inquiry form.',
    category: 'dietary',
  },
  {
    id: 'faq-4',
    question: 'Do you offer delivery? What are the charges?',
    answer: 'Yes! We offer specialized, climate-controlled delivery to ensure your delicate cakes arrive in flawless condition. Standard delivery is free for orders above $200 within a 15-mile radius. For longer distances or fragile multi-tier wedding towers, safe delivery charges are calculated based on mileage.',
    category: 'delivery',
  },
  {
    id: 'faq-5',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, bank transfers, and securely structured online deposits to kickstart custom baking orders.',
    category: 'payment',
  },
];

export const DESIGNER_THEMES = [
  { id: 'wedding', name: 'Elysian Wedding (Classy & Floral)', multiplier: 1.2, desc: 'Cascading floral textures, gold leaves, and high-end elegance.' },
  { id: 'birthday', name: 'Fun Celebration (Drip & Sprinkles)', multiplier: 1.0, desc: 'Colorful chocolate ganache drops, sprinkles, macarons and whimsical toppings.' },
  { id: 'minimalist', name: 'Modern Minimalist (Smooth Pastel)', multiplier: 0.9, desc: 'Sleek sharp edges, matte tones, and architectural simplicity.' },
  { id: 'chocolate', name: 'Overloaded Chocolate Ganache', multiplier: 1.1, desc: 'Rich multi-shaded chocolate curls, truffles, and golden drizzle.' },
  { id: 'rustic', name: 'Naked / Rustic Country-Style', multiplier: 1.0, desc: 'Delicate exposed crumb, organic greenery, and fresh dustings of sugar.' },
];

export const DESIGNER_FLAVORS = [
  { id: 'vanilla', name: 'Velvet Vanilla Bean', basePrice: 40, desc: 'Moist vanilla cake with Madagascan vanilla bean buttercream.' },
  { id: 'chocolate', name: 'Rich Belgian Dark Chocolate', basePrice: 45, desc: 'Valrhona cocoa layers with silky espresso chocolate ganache.' },
  { id: 'red-velvet', name: 'Red Velvet Blossom', basePrice: 48, desc: 'Traditional cocoa-infused red velvet with fresh citrus cream cheese.' },
  { id: 'lemon-berry', name: 'Luscious Lemon Berry', basePrice: 50, desc: 'Zesty lemon sponge layered with handmade organic raspberry compote.' },
  { id: 'salted-caramel', name: 'Salted Caramel Toasted Pecan', basePrice: 52, desc: 'Buttery brown sugar sponge filled with salted caramel sauce and pecans.' },
];

export const DESIGNER_FROSTINGS = [
  { id: 'buttercream', name: 'Classic Silk Buttercream', price: 10 },
  { id: 'fondant', name: 'Smooth Hand-Rolled Fondant', price: 25 },
  { id: 'ganache', name: 'Whipped Chocolate Ganache', price: 20 },
  { id: 'cream-cheese', name: 'Whipped Citrus Cream Cheese', price: 15 },
  { id: 'naked', name: 'Minimalist Semi-Naked Crumb Coat', price: 5 },
];

export const DESIGNER_TOPPINGS = [
  { id: 'roses', name: 'Fresh Organic Florals & Roses', price: 15 },
  { id: 'gold-leaf', name: '24K Edible Gold Leaf Accents', price: 20 },
  { id: 'macarons', name: 'French Macaron Jewels (6 pcs)', price: 12 },
  { id: 'berries', name: 'Seasonal Forest Glazed Berries', price: 14 },
  { id: 'truffles', name: 'Hand-Rolled Belgian Dark Truffles', price: 16 },
  { id: 'sprinkles', name: 'Custom Sparkling Sprinkles & Pearls', price: 6 },
];
