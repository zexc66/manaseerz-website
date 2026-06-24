import type { ServiceDetail } from '@/lib/services';

/**
 * Service-specific FAQ structured data (JSON-LD) for /services/[id] pages.
 * Powers Google's FAQ rich results for queries like "EV charger installation
 * faq", which can dramatically improve click-through from search.
 *
 * (The homepage already has a generic FAQ schema via StructuredData; this is
 * the per-service supplement that matches the FAQs actually shown on the page.)
 */
export function ServiceFaqSchema({ service }: { service: ServiceDetail }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
