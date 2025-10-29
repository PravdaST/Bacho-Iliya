/**
 * Breadcrumb Schema Component - Google 2025 Compliant
 *
 * Implements BreadcrumbList structured data for Google Search.
 * Shows breadcrumb navigation in search results.
 *
 * Based on schema.org/BreadcrumbList specification.
 */

interface BreadcrumbItem {
  name: string;
  url?: string; // Optional - last item doesn't need URL
}

interface BreadcrumbSchemaProps {
  breadcrumbs: BreadcrumbItem[];
}

export function BreadcrumbSchema({ breadcrumbs }: BreadcrumbSchemaProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bacho-iliya.eu';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => {
      const listItem: any = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      };

      // Only add 'item' field if URL is provided
      if (item.url) {
        listItem.item = item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`;
      }

      return listItem;
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Keep default export for backward compatibility
export default BreadcrumbSchema;
