"use client";

import { useEffect } from 'react';
import { generateGiveawayEventSchema, renderSchema } from '@/lib/schema-org';

interface GiveawayEventSchemaProps {
  giveaway: {
    name: string;
    description: string;
    image: string;
    startDate: string; // ISO 8601
    endDate: string; // ISO 8601
  };
  baseUrl?: string;
}

/**
 * Giveaway Event Schema Component
 *
 * Injects Event JSON-LD structured data for giveaway campaigns.
 * Helps Google index your giveaway as an event for better visibility.
 */
export function GiveawayEventSchema({ giveaway, baseUrl = 'https://bacho-ilia.eu' }: GiveawayEventSchemaProps) {
  useEffect(() => {
    // Generate schema
    const schema = generateGiveawayEventSchema(giveaway, baseUrl);
    const schemaJSON = renderSchema(schema);

    // Create script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = schemaJSON;
    script.id = 'giveaway-event-schema';

    // Inject into head
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById('giveaway-event-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [giveaway, baseUrl]);

  return null; // This component doesn't render anything visible
}
