// Computes the current npm 2FA one-time code from a TOTP secret, so CI can
// pass --otp=<code> to `npm publish` without relaxing the account's
// "Authorization and writes" 2FA requirement. Standard TOTP (RFC 6238) over
// HMAC-SHA1, 30s step, 6 digits — the same algorithm any authenticator app
// (Google Authenticator, Authy, 1Password, ...) uses, so the code this
// prints always matches what the app would show at the same moment.
import { createHmac } from 'node:crypto';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Decode(input) {
  // Tolerate the whitespace/hyphen grouping some authenticator setup
  // screens use when displaying the secret for manual entry (e.g.
  // "ABCD EFGH IJKL" or "ABCD-EFGH-IJKL") — strip that before decoding.
  const cleaned = input.replace(/[\s-]/g, '').replace(/=+$/, '').toUpperCase();
  let bits = '';
  for (const char of cleaned) {
    const index = BASE32_ALPHABET.indexOf(char);
    if (index === -1) throw new Error(`Invalid base32 character in secret: ${char}`);
    bits += index.toString(2).padStart(5, '0');
  }

  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return Buffer.from(bytes);
}

function generateTotp(secret, { step = 30, digits = 6 } = {}) {
  const key = base32Decode(secret);
  const counter = Math.floor(Date.now() / 1000 / step);

  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigUInt64BE(BigInt(counter));

  const hmac = createHmac('sha1', key).update(counterBuffer).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const truncated =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  return String(truncated % 10 ** digits).padStart(digits, '0');
}

const secret = process.env.NPM_OTP_SECRET;
if (!secret) {
  console.error('NPM_OTP_SECRET is not set');
  process.exit(1);
}

console.log(generateTotp(secret));
