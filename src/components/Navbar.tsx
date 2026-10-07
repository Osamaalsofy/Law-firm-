import React, { useState, useEffect } from 'react';
import { EmblemLogo } from './EmblemLogo';
import { LAWYER_INFO, UI_TRANSLATIONS } from '../data/content';
import { Language } from '../types';
import { Globe, Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  whatsappNumber: string;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Short, crisp navigation items as requested
  const navItems = [
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#consultation', label: t.nav.consultation },
    { href: '#location', label: lang === 'ar' ? 'الموقع والتواصل' : 'Location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E8DFC8] shadow-md shadow-[#C5A059]/5 py-2.5'
          : 'bg-gradient-to-b from-white/95 via-white/85 to-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Name */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5B36]"
          >
            <EmblemLogo size="sm" showSubtitle={false} />
            <div className="text-start">
              <span className="block font-amiri text-lg sm:text-xl font-bold tracking-tight text-[#0D5B36] group-hover:text-[#093E24] transition-colors leading-tight">
                {lang === 'ar' ? LAWYER_INFO.nameAr : LAWYER_INFO.nameEn}
              </span>
              <span className="block text-[11px] sm:text-xs text-[#9B7722] font-semibold leading-none mt-0.5">
                {lang === 'ar' ? 'للمحاماة والاستشارات القانونية' : 'Law & Legal Consultations'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Shortened & Organized) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-700 hover:text-[#0D5B36] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0D5B36] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Tools (Language Switcher & Direct Call) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0D5C1] bg-white hover:bg-[#F9F6F0] hover:border-[#0D5B36] text-xs font-semibold text-slate-700 transition-colors cursor-pointer shadow-xs"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#0D5B36]" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Direct Call to 0568186467 */}
            <a
              href="tel:+966568186467"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E0D5C1] bg-white hover:bg-[#F9F6F0] text-slate-700 hover:text-[#0D5B36] transition-colors shadow-xs text-xs font-bold"
              title={lang === 'ar' ? 'اتصال هاتفي مباشر: 0568186467' : 'Direct Call: +966568186467'}
            >
              <Phone className="w-3.5 h-3.5 text-[#0D5B36]" />
              <span dir="ltr" className="font-mono">056 818 6467</span>
            </a>

            {/* Fast Action Consultation Button */}
            <a
              href="#consultation"
              className="px-4 py-1.5 rounded-lg bg-[#0D5B36] hover:bg-[#0A472A] text-white text-xs font-bold shadow-xs transition-colors"
            >
              {lang === 'ar' ? 'طلب استشارة' : 'Consultation'}
            </a>
          </div>

          {/* Mobile Menu & Lang Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1 rounded border border-[#E0D5C1] bg-white text-xs font-bold text-[#0D5B36]"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white border border-[#E0D5C1] text-slate-700 hover:text-[#0D5B36] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-[#E8DFC8] bg-white/98 rounded-b-2xl px-2 space-y-2 shadow-lg">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-[#F7F4EE] hover:text-[#0D5B36] text-sm font-semibold transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-[#E8DFC8] flex flex-col gap-2">
              <a
                href="#consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0D5B36] hover:bg-[#0A472A] text-white font-bold text-sm shadow-xs"
              >
                <span>{lang === 'ar' ? 'طلب استشارة قانونية' : 'Request Consultation'}</span>
              </a>
              <a
                href="tel:+966568186467"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-[#E0D5C1] bg-[#FDFBF7] text-slate-700 text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-[#0D5B36]" />
                <span dir="ltr">053 782 6875</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
