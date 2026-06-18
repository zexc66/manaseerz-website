export type CityData = {
  slug: string;
  name: string;
  state: 'TX';
  county: string;
  population: string;
  zipCodes: string[];
  distanceFromBase: string;
      neighborhoods: string[];
      intro: string;
  popularServices: string[];
  rating: number;
  reviewCount: number;
};

export const citiesData: CityData[] = [
  {
    slug: 'lewisville',
    name: 'Lewisville',
    state: 'TX',
    county: 'Denton County',
    population: '131,000',
    zipCodes: ['75001', '75029', '75057', '75067', '75077'],
    distanceFromBase: 'Local (HQ)',
    neighborhoods: ['Castle Hills', 'Keystone', 'Valley Ridge', 'Bridlewood', 'Vista Ridge'],
    intro:
      'Manaseerz Electric is proud to call Lewisville home. As your neighborhood electrician, we deliver fast same-day service across all of Lewisville — from Lake Park to Old Town. Our local team knows the area, the codes, and the homes.',
    popularServices: ['ev-charger-installation', 'chandelier-installation', 'electrical-renovation'],
    rating: 5,
    reviewCount: 47,
  },
  {
    slug: 'frisco',
    name: 'Frisco',
    state: 'TX',
    county: 'Collin & Denton Counties',
    population: '210,000',
    zipCodes: ['75033', '75034', '75035', '75036'],
    distanceFromBase: '15 min drive',
    neighborhoods: ['Starwood', 'Newman Village', 'Phillips Creek Ranch', 'The Preserve', 'Halls'],
    intro:
      'Trusted electrician serving Frisco, TX — one of the fastest-growing cities in America. From new construction wiring in Newman Village to EV chargers in Starwood, our licensed team handles Frisco homes with precision.',
    popularServices: ['ev-charger-installation', 'smart-switches', 'chandelier-installation'],
    rating: 5,
    reviewCount: 38,
  },
  {
    slug: 'mckinney',
    name: 'McKinney',
    state: 'TX',
    county: 'Collin County',
    population: '202,000',
    zipCodes: ['75069', '75070', '75071', '75072'],
    distanceFromBase: '25 min drive',
    neighborhoods: ['Stonebridge Ranch', 'Adriatica', 'Craig Ranch', 'Tucker Hill', 'Trinity Falls'],
    intro:
      'Top-rated electrician in McKinney, TX. Whether you live in historic downtown McKinney or a new build in Craig Ranch, we deliver code-compliant electrical work with same-day availability across the city.',
    popularServices: ['electrical-renovation', 'ev-charger-installation', 'outlet-circuit'],
    rating: 5,
    reviewCount: 31,
  },
  {
    slug: 'plano',
    name: 'Plano',
    state: 'TX',
    county: 'Collin County',
    population: '287,000',
    zipCodes: ['75023', '75024', '75025', '75074', '75075', '75093'],
    distanceFromBase: '20 min drive',
    neighborhoods: ['Willow Bend', 'Gleneagles', 'Forest Hills', 'Deerfield', 'Whiffletree'],
    intro:
      'Plano homeowners trust Manaseerz Electric for premium electrical services. From Deerfield to Willow Bend, our licensed electricians deliver reliable same-day service across all of Plano — including legacy homes needing panel upgrades.',
    popularServices: ['outlet-circuit', 'electrical-renovation', 'smart-switches'],
    rating: 5,
    reviewCount: 34,
  },
  {
    slug: 'dallas',
    name: 'Dallas',
    state: 'TX',
    county: 'Dallas County',
    population: '1.3M',
    zipCodes: ['75201', '75205', '75214', '75225', '75230', '75248'],
    distanceFromBase: '35 min drive',
    neighborhoods: ['Highland Park', 'Uptown', 'Lakewood', 'Preston Hollow', 'M Streets'],
    intro:
      'Dallas electrician serving premier neighborhoods from Preston Hollow to Uptown. Our team specializes in luxury chandelier installation, smart home integration, and electrical renovation for Dallas fine homes.',
    popularServices: ['chandelier-installation', 'smart-switches', 'electrical-renovation'],
    rating: 5,
    reviewCount: 42,
  },
  {
    slug: 'prosper',
    name: 'Prosper',
    state: 'TX',
    county: 'Collin County',
    population: '41,000',
    zipCodes: ['75078'],
    distanceFromBase: '25 min drive',
    neighborhoods: ['Windsong', 'Gentle Creek', 'Lakes of La Cima', 'Whitley Place', 'Serenity'],
    intro:
      'Electrician serving Prosper, TX — luxury homes require luxury service. From Windsong ranch estates to Gentle Creek properties, we deliver premium electrical craftsmanship to Prosper homeowners.',
    popularServices: ['ev-charger-installation', 'chandelier-installation', 'electrical-renovation'],
    rating: 5,
    reviewCount: 22,
  },
  {
    slug: 'allen',
    name: 'Allen',
    state: 'TX',
    county: 'Collin County',
    population: '105,000',
    zipCodes: ['75002', '75013'],
    distanceFromBase: '20 min drive',
    neighborhoods: ['Twin Creeks', 'Beacon Hill', 'Star Creek', 'Waterford Crossing', 'Montgomery Farm'],
    intro:
      'Allen TX electrician delivering reliable residential electrical services. From Twin Creeks to Beacon Hill, our licensed pros handle everything from EV chargers to panel upgrades with same-day availability.',
    popularServices: ['ev-charger-installation', 'outlet-circuit', 'smart-switches'],
    rating: 5,
    reviewCount: 27,
  },
  {
    slug: 'carrollton',
    name: 'Carrollton',
    state: 'TX',
    county: 'Denton, Dallas & Collin Counties',
    population: '139,000',
    zipCodes: ['75006', '75007', '75010', '75011'],
    distanceFromBase: '15 min drive',
    neighborhoods: ['Castle Hills', 'Indian Creek', 'Country Place', 'Peters Colony', 'High Country'],
    intro:
      'Carrollton electrician with fast response times across the city. From Old Downtown Carrollton to Castle Hills, our team provides dependable electrical repair, installation, and renovation services.',
    popularServices: ['outlet-circuit', 'electrical-renovation', 'ev-charger-installation'],
    rating: 5,
    reviewCount: 29,
  },
  {
    slug: 'richardson',
    name: 'Richardson',
    state: 'TX',
    county: 'Dallas & Collin Counties',
    population: '121,000',
    zipCodes: ['75080', '75081', '75082', '75083'],
    distanceFromBase: '25 min drive',
    neighborhoods: ['Canyon Creek', 'Heights Park', 'Reservation', 'J.J. Pearce', 'Duck Creek'],
    intro:
      'Richardson TX electrician trusted by homeowners in Canyon Creek, Heights Park, and across the city. From telecom corridor homes to established neighborhoods, we deliver expert electrical service.',
    popularServices: ['outlet-circuit', 'smart-switches', 'range-hood'],
    rating: 5,
    reviewCount: 24,
  },
  {
    slug: 'addison',
    name: 'Addison',
    state: 'TX',
    county: 'Dallas County',
    population: '17,000',
    zipCodes: ['75001'],
    distanceFromBase: '20 min drive',
    neighborhoods: ['Addison Circle', 'Vitruvian West', 'Quorum', 'Midway Road', 'Beltway'],
    intro:
      'Addison electrician serving both residential and small commercial properties. From Addison Circle condos to single-family homes, our licensed team delivers fast, professional electrical service.',
    popularServices: ['smart-switches', 'chandelier-installation', 'outlet-circuit'],
    rating: 5,
    reviewCount: 18,
  },
  {
    slug: 'garland',
    name: 'Garland',
    state: 'TX',
    county: 'Dallas County',
    population: '247,000',
    zipCodes: ['75040', '75041', '75042', '75043', '75044', '75045', '75046', '75047', '75049'],
    distanceFromBase: '35 min drive',
    neighborhoods: ['Firewheel', 'Creek Crossing', 'Campion Trail', 'Wynnewood', 'Eastern Hills'],
    intro:
      'Garland TX electrician serving all neighborhoods from Firewheel to Wynnewood. Our licensed electricians provide reliable residential electrical repairs, installations, and renovations with transparent pricing.',
    popularServices: ['outlet-circuit', 'electrical-renovation', 'range-hood'],
    rating: 5,
    reviewCount: 26,
  },
  {
    slug: 'irving',
    name: 'Irving',
    state: 'TX',
    county: 'Dallas County',
    population: '236,000',
    zipCodes: ['75038', '75039', '75060', '75061', '75062', '75063'],
    distanceFromBase: '30 min drive',
    neighborhoods: ['Las Colinas', 'Valley Ranch', 'Cottonwood Valley', 'Hackberry Creek', 'Campion'],
    intro:
      'Irving electrician trusted by homeowners in Las Colinas, Valley Ranch, and across Irving. From luxury condos to family homes, our team delivers premium electrical service with same-day availability.',
    popularServices: ['smart-switches', 'ev-charger-installation', 'chandelier-installation'],
    rating: 5,
    reviewCount: 23,
  },
  {
    slug: 'flower-mound',
    name: 'Flower Mound',
    state: 'TX',
    county: 'Denton County',
    population: '79,000',
    zipCodes: ['75022', '75028', '75077'],
    distanceFromBase: '15 min drive',
    neighborhoods: ['Wellington', 'Bridlewood', 'Garden Ridge', 'Championship Forest', 'Lantana'],
    intro:
      'Flower Mound electrician serving Wellington, Bridlewood, and all neighborhoods. Our licensed team handles EV chargers, panel upgrades, smart home integration, and full renovations with same-day service.',
    popularServices: ['ev-charger-installation', 'electrical-renovation', 'chandelier-installation'],
    rating: 5,
    reviewCount: 21,
  },
  {
    slug: 'southlake',
    name: 'Southlake',
    state: 'TX',
    county: 'Tarrant County',
    population: '32,000',
    zipCodes: ['76092'],
    distanceFromBase: '25 min drive',
    neighborhoods: ['Timarron', 'Westridge', 'Southridge', 'Myers Meadow', 'Stonegate'],
    intro:
      'Southlake electrician for luxury homes in Timarron, Westridge, and across Southlake. We specialize in high-end chandelier installation, smart home systems, and electrical renovation for premium properties.',
    popularServices: ['chandelier-installation', 'smart-switches', 'electrical-renovation'],
    rating: 5,
    reviewCount: 19,
  },
  {
    slug: 'celina',
    name: 'Celina',
    state: 'TX',
    county: 'Collin & Denton Counties',
    population: '46,000',
    zipCodes: ['75009'],
    distanceFromBase: '30 min drive',
    neighborhoods: ['Light Farms', 'Cypress Creek', 'The Preserve', 'Giles Ranch', 'Carriage Lane'],
    intro:
      'Celina TX electrician serving fast-growing communities like Light Farms and Cypress Creek. Our licensed team installs EV chargers, smart switches, and complete electrical systems for new and existing Celina homes.',
    popularServices: ['ev-charger-installation', 'smart-switches', 'electrical-renovation'],
    rating: 5,
    reviewCount: 16,
  },
  {
    slug: 'the-colony',
    name: 'The Colony',
    state: 'TX',
    county: 'Denton County',
    population: '45,000',
    zipCodes: ['75056'],
    distanceFromBase: '10 min drive',
    neighborhoods: ['The Legends', 'Stewart Peninsula', 'Five Star', 'East Lake Highlands', 'Tennis Club'],
    intro:
      'The Colony electrician delivering fast, reliable service across the city. From Five Star West to Stewart Peninsula, our licensed electricians handle everything from panel upgrades to EV charger installation.',
    popularServices: ['ev-charger-installation', 'outlet-circuit', 'smart-switches'],
    rating: 5,
    reviewCount: 18,
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return citiesData.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): { city: string }[] {
  return citiesData.map((c) => ({ city: c.slug }));
}
