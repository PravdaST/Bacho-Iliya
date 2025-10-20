import { generateProductsPageMetadata } from '@/lib/metadata';

export const metadata = generateProductsPageMetadata();

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
