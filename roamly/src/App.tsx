import { useEffect } from 'react';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from './store';
import { Header, Footer } from './components';
import { Home, Inspiration } from './pages/Home';
import { SearchResults } from './pages/Search';
import { PropertyPage } from './pages/Property';
import { BookingPage, Confirmation } from './pages/Booking';
import { Account, Auth, ForgotPassword } from './pages/Account';
import { Info, Support } from './pages/Support';
function AppRoutes(){const location=useLocation();useEffect(()=>{window.scrollTo(0,0);},[location.pathname]);return <><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/inspiration" element={<Inspiration/>}/><Route path="/search" element={<SearchResults/>}/><Route path="/stay/:id" element={<PropertyPage key={location.pathname}/>}/><Route path="/book/:id" element={<BookingPage key={location.pathname}/>}/><Route path="/confirmation/:id" element={<Confirmation/>}/><Route path="/login" element={<Auth key="login"/>}/><Route path="/register" element={<Auth key="register" register/>}/><Route path="/forgot" element={<ForgotPassword/>}/><Route path="/account/:section?" element={<Account key={location.pathname}/>}/><Route path="/support" element={<Support/>}/><Route path="/info/:slug" element={<Info/>}/><Route path="*" element={<div className="container empty"><h1>A little off the beaten path.</h1><p>This page isn't here anymore.</p><Link className="btn" to="/">Back to exploring</Link></div>}/></Routes></main><Footer/></>;}
export default function App(){return <HashRouter><Provider><AppRoutes/></Provider></HashRouter>;}
