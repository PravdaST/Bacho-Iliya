# 🔒 SECURITY GUIDELINES

## Environment Variables

### ⚠️ CRITICAL: Never commit `.env.local` to git!

Your `.env.local` file contains sensitive credentials. Always:

1. ✅ Use `.env.example` as a template
2. ✅ Add `.env.local` to `.gitignore`
3. ✅ Use strong, unique passwords
4. ✅ Rotate secrets regularly

### Password Requirements

**Admin Password must have:**
- Minimum 12 characters
- Mix of uppercase and lowercase letters
- Numbers
- Special characters (@, #, $, !, etc.)

❌ **BAD:** `password123`, `admin`, `123456789`
✅ **GOOD:** `B@ch0Il1ya2025!Secure`, `MyS3cur3P@ssw0rd!2025`

---

## Production Deployment

### Before going live:

1. **Change all default passwords**
   ```bash
   ADMIN_PASSWORD=your_strong_unique_password_here
   ```

2. **Generate new SESSION_SECRET**
   ```bash
   # Use this command to generate a secure random string:
   openssl rand -hex 32
   ```

3. **Update Supabase RLS policies**
   - Ensure Row Level Security is enabled
   - Test all policies in development first

4. **Enable HTTPS only**
   - Update `NEXT_PUBLIC_SITE_URL` to HTTPS
   - Set secure cookie flags

5. **Rate limiting**
   - Implement on login endpoints
   - Monitor for brute-force attacks

---

## API Keys & Secrets

### Supabase

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Safe to expose (public)
- `SUPABASE_SERVICE_ROLE_KEY` - **NEVER** expose (server-only)

### Resend

- `RESEND_API_KEY` - Server-only, never expose to client

### Admin Auth

- `ADMIN_PASSWORD` - Hashed with bcrypt, never plain text in production
- `SESSION_SECRET` - Server-only, used for JWT signing

---

## Security Checklist

- [ ] Changed default admin password
- [ ] Generated unique SESSION_SECRET
- [ ] Enabled HTTPS in production
- [ ] Verified RLS policies work correctly
- [ ] Tested rate limiting
- [ ] Reviewed all API endpoints for auth
- [ ] Tested CSRF protection
- [ ] Reviewed user input sanitization
- [ ] Enabled Content Security Policy (CSP)
- [ ] Set secure HTTP headers

---

## Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public GitHub issue
2. Email: security@bacho-iliya.bg (if exists)
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

---

## Best Practices

### For Developers

1. **Never log sensitive data**
   ```javascript
   // ❌ BAD
   console.log('User password:', password);

   // ✅ GOOD
   console.log('User login attempt:', { email: user.email });
   ```

2. **Always sanitize user input**
   ```javascript
   import DOMPurify from 'isomorphic-dompurify';

   const clean = DOMPurify.sanitize(userInput);
   ```

3. **Use environment-specific configs**
   ```javascript
   // Development
   if (process.env.NODE_ENV === 'development') {
     console.log('Debug mode enabled');
   }

   // Production
   if (process.env.NODE_ENV === 'production') {
     // Strict security
   }
   ```

### For Administrators

1. **Regular security audits**
   - Monthly password changes
   - Quarterly dependency updates
   - Annual penetration testing

2. **Monitor logs**
   - Failed login attempts
   - API error rates
   - Suspicious activity patterns

3. **Backup strategy**
   - Daily Supabase backups
   - Test recovery procedures
   - Keep backups encrypted

---

## Contact

For security concerns:
- Email: info@bacho-iliya.bg
- Emergency: [phone number]

---

**Last Updated:** January 2025
**Version:** 1.0.0
