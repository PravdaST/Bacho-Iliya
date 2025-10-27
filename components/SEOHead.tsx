import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export default function SEOHead({
  title = "Бачо Илия | Bacho Ilia - Автентични Български Млечни Продукти | Безплатно Раздаване",
  description = "Спечелете автентични млечни продукти от Бачо Илия (Bacho Ilia, Bacho Iliya). Истинско българско сирене, кисело мляко и кашкавал по бабините рецепти. 100% естествени продукти без консерванти.",
  canonical = "https://bacho-iliya.eu",
  ogImage = "/bacho-ilia-main.webp"
}: SEOHeadProps) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization Schema
      {
        "@type": "Organization",
        "@id": "https://bacho-iliya.eu/#organization",
        "name": "Бачо Илия",
        "alternateName": ["Bacho Ilia", "Bacho Iliya", "Бачо Илиа", "Bacho Ilija"],
        "url": "https://bacho-iliya.eu",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bacho-iliya.eu/bacho-ilia-main.webp",
          "width": 800,
          "height": 800
        },
        "description": "Производител на автентични български млечни продукти по традиционни рецепти. Бачо Илия предлага сирене, кисело мляко и кашкавал без консерванти и химия.",
        "founder": {
          "@type": "Person",
          "name": "Илия",
          "alternateName": "Бачо Илия"
        },
        "foundingDate": "1995",
        "slogan": "Вкусът от детството на твоята трапеза",
        "areaServed": {
          "@type": "Country",
          "name": "България"
        },
        "knowsAbout": [
          "Българско сирене",
          "Традиционни млечни продукти",
          "Кисело мляко",
          "Кашкавал",
          "Автентична храна"
        ],
        "sameAs": [
          "https://facebook.com/bacho-ilia",
          "https://instagram.com/bacho_ilia"
        ]
      },
      // Product Schema - Sirene
      {
        "@type": "Product",
        "@id": "https://bacho-iliya.eu/#sirene",
        "name": "Българско Сирене Бачо Илия",
        "brand": {
          "@type": "Brand",
          "name": "Бачо Илия",
          "alternateName": ["Bacho Ilia", "Bacho Iliya"]
        },
        "description": "Автентично българско сирене, направено по бабини рецепти. 100% естествено, без консерванти и химия. Истинският вкус от детството.",
        "category": "Млечни продукти",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "BGN"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "2500",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      // WebSite Schema
      {
        "@type": "WebSite",
        "@id": "https://bacho-iliya.eu/#website",
        "url": "https://bacho-iliya.eu",
        "name": "Бачо Илия - Автентични Български Млечни Продукти",
        "alternateName": "Bacho Ilia",
        "description": "Традиционни български млечни продукти без консерванти",
        "inLanguage": "bg-BG",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://bacho-iliya.eu/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      // Promotion/Offer Schema for Giveaway
      {
        "@type": "PromotionOffer",
        "name": "Безплатно Раздаване на Продукти Бачо Илия",
        "description": "Спечелете автентични млечни продукти от Бачо Илия напълно безплатно. Изберете продукти и се регистрирайте за участие.",
        "availabilityStarts": new Date().toISOString(),
        "availabilityEnds": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        "eligibleRegion": {
          "@type": "Country",
          "name": "България"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "0",
          "priceCurrency": "BGN"
        }
      },
      // FAQPage Schema
      {
        "@type": "FAQPage",
        "@id": "https://bacho-iliya.eu/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Какви продукти прави Бачо Илия?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Бачо Илия произвежда автентични български млечни продукти включително сирене, кисело мляко, кашкавал и други традиционни продукти по бабини рецепти."
            }
          },
          {
            "@type": "Question",
            "name": "Има ли консерванти в продуктите на Бачо Илия?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Не, всички продукти на Бачо Илия са 100% естествени, без консерванти и химия. Правени са точно както бабините традиционни рецепти."
            }
          },
          {
            "@type": "Question",
            "name": "Как мога да спечеля продукти от Бачо Илия?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Участвайте в нашето безплатно раздаване като изберете продукти, регистрирате се и завършите задачите. Обявяването на печелившите е до 7 дни."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
