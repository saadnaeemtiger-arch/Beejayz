/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimonial } from '../types';
import { Star, MessageSquare, Quote, User, PlusCircle } from 'lucide-react';

interface TestimonialsProps {
  testimonials: Testimonial[];
  onAddTestimonial: (testimonial: Testimonial) => void;
}

export default function Testimonials({ testimonials, onAddTestimonial }: TestimonialsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Happy Customer');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [cakeType, setCakeType] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      alert('Please fill out your Name and Review Comment.');
      return;
    }

    const newTestimonial: Testimonial = {
      id: `live-${Date.now()}`,
      name,
      role,
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200', // Default clean avatar
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      cakeType: cakeType || 'Signature Cake',
    };

    onAddTestimonial(newTestimonial);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setName('');
      setComment('');
      setCakeType('');
      setRole('Happy Customer');
      setShowReviewForm(false);
    }, 2500);
  };

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-pink-accent/10 rounded-full filter blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold block">
              Voices of Delight
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-chocolate font-bold leading-tight">
              What Our Clients Say About <span className="italic font-normal">Beejayz Magic</span>
            </h2>
            <div className="w-12 h-0.5 bg-gold" />
          </div>

          <button
            onClick={() => setShowReviewForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-chocolate hover:bg-chocolate-light text-cream font-sans font-semibold text-xs rounded-full shadow-md transition-all self-start md:self-auto cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-gold" />
            Write a Review
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {testimonials.map((test, index) => (
              <motion.div
                key={test.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group bg-cream/40 p-8 rounded-3xl border border-blush hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between"
              >
                {/* Quotes symbol decoration */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-pink-accent/20 -z-0 pointer-events-none" />

                <div className="space-y-5 relative z-10">
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < test.rating ? 'fill-current text-gold' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="font-sans text-xs sm:text-sm text-chocolate-light leading-relaxed italic">
                    "{test.comment}"
                  </p>
                </div>

                {/* Customer Bio */}
                <div className="flex items-center gap-4 pt-6 border-t border-blush/40 mt-6 relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-blush/50 shrink-0 bg-cream-dark flex items-center justify-center">
                    {test.image.includes('placeholder') || !test.image ? (
                      <User className="w-6 h-6 text-chocolate-light" />
                    ) : (
                      <img
                        src={test.image}
                        alt={test.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-sm font-bold text-chocolate">{test.name}</h4>
                    <p className="font-sans text-[10px] text-chocolate-light/80 font-medium">
                      {test.role} {test.cakeType && <span className="text-gold">({test.cakeType})</span>}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Write a Review Modal */}
        <AnimatePresence>
          {showReviewForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowReviewForm(false)}
                className="absolute inset-0 bg-chocolate/40 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-cream p-6 sm:p-8 rounded-3xl shadow-2xl border border-blush z-10"
              >
                <div className="text-center space-y-2 mb-6">
                  <h3 className="font-serif text-xl font-bold text-chocolate">Share Your Sweet Experience</h3>
                  <p className="font-sans text-xs text-chocolate-light">We cherish your honest thoughts and support!</p>
                </div>

                {formSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full text-green-500 flex items-center justify-center mx-auto shadow-inner border border-green-200">
                      <Star className="w-8 h-8 fill-current" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-chocolate">Review Submitted!</h4>
                    <p className="font-sans text-xs text-chocolate-light">Thank you, your beautiful testimonial has been added live.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold font-sans uppercase text-chocolate">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold font-sans uppercase text-chocolate">Your Role</label>
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="e.g. Birthday Host"
                          className="w-full px-3 py-2.5 rounded-xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold font-sans uppercase text-chocolate">Cake Purchased</label>
                        <input
                          type="text"
                          value={cakeType}
                          onChange={(e) => setCakeType(e.target.value)}
                          placeholder="e.g. Velvet Vanilla"
                          className="w-full px-3 py-2.5 rounded-xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold font-sans uppercase text-chocolate">Star Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-6 h-6 ${star <= rating ? 'fill-gold text-gold' : 'text-slate-300'}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold font-sans uppercase text-chocolate">Your Review</label>
                      <textarea
                        required
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Describe the texture, flavor, look, and your overall interaction with the Beejayz team..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-chocolate text-cream font-sans font-bold text-xs rounded-xl hover:bg-chocolate-light transition-all shadow-md mt-2 cursor-pointer"
                    >
                      Publish Testimonial Live
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
