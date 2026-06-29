/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  ArrowUp,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Heart,
  Mail,
  CheckCircle2
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-chocolate text-cream relative pt-20 pb-10 overflow-hidden border-t-2 border-gold/10">
      
      {/* Absolute decorative backdrops */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-accent/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-cream/10">
          
          {/* Col 1: Brand Pitch & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40">
                <span className="font-serif text-lg font-bold text-gold">B</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-wide text-white">
                  Beejayz
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold-light font-sans">
                  Luxury Cake Bakery
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-cream/70 leading-relaxed">
              We slow-bake happiness for weddings, birthdays, and life’s most exquisite moments. Combining visual sugar-craft mastery with natural gourmet recipe bases.
            </p>

            {/* Social Media Links requested */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Instagram, href: 'https://instagram.com/beejayz', label: 'Instagram' },
                { icon: Facebook, href: 'https://facebook.com/beejayz', label: 'Facebook' },
                { icon: Twitter, href: 'https://twitter.com/beejayz', label: 'Twitter' },
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-gold/20 border border-white/10 hover:border-gold/40 text-cream/80 hover:text-gold-light transition-all duration-300"
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-2.5 space-y-6">
            <h4 className="font-serif text-sm font-bold text-gold-light uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 font-sans text-xs">
              {[
                { name: 'Home Studio', id: 'home' },
                { name: 'About Craft', id: 'about' },
                { name: 'Gourmet Cakes', id: 'cakes' },
                { name: 'Custom Builder', id: 'custom-orders' },
                { name: 'Visual Gallery', id: 'gallery' },
                { name: 'Testimonials', id: 'testimonials' },
              ].map((lnk) => (
                <li key={lnk.id}>
                  <button
                    onClick={() => onNavigate(lnk.id)}
                    className="text-cream/75 hover:text-gold-light transition-colors cursor-pointer block"
                  >
                    {lnk.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Cake Categories requested (2.5 cols) */}
          <div className="lg:col-span-2.5 space-y-6">
            <h4 className="font-serif text-sm font-bold text-gold-light uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-3 font-sans text-xs text-cream/75">
              {[
                { name: 'Birthday Cakes', id: 'birthday' },
                { name: 'Wedding Cakes', id: 'wedding' },
                { name: 'Custom Masterpieces', id: 'custom' },
                { name: 'Gourmet Cupcakes', id: 'cupcakes' },
                { name: 'Pastries & Tarts', id: 'pastries' },
                { name: 'Artisan Desserts', id: 'desserts' },
              ].map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('cakes')}
                    className="hover:text-gold-light transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription requested (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-serif text-sm font-bold text-gold-light uppercase tracking-wider">
              Baking Newsletter
            </h4>
            <p className="font-sans text-xs text-cream/70 leading-relaxed">
              Subscribe to unlock chef tips, exclusive seasonal flavor launches, and secret discount coupons.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="kate@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-cream font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none placeholder-cream/30"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-gold hover:bg-gold-light text-chocolate transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4.5 h-4.5" />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-gold/30 text-gold-light font-sans text-xs font-semibold"
                >
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                  <span>Subscribed! Check your inbox.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Bar (Contact details highlight and Copyright) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-cream/60">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2">
            <span>📞 +1 (555) 302-CAKE</span>
            <span>✉️ reservations@beejayzcakes.com</span>
            <span>📍 San Francisco, CA 94102</span>
          </div>

          <div className="flex items-center gap-1.5 font-sans">
            <span>&copy; {new Date().getFullYear()} Beejayz Bakery. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
            <span>for magical milestones. All rights reserved.</span>
          </div>
        </div>

      </div>

      {/* Floating Action Controls */}
      
      {/* 1. Floating WhatsApp Button requested */}
      <a
        href="https://wa.me/15550199?text=Hello%20Beejayz%20Bakery!%20🍰%20I'd%20like%20to%20chat%20about%20a%20custom%20cake%20reservation."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-green-500 text-white shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 animate-pulse group-hover:scale-105" />
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-chocolate text-cream text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none border border-gold/20">
          Chat on WhatsApp
        </span>
      </a>

      {/* 2. Sticky Scroll-to-Top Button requested */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleScrollToTop}
            className="fixed bottom-24 right-6 z-40 p-3.5 rounded-full bg-chocolate text-cream hover:bg-chocolate-light border border-white/10 hover:border-gold/30 hover:scale-110 transition-all shadow-xl cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-gold-light" />
          </motion.button>
        )}
      </AnimatePresence>

    </footer>
  );
}
