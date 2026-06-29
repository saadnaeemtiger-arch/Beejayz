/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DESIGNER_THEMES,
  DESIGNER_FLAVORS,
  DESIGNER_FROSTINGS,
  DESIGNER_TOPPINGS,
} from '../data';
import { CustomCake } from '../types';
import { Calendar, Check, ChefHat, Info, Sparkles, MapPin } from 'lucide-react';

interface CustomCakeDesignerProps {
  onAddCustomCakeToCart: (customCake: CustomCake) => void;
}

export default function CustomCakeDesigner({ onAddCustomCakeToCart }: CustomCakeDesignerProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  
  // Customizer state
  const [selectedThemeId, setSelectedThemeId] = useState<string>('birthday');
  const [tiers, setTiers] = useState<number>(1);
  const [selectedFlavorId, setSelectedFlavorId] = useState<string>('vanilla');
  const [selectedFrostingId, setSelectedFrostingId] = useState<string>('buttercream');
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['sprinkles']);
  const [inscription, setInscription] = useState<string>('');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [designerToast, setDesignerToast] = useState<string | null>(null);

  // Derive objects from IDs
  const currentTheme = DESIGNER_THEMES.find(t => t.id === selectedThemeId) || DESIGNER_THEMES[0];
  const currentFlavor = DESIGNER_FLAVORS.find(f => f.id === selectedFlavorId) || DESIGNER_FLAVORS[0];
  const currentFrosting = DESIGNER_FROSTINGS.find(fr => fr.id === selectedFrostingId) || DESIGNER_FROSTINGS[0];

  // Price Calculation Logic
  const calculateTotalEstimate = () => {
    let price = currentFlavor.basePrice;
    
    // Add frosting style price
    price += currentFrosting.price;

    // Accumulate selected toppings prices
    selectedToppings.forEach((topId) => {
      const topObj = DESIGNER_TOPPINGS.find(t => t.id === topId);
      if (topObj) price += topObj.price;
    });

    // Multiply by tier count factor (1 tier = 1.0x, 2 tiers = 1.75x, 3 tiers = 2.5x)
    const tierMultiplier = tiers === 1 ? 1.0 : tiers === 2 ? 1.75 : 2.5;
    price *= tierMultiplier;

    // Apply theme multiplier (e.g. wedding might be 1.2x)
    price *= currentTheme.multiplier;

    return Math.round(price);
  };

  const handleToggleTopping = (toppingId: string) => {
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter(id => id !== toppingId));
    } else {
      setSelectedToppings([...selectedToppings, toppingId]);
    }
  };

  const handleSubmitCustomCake = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deliveryDate) {
      alert('Please select your preferred Pickup or Delivery Date before adding to cart.');
      return;
    }

    const constructedCustomCake: CustomCake = {
      theme: currentTheme.name,
      tiers,
      flavor: currentFlavor.name,
      frosting: currentFrosting.name,
      toppings: selectedToppings.map(id => DESIGNER_TOPPINGS.find(t => t.id === id)?.name || id),
      inscription,
      priceEstimate: calculateTotalEstimate(),
      deliveryType,
      deliveryDate,
      notes,
    };

    onAddCustomCakeToCart(constructedCustomCake);
    
    setDesignerToast('Custom Cake designed and saved to your Inquiry Cart!');
    setTimeout(() => setDesignerToast(null), 3500);

    // Reset some inputs but preserve date for convenience
    setActiveStep(1);
    setSelectedThemeId('birthday');
    setTiers(1);
    setSelectedFlavorId('vanilla');
    setSelectedFrostingId('buttercream');
    setSelectedToppings(['sprinkles']);
    setInscription('');
    setNotes('');
  };

  // Visualizer Helpers: Determine colors & decorators based on choices
  const getVisualizerFrostingColorClass = () => {
    if (selectedFrostingId === 'buttercream') return 'bg-amber-50 border-amber-100'; // Warm cream
    if (selectedFrostingId === 'fondant') return 'bg-white border-slate-100'; // Smooth white
    if (selectedFrostingId === 'ganache') return 'bg-[#3C2415] border-[#2C1A14]'; // Dark chocolate brown
    if (selectedFrostingId === 'cream-cheese') return 'bg-amber-50/70 border-amber-100/50'; // Off-white
    if (selectedFrostingId === 'naked') return 'bg-amber-100/40 border-amber-200/50'; // Textured semi-exposed crumb
    return 'bg-amber-50';
  };

  const getVisualizerDripClass = () => {
    if (selectedThemeId === 'chocolate') return 'border-t-4 border-[#311D11]';
    if (selectedThemeId === 'birthday') return 'border-t-4 border-pink-400';
    if (selectedThemeId === 'wedding') return 'border-t-4 border-amber-300';
    return '';
  };

  return (
    <section id="custom-orders" className="py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold block">
            Craft Your Vision
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-chocolate font-bold leading-tight">
            Interactive Custom <span className="italic font-normal">Cake Designer</span>
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
          <p className="font-sans text-sm text-chocolate-light leading-relaxed">
            Unleash your creativity. Use our interactive digital blueprint designer to construct your custom creation. Specify flavors, styles, tiers, and details to see a real-time price estimate.
          </p>
        </div>

        {/* Customizer Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT PANEL: 2D Dynamic Visualizer (4 cols) */}
          <div className="lg:col-span-5 bg-white border border-blush p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center sticky top-28 min-h-[460px]">
            <div className="text-center space-y-1 mb-8">
              <h4 className="font-serif text-sm font-bold text-chocolate tracking-wide uppercase">
                Active Cake Blueprint
              </h4>
              <p className="text-[11px] font-sans text-chocolate-light font-medium">
                Dynamic 2D Visualizer representation
              </p>
            </div>

            {/* Visualizer Canvas box */}
            <div className="w-full max-w-[280px] h-[280px] relative flex flex-col items-center justify-end pb-4 bg-cream/30 rounded-2xl border border-blush/30 overflow-hidden">
              
              {/* Backglow glow layer based on theme */}
              <div className="absolute inset-0 bg-radial from-pink-accent/10 to-transparent -z-10" />

              {/* Dynamic 2D Stack representation */}
              <div className="w-full flex flex-col items-center gap-1.5 relative z-10">
                {/* TIER 3 (TOP) - render only if tiers === 3 */}
                {tiers >= 3 && (
                  <motion.div
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    className={`w-[100px] h-[50px] rounded-t-lg border-x-2 border-b-2 shadow-sm flex flex-col justify-between relative ${getVisualizerFrostingColorClass()}`}
                  >
                    <div className={`w-full h-1.5 ${getVisualizerDripClass()}`} />
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex gap-1">
                      {selectedToppings.includes('roses') && <span className="text-sm">🌹</span>}
                      {selectedToppings.includes('berries') && <span className="text-xs">🍓</span>}
                    </div>
                  </motion.div>
                )}

                {/* TIER 2 (MIDDLE) - render if tiers >= 2 */}
                {tiers >= 2 && (
                  <motion.div
                    initial={{ scale: 0, y: -15 }}
                    animate={{ scale: 1, y: 0 }}
                    className={`w-[140px] h-[55px] rounded-t-lg border-x-2 border-b-2 shadow-sm flex flex-col justify-between relative ${getVisualizerFrostingColorClass()}`}
                  >
                    <div className={`w-full h-1.5 ${getVisualizerDripClass()}`} />
                    {selectedToppings.includes('macarons') && (
                      <div className="absolute inset-x-2 bottom-1 flex justify-around">
                        <span className="w-2.5 h-1.5 rounded-full bg-pink-300 border border-pink-400 block" />
                        <span className="w-2.5 h-1.5 rounded-full bg-amber-200 border border-amber-300 block" />
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TIER 1 (BOTTOM) - always visible */}
                <motion.div
                  layout
                  className={`w-[180px] h-[65px] rounded-t-xl border-x-2 border-b-2 shadow-md flex flex-col justify-between relative ${getVisualizerFrostingColorClass()}`}
                >
                  <div className={`w-full h-2 ${getVisualizerDripClass()}`} />
                  
                  {/* Edible Gold Leaf visualization */}
                  {selectedToppings.includes('gold-leaf') && (
                    <div className="absolute inset-0 flex justify-around items-center pointer-events-none opacity-80">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rotate-45 rounded-xs" />
                      <span className="w-2 h-1.5 bg-yellow-400 rounded-sm -translate-y-2" />
                      <span className="w-1 h-2 bg-yellow-400 rotate-12" />
                    </div>
                  )}

                  {/* Written Inscription Preview */}
                  {inscription && (
                    <div className="absolute bottom-2 inset-x-0 text-center px-2">
                      <span className={`font-serif text-[8px] tracking-wide font-semibold block line-clamp-1 py-0.5 rounded-sm bg-white/70 ${selectedFrostingId === 'ganache' ? 'text-cream bg-black/40' : 'text-chocolate'}`}>
                        "{inscription}"
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Standard Cake Stand Base */}
                <div className="w-[220px] h-3 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 rounded-full shadow-md border-b border-slate-400" />
                <div className="w-[80px] h-5 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500 rounded-b-xl shadow-inner -mt-1" />
              </div>
            </div>

            {/* Dynamic visualizer specs breakdown */}
            <div className="w-full mt-6 space-y-2 border-t border-blush/40 pt-6">
              <div className="flex justify-between font-sans text-xs">
                <span className="text-chocolate-light">Tier Count:</span>
                <span className="font-bold text-chocolate">{tiers} {tiers === 1 ? 'Tier' : 'Tiers'}</span>
              </div>
              <div className="flex justify-between font-sans text-xs">
                <span className="text-chocolate-light">Style Theme:</span>
                <span className="font-bold text-chocolate capitalize">{currentTheme.name}</span>
              </div>
              <div className="flex justify-between font-sans text-xs">
                <span className="text-chocolate-light">Flavor Base:</span>
                <span className="font-bold text-chocolate">{currentFlavor.name}</span>
              </div>
              <div className="flex justify-between font-sans text-xs">
                <span className="text-chocolate-light">Outer Coat:</span>
                <span className="font-bold text-chocolate">{currentFrosting.name}</span>
              </div>
              
              <div className="pt-4 flex items-baseline justify-between border-t border-dashed border-blush/40">
                <span className="font-sans text-xs text-chocolate-light">Estimated Price:</span>
                <span className="font-serif text-3xl font-extrabold text-chocolate">${calculateTotalEstimate()}</span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Customizer Form steps (7 cols) */}
          <form onSubmit={handleSubmitCustomCake} className="lg:col-span-7 bg-white border border-blush p-8 rounded-3xl shadow-xl space-y-8">
            
            {/* Steps bar indicator */}
            <div className="flex justify-between items-center border-b border-blush pb-6 overflow-x-auto gap-2">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setActiveStep(step)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeStep === step
                      ? 'bg-chocolate text-cream shadow-md'
                      : 'bg-blush/40 text-chocolate/70 hover:bg-blush'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    {step}
                  </span>
                  <span>
                    {step === 1 && 'Tier & Theme'}
                    {step === 2 && 'Recipe Bases'}
                    {step === 3 && 'Decorators'}
                    {step === 4 && 'Logistics'}
                  </span>
                </button>
              ))}
            </div>

            {/* STEP 1: Tier and Theme customization */}
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Tier Count selector */}
                <div className="space-y-3">
                  <label className="block font-serif text-lg font-bold text-chocolate">
                    1. Choose Tier Count
                  </label>
                  <p className="font-sans text-xs text-chocolate-light -mt-2">
                    Multi-tier cakes are perfect for grander venue dimensions and portion size scalability.
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-1">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setTiers(num)}
                        className={`flex flex-col items-center justify-center py-4 rounded-2xl border transition-all cursor-pointer ${
                          tiers === num
                            ? 'bg-pink-accent/20 border-pink-accent-dark text-chocolate font-bold shadow-sm'
                            : 'bg-white border-blush text-chocolate-light hover:bg-blush/20'
                        }`}
                      >
                        <span className="font-serif text-xl">{num}</span>
                        <span className="font-sans text-[10px] tracking-wide uppercase mt-1">
                          {num === 1 && 'Single Tier'}
                          {num === 2 && 'Double Tier'}
                          {num === 3 && 'Triple Tier'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Celebration Style/Theme selector */}
                <div className="space-y-3">
                  <label className="block font-serif text-lg font-bold text-chocolate">
                    2. Select Design Style Theme
                  </label>
                  <p className="font-sans text-xs text-chocolate-light -mt-2">
                    Themes dictate the decorative layout framework and structural embellishments.
                  </p>
                  <div className="grid grid-cols-1 gap-3 pt-1">
                    {DESIGNER_THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedThemeId(theme.id)}
                        className={`flex items-start justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          selectedThemeId === theme.id
                            ? 'bg-pink-accent/20 border-pink-accent-dark text-chocolate font-bold shadow-sm'
                            : 'bg-white border-blush text-chocolate-light hover:bg-blush/20'
                        }`}
                      >
                        <div className="space-y-1">
                          <p className="font-serif text-sm font-bold text-chocolate">{theme.name}</p>
                          <p className="font-sans text-xs text-chocolate-light/80 leading-normal">{theme.desc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-xs text-chocolate-light font-semibold">
                            {theme.multiplier > 1.0 ? `+${Math.round((theme.multiplier - 1.0) * 100)}%` : 'Base price'}
                          </span>
                          {selectedThemeId === theme.id && <Check className="w-4 h-4 text-chocolate shrink-0" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Flavor and Outer coating (Frosting) */}
            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Cake Flavor selector */}
                <div className="space-y-3">
                  <label className="block font-serif text-lg font-bold text-chocolate">
                    3. Select Cake Base Flavor
                  </label>
                  <p className="font-sans text-xs text-chocolate-light -mt-2">
                    Our recipes are slow-baked with luxury eggs and real milk butter.
                  </p>
                  <div className="grid grid-cols-1 gap-3 pt-1">
                    {DESIGNER_FLAVORS.map((flavor) => (
                      <button
                        key={flavor.id}
                        type="button"
                        onClick={() => setSelectedFlavorId(flavor.id)}
                        className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          selectedFlavorId === flavor.id
                            ? 'bg-pink-accent/20 border-pink-accent-dark text-chocolate font-bold shadow-sm'
                            : 'bg-white border-blush text-chocolate-light hover:bg-blush/20'
                        }`}
                      >
                        <div className="space-y-1">
                          <p className="font-serif text-sm font-bold text-chocolate">{flavor.name}</p>
                          <p className="font-sans text-xs text-chocolate-light/80 leading-normal">{flavor.desc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-xs text-chocolate font-bold">${flavor.basePrice}</span>
                          {selectedFlavorId === flavor.id && <Check className="w-4 h-4 text-chocolate shrink-0" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Outer coating selector */}
                <div className="space-y-3">
                  <label className="block font-serif text-lg font-bold text-chocolate">
                    4. Choose Outer Coating (Frosting)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {DESIGNER_FROSTINGS.map((frosting) => (
                      <button
                        key={frosting.id}
                        type="button"
                        onClick={() => setSelectedFrostingId(frosting.id)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedFrostingId === frosting.id
                            ? 'bg-pink-accent/20 border-pink-accent-dark text-chocolate font-bold'
                            : 'bg-white border-blush text-chocolate-light hover:bg-blush/20'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="font-serif text-xs font-bold text-chocolate">{frosting.name}</p>
                          <p className="font-sans text-[10px] text-chocolate-light/70">+${frosting.price} fee</p>
                        </div>
                        {selectedFrostingId === frosting.id && <Check className="w-4.5 h-4.5 text-chocolate shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Toppings and custom inscription */}
            {activeStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Toppings Checklist */}
                <div className="space-y-3">
                  <label className="block font-serif text-lg font-bold text-chocolate">
                    5. Choose Gourmet Accents (Toppings)
                  </label>
                  <p className="font-sans text-xs text-chocolate-light -mt-2">
                    Select multiple luxurious toppings to complete your design masterpiece.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {DESIGNER_TOPPINGS.map((topping) => {
                      const isSelected = selectedToppings.includes(topping.id);
                      return (
                        <button
                          key={topping.id}
                          type="button"
                          onClick={() => handleToggleTopping(topping.id)}
                          className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-pink-accent/20 border-pink-accent-dark text-chocolate font-bold shadow-xs'
                              : 'bg-white border-blush text-chocolate-light hover:bg-blush/20'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <p className="font-serif text-xs font-bold text-chocolate">{topping.name}</p>
                            <p className="font-sans text-[10px] text-chocolate-light/70">+${topping.price} accent price</p>
                          </div>
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isSelected ? 'bg-chocolate border-chocolate text-cream' : 'border-blush'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom inscription */}
                <div className="space-y-3">
                  <label className="block font-serif text-lg font-bold text-chocolate">
                    6. Custom Written Inscription
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Happy Wedding Day Olivia & David!"
                    value={inscription}
                    onChange={(e) => setInscription(e.target.value)}
                    maxLength={60}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none placeholder-chocolate-light/40 shadow-inner"
                  />
                  <div className="flex justify-between items-center text-[10px] text-chocolate-light/60 font-sans">
                    <span>*Our team will pipe this carefully in chocolate or vanilla royal icing.</span>
                    <span>{inscription.length}/60 characters</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Logistics and submit */}
            {activeStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Delivery vs Pickup switch */}
                <div className="space-y-3">
                  <label className="block font-serif text-lg font-bold text-chocolate">
                    7. Delivery or Pickup Preference
                  </label>
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    {[
                      { id: 'pickup', label: 'Bakery Boutique Pickup', icon: MapPin },
                      { id: 'delivery', label: 'Artisanal Hand Delivery', icon: Calendar },
                    ].map((pref) => {
                      const Icon = pref.icon;
                      return (
                        <button
                          key={pref.id}
                          type="button"
                          onClick={() => setDeliveryType(pref.id as 'pickup' | 'delivery')}
                          className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all cursor-pointer ${
                            deliveryType === pref.id
                              ? 'bg-pink-accent/20 border-pink-accent-dark text-chocolate font-bold shadow-sm'
                              : 'bg-white border-blush text-chocolate-light hover:bg-blush/20'
                          }`}
                        >
                          <Icon className="w-5 h-5 text-gold mb-2" />
                          <span className="font-sans text-xs text-chocolate tracking-wide uppercase font-semibold">
                            {pref.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Date Selection and Special Instructions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold font-sans uppercase tracking-wider text-chocolate">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2 flex flex-col justify-end">
                    <p className="font-sans text-[11px] text-chocolate-light leading-relaxed flex items-center gap-1.5 p-3 rounded-xl bg-gold-light/20 border border-gold-light/40">
                      <Info className="w-4 h-4 text-gold shrink-0" />
                      We request 14-days notice for Wedding cakes, 4-days notice for Celebration cakes.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold font-sans uppercase tracking-wider text-chocolate">
                    Special Design & Decoration Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about your desired color palette, attachable ribbons, cake toppings arrangement, or severe food allergies here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-blush text-chocolate font-sans text-xs focus:ring-1 focus:ring-gold focus:outline-none placeholder-chocolate-light/40 shadow-inner resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Navigation and Submission Drawer */}
            <div className="pt-6 border-t border-blush flex justify-between items-center">
              <div>
                {activeStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="px-5 py-2.5 bg-white hover:bg-blush/20 text-chocolate border border-blush font-sans font-semibold text-xs rounded-full shadow-xs transition-all cursor-pointer"
                  >
                    Back Step
                  </button>
                )}
              </div>

              <div>
                {activeStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="px-6 py-3 bg-chocolate text-cream font-sans font-semibold text-xs rounded-full shadow-md hover:bg-chocolate-light transition-all cursor-pointer"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-chocolate text-cream font-sans font-bold text-xs rounded-full shadow-md hover:bg-chocolate-light transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                  >
                    <ChefHat className="w-4 h-4 text-gold animate-bounce" />
                    Save Custom Cake & Add to Inquiry
                  </button>
                )}
              </div>
            </div>

          </form>

        </div>
      </div>

      {/* Custom Cake Process step visualizer requested explicitly by user:
          Choose Your Cake, Share Your Design, Confirm Your Order, Freshly Baked, Pickup or Delivery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-white rounded-3xl border border-blush p-8 sm:p-12 shadow-xl">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <h3 className="font-serif text-2xl font-bold text-chocolate">
              The Beejayz Custom Cake Process
            </h3>
            <p className="font-sans text-xs text-chocolate-light">
              From initial sketch to your celebration table, here is how we make magic happen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {[
              { num: '01', title: 'Choose Your Cake', desc: 'Select from our luxury templates or sketch your own tiered dream blueprint.' },
              { num: '02', title: 'Share Your Design', desc: 'Our head decorator reviews your color themes, written text, and references.' },
              { num: '03', title: 'Confirm Your Order', desc: 'Secure booking dates with easy, transparent online estimates and deposits.' },
              { num: '04', title: 'Freshly Baked', desc: 'Baked from scratch by hand, iced, and styled meticulously by organic specialists.' },
              { num: '05', title: 'Pickup or Delivery', desc: 'Gently packed and loaded in climate-controlled vehicles right to your venue.' },
            ].map((proc, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-3 group relative">
                
                {/* Horizontal line between circles in desktop layout */}
                {index < 4 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-pink-accent to-gold/20 -z-0" />
                )}

                <div className="w-14 h-14 rounded-full bg-cream border-2 border-gold flex items-center justify-center text-gold font-serif text-lg font-bold group-hover:bg-chocolate group-hover:text-gold-light group-hover:border-chocolate transition-all duration-500 shadow-sm relative z-10">
                  {proc.num}
                </div>

                <div className="space-y-1 relative z-10">
                  <h4 className="font-serif text-sm font-bold text-chocolate group-hover:text-gold transition-colors duration-300">
                    {proc.title}
                  </h4>
                  <p className="font-sans text-xs text-chocolate-light leading-relaxed px-4 md:px-1">
                    {proc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal Toast */}
      <AnimatePresence>
        {designerToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 bg-chocolate text-cream px-5 py-4 rounded-2xl shadow-2xl border border-gold/30 flex items-center gap-3 max-w-sm"
          >
            <div className="w-7 h-7 rounded-full bg-gold/20 text-gold flex items-center justify-center border border-gold/40">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <div className="flex-1">
              <p className="font-serif text-sm font-bold text-gold">Custom Design Drafted!</p>
              <p className="font-sans text-xs text-cream/90">{designerToast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
