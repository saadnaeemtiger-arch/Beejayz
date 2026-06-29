/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface InquiryCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function InquiryCartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: InquiryCartDrawerProps) {
  
  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => {
      const price = item.type === 'custom' && item.customCake
        ? item.customCake.priceEstimate
        : item.product?.price || 0;
      return acc + (price * item.quantity);
    }, 0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-chocolate/40 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            {/* Slide-out drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-cream border-l border-blush shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-blush flex justify-between items-center bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-accent/20 text-chocolate flex items-center justify-center font-bold font-serif">
                    BJ
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-chocolate">My Inquiry Basket</h3>
                    <p className="font-sans text-[10px] text-chocolate-light font-medium uppercase tracking-wider">
                      Drafted celebration orders
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-cream border border-blush text-chocolate transition-colors cursor-pointer"
                  aria-label="Close basket"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length > 0 ? (
                  <div className="space-y-4">
                    {cart.map((item) => {
                      const isCustom = item.type === 'custom';
                      const name = isCustom && item.customCake
                        ? `Custom Designed Cake`
                        : item.product?.name || 'Signature Item';
                      const image = isCustom
                        ? 'https://images.unsplash.com/photo-1588195538326-c5b1e9f8011b?auto=format&fit=crop&q=80&w=200' // Custom cake icon placeholder
                        : item.product?.image || '';
                      const price = isCustom && item.customCake
                        ? item.customCake.priceEstimate
                        : item.product?.price || 0;

                      return (
                        <div
                          key={item.id}
                          className="bg-white p-4 rounded-2xl border border-blush/80 shadow-xs flex gap-4 items-start"
                        >
                          <img
                            src={image}
                            alt={name}
                            className="w-16 h-16 rounded-xl object-cover border border-blush/40 bg-cream-dark shrink-0"
                            referrerPolicy="no-referrer"
                          />

                          <div className="flex-1 min-w-0 space-y-1">
                            <h4 className="font-serif text-sm font-bold text-chocolate truncate">
                              {name}
                            </h4>

                            {isCustom && item.customCake ? (
                              <div className="font-sans text-[10px] text-chocolate-light leading-relaxed space-y-0.5">
                                <p className="font-semibold text-gold">Tiers: {item.customCake.tiers} Tier Cake</p>
                                <p>Flavor: {item.customCake.flavor}</p>
                                <p>Coat: {item.customCake.frosting}</p>
                                {item.customCake.inscription && <p className="italic">"{item.customCake.inscription}"</p>}
                              </div>
                            ) : (
                              <div className="font-sans text-[10px] text-chocolate-light leading-relaxed space-y-0.5">
                                <p>Flavor: {item.selectedFlavor}</p>
                                <p>Size: {item.selectedSize}</p>
                              </div>
                            )}

                            <div className="pt-2 flex items-center justify-between">
                              <span className="font-serif text-sm font-bold text-chocolate">
                                ${price}
                              </span>

                              {/* Quantity and Trash selectors */}
                              <div className="flex items-center gap-3">
                                <div className="flex items-center border border-blush/80 rounded-lg overflow-hidden bg-cream">
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                    className="px-2 py-1 text-xs text-chocolate hover:bg-blush/40 cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <span className="px-2 text-xs font-bold text-chocolate">{item.quantity}</span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 py-1 text-xs text-chocolate hover:bg-blush/40 cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>

                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="p-1.5 rounded-lg text-chocolate-light hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Empty state placeholder */
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-pink-accent/20 text-chocolate flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-gold" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-serif text-base font-bold text-chocolate">Inquiry Basket is Empty</p>
                      <p className="font-sans text-xs text-chocolate-light max-w-[240px] leading-relaxed">
                        Explore our Signature Cakes or construct a custom masterpiece to populate your inquiry request.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer summary */}
              <div className="p-6 border-t border-blush bg-white space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-xs text-chocolate-light uppercase tracking-wider font-semibold">
                    Estimated Subtotal:
                  </span>
                  <span className="font-serif text-2xl font-extrabold text-chocolate">
                    ${calculateSubtotal()}
                  </span>
                </div>

                <p className="font-sans text-[10px] text-chocolate-light leading-normal">
                  * Pricing is an estimate. Deliveries, intricate handcrafted decorations, or custom packaging may incur adjustments upon consultation.
                </p>

                <button
                  onClick={onCheckout}
                  disabled={cart.length === 0}
                  className="w-full py-4 bg-chocolate text-cream font-sans font-bold text-xs rounded-full shadow-md hover:bg-chocolate-light transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Proceed to Inquiry Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
