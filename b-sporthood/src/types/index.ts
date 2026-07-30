export type ThemePreference = 'system' | 'light' | 'dark';
export type BookingStatus = 'upcoming' | 'past' | 'cancelled';

export interface AvailabilityTemplate {
  weekday: number;
  unavailableSlots: string[];
}

export interface Court {
  id: string;
  slug: string;
  name: string;
  area: string;
  address: string;
  distanceKm: number;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  description: string;
  amenities: string[];
  rules: string[];
  equipment: string[];
  images: string[];
  availability: AvailabilityTemplate[];
  featured?: boolean;
}

export interface BookingDraft {
  courtId: string;
  date: string;
  slot: string;
  durationHours: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  returnPath: string;
}

export interface Booking {
  id: string;
  reference: string;
  userId: string;
  court: Pick<Court, 'id' | 'slug' | 'name' | 'area' | 'address' | 'images'>;
  date: string;
  slot: string;
  durationHours: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  status: BookingStatus;
  createdAt: string;
  cancelledAt?: string;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
}

export interface Session {
  userId: string;
  createdAt: string;
  expiresAt: string;
}
