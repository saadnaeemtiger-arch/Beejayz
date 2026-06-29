/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data';
import { ChevronRight } from 'lucide-react';

interface CategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-pink-accent/10 rounded-full filter blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold block">
            Indulge Your Senses
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-chocolate font-bold leading-tight">
            Explore Our Sweet <span className="italic font-normal">Masterpieces</span>
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
          <p className="font-sans text-sm text-chocolate-light leading-relaxed">
            From regal multi-tier wedding cakes to dainty afternoon tea pastries, every single item in our categories is crafted with premium ingredients and unmatched aesthetic care.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative h-[360px] rounded-3xl overflow-hidden shadow-md bg-white border border-blush hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-end p-6 cursor-pointer"
              onClick={() => onSelectCategory(category.id)}
            >
              {/* Background Zoom Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {/* Elegant overlay gradient: darker at bottom for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate via-chocolate/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:via-chocolate/50" />
              </div>

              {/* Luxury Frame Border showing on hover */}
              <div className="absolute inset-4 border border-gold/0 rounded-[18px] z-10 transition-all duration-300 group-hover:border-gold/30 pointer-events-none" />

              {/* Text content inside the card */}
              <div className="relative z-20 space-y-3">
                <h3 className="font-serif text-xl font-bold text-cream group-hover:text-gold-light transition-colors duration-300">
                  {category.name}
                </h3>
                
                <p className="font-sans text-xs text-cream/85 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {category.description}
                </p>

                <div className="pt-2 flex items-center gap-1 text-gold-light font-sans text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                  <span>View Collection</span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
