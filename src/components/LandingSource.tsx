'use client';

import { useEffect } from 'react';

function currentLand(): string | null {
  const match = document.cookie.match(/(?:^|; )land=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function LandingSource() {
  useEffect(() => {
    if (currentLand()) return;
    const params = new URLSearchParams(window.location.search);
    let land = 'direct';
    if (params.get('msclkid')) land = 'bing';
    else if (params.get('gclid')) land = 'google';
    else if (document.referrer) {
      try {
        const host = new URL(document.referrer).hostname.toLowerCase();
        if (host === 'bing.com' || host.endsWith('.bing.com')) land = 'bing';
        else if (host.split('.').includes('google')) land = 'google';
        else land = 'other';
      } catch {
        land = 'other';
      }
    }
    document.cookie = `land=${land}; Path=/; Max-Age=7776000; SameSite=Lax`;
  }, []);
  return null;
}
