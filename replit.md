# Bulgarian Farm Products Webapp - Replit Documentation

## Overview

This is a React + Express.js full-stack web application for "Bacho Iliya" (Бачо Илия), a Bulgarian farm products brand. The application features a landing page with an interactive quiz system that collects user preferences about dairy products and traditional Bulgarian foods. The site promotes authentic, traditional Bulgarian dairy products with a focus on quality and heritage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: React Hook Form for forms, TanStack Query for server state
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Module System**: ES modules (type: "module")
- **API Design**: RESTful endpoints under `/api` prefix
- **Request Handling**: JSON and URL-encoded form data support
- **Error Management**: Centralized error handling middleware

### Key Components

#### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (via Neon serverless)
- **Schema Management**: Type-safe schema definitions in `shared/schema.ts`
- **Migrations**: Drizzle migrations in `./migrations` directory

#### Data Models
- **Users**: Basic user authentication schema (id, username, password)
- **Quiz Responses**: Survey data collection (city, weapon preference, motivation, email, user agent, timestamp)

#### Storage Implementation
- **Interface**: `IStorage` abstraction for data operations
- **Current**: PostgreSQL database storage (`DatabaseStorage`) for production
- **Database**: Neon serverless PostgreSQL with Drizzle ORM integration
- **Migration**: Migrated from in-memory storage to persistent database (January 2025)

#### API Endpoints
- `POST /api/quiz`: Submit quiz responses with validation
- `GET /api/quiz/responses`: Get all quiz responses (admin)
- `GET /api/quiz/responses/:city`: Filter responses by city

## Data Flow

1. **Client Form Submission**: User fills out quiz form with city, weapon preference, motivation, and email
2. **Client-Side Validation**: Zod schema validation before submission
3. **API Request**: TanStack Query mutation sends data to Express backend
4. **Server Validation**: Backend validates data using shared Zod schema
5. **Data Storage**: Response stored in PostgreSQL database with Drizzle ORM
6. **Response Handling**: Success/error feedback displayed to user via toast notifications

## External Dependencies

### Frontend Libraries
- **UI Framework**: React 18 with Radix UI components
- **Styling**: Tailwind CSS with custom color palette
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Native fetch with TanStack Query wrapper
- **Icons**: Lucide React icon library

### Backend Libraries
- **Database**: Neon serverless PostgreSQL with Drizzle ORM
- **Validation**: Zod for schema validation (shared between frontend/backend)
- **Session Storage**: connect-pg-simple for PostgreSQL session store

### Development Tools
- **Build**: Vite for frontend, esbuild for backend
- **TypeScript**: Strict mode with path mapping
- **Development**: tsx for TypeScript execution, automatic reload

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Static Assets**: Frontend assets served by Express in production

### Environment Configuration
- **Development**: Vite dev server with HMR, tsx for backend
- **Production**: Single Node.js process serving both API and static files
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Replit Integration
- **Development Banner**: Replit development banner for external access
- **Runtime Error Modal**: Vite plugin for better error reporting
- **Cartographer**: Replit's code analysis tool integration

### File Structure Organization
- **Monorepo**: Single repository with client, server, and shared code
- **Shared Schema**: Database schemas and validation shared between frontend/backend
- **Path Aliases**: TypeScript path mapping for clean imports
- **Asset Management**: Separate directory for static assets with Vite alias

The application is designed as a marketing website with lead generation capabilities, collecting user preferences through an engaging quiz format while promoting traditional Bulgarian dairy products.

## Recent Changes

**January 2025 - Next.js Migration Session**:
- ✓ Completed 1:1 migration from React to Next.js in `nextjs-app/` folder
- ✓ All 55 UI components migrated with identical functionality and animations
- ✓ Added "use client" directives for Next.js App Router compatibility
- ✓ Implemented Next.js API routes for quiz submission system
- ✓ Preserved all Framer Motion animations and interactive features
- ✓ Configured SEO metadata and Open Graph tags for better social sharing
- ✓ Maintained PostgreSQL database integration with Drizzle ORM
- ✓ All recipe modals, product galleries, and form validations working
- ✓ Responsive design and mobile optimization preserved
- ✓ Ready for deployment with npm run dev/build commands

**January 2025 - Previous Session**:
- ✓ Implemented comprehensive Framer Motion animations across all sections
- ✓ Added interactive hover effects, micro-animations, and scroll-triggered animations  
- ✓ Created floating action buttons for improved user engagement
- ✓ Enhanced visual design with gradients, blur effects, and decorative elements

- ✓ Updated header navigation and footer to use specific red color #E22526 with white text
- ✓ Replaced text logo with actual logo image from client/logo/logo.png
- ✓ Removed sticky positioning from header navigation
- ✓ All sections now feature professional animations: Hero, About, Quiz, Recipes, Products, Footer

- ✓ Completed comprehensive mobile and tablet responsive design overhaul
- ✓ Implemented modern mobile-first approach with touch-friendly interactions
- ✓ Added adaptive grid layouts: 1 column mobile, 2 columns tablet, 3+ columns desktop
- ✓ Enhanced typography scaling across all breakpoints (text-3xl sm:text-4xl lg:text-5xl xl:text-6xl)
- ✓ Added touch manipulation classes and improved mobile touch targets
- ✓ Optimized spacing and padding for mobile (py-12 sm:py-16 lg:py-20)
- ✓ Enhanced mobile navigation with larger touch targets and improved hamburger menu

- ✓ Made quiz form fully functional with PostgreSQL database integration
- ✓ Quiz responses are collected and stored persistently in database
- ✓ All form validation works properly with user-friendly error messages
- ✓ Success screen displays after successful form submission
- ✓ Admin endpoints available to view collected quiz responses

- ✓ Enhanced recipes section with authentic Bulgarian food images and complete recipes
- ✓ Added functional recipe modal popup with full ingredients and cooking instructions  
- ✓ Implemented beautiful modal design with animations, prep time, and serving info
- ✓ Fixed all color contrast issues and text readability across all sections
- ✓ Made floating action buttons consistent in size with red color scheme

**January 2025 - Previous Session**:
- ✓ Migrated from in-memory storage to PostgreSQL database
- ✓ Implemented DatabaseStorage class with Drizzle ORM
- ✓ Added database connection with Neon serverless PostgreSQL
- ✓ Applied database schema with `npm run db:push`
- ✓ Quiz responses now persistently stored in database