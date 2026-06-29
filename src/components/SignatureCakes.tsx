/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SIGNATURE_CAKES } from '../data';
import { Product, CartItem } from '../types';
import { Star, ShoppingBag, X, Check, Heart } from 'lucide-react';

interface SignatureCakesProps {
  onAddProductToCart: (product: Product, flavor: string, size: string, inscription: string) => void;
  selectedCategory: string;
}

export default function SignatureCakes({ onAddProductToCart, selectedCategory }: SignatureCakesProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('Standard (As Described)');
  const [customInscription, setCustomInscription] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter products based on category selection
  const filteredCakes = selectedCategory === 'all'
    ? SIGNATURE_CAKES
    : SIGNATURE_CAKES.filter(cake => cake.category === selectedCategory);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedFlavor(product.flavors[0] || 'Original');
    setSelectedSize('Standard (As Described)');
    setCustomInscription('');
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    onAddProductToCart(selectedProduct, selectedFlavor, selectedSize, customInscription);
    
    // Trigger success feedback
    setToastMessage(`Added "${selectedProduct.name}" to your Inquiry Cart!`);
    handleCloseModal();
    
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Pricing helper based on selected size
  const getAdjustedPrice = (basePrice: number = 0) => {
    if (selectedSize === 'Miniature (6-8 Servings)') return Math.round(basePrice * 0.7);
    if (selectedSize === 'Grand Celebration (24-30 Servings)') return Math.round(basePrice * 1.8);
    return basePrice;
  };

  return (
    <section id="cakes" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold block">
            Signature Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-chocolate font-bold leading-tight">
            Our Most Popular <span className="italic font-normal">Gourmet Creations</span>
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
          <p className="font-sans text-sm text-chocolate-light leading-relaxed">
            Baked to perfection with time-honored secret recipes and decorated by hand with artisan flair. Click any cake to customize your size and add to your inquiry package.
          </p>
        </div>

        {/* Filter Indicator */}
        {selectedCategory !== 'all' && (
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink-accent/20 border border-pink-accent/40 rounded-full text-chocolate font-sans text-xs font-semibold">
              Filtered by Category: <span className="capitalize font-bold text-gold">{selectedCategory}</span>
            </span>
          </div>
        )}

        {/* Cakes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCakes.map((cake) => (
            <motion.div
              key={cake.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="group bg-cream/30 border border-blush rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* Product Image Panel */}
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Popular Badge */}
                {cake.popular && (
                  <span className="absolute top-4 left-4 bg-chocolate text-gold font-sans text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gold/20 shadow-sm">
                    Popular Pick
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => toggleFavorite(cake.id, e)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-blush text-chocolate hover:text-red-500 hover:scale-110 transition-all shadow-sm cursor-pointer"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`w-4.5 h-4.5 ${isFavorite[cake.id] ? 'fill-red-500 text-red-500' : 'text-chocolate'}`}
                  />
                </button>

                {/* Quick info bar on hover */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-chocolate/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-center">
                  <span className="text-xs text-cream/90 font-sans">{cake.servings}</span>
                  <div className="flex items-center gap-1 text-gold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-bold text-cream">{cake.rating}</span>
                  </div>
                </div>
              </div>

              {/* Product Details Block */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="space-y-2 flex-grow">
                  <h3 className="font-serif text-lg font-bold text-chocolate group-hover:text-gold transition-colors duration-300">
                    {cake.name}
                  </h3>
                  <p className="font-sans text-xs text-chocolate-light leading-relaxed line-clamp-2">
                    {cake.description}
                  </p>
                </div>

                {/* Bottom interactive row */}
                <div className="flex items-center justify-between pt-4 border-t border-blush/40">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-chocolate-light uppercase tracking-wider font-sans">
                      Starting Price
                    </span>
                    <span className="font-serif text-lg font-bold text-chocolate">
                      ${cake.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenModal(cake)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-chocolate text-cream font-sans font-semibold text-xs rounded-full shadow-sm hover:bg-chocolate-light transition-all duration-300 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Customize & Order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCakes.length === 0 && (
          <div className="text-center py-12 bg-cream/30 border border-dashed border-blush rounded-3xl">
            <p className="font-serif text-lg text-chocolate">No products found in this category.</p>
            <p className="font-sans text-xs text-chocolate-light mt-1">Please explore our other delicious selections.</p>
          </div>
        )}
      </div>

      {/* Quick View Customization Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-chocolate/40 backdrop-blur-xs"
            />

            {/* Modal Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-cream rounded-3xl overflow-hidden shadow-2xl border border-blush z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto"
            >
              {/* Left Column: Image & Servings */}
              <div className="md:w-1/2 relative bg-cream-dark aspect-square md:aspect-auto">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-chocolate/85 backdrop-blur-sm text-cream px-3 py-1.5 rounded-xl border border-gold/20 shadow-sm flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-gold fill-current" />
                  <span className="font-sans text-xs font-bold">{selectedProduct.rating} Rating</span>
                </div>
              </div>

              {/* Right Column: Customizer options */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col space-y-6 overflow-y-auto">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-chocolate shadow-md transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold">
                    Signature Customizer
                  </span>
                  <h3 className="font-serif text-xl font-bold text-chocolate leading-tight">
                    {selectedProduct.name}
                  </h3>
                  <p className="font-sans text-xs text-chocolate-light leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Step 1: Select Flavor */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold font-sans uppercase tracking-wider text-chocolate">
                    Select Cake Flavor
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedProduct.flavors.map((flavor) => (
                      <button
                        key={flavor}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-sans text-xs font-medium text-left transition-all border cursor-pointer ${
                          selectedFlavor === flavor
                            ? 'bg-pink-accent/20 border-pink-accent-dark text-chocolate font-bold'
                            : 'bg-white border-blush text-chocolate-light hover:bg-blush/20'
                        }`}
                      >
                        <span>{flavor}</span>
                        {selectedFlavor === flavor && <Check className="w-3.5 h-3.5 text-chocolate" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Size / Tier */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold font-sans uppercase tracking-wider text-chocolate">
                    Select Portion Size
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { name: 'Miniature (6-8 Servings)', label: '-30% Price Reduction' },
                      { name: 'Standard (As Described)', label: 'As Advertised Size' },
                      { name: 'Grand Celebration (24-30 Servings)', label: '+80% Volume & Price' },
                    ].map((sz) => (
                      <button
                        key={sz.name}
                        onClick={() => setSelectedSize(sz.name)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-sans text-xs font-medium text-left transition-all border cursor-pointer ${
                          selectedSize === sz.name
                            ? 'bg-pink-accent/20 border-pink-accent-dark text-chocolate font-bold'
                            : 'bg-white border-blush text-chocolate-light hover:bg-blush/20'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span>{sz.name}</span>
                          <span className="text-[10px] text-chocolate-light/70 font-normal">{sz.label}</span>
                        </div>
                        {selectedSize === sz.name && <Check className="w-3.5 h-3.5 text-chocolate" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Custom written Inscription */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold font-sans uppercase tracking-wider text-chocolate">
                    Custom Cake Inscription (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Happy 30th Birthday, Sarah!"
                    value={customInscription}
                    onChange={(e) => setCustomInscription(e.target.value)}
                    maxLength={50}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none placeholder-chocolate-light/40"
                  />
                  <span className="text-[10px] text-chocolate-light/60 font-sans block text-right">
                    {customInscription.length}/50 characters
                  </span>
                </div>

                {/* Final Price & CTA */}
                <div className="pt-4 border-t border-blush/40 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-chocolate-light uppercase tracking-wider font-sans">
                      Estimated Inquiry Total
                    </span>
                    <span className="font-serif text-2xl font-bold text-chocolate">
                      ${getAdjustedPrice(selectedProduct.price)}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-chocolate text-cream font-sans font-bold text-xs rounded-full shadow-md hover:bg-chocolate-light transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Inquiry
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating success Toast message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 bg-chocolate text-cream px-5 py-4 rounded-2xl shadow-2xl border border-gold/30 flex items-center gap-3 max-w-sm"
          >
            <div className="w-7 h-7 rounded-full bg-gold/20 text-gold flex items-center justify-center border border-gold/40">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="font-serif text-sm font-bold text-gold">Delicious Selection Saved!</p>
              <p className="font-sans text-xs text-cream/90">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
