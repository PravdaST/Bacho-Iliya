'use client';

import { useEffect } from 'react';
import { generateOrganizationSchema, renderSchema } from '@/lib/schema-org';

interface OrganizationSchemaProps {
  baseUrl?: string;
}

/**
 * Organization Schema Component
 *
 * Injects Organization JSON-LD structured data into page head for brand SEO.
 * Helps Google understand your brand identity and social profiles.
 */
export function OrganizationSchema({ baseUrl = 'https://bacho-ilia.eu' }: OrganizationSchemaProps) {
  useEffect(() => {
    // Generate schema
    const schema = generateOrganizationSchema(baseUrl);
    const schemaJSON = renderSchema(schema);

    // Create script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = schemaJSON;
    script.id = 'organization-schema';

    // Inject into head
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById('organization-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [baseUrl]);

  return null; // This component doesn't render anything visible
}
