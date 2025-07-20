
"use client";

export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Бачо Илия",
    "description": "Автентични български млечни продукти и традиционни деликатеси",
    "url": "https://bacho-iliya.replit.app",
    "logo": "https://bacho-iliya.replit.app/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BG"
    },
    "sameAs": [],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://bacho-iliya.replit.app#quiz",
      "query-input": "required name=search_term_string"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Бачо Илия - Революцията на истинския вкус",
    "url": "https://bacho-iliya.replit.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://bacho-iliya.replit.app#quiz"
      }
    }
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Бачо Илия",
    "description": "Традиционни български млечни продукти без компромиси",
    "image": "https://bacho-iliya.replit.app/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BG"
    },
    "url": "https://bacho-iliya.replit.app",
    "telephone": "",
    "openingHoursSpecification": [],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "100"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
    </>
  );
}
