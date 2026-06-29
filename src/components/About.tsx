/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, Sparkles, Star } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Heart,
      title: 'Crafted with Love',
      description: 'Every recipe is slow-baked with extreme devotion, focusing on rich texture and absolute moisture.',
    },
    {
      icon: ShieldCheck,
      title: '100% Organic & Raw',
      description: 'Madagascan vanilla beans, premium Belgian cocoa, organic eggs, and zero artificial preservatives.',
    },
    {
      icon: Sparkles,
      title: 'Sugar Craft Artistry',
      description: 'Our hand-sculpted sugar florals, wafer paper designs, and custom modeling are unmatched in detail.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Editorial Image Block */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Decorative gold mesh box in background */}
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-gold-light/40 rounded-3xl -z-10" />

              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=800"
                  alt="Pastry chef decorating a luxury white tiered wedding cake"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Floating Experience Card */}
                <div className="absolute top-6 right-6 bg-chocolate text-cream p-5 rounded-2xl shadow-2xl max-w-[200px] border border-chocolate-light">
                  <div className="flex items-center gap-1 text-gold mb-1">
                    <Star className="w-4.5 h-4.5 fill-current" />
                    <Star className="w-4.5 h-4.5 fill-current" />
                    <Star className="w-4.5 h-4.5 fill-current" />
                    <Star className="w-4.5 h-4.5 fill-current" />
                    <Star className="w-4.5 h-4.5 fill-current" />
                  </div>
                  <p className="font-serif text-lg font-bold">10+ Years</p>
                  <p className="font-sans text-xs text-cream/80">Of designing luxury edible masterpieces.</p>
                </div>
              </div>

              {/* Secondary floating image detail (Baker whisking or ingredient bowl) */}
              <div className="absolute -bottom-10 -right-8 w-44 h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=300"
                  alt="Raw organic baking ingredients"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold block">
                The Story of Beejayz
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-chocolate font-bold leading-tight">
                Where High-End Artistry Meets <br />
                <span className="italic font-normal">Heavenly Gourmet Flavors</span>
              </h2>
              <div className="w-20 h-1 bg-gold rounded-full" />
            </div>

            <p className="font-sans text-base text-chocolate-light leading-relaxed">
              Founded on the belief that a cake is not just a dessert, but the crowning masterpiece of life’s most beautiful milestones. At Beejayz, we blend luxurious European baking techniques with contemporary sugar artistry to produce statement cakes that taste as breath-taking as they look.
            </p>
            
            <p className="font-sans text-base text-chocolate-light leading-relaxed">
              Every creation is individually designed, hand-baked daily, and tailored to match the unique aesthetic of your celebration. From delicate birthday cupcakes to magnificent grand-tiered wedding towers, we pledge premium quality, artistic excellence, and unmatched customer care.
            </p>

            {/* Structured highlight bullet grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {highlights.map((hl, index) => {
                const Icon = hl.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="p-3 bg-pink-accent/20 rounded-xl text-chocolate shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-sm font-bold text-chocolate">{hl.title}</h4>
                      <p className="font-sans text-xs text-chocolate-light leading-relaxed">{hl.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
