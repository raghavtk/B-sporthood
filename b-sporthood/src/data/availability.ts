import type { Court } from '../types';

export const TIME_SLOTS = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'] as const;

const dayKey = (date: string) => new Date(`${date}T12:00:00`).getDay();
const stableHash = (value: string) => [...value].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 2166136261);

/** Returns local, calendar-safe ISO dates beginning today. */
export function getUpcomingDates(count = 14, from = new Date()): string[] {
  return Array.from({ length: count }, (_, index) => {
    const day = new Date(from.getFullYear(), from.getMonth(), from.getDate() + index, 12);
    return `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
  });
}

/** Deterministic availability lets the demo remain stable after reloads and in tests. */
export function isSlotAvailable(court: Court, date: string, slot: string): boolean {
  if (!TIME_SLOTS.includes(slot as (typeof TIME_SLOTS)[number])) return false;
  const template = court.availability.find((entry) => entry.weekday === dayKey(date));
  if (template?.unavailableSlots.includes(slot)) return false;

  const slotIndex = TIME_SLOTS.indexOf(slot as (typeof TIME_SLOTS)[number]);
  const hash = stableHash(`${court.id}:${date}:${slotIndex}`);
  // A predictable light occupancy pattern, while keeping every date bookable.
  return hash % 11 !== 0 && hash % 17 !== 0;
}

export function getAvailableSlots(court: Court, date: string): string[] {
  return TIME_SLOTS.filter((slot) => isSlotAvailable(court, date, slot));
}
