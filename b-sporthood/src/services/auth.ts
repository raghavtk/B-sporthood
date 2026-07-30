import type { DemoUser, Session } from '../types';
import { clearStoredSession, getStoredSession, getUsers, saveSession, saveUsers } from './storage';

const SESSION_LIFETIME_MS = 1000 * 60 * 60 * 24 * 14;
const DEMO_SALT = 'YnNwb3J0aG9vZC1kZW1vLXBsYXllci12MQ==';
const DEMO_HASH = 'iO4vBLAQCfb0fI8S5CadvFW9GSy28x4MNuxVBhvJ1nQ=';

export const DEMO_ACCOUNT = { email: 'player@bsporthood.demo', password: 'Play123!', name: 'Court Player' } as const;

export type AuthResult = { ok: true; user: DemoUser } | { ok: false; error: string };

const asBase64 = (bytes: Uint8Array): string => {
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
};

const fromBase64 = (value: string): Uint8Array => Uint8Array.from(atob(value), (character) => character.charCodeAt(0));

const cryptoApi = (): Crypto => {
  if (!globalThis.crypto?.subtle) throw new Error('Secure browser cryptography is unavailable.');
  return globalThis.crypto;
};

export async function hashPassword(password: string, salt: string): Promise<string> {
  const crypto = cryptoApi();
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: fromBase64(salt), iterations: 120_000, hash: 'SHA-256' }, key, 256);
  return asBase64(new Uint8Array(bits));
}

const makeId = (prefix: string) => `${prefix}-${cryptoApi().randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`}`;

export function ensureDemoUser(): DemoUser {
  const existing = getUsers().find((user) => user.email.toLowerCase() === DEMO_ACCOUNT.email);
  if (existing) return existing;
  const user: DemoUser = {
    id: 'user-demo-player', name: DEMO_ACCOUNT.name, email: DEMO_ACCOUNT.email,
    passwordHash: DEMO_HASH, passwordSalt: DEMO_SALT, createdAt: '2026-01-01T09:00:00.000Z',
  };
  saveUsers([...getUsers(), user]);
  return user;
}

const makeSession = (userId: string): Session => {
  const now = new Date();
  return { userId, createdAt: now.toISOString(), expiresAt: new Date(now.getTime() + SESSION_LIFETIME_MS).toISOString() };
};

export function getCurrentSession(): Session | undefined {
  const session = getStoredSession();
  if (!session) return undefined;
  if (new Date(session.expiresAt).getTime() <= Date.now()) {
    clearStoredSession();
    return undefined;
  }
  return session;
}

export function getCurrentUser(): DemoUser | undefined {
  ensureDemoUser();
  const session = getCurrentSession();
  return session ? getUsers().find((user) => user.id === session.userId) : undefined;
}

export async function login(credentials: { email: string; password: string }): Promise<AuthResult> {
  const email = credentials.email.trim().toLowerCase();
  ensureDemoUser();
  const user = getUsers().find((candidate) => candidate.email.toLowerCase() === email);
  if (!user) return { ok: false, error: 'We could not find an account with that email.' };
  try {
    if (await hashPassword(credentials.password, user.passwordSalt) !== user.passwordHash) {
      return { ok: false, error: 'That password does not match this account.' };
    }
  } catch {
    return { ok: false, error: 'Secure sign-in is unavailable in this browser.' };
  }
  saveSession(makeSession(user.id));
  return { ok: true, user };
}

export async function signUp(details: { name: string; email: string; password: string }): Promise<AuthResult> {
  const name = details.name.trim();
  const email = details.email.trim().toLowerCase();
  if (name.length < 2) return { ok: false, error: 'Enter your name so we know what to call you.' };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: 'Enter a valid email address.' };
  if (details.password.length < 8) return { ok: false, error: 'Use at least 8 characters for your password.' };

  ensureDemoUser();
  if (getUsers().some((user) => user.email.toLowerCase() === email)) return { ok: false, error: 'An account already exists for that email.' };
  try {
    const crypto = cryptoApi();
    const saltBytes = new Uint8Array(16);
    crypto.getRandomValues(saltBytes);
    const passwordSalt = asBase64(saltBytes);
    const user: DemoUser = { id: makeId('user'), name, email, passwordSalt, passwordHash: await hashPassword(details.password, passwordSalt), createdAt: new Date().toISOString() };
    saveUsers([...getUsers(), user]);
    saveSession(makeSession(user.id));
    return { ok: true, user };
  } catch {
    return { ok: false, error: 'Secure sign-up is unavailable in this browser.' };
  }
}

export function logout(): void {
  clearStoredSession();
}
