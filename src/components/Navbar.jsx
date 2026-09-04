import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[9000] py-4 px-6 md:py-6 md:px-12 flex justify-between items-center pointer-events-none">
      
      {/* Brutalist Logo - NOW WITH GLASSMORPHISM BLUR SHIELD */}
      <Link 
        to="/" 
        onClick={() => setIsOpen(false)}
        className="font-roboto font-black text-xl md:text-2xl tracking-normal uppercase text-brand-blue pointer-events-auto hover:text-brand-accent-blue transition-colors md:cursor-none bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-white/50 [-webkit-text-stroke:1px_currentColor] z-50 relative"
      >
        SRUSHTI<span className="ml-2">PAGARIYA</span>
      </Link>

      {/* MOBILE HAMBURGER MENU BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden pointer-events-auto bg-white/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 shadow-sm z-50 relative"
      >
        <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
        </svg>
      </button>

      {/* DESKTOP: Floating Glassmorphism Menu */}
      <div className="hidden md:flex gap-8 items-center pointer-events-auto bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
        {/* Home Icon */}
        <Link 
          to="/" 
          className={`hover-target md:cursor-none transition-colors ${location.pathname === '/' ? 'text-brand-accent-blue' : 'text-slate-400 hover:text-brand-accent-blue'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </Link>
        {/* Text Links */}
        <Link to="/about" className={`font-mono text-xs font-bold uppercase tracking-widest hover-target md:cursor-none transition-colors ${location.pathname === '/about' ? 'text-brand-accent-blue' : 'text-slate-500 hover:text-brand-accent-blue'}`}>About</Link>
        <Link to="/work" className={`font-mono text-xs font-bold uppercase tracking-widest hover-target md:cursor-none transition-colors ${location.pathname === '/work' ? 'text-brand-accent-blue' : 'text-slate-500 hover:text-brand-accent-blue'}`}>Work</Link>
        <Link to="/skills" className={`font-mono text-xs font-bold uppercase tracking-widest hover-target md:cursor-none transition-colors ${location.pathname === '/skills' ? 'text-brand-accent-blue' : 'text-slate-500 hover:text-brand-accent-blue'}`}>Skills</Link>
      </div>

      {/* MOBILE: Dropdown Menu Overlay */}
      {isOpen && (
        <div className="absolute top-20 right-6 left-6 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-6 flex flex-col gap-6 pointer-events-auto md:hidden animate-in fade-in slide-in-from-top-4 z-40">
          <Link to="/" onClick={() => setIsOpen(false)} className={`font-mono text-sm font-bold uppercase tracking-widest ${location.pathname === '/' ? 'text-brand-accent-blue' : 'text-slate-600'}`}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className={`font-mono text-sm font-bold uppercase tracking-widest ${location.pathname === '/about' ? 'text-brand-accent-blue' : 'text-slate-600'}`}>About</Link>
          <Link to="/work" onClick={() => setIsOpen(false)} className={`font-mono text-sm font-bold uppercase tracking-widest ${location.pathname === '/work' ? 'text-brand-accent-blue' : 'text-slate-600'}`}>Work</Link>
          <Link to="/skills" onClick={() => setIsOpen(false)} className={`font-mono text-sm font-bold uppercase tracking-widest ${location.pathname === '/skills' ? 'text-brand-accent-blue' : 'text-slate-600'}`}>Skills</Link>
        </div>
      )}
      
    </nav>
  );
};

export default Navbar;