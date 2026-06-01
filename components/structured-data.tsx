import { services, testimonials, contactInfo } from '@/lib/data';
import enhancedSchema from '../../public/structured-data.jsonld';

export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: 'Manaseerz Electric',
    image: 'https://manaseerz-web.vercel.app/logo.png',
    '@id': 'https://manaseerz-web.vercel.app',
    url: 'https://manaseerz-web.vercel.app',
    telephone: contactInfo.phone.replace(/\D/g, ''),
    email: contactInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lewisville',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '33.0462',
      longitude: '-96.9967',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Dallas-Fort Worth Metroplex',
      },
      ...['Lewisville', 'Frisco', 'McKinney', 'Plano', 'Dallas', 'Prosper', 'Allen', 'Carrollton', 'Richardson', 'Addison', 'Garland', 'Irving', 'Flower Mound', 'Southlake', 'Celina', 'The Colony'].map((city) => ({
        '@type': 'City',
        name: `${city}, TX`,
      })),
    ],
    priceRange: '$100-$3000',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '19:00',
    },
    sameAs: [],
  };

  const serviceSchema = services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Electrician',
      name: 'Manaseerz Electric',
    },
    areaServed: {
      '@type': 'City',
      name: 'Dallas-Fort Worth Metroplex',
    },
  }));

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: testimonials.length,
    bestRating: '5',
    worstRating: '1',
    itemReviewed: {
      '@type': 'Electrician',
      name: 'Manaseerz Electric',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much do your services cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our pricing varies by project type and complexity. Chandelier installation starts at $150, EV charger installation at $300, smart home integration at $100, and complete renovations range from $500-$3,000. We provide free quotes with transparent, no-obligation pricing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How quickly can you respond?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer same-day and next-day availability throughout the DFW metroplex. Emergency services are available 24/7. For standard appointments, we typically can schedule within 1-3 business days depending on your location and project complexity.',
        },
      },
      {
        '@type': 'Question',
        name: 'What cities do you serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We serve the entire Dallas-Fort Worth metroplex including Lewisville, Frisco, McKinney, Plano, Dallas, Prosper, Allen, Carrollton, Richardson, Addison, Garland, Irving, Flower Mound, Southlake, Celina, and The Colony.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are you licensed and insured?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Manaseerz Electric is fully licensed and insured in the state of Texas. Our team consists of certified electrical professionals who undergo regular training to stay current with the latest codes and safety standards.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://manaseerz-web.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://manaseerz-web.vercel.app#services',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {serviceSchema.map((schema, index) => (
        <script
          key={`service-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}