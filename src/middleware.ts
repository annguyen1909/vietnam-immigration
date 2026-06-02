import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sendHoneypotAlert, sendPhpBotAlert } from '@/lib/email';

// Global rate limiting store (in-memory, resets on server restart)
// In production, consider using Redis or Vercel Edge Config
interface RateLimitRecord {
  count: number;
  resetTime: number;
  blocked: boolean;
  requestTimes: number[]; // Track recent request timestamps for rapid-fire detection
}

interface SlugCrawlRecord {
  slugs: Map<string, number>; // Map of slug -> timestamp of first visit
  resetTime: number; // When to reset this tracking window
}

interface RouteRepetitionRecord {
  routes: Map<string, number[]>; // Map of route -> array of timestamps
  resetTime: number; // When to reset this tracking window
}

const rateLimitStore = new Map<string, RateLimitRecord>();
const slugCrawlStore = new Map<string, SlugCrawlRecord>();
const routeRepetitionStore = new Map<string, RouteRepetitionRecord>();

// Rate limiting configuration - BALANCED for normal users vs bots
// Applies to ALL routes (/, /about, /apply, /processing, etc.)
// Set to levels that normal users cannot reasonably hit during browsing
const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 minute window
  maxRequests: 120, // 120 requests per minute (2 per second - allows fast browsing, impossible for normal users)
  rapidFireWindowMs: 5 * 1000, // 5 second window for rapid-fire detection
  rapidFireMaxRequests: 20, // 20 requests in 5 seconds (catches bot bursts, allows page load with assets)
  blockWindowMs: 30 * 60 * 1000, // Block for 30 minutes if exceeded
};

// Slug crawling detection - blocks bots scraping all country pages
const SLUG_CRAWL_CONFIG = {
  windowMs: 5 * 60 * 1000, // 5 minute window
  maxSlugs: 25, // Maximum different slugs allowed in window (very high threshold - requires checking new country every 12 seconds)
  blockWindowMs: 30 * 60 * 1000, // Block for 30 minutes if exceeded
};

// Route repetition detection - blocks bots hitting same route repeatedly
// Set high enough that normal users won't hit it (e.g., refreshing/going back)
const ROUTE_REPETITION_CONFIG = {
  windowMs: 5 * 60 * 1000, // 5 minute window
  maxRepeats: 15, // Maximum times same route can be accessed in window (allows refreshing/navigation)
  blockWindowMs: 30 * 60 * 1000, // Block for 30 minutes if exceeded
};

// Security log codes (non-conventional to prevent attacker understanding)
// Format: [CODE-X|Y|Z] where:
// CODE = Block reason code
// X = Attempts past threshold
// Y = Time remaining in block window (seconds)
// Z = Additional context
const SECURITY_CODES = {
  BOT_401: 'BOT-401', // Suspicious path detected (.php, .asp, etc.)
  CWL_503: 'CWL-503', // Slug crawling (too many different slugs)
  REP_601: 'REP-601', // Route repetition (same route too many times)
  RPD_702: 'RPD-702', // Rapid-fire burst (too many in short time)
  RTL_803: 'RTL-803', // Rate limit exceeded (too many requests per window)
  HPY_901: 'HPY-901', // Honeypot URL accessed (fake admin/WordPress endpoints)
} as const;

// HONEYPOT URLs - fake endpoints that should never be accessed by legitimate users
// These are hidden in HTML but bots will crawl them
// FAQ/check-requirement honeypots look legitimate but are NOT in sitemap
// Only malicious bots blindly crawling will discover these
const HONEYPOT_PATHS = [
  // Admin/system honeypots
  '/wp-admin/login',
  '/wp-admin',
  '/wp-login.php',
  '/admin/panel',
  '/internal/config',
  '/api/admin/status',
  '/phpmyadmin',
  '/.env',
  '/administrator',
  '/cgi-bin/test',
  '/wp-content/uploads',
  '/wp-includes',
  '/wp-config.php',
  '/backup',
  '/database',
  '/mysql',
  '/config.php',
  '/shell.php',
  '/cmd.php',
  '/exec.php',
  // FAQ honeypots - look like legitimate question slugs but don't exist
  // These are NOT in sitemap, so legitimate bots won't find them
  '/faq/visa-extension-process',
  '/faq/visa-renewal-procedure',
  '/faq/visa-status-check-online',
  '/faq/visa-application-denial',
  '/faq/visa-fee-payment-options',
  '/faq/visa-processing-time-estimate',
  '/faq/vietnam-visa-requirements-update',
  '/faq/visa-application-support-help',
  // Check-requirement honeypots - look like legitimate country slugs but don't exist
  // These are NOT in sitemap, so legitimate bots won't find them
  '/check-requirement/xyz-country',
  '/check-requirement/test-nation',
  '/check-requirement/sample-country',
  '/check-requirement/demo-nation',
  '/check-requirement/example-country',
] as const;

// Verified bots - comprehensive list from Vercel's bots.fyi directory
// These respect robots.txt and should not access honeypots
// If they somehow do, return 404 instead of 403 (less aggressive)
// Source: https://vercel.com/docs/bot-management (bots.fyi directory)
const VERIFIED_BOTS = [
  // Major Search Engine Crawlers
  /googlebot/i,
  /bingbot/i,
  /msnbot/i,
  /slurp/i, // Yahoo
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /yandex/i,
  /sogou/i,
  /exabot/i,
  /ia_archiver/i, // Alexa/Internet Archive
  /archive\.org_bot/i,
  /megaindex/i,

  // Social Media Bots
  /facebookexternalhit/i,
  /facebookcatalog/i,
  /twitterbot/i,
  /linkedinbot/i,
  /pinterest/i,
  /instagram/i,
  /whatsapp/i,
  /telegrambot/i,
  /discordbot/i,

  // AI Crawlers (OpenAI, Anthropic, etc.)
  /gptbot/i,
  /chatgpt/i,
  /claudebot/i,
  /anthropic/i,
  /chatgpt-operator/i,
  /perplexity/i,
  /ccbot/i, // Common Crawl

  // Monitoring/Uptime Bots
  /site24x7/i,
  /pingdom/i,
  /uptimerobot/i,
  /statuscake/i,
  /monitor\.us/i,
  /gtmetrix/i,
  /pagepeeker/i,
  /uptime/i,

  // SEO/Analytics Bots
  /semrushbot/i,
  /ahrefsbot/i,
  /majesticseo/i,
  /mj12bot/i,
  /dotbot/i,
  /moatbot/i,
  /moz\.com/i,

  // News/Syndication Bots
  /applebot/i,
  /feedfetcher/i, // Google Feedfetcher
  /feedburner/i,
  /feedly/i,
  /flipboard/i,

  // Other Verified Services
  /slackbot/i,
  /redditbot/i,
  /discourse/i,
  /hubspot/i,
  /wordpress/i,
  /jetpack/i,
  /w3c_validator/i,
  /validator\.w3\.org/i,
] as const;

function isVerifiedBot(userAgent: string): boolean {
  return VERIFIED_BOTS.some((pattern) => pattern.test(userAgent));
}

// Bot detection patterns
const BOT_PATTERNS = {
  suspiciousPaths: /\.(php|asp|aspx|jsp|cgi|pl|sh|py|rb)$/i,
  // Common malicious/bot probing paths (Next.js doesn't use these)
  maliciousPaths: [
    /^\/(admin|wp-admin|wp-login|phpmyadmin|mysql|database|backup|config|test|shell|cmd|exec)/i,
    /\.(php|asp|aspx|jsp|cgi|pl|sh|py|rb|sql|bak|old|backup|log)$/i,
    // Note: .php files are already caught by suspiciousPaths, but this provides additional coverage
  ],
  suspiciousUserAgents: [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /^$/i, // Empty user agent
  ],
};

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  if (realIP) {
    return realIP.trim();
  }
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }

  return 'unknown';
}

/**
 * App Router issues many quick requests per "visit" (RSC payloads, link prefetch).
 * Those must not count toward visitor rate limits or route repetition — a single first
 * page load can exceed 20 requests in 5s and trigger a false 30-minute block.
 */
function isNextAppSoftNavigation(request: NextRequest): boolean {
  const h = request.headers;
  if (h.get('rsc') === '1') return true;
  if (h.get('next-router-prefetch') === '1') return true;
  if (h.get('x-middleware-prefetch') === '1') return true;
  const purpose = (h.get('purpose') ?? h.get('sec-purpose') ?? '').toLowerCase();
  if (purpose === 'prefetch') return true;
  return false;
}

function isSuspiciousRequest(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';

  // PRIMARY DEFENSE: Block ALL requests to PHP/other server-side files
  // Next.js doesn't use .php files, so ANY .php request is 100% a bot probe
  // This catches /galex.php, /wtz.php, /rh.php, /404.php, /admin.php, etc.
  if (BOT_PATTERNS.suspiciousPaths.test(pathname)) {
    return true; // Block immediately - no exceptions
  }

  // Block common malicious/bot probing paths
  if (BOT_PATTERNS.maliciousPaths.some((pattern) => pattern.test(pathname))) {
    return true;
  }

  // Block requests with missing user agents (more aggressive during attacks)
  // Note: We're NOT blocking specific user agents here because legitimate tools (curl, browser dev tools)
  // might use similar names. The .php path check above is the primary defense.
  if (!userAgent) {
    // Only block if ALSO targeting suspicious paths (double-check)
    if (BOT_PATTERNS.suspiciousPaths.test(pathname)) {
      return true; // Missing UA + .php file = definitely a bot
    }
    // Allow missing UA on normal paths (could be legitimate tools)
  }

  return false;
}

function checkRateLimit(ip: string): {
  allowed: boolean;
  blocked: boolean;
  attemptsOverLimit?: number;
  timeRemainingSeconds?: number;
  totalRequests?: number;
} {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // If IP is blocked, check if block period has expired
  if (record?.blocked) {
    if (now < record.resetTime) {
      const timeRemainingSeconds = Math.ceil((record.resetTime - now) / 1000);
      return {
        allowed: false,
        blocked: true,
        timeRemainingSeconds,
      };
    }
    // Block period expired, reset
    rateLimitStore.delete(ip);
  }

  // Get or create rate limit record
  let currentRecord = rateLimitStore.get(ip);

  if (!currentRecord || now > currentRecord.resetTime) {
    // Create new window
    currentRecord = {
      count: 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
      blocked: false,
      requestTimes: [now],
    };
    rateLimitStore.set(ip, currentRecord);
    return { allowed: true, blocked: false };
  }

  // RAPID-FIRE DETECTION: Check for too many requests in a short time
  // Clean old request times (older than rapidFireWindowMs)
  currentRecord.requestTimes = currentRecord.requestTimes.filter(
    (time) => now - time < RATE_LIMIT_CONFIG.rapidFireWindowMs
  );

  // Add current request time
  currentRecord.requestTimes.push(now);

  // If rapid-fire threshold exceeded, block immediately
  if (currentRecord.requestTimes.length > RATE_LIMIT_CONFIG.rapidFireMaxRequests) {
    const attemptsOverLimit =
      currentRecord.requestTimes.length - RATE_LIMIT_CONFIG.rapidFireMaxRequests;
    const timeRemainingSeconds = Math.ceil(RATE_LIMIT_CONFIG.blockWindowMs / 1000);
    rateLimitStore.set(ip, {
      count: currentRecord.count,
      resetTime: now + RATE_LIMIT_CONFIG.blockWindowMs,
      blocked: true,
      requestTimes: currentRecord.requestTimes,
    });
    console.warn(
      `[SECURITY] ${SECURITY_CODES.RPD_702}|X=${attemptsOverLimit}|T=${timeRemainingSeconds}|IP=${ip}|REQ=${currentRecord.requestTimes.length}|WIN=${RATE_LIMIT_CONFIG.rapidFireWindowMs / 1000}s`
    );
    return {
      allowed: false,
      blocked: true,
      attemptsOverLimit,
      timeRemainingSeconds,
      totalRequests: currentRecord.requestTimes.length,
    };
  }

  // Check if limit exceeded (normal rate limiting)
  if (currentRecord.count >= RATE_LIMIT_CONFIG.maxRequests) {
    const attemptsOverLimit = currentRecord.count - RATE_LIMIT_CONFIG.maxRequests;
    const timeRemainingSeconds = Math.ceil(RATE_LIMIT_CONFIG.blockWindowMs / 1000);
    // Block for extended period
    rateLimitStore.set(ip, {
      count: currentRecord.count,
      resetTime: now + RATE_LIMIT_CONFIG.blockWindowMs,
      blocked: true,
      requestTimes: currentRecord.requestTimes,
    });
    console.warn(
      `[SECURITY] ${SECURITY_CODES.RTL_803}|X=${attemptsOverLimit}|T=${timeRemainingSeconds}|IP=${ip}|REQ=${currentRecord.count}|WIN=${RATE_LIMIT_CONFIG.windowMs / 1000}s`
    );
    return {
      allowed: false,
      blocked: true,
      attemptsOverLimit,
      timeRemainingSeconds,
      totalRequests: currentRecord.count,
    };
  }

  // Increment count
  currentRecord.count++;
  rateLimitStore.set(ip, currentRecord);
  return { allowed: true, blocked: false };
}

/**
 * Checks if an IP is crawling/scraping multiple country slug pages.
 *
 * Detects pattern: visiting 25+ different /check-requirement/[slug] pages in 5 minutes
 * This indicates bot behavior (scraping all country pages) vs legitimate browsing.
 * Threshold set very high (would require checking new country every 12 seconds).
 *
 * Returns true if crawling detected (should block), false otherwise.
 * DISABLED - Currently not in use
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkSlugCrawling(ip: string, pathname: string, request?: NextRequest): boolean {
  // Only check /check-requirement/[slug] paths
  const slugMatch = pathname.match(/^\/check-requirement\/([^/]+)$/);
  if (!slugMatch) {
    return false; // Not a slug page, skip check
  }

  const slug = slugMatch[1];
  const now = Date.now();
  let record = slugCrawlStore.get(ip);

  // Create new record or reset if window expired
  if (!record || now > record.resetTime) {
    record = {
      slugs: new Map([[slug, now]]),
      resetTime: now + SLUG_CRAWL_CONFIG.windowMs,
    };
    slugCrawlStore.set(ip, record);
    return false; // First slug in window, allow
  }

  // Clean up old slugs (outside 5 minute window)
  for (const [oldSlug, timestamp] of record.slugs.entries()) {
    if (now - timestamp > SLUG_CRAWL_CONFIG.windowMs) {
      record.slugs.delete(oldSlug);
    }
  }

  // Add current slug if not already tracked
  if (!record.slugs.has(slug)) {
    record.slugs.set(slug, now);
  }

  // Check if exceeded limit (25+ different slugs)
  if (record.slugs.size > SLUG_CRAWL_CONFIG.maxSlugs) {
    const attemptsOverLimit = record.slugs.size - SLUG_CRAWL_CONFIG.maxSlugs;
    const timeRemainingSeconds = Math.ceil(SLUG_CRAWL_CONFIG.blockWindowMs / 1000);

    // Enhanced logging for diagnostics (include user agent, referer, etc.)
    const userAgent = request?.headers.get('user-agent') || 'unknown';
    const referer = request?.headers.get('referer') || 'none';
    const allForwardedFor = request?.headers.get('x-forwarded-for') || 'none';
    const realIP = request?.headers.get('x-real-ip') || 'none';
    const cfIP = request?.headers.get('cf-connecting-ip') || 'none';

    console.warn(
      `[SECURITY] ${SECURITY_CODES.CWL_503}|X=${attemptsOverLimit}|T=${timeRemainingSeconds}|IP=${ip}|SLUGS=${record.slugs.size}|WIN=${SLUG_CRAWL_CONFIG.windowMs / 1000}s|UA=${userAgent.substring(0, 100)}|REF=${referer.substring(0, 50)}|XFF=${allForwardedFor.substring(0, 50)}|XRI=${realIP}|CFIP=${cfIP}`
    );
    return true; // Block - too many different slugs
  }

  // Update store
  slugCrawlStore.set(ip, record);
  return false; // Within limit, allow
}

/**
 * Checks if an IP is repeatedly accessing the same route.
 *
 * Detects pattern: accessing the same exact route more than 6 times in 5 minutes
 * This indicates bot behavior (repeatedly hitting same page) vs legitimate browsing.
 *
 * Returns true if repetition detected (should block), false otherwise.
 */
function checkRouteRepetition(ip: string, pathname: string): boolean {
  const now = Date.now();
  let record = routeRepetitionStore.get(ip);

  // Create new record or reset if window expired
  if (!record || now > record.resetTime) {
    record = {
      routes: new Map([[pathname, [now]]]),
      resetTime: now + ROUTE_REPETITION_CONFIG.windowMs,
    };
    routeRepetitionStore.set(ip, record);
    return false; // First access to this route, allow
  }

  // Get or create timestamps for this route
  let routeTimestamps = record.routes.get(pathname) || [];

  // Clean up old timestamps (outside 5 minute window)
  routeTimestamps = routeTimestamps.filter(
    (timestamp) => now - timestamp < ROUTE_REPETITION_CONFIG.windowMs
  );

  // Add current timestamp
  routeTimestamps.push(now);
  record.routes.set(pathname, routeTimestamps);

  // Check if exceeded limit (6+ times)
  if (routeTimestamps.length > ROUTE_REPETITION_CONFIG.maxRepeats) {
    const attemptsOverLimit = routeTimestamps.length - ROUTE_REPETITION_CONFIG.maxRepeats;
    const timeRemainingSeconds = Math.ceil(ROUTE_REPETITION_CONFIG.blockWindowMs / 1000);
    console.warn(
      `[SECURITY] ${SECURITY_CODES.REP_601}|X=${attemptsOverLimit}|T=${timeRemainingSeconds}|IP=${ip}|PATH=${pathname}|REP=${routeTimestamps.length}|WIN=${ROUTE_REPETITION_CONFIG.windowMs / 1000}s`
    );
    return true; // Block - too many repeats
  }

  // Update store
  routeRepetitionStore.set(ip, record);
  return false; // Within limit, allow
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // HONEYPOT DETECTION - redirect loop for malicious bots, 404 for verified bots
  // These URLs are hidden in HTML but visible to bots
  // Legitimate users should NEVER access these paths (they're in robots.txt as Disallow)
  if (
    HONEYPOT_PATHS.some(
      (honeypotPath) => pathname === honeypotPath || pathname.startsWith(honeypotPath + '/')
    )
  ) {
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const isVerified = isVerifiedBot(userAgent);

    // Log the honeypot access
    console.warn(
      `[SECURITY] ${SECURITY_CODES.HPY_901}|X=0|T=0|IP=${clientIP}|PATH=${pathname}|UA=${userAgent.substring(0, 100)}|VERIFIED=${isVerified}`
    );

    // Send email alert for ALL honeypot hits (both verified and malicious bots)
    // Rate limited to 1 per IP per hour
    // Run asynchronously so it doesn't block the response
    console.log(
      `[HONEYPOT] Calling sendHoneypotAlert for IP=${clientIP}|PATH=${pathname}|VERIFIED=${isVerified}`
    );
    sendHoneypotAlert({
      ip: clientIP,
      path: pathname,
      userAgent: userAgent.substring(0, 500), // Limit UA length
      referer: request.headers.get('referer') || undefined,
      timestamp: new Date(),
      isVerifiedBot: isVerified, // Indicate whether it's a verified bot or malicious
    })
      .then((result) => {
        // Log result even if it doesn't throw - catches missing RESEND_API_KEY, rate limits, etc.
        if (!result.success) {
          console.error(
            `[HONEYPOT EMAIL FAILED] IP=${clientIP}|PATH=${pathname}|ERROR=${result.error || 'unknown'}`
          );
        } else {
          console.log(`[HONEYPOT EMAIL SENT] IP=${clientIP}|PATH=${pathname}`);
        }
      })
      .catch((error) => {
        // Log error but don't block the response
        console.error(`[HONEYPOT EMAIL ERROR] IP=${clientIP}|PATH=${pathname}|ERROR=`, error);
      });

    // If it's a verified search engine bot, return 404 (not found) - harmless
    // They should respect robots.txt and not access these anyway
    if (isVerified) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // ENHANCED INFINITE REDIRECT LOOP for malicious bots
    // Strategy: Make it as damaging as possible by:
    // 1. Tracking redirect count via query params (bypasses browser redirect limits)
    // 2. Adding random query parameters to prevent caching and make each request unique
    // 3. Using 301 permanent redirects (bots may process these differently)
    // 4. Cycling through many honeypot paths
    // 5. Adding fake session/token parameters to waste bot's parsing time

    // Extract redirect count from query parameter (if present)
    const redirectCount = parseInt(request.nextUrl.searchParams.get('_r') || '0', 10);
    const maxRedirects = 1000; // Very high limit - most bots will give up before this

    // If we've hit max redirects, return 404 to stop (but bot has wasted massive resources)
    if (redirectCount >= maxRedirects) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // Get current path and calculate next honeypot URL
    const currentHoneypotIndex = HONEYPOT_PATHS.findIndex(
      (hp) => pathname === hp || pathname.startsWith(hp + '/')
    );

    // Use multiple strategies to vary redirect behavior:
    // 1. Simple increment (most common)
    // 2. Random selection (unpredictable)
    // 3. Pattern-based (looks like real navigation)
    let nextHoneypotIndex: number;
    if (redirectCount % 3 === 0) {
      // Every 3rd redirect: random selection (unpredictable)
      nextHoneypotIndex = Math.floor(Math.random() * HONEYPOT_PATHS.length);
    } else if (redirectCount % 5 === 0) {
      // Every 5th redirect: jump by larger increment (pattern variation)
      nextHoneypotIndex =
        (currentHoneypotIndex + Math.floor(redirectCount / 5) + 1) % HONEYPOT_PATHS.length;
    } else {
      // Default: simple increment
      nextHoneypotIndex = (currentHoneypotIndex + 1) % HONEYPOT_PATHS.length;
    }

    const nextHoneypotPath = HONEYPOT_PATHS[nextHoneypotIndex];

    // Build redirect URL with multiple query parameters to:
    // 1. Track redirect count (_r)
    // 2. Add random nonce to prevent caching (_n)
    // 3. Add fake session/token parameters to waste bot's parsing time
    const url = new URL(request.url);
    url.pathname = nextHoneypotPath;

    // Clear existing query params and add new ones
    url.search = '';
    url.searchParams.set('_r', (redirectCount + 1).toString());
    url.searchParams.set('_n', Math.random().toString(36).substring(2, 15)); // Random nonce
    url.searchParams.set('_t', Date.now().toString()); // Timestamp
    url.searchParams.set('_s', Math.random().toString(36).substring(2, 20)); // Fake session ID
    url.searchParams.set('_k', Math.random().toString(36).substring(2, 30)); // Fake token
    url.searchParams.set('ref', `honeypot-${redirectCount}`); // Fake referrer tracking
    url.searchParams.set('sid', Math.random().toString(36).substring(2, 25)); // Fake session ID 2
    // Generate fake token (long random string to waste parsing time)
    const fakeToken =
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2) +
      Date.now().toString(36);
    url.searchParams.set('token', fakeToken.substring(0, 40)); // Fake auth token

    // Use 301 (Permanent Redirect) instead of 302 (Temporary)
    // Some bots may cache 301s differently, and it signals "permanent" which might
    // cause bots to follow more aggressively or cache the redirect chain
    // This wastes more resources as bots may store these redirects
    const response = NextResponse.redirect(url, { status: 301 });

    // Add headers to make the response look legitimate and prevent early detection
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('X-Redirect-Count', (redirectCount + 1).toString());

    // Set a cookie to track (wastes bot's cookie parsing time)
    response.cookies.set(`_hp_${redirectCount % 10}`, Math.random().toString(36), {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 3600,
    });

    return response;
  }

  // Bot detection - block immediately if suspicious (for all requests)
  // This is the FIRST line of defense - catches ALL .php requests before anything else
  if (isSuspiciousRequest(request)) {
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const isVerified = isVerifiedBot(userAgent);

    // Log for monitoring (in production, send to monitoring service)
    console.warn(
      `[SECURITY] ${SECURITY_CODES.BOT_401}|X=0|T=0|IP=${clientIP}|PATH=${pathname}|UA=${userAgent.substring(0, 100)}|VERIFIED=${isVerified}`
    );

    // Send email alert for ALL PHP bot hits (both verified and malicious bots)
    // Rate limited to 3 per IP per 30 minutes
    // Run asynchronously so it doesn't block the response
    console.log(
      `[PHP BOT] Calling sendPhpBotAlert for IP=${clientIP}|PATH=${pathname}|VERIFIED=${isVerified}`
    );
    sendPhpBotAlert({
      ip: clientIP,
      path: pathname,
      userAgent: userAgent.substring(0, 500), // Limit UA length
      referer: request.headers.get('referer') || undefined,
      timestamp: new Date(),
      isVerifiedBot: isVerified, // Indicate whether it's a verified bot or malicious
    })
      .then((result) => {
        // Log result even if it doesn't throw - catches missing RESEND_API_KEY, rate limits, etc.
        if (!result.success) {
          console.error(
            `[PHP BOT EMAIL FAILED] IP=${clientIP}|PATH=${pathname}|ERROR=${result.error || 'unknown'}`
          );
        } else {
          console.log(`[PHP BOT EMAIL SENT] IP=${clientIP}|PATH=${pathname}`);
        }
      })
      .catch((error) => {
        // Log error but don't block the response
        console.error(`[PHP BOT EMAIL ERROR] IP=${clientIP}|PATH=${pathname}|ERROR=`, error);
      });

    // Return 403 immediately - no redirect, no processing
    const response = new NextResponse('Forbidden', { status: 403 });
    response.headers.set('X-Blocked-Reason', 'suspicious-path');
    return response;
  }

  // Slug crawling detection - block bots scraping multiple country pages
  // DISABLED - Check this BEFORE rate limiting to catch pattern early
  // const clientIP = getClientIP(request);
  // if (clientIP !== 'unknown' && checkSlugCrawling(clientIP, pathname, request)) {
  //   const response = new NextResponse('Too Many Requests - Temporarily Blocked', { status: 429 });
  //   response.headers.set('X-Blocked-Reason', 'slug-crawling');
  //   response.headers.set('Retry-After', '1800'); // 30 minutes
  //   // Log already done in checkSlugCrawling function
  //   return response;
  // }

  // Same paths excluded from global rate limiting (must also skip route repetition so dev HMR
  // and other /_next/* traffic cannot trip REP-601 against a single internal pathname).
  const isStaticOrInternal =
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') || // API routes have their own rate limiting
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|json|xml|txt|webp|woff|woff2|ttf|eot)$/i);

  const skipVisitorLimits = isStaticOrInternal || isNextAppSoftNavigation(request);

  // Get client IP for remaining checks (route repetition and rate limiting)
  const clientIP = getClientIP(request);

  // Route repetition detection - block bots hitting same route repeatedly
  // Check this BEFORE rate limiting to catch pattern early (HTML pages only)
  if (!skipVisitorLimits && clientIP !== 'unknown' && checkRouteRepetition(clientIP, pathname)) {
    const response = new NextResponse('Too Many Requests - Temporarily Blocked', { status: 429 });
    response.headers.set('X-Blocked-Reason', 'route-repetition');
    response.headers.set('Retry-After', '1800'); // 30 minutes
    // Log already done in checkRouteRepetition function
    return response;
  }

  // Global rate limiting for page requests (not static assets or API)
  // EXEMPT verified bots from rate limiting - they're legitimate and should not be restricted
  if (!skipVisitorLimits) {
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const isVerified = isVerifiedBot(userAgent);

    // Skip rate limiting for verified bots - they're legitimate crawlers
    if (clientIP !== 'unknown' && !isVerified) {
      const rateLimit = checkRateLimit(clientIP);

      if (!rateLimit.allowed) {
        const response = rateLimit.blocked
          ? new NextResponse('Too Many Requests - Temporarily Blocked', { status: 429 })
          : new NextResponse('Too Many Requests', { status: 429 });

        const timeRemaining = rateLimit.timeRemainingSeconds || 1800; // Default 30 min
        response.headers.set('Retry-After', timeRemaining.toString());
        response.headers.set('X-RateLimit-Limit', RATE_LIMIT_CONFIG.maxRequests.toString());
        response.headers.set('X-RateLimit-Remaining', '0');

        // Log already done in checkRateLimit for new blocks, but log here if it's an existing block
        if (rateLimit.blocked && !rateLimit.attemptsOverLimit) {
          console.warn(
            `[SECURITY] ${SECURITY_CODES.RTL_803}|X=0|T=${timeRemaining}|IP=${clientIP}|BLOCKED=true`
          );
        }
        return response;
      }
    }
  }

  // Handle CORS for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const response = NextResponse.next();

    // Set CORS headers
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'https://vietnamemigration.com',
      'https://www.vietnamemigration.com',
      'http://localhost:3000',
      'http://localhost:3001',
    ];

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Max-Age', '86400');

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }

    return response;
  }

  // NOTE: Redirects (www → non-www, HTTP → HTTPS) are handled by Vercel project settings
  // We don't handle redirects here to avoid conflicts and prevent redirect loops
  // This middleware only handles: bot detection, rate limiting, and CORS

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|xml|txt)).*)',
  ],
};
