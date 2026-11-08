export type Trip = { start: string; end: string; guests: number; room: 'classic' | 'terrace' };
export type Extras = { breakfast: boolean; transfer: boolean; protection: boolean };
export const defaultTrip: Trip = { start: '2026-12-11', end: '2026-12-14', guests: 2, room: 'classic' };
export const euro = (value: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(value);
export function nights(trip: Trip) {
  return Math.round((Date.parse(trip.end) - Date.parse(trip.start)) / 86400000);
}
export function tripError(trip: Trip, capacity = 6) {
  const count = nights(trip);
  if (!Number.isFinite(count) || count < 1) return 'Choose a check-out date after your check-in date.';
  if (count > 30) return 'For stays longer than 30 nights, please contact our team.';
  if (!Number.isInteger(trip.guests) || trip.guests < 1 || trip.guests > capacity) return `This stay welcomes 1–${capacity} guests.`;
  return '';
}
export function quote(price: number, trip: Trip, extras: Extras) {
  const count = nights(trip);
  const room = (price + (trip.room === 'terrace' ? 32 : 0)) * count;
  const breakfast = extras.breakfast ? 18 * trip.guests * count : 0;
  const transfer = extras.transfer ? 48 : 0;
  const protection = extras.protection ? 29 : 0;
  const fee = Math.round(room * .085 * 100) / 100;
  const tax = 3.5 * trip.guests * count;
  return { count, room, breakfast, transfer, protection, fee, tax, total: Math.round((room + breakfast + transfer + protection + fee + tax) * 100) / 100 };
}
export const delay = (ms = 850) => new Promise<void>(resolve => setTimeout(resolve, ms));
