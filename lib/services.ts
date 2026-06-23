import { services } from './data';

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  priceRange: string;
  icon: string;
  features: string[];
  included: string[];
  process: { step: string; detail: string }[];
  faqs: ServiceFaq[];
}

/**
 * Extended, editorial content for the /services/[id] detail pages.
 * Base fields (title, description, priceRange, icon) come from data.ts so the
 * source of truth stays single; everything below is SEO/supporting copy.
 */
const DETAILS: Record<string, Omit<ServiceDetail, 'id' | 'title' | 'description' | 'priceRange' | 'icon'>> = {
  'chandelier-installation': {
    tagline: 'Luxury lighting, mounted with precision',
    features: [
      'Secure mounting for fixtures up to 150 lbs',
      'Precise ceiling-box and structural support',
      'Clean, hidden wiring with code-compliant connections',
      'Dimmer and smart-control integration',
      'Vaulted and 2-story foyer expertise',
    ],
    included: [
      'On-site assessment and mounting plan',
      'Ceiling box upgrade / reinforcement',
      'Wiring, switch, and dimmer setup',
      'Bulb installation and leveling',
      'Cleanup and 1-year labor warranty',
    ],
    process: [
      { step: 'Assessment', detail: 'We evaluate the fixture weight, ceiling structure, and wiring.' },
      { step: 'Preparation', detail: 'Reinforce the junction box and route clean, hidden wiring.' },
      { step: 'Installation', detail: 'Secure mounting, precise leveling, and electrical connection.' },
      { step: 'Walkthrough', detail: 'Test dimming, align bulbs, and clean up the workspace.' },
    ],
    faqs: [
      { q: 'Do you provide the chandelier?', a: 'We install yours, or recommend trusted suppliers and confirm electrical compatibility before you buy.' },
      { q: 'Can you install on a vaulted ceiling?', a: 'Yes — we regularly install on vaulted ceilings and in 2-story foyers with proper support.' },
      { q: 'How long does installation take?', a: 'Most standard installs take 1–2 hours; heavy or multi-fixtures can take longer.' },
    ],
  },
  'ev-charger-installation': {
    tagline: 'Charge at home, the right way',
    features: [
      'Tesla, ChargePoint, JuiceBox, ClipperCreek & more',
      'Dedicated 240V / Level 2 circuits',
      'Panel evaluation and upgrade when needed',
      'GFCI protection and load calculations',
      'Outdoor-rated, weatherproof installs',
    ],
    included: [
      'Panel capacity and load assessment',
      'Dedicated 40–60A circuit install',
      'Charger mounting and connection',
      'Wi-Fi/app setup for smart chargers',
      'Code compliance and 1-year labor warranty',
    ],
    process: [
      { step: 'Load check', detail: 'Verify your panel can support a dedicated EV circuit.' },
      { step: 'Circuit run', detail: 'Install a dedicated 240V line with proper breaker protection.' },
      { step: 'Mount & connect', detail: 'Mount the charger and make the final connection.' },
      { step: 'Test & configure', detail: 'Confirm charging speed and set up smart features.' },
    ],
    faqs: [
      { q: 'Can you install any EV charger?', a: 'Yes — all major brands including Tesla Wall Connector, ChargePoint, JuiceBox, and ClipperCreek.' },
      { q: 'Do I need a panel upgrade?', a: 'Not always. We assess your panel capacity first and only recommend an upgrade if required for safety.' },
      { q: 'Level 1 or Level 2?', a: 'For daily home charging we recommend Level 2 (240V) for 3–5x faster charging.' },
    ],
  },
  'smart-switches': {
    tagline: 'Modern control of every light',
    features: [
      'WiFi, Z-Wave & Zigbee smart switches',
      'Dimmers, schedules, and scenes',
      'Google Home, Alexa & HomeKit integration',
      'Neutral-wire handling for older homes',
      '3-way and multi-location switching',
    ],
    included: [
      'Switch selection guidance',
      'Safe removal of old switches',
      'Wiring and neutral configuration',
      'App + voice assistant pairing',
      'Scene/automation setup and 1-year warranty',
    ],
    process: [
      { step: 'Plan', detail: 'Choose the right switches for your home and hubs.' },
      { step: 'Install', detail: 'Replace switches with proper wiring and neutral handling.' },
      { step: 'Connect', detail: 'Pair with your WiFi and voice assistants.' },
      { step: 'Automate', detail: 'Set up scenes, schedules, and favorites.' },
    ],
    faqs: [
      { q: 'Which platforms do you support?', a: 'Google Home, Amazon Alexa, Apple HomeKit, Ring, Philips Hue, Lutron Caséta, and more.' },
      { q: 'My home has no neutral wire — can I still upgrade?', a: 'Yes. We use no-neutral-compatible smart switches or run neutrals where practical.' },
      { q: 'Can you automate multiple lights?', a: 'Absolutely — from a single dimmer to whole-home scenes and schedules.' },
    ],
  },
  'outlet-circuit': {
    tagline: 'Safe power where you need it',
    features: [
      'New outlet installation and relocation',
      'GFCI / AFCI protection to code',
      'Dedicated circuits for appliances',
      'Troubleshooting and repair',
      'Whole-home surge protection',
    ],
    included: [
      'Diagnosis of the issue or need',
      'New or replacement outlet/circuit',
      'GFCI/AFCI protection where required',
      'Panel labeling and testing',
      'Cleanup and 1-year labor warranty',
    ],
    process: [
      { step: 'Diagnose', detail: 'Identify the need — new outlet, repair, or dedicated circuit.' },
      { step: 'Plan route', detail: 'Plan clean wiring runs with minimal wall impact.' },
      { step: 'Install', detail: 'Run wiring, install the device, and protect the circuit.' },
      { step: 'Test', detail: 'Verify load, polarity, and GFCI function.' },
    ],
    faqs: [
      { q: 'Do I need GFCI outlets?', a: 'Code requires GFCI in kitchens, baths, garages, and outdoors. We ensure full compliance.' },
      { q: 'Can you add a dedicated circuit for an appliance?', a: 'Yes — microwaves, fridges, freezers, and HVAC units often need dedicated circuits.' },
      { q: 'My outlet stopped working — can you fix it fast?', a: 'Yes, troubleshooting and same-day repair are available across DFW.' },
    ],
  },
  'renovation-electrical': {
    tagline: 'Full-home electrical, done right',
    features: [
      'Whole-home and room rewiring',
      'Kitchen, bath & addition electrical',
      'Coordination with your contractor',
      'Code-compliant, inspection-ready work',
      'Panel and service upgrades',
    ],
    included: [
      'Electrical plan and permitting guidance',
      'Rough-in and device installation',
      'Lighting design and placement',
      'Panel work and circuit mapping',
      'Final walkthrough and 1-year warranty',
    ],
    process: [
      { step: 'Plan', detail: 'Map circuits, loads, and fixture locations with your contractor.' },
      { step: 'Rough-in', detail: 'Run wiring before walls close, inspected for code.' },
      { step: 'Devices', detail: 'Install outlets, switches, and fixtures.' },
      { step: 'Finalize', detail: 'Panel labeling, testing, and walkthrough.' },
    ],
    faqs: [
      { q: 'Do you work with general contractors?', a: 'Yes — we coordinate with GCs, designers, and homeowners to hit timelines and code.' },
      { q: 'How long does a renovation take?', a: 'Depends on scope; we provide a clear schedule during planning.' },
      { q: 'Can you handle the panel upgrade too?', a: 'Yes — service upgrades and panel replacements are part of our renovation work.' },
    ],
  },
  'range-hood': {
    tagline: 'Ventilation wired to code',
    features: [
      'Range hood wiring and switches',
      'Dedicated circuits where required',
      'Proper ventilation hookup',
      'Code-compliant connections',
      'Microwave-hood combinations',
    ],
    included: [
      'Assessment of hood and circuit needs',
      'Wiring and switch installation',
      'Ventilation connection',
      'Testing and cleanup',
      '1-year labor warranty',
    ],
    process: [
      { step: 'Assess', detail: 'Confirm hood type and whether a dedicated circuit is needed.' },
      { step: 'Wire', detail: 'Run clean, code-compliant wiring to the hood.' },
      { step: 'Connect', detail: 'Mount and connect power and ventilation.' },
      { step: 'Test', detail: 'Verify fan speeds, lighting, and venting.' },
    ],
    faqs: [
      { q: 'Does a range hood need a dedicated circuit?', a: 'Often yes for higher-powered hoods; we assess and run one when required by code.' },
      { q: 'Can you install a microwave range hood?', a: 'Yes — over-the-range microwave installs, wiring, and venting.' },
      { q: 'How long does it take?', a: 'Most range-hood wiring jobs are completed in a single visit.' },
    ],
  },
};

export function getServiceDetail(id: string): ServiceDetail | null {
  const base = services.find((s) => s.id === id);
  if (!base) return null;
  const extra = DETAILS[id];
  if (!extra) return null;
  return {
    id: base.id,
    title: base.title,
    description: base.description,
    priceRange: base.priceRange,
    icon: base.icon,
    ...extra,
  };
}

export const allServiceDetails: ServiceDetail[] = services
  .map((s) => getServiceDetail(s.id))
  .filter((d): d is ServiceDetail => d !== null);
