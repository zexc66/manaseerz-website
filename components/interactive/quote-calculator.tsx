'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Home, Plug, ArrowRight, Star } from '@/lib/icons';
import { cn } from '@/lib/utils';

const serviceTypes = [
  {
    id: 'panel',
    name: 'Solar Panel Installation',
    icon: <Zap className="w-5 h-5" />,
    basePrice: 1500,
    description: 'Complete residential solar panel system',
    popular: true
  },
  {
    id: 'battery',
    name: 'Battery Storage',
    icon: <Home className="w-5 h-5" />,
    basePrice: 2500,
    description: 'Home battery backup system',
    popular: false
  },
  {
    id: 'ev',
    name: 'EV Charger',
    icon: <Plug className="w-5 h-5" />,
    basePrice: 800,
    description: 'Home electric vehicle charging station',
    popular: false
  }
];

const propertySizes = [
  { id: 'small', label: 'Small (1-2 bedrooms)', multiplier: 1.0 },
  { id: 'medium', label: 'Medium (3-4 bedrooms)', multiplier: 1.3 },
  { id: 'large', label: 'Large (5+ bedrooms)', multiplier: 1.6 }
];

const additionalServices = [
  { id: 'maintenance', label: 'Annual Maintenance', price: 150 },
  { id: 'monitoring', label: 'Smart Monitoring', price: 100 },
  { id: 'warranty', label: 'Extended Warranty', price: 200 }
];

export function QuoteCalculator() {
  const [selectedService, setSelectedService] = useState('panel');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const service = serviceTypes.find(s => s.id === selectedService)!;
  const size = propertySizes.find(s => s.id === selectedSize)!;

  const basePrice = service.basePrice * size.multiplier;
  const addonsPrice = additionalServices
    .filter(a => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const totalPrice = basePrice + addonsPrice;

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get Your Free Quote
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)]">
            Instant pricing based on your needs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-4">
                Select Service
              </label>
              <div className="grid gap-4">
                {serviceTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedService(type.id)}
                    className={cn(
                      'flex items-start gap-4 p-4 rounded-xl border-2 transition-all',
                      selectedService === type.id
                        ? 'border-[var(--color-gold-primary)] bg-[var(--color-surface-800)]'
                        : 'border-[var(--color-surface-700)] bg-[var(--color-surface-900)] hover:border-[var(--color-surface-600)]'
                    )}
                  >
                    <div className={cn(
                      'p-2 rounded-lg',
                      selectedService === type.id ? 'bg-[var(--color-gold-primary)] text-black' : 'bg-[var(--color-surface-800)]'
                    )}>
                      {type.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{type.name}</span>
                        {type.popular && (
                          <span className="px-2 py-1 text-xs font-medium bg-[var(--color-gold-primary)] text-black rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        {type.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-4">
                Property Size
              </label>
              <div className="grid gap-3">
                {propertySizes.map((sizeOption) => (
                  <motion.button
                    key={sizeOption.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSize(sizeOption.id)}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all',
                      selectedSize === sizeOption.id
                        ? 'border-[var(--color-gold-primary)] bg-[var(--color-surface-800)]'
                        : 'border-[var(--color-surface-700)] bg-[var(--color-surface-900)] hover:border-[var(--color-surface-600)]'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{sizeOption.label}</span>
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        ×{sizeOption.multiplier}x
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-4">
                Additional Services
              </label>
              <div className="space-y-3">
                {additionalServices.map((addon) => (
                  <motion.button
                    key={addon.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleAddon(addon.id)}
                    className={cn(
                      'w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all',
                      selectedAddons.includes(addon.id)
                        ? 'border-[var(--color-gold-primary)] bg-[var(--color-surface-800)]'
                        : 'border-[var(--color-surface-700)] bg-[var(--color-surface-900)] hover:border-[var(--color-surface-600)]'
                    )}
                  >
                    <span className="font-medium text-white">{addon.label}</span>
                    <span className="text-[var(--color-gold-primary)] font-semibold">
                      +${addon.price}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <div className="bg-[var(--color-surface-800)] border border-[var(--color-surface-700)] rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Estimated Quote</h3>
                <Star className="w-5 h-5 text-[var(--color-gold-primary)]" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-secondary)]">Service</span>
                  <span className="text-white font-medium">{service.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-secondary)]">Base Price</span>
                  <span className="text-white font-medium">${basePrice.toFixed(2)}</span>
                </div>

                {selectedAddons.length > 0 && (
                  <>
                    <div className="border-t border-[var(--color-surface-700)] my-2" />
                    {selectedAddons.map(id => {
                      const addon = additionalServices.find(a => a.id === id)!;
                      return (
                        <div key={id} className="flex items-center justify-between text-sm">
                          <span className="text-[var(--color-text-secondary)]">{addon.label}</span>
                          <span className="text-white">+${addon.price}</span>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              <div className="border-t border-[var(--color-gold-primary)] pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <motion.span
                    key={totalPrice}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-[var(--color-gold-primary)]"
                  >
                    ${totalPrice.toFixed(2)}
                  </motion.span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Includes installation and 1-year warranty
                </p>
              </div>

              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full py-3 px-6 bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-hover)] text-black font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Get Detailed Quote
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-center text-[var(--color-text-secondary)]">
                Free consultation • No obligation • Flexible financing available
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}