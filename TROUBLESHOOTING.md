# 🔧 Troubleshooting Guide

## ✅ Fixed Issues

### 500 Error: Supabase Import
**Problem:**
```
POST /api/admin/learn-content/suggest-clusters 500 (Internal Server Error)
```

**Cause:**
API routes използваха `createClient()` instead of `supabaseAdmin`

**Fix:**
Changed all imports from:
```typescript
import { createClient } from '@/lib/supabase';
const supabase = createClient();
```

To:
```typescript
import { supabaseAdmin } from '@/lib/supabase';
const supabase = supabaseAdmin;
```

**Files Updated:**
- ✅ `app/api/admin/learn-content/suggest-clusters/route.ts`
- ✅ `app/api/admin/learn-content/create-cluster/route.ts`
- ✅ `app/api/admin/learn-content/create-pillar/route.ts`
- ✅ `app/blog/learn/page.tsx`
- ✅ `app/blog/learn/[slug]/page.tsx`
- ✅ `app/sitemap.ts`

---

## 🚀 How to Test Now

### 1. Restart Dev Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 2. Run Database Migration
```
Supabase Dashboard → SQL Editor → Run supabase-learn-content-migration.sql
```

### 3. Test Admin Page
```
Open: http://localhost:3001/admin/learn-content
Click: "AI Suggestions" → "Предложи Clusters"
```

**Expected:**
- ✅ No 500 error
- ✅ AI returns 8-10 cluster suggestions
- ✅ Success message

---

## 📋 Common Issues

### Issue: "OPENROUTER_API_KEY not found"
**Solution:**
```bash
# Check .env.local
cat .env.local | grep OPENROUTER_API_KEY

# Should see:
OPENROUTER_API_KEY=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
```

### Issue: "Table blog_posts does not exist"
**Solution:**
1. Supabase Dashboard → SQL Editor
2. Paste `supabase-learn-content-migration.sql`
3. Click "Run"
4. Refresh admin page

### Issue: "Port 3001 already in use"
**Solution:**
```bash
# Find process
netstat -ano | findstr :3001

# Kill process
taskkill /PID <PID> /F

# Restart server
npm run dev
```

### Issue: "Slow AI generation"
**Normal:**
- Cluster: 10-15 seconds
- Pillar: 15-20 seconds
- Suggestions: 5-8 seconds

**Too Slow (>30s):**
- Check OpenRouter status
- Check internet connection
- Try again

---

## 🧪 Testing Checklist

### Before Testing:
- [ ] Database migration run
- [ ] Dev server running
- [ ] OPENROUTER_API_KEY in .env.local
- [ ] Supabase keys in .env.local

### Test 1: AI Suggestions
- [ ] Open `/admin/learn-content`
- [ ] Click "AI Suggestions"
- [ ] Click "Предложи Clusters"
- [ ] See 8-10 suggestions
- [ ] No errors

### Test 2: Create Cluster
- [ ] Click "Create Cluster" tab
- [ ] Title: `Традиционни рецепти с кисело мляко`
- [ ] Category: `recipes`
- [ ] Keywords: `кисело мляко, рецепти`
- [ ] Click "Генерирай Cluster"
- [ ] Wait 10-15 seconds
- [ ] See success with generated content

### Test 3: View Learn Pages
- [ ] Open `/blog/learn`
- [ ] See empty state (no articles yet)
- [ ] After creating cluster, refresh
- [ ] See created article in grid
- [ ] Click article
- [ ] See full content at `/blog/learn/[slug]`

---

## 💡 Quick Fixes

### Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Check Logs
```bash
# In terminal where dev server runs
# Look for errors like:
# - "OPENROUTER_API_KEY is not defined"
# - "Cannot find module '@/lib/supabase'"
# - "Table 'blog_posts' does not exist"
```

### Verify Environment Variables
```bash
# .env.local should have:
NEXT_PUBLIC_SUPABASE_URL=https://lrtbkvbmciqalpfvxxrh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENROUTER_API_KEY=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
NANOBANANA_GEMINI_API_KEY=AIzaSyC3jRDJ4312XECnwQwj1AHwwzGhrYEm6PE
```

---

## 🆘 Still Not Working?

### Debug Steps:
1. Check terminal logs
2. Check browser console (F12)
3. Check Network tab (F12 → Network)
4. Look for specific error message
5. Search error in this file

### Get Help:
- Read `BACHO-ILIA-LEARN-CONTENT-SETUP.md`
- Read `QUICK-START.md`
- Check database in Supabase Dashboard

---

**Last Updated:** November 17, 2025
