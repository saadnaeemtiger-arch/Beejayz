/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data';
import { ZoomIn, X } from 'lucide-react';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  const filters = [
    { label: 'All Creations', id: 'all' },
    { label: 'Wedding Cakes', id: 'wedding' },
    { label: 'Birthday Cakes', id: 'birthday' },
    { label: 'Custom Artwork', id: 'custom' },
    { label: 'Cupcakes & Pastries', id: 'cupcakes-pastries' },
    { label: 'Tables & Boutique', id: 'tables-boutique' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'wedding') return item.category === 'wedding';
    if (activeFilter === 'birthday') return item.category === 'birthday';
    if (activeFilter === 'custom') return item.category === 'custom';
    if (activeFilter === 'cupcakes-pastries') {
      return item.category === 'cupcakes' || item.category === 'pastries';
    }
    if (activeFilter === 'tables-boutique') {
      return item.category === 'dessert-table' || item.category === 'bakery-interiors';
    }
    return true;
  });

  return (
    <section id="gallery" className="py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold block">
            Visual Inspiration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-chocolate font-bold leading-tight">
            Our Celebration <span className="italic font-normal">Gallery</span>
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
          <p className="font-sans text-sm text-chocolate-light leading-relaxed">
            A curated portfolio of actual wedding cakes, celebratory desserts, and artisan pastries handcrafted in our bakery. Tap any image for a detailed close-up look.
          </p>
        </div>

        {/* Filter Navigation buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-chocolate text-cream shadow-md'
                  : 'bg-white text-chocolate/80 hover:bg-blush/40 border border-blush'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                onClick={() => setLightboxImage({ src: item.image, title: item.title })}
                className="group relative aspect-square rounded-3xl overflow-hidden shadow-md bg-cream-dark cursor-pointer border border-blush"
              >
                {/* Visual Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Hover Overlay with text & glassmorphism details */}
                <div className="absolute inset-0 bg-chocolate/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all duration-500">
                    <ZoomIn className="w-5 h-5" />
                  </div>

                  {/* Ornamental gold border frame */}
                  <div className="absolute inset-4 border border-gold/0 rounded-2xl group-hover:border-gold/30 pointer-events-none transition-all duration-500" />

                  <div className="relative z-20 space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-bold">
                      {item.category.replace('-', ' ')}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-cream">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxImage(null)}
                className="absolute inset-0 bg-chocolate/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl bg-cream border border-blush/20 z-10 flex flex-col"
              >
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white text-chocolate shadow-lg hover:scale-110 transition-all cursor-pointer z-20"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                  referrerPolicy="no-referrer"
                />

                <div className="bg-cream p-6 border-t border-blush text-center space-y-1">
                  <h3 className="font-serif text-lg font-bold text-chocolate">
                    {lightboxImage.title}
                  </h3>
                  <p className="font-sans text-xs text-chocolate-light font-medium">
                    Handcrafted Fresh Daily by Beejayz Bakery
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
