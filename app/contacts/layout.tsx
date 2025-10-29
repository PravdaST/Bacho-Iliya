import { generateContactsMetadata } from '@/lib/metadata';

export const metadata = generateContactsMetadata();

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
