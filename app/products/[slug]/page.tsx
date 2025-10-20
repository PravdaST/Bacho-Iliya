import { getAllProducts, getProductBySlug } from "@/lib/products-data";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { generateProductMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

// Generate dynamic metadata for each product
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

  return <ProductDetailClient product={product} />;
}

// Generate static paths for all products
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}
