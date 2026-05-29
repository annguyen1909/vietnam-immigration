import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true, // Keep text content only
  });
}

/**
 * Sanitize plain text input
 */
export function sanitizeText(text: string): string {
  if (typeof text !== 'string') return '';

  return text
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
}

/**
 * Validate and sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';

  const sanitized = email.toLowerCase().trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(sanitized)) {
    throw new Error('Invalid email format');
  }

  return sanitized;
}

/**
 * Validate and sanitize phone number
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') return '';

  const sanitized = phone.replace(/[^\d\s\-+()]/g, '').trim();

  if (sanitized.length < 7 || sanitized.length > 20) {
    throw new Error('Invalid phone number length');
  }

  return sanitized;
}

/**
 * Sanitize file name
 */
export function sanitizeFileName(fileName: string): string {
  if (typeof fileName !== 'string') return '';

  return fileName
    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid characters
    .replace(/\.\./g, '') // Remove directory traversal
    .substring(0, 255); // Limit length
}

/**
 * Validate file type by checking magic bytes
 */
export function validateFileType(buffer: Buffer, allowedTypes: string[]): boolean {
  const signatures: { [key: string]: number[][] } = {
    'image/jpeg': [[0xff, 0xd8, 0xff]],
    'image/png': [[0x89, 0x50, 0x4e, 0x47]],
    'image/gif': [[0x47, 0x49, 0x46]],
    'application/pdf': [[0x25, 0x50, 0x44, 0x46]],
    'application/msword': [[0xd0, 0xcf, 0x11, 0xe0]],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
      [0x50, 0x4b, 0x03, 0x04],
      [0x50, 0x4b, 0x05, 0x06],
      [0x50, 0x4b, 0x07, 0x08],
    ],
  };

  for (const mimeType of allowedTypes) {
    const signature = signatures[mimeType];
    if (!signature) continue;

    for (const sig of signature) {
      if (buffer.length >= sig.length) {
        const matches = sig.every((byte, index) => buffer[index] === byte);
        if (matches) return true;
      }
    }
  }

  return false;
}

/**
 * Sanitize object properties recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeText(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}
