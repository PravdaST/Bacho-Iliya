# Deployment Guide - Бачо Илия Next.js

## Vercel Deployment Settings

### Required Settings:
- **Framework Preset**: Next.js
- **Root Directory**: `nextjs-app`
- **Build Command**: `npm run build` (автоматично)
- **Output Directory**: `.next` (автоматично)
- **Install Command**: `npm install` (автоматично)

### Environment Variables:
Не са необходими за статичния сайт, но ако искате database integration:
- `DATABASE_URL` - PostgreSQL connection string

### Domain Configuration:
След deploy-ването ще получите автоматично `.vercel.app` домейн.

### Build Process:
1. Vercel автоматично ще:
   - Инсталира dependencies от `nextjs-app/package.json`
   - Стартира `npm run build`
   - Deploy-ва built файловете

### Files Structure:
```
nextjs-app/                 <- Това посочвате като Root Directory
├── src/
│   ├── app/               <- Next.js App Router
│   ├── components/        <- UI Components
│   └── lib/               <- Utilities
├── public/                <- Static assets
├── package.json           <- Dependencies
└── next.config.js         <- Next.js config
```

### Success Indicators:
- Build time: ~2-3 minutes
- Size: ~15MB
- All routes working: `/`, API routes
- Static assets loading: images, fonts
- Mobile responsive design working

## Alternative Platforms:
- **Netlify**: Same settings, auto-detects Next.js
- **Railway**: Supports full-stack with database
- **Cloudflare Pages**: Fast CDN, similar config