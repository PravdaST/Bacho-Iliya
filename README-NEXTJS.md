# Бачо Илия - Next.js Version

## Как да стартирате Next.js версията

1. **Инсталирайте Next.js** (ако не е инсталиран):
   ```bash
   npm install next@latest
   ```

2. **Създайте нов Next.js workflow**:
   - В Replit създайте нов workflow с команда: `npm run next:dev`

3. **Стартирайте сървъра**:
   ```bash
   npm run next:dev
   ```
   
   Или директно:
   ```bash
   npx next dev
   ```

## Файлова структура

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── api/
│       └── quiz/
│           └── route.ts   # API endpoint за quiz
├── components/            # React components
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── QuizSection.tsx
│   ├── RecipesSection.tsx
│   ├── ProductsSection.tsx
│   └── Footer.tsx
├── public/               # Static assets
│   ├── logo.png
│   ├── *.webp           # Recipe images
│   └── products/        # Product galleries
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS config
└── tsconfig.json        # TypeScript config
```

## API Endpoints

- `POST /api/quiz` - Изпращане на quiz отговори
- `GET /api/quiz` - Получаване на всички отговори (admin)

## Особености

- Използва Next.js 15 с App Router
- Server Components и Client Components
- Next.js Image компонент за оптимизирани изображения  
- API Routes за backend функционалност
- TypeScript за type safety
- Tailwind CSS за стилизиране
- Framer Motion за анимации

## Разлики с Express версията

- **Routing**: Използва Next.js App Router вместо Express routes
- **Images**: Next.js Image component вместо обикновени `<img>` тагове
- **API**: Next.js API Routes вместо Express middleware
- **Build**: Next.js build система вместо Vite/esbuild
- **Static Files**: Next.js автоматично сервира `/public` директорията

## Deployment

Next.js версията може да се deploy-ва директно в Replit или други платформи като Vercel, Netlify, etc.