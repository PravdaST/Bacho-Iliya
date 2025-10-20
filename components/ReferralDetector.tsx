'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGiveawayStore } from '@/lib/store';

/**
 * Component to detect and save referral codes from URL
 * Separated to allow Suspense boundary wrapping
 */
export default function ReferralDetector() {
  const searchParams = useSearchParams();
  const { setReferredBy } = useGiveawayStore();

  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      console.log('🔗 Referral code detected:', refCode);
      setReferredBy(refCode);
    }
  }, [searchParams, setReferredBy]);

  return null; // This component doesn't render anything
}
