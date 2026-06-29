/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ cart, onOpenCart, activeSection, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Cakes', id: 'cakes' },
    { label: 'Custom Orders', id: 'custom-orders' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleItemClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/90 backdrop-blur-md shadow-md py-3 border-b border-blush/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <div
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-pink-accent/20 flex items-center justify-center border border-pink-accent/40 group-hover:bg-pink-accent/30 transition-all duration-300">
              <span className="font-serif text-xl font-bold text-chocolate">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wide text-chocolate group-hover:text-gold transition-colors duration-300">
                Beejayz
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-chocolate-light font-sans font-medium -mt-1">
                Luxury Cake Bakery
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`relative font-sans text-sm font-medium tracking-wide transition-colors duration-300 py-1 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-gold font-semibold'
                    : 'text-chocolate/80 hover:text-gold'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Header Action Elements */}
          <div className="flex items-center gap-4">
            {/* Inquiry Cart Icon Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-white border border-blush shadow-sm hover:border-pink-accent text-chocolate transition-all duration-300 hover:shadow-md cursor-pointer group"
              aria-label="View Inquiry Cart"
            >
              <ShoppingBag className="w-5 h-5 text-chocolate group-hover:scale-110 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] rounded-full bg-pink-accent text-chocolate font-sans text-[11px] font-bold flex items-center justify-center px-1 border border-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-chocolate hover:bg-pink-accent/10 transition-all cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-cream border-t border-blush/40 overflow-hidden shadow-inner"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-sans text-base font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-pink-accent/20 text-gold font-semibold border-l-4 border-gold pl-3'
                      : 'text-chocolate hover:bg-blush/40 pl-4'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-blush/40">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-chocolate text-cream font-sans font-medium rounded-xl hover:bg-chocolate-light shadow-md transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  View Inquiry ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
