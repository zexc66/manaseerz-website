'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Image as ImageIcon, ArrowRight, ZoomIn } from 'lucide-react';
import { services } from '@/lib/data';
import { cn } from '@/lib/utils';

// Portfolio data with real Unsplash images
const portfolioItems = [
  // Chandelier Installations (6 items)
  {
    id: 1,
    title: 'Luxury Crystal Chandelier',
    category: 'chandelier-installation',
    location: 'Frisco, TX',
    image: 'https://images.unsplash.com/photo-1513506003011-3b03c801cc63?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1513506003011-3b03c801cc63?q=80&w=400&auto=format&fit=crop',
    description: 'Installed a stunning 12-light crystal chandelier in a custom-built home dining room with cathedral ceiling.',
    tags: ['Crystal Chandelier', 'High Ceiling', 'Custom Home'],
  },
  {
    id: 2,
    title: 'Modern Pendant Collection',
    category: 'chandelier-installation',
    location: 'Prosper, TX',
    image: 'https://images.unsplash.com/photo-1507473888900-52e1ad14592d?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1507473888900-52e1ad14592d?q=80&w=400&auto=format&fit=crop',
    description: 'Installed a collection of 6 modern glass pendant lights over kitchen island with dimmer control.',
    tags: ['Pendant Lights', 'Kitchen Island', 'Dimmer'],
  },
  {
    id: 3,
    title: 'Vintage Brass Restoration',
    category: 'chandelier-installation',
    location: 'Highland Park, TX',
    image: 'https://images.unsplash.com/photo-1540932296774-3ed6918e4473?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1540932296774-3ed6918e4473?q=80&w=400&auto=format&fit=crop',
    description: 'Restored and installed a vintage brass chandelier with complete electrical upgrade and secure mounting.',
    tags: ['Brass Chandelier', 'Restoration', 'Electrical Upgrade'],
  },
  {
    id: 4,
    title: 'Linear LED Chandelier',
    category: 'chandelier-installation',
    location: 'Southlake, TX',
    image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?q=80&w=400&auto=format&fit=crop',
    description: 'Modern linear LED chandelier installation over dining table with warm white temperature.',
    tags: ['Linear LED', 'Modern Design', 'Warm White'],
  },
  {
    id: 5,
    title: 'Multi-Layer Chandelier',
    category: 'chandelier-installation',
    location: 'Plano, TX',
    image: 'https://images.unsplash.com/photo-1560666630-75d93e4c1b19?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1560666630-75d93e4c1b19?q=80&w=400&auto=format&fit=crop',
    description: 'Multi-tier crystal chandelier with specialized mounting for high-ceiling entryway.',
    tags: ['Multi-Tier', 'Entryway', 'Crystal'],
  },
  {
    id: 6,
    title: 'Mini Chandelier Cluster',
    category: 'chandelier-installation',
    location: 'McKinney, TX',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop',
    description: 'Cluster of 3 mini chandeliers for living room with height-adjustable installation.',
    tags: ['Mini Chandeliers', 'Living Room', 'Adjustable Height'],
  },

  // EV Charger Installations (6 items)
  {
    id: 7,
    title: 'Tesla Wall Connector',
    category: 'ev-charger-installation',
    location: 'Plano, TX',
    image: 'https://images.unsplash.com/photo-1619317816960-70b33c3b434c?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1619317816960-70b33c3b434c?q=80&w=400&auto=format&fit=crop',
    description: 'Complete Tesla Wall Connector installation with 48A circuit panel upgrade for luxury estate.',
    tags: ['Tesla', 'Wall Connector', 'Circuit Upgrade'],
  },
  {
    id: 8,
    title: 'Universal Level 2 Charger',
    category: 'ev-charger-installation',
    location: 'Southlake, TX',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=400&auto=format&fit=crop',
    description: 'ChargePoint Level 2 charger installation with weatherproofing and 240V dedicated circuit.',
    tags: ['ChargePoint', 'Level 2', 'Weatherproof'],
  },
  {
    id: 9,
    title: 'NEMA 14-50 Outlet',
    category: 'ev-charger-installation',
    location: 'Lewisville, TX',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=400&auto=format&fit=crop',
    description: 'Installed NEMA 14-50 outlet for portable EV charger with dedicated 50A circuit.',
    tags: ['NEMA 14-50', 'Portable Charger', '50A Circuit'],
  },
  {
    id: 10,
    title: 'Multi-Car Charging Station',
    category: 'ev-charger-installation',
    location: 'Frisco, TX',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=400&auto=format&fit=crop',
    description: 'Dual charging station setup with shared circuit load balancing for multiple vehicles.',
    tags: ['Dual Charger', 'Load Balancing', 'Multi-Vehicle'],
  },
  {
    id: 11,
    title: 'Outdoor Charger Installation',
    category: 'ev-charger-installation',
    location: 'The Colony, TX',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=400&auto=format&fit=crop',
    description: 'Weather-rated EV charger installation in driveway with conduit and weatherproof housing.',
    tags: ['Outdoor Rated', 'Weatherproof', 'Driveway'],
  },
  {
    id: 12,
    title: 'Circuit Panel Upgrade',
    category: 'ev-charger-installation',
    location: 'Allen, TX',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=400&auto=format&fit=crop',
    description: 'Upgraded from 100A to 200A panel to support EV charger with dedicated circuits.',
    tags: ['Panel Upgrade', '200A', 'EV Ready'],
  },

  // Smart Home Installations (6 items)
  {
    id: 13,
    title: 'Lutron Caséta System',
    category: 'smart-switches',
    location: 'McKinney, TX',
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=400&auto=format&fit=crop',
    description: 'Whole-home smart lighting system with Lutron Caséta and voice control integration.',
    tags: ['Lutron Caséta', 'Voice Control', 'Whole Home'],
  },
  {
    id: 14,
    title: 'Google Home Integration',
    category: 'smart-switches',
    location: 'Carrollton, TX',
    image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=400&auto=format&fit=crop',
    description: 'Smart switches integrated with Google Home for voice-activated lighting control.',
    tags: ['Google Home', 'Voice Control', 'Smart Switches'],
  },
  {
    id: 15,
    title: 'Smart Thermostat Hub',
    category: 'smart-switches',
    location: 'Addison, TX',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop',
    description: 'Ecobee smart thermostat with lighting automation for energy efficiency.',
    tags: ['Ecobee', 'Automation', 'Energy Efficient'],
  },
  {
    id: 16,
    title: 'Philips Hue Setup',
    category: 'smart-switches',
    location: 'Richardson, TX',
    image: 'https://images.unsplash.com/photo-1558470598-a5dda9640f6b?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1558470598-a5dda9640f6b?q=80&w=400&auto=format&fit=crop',
    description: 'Philips Hue color-changing smart lights with scene programming and remote control.',
    tags: ['Philips Hue', 'Color Changing', 'Scene Programming'],
  },
  {
    id: 17,
    title: 'Dimmer Switch Installation',
    category: 'smart-switches',
    location: 'Garland, TX',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=400&auto=format&fit=crop',
    description: 'Smart dimmer switches throughout living areas with preset lighting scenes.',
    tags: ['Dimmer', 'Lighting Scenes', 'Living Room'],
  },
  {
    id: 18,
    title: 'Whole-Home Automation',
    category: 'smart-switches',
    location: 'Irving, TX',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=400&auto=format&fit=crop',
    description: 'Complete home automation hub controlling lights, thermostat, and security systems.',
    tags: ['Automation Hub', 'Security', 'Complete System'],
  },

  // Renovation Projects (6 items)
  {
    id: 19,
    title: 'Kitchen Remodel Wiring',
    category: 'renovation-electrical',
    location: 'Lewisville, TX',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=400&auto=format&fit=crop',
    description: 'Complete electrical for kitchen remodel including island lighting, under-cabinet lighting, and appliance circuits.',
    tags: ['Kitchen Remodel', 'Island Lighting', 'Appliance Circuits'],
  },
  {
    id: 20,
    title: 'Bathroom Renovation',
    category: 'renovation-electrical',
    location: 'Frisco, TX',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop',
    description: 'Bathroom electrical upgrade with GFCI protection, ventilation fan, and vanity lighting.',
    tags: ['Bathroom', 'GFCI', 'Ventilation'],
  },
  {
    id: 21,
    title: 'Whole-House Rewire',
    category: 'renovation-electrical',
    location: 'Plano, TX',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=400&auto=format&fit=crop',
    description: 'Complete electrical rewire for 1960s home including new panel, outlets, and lighting.',
    tags: ['Rewire', 'Panel Upgrade', 'Vintage Home'],
  },
  {
    id: 22,
    title: 'Basement Finishing',
    category: 'renovation-electrical',
    location: 'Prosper, TX',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400&auto=format&fit=crop',
    description: 'Basement electrical setup for home theater, office space, and recreation room.',
    tags: ['Basement', 'Home Theater', 'Recreation'],
  },
  {
    id: 23,
    title: 'Attic Conversion',
    category: 'renovation-electrical',
    location: 'McKinney, TX',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=400&auto=format&fit=crop',
    description: 'Electrical planning for attic conversion to master suite with recessed lighting and outlets.',
    tags: ['Attic', 'Master Suite', 'Recessed Lighting'],
  },
  {
    id: 24,
    title: 'Outdoor Kitchen Power',
    category: 'renovation-electrical',
    location: 'Southlake, TX',
    image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?q=80&w=400&auto=format&fit=crop',
    description: 'Outdoor kitchen electrical setup including outlets for grill, refrigerator, and lighting.',
    tags: ['Outdoor Kitchen', 'Weatherproof', 'Grill Power'],
  },

  // Outlet & Circuit Projects (6 items)
  {
    id: 25,
    title: 'Outdoor Lighting System',
    category: 'outlet-circuit',
    location: 'Southlake, TX',
    image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=400&auto=format&fit=crop',
    description: 'Professional outdoor lighting installation with landscape lighting and motion-activated security lights.',
    tags: ['Outdoor Lighting', 'Security', 'Landscape'],
  },
  {
    id: 26,
    title: 'USB-C Outlet Installation',
    category: 'outlet-circuit',
    location: 'Allen, TX',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=400&auto=format&fit=crop',
    description: 'Modern USB-C and USB-A outlet installation in home office for device charging.',
    tags: ['USB-C', 'Office', 'Device Charging'],
  },
  {
    id: 27,
    title: 'Bathroom GFCI Upgrade',
    category: 'outlet-circuit',
    location: 'Carrollton, TX',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop',
    description: 'GFCI outlet installation in bathroom for code compliance and water safety.',
    tags: ['GFCI', 'Bathroom', 'Safety'],
  },
  {
    id: 28,
    title: 'Garage Workshop Power',
    category: 'outlet-circuit',
    location: 'The Colony, TX',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop',
    description: 'Heavy-duty outlet installation in garage workshop for power tools and equipment.',
    tags: ['Garage', 'Workshop', 'Heavy Duty'],
  },
  {
    id: 29,
    title: 'Patio Power Setup',
    category: 'outlet-circuit',
    location: 'Celina, TX',
    image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=400&auto=format&fit=crop',
    description: 'Weatherproof outdoor outlets on patio for string lights, fans, and outdoor electronics.',
    tags: ['Patio', 'Weatherproof', 'Outdoor Living'],
  },
  {
    id: 30,
    title: 'Office Outlet Upgrade',
    category: 'outlet-circuit',
    location: 'Richardson, TX',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=400&auto=format&fit=crop',
    description: 'Multiple outlet installation with surge protection for home office equipment.',
    tags: ['Office', 'Surge Protection', 'Multiple Outlets'],
  },

  // Range Hood Installations (6 items)
  {
    id: 31,
    title: 'Modern Range Hood Installation',
    category: 'range-hood',
    location: 'Plano, TX',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=400&auto=format&fit=crop',
    description: 'Sleek stainless steel range hood installation with hidden electrical connections.',
    tags: ['Stainless Steel', 'Modern', 'Hidden Wiring'],
  },
  {
    id: 32,
    title: 'Professional Chef Hood',
    category: 'range-hood',
    location: 'Highland Park, TX',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400&auto=format&fit=crop',
    description: 'Commercial-grade range hood installation in luxury home with proper ventilation ductwork.',
    tags: ['Commercial Grade', 'Ventilation', 'Luxury Home'],
  },
  {
    id: 33,
    title: 'Under-Cabinet Range Hood',
    category: 'range-hood',
    location: 'Frisco, TX',
    image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?q=80&w=400&auto=format&fit=crop',
    description: 'Compact under-cabinet range hood with LED lighting and effective ventilation.',
    tags: ['Under-Cabinet', 'LED Lighting', 'Compact'],
  },
  {
    id: 34,
    title: 'Island Range Hood',
    category: 'range-hood',
    location: 'McKinney, TX',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=400&auto=format&fit=crop',
    description: 'Ceiling-mounted island range hood with ductwork through ceiling.',
    tags: ['Island Mount', 'Ceiling Duct', 'Modern'],
  },
  {
    id: 35,
    title: 'Downdraft Ventilation',
    category: 'range-hood',
    location: 'Lewisville, TX',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=400&auto=format&fit=crop',
    description: 'Pop-up downdraft ventilation system with electrical integration for island cooktop.',
    tags: ['Downdraft', 'Pop-Up', 'Island Cooktop'],
  },
  {
    id: 36,
    title: 'Custom Hood Fabrication',
    category: 'range-hood',
    location: 'Prosper, TX',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400&auto=format&fit=crop',
    description: 'Custom-fabricated copper range hood with concealed electrical and ventilation.',
    tags: ['Custom Copper', 'Fabricated', 'Concealed'],
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
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-[var(--color-surface-900)]">
          <img
            src={project.thumbnail || project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
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
          {/* Project Image */}
          <div className="aspect-video rounded-xl overflow-hidden mb-6">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
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