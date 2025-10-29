# 🚀 BACHO ILIA GIVEAWAY - SETUP INSTRUCTIONS

## ✅ WHAT'S NEW

This version includes:

- ✅ **Supabase Database** integration for storing entries
- ✅ **Resend Email** service for automated notifications
- ✅ **Quiz Section** for user engagement
- ✅ **Professional UI Components** (toast, forms, etc.)
- ✅ All original features (video, giveaway, vintage design)

---

## 📋 PREREQUISITES

1. **Node.js** v18+ installed
2. **Supabase** account (free tier works)
3. **Resend** account for emails (free tier: 100 emails/day)

---

## 🔧 SETUP STEPS

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Configure Environment Variables

The `.env.local` file is already created with placeholders. You need to fill in:

**✅ Supabase** (already configured):

- `NEXT_PUBLIC_SUPABASE_URL` - ✅ Done
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - ✅ Done
- `SUPABASE_SERVICE_ROLE_KEY` - ✅ Done

**⚠️ Database Password** (needs update):

- `DATABASE_URL` - Replace `[YOUR-DATABASE-PASSWORD]` with your actual password

**How to get database password:**

1. Go to https://supabase.com/dashboard
2. Select project: `lrtbkvbmciqalpfvxxrh`
3. Click **Settings** > **Database**
4. Find "Connection string" section
5. Copy the password from there

**✅ Resend API Key** (already configured):

- `RESEND_API_KEY` - ✅ Done

---

### 3️⃣ Create Database Tables

1. Open https://supabase.com/dashboard
2. Select your project: `lrtbkvbmciqalpfvxxrh`
3. Click **SQL Editor** in left menu
4. Click **New Query**
5. Open the file `supabase-setup.sql` in this directory
6. Copy the ENTIRE contents
7. Paste into Supabase SQL Editor
8. Click **Run** button
9. You should see: "Database tables created successfully! ✅"

**Tables created:**

- `giveaway_entries` - Stores all giveaway registrations
- `quiz_responses` - Stores quiz submissions

---

### 4️⃣ Start Development Server

```bash
npm run dev
```

The site will be available at: **http://localhost:3001**

---

## 🎯 HOW IT WORKS

### User Flow:

1. **Home Page** (`/`)
   - User watches video
   - Selects products they want
   - Fills quiz (optional)
   - Clicks "Participate"

2. **Register Page** (`/register`)
   - User fills name, email, phone
   - Data is saved to Supabase database
   - Welcome email sent via Resend
   - User redirected to tasks page

3. **Tasks Page** (`/tasks`)
   - User completes social media tasks
   - Tasks are tracked in Zustand store

4. **Success Page** (`/success`)
   - Shows entry ID
   - Confirmation message

---

## 📊 DATABASE SCHEMA

### `giveaway_entries` table:

- `id` - Serial primary key
- `entry_id` - Unique entry ID (e.g., "BI-xxx-xxx")
- `name` - User's name
- `email` - User's email
- `phone` - User's phone
- `selected_products` - JSON array of product IDs
- `task_facebook` - Boolean
- `task_instagram` - Boolean
- `task_share` - Boolean
- `user_agent` - Browser info
- `ip_address` - User IP
- `submitted_at` - Timestamp

### `quiz_responses` table:

- `id` - Serial primary key
- `city` - Selected city
- `weapon` - Selected "weapon" (product)
- `motivation` - User motivation text
- `email` - User email
- `user_agent` - Browser info
- `ip_address` - User IP
- `submitted_at` - Timestamp

---

## 📧 EMAIL TEMPLATES

Two email templates are configured:

1. **Giveaway Welcome Email** - Sent when user registers
   - Includes entry ID
   - Lists selected products
   - Next steps

2. **Quiz Completion Email** - Sent after quiz submission
   - Welcomes user to the movement
   - Shows their responses

---

## 🔍 TESTING CHECKLIST

### Before Going Live:

- [ ] Database connection works (check Supabase dashboard)
- [ ] Giveaway registration saves to database
- [ ] Welcome email is sent (check Resend dashboard)
- [ ] Quiz submission works
- [ ] Quiz email is sent
- [ ] All pages load correctly
- [ ] Video plays on both desktop and mobile
- [ ] Forms validate correctly
- [ ] No console errors

### Test User Flow:

1. Go to homepage
2. Select 2-3 products
3. Click "Participate"
4. Fill registration form
5. Check email inbox
6. Complete tasks page
7. Verify entry in Supabase database

---

## 🐛 TROUBLESHOOTING

### Database not connecting?

- Check `DATABASE_URL` in `.env.local`
- Verify password is correct
- Check Supabase project is active

### Emails not sending?

- Check `RESEND_API_KEY` in `.env.local`
- Verify Resend account is active
- Check Resend dashboard for logs
- Free tier: 100 emails/day limit

### Build errors?

```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📂 PROJECT STRUCTURE

```
backups/bacho-ilia-giveaway-backup-2025-10-07-21-13-02/
├── app/
│   ├── api/
│   │   ├── giveaway/route.ts    # Giveaway API endpoint
│   │   └── quiz/route.ts         # Quiz API endpoint
│   ├── page.tsx                  # Home page (with quiz)
│   ├── register/page.tsx         # Registration (with DB save)
│   ├── tasks/page.tsx            # Tasks page
│   └── success/page.tsx          # Success page
├── components/
│   ├── QuizSection.tsx           # Quiz component
│   ├── ui/                       # UI components library
│   └── ... (existing components)
├── lib/
│   ├── db.ts                     # Database connection
│   ├── schema.ts                 # Database schemas
│   ├── email.ts                  # Email templates
│   ├── constants.ts              # Quiz options
│   └── store.ts                  # Zustand state management
├── hooks/
│   └── use-toast.ts              # Toast notifications
├── .env.local                    # Environment variables
└── supabase-setup.sql            # Database setup SQL
```

---

## 🚀 DEPLOYMENT

### Deploy to Vercel:

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard:
   - All variables from `.env.local`
4. Deploy!

### Environment Variables for Production:

- Update `DATABASE_URL` with production database
- Update `NEXT_PUBLIC_SITE_URL` to your domain
- Keep same Supabase credentials
- Keep same Resend API key

---

## 📞 SUPPORT

If you need help:

1. Check Supabase logs: https://supabase.com/dashboard > Logs
2. Check Resend logs: https://resend.com/emails
3. Check browser console for errors
4. Check server console for API errors

---

## 🎉 YOU'RE READY!

Start the server with `npm run dev` and visit http://localhost:3001

The giveaway is now fully functional with database tracking and automated emails!
