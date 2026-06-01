'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Zap, ShieldCheck, Clock, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductizedAgencyTemplate() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Services />
      <Pricing />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <span className="font-display text-xl font-bold">Manaseerz Electric</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Services</a>
            <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-2 text-sm font-semibold text-black hover:from-yellow-500 hover:to-yellow-700 transition-all"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[120px]"
      />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 text-sm font-medium text-yellow-400 mb-8"
          >
            <ShieldCheck className="h-4 w-4" />
            Licensed & Insured in DFW
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            DFW's Premier
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Electrical Specialists
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Precision electrical crafted for excellence. From luxury chandelier installs to complete renovations — handled with licensed precision.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 px-8 py-4 text-base font-semibold text-black hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center gap-2"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="tel:6824515951"
              className="rounded-lg border-2 border-white/20 px-8 py-4 text-base font-semibold text-white hover:border-yellow-400 hover:text-yellow-400 transition-all flex items-center gap-2"
            >
              (682) 451-5951
            </motion.a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-8 justify-center mt-16"
          >
            {[
              { value: '5-Star', label: 'Client Rating', icon: Star },
              { value: '24hr', label: 'Response Time', icon: Clock },
              { value: '100%', label: 'DFW Coverage', icon: Users },
            ].map((metric) => (
              <div key={metric.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/10">
                  <metric.icon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold">{metric.value}</p>
                  <p className="text-sm text-gray-400">{metric.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      title: 'EV Charger Installation',
      description: 'Professional installation of electric vehicle chargers for residential and commercial properties.',
      priceRange: '$299 - $599',
      icon: Zap,
    },
    {
      title: 'Chandelier Installation',
      description: 'Expert installation of luxury chandeliers and decorative lighting fixtures.',
      priceRange: '$199 - $499',
      icon: Star,
    },
    {
      title: 'Electrical Renovations',
      description: 'Complete electrical system upgrades for kitchen, bathroom, and whole-home renovations.',
      priceRange: '$499 - $1,999',
      icon: ShieldCheck,
    },
    {
      title: 'Smart Home Integration',
      description: 'Integration of smart switches, outlets, and home automation systems.',
      priceRange: '$249 - $699',
      icon: Clock,
    },
    {
      title: 'Panel Upgrades',
      description: 'Electrical panel upgrades to handle modern power demands safely.',
      priceRange: '$899 - $2,499',
      icon: Users,
    },
    {
      title: 'Emergency Repairs',
      description: '24/7 emergency electrical repairs and troubleshooting services.',
      priceRange: '$149 - $599',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="services" className="py-24 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Our Services
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Premium electrical services tailored to your needs with transparent pricing.
          </p>
        </motion.div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-yellow-400/50 hover:bg-yellow-400/5 transition-all cursor-pointer"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400/10 mb-6 group-hover:bg-yellow-400/20 transition-colors">
                <service.icon className="h-7 w-7 text-yellow-400" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-yellow-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <span className="text-sm font-semibold text-yellow-400">
                  {service.priceRange}
                </span>
                <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-yellow-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for small electrical needs',
      price: '$149',
      features: [
        'Electrical inspection',
        'Minor repairs',
        'Basic troubleshooting',
        'Safety assessment',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'Most popular for homeowners',
      price: '$499',
      features: [
        'Everything in Basic',
        'Single fixture installation',
        'Smart home setup',
        'Panel inspection',
        'Priority scheduling',
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For complete electrical solutions',
      price: '$1,999',
      features: [
        'Everything in Professional',
        'Multiple installations',
        'Complete panel upgrade',
        'Full home automation',
        '24/7 priority support',
      ],
      cta: 'Get Started',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl border p-8",
                plan.popular
                  ? "border-yellow-400/50 bg-gradient-to-b from-yellow-400/5 to-transparent scale-105"
                  : "border-white/10 bg-white/5"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-1 text-xs font-semibold text-black">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>
              
              <div className="mb-8">
                <span className="font-display text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-400 ml-1">/project</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-yellow-400/10 mt-0.5">
                      <Check className="h-3 w-3 text-yellow-400" />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={cn(
                  "w-full rounded-lg py-3 text-sm font-semibold transition-all",
                  plan.popular
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700"
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: 'Licensed & Insured',
      description: 'Fully licensed electrical professionals with comprehensive insurance coverage.',
      icon: ShieldCheck,
    },
    {
      title: 'Fast Response Time',
      description: 'Same-day and next-day availability across the entire DFW metroplex.',
      icon: Clock,
    },
    {
      title: '100% Satisfaction',
      description: 'We stand behind our work with a satisfaction guarantee on all services.',
      icon: Star,
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprises. Get clear quotes before any work begins.',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="about" className="py-24 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We're not handymen. We're licensed electrical professionals who take pride in every connection.
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 mx-auto mb-6">
                <feature.icon className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      quote: 'Exceptional service! They installed our EV charger quickly and professionally. Highly recommend.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      quote: 'Professional, reliable, and transparent. They handled our office electrical upgrade perfectly.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Interior Designer',
      quote: 'The chandelier installation was flawless. They understood exactly what I needed.',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-display font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-950 to-black">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Get your free quote today and experience the Manaseerz difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 px-8 py-4 text-base font-semibold text-black hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center justify-center gap-2"
            >
              Request Quote
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="tel:6824515951"
              className="rounded-lg border-2 border-white/20 px-8 py-4 text-base font-semibold text-white hover:border-yellow-400 hover:text-yellow-400 transition-all flex items-center justify-center gap-2"
            >
              Call Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600">
                <Zap className="h-5 w-5 text-black" />
              </div>
              <span className="font-display text-xl font-bold">Manaseerz Electric</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Licensed electrical specialists serving the Dallas-Fort Worth Metroplex with precision and professionalism.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>(682) 451-5951</li>
              <li>info@manaseerz.com</li>
              <li>Dallas-Fort Worth, TX</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; 2026 Manaseerz Electric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}