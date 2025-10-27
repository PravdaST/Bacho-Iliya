import { generateTermsMetadata } from '@/lib/metadata';

export const metadata = generateTermsMetadata();

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
