import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { delay } from './domain';
import type { Trip, Extras } from './domain';

export type Booking = { id: string; propertyId: string; trip: Trip; extras: Extras; total: number; guest: string; email: string; status: 'Confirmed' | 'Cancelled' | 'Completed' };
export type Preferences = { offers: boolean; reminders: boolean; partners: boolean; currency: string; language: string };
type Account = { email: string; name: string; hash: string; phone: string; preferences: Preferences; favourites: string[]; bookings: Booking[] };
type Saved = { accounts: Account[]; session: string | null; favourites: string[]; guestBookings: Booking[] };
const KEY = 'roamly-v1';
const preferences: Preferences = { offers: true, reminders: true, partners: true, currency: 'EUR', language: 'English' };
const seedBooking = (id: string, propertyId: string, start: string, end: string, status: Booking['status']): Booking => ({ id, propertyId, trip: { start, end, guests: 2, room: 'classic' }, extras: { breakfast: true, transfer: false, protection: false }, total: 492.24, guest: 'Alex Morgan', email: 'demo@roamly.example', status });
async function digest(password: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
}
async function initial(): Promise<Saved> {
  const empty: Saved = { accounts: [], session: null, favourites: [], guestBookings: [] };
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && Array.isArray(saved.accounts) && saved.accounts.every((a: Account) => typeof a.email === 'string' && typeof a.hash === 'string' && Array.isArray(a.bookings) && Array.isArray(a.favourites) && a.preferences) && Array.isArray(saved.favourites) && Array.isArray(saved.guestBookings)) return saved;
  } catch { /* A clean local account is available if browser storage was cleared. */ }
  empty.accounts.push({ email: 'demo@roamly.example', name: 'Alex Morgan', hash: await digest('Roamly2026!'), phone: '+32 470 00 12 34', preferences, favourites: ['stay-1','stay-6','stay-13'], bookings: [seedBooking('RM-482916', 'stay-1', '2026-12-11', '2026-12-14', 'Confirmed'), seedBooking('RM-371025', 'stay-6', '2026-08-21', '2026-08-24', 'Completed')] });
  return empty;
}
const boot = initial();
type Store = {
  data: Saved; user: Account | undefined; favourites: string[]; bookings: Booking[]; notice: string;
  notify: (message: string) => void; toggleFavourite: (id: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<string>;
  resetPassword: (email: string, password: string) => Promise<void>;
  logout: () => void; updateProfile: (name: string, phone: string) => void;
  updatePreferences: (value: Preferences) => void; book: (booking: Booking) => void;
  cancel: (id: string) => void;
};
const Context = createContext<Store | null>(null);
export function Provider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Saved | null>(null);
  const [notice, setNotice] = useState('');
  const [storageError, setStorageError] = useState(false);
  if (!data) { boot.then(setData); return <div className="boot">roamly<span>Finding your little somewhere…</span></div>; }
  function persist(transform: (old: Saved) => Saved) {
    setData(old => {
      const next = transform(old!);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { setStorageError(true); }
      return next;
    });
  }
  const user = data.accounts.find(a => a.email === data.session);
  const notify = (message: string) => { setNotice(message); setTimeout(() => setNotice(''), 4200); };
  const changeUser = (fn: (a: Account) => Account) => persist(old => ({ ...old, accounts: old.accounts.map(a => a.email === user?.email ? fn(a) : a) }));
  const value: Store = {
    data, user, notice, notify, favourites: user?.favourites || data.favourites, bookings: user?.bookings || data.guestBookings,
    toggleFavourite(id) {
      const toggle = (a: string[]) => a.includes(id) ? a.filter(v => v !== id) : [...a, id];
      if (user) changeUser(a => ({ ...a, favourites: toggle(a.favourites) }));
      else persist(old => ({ ...old, favourites: toggle(old.favourites) }));
    },
    async login(email, password) {
      await delay(); const hash = await digest(password);
      const normalized = email.trim().toLowerCase();
      if (!data.accounts.some(a => a.email === normalized && a.hash === hash)) return false;
      persist(old => ({ ...old, session: normalized, guestBookings: [], favourites: [], accounts: old.accounts.map(a => a.email === normalized ? { ...a, bookings: [...a.bookings, ...old.guestBookings], favourites: [...new Set([...a.favourites, ...old.favourites])] } : a) })); return true;
    },
    async register(name, email, password) {
      await delay(); const normalized = email.trim().toLowerCase();
      if (data.accounts.some(a => a.email === normalized)) return 'An account already exists with that email.';
      const hash = await digest(password);
      persist(old => ({ ...old, session: normalized, guestBookings: [], favourites: [], accounts: [...old.accounts, { name, email: normalized, hash, phone: '', preferences: { ...preferences }, favourites: old.favourites, bookings: old.guestBookings }] })); return '';
    },
    async resetPassword(email, password) { await delay(700); const hash=await digest(password); persist(old=>({...old,accounts:old.accounts.map(a=>a.email===email.trim().toLowerCase()?{...a,hash}:a)})); },
    logout() { persist(old => ({ ...old, session: null })); },
    updateProfile(name, phone) { changeUser(a => ({ ...a, name, phone })); },
    updatePreferences(next) { changeUser(a => ({ ...a, preferences: next })); },
    book(booking) {
      if (user) changeUser(a => ({ ...a, bookings: [booking, ...a.bookings] }));
      else persist(old => ({ ...old, guestBookings: [booking, ...old.guestBookings] }));
    },
    cancel(id) {
      const change = (a: Booking[]) => a.map(b => b.id === id ? { ...b, status: 'Cancelled' as const } : b);
      if (user) changeUser(a => ({ ...a, bookings: change(a.bookings) }));
      else persist(old => ({ ...old, guestBookings: change(old.guestBookings) }));
    },
  };
  return <Context.Provider value={value}>{children}{notice && <div className="toast">{notice}</div>}{storageError && <div className="storage-error" role="alert">Browser storage is unavailable. Your changes will last until this page closes.</div>}</Context.Provider>;
}
export function useStore() { return useContext(Context)!; }
