/**
 * Input Sanitization & Validation Utilities
 * Protects against XSS, SQL injection, and other security vulnerabilities
 */

import DOMPurify from 'isomorphic-dompurify';

// ==================================
// XSS PROTECTION
// ==================================

/**
 * Sanitize HTML to prevent XSS attacks
 * @param dirty - Potentially dangerous HTML string
 * @param allowedTags - Optional array of allowed HTML tags
 * @returns Sanitized HTML string
 */
export function sanitizeHTML(
  dirty: string,
  allowedTags?: string[]
): string {
  const config = {
    ALLOWED_TAGS: allowedTags || [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  };

  return String(DOMPurify.sanitize(dirty, config as any));
}

/**
 * Sanitize user text input (strips all HTML)
 * @param input - User input string
 * @returns Safe plain text
 */
export function sanitizeText(input: string): string {
  // Remove all HTML tags and return plain text
  return String(DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    KEEP_CONTENT: true,
  } as any)).trim();
}

/**
 * Sanitize email address
 * @param email - Email address to sanitize
 * @returns Sanitized email or null if invalid
 */
export function sanitizeEmail(email: string): string | null {
  const cleaned = sanitizeText(email).toLowerCase();

  // Basic email validation regex
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  if (!emailRegex.test(cleaned)) {
    return null;
  }

  return cleaned;
}

/**
 * Sanitize phone number (Bulgarian format)
 * @param phone - Phone number to sanitize
 * @returns Sanitized phone or null if invalid
 */
export function sanitizePhone(phone: string): string | null {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Bulgarian phone: 10 digits starting with 0 or 359
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return cleaned;
  }

  if (cleaned.length === 12 && cleaned.startsWith('359')) {
    return '0' + cleaned.substring(3); // Convert 359... to 0...
  }

  return null;
}

/**
 * Sanitize name (allows letters, spaces, hyphens)
 * @param name - Name to sanitize
 * @returns Sanitized name
 */
export function sanitizeName(name: string): string {
  const cleaned = sanitizeText(name);

  // Allow only letters (including Bulgarian Cyrillic), spaces, hyphens, apostrophes
  const nameRegex = /^[A-Za-zА-Яа-я\s\-']+$/;

  if (!nameRegex.test(cleaned)) {
    // Remove invalid characters
    return cleaned.replace(/[^A-Za-zА-Яа-я\s\-']/g, '');
  }

  return cleaned;
}

// ==================================
// SQL INJECTION PROTECTION
// ==================================

/**
 * Escape special characters for SQL (though Supabase client handles this)
 * This is a defense-in-depth measure
 * @param input - String to escape
 * @returns Escaped string
 */
export function escapeSQLString(input: string): string {
  return input
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "''")
    .replace(/"/g, '\\"')
    .replace(/\x00/g, '\\0')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\x1a/g, '\\Z');
}

// ==================================
// OBJECT SANITIZATION
// ==================================

/**
 * Sanitize an object's string values
 * @param obj - Object with string values
 * @param fieldsToSanitize - Optional array of field names to sanitize (default: all)
 * @returns Sanitized object
 */
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  fieldsToSanitize?: (keyof T)[]
): T {
  const result = { ...obj };

  const fields = fieldsToSanitize || (Object.keys(obj) as (keyof T)[]);

  fields.forEach((field) => {
    const value = obj[field];

    if (typeof value === 'string') {
      result[field] = sanitizeText(value) as T[keyof T];
    } else if (Array.isArray(value)) {
      result[field] = value.map((item: any) =>
        typeof item === 'string' ? sanitizeText(item) : item
      ) as T[keyof T];
    } else if (typeof value === 'object' && value !== null) {
      result[field] = sanitizeObject(value) as T[keyof T];
    }
  });

  return result;
}

// ==================================
// GIVEAWAY-SPECIFIC SANITIZATION
// ==================================

/**
 * Sanitize giveaway entry data
 * @param data - Raw giveaway entry data
 * @returns Sanitized data
 */
export function sanitizeGiveawayEntry(data: {
  name: string;
  email: string;
  phone: string;
  selectedProducts: string[];
}): {
  name: string;
  email: string | null;
  phone: string | null;
  selectedProducts: string[];
  errors: string[];
} {
  const errors: string[] = [];

  // Sanitize name
  const name = sanitizeName(data.name);
  if (name.length < 2) {
    errors.push('Името трябва да бъде поне 2 символа');
  }
  if (name.length > 100) {
    errors.push('Името е твърде дълго (максимум 100 символа)');
  }

  // Sanitize email
  const email = sanitizeEmail(data.email);
  if (!email) {
    errors.push('Невалиден email адрес');
  }

  // Sanitize phone
  const phone = sanitizePhone(data.phone);
  if (!phone) {
    errors.push('Невалиден телефонен номер');
  }

  // Sanitize products (validate against known product IDs)
  const validProductIds = [
    'sirene-800',
    'kashkaval-1500',
    'yogurt-45',
    'airan',
    'protein',
  ];

  const selectedProducts = data.selectedProducts.filter((id) =>
    validProductIds.includes(sanitizeText(id))
  );

  if (selectedProducts.length === 0) {
    errors.push('Моля, изберете поне един продукт');
  }

  return {
    name,
    email,
    phone,
    selectedProducts,
    errors,
  };
}

/**
 * Sanitize quiz response data
 * @param data - Raw quiz data
 * @returns Sanitized data
 */
export function sanitizeQuizResponse(data: {
  city: string;
  weapon: string;
  motivation: string;
  email: string;
}): {
  city: string;
  weapon: string;
  motivation: string;
  email: string | null;
  errors: string[];
} {
  const errors: string[] = [];

  // Valid options
  const validCities = ['sofia', 'plovdiv', 'varna', 'burgas', 'ruse'];
  const validWeapons = ['sirene', 'kashkaval', 'kiselo-mlyako', 'airan'];

  // Sanitize city
  const city = sanitizeText(data.city).toLowerCase();
  if (!validCities.includes(city)) {
    errors.push('Невалиден избор на град');
  }

  // Sanitize weapon
  const weapon = sanitizeText(data.weapon).toLowerCase();
  if (!validWeapons.includes(weapon)) {
    errors.push('Невалиден избор на продукт');
  }

  // Sanitize motivation (max 500 chars)
  const motivation = sanitizeText(data.motivation);
  if (motivation.length > 500) {
    errors.push('Мотивацията е твърде дълга (максимум 500 символа)');
  }

  // Sanitize email
  const email = sanitizeEmail(data.email);
  if (!email) {
    errors.push('Невалиден email адрес');
  }

  return {
    city,
    weapon,
    motivation,
    email,
    errors,
  };
}

// ==================================
// GENERAL VALIDATION
// ==================================

/**
 * Validate string length
 * @param str - String to validate
 * @param min - Minimum length
 * @param max - Maximum length
 * @returns Validation result
 */
export function validateLength(
  str: string,
  min: number,
  max: number
): { valid: boolean; error?: string } {
  if (str.length < min) {
    return {
      valid: false,
      error: `Текстът трябва да бъде поне ${min} символа`,
    };
  }

  if (str.length > max) {
    return {
      valid: false,
      error: `Текстът не може да бъде по-дълъг от ${max} символа`,
    };
  }

  return { valid: true };
}

/**
 * Check for malicious patterns (basic)
 * @param input - String to check
 * @returns True if suspicious patterns detected
 */
export function detectMaliciousPatterns(input: string): boolean {
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers like onclick=
    /data:text\/html/i,
    /vbscript:/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /eval\(/i,
    /expression\(/i,
  ];

  return maliciousPatterns.some((pattern) => pattern.test(input));
}

/**
 * Sanitize and validate user input (comprehensive)
 * @param input - User input
 * @param options - Validation options
 * @returns Sanitized input and validation result
 */
export function sanitizeAndValidate(
  input: string,
  options: {
    minLength?: number;
    maxLength?: number;
    type?: 'text' | 'email' | 'phone' | 'name';
  } = {}
): {
  sanitized: string | null;
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check for malicious patterns first
  if (detectMaliciousPatterns(input)) {
    return {
      sanitized: null,
      valid: false,
      errors: ['Невалиден вход - подозрителен код'],
    };
  }

  // Sanitize based on type
  let sanitized: string | null;

  switch (options.type) {
    case 'email':
      sanitized = sanitizeEmail(input);
      if (!sanitized) errors.push('Невалиден email адрес');
      break;

    case 'phone':
      sanitized = sanitizePhone(input);
      if (!sanitized) errors.push('Невалиден телефонен номер');
      break;

    case 'name':
      sanitized = sanitizeName(input);
      break;

    default:
      sanitized = sanitizeText(input);
      break;
  }

  // Check length if specified
  if (sanitized && options.minLength !== undefined) {
    const lengthCheck = validateLength(
      sanitized,
      options.minLength,
      options.maxLength || Infinity
    );
    if (!lengthCheck.valid && lengthCheck.error) {
      errors.push(lengthCheck.error);
    }
  }

  return {
    sanitized,
    valid: errors.length === 0 && sanitized !== null,
    errors,
  };
}
