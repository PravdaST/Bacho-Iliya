import type { Metadata } from 'next';

const siteUrl = 'https://www.bacho-iliya.eu';

export const metadata: Metadata = {
  title: 'Моите Билети',
  description:
    'Виж билетите си за раздаването на Бачо Илия. Проследи шансовете си за спечелване на автентични български млечни продукти.',
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: `${siteUrl}/my-tickets`,
    siteName: 'Бачо Илия | Bacho Iliya',
    title: 'Моите Билети - Раздаване Бачо Илия',
    description:
      'Виж билетите си и шансовете за спечелване на автентични български млечни продукти от Бачо Илия.',
    images: [
      {
        url: '/game/giveway.webp',
        width: 1344,
        height: 768,
        alt: 'Бачо Илия - Голямо Раздаване на Млечни Продукти',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Моите Билети - Раздаване Бачо Илия',
    description:
      'Виж билетите си и шансовете за спечелване на автентични български млечни продукти от Бачо Илия.',
    images: ['/game/giveway.webp'],
  },
};

export default function MyTicketsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
