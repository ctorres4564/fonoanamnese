import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateAge } from '../../utils/age';

describe('calculateAge', () => {
  beforeEach(() => {
    // Mock today's date to 2024-07-13
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-07-13T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calculates correct age before birthday in current year', () => {
    expect(calculateAge('2000-08-15')).toBe(23); // Birthday hasn't happened yet
  });

  it('calculates correct age after birthday in current year', () => {
    expect(calculateAge('2000-05-10')).toBe(24); // Birthday has happened
  });

  it('calculates correct age exactly on birthday', () => {
    expect(calculateAge('2000-07-13')).toBe(24); // Today is birthday
  });

  it('returns 0 for future dates', () => {
    expect(calculateAge('2025-01-01')).toBe(0);
  });

  it('returns 0 for invalid dates', () => {
    expect(calculateAge('')).toBe(0);
    expect(calculateAge('not-a-date')).toBe(0);
  });
});
