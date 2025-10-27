import { generatePrivacyMetadata } from '@/lib/metadata';

export const metadata = generatePrivacyMetadata();

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
