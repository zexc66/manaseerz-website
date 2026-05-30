'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Image as ImageIcon, ArrowRight, ZoomIn } from 'lucide-react';
import { services } from '@/lib/data';
import { cn } from '@/lib/utils';

// Portfolio data - replace with real project data
const portfolioItems = [
  {
    id: 1,
    title: 'Luxury Chandelier Installation',
    category: 'chandelier-installation',
    location: 'Frisco, TX',
    image: '/placeholder-portfolio-1.jpg', // Replace with real images
    description: 'Installed a stunning 12-light crystal chandelier in a custom-built home dining room with cathedral ceiling.',
    tags: ['Crystal Chandelier', 'High Ceiling', 'Custom Home'],
  },
  {
    id: 2,
    title: 'Tesla Wall Connector Setup',
    category: 'ev-charger-installation',
    location: 'Plano, TX',
    image: '/placeholder-portfolio-2.jpg',
    description: 'Complete Tesla Wall Connector installation with 48A circuit panel upgrade for luxury estate.',
    tags: ['Tesla', 'Wall Connector', 'Circuit Upgrade'],
  },
  {
    id: 3,
    title: 'Smart Home Integration',
    category: 'smart-switches',
    location: 'McKinney, TX',
    image: '/placeholder-portfolio-3.jpg',
    description: 'Whole-home smart lighting system with Lutron Caséta and voice control integration.',
    tags: ['Lutron Caséta', 'Voice Control', 'Whole Home'],
  },
  {
    id: 4,
    title: 'Kitchen Renovation Wiring',
    category: 'renovation-electrical',
    location: 'Lewisville, TX',
    image: '/placeholder-portfolio-4.jpg',
    description: 'Complete electrical for kitchen remodel including island lighting, under-cabinet lighting, and appliance circuits.',
    tags: ['Kitchen Remodel', 'Island Lighting', 'Appliance Circuits'],
  },
  {
    id: 5,
    title: 'Outdoor Lighting System',
    category: 'outlet-circuit',
    location: 'Southlake, TX',
    image: '/placeholder-portfolio-5.jpg',
    description: 'Professional outdoor lighting installation with landscape lighting and motion-activated security lights.',
    tags: ['Outdoor Lighting', 'Security', 'Landscape'],
  },
  {
    id: 6,
    title: 'Modern Pendant Collection',
    category: 'chandelier-installation',
    location: 'Prosper, TX',
    image: '/placeholder-portfolio-6.jpg',
    description: 'Installed a collection of 6 modern glass pendant lights over kitchen island with dimmer control.',
    tags: ['Pendant Lights', 'Kitchen Island', 'Dimmer'],
  },
];

const categories = [
  { id: 'all', label: 'All Projects' },
  ...services.map((service) => ({
    id: service.id,
    label: service.title,
  })),
];

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);

  const filteredProjects = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter((project) => project.category === selectedCategory);

  return (
    <>
      <section id="portfolio" className="py-24 bg-[var(--color-black-rich)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl mb-6">
              Our Work
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Explore our completed electrical projects across the Dallas-Fort Worth metroplex.
              Quality workmanship on every installation.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  selectedCategory === category.id
                    ? "bg-[var(--color-gold-primary)] text-[var(--color-black-pure)]"
                    : "bg-[var(--color-surface-800)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-700)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <ImageIcon className="h-16 w-16 text-[var(--color-text-muted)] mx-auto mb-4" />
              <p className="text-lg text-[var(--color-text-secondary)]">No projects found in this category.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 text-[var(--color-gold-primary)] hover:underline"
              >
                View all projects
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function PortfolioCard({ project, index, onClick }: { project: typeof portfolioItems[0]; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)]">
        {/* Placeholder Image */}
        <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-surface-800)] to-[var(--color-surface-900)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <ImageIcon className="h-16 w-16 text-[var(--color-text-muted)]" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-pure)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-display font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-gold-primary)] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            {project.location}
          </p>
          <div className="flex items-center gap-2 text-[var(--color-gold-primary)]">
            <span className="text-sm font-medium">View Project</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Zoom Icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-10 w-10 rounded-lg bg-[var(--color-gold-primary)]/20 backdrop-blur-sm flex items-center justify-center">
            <ZoomIn className="h-5 w-5 text-[var(--color-gold-primary)]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: typeof portfolioItems[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[1060] bg-[var(--color-black-pure)]/95 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--color-surface-900)] border border-[var(--color-surface-800)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-surface-800)]">
          <h3 className="text-2xl font-display font-semibold text-[var(--color-text-primary)]">
            {project.title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--color-surface-800)] transition-colors"
          >
            <ArrowRight className="h-6 w-6 text-[var(--color-text-secondary)] rotate-45" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Placeholder for project images */}
          <div className="aspect-video rounded-xl bg-gradient-to-br from-[var(--color-surface-800)] to-[var(--color-surface-900)] mb-6 flex items-center justify-center">
            <ImageIcon className="h-24 w-24 text-[var(--color-text-muted)]" />
          </div>

          <div className="space-y-6">
            {/* Location */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--color-text-muted)] mb-2">LOCATION</h4>
              <p className="text-[var(--color-text-primary)]">{project.location}</p>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--color-text-muted)] mb-2">PROJECT DETAILS</h4>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--color-text-muted)] mb-2">SERVICES</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[var(--color-gold-primary)]/10 border border-[var(--color-gold-primary)]/20 text-[var(--color-gold-primary)] text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onClose();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full mt-6 py-4 px-8 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold text-lg transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)]"
          >
            Get Similar Work
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}