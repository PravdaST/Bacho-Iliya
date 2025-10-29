import { generateBlogMetadata } from '@/lib/metadata';

export const metadata = generateBlogMetadata();

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
