/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { WHY_CHOOSE_US } from '../data';
import {
  Sparkles,
  Heart,
  Palette,
  Award,
  Coins,
  Truck,
  Gift,
  Smile,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Sparkles: Sparkles,
  Heart: Heart,
  Palette: Palette,
  Award: Award,
  Coins: Coins,
  Truck: Truck,
  Gift: Gift,
  Smile: Smile,
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-accent/10 rounded-full filter blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold block">
            Craftsmanship & Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-chocolate font-bold leading-tight">
            Why Choose <span className="italic font-normal">Beejayz Bakery</span>?
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
          <p className="font-sans text-sm text-chocolate-light leading-relaxed">
            We are dedicated to exceeding your absolute dreams, prioritizing taste satisfaction and premium presentation on every single baked order.
          </p>
        </div>

        {/* Bento/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group bg-cream p-8 rounded-3xl border border-blush hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start space-y-4"
              >
                {/* Custom Icon circle */}
                <div className="w-12 h-12 rounded-2xl bg-white border border-blush flex items-center justify-center text-chocolate group-hover:bg-chocolate group-hover:text-gold-light group-hover:border-chocolate transition-all duration-500 shadow-xs shrink-0">
                  <IconComponent className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-base font-bold text-chocolate group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-chocolate-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
