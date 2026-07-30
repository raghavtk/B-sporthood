import type { Booking, BookingDraft, DemoUser, Session, ThemePreference } from '../types';

export const STORAGE_KEYS = {
  users: 'bsporthood:v1:users',
  session: 'bsporthood:v1:session',
  bookings: 'bsporthood:v1:bookings',
  theme: 'bsporthood:v1:theme',
  bookingDraft: 'bsporthood:v1:booking-draft',
} as const;

type StorageArea = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const browserStorage = (kind: 'local' | 'session'): StorageArea | undefined => {
  if (typeof window === 'undefined') return undefined;
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return undefined;
  }
};

function safeRead<T>(storage: StorageArea | undefined, key: string, fallback: T, isValid: (value: unknown) => value is T): T {
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(key);
    if (!raw) return fallback;
    const value: unknown = JSON.parse(raw);
    return isValid(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(storage: StorageArea | undefined, key: string, value: unknown): void {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    // The demo should remain usable when browser storage is unavailable or full.
  }
}

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const isUser = (value: unknown): value is DemoUser => isObject(value) && typeof value.id === 'string' && typeof value.name === 'string' && typeof value.email === 'string' && typeof value.passwordHash === 'string' && typeof value.passwordSalt === 'string' && typeof value.createdAt === 'string';
const isSession = (value: unknown): value is Session => isObject(value) && typeof value.userId === 'string' && typeof value.createdAt === 'string' && typeof value.expiresAt === 'string' && !Number.isNaN(Date.parse(value.expiresAt));
const isBooking = (value: unknown): value is Booking => isObject(value) && typeof value.id === 'string' && typeof value.reference === 'string' && typeof value.userId === 'string' && isObject(value.court) && typeof value.court.id === 'string' && typeof value.court.slug === 'string' && typeof value.court.name === 'string' && typeof value.date === 'string' && typeof value.slot === 'string' && typeof value.durationHours === 'number' && typeof value.subtotal === 'number' && typeof value.serviceFee === 'number' && typeof value.total === 'number' && (value.status === 'upcoming' || value.status === 'past' || value.status === 'cancelled') && typeof value.createdAt === 'string';
const isDraft = (value: unknown): value is BookingDraft => isObject(value) && typeof value.courtId === 'string' && typeof value.date === 'string' && typeof value.slot === 'string' && typeof value.durationHours === 'number' && typeof value.subtotal === 'number' && typeof value.serviceFee === 'number' && typeof value.total === 'number' && typeof value.returnPath === 'string';

export const getUsers = () => safeRead(browserStorage('local'), STORAGE_KEYS.users, [] as DemoUser[], (value): value is DemoUser[] => Array.isArray(value) && value.every(isUser));
export const saveUsers = (users: DemoUser[]) => safeWrite(browserStorage('local'), STORAGE_KEYS.users, users);
export const getStoredSession = () => safeRead(browserStorage('local'), STORAGE_KEYS.session, undefined as Session | undefined, isSession);
export const saveSession = (session: Session) => safeWrite(browserStorage('local'), STORAGE_KEYS.session, session);
export const clearStoredSession = () => browserStorage('local')?.removeItem(STORAGE_KEYS.session);
export const getStoredBookings = () => safeRead(browserStorage('local'), STORAGE_KEYS.bookings, [] as Booking[], (value): value is Booking[] => Array.isArray(value) && value.every(isBooking));
export const saveBookings = (bookings: Booking[]) => safeWrite(browserStorage('local'), STORAGE_KEYS.bookings, bookings);
export const getStoredTheme = () => safeRead(browserStorage('local'), STORAGE_KEYS.theme, 'system' as ThemePreference, (value): value is ThemePreference => value === 'system' || value === 'light' || value === 'dark');
export const saveTheme = (theme: ThemePreference) => safeWrite(browserStorage('local'), STORAGE_KEYS.theme, theme);
export const getStoredDraft = () => safeRead(browserStorage('session'), STORAGE_KEYS.bookingDraft, undefined as BookingDraft | undefined, isDraft);
export const saveDraft = (draft: BookingDraft) => safeWrite(browserStorage('session'), STORAGE_KEYS.bookingDraft, draft);
export const clearStoredDraft = () => browserStorage('session')?.removeItem(STORAGE_KEYS.bookingDraft);
