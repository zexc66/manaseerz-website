// ─────────────────────────────────────────────────────────────────────────
// Service-area city data for /service-area/[city] landing pages.
// Each city MUST have genuinely unique copy (blurb + FAQs) — thin/duplicate
// "Electrician in {City}" pages get filtered by Google. Keep these specific
// and locally grounded (real neighborhoods, real geography).
// ─────────────────────────────────────────────────────────────────────────

export type CityFaq = { q: string; a: string };

export type City = {
  /** URL slug, lowercase, hyphenated. */
  slug: string;
  /** Display name, no state. e.g. "Frisco" */
  name: string;
  /** County/ies for local grounding. */
  county: string;
  /** 1–2 unique sentences explaining our presence in this specific city. */
  blurb: string;
  /** Real neighborhoods / master-planned communities we serve here. */
  neighborhoods: string[];
  /** City-specific FAQs (unique angles, not just name-swapped). */
  faqs: CityFaq[];
};

export const allCities: City[] = [
  {
    slug: 'lewisville',
    name: 'Lewisville',
    county: 'Denton County',
    blurb:
      'Lewisville is our home base — our trucks leave from here every morning, which means the fastest possible response times for electrical work anywhere along I-35E and the Lake Lewisville corridor.',
    neighborhoods: ['Castle Hills', 'Thrive', 'Lakewood North', 'The Vista', 'Valley Vista'],
    faqs: [
      {
        q: 'How fast can an electrician get to my Lewisville home?',
        a: 'Because we are based in Lewisville, same-day service is the norm for most calls. Emergencies are typically on-site within 60–90 minutes depending on traffic on I-35E and SH 121.',
      },
      {
        q: 'Do you pull permits for electrical work in Lewisville?',
        a: 'Yes. We pull all required permits through the City of Lewisville Building Inspection division and schedule inspections on your behalf — every panel upgrade, EV charger, and rewire is signed off by the city.',
      },
      {
        q: 'Can you install an EV charger in a Lewisville garage?',
        a: 'Absolutely. We install Tesla Wall Connectors, ChargePoint, and NEMA 14-50 outlets across Lewisville, including dedicated 240V circuits and panel upgrades where the existing 100A service cannot support a charger.',
      },
      {
        q: 'Are you licensed to work in Denton County?',
        a: 'Yes — we are a Texas-licensed and insured electrical contractor (TECL) serving Lewisville and all of Denton County, with a 1-year labor warranty on every installation.',
      },
    ],
  },
  {
    slug: 'frisco',
    name: 'Frisco',
    county: 'Collin & Denton Counties',
    blurb:
      'Frisco is one of the fastest-growing cities in the country, and its luxury new-builds in Starwood, Newman Village, and The Fields demand premium electrical work — from crystal chandeliers to whole-home automation.',
    neighborhoods: ['Starwood', 'Newman Village', 'The Fields at Westin', 'Chapel Creek', 'Phillips Creek Ranch'],
    faqs: [
      {
        q: 'Do you install lighting and wiring for new Frisco luxury builds?',
        a: 'Yes. We regularly partner with homeowners and builders in Frisco master-planned communities to install chandeliers, recessed lighting, smart panels, and EV chargers in new construction and pre-drywall renovations.',
      },
      {
        q: 'How long does an EV charger install take in Frisco?',
        a: 'A straightforward Tesla Wall Connector or NEMA 14-50 install with an adequate panel typically takes 2–4 hours. If your Frisco home needs a 100A→200A panel upgrade first, plan on a full day.',
      },
      {
        q: 'Can you upgrade my Frisco home for a Level 2 EV charger?',
        a: 'Yes. We assess your panel capacity, add a dedicated 240V circuit, and handle any required service upgrade so your Frisco garage is EV-ready and code-compliant.',
      },
      {
        q: 'Do you do smart-home wiring in Frisco?',
        a: 'We install Lutron Caséta, whole-home dimmers, and automation hubs throughout Frisco — including voice-controlled lighting scenes and integration with Google Home and Apple HomeKit.',
      },
    ],
  },
  {
    slug: 'mckinney',
    name: 'McKinney',
    county: 'Collin County',
    blurb:
      "From the historic square to the large-lot estates of Craig Ranch and Stonebridge Ranch, McKinney homeowners count on us for everything from knob-and-tube retrofits to modern smart-panel upgrades.",
    neighborhoods: ['Craig Ranch', 'Stonebridge Ranch', 'Adriatica', 'Tucker Hill', 'Trinity Falls'],
    faqs: [
      {
        q: 'Can you rewire an older McKinney home near the historic square?',
        a: 'Yes. Many McKinney homes near downtown still have aging or knob-and-tube wiring. We perform complete whole-house rewires with minimal wall disruption and bring everything up to current NEC code.',
      },
      {
        q: 'Do you install outdoor lighting in McKinney neighborhoods?',
        a: 'We install landscape lighting, security floodlights, and patio outlets across Stonebridge Ranch, Craig Ranch, and greater McKinney — all weather-rated and GFCI-protected.',
      },
      {
        q: 'Are you available for electrical emergencies in McKinney?',
        a: 'Yes. We offer priority emergency response throughout McKinney for outages, sparking outlets, burning-smell panels, and tripped breakers that will not reset.',
      },
      {
        q: 'Can you add circuits for a McKinney home addition or ADU?',
        a: 'We handle full electrical for additions, garage conversions, and ADUs in McKinney — including sub-panel installation, new circuits, and rough-in to finish.',
      },
    ],
  },
  {
    slug: 'plano',
    name: 'Plano',
    county: 'Collin County',
    blurb:
      'Plano’s established neighborhoods and corporate-executive homes keep us busy with panel upgrades, kitchen-and-bathroom remodels, and the high-end chandelier work that finished basements and two-story foyers demand.',
    neighborhoods: ['Willow Bend', 'Whiffletree', 'Forest Creek', 'Kings Ridge', 'Deerfield'],
    faqs: [
      {
        q: 'Can you upgrade a 1970s/80s Plano home’s electrical panel?',
        a: 'Yes. Many Plano homes built in the 70s–80s still have 100A or Federal Pacific panels. We upgrade to modern 200A service with surge protection to safely handle today’s loads.',
      },
      {
        q: 'Do you install kitchen remodel wiring in Plano?',
        a: 'We wire full kitchen remodels across Plano — island circuits, under-cabinet lighting, dedicated appliance circuits, range hood wiring, and GFCI protection, all inspected and permitted.',
      },
      {
        q: 'How much does a chandelier install cost in Plano?',
        a: 'Chandelier installation in Plano typically runs $150–$500 depending on weight, ceiling height, and whether a new junction box or switch is needed. Heavy crystal fixtures over foyers are at the higher end.',
      },
      {
        q: 'Can you add EV charging to my Plano garage?',
        a: 'Yes — Tesla, ChargePoint, and universal Level 2 chargers, including the panel upgrades many older Plano homes need before a charger can be added safely.',
      },
    ],
  },
  {
    slug: 'dallas',
    name: 'Dallas',
    county: 'Dallas County',
    blurb:
      "In Dallas we’re known for high-end work in Preston Hollow, the M-Streets, and Uptown — estate-scale panel upgrades, designer chandeliers, and renovation electrical where craftsmanship has to match the architecture.",
    neighborhoods: ['Preston Hollow', 'Highland Park area', 'M-Streets (Lower Greenville)', 'Uptown', 'Lakewood'],
    faqs: [
      {
        q: 'Do you serve inside-the-loop Dallas neighborhoods?',
        a: 'Yes. We work throughout Preston Hollow, the M-Streets, Lakewood, and Uptown — including older Dallas homes that need careful rewiring to preserve plaster and original fixtures.',
      },
      {
        q: 'Can you handle electrical for a whole-home Dallas renovation?',
        a: 'We manage complete electrical for Dallas renovations — from rewire and panel relocation to smart-home rough-in, lighting design, and final trim-out, coordinating with your GC and designer.',
      },
      {
        q: 'Do you install whole-home generators in Dallas?',
        a: 'We install the electrical side of standby generators across Dallas — transfer switches, the dedicated generator circuit, and load management so your home stays powered during outages.',
      },
      {
        q: 'Are you licensed for commercial work in Dallas?',
        a: 'Our focus is premium residential electrical. For Dallas homeowners we handle everything from a single dimmer to a full estate rewire; we will happily refer true commercial projects.',
      },
    ],
  },
  {
    slug: 'prosper',
    name: 'Prosper',
    county: 'Collin County',
    blurb:
      'Prosper’s acreage properties and custom estates — Windsong, Whispering Farms, and the new Gentle Creek — need electricians who understand large footprints, long driveway runs, and oversized service panels.',
    neighborhoods: ['Windsong Ranch', 'Whispering Farms', 'Gentle Creek', 'Lakes at La Cima', 'Saddle Creek'],
    faqs: [
      {
        q: 'Do you install electrical for large Prosper estate homes?',
        a: 'Yes. Prosper’s custom homes often need 320A or 400A service, sub-panels in detached garages or barns, and long circuit runs — all of which we design and install to code.',
      },
      {
        q: 'Can you wire outdoor living spaces and pools in Prosper?',
        a: 'We handle outdoor kitchens, pool equipment, landscape lighting, and large patio setups common on Prosper lots — all weatherproof, GFCI-protected, and trenching where required.',
      },
      {
        q: 'Do you install EV chargers for multi-car Prosper garages?',
        a: 'Yes. We design dual- and multi-charger setups with proper load calculations so a Prosper household can charge two or more EVs without overloading the panel.',
      },
      {
        q: 'How far is the drive to Prosper, and is there a travel fee?',
        a: 'Prosper is within our standard DFW service area — no travel fee. Same-day and next-day appointments are both typically available.',
      },
    ],
  },
  {
    slug: 'allen',
    name: 'Allen',
    county: 'Collin County',
    blurb:
      'Allen families know us for fast, clean residential work — EV chargers for the Twin Creeks and Waterford crossings crowd, smart switches, and panel upgrades across the city’s well-established subdivisions.',
    neighborhoods: ['Twin Creeks', 'Waterford Crossing', 'Lost Creek Ranch', 'Star Creek', 'Montgomery Farm'],
    faqs: [
      {
        q: 'Can you install a Tesla Wall Connector in Allen?',
        a: 'Yes. Tesla Wall Connectors are one of our most common Allen installs — we handle the 240V circuit, breaker sizing, and any panel upgrade, usually in a single visit.',
      },
      {
        q: 'Do you install USB-C and smart outlets in Allen homes?',
        a: 'We install modern USB-C/USB-A outlets, smart dimmers, and Lutron switches throughout Allen — great for home offices, kitchens, and kids’ rooms.',
      },
      {
        q: 'Can you fix outlets that keep tripping in my Allen home?',
        a: 'Tripping GFCIs or breakers usually point to an overloaded circuit or a ground fault. We diagnose and repair these across Allen daily, including hidden junction-box issues.',
      },
      {
        q: 'Do you offer evening or weekend appointments in Allen?',
        a: 'We offer flexible scheduling across Allen and Collin County, including some evening and Saturday windows. Emergency calls are prioritized 24/7.',
      },
    ],
  },
  {
    slug: 'carrollton',
    name: 'Carrollton',
    county: 'Dallas, Denton & Collin Counties',
    blurb:
      'Carrollton’s central location and mix of mid-century and newer homes make it a regular stop — panel upgrades, kitchen remodels, and the EV-charger installs that the city’s three-county crossroads keeps in high demand.',
    neighborhoods: ['Indian Creek', 'Oakwood Estates', 'Castlewood', 'Coyote Ridge', 'Huffman'],
    faqs: [
      {
        q: 'Do you serve all three Carrollton counties?',
        a: 'Yes. Carrollton spans Dallas, Denton, and Collin counties, and we are licensed and familiar with the permitting differences across all three for your project.',
      },
      {
        q: 'Can you upgrade my Carrollton home’s electrical panel?',
        a: 'We replace aging or undersized panels across Carrollton with modern 200A service, including whole-home surge protection and dedicated circuits for modern loads.',
      },
      {
        q: 'Do you install lighting for Carrollton kitchen remodels?',
        a: 'We wire Carrollton kitchen remodels end-to-end: recessed lighting, under-cabinet LEDs, island pendants, range hoods, and dedicated appliance circuits.',
      },
      {
        q: 'How quickly can you get to Carrollton?',
        a: 'Carrollton is minutes from our Lewisville base. Same-day service is available for most calls, with emergency response typically under 90 minutes.',
      },
    ],
  },
  {
    slug: 'richardson',
    name: 'Richardson',
    county: 'Dallas & Collin Counties',
    blurb:
      'Richardson’s mature trees and tech-savvy homeowners keep us busy with whole-home rewires, smart lighting, and panel upgrades — plus careful work in the older homes near the Telecom Corridor.',
    neighborhoods: ['Heights Park', 'Canyon Creek', 'Berkner', 'Richardson Heights', 'Mohawk'],
    faqs: [
      {
        q: 'Can you rewire an older Richardson home?',
        a: 'Yes. Many Richardson homes near the Telecom Corridor predate modern loads. We perform whole-house and partial rewires with minimal drywall damage.',
      },
      {
        q: 'Do you install smart-home systems in Richardson?',
        a: 'We install Lutron, smart dimmers, Ecobee and Nest wiring, and automation hubs throughout Richardson — popular with the area’s tech professionals.',
      },
      {
        q: 'Can you add a sub-panel for a Richardson home addition?',
        a: 'Yes. We size and install sub-panels for Richardson additions, garage conversions, and backyard ADUs, including the feeder circuit and grounding.',
      },
      {
        q: 'Do you install EV chargers in Richardson?',
        a: 'We install Level 2 EV chargers across Richardson, including the panel assessments and upgrades many 1960s-era homes need first.',
      },
    ],
  },
  {
    slug: 'addison',
    name: 'Addison',
    county: 'Dallas County',
    blurb:
      'Addison’s townhomes, restaurants, and residential pockets around Addison Circle keep us on quick-response calls — panel work, lighting, and code upgrades where density and tight schedules matter.',
    neighborhoods: ['Addison Circle', 'Vitruvian West', 'Midway Meadows', 'Beltway Plaza'],
    faqs: [
      {
        q: 'Can you do electrical work in Addison townhomes and condos?',
        a: 'Yes. We are experienced with the shared-panel and common-wall considerations of Addison townhomes and condos, and we coordinate with HOAs where needed.',
      },
      {
        q: 'Do you install lighting for Addison kitchens and foyers?',
        a: 'We install pendants, chandeliers, recessed lighting, and under-cabinet LEDs across Addison homes and restaurant-adjacent residential units.',
      },
      {
        q: 'How fast can an electrician reach Addison?',
        a: 'Addison is minutes south of our Lewisville base via the Dallas North Tollway. Same-day service is typically available.',
      },
      {
        q: 'Do you handle electrical for Addison restaurant build-outs?',
        a: 'Our focus is premium residential. For Addison homeowners and residential landlords we are fully equipped; we refer pure commercial/restaurant build-outs to trusted partners.',
      },
    ],
  },
  {
    slug: 'garland',
    name: 'Garland',
    county: 'Dallas County',
    blurb:
      'Garland’s large, established neighborhoods — from Firewheel to the lake-area homes — call us for panel upgrades, whole-house rewires, and the outdoor and pool-area electrical that North Garland lots are built for.',
    neighborhoods: ['Firewheel', 'Lake Ray Hubbard area', 'Eastern Hills', 'Brentwood', 'Club Hill'],
    faqs: [
      {
        q: 'Can you wire a Garland backyard pool or outdoor kitchen?',
        a: 'Yes. We install pool equipment circuits, landscape lighting, and outdoor kitchen power across Garland — all GFCI-protected, weather-rated, and trench-ready.',
      },
      {
        q: 'Do you rewire older Garland homes?',
        a: 'Many Garland homes from the 60s–70s need wiring upgrades. We perform whole-house and targeted rewires, including panel and grounding upgrades.',
      },
      {
        q: 'Can you install a Level 2 EV charger in Garland?',
        a: 'We install Tesla and universal Level 2 chargers across Garland, including panel upgrades where the original service is too small.',
      },
      {
        q: 'Do you offer emergency electrical service in Garland?',
        a: 'Yes — priority emergency response for Garland outages, burning smells, sparking, and breakers that will not hold.',
      },
    ],
  },
  {
    slug: 'irving',
    name: 'Irving',
    county: 'Dallas County',
    blurb:
      'From Las Colinas high-rises to the established single-family streets of Valley Ranch, Irving’s mix of housing means we handle everything from condo panel work to whole-home rewires and designer lighting.',
    neighborhoods: ['Las Colinas', 'Valley Ranch', 'Cotton Creek', 'Hackberry Creek', 'Carpenter Park'],
    faqs: [
      {
        q: 'Do you serve the Las Colinas and Valley Ranch areas of Irving?',
        a: 'Yes. We work throughout Las Colinas and Valley Ranch — including condos and townhomes where panel access and HOA rules require an experienced electrician.',
      },
      {
        q: 'Can you install smart lighting in an Irving condo?',
        a: 'We install smart dimmers, Lutron systems, and automation in Irving condos and single-family homes, including units with shared electrical infrastructure.',
      },
      {
        q: 'Do you upgrade electrical panels in Irving?',
        a: 'We replace undersized or outdated Irving panels with modern 200A service and surge protection, permitted through the City of Irving.',
      },
      {
        q: 'How fast can you reach Irving?',
        a: 'Irving is within our standard DFW service area with no travel fee. Same-day service is available for most calls.',
      },
    ],
  },
  {
    slug: 'flower-mound',
    name: 'Flower Mound',
    county: 'Denton County',
    blurb:
      'Flower Mound’s hills, large lots, and lakeside homes — Bridlewood, Wellington, and the River Walk — call for premium electrical: estate panel upgrades, outdoor living, and high-end lighting at scale.',
    neighborhoods: ['Bridlewood', 'Wellington', 'The River Walk at Town Center', 'Cherry Tree', 'Garden Ridge'],
    faqs: [
      {
        q: 'Do you install electrical for large Flower Mound estates?',
        a: 'Yes. Flower Mound’s larger homes often need 320A+ service, multiple sub-panels, and long runs to outbuildings — we design and install it all to code.',
      },
      {
        q: 'Can you wire outdoor kitchens and patios in Flower Mound?',
        a: 'We install outdoor kitchens, pergola lighting, pool equipment, and weatherproof patio outlets across Flower Mound’s outdoor-living-focused homes.',
      },
      {
        q: 'Do you install EV chargers in Flower Mound?',
        a: 'Yes — Tesla Wall Connectors, ChargePoint, and NEMA 14-50, including the panel upgrades many Flower Mound garages need first.',
      },
      {
        q: 'Can you install a whole-home generator in Flower Mound?',
        a: 'We handle the electrical side of standby generators in Flower Mound — automatic transfer switch, dedicated circuit, and load management.',
      },
    ],
  },
  {
    slug: 'southlake',
    name: 'Southlake',
    county: 'Tarrant County',
    blurb:
      'Southlake is synonymous with luxury — Timarron, Westlake-adjacent estates, and Southlake Town Square residences where the standard is designer chandeliers, full automation, and flawless panel work.',
    neighborhoods: ['Timarron', 'Southlake Woods', 'Estes Crossing', 'Myrtle Springs', 'Laurelmere'],
    faqs: [
      {
        q: 'Do you install high-end chandeliers in Southlake homes?',
        a: 'Yes. Southlake foyers and dining rooms demand heavy, multi-tier crystal fixtures — we install them with rated junction boxes, dimmers, and proper support for high ceilings.',
      },
      {
        q: 'Can you wire a full smart-home automation system in Southlake?',
        a: 'We design and install whole-home automation across Southlake — Lutron lighting, multi-zone control, and integration with voice assistants and security.',
      },
      {
        q: 'Do you upgrade panels for Southlake estates?',
        a: 'Southlake’s larger homes frequently need 320A/400A service or sub-panels for additions. We design, permit, and install these upgrades through the City of Southlake.',
      },
      {
        q: 'Can you install multi-EV charging for a Southlake garage?',
        a: 'Yes. We engineer dual- and multi-charger garage setups with load balancing so a Southlake household can charge several EVs at once.',
      },
    ],
  },
  {
    slug: 'celina',
    name: 'Celina',
    county: 'Collin County',
    blurb:
      'Celina is booming — Light Farms, Mustang Lakes, and Del Webb — and the new construction here means fresh electrical: smart-home rough-ins, EV chargers, and pre-drywall lighting plans done right from day one.',
    neighborhoods: ['Light Farms', 'Mustang Lakes', 'Del Webb', 'Lyndhurst', 'The Fields'],
    faqs: [
      {
        q: 'Do you install electrical in brand-new Celina homes?',
        a: 'Yes. We work with Celina homeowners and builders on smart-home rough-ins, recessed lighting, EV chargers, and panel prep — ideally before drywall goes up.',
      },
      {
        q: 'Can you add an EV charger to a new Celina build?',
        a: 'Many Celina builds come EV-ready; we install the Tesla or universal charger and dedicated circuit, or add the panel capacity if it was not pre-wired.',
      },
      {
        q: 'Do you install smart switches and lighting in Celina?',
        a: 'We install Lutron, smart dimmers, and automation throughout new Celina communities, including multi-zone scene control.',
      },
      {
        q: 'Is Celina within your service area?',
        a: 'Yes — Celina is within our standard DFW service area with no travel fee. Same-day and next-day appointments are both typically available.',
      },
    ],
  },
  {
    slug: 'the-colony',
    name: 'The Colony',
    county: 'Denton County',
    blurb:
      "The Colony — between Lake Lewisville and Frisco, home of Grandscape — is a quick run from our Lewisville base, so response times are short for panel upgrades, EV chargers, and lighting throughout the city.",
    neighborhoods: ['The Legends', 'Eastlake', 'Stewart Peninsula', 'Bridgeway', '5ive Tower area'],
    faqs: [
      {
        q: 'How fast can you reach The Colony?',
        a: 'The Colony borders our Lewisville base, so same-day service is almost always available and emergency response is typically under an hour.',
      },
      {
        q: 'Do you install EV chargers in The Colony?',
        a: 'Yes — Tesla Wall Connectors, ChargePoint, and NEMA 14-50 outlets across The Colony, including panel upgrades where needed.',
      },
      {
        q: 'Can you upgrade an electrical panel in The Colony?',
        a: 'We replace undersized or aging panels with modern 200A service and surge protection, permitted through the City of The Colony.',
      },
      {
        q: 'Do you install lighting for The Colony homes near Grandscape?',
        a: 'We install chandeliers, recessed lighting, smart switches, and outdoor lighting throughout The Colony, including the newer builds near Grandscape.',
      },
    ],
  },
];

// Curated geographic adjacency (only cities we serve) for internal linking.
// Filtered at runtime so every link resolves to a real city page.
const ADJACENCY: Record<string, string[]> = {
  lewisville: ['the-colony', 'flower-mound', 'carrollton', 'frisco'],
  frisco: ['the-colony', 'plano', 'mckinney', 'prosper', 'lewisville'],
  mckinney: ['frisco', 'allen', 'prosper', 'celina'],
  plano: ['richardson', 'allen', 'frisco', 'carrollton'],
  dallas: ['richardson', 'garland', 'irving', 'addison'],
  prosper: ['frisco', 'celina', 'mckinney'],
  allen: ['mckinney', 'plano', 'frisco'],
  carrollton: ['addison', 'lewisville', 'plano', 'the-colony'],
  richardson: ['plano', 'dallas', 'garland', 'addison', 'carrollton'],
  addison: ['carrollton', 'dallas', 'richardson'],
  garland: ['dallas', 'richardson'],
  irving: ['dallas', 'addison'],
  'flower-mound': ['lewisville', 'carrollton'],
  southlake: ['flower-mound', 'irving'],
  celina: ['prosper', 'frisco', 'mckinney'],
  'the-colony': ['frisco', 'lewisville', 'carrollton', 'plano'],
};

const BY_SLUG = new Map(allCities.map((c) => [c.slug, c]));

export function getCity(slug: string): City | undefined {
  return BY_SLUG.get(slug);
}

/** Nearby served cities, limited and all guaranteed to resolve. */
export function getNearbyCities(slug: string): City[] {
  const slugs = ADJACENCY[slug] ?? [];
  return slugs.map((s) => BY_SLUG.get(s)).filter((c): c is City => Boolean(c));
}

export const citySlugs = allCities.map((c) => c.slug);

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
