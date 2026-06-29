/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Categories from './components/Categories';
import SignatureCakes from './components/SignatureCakes';
import CustomCakeDesigner from './components/CustomCakeDesigner';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import InquiryCartDrawer from './components/InquiryCartDrawer';
import Footer from './components/Footer';

import { TESTIMONIALS } from './data';
import { CartItem, Product, CustomCake, Testimonial } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

  // Load drafted items from localStorage on startup for client durability
  useEffect(() => {
    const savedCart = localStorage.getItem('beejayz_cart');
    const savedTestimonials = localStorage.getItem('beejayz_testimonials');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart');
      }
    }
    if (savedTestimonials) {
      try {
        setTestimonials(JSON.parse(savedTestimonials));
      } catch (e) {
        console.error('Failed to parse saved testimonials');
      }
    }
  }, []);

  // Save cart modifications
  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('beejayz_cart', JSON.stringify(newCart));
  };

  // Section viewer tracker for header sticky highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'cakes', 'custom-orders', 'gallery', 'testimonials', 'faq', 'contact'];
      const scrollPos = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle adding signature cakes
  const handleAddProductToCart = (
    product: Product,
    selectedFlavor: string,
    selectedSize: string,
    customInscription: string
  ) => {
    const compositeId = `${product.id}-${selectedFlavor}-${selectedSize}-${customInscription}`;
    const existingIndex = cart.findIndex((item) => item.id === compositeId);

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      saveCartToStorage(updatedCart);
    } else {
      const newItem: CartItem = {
        id: compositeId,
        type: 'signature',
        product,
        quantity: 1,
        selectedFlavor,
        selectedSize,
      };
      saveCartToStorage([...cart, newItem]);
    }
  };

  // Handle adding custom designer cakes
  const handleAddCustomCakeToCart = (customCake: CustomCake) => {
    const uniqueId = `custom-${Date.now()}`;
    const newItem: CartItem = {
      id: uniqueId,
      type: 'custom',
      customCake,
      quantity: 1,
    };
    saveCartToStorage([...cart, newItem]);
    // Automatically open the drawer for delightful interaction feedback
    setIsCartOpen(true);
  };

  // Handle quantity alterations
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    saveCartToStorage(updatedCart);
  };

  // Remove individual items
  const handleRemoveItem = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCartToStorage(updatedCart);
  };

  // Reset entire basket
  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  // Live user reviews addition handler
  const handleAddTestimonial = (newTestimonial: Testimonial) => {
    const updatedList = [newTestimonial, ...testimonials];
    setTestimonials(updatedList);
    localStorage.setItem('beejayz_testimonials', JSON.stringify(updatedList));
  };

  // Handle clicking "View Collection" on category cards
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    handleNavigate('cakes');
  };

  // Direct smooth navigation coordinator
  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  // Handle cart checkout action
  const handleCheckoutAction = () => {
    setIsCartOpen(false);
    // Smooth scroll straight to contact checkout form
    handleNavigate('contact');
  };

  return (
    <div className="bg-cream min-h-screen text-chocolate font-sans selection:bg-pink-accent selection:text-chocolate">
      {/* Dynamic Header sticky menu */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Sections Stack */}
      <main>
        {/* Hero Banner section */}
        <Hero onNavigate={handleNavigate} />

        {/* Brand Narrative section */}
        <About />

        {/* Category Collections section */}
        <Categories onSelectCategory={handleSelectCategory} />

        {/* Signature Products showcase */}
        <SignatureCakes
          onAddProductToCart={handleAddProductToCart}
          selectedCategory={selectedCategory}
        />

        {/* Custom interactive builder tool */}
        <CustomCakeDesigner onAddCustomCakeToCart={handleAddCustomCakeToCart} />

        {/* Core Brand value highlights */}
        <WhyChooseUs />

        {/* Photographic Grid Gallery */}
        <Gallery />

        {/* Customer reviews block */}
        <Testimonials
          testimonials={testimonials}
          onAddTestimonial={handleAddTestimonial}
        />

        {/* Frequently Asked Accordions */}
        <FAQ />

        {/* Interactive inquiry checkout form & maps */}
        <Contact cart={cart} onClearCart={handleClearCart} />
      </main>

      {/* Persistent Footer and CTA floating controls */}
      <Footer onNavigate={handleNavigate} />

      {/* Sliding inquiry basket drawer */}
      <InquiryCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutAction}
      />
    </div>
  );
}
