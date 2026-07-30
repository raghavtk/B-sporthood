import { describe, expect, it } from 'vitest';
import { getAvailableSlots, getUpcomingDates, isSlotAvailable, TIME_SLOTS } from './availability';
import { courts } from './courts';

describe('court availability', () => {
  it('provides complete, unique Bengaluru court fixtures', () => {
    expect(courts).toHaveLength(7);
    expect(new Set(courts.map((court) => court.id)).size).toBe(courts.length);
    expect(new Set(courts.map((court) => court.slug)).size).toBe(courts.length);
    courts.forEach((court) => {
      expect(court.pricePerHour).toBeGreaterThan(0);
      expect(court.images.every((image) => image.startsWith('/images/courts/'))).toBe(true);
      expect(court.availability.length).toBeGreaterThan(0);
    });
  });

  it('generates a deterministic fourteen-day calendar and deterministic slot states', () => {
    const dates = getUpcomingDates(14, new Date(2026, 6, 30));
    expect(dates).toHaveLength(14);
    expect(dates[0]).toBe('2026-07-30');
    expect(new Set(dates).size).toBe(14);

    const first = getAvailableSlots(courts[0], dates[0]);
    expect(first).toEqual(getAvailableSlots(courts[0], dates[0]));
    expect(first.length).toBeGreaterThan(0);
    expect(first.length).toBeLessThan(TIME_SLOTS.length);
    expect(isSlotAvailable(courts[0], dates[0], 'not-a-slot')).toBe(false);
  });
});
