// Minimal signed-session helper for the admin area.
//
// Deliberately simple, per Stage 3 scope: one hardcoded ADMIN_PASSWORD env
// var gates login; a signed, expiring cookie tracks the session afterward.
// The cookie is HMAC-signed with AUTH_SECRET so it can't just be forged by
// setting `aljawad_admin_session=admin` by hand in devtools.
//
// Uses only the Web Crypto API (crypto.subtle) so this same file works
// unmodified in both the Edge middleware runtime and the Node.js server
// action / layout runtime. Requires Node 18.17+ (Next.js 14's own minimum).

export const SESSION_COOKIE = "aljawad_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "Missing AUTH_SECRET env var. Set it in your .env file (see README)."
    );
  }
  return secret;
}

function bufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmacSign(message, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return bufferToBase64Url(signature);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Creates a signed session token: "admin.<expiresAt>.<signature>" */
export async function createSessionToken() {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `admin.${expiresAt}`;
  const signature = await hmacSign(payload, getSecret());
  return `${payload}.${signature}`;
}

/** Verifies a session token's signature and expiry. */
export async function verifySessionToken(token) {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [role, expiresAt, signature] = parts;
  if (role !== "admin") return false;
  if (Date.now() > Number(expiresAt)) return false;

  const expectedSignature = await hmacSign(`${role}.${expiresAt}`, getSecret());
  return timingSafeEqual(signature, expectedSignature);
}
