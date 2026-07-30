import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { courts } from '../data/courts';
import type { Booking, BookingDraft, DemoUser, Session, ThemePreference } from '../types';
import { getCurrentSession, getCurrentUser, login as loginUser, logout as logoutUser, signUp as signUpUser, type AuthResult } from '../services/auth';
import { cancelBooking as cancelStoredBooking, clearBookingDraft, createBooking as createStoredBooking, getBookingById, getBookingDraft, getBookingsForUser, saveBookingDraft, type BookingResult } from '../services/bookings';
import { getStoredTheme, saveTheme } from '../services/storage';

interface AppContextValue {
  courts: typeof courts;
  user?: DemoUser;
  session?: Session;
  bookings: Booking[];
  bookingDraft?: BookingDraft;
  themePreference: ThemePreference;
  resolvedTheme: 'light' | 'dark';
  setThemePreference: (theme: ThemePreference) => void;
  login: (credentials: { email: string; password: string }) => Promise<AuthResult>;
  signUp: (details: { name: string; email: string; password: string }) => Promise<AuthResult>;
  logout: () => void;
  saveDraft: (draft: BookingDraft) => void;
  clearDraft: () => void;
  createBooking: (draft: BookingDraft) => BookingResult;
  cancelBooking: (id: string) => BookingResult;
  getBooking: (id: string) => Booking | undefined;
  refreshBookings: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const resolveTheme = (preference: ThemePreference): 'light' | 'dark' => {
  if (preference !== 'system') return preference;
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export function AppProvider({ children }: PropsWithChildren<unknown>) {
  const [user, setUser] = useState<DemoUser | undefined>(() => getCurrentUser());
  const [session, setSession] = useState<Session | undefined>(() => getCurrentSession());
  const [bookingDraft, setBookingDraft] = useState<BookingDraft | undefined>(() => getBookingDraft());
  const [themePreference, setTheme] = useState<ThemePreference>(() => getStoredTheme());
  const [bookings, setBookings] = useState<Booking[]>(() => user ? getBookingsForUser(user.id) : []);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => resolveTheme(themePreference));

  const refreshBookings = useCallback(() => setBookings(user ? getBookingsForUser(user.id) : []), [user]);

  useEffect(() => { refreshBookings(); }, [refreshBookings]);

  useEffect(() => {
    const updateTheme = () => setResolvedTheme(resolveTheme(themePreference));
    updateTheme();
    const media = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
    if (themePreference === 'system' && typeof media?.addEventListener === 'function') media.addEventListener('change', updateTheme);
    return () => {
      if (typeof media?.removeEventListener === 'function') media.removeEventListener('change', updateTheme);
    };
  }, [themePreference]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setThemePreference = useCallback((theme: ThemePreference) => {
    saveTheme(theme);
    setTheme(theme);
  }, []);

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    const result = await loginUser(credentials);
    if (result.ok) {
      setUser(result.user);
      setSession(getCurrentSession());
    }
    return result;
  }, []);

  const signUp = useCallback(async (details: { name: string; email: string; password: string }) => {
    const result = await signUpUser(details);
    if (result.ok) {
      setUser(result.user);
      setSession(getCurrentSession());
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(undefined);
    setSession(undefined);
    setBookings([]);
  }, []);

  const saveDraft = useCallback((draft: BookingDraft) => {
    saveBookingDraft(draft);
    setBookingDraft(draft);
  }, []);

  const clearDraft = useCallback(() => {
    clearBookingDraft();
    setBookingDraft(undefined);
  }, []);

  const createBooking = useCallback((draft: BookingDraft): BookingResult => {
    if (!user) return { ok: false, error: 'Please sign in before confirming your booking.' };
    const result = createStoredBooking(user, draft);
    if (result.ok) {
      setBookingDraft(undefined);
      setBookings(getBookingsForUser(user.id));
    }
    return result;
  }, [user]);

  const cancelBooking = useCallback((id: string): BookingResult => {
    if (!user) return { ok: false, error: 'Please sign in to manage bookings.' };
    const result = cancelStoredBooking(id, user.id);
    if (result.ok) setBookings(getBookingsForUser(user.id));
    return result;
  }, [user]);

  const getBooking = useCallback((id: string) => {
    const booking = getBookingById(id);
    return booking?.userId === user?.id ? booking : undefined;
  }, [user]);

  const value = useMemo<AppContextValue>(() => ({
    courts, user, session, bookings, bookingDraft, themePreference, resolvedTheme, setThemePreference,
    login, signUp, logout, saveDraft, clearDraft, createBooking, cancelBooking, getBooking, refreshBookings,
  }), [user, session, bookings, bookingDraft, themePreference, resolvedTheme, setThemePreference, login, signUp, logout, saveDraft, clearDraft, createBooking, cancelBooking, getBooking, refreshBookings]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider.');
  return context;
}
