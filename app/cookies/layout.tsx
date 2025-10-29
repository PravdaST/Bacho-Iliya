import { generateCookiesMetadata } from '@/lib/metadata';

export const metadata = generateCookiesMetadata();

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
