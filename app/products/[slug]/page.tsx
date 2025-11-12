import { getAllProducts, getProductBySlug } from '@/lib/products-data';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { generateProductMetadata } from '@/lib/metadata';
import { ProductSchema } from '@/components/seo/ProductSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import type { Metadata } from 'next';

// Generate dynamic metadata for each product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: 'Продукт не е намерен',
      description: 'Търсеният продукт не съществува.',
    };
  }

  return generateProductMetadata({ product });
}

// Server Component - resolves async params
export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Get category name for breadcrumb
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      cheese: 'Сирена',
      yogurt: 'Кисели млека',
      drinks: 'Напитки',
      other: 'Млечни продукти',
    };
    return labels[category] || 'Продукти';
  };

  return (
    <>
      {/* SEO: Product Schema.org Structured Data */}
      <ProductSchema product={product} />

      {/* SEO: Breadcrumb Navigation */}
      <BreadcrumbSchema
        breadcrumbs={[
          { name: 'Начало', url: '/' },
          { name: 'Продукти', url: '/products' },
          { name: getCategoryLabel(product.category), url: `/products#${product.category}` },
          { name: product.name }, // Last item without URL
        ]}
      />

      <ProductDetailClient product={product} />
    </>
  );
}

// Generate static paths for all products
export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}
