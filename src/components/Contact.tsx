/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShoppingCart, Printer } from 'lucide-react';
import { CartItem } from '../types';

interface ContactProps {
  cart: CartItem[];
  onClearCart: () => void;
}

export default function Contact({ cart, onClearCart }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [includeInquiry, setIncludeInquiry] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptInquiry, setReceiptInquiry] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    message: string;
    items: CartItem[];
  } | null>(null);

  const cartTotal = cart.reduce((acc, item) => {
    const itemPrice = item.type === 'custom' && item.customCake
      ? item.customCake.priceEstimate
      : item.product?.price || 0;
    return acc + (itemPrice * item.quantity);
  }, 0);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please fill out your Name, Email, and Phone number.');
      return;
    }

    setIsSubmitting(true);

    // Simulate network api post request
    setTimeout(() => {
      const generatedInquiryId = `BJ-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceiptInquiry({
        id: generatedInquiryId,
        name,
        email,
        phone,
        date: date || new Date().toISOString().split('T')[0],
        message,
        items: includeInquiry ? [...cart] : [],
      });
      setIsSubmitting(false);

      // Clear the form
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setMessage('');
      
      // Clear global cart state upon successful inquiry checkout submission
      if (includeInquiry) {
        onClearCart();
      }
    }, 1500);
  };

  // Helper to generate custom WhatsApp link filled with order/inquiry parameters
  const getWhatsAppLink = () => {
    if (!receiptInquiry) return '#';
    let text = `Hello Beejayz Bakery! 🍰 I'd like to place an order/inquiry (ID: ${receiptInquiry.id}).\n\n`;
    text += `*Customer Details*:\n`;
    text += `- Name: ${receiptInquiry.name}\n`;
    text += `- Phone: ${receiptInquiry.phone}\n`;
    text += `- Celebration Date: ${receiptInquiry.date}\n`;
    if (receiptInquiry.message) text += `- Notes: ${receiptInquiry.message}\n`;

    if (receiptInquiry.items.length > 0) {
      text += `\n*Inquiry Items*:\n`;
      receiptInquiry.items.forEach((item, index) => {
        if (item.type === 'custom' && item.customCake) {
          text += `${index + 1}. [Custom Cake] ${item.customCake.tiers} Tier, ${item.customCake.theme} theme, ${item.customCake.flavor} flavor with ${item.customCake.frosting} frosting. Inscription: "${item.customCake.inscription || 'None'}"\n`;
        } else if (item.product) {
          text += `${index + 1}. [Signature] ${item.product.name} (Flavor: ${item.selectedFlavor}, Size: ${item.selectedSize})\n`;
        }
      });
      text += `\n*Estimated Total*: $${cartTotal || 0}`;
    }

    return `https://wa.me/15550199?text=${encodeURIComponent(text)}`;
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold block">
            Reserve Your Date
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-chocolate font-bold leading-tight">
            Connect & Place <span className="italic font-normal">Online Inquiries</span>
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
          <p className="font-sans text-sm text-chocolate-light leading-relaxed">
            Have a custom sketch ready or want to enquire about dietary ingredients? Fill out our form below, and our wedding planners and decorators will reach out to solidify your dream.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT COLUMN: Contact Cards & Styled Map Grid (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-chocolate">
                Beejayz Boutique HQ
              </h3>
              <p className="font-sans text-xs sm:text-sm text-chocolate-light leading-relaxed">
                Step inside our signature pink studio for a private cake consultation, taste testing, and color-matching session.
              </p>

              {/* Direct Info list */}
              <div className="space-y-4 pt-2">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-pink-accent/20 rounded-xl text-chocolate shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-chocolate">Bakery Address</h4>
                    <p className="font-sans text-xs text-chocolate-light mt-0.5">
                      842 Patisserie Boulevard, Sweet Suite A, San Francisco, CA 94102
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-pink-accent/20 rounded-xl text-chocolate shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-chocolate">Phone & Hotline</h4>
                    <p className="font-sans text-xs text-chocolate-light mt-0.5 hover:text-gold transition-colors">
                      +1 (555) 302-CAKE (2253)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-pink-accent/20 rounded-xl text-chocolate shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-chocolate">Email Inquiries</h4>
                    <p className="font-sans text-xs text-chocolate-light mt-0.5 hover:text-gold transition-colors">
                      reservations@beejayzcakes.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-pink-accent/20 rounded-xl text-chocolate shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-chocolate">Boutique Hours</h4>
                    <p className="font-sans text-xs text-chocolate-light mt-0.5">
                      Mon - Sat: 9:00 AM - 6:30 PM <br />
                      Sunday: 10:00 AM - 4:00 PM (Pickups Only)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Styled Interactive-looking Vector Map Placeholder */}
            <div className="rounded-3xl overflow-hidden border border-blush shadow-md relative h-56 bg-gradient-to-br from-[#FDFBF7] to-[#FAF0EE] flex items-center justify-center p-4">
              {/* Abstract grids resembling streets */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gold/10" />
              <div className="absolute top-2/3 left-0 w-full h-[3px] bg-gold/15" />
              <div className="absolute left-1/3 top-0 w-[2px] h-full bg-gold/10" />
              <div className="absolute left-2/3 top-0 w-[3px] h-full bg-gold/15" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-gold/10 bg-pink-accent/5" />

              {/* Central Map Pin representation */}
              <div className="relative flex flex-col items-center z-10 space-y-1 bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-xl border border-gold/20">
                <div className="w-8 h-8 rounded-full bg-chocolate flex items-center justify-center text-gold border border-gold animate-bounce">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div className="text-center">
                  <p className="font-serif text-[11px] font-bold text-chocolate">Beejayz Cakes</p>
                  <p className="font-sans text-[8px] text-chocolate-light uppercase tracking-wider font-semibold">Click to Open Maps</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact / Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-cream/40 border border-blush p-8 rounded-3xl shadow-lg flex flex-col justify-between">
            
            <AnimatePresence mode="wait">
              {!receiptInquiry ? (
                /* Primary Inquiry Form screen */
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-chocolate">
                      Submit Your Inquiry Blueprint
                    </h3>
                    <p className="font-sans text-xs text-chocolate-light">
                      Please enter your contact parameters. Let us know if you want us to attach any cakes currently drafted in your cart!
                    </p>
                  </div>

                  <form onSubmit={handleSubmitInquiry} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold font-sans uppercase text-chocolate">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Katherine Hepburn"
                          className="w-full px-3.5 py-3 rounded-xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold font-sans uppercase text-chocolate">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. kate@example.com"
                          className="w-full px-3.5 py-3 rounded-xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold font-sans uppercase text-chocolate">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +1 (555) 0199"
                          className="w-full px-3.5 py-3 rounded-xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold font-sans uppercase text-chocolate">Celebration Date</label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Inquiry Attachment toggle if cart contains draft items */}
                    {cart.length > 0 && (
                      <div className="p-4 bg-white rounded-2xl border border-blush flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="w-5 h-5 text-gold" />
                          <div>
                            <p className="font-serif text-xs font-bold text-chocolate">
                              Attach {cart.reduce((acc, i) => acc + i.quantity, 0)} Cart Items?
                            </p>
                            <p className="font-sans text-[10px] text-chocolate-light">
                              Includes signature designs and custom blueprints (Total: ${cartTotal})
                            </p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={includeInquiry}
                          onChange={(e) => setIncludeInquiry(e.target.checked)}
                          className="w-5 h-5 accent-gold border-blush rounded"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold font-sans uppercase text-chocolate">Inquiry Details & Decorator Notes</label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Detail any flavor adjustments, size custom requirements, venue setup plans, or dietary constraints here..."
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none placeholder-chocolate-light/30 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-chocolate text-cream font-sans font-bold text-xs rounded-xl hover:bg-chocolate-light transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                          <span>Processing Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Cake Inquiry Reservation</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                /* Success Receipt Screen layout */
                <motion.div
                  key="receipt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full border border-green-200 text-green-500 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] tracking-widest font-sans font-bold uppercase text-gold">Inquiry Registered</span>
                    <h3 className="font-serif text-2xl font-bold text-chocolate">Inquiry Confirmed!</h3>
                    <p className="font-sans text-xs text-chocolate-light">
                      Thank you, <span className="font-bold text-chocolate">{receiptInquiry.name}</span>. Your ticket number is <span className="font-bold text-chocolate font-mono bg-cream px-2 py-0.5 rounded border border-blush">{receiptInquiry.id}</span>.
                    </p>
                  </div>

                  {/* Summary Box resembling a receipt invoice */}
                  <div className="bg-white rounded-3xl border border-blush p-6 text-left space-y-4 shadow-sm max-h-56 overflow-y-auto">
                    <div className="flex justify-between font-serif text-xs font-bold text-chocolate border-b border-blush pb-2">
                      <span>Item Details</span>
                      <span>Total Estimate</span>
                    </div>

                    {receiptInquiry.items.length > 0 ? (
                      <div className="space-y-3">
                        {receiptInquiry.items.map((item, idx) => {
                          const name = item.type === 'custom' && item.customCake
                            ? `Custom Cake (${item.customCake.tiers} Tier)`
                            : item.product?.name || 'Signature Item';
                          const price = item.type === 'custom' && item.customCake
                            ? item.customCake.priceEstimate
                            : item.product?.price || 0;
                          return (
                            <div key={idx} className="flex justify-between text-xs font-sans text-chocolate-light">
                              <div>
                                <span className="font-bold">{item.quantity}x</span> {name}
                                {item.type === 'custom' && item.customCake && (
                                  <span className="block text-[10px] text-chocolate-light/70">Flavor: {item.customCake.flavor}</span>
                                )}
                              </div>
                              <span className="font-mono">${price * item.quantity}</span>
                            </div>
                          );
                        })}
                        <div className="flex justify-between font-serif text-sm font-bold text-chocolate pt-2 border-t border-dashed border-blush/80">
                          <span>Est. Total</span>
                          <span>${cartTotal}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs font-sans text-chocolate-light italic text-center py-4">
                        Standard question/consultation request (no cart items attached).
                      </p>
                    )}
                  </div>

                  {/* Receipt Actions buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handlePrintReceipt}
                      className="flex-1 py-3 bg-white hover:bg-blush/20 text-chocolate border border-blush font-sans font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-chocolate-light" />
                      Print Receipt
                    </button>

                    {/* Highly requested WhatsApp integration trigger */}
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-sans font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Share to WhatsApp
                    </a>
                  </div>

                  <button
                    onClick={() => setReceiptInquiry(null)}
                    className="text-xs text-chocolate-light/80 hover:text-chocolate font-sans underline cursor-pointer"
                  >
                    Submit another inquiry or question
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}
