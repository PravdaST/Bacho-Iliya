/**
 * Password Hashing Script
 * Usage: npm run hash-password
 *
 * This script helps you generate a bcrypt hash for your admin password.
 * Copy the hash to your .env.local file as ADMIN_PASSWORD value.
 */

import * as readline from 'readline';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Validate password strength
function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 12) {
    errors.push('❌ Password must be at least 12 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('❌ Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('❌ Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('❌ Password must contain at least one number');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('❌ Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Prompt for password
function promptPassword(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    // Hide password input (not perfect but better than nothing)
    if (process.stdout.isTTY) {
      const stdin = process.stdin;
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding('utf8');

      let password = '';
      process.stdout.write(prompt);

      stdin.on('data', (char: string) => {
        char = char.toString();

        switch (char) {
          case '\n':
          case '\r':
          case '\u0004': // Ctrl-D
            stdin.setRawMode(false);
            stdin.pause();
            process.stdout.write('\n');
            resolve(password);
            break;
          case '\u0003': // Ctrl-C
            process.exit();
            break;
          case '\u007f': // Backspace
            if (password.length > 0) {
              password = password.slice(0, -1);
              process.stdout.write('\b \b');
            }
            break;
          default:
            password += char;
            process.stdout.write('*');
            break;
        }
      });
    } else {
      // Fallback for non-TTY (CI/CD)
      rl.question(prompt, (answer) => {
        resolve(answer);
      });
    }
  });
}

// Main function
async function main() {
  console.log('🔐 ADMIN PASSWORD HASHER');
  console.log('='.repeat(50));
  console.log('\nThis script will help you generate a bcrypt hash for your admin password.');
  console.log('The hash will be stored in your .env.local file.\n');

  console.log('📋 PASSWORD REQUIREMENTS:');
  console.log('  • Minimum 12 characters');
  console.log('  • At least one uppercase letter');
  console.log('  • At least one lowercase letter');
  console.log('  • At least one number');
  console.log('  • At least one special character (!@#$%^&* etc.)\n');

  try {
    // Get password
    const password = await promptPassword('Enter admin password: ');

    if (!password) {
      console.error('\n❌ Password cannot be empty!');
      process.exit(1);
    }

    // Validate password
    const validation = validatePassword(password);

    if (!validation.valid) {
      console.log('\n⚠️  PASSWORD VALIDATION FAILED:\n');
      validation.errors.forEach((error) => console.log(`  ${error}`));
      console.log('\n💡 Example of a strong password: MyS3cur3P@ssw0rd!2025');
      process.exit(1);
    }

    // Confirm password
    const passwordConfirm = await promptPassword('Confirm admin password: ');

    if (password !== passwordConfirm) {
      console.error('\n❌ Passwords do not match!');
      process.exit(1);
    }

    console.log('\n⏳ Hashing password (this may take a few seconds)...');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    console.log('\n✅ PASSWORD HASHED SUCCESSFULLY!\n');
    console.log('='.repeat(50));
    console.log('📋 COPY THIS LINE TO YOUR .env.local FILE:\n');
    console.log(`ADMIN_PASSWORD='${hashedPassword}'`);
    console.log('\n⚠️  IMPORTANT: Use SINGLE quotes to prevent $ symbol issues on Windows!');
    console.log('='.repeat(50));

    console.log('\n📝 NEXT STEPS:');
    console.log('  1. Open your .env.local file');
    console.log('  2. Find the line: ADMIN_PASSWORD=...');
    console.log('  3. Replace it with the hash above');
    console.log('  4. Save the file');
    console.log('  5. Restart your development server\n');

    console.log('⚠️  IMPORTANT: Keep this hash secure and never share it publicly!');

    // Close readline
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error);
    rl.close();
    process.exit(1);
  }
}

// Run
main();
