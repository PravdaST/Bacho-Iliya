import { generateWhereToBuyMetadata } from '@/lib/metadata';

export const metadata = generateWhereToBuyMetadata();

export default function WhereToBuyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
