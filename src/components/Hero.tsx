/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ChevronRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-cream pt-20 overflow-hidden"
    >
      {/* Decorative luxury backdrops */}
      <div className="absolute top-0 right-0 w-[45vw] h-[95vh] bg-gradient-to-l from-blush to-transparent rounded-bl-[200px] -z-10 opacity-70" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-pink-accent/10 rounded-full filter blur-[150px] -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gold-light/10 rounded-full filter blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-accent/20 border border-pink-accent/40 text-chocolate-light font-sans text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
              Award-Winning Artisanal Cakes
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl text-chocolate leading-tight font-extrabold"
              >
                Freshly Baked <br />
                <span className="text-gold italic font-normal">Happiness</span> for Every Celebration
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-sans text-base sm:text-lg text-chocolate-light leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Custom cakes, delicious desserts, and handcrafted treats made with love for birthdays, weddings, and every special occasion. Crafted with organic premium ingredients.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
            >
              <button
                onClick={() => onNavigate('custom-orders')}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-chocolate text-cream font-sans font-semibold text-base rounded-full shadow-lg hover:bg-chocolate-light transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                Order Now
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('cakes')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-blush/30 text-chocolate border-2 border-blush font-sans font-semibold text-base rounded-full shadow-sm hover:border-pink-accent transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                View Cakes
              </button>
            </motion.div>

            {/* Micro Badges / Trust Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-blush/60 max-w-md mx-auto lg:mx-0"
            >
              <div>
                <span className="block font-serif text-2xl font-bold text-chocolate">100%</span>
                <span className="text-xs text-chocolate-light font-sans tracking-wide">Fresh & Organic</span>
              </div>
              <div className="h-8 w-px bg-blush/60" />
              <div>
                <span className="block font-serif text-2xl font-bold text-chocolate">1.2k+</span>
                <span className="text-xs text-chocolate-light font-sans tracking-wide">Happy Clients</span>
              </div>
              <div className="h-8 w-px bg-blush/60" />
              <div>
                <span className="block font-serif text-2xl font-bold text-chocolate">Award</span>
                <span className="text-xs text-chocolate-light font-sans tracking-wide">Elite Pastry Baker</span>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full max-w-lg md:max-w-xl mx-auto h-[480px] sm:h-[550px]">
              
              {/* Back card decorative ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full border-2 border-dashed border-gold/30 animate-[spin_120s_linear_infinite]" />

              {/* Main Image 1 (Pink Rose Gold Luxury Cake) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-8 left-6 w-[65%] h-[70%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10 hover:z-30 transition-all duration-500 hover:scale-105"
              >
                <img
                  src="https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&q=80&w=600"
                  alt="Elegant gold leaf drip cake"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-md border border-blush/20">
                  <p className="font-serif text-xs font-bold text-chocolate">Rose Gold Luxury</p>
                  <p className="font-sans text-[10px] text-gold font-medium">Bestseller</p>
                </div>
              </motion.div>

              {/* Secondary Image 2 (Wedding white floral) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 6 }}
                animate={{ opacity: 1, scale: 1, rotate: 6 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-6 right-6 w-[55%] h-[60%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20 hover:z-30 transition-all duration-500 hover:scale-105"
              >
                <img
                  src="https://images.unsplash.com/photo-1527488258414-f44ab8b82ff6?auto=format&fit=crop&q=80&w=600"
                  alt="Premium wedding multi tier cake"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl shadow-md border border-blush/20">
                  <p className="font-serif text-[11px] font-bold text-chocolate">Elysian Tiered</p>
                  <p className="font-sans text-[9px] text-pink-accent-dark font-semibold uppercase">Wedding Collection</p>
                </div>
              </motion.div>

              {/* Tiny floating macaron badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.6 }}
                className="absolute -top-4 right-16 bg-cream border-2 border-gold text-chocolate px-4 py-3 rounded-2xl shadow-xl z-20 flex items-center gap-2 rotate-12"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-sans text-xs font-bold uppercase tracking-wider">Accepting Orders</span>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
