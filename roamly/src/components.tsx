import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Heart, MapPin, Search, ShieldCheck, Sparkles, Users, X } from 'lucide-react';
import { destinations, photo } from './data';
import type { Property } from './data';
import { defaultTrip, euro, tripError } from './domain';
import { useStore } from './store';

export function Header() {
  const { user } = useStore();
  return <><div className="lab-strip"><a href="../../index.html">← The collection</a><span>11 · Extended exercise · Local simulation</span><button id="restart" onClick={() => { if (confirm('Reset all Roamly accounts, saved stays and bookings on this browser?')) { localStorage.removeItem('roamly-v1'); location.href = location.pathname; } }}>Restart site ↻</button></div>
    <header className="header"><Link to="/" className="logo"><span className="logo-mark">r</span>roamly<span className="logo-dot">.</span></Link><nav className="main-nav"><div className="nav-dropdown"><Link to="/search">Find a stay <ChevronDown size={13}/></Link><div className="nav-menu">{destinations.map(d => <Link key={d.name} to={`/search?q=${d.name}`}>{d.name}<span>{d.country}</span></Link>)}</div></div><Link to="/inspiration">Inspiration</Link><Link to="/support">Help & support</Link></nav><div className="header-right"><span className="currency">EN · EUR</span><Link className="header-heart" to="/account/favourites"><Heart size={20}/></Link><Link className="account-link" to={user ? '/account' : '/login'}>{user ? user.name.split(' ')[0] : 'Log in'} <ArrowUpRight size={14}/></Link></div></header></>;
}
export function Footer() {
  return <footer className="footer"><div className="footer-main"><div><Link to="/" className="logo">roamly.</Link><p>Good places. Great little moments.<br/>A different way to get away.</p><span className="footer-note">A fictional travel platform. All bookings are simulated.</span></div>{[
    ['Explore', ['All stays','/search'], ['Destinations','/inspiration'], ['Weekend escapes','/search?type=Boutique+hotel'], ['Saved places','/account/favourites']],
    ['Here to help', ['Help centre','/support'], ['Contact us','/support?category=Booking'], ['Your reservations','/account'], ['Cancellation information','/info/cancellation']],
    ['The little details', ['About Roamly','/info/about'], ['Privacy & cookies','/info/privacy'], ['Booking terms','/info/terms'], ['Travel responsibly','/info/responsible']],
  ].map(([title, ...links]) => <div key={title as string}><h3>{title}</h3>{(links as string[][]).map(([label, url]) => <Link to={url} key={label}>{label}</Link>)}</div>)}</div><div className="footer-bottom"><span>© 2026 Roamly Travel Europe</span><span>Made for taking the scenic route. <span className="ml-5">English · EUR €</span></span></div></footer>;
}
export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [params] = useSearchParams(); const navigate = useNavigate();
  const [error, setError] = useState('');
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    const trip = { ...defaultTrip, start: String(f.get('start')), end: String(f.get('end')), guests: Number(f.get('guests')) };
    if (tripError(trip)) { setError(tripError(trip)); return; }
    navigate(`/search?${new URLSearchParams({ q: String(f.get('q')), start: trip.start, end: trip.end, guests: String(trip.guests) })}`);
  }
  return <div className={`search-wrap ${compact ? 'compact-search' : ''}`}><form className="search-bar" onSubmit={submit}><label className="destination-input"><MapPin/><span>Where to?</span><input name="q" aria-label="Destination" list="destinations" defaultValue={params.get('q') || ''} placeholder="City, neighbourhood or a little escape"/></label><datalist id="destinations">{destinations.map(d => <option key={d.name} value={d.name}/>)}</datalist><label><CalendarDays/><span>Check in</span><input type="date" name="start" aria-label="Check in" defaultValue={params.get('start') || defaultTrip.start} required/></label><label><span>Check out</span><input type="date" name="end" aria-label="Check out" defaultValue={params.get('end') || defaultTrip.end} required/></label><label><Users/><span>Guests</span><select name="guests" aria-label="Guests" defaultValue={params.get('guests') || '2'}>{[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}</select></label><button className="btn search-submit" type="submit"><Search size={20}/><span>Find my stay</span></button></form>{error && <p className="error">{error}</p>}</div>;
}
export function SaveButton({ id }: { id: string }) {
  const { favourites, toggleFavourite } = useStore();
  return <button className={`save-btn ${favourites.includes(id) ? 'saved' : ''}`} onClick={() => toggleFavourite(id)}><Heart size={19} fill={favourites.includes(id) ? 'currentColor' : 'none'}/></button>;
}
export function StayCard({ stay, list = false, query = '' }: { stay: Property; list?: boolean; query?: string }) {
  return <article className={`stay-card ${list ? 'list-card' : ''}`}><div className="stay-image"><Link to={`/stay/${stay.id}${query}`} tabIndex={-1}><img src={photo(stay.image)} alt={`${stay.name}, ${stay.city}`}/></Link>{stay.tag && <span className="image-tag"><Sparkles size={11}/>{stay.tag}</span>}<SaveButton id={stay.id}/></div><div className="stay-copy"><div className="flex justify-between gap-3"><span className="overline">{stay.type} · {stay.area}</span><span className="rating"><span>★</span> {stay.rating.toFixed(2)} <small>({stay.reviews})</small></span></div><h3><Link to={`/stay/${stay.id}${query}`}>{stay.name}</Link></h3><p className="stay-location"><MapPin size={13}/>{stay.city}, {stay.country}</p>{list && <><p className="list-description">Quiet corners, thoughtful details and the city on your doorstep.</p><div className="amenity-line">{stay.amenities.slice(0,3).join(' · ')}</div><span className={stay.refundable ? 'policy-green' : 'policy-orange'}>{stay.refundable ? 'Flexible cancellation' : 'Non-refundable rate'}</span></>}<div className="stay-bottom"><span><strong>{euro(stay.price)}</strong> <small>/ night</small></span>{list ? <Link className="btn" to={`/stay/${stay.id}${query}`}>View stay <ArrowRight size={15}/></Link> : <ArrowUpRight size={19}/>}</div></div></article>;
}
export function TrustRow() { return <div className="trust-row"><span><ShieldCheck size={18}/>Thoughtfully chosen stays</span><span><Check size={18}/>Little details, properly considered</span><span><Heart size={18}/>Loved by curious travellers</span></div>; }
export function Crumbs({ current }: { current: string }) { return <div className="crumbs"><Link to="/">Home</Link><span>/</span><Link to="/search">Stays</Link><span>/</span><span>{current}</span></div>; }
export function Modal({ title, children, close }: { title: string; children: React.ReactNode; close: () => void }) { return <div className="overlay" onClick={close}><div className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={close}><X size={20}/></button><h2>{title}</h2>{children}</div></div>; }
