# Бачо Илия - Next.js Version

This is the Next.js version of the Bulgarian culinary platform for "Бачо Илия" (Bacho Iliya).

## Project Structure

```
nextjs-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   └── quiz/          # Quiz submission API
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/ui/         # All UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and configurations
│   └── shared/                # Shared schemas and types
├── public/                    # Static assets
└── package.json
```

## Features

- ✅ Interactive quiz system with form validation
- ✅ Recipe modal system with animations
- ✅ Product showcase with image galleries
- ✅ Responsive design for all devices
- ✅ Framer Motion animations
- ✅ TypeScript support
- ✅ Tailwind CSS styling
- ✅ Next.js App Router
- ✅ API routes for data handling
- ✅ Email notifications with nodemailer
- ✅ PostgreSQL database integration

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible components
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **TanStack Query** - Data fetching
- **Lucide React** - Icons

## Differences from React Version

- Uses Next.js App Router instead of Wouter
- Server-side rendering capabilities
- Built-in API routes instead of Express server
- Better SEO with metadata API
- Image optimization with Next.js Image component
- File-based routing system

## Deployment

This project is ready for deployment on Vercel, Netlify, or any platform that supports Next.js applications.

```bash
npm run build
npm start
```
