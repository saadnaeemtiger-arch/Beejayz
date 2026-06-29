/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative floral backgrounds */}
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-pink-accent/10 rounded-full filter blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold block">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-chocolate font-bold leading-tight">
            Frequently Asked <span className="italic font-normal">Inquiries</span>
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
          <p className="font-sans text-sm text-chocolate-light leading-relaxed">
            Everything you need to know about placing custom orders, dietary requirements, secure transactions, and climate-controlled deliveries.
          </p>
        </div>

        {/* FAQ Accordions Stack */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs ${
                  isOpen ? 'border-pink-accent-dark shadow-md' : 'border-blush hover:border-pink-accent/60'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isOpen ? 'text-gold' : 'text-chocolate-light'}`} />
                    <span className="font-serif text-sm sm:text-base font-bold text-chocolate leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-full bg-cream transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-chocolate text-cream' : 'text-chocolate'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-blush/40 font-sans text-xs sm:text-sm text-chocolate-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
