import { generateRecipesPageMetadata } from '@/lib/metadata';

export const metadata = generateRecipesPageMetadata();

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
