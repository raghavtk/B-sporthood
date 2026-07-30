import type { Booking, BookingDraft, DemoUser } from '../types';
import { getCourtById } from '../data/courts';
import { clearStoredDraft, getStoredBookings, getStoredDraft, saveBookings, saveDraft as storeDraft } from './storage';

export type BookingResult = { ok: true; booking: Booking } | { ok: false; error: string };

const makeId = () => `booking-${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`}`;
const makeReference = () => `BSP-${Math.random().toString(36).slice(2, 8).toUpperCase()}-${Date.now().toString(36).slice(-4).toUpperCase()}`;

const todayKey = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};
const statusFor = (date: string): Booking['status'] => date < todayKey() ? 'past' : 'upcoming';

export const getBookingDraft = () => getStoredDraft();
export const saveBookingDraft = (draft: BookingDraft) => storeDraft(draft);
export const clearBookingDraft = () => clearStoredDraft();

export function getBookingsForUser(userId: string): Booking[] {
  return getStoredBookings()
    .filter((booking) => booking.userId === userId)
    .map((booking) => booking.status === 'upcoming' && statusFor(booking.date) === 'past' ? { ...booking, status: 'past' as const } : booking)
    .sort((a, b) => `${b.date}T${b.slot}`.localeCompare(`${a.date}T${a.slot}`));
}

export const getBookingById = (id: string) => getStoredBookings().find((booking) => booking.id === id);

export function createBooking(user: DemoUser, draft: BookingDraft): BookingResult {
  const court = getCourtById(draft.courtId);
  if (!court) return { ok: false, error: 'That court is no longer available. Please choose another venue.' };
  if (draft.durationHours < 1 || draft.total <= 0) return { ok: false, error: 'Your booking selection is incomplete.' };

  const existing = getStoredBookings().find((booking) => booking.userId === user.id && booking.court.id === draft.courtId && booking.date === draft.date && booking.slot === draft.slot && booking.durationHours === draft.durationHours && booking.status !== 'cancelled');
  if (existing) return { ok: true, booking: existing };

  const booking: Booking = {
    id: makeId(), reference: makeReference(), userId: user.id,
    court: { id: court.id, slug: court.slug, name: court.name, area: court.area, address: court.address, images: court.images },
    date: draft.date, slot: draft.slot, durationHours: draft.durationHours, subtotal: draft.subtotal,
    serviceFee: draft.serviceFee, total: draft.total, status: statusFor(draft.date), createdAt: new Date().toISOString(),
  };
  saveBookings([...getStoredBookings(), booking]);
  clearStoredDraft();
  return { ok: true, booking };
}

export function cancelBooking(id: string, userId: string): BookingResult {
  const bookings = getStoredBookings();
  const existing = bookings.find((booking) => booking.id === id && booking.userId === userId);
  if (!existing) return { ok: false, error: 'We could not find that booking.' };
  if (existing.status === 'cancelled') return { ok: false, error: 'This booking has already been cancelled.' };
  if (existing.status === 'past') return { ok: false, error: 'Past bookings cannot be cancelled.' };
  const booking: Booking = { ...existing, status: 'cancelled', cancelledAt: new Date().toISOString() };
  saveBookings(bookings.map((item) => item.id === id ? booking : item));
  return { ok: true, booking };
}
