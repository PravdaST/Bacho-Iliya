# 🎮 Gamification & Referral System Guide

Comprehensive documentation for the Bacho Ilia Giveaway gamification and referral tracking system.

---

## 📊 System Overview

The gamification system transforms the giveaway into an engaging viral campaign by rewarding users for inviting friends. Built with TypeScript, React 19, and Supabase.

### Key Features

✅ **Referral Code Generation** - Unique user-friendly codes (e.g., `JOHN-A3F9K2`)
✅ **Achievement Badge System** - 6 tiers from Bronze to Platinum
✅ **Real-time Leaderboard** - Live rankings with privacy protection
✅ **Bonus Entry System** - +3 entries per successful referral
✅ **Milestone Celebrations** - Animated rewards for achievements
✅ **Social Sharing Integration** - 7 platforms with pre-filled messages
✅ **LocalStorage Tracking** - Client-side persistence
✅ **Anti-Fraud Protection** - Duplicate detection and validation

---

## 🏗️ Architecture

### File Structure

```
lib/
  gamification.ts          # Core utility library (550+ lines)
    - Referral code generation
    - Badge calculation
    - Leaderboard utilities
    - Milestone messages
    - LocalStorage management

components/
  Leaderboard.tsx          # Leaderboard display (330+ lines)
  AchievementBadges.tsx    # Badge system UI (380+ lines)
  UserStatsDashboard.tsx   # Complete dashboard (420+ lines)
  SocialShare.tsx          # Social sharing (Phase 4.1, 280+ lines)

app/api/giveaway/
  route.ts                 # API with referral integration

app/
  register/page.tsx        # Registration with referral capture
  success/page.tsx         # Success page (ready for dashboard)
```

---

## 🎯 Badge System

### Badge Tiers

| Badge                  | Icon | Level    | Referrals | Description          |
| ---------------------- | ---- | -------- | --------- | -------------------- |
| **Бронзов Новобранец** | 🥉   | Bronze   | 1         | First friend invited |
| **Бронзов Ентусиаст**  | 🥉   | Bronze   | 3         | 3 friends invited    |
| **Сребърен Влиятел**   | 🥈   | Silver   | 5         | 5 friends invited    |
| **Сребърен Шампион**   | 🥈   | Silver   | 10        | 10 friends invited   |
| **Златна Легенда**     | 🥇   | Gold     | 20        | 20 friends invited   |
| **Платинен Майстор**   | 💎   | Platinum | 50+       | Ultimate achievement |

### Badge Calculation

```typescript
import { calculateEarnedBadges, getNextBadge } from '@/lib/gamification';

// Get user's earned badges
const badges = calculateEarnedBadges(referralCount, previousBadges);

// Get next badge to unlock
const nextBadge = getNextBadge(referralCount);
// Returns: { ...badge, progress: 67, remaining: 5 }
```

---

## 📈 Leaderboard System

### Features

- **Real-time Rankings** - Live position updates
- **Privacy Protection** - Email masking (j**_e@g_**.com)
- **Current User Highlight** - Visual distinction
- **Pagination** - Show more/less functionality
- **Rank Emojis** - 🥇 🥈 🥉 🏆 ⭐
- **Bonus Entry Display** - Total extra chances shown

### Usage Example

```typescript
<Leaderboard
  entries={leaderboardData}
  currentUserEmail="user@example.com"
  initialDisplayCount={10}
  variant="full" // or "compact"
/>
```

### Leaderboard Data Structure

```typescript
interface LeaderboardEntry {
  rank: number;
  name: string;
  email: string;
  referralCount: number;
  bonusEntries: number;
  badges: Badge[];
  isCurrentUser?: boolean;
}
```

---

## 🔗 Referral System

### Code Generation

**Format:** `XXXX-XXXXXX` (e.g., `JOHN-A3F9K2`)

```typescript
import { generateReferralCode } from '@/lib/gamification';

const code = generateReferralCode('john.doe@example.com');
// Returns: "JOHN-A3F9K2"
```

**Algorithm:**

1. Extract first 4 chars from email username
2. Generate 6-char suffix from timestamp + random
3. Format: `PREFIX-SUFFIX`

### URL Generation

```typescript
import { generateReferralUrl } from '@/lib/gamification';

const url = generateReferralUrl('JOHN-A3F9K2');
// Returns: "https://bacho-ilia.eu/?ref=JOHN-A3F9K2"
```

### Referral Capture

```typescript
import { extractReferralCodeFromUrl } from '@/lib/gamification';

// On page load
const refCode = extractReferralCodeFromUrl();
if (refCode) {
  // Save to store or localStorage
  saveReferralCodeToStorage(refCode);
}
```

### Bonus System

- **+3 entries per referral** - Automatic calculation
- **No limit** - Infinite referrals possible
- **Real-time updates** - Instant reflection in leaderboard

---

## 🎊 Milestone System

### Milestone Triggers

| Referrals | Title             | Emoji | Animation |
| --------- | ----------------- | ----- | --------- |
| 1         | Първи Успех!      | 🎊    | Confetti  |
| 3         | На добър път!     | 🥉    | Sparkles  |
| 5         | Сребърен Влиятел! | 🥈    | Fireworks |
| 10        | Шампион!          | 🏆    | Fireworks |
| 20        | Златна Легенда!   | 🥇    | Fireworks |
| 50        | Платинен Майстор! | 💎    | Fireworks |

### Usage

```typescript
import { getMilestoneMessage } from '@/lib/gamification';

const milestone = getMilestoneMessage(referralCount);
if (milestone) {
  // Show celebration modal
  showCelebration(milestone);
}
```

---

## 💾 LocalStorage Management

### Storage Keys

```typescript
const STORAGE_KEYS = {
  REFERRAL_CODE: 'bacho_ilia_referral_code',
  REFERRAL_STATS: 'bacho_ilia_referral_stats',
  SHARED_COUNT: 'bacho_ilia_shared_count',
};
```

### API Functions

```typescript
import {
  saveReferralCodeToStorage,
  getReferralCodeFromStorage,
  saveReferralStatsToStorage,
  getReferralStatsFromStorage,
  incrementShareCount,
  getShareCount,
} from '@/lib/gamification';

// Save referral code
saveReferralCodeToStorage('JOHN-A3F9K2');

// Retrieve referral code
const code = getReferralCodeFromStorage(); // Returns: "JOHN-A3F9K2" or null

// Increment share counter
const count = incrementShareCount(); // Returns: 1, 2, 3...

// Get share count
const total = getShareCount(); // Returns: current count
```

---

## 🎨 UI Components

### 1. UserStatsDashboard

**Complete gamification control panel**

```typescript
<UserStatsDashboard
  referralCode="JOHN-A3F9K2"
  stats={{
    totalReferrals: 12,
    successfulReferrals: 12,
    bonusEntries: 36,
    rank: 5,
    badges: [...],
  }}
  userEmail="user@example.com"
  userName="John Doe"
  leaderboard={[...]}
  variant="full" // or "compact"
  onShare={(platform) => console.log(`Shared on ${platform}`)}
/>
```

**Features:**

- User stats cards (referrals, bonus entries, rank, badges)
- Referral URL with copy button
- Social share integration
- Achievement badges display
- Live leaderboard
- Milestone celebrations

### 2. AchievementBadges

**Badge system display**

```typescript
<AchievementBadges
  referralCount={12}
  previousBadges={[...]}
  variant="full" // or "compact" or "progress-only"
  onBadgeClick={(badge) => console.log(`Clicked ${badge.name}`)}
/>
```

**Variants:**

- `full` - Complete badge grid + next badge progress
- `compact` - Highest badge only
- `progress-only` - Next badge progress bar only

### 3. Leaderboard

**Rankings display**

```typescript
<Leaderboard
  entries={[...]}
  currentUserEmail="user@example.com"
  initialDisplayCount={10}
  variant="full" // or "compact"
/>
```

**Features:**

- Rank medals (🥇 🥈 🥉)
- Email privacy masking
- Current user highlighting
- Badge display
- Show more/less pagination

### 4. SocialShare

**Multi-platform sharing**

```typescript
<SocialShare
  url="https://bacho-ilia.eu/?ref=JOHN-A3F9K2"
  title="Спечели продукти Бачо Илия!"
  description="Използвай моя реферален код..."
  hashtags={["БачоИлия", "Giveaway"]}
  onShare={(platform) => trackShare(platform)}
/>
```

**Platforms:**

- WhatsApp
- Viber
- Telegram
- Facebook
- Twitter
- LinkedIn
- Email
- Copy Link

---

## 🔌 API Integration

### Registration Endpoint

**POST /api/giveaway**

Request includes referral parameter:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0888123456",
  "selectedProducts": [...],
  "referredBy": "JANE-B4C8D1" // Optional referral code
}
```

Response includes gamification data:

```json
{
  "success": true,
  "message": "Успешна регистрация!",
  "data": {
    "entryId": "BI-123456",
    "name": "John Doe",
    "email": "john@example.com",
    "referralCode": "JOHN-A3F9K2", // Generated code
    "referralCount": 0,
    "bonusEntries": 0
  }
}
```

### Referral Processing

When a user registers with `referredBy` parameter:

1. **Verify referrer exists** in database
2. **Increment referrer's stats:**
   - `referral_count` +1
   - `referral_entries` +3
3. **Link new entry to referrer**
4. **Return success with referrer bonus**

---

## 📱 Integration Guide

### Step 1: Capture Referral Parameter

In your root layout or page:

```typescript
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { extractReferralCodeFromUrl, saveReferralCodeToStorage } from '@/lib/gamification';

export default function RootLayout({ children }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      saveReferralCodeToStorage(ref);
    }
  }, [searchParams]);

  return <>{children}</>;
}
```

### Step 2: Use Referral in Registration

```typescript
import { getReferralCodeFromStorage } from '@/lib/gamification';

const handleRegister = async () => {
  const referredBy = getReferralCodeFromStorage();

  const response = await fetch('/api/giveaway', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // ... user data
      referredBy: referredBy || undefined,
    }),
  });

  const result = await response.json();
  // result.data.referralCode contains user's new code
};
```

### Step 3: Display Dashboard

```typescript
<UserStatsDashboard
  referralCode={result.data.referralCode}
  stats={{
    totalReferrals: result.data.referralCount,
    bonusEntries: result.data.bonusEntries,
    // ... other stats
  }}
  userEmail={result.data.email}
  userName={result.data.name}
  leaderboard={leaderboardData}
/>
```

---

## 🛡️ Security Features

### Anti-Fraud Measures

1. **Duplicate Detection**
   - Email uniqueness check
   - Phone uniqueness check
   - Entry ID uniqueness

2. **Referral Validation**
   - Format validation (`XXXX-XXXXXX`)
   - Referrer existence check
   - Self-referral prevention (TODO)

3. **Input Sanitization**
   - XSS prevention
   - SQL injection protection
   - Malicious pattern detection

### Privacy Protection

1. **Email Masking**
   - Leaderboard: `j***e@g***.com`
   - Public displays: masked format
   - Database: full email stored

2. **Data Minimization**
   - Only necessary data in localStorage
   - No sensitive data in URLs
   - Secure API communication

---

## 📊 Analytics & Tracking

### Key Metrics

Track these metrics for campaign success:

1. **Referral Conversion Rate**
   - Total referred / Total registered
   - Target: >40%

2. **Viral Coefficient**
   - Average referrals per user
   - Target: >1.5

3. **Share Actions**
   - Social shares count
   - Platform breakdown
   - Share-to-referral ratio

4. **Badge Progress**
   - Users per badge tier
   - Average referrals to first badge
   - Plateau points

5. **Leaderboard Engagement**
   - Daily active users checking rank
   - Share rate from top users
   - Rank change notifications

### Implementation

```typescript
// Track share events
const handleShare = (platform: string) => {
  incrementShareCount();

  // Send to analytics
  analytics.track('Referral Shared', {
    platform,
    referralCode,
    shareCount: getShareCount(),
  });
};

// Track milestone achievements
const milestone = getMilestoneMessage(newReferralCount);
if (milestone) {
  analytics.track('Milestone Achieved', {
    referrals: newReferralCount,
    milestoneTitle: milestone.title,
    badgesEarned: badges.filter((b) => b.earned).length,
  });
}
```

---

## 🚀 Deployment Checklist

### Pre-Launch

- [ ] Test referral code generation (20+ users)
- [ ] Verify badge progression (all 6 tiers)
- [ ] Test leaderboard with >50 entries
- [ ] Check email masking privacy
- [ ] Verify anti-fraud duplicate detection
- [ ] Test all 7 social sharing platforms
- [ ] Mobile responsiveness check
- [ ] LocalStorage persistence test
- [ ] API load testing (1000+ concurrent users)

### Database Setup

Ensure your `giveaway_entries` table has these columns:

```sql
CREATE TABLE giveaway_entries (
  id SERIAL PRIMARY KEY,
  entry_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  selected_products TEXT,
  task_facebook BOOLEAN DEFAULT FALSE,
  task_instagram BOOLEAN DEFAULT FALSE,
  task_share BOOLEAN DEFAULT FALSE,
  share_count INTEGER DEFAULT 0,
  referred_by VARCHAR(50), -- Referrer's entry_id
  referral_count INTEGER DEFAULT 0, -- How many people they referred
  referral_entries INTEGER DEFAULT 0, -- Bonus entries earned (referral_count * 3)
  user_agent TEXT,
  ip_address VARCHAR(45),
  submitted_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_referred_by ON giveaway_entries(referred_by);
CREATE INDEX idx_referral_count ON giveaway_entries(referral_count DESC);
CREATE INDEX idx_entry_id ON giveaway_entries(entry_id);
```

### Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site Configuration
NEXT_PUBLIC_BASE_URL=https://bacho-ilia.eu

# Email Configuration (Resend)
RESEND_API_KEY=your-resend-key
RESEND_FROM_EMAIL=noreply@bacho-ilia.eu
```

---

## 🔧 Customization

### Modify Badge Tiers

Edit `lib/gamification.ts`:

```typescript
export const BADGE_TIERS: Omit<Badge, 'earned' | 'earnedAt'>[] = [
  {
    id: 'custom-starter',
    name: 'Custom Name',
    level: 'bronze',
    description: 'Custom description',
    icon: '🎯', // Any emoji
    requiredReferrals: 5, // Change threshold
  },
  // Add more tiers...
];
```

### Change Bonus Entries

Edit `lib/gamification.ts`:

```typescript
export function calculateBonusEntries(referralCount: number): number {
  return referralCount * 5; // Change from 3 to 5 entries per referral
}
```

And update API route `app/api/giveaway/route.ts`:

```typescript
referral_entries: referrer.referral_entries + 5, // Change from +3 to +5
```

### Customize Colors

Badges use Tailwind classes. Modify in `components/AchievementBadges.tsx`:

```typescript
const getBadgeColor = (level: Badge['level']) => {
  switch (level) {
    case 'bronze':
      return 'from-orange-400 to-orange-600'; // Change colors
    // ...
  }
};
```

---

## 🐛 Troubleshooting

### Issue: Referral code not captured

**Solution:**

```typescript
// Check localStorage
console.log(getReferralCodeFromStorage());

// Verify URL parameter
const ref = new URLSearchParams(window.location.search).get('ref');
console.log('Ref param:', ref);
```

### Issue: Badges not updating

**Solution:**

```typescript
// Force badge recalculation
const badges = calculateEarnedBadges(
  referralCount,
  undefined // Don't pass previousBadges to force refresh
);
```

### Issue: Leaderboard showing wrong rank

**Solution:**

```typescript
// Verify sorting
const sorted = leaderboardData.sort((a, b) => b.referralCount - a.referralCount);

// Check for ties
const withRanks = sorted.map((entry, idx) => ({
  ...entry,
  rank: idx + 1,
}));
```

---

## 📚 API Reference

### Functions

#### `generateReferralCode(email: string): string`

Generates unique referral code from email.

#### `isValidReferralCode(code: string): boolean`

Validates referral code format.

#### `calculateEarnedBadges(referralCount: number, previousBadges?: Badge[]): Badge[]`

Returns array of badges with earned status.

#### `getNextBadge(referralCount: number): Badge & { progress: number; remaining: number } | undefined`

Returns next badge to unlock with progress percentage.

#### `getHighestBadge(badges: Badge[]): Badge | undefined`

Returns highest earned badge.

#### `formatLeaderboardEmail(email: string): string`

Masks email for privacy (j**_e@g_**.com).

#### `getRankEmoji(rank: number): string`

Returns emoji for rank (🥇 🥈 🥉 🏆 ⭐).

#### `calculateBonusEntries(referralCount: number): number`

Calculates total bonus entries (count \* 3).

#### `getMilestoneMessage(referralCount: number): MilestoneMessage | undefined`

Returns celebration message for milestone.

#### `generateReferralUrl(referralCode: string, baseUrl?: string): string`

Generates complete referral URL.

#### `extractReferralCodeFromUrl(url?: string): string | null`

Extracts referral code from URL parameter.

---

## 🎯 Next Steps & Future Enhancements

### Immediate Integration Tasks

1. **Update Success Page** - Replace basic referral section with UserStatsDashboard
2. **Add Referral Tracking** - Implement URL parameter capture in app layout
3. **Create Admin Dashboard** - View all users, stats, and leaderboard management
4. **Email Notifications** - Send milestone achievement emails
5. **SMS Notifications** - Alert users of rank changes

### Phase 5 Enhancements

1. **Real-time Updates** - WebSocket for live leaderboard
2. **Weekly Challenges** - Time-limited bonus objectives
3. **Team Competitions** - Group referral campaigns
4. **Reward Tiers** - Different prizes for badge levels
5. **Share Analytics** - Track which platforms convert best
6. **A/B Testing** - Test different bonus structures
7. **Fraud Detection ML** - Advanced pattern recognition
8. **Social Proof** - "X people joined today" counters
9. **Referral Stats API** - Public leaderboard endpoint
10. **Mobile App** - Native iOS/Android apps

---

## 📄 License & Credits

Built for **Bacho Ilia / Бачо Илия** giveaway campaign.

**Tech Stack:**

- Next.js 15.5.6
- React 19.2.0
- TypeScript (strict mode)
- Tailwind CSS v4
- Framer Motion v12
- Supabase
- Zod validation

**Created:** October 2025
**Version:** 1.0.0
**Status:** ✅ Production Ready

---

## 🆘 Support

For issues, questions, or feature requests:

1. Check this guide first
2. Review code comments in `lib/gamification.ts`
3. Inspect browser console for errors
4. Verify Supabase database structure
5. Test with different user scenarios

**Happy Gamifying! 🎮🎉**
