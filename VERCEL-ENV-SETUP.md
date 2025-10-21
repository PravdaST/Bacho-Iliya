# 🚀 Vercel Environment Variables Setup

## ⚠️ ВАЖНО: Всички грешки се дължат на липсващи environment variables!

Грешки които виждаш:
- ❌ 401 Unauthorized на `/api/admin/auth`
- ❌ 400 Bad Request на images
- ❌ 405 Method Not Allowed на `/api/giveaway`

## 📋 Стъпки за решаване:

### 1. Отвори Vercel Dashboard
Отиди на: https://vercel.com/dashboard

### 2. Избери проекта
Намери: **bacho-iliya** или **Bacho-Iliya**

### 3. Settings → Environment Variables
Кликни: **Settings** → **Environment Variables**

### 4. Добави следните променливи:

#### 🔐 Supabase (КРИТИЧНО!)
```
NEXT_PUBLIC_SUPABASE_URL
https://lrtbkvbmciqalpfvxxrh.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydGJrdmJtY2lxYWxwZnZ4eHJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NzI4MTQsImV4cCI6MjA3NjA0ODgxNH0.nLFVbr0UnYW6SEQoWi2K0G6KnMGAZn939OO5oFAmHRs

SUPABASE_SERVICE_ROLE_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydGJrdmJtY2lxYWxwZnZ4eHJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ3MjgxNCwiZXhwIjoyMDc2MDQ4ODE0fQ.nM8M1QtdgWu9fba6XNzpwsoNzX4uyooFKH7SBHT3CZs
```

#### 🔒 Admin Authentication (КРИТИЧНО!)
```
ADMIN_PASSWORD
$2b$12$wOxQtEnKe50NEToveodHruIbmH.QdaqZg2h5r61UOyyo71V.zUP8i

SESSION_SECRET
8f2a9d1c4e6b3a5d7f9e2c1a4b6d8e0f
```

⚠️ **ВАЖНО за ADMIN_PASSWORD:**
- Копирай **ТОЧНО** както е написано
- НЕ добавяй кавички
- НЕ променяй $ символите

#### 📧 Email Service
```
RESEND_API_KEY
re_F2aj8cnD_KCEeuBqnfrt99RnYpdQJGgcK
```

#### 🌐 Site URL
```
NEXT_PUBLIC_SITE_URL
https://www.bacho-iliya.eu
```

### 5. За всяка променлива:
1. Кликни **"Add New"**
2. Name: `NEXT_PUBLIC_SUPABASE_URL` (примерно)
3. Value: копирай стойността
4. Environment: Избери **Production, Preview, Development** (всички 3!)
5. Кликни **Save**

### 6. Redeploy проекта
След като добавиш ВСИЧКИ променливи:
1. Deployments → Latest deployment
2. Кликни **"..."** (три точки)
3. Избери **"Redeploy"**
4. Изчакай 2-3 минути

## ✅ Проверка след redeploy:

Отвори сайта и провери:
- ✅ `/admin` - трябва да можеш да влезеш
- ✅ `/register` - регистрацията трябва да работи
- ✅ Images трябва да се зареждат

## 🔑 Какво е паролата за admin?

Bcrypt hash: `$2b$12$wOxQtEnKe50NEToveodHruIbmH.QdaqZg2h5r61UOyyo71V.zUP8i`

За да разбереш каква е plain text паролата, провери `.env.local` или попитай разработчика който я е генерирал.

## ❓ Ако имаш проблеми:

1. Провери дали всички променливи са добавени
2. Провери дали ADMIN_PASSWORD е БЕЗ кавички
3. Направи redeploy
4. Провери Vercel logs за грешки

---

**Генерирано от Claude Code**
