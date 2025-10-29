'use client';

import { useEffect } from 'react';
import type { Product } from '@/lib/products-data';
import { generateProductSchema, renderSchema } from '@/lib/schema-org';

interface ProductSchemaProps {
  product: Product;
  baseUrl?: string;
}

/**
 * Product Schema Component
 *
 * Injects Product JSON-LD structured data into page head for SEO.
 * Rich snippets increase CTR by 30-50% in Google search results.
 */
export function ProductSchema({ product, baseUrl = 'https://bacho-ilia.eu' }: ProductSchemaProps) {
  useEffect(() => {
    // Generate schema
    const schema = generateProductSchema(product, baseUrl);
    const schemaJSON = renderSchema(schema);

    // Create script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = schemaJSON;
    script.id = `product-schema-${product.slug}`;

    // Inject into head
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById(`product-schema-${product.slug}`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [product, baseUrl]);

  return null; // This component doesn't render anything visible
}
