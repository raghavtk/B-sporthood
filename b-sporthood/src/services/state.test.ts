import { beforeEach, describe, expect, it } from 'vitest';
import { getCourtById } from '../data/courts';
import type { BookingDraft } from '../types';
import { DEMO_ACCOUNT, getCurrentSession, getCurrentUser, login, logout, signUp } from './auth';
import { cancelBooking, createBooking, getBookingDraft, getBookingsForUser, saveBookingDraft } from './bookings';
import { getStoredBookings, getStoredTheme, getUsers, STORAGE_KEYS } from './storage';

const futureDraft: BookingDraft = {
  courtId: 'court-ace-koramangala', date: '2099-04-01', slot: '18:00', durationHours: 2,
  subtotal: 1300, serviceFee: 65, total: 1365, returnPath: '/checkout',
};

describe('local demo state', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it('recovers safely from malformed and incompatible persisted records', () => {
    window.localStorage.setItem(STORAGE_KEYS.users, '{invalid');
    window.localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify({ version: 0 }));
    window.localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify('neon'));
    window.sessionStorage.setItem(STORAGE_KEYS.bookingDraft, JSON.stringify({ courtId: 2 }));

    expect(getUsers()).toEqual([]);
    expect(getStoredBookings()).toEqual([]);
    expect(getStoredTheme()).toBe('system');
    expect(getBookingDraft()).toBeUndefined();
  });

  it('signs in the seeded demo account and restores its session', async () => {
    const result = await login({ email: DEMO_ACCOUNT.email, password: DEMO_ACCOUNT.password });
    expect(result.ok).toBe(true);
    expect(getCurrentSession()?.userId).toBe('user-demo-player');
    expect(getCurrentUser()?.email).toBe(DEMO_ACCOUNT.email);
    logout();
    expect(getCurrentSession()).toBeUndefined();
  });

  it('creates accounts using a unique salted password hash', async () => {
    const result = await signUp({ name: 'Asha Rao', email: 'asha@example.com', password: 'SafePass123!' });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.user.passwordSalt).not.toBe(result.user.passwordHash);
    expect(result.user.passwordHash).not.toContain('SafePass123!');
    expect((await login({ email: 'asha@example.com', password: 'SafePass123!' })).ok).toBe(true);
  });

  it('persists a draft, creates one idempotent booking, and immediately persists cancellation', async () => {
    const auth = await login({ email: DEMO_ACCOUNT.email, password: DEMO_ACCOUNT.password });
    if (!auth.ok) throw new Error(auth.error);
    expect(getCourtById(futureDraft.courtId)).toBeDefined();

    saveBookingDraft(futureDraft);
    expect(getBookingDraft()).toEqual(futureDraft);
    const created = createBooking(auth.user, futureDraft);
    expect(created.ok).toBe(true);
    if (!created.ok) return;
    expect(created.booking.reference).toMatch(/^BSP-/);
    expect(getBookingDraft()).toBeUndefined();

    const repeated = createBooking(auth.user, futureDraft);
    expect(repeated.ok && repeated.booking.id).toBe(created.booking.id);
    expect(getBookingsForUser(auth.user.id)).toHaveLength(1);

    const cancelled = cancelBooking(created.booking.id, auth.user.id);
    expect(cancelled.ok && cancelled.booking.status).toBe('cancelled');
    expect(getStoredBookings()[0].cancelledAt).toBeTruthy();
  });
});
