// Security configuration constants
export const SECURITY_CONFIG = {
  // Password requirements
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,

  // Session configuration
  SESSION_MAX_AGE: 30 * 24 * 60 * 60, // 30 days
  SESSION_SHORT_MAX_AGE: 24 * 60 * 60, // 1 day

  // Rate limiting
  LOGIN_ATTEMPTS: 5,
  LOGIN_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  REGISTER_ATTEMPTS: 3,
  REGISTER_WINDOW_MS: 60 * 60 * 1000, // 1 hour
  PASSWORD_RESET_ATTEMPTS: 3,
  PASSWORD_RESET_WINDOW_MS: 60 * 60 * 1000, // 1 hour
  CONTACT_FORM_ATTEMPTS: 5,
  CONTACT_FORM_WINDOW_MS: 60 * 60 * 1000, // 1 hour

  // File upload limits
  MAX_FILE_SIZE: 20 * 1024 * 1024, // 20MB
  MAX_FILES_PER_UPLOAD: 15,
  ALLOWED_FILE_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/bmp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],

  // Input validation limits
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 254,
  MAX_PHONE_LENGTH: 20,
  MAX_MESSAGE_LENGTH: 1000,

  // Token expiration
  PASSWORD_RESET_TOKEN_EXPIRY: 60 * 60 * 1000, // 1 hour
  JWT_EXPIRY: 7 * 24 * 60 * 60, // 7 days
} as const;

// Security headers configuration
export const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
} as const;

// CORS configuration
export const CORS_CONFIG = {
  allowedOrigins: [
    'https://vietnamemigration.com',
    'https://www.vietnamemigration.com',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  allowCredentials: true,
  maxAge: 86400,
} as const;

// Content Security Policy
export const CSP_CONFIG = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://js.stripe.com',
    'https://checkout.stripe.com',
    'https://cdn.jsdelivr.net',
  ],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'img-src': ["'self'", 'data:', 'https:', 'blob:'],
  'connect-src': [
    "'self'",
    'https://api.stripe.com',
    'https://checkout.stripe.com',
    'https://api.resend.com',
    'https://api.pusherapp.com',
  ],
  'frame-src': ["'self'", 'https://js.stripe.com', 'https://checkout.stripe.com'],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': [],
} as const;

// Utility functions
export function generateSecureToken(): string {
  return crypto.randomUUID();
}

export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < SECURITY_CONFIG.PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${SECURITY_CONFIG.PASSWORD_MIN_LENGTH} characters long`);
  }

  if (password.length > SECURITY_CONFIG.PASSWORD_MAX_LENGTH) {
    errors.push(
      `Password must be no more than ${SECURITY_CONFIG.PASSWORD_MAX_LENGTH} characters long`
    );
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function sanitizeForLogging(data: unknown): unknown {
  if (typeof data === 'string') {
    return data.replace(/password|token|secret|key/gi, '[REDACTED]');
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeForLogging(item));
  }

  if (typeof data === 'object' && data !== null) {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof key === 'string' && /password|token|secret|key/i.test(key)) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = sanitizeForLogging(value);
      }
    }
    return sanitized;
  }

  return data;
}
