import React, { useState } from 'react';
import { LAWYER_INFO } from '../data/content';
import { Language } from '../types';
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  Building2,
  ShieldCheck,
  Compass,
  Layers,
  Sparkles,
} from 'lucide-react';

interface OfficeLocationSectionProps {
  lang: Language;
  whatsappNumber: string;
}

type MapMode = 'satellite' | 'street';

export const OfficeLocationSection: React.FC<OfficeLocationSectionProps> = ({
  lang,
  whatsappNumber,
}) => {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [mapMode, setMapMode] = useState<MapMode>('satellite');
  const cleanWaNumber = (whatsappNumber || LAWYER_INFO.defaultWhatsApp).replace(/[^0-9]/g, '');

  const coordsText = '21.4261252, 39.2973137';
  const coordsDMS = "21°25'34.1\"N 39°17'50.3\"E";
  const googleMapsUrl = 'https://maps.app.goo.gl/5hn1F3Y4aPxKMAc2A';

  // Embed URLs:
  // Satellite (t=k): Ultra cinematic high-res satellite aerial imagery of Saudi office location
  // Street: Clear topography and street avenues
  const embedUrl =
    mapMode === 'satellite'
      ? 'https://maps.google.com/maps?q=مكتب+المحامي+علي+عبدالله+الزيلعي+للمحاماة&ll=21.4261252,39.2973137&t=k&z=17&output=embed'
      : 'https://maps.google.com/maps?q=مكتب+المحامي+علي+عبدالله+الزيلعي+للمحاماة&ll=21.4261252,39.2973137&z=16&output=embed';

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(coordsText);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  const visitWaUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'السلام عليكم ورحمة الله، أود التنسيق لحجز موعد زيارة في مقر مكتب المحامي علي عبدالله الزيلعي للمحاماة.'
      : 'Greetings, I would like to schedule an in-person visit at Advocate Ali Abdullah Al-Zayla\'i Law Office.'
  )}`;

  return (
    <section id="location" className="py-24 bg-[#F8F5EE] relative border-t border-[#EAE2D2] overflow-hidden">
      {/* Subtle luxury ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0D5B36]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#D5C6AC] shadow-xs mb-4">
            <Compass className="w-4 h-4 text-[#0D5B36] animate-spin-slow" />
            <span className="text-xs sm:text-sm text-[#0D5B36] font-bold">
              {lang === 'ar' ? 'الموقع الجغرافي وخريطة المقر المعتمدة' : 'Geographic Coordinates & Map'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14261C] font-amiri mb-4">
            {lang === 'ar'
              ? 'تفضل بزيارتنا في مقر مكتب المحامي علي الزيلعي'
              : 'Visit Advocate Ali Al-Zayla\'i Law Office'}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl mx-auto">
            {lang === 'ar'
              ? 'نسعد باستقبالكم لدراسة ملفات القضايا وتقديم المشورة القانونية المتخصصة في بيئة تتسم بأعلى درجات السرية والاحترافية.'
              : 'We welcome you to visit our official office for comprehensive case reviews and high-level confidential legal consultation.'}
          </p>
        </div>

        {/* Map & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Cinematic Interactive Map Frame (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[440px] sm:h-[500px] lg:h-full min-h-[440px] rounded-3xl overflow-hidden border-2 border-[#C9A44D] bg-[#0E1F15] shadow-[0_20px_50px_rgba(10,35,20,0.25)] group p-1.5 transition-all">
              {/* Inner screen container with cinematic vignette */}
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#0A160F]">
                {/* Google Maps Embed iframe with cinematic tone filter */}
                <iframe
                  title={
                    lang === 'ar'
                      ? 'موقع مكتب المحامي علي عبدالله الزيلعي'
                      : 'Advocate Ali Al-Zayla\'i Office Location'
                  }
                  src={embedUrl}
                  className={`w-full h-full border-0 transition-all duration-700 ${
                    mapMode === 'satellite'
                      ? 'filter contrast-110 saturate-110 brightness-95'
                      : 'filter contrast-105 saturate-105'
                  }`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />

                {/* Cinematic Vignette Shadow Overlay (edges) */}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(5,20,12,0.6)]" />

                {/* Top Cinematic HUD Bar */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-20">
                  {/* Office Pin Status Badge */}
                  <div className="bg-[#0A1D13]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#D4AF37]/50 shadow-xl flex items-center gap-2.5 pointer-events-auto">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ECC867] opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0D5B36] border border-[#ECC867]" />
                    </span>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">
                        {lang === 'ar' ? 'مكتب المحامي علي الزيلعي' : 'Al-Zayla\'i Law Firm'}
                      </span>
                      <span className="text-[10px] text-[#ECC867] font-mono leading-none" dir="ltr">
                        {coordsDMS}
                      </span>
                    </div>
                  </div>

                  {/* Cinematic Map Style Switcher (Satellite vs Street) */}
                  <div className="bg-[#0A1D13]/90 backdrop-blur-md p-1 rounded-xl border border-[#D4AF37]/40 shadow-xl flex items-center gap-1 pointer-events-auto">
                    <button
                      onClick={() => setMapMode('satellite')}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        mapMode === 'satellite'
                          ? 'bg-[#0D5B36] text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                      title={lang === 'ar' ? 'رؤية الأقمار الصناعية الفضائية' : 'Satellite View'}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#ECC867]" />
                      <span>{lang === 'ar' ? 'قمر صناعي' : 'Satellite'}</span>
                    </button>
                    <button
                      onClick={() => setMapMode('street')}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        mapMode === 'street'
                          ? 'bg-[#0D5B36] text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                      title={lang === 'ar' ? 'خريطة الشوارع والمعالم' : 'Street Map'}
                    >
                      <Layers className="w-3.5 h-3.5 text-[#ECC867]" />
                      <span>{lang === 'ar' ? 'شوارع' : 'Street'}</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Cinematic Action Bar */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 pointer-events-auto z-20 flex flex-col sm:flex-row gap-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0A1D13]/95 hover:bg-[#0D5B36] backdrop-blur-md border border-[#D4AF37]/50 text-white font-bold text-xs sm:text-sm shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Navigation className="w-4 h-4 text-[#ECC867]" />
                    <span>{lang === 'ar' ? 'فتح الاتجاهات المباشرة في خرائط Google' : 'Direct Driving Directions'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#ECC867]" />
                  </a>
                </div>

                {/* Cinematic Corner Viewfinder HUD brackets */}
                <div className="pointer-events-none absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#ECC867]/60" />
                <div className="pointer-events-none absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#ECC867]/60" />
                <div className="pointer-events-none absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#ECC867]/60" />
                <div className="pointer-events-none absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#ECC867]/60" />
              </div>
            </div>
          </div>

          {/* Details & Visiting Information Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white border border-[#E0D5C1] p-6 sm:p-8 shadow-xl">
            <div className="space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#EAE1D1]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0D5B36]/10 flex items-center justify-center text-[#0D5B36]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-amiri text-lg font-bold text-[#14261C]">
                      {lang === 'ar' ? 'بيانات الوصول للمقر' : 'Location & Access'}
                    </h3>
                    <span className="text-[11px] text-[#A67C1E] font-semibold">
                      {lang === 'ar' ? 'ترخيص معتمد وسرية تامة' : 'Certified & Strictly Confidential'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E0D5C1] text-slate-700 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0D5B36]" />
                  <span>{LAWYER_INFO.licenseNo}</span>
                </div>
              </div>

              {/* Full Address Block */}
              <div className="space-y-1.5">
                <span className="text-xs text-slate-500 font-medium block">
                  {lang === 'ar' ? 'العنوان المعتمد على الخريطة:' : 'Official Map Designation:'}
                </span>
                <p className="text-sm sm:text-base font-bold text-[#14261C] leading-snug">
                  {lang === 'ar'
                    ? 'مكتب المحامي علي عبدالله الزيلعي للمحاماة'
                    : 'Advocate Ali Abdullah Al-Zayla\'i Law Office'}
                </p>
                <p className="text-xs text-slate-600">
                  {lang === 'ar' ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}
                </p>
              </div>

              {/* GPS Coordinates with 1-click copy */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-[#0D5B36] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-500 font-semibold uppercase">
                      {lang === 'ar' ? 'الإحداثيات الجغرافية (GPS)' : 'GPS Coordinates'}
                    </span>
                    <span className="font-mono font-bold text-[#0D5B36] text-xs sm:text-sm" dir="ltr">
                      {coordsText}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyCoords}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-[#D8C9AE] text-slate-700 hover:text-[#0D5B36] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  title={lang === 'ar' ? 'نسخ الإحداثيات' : 'Copy Coordinates'}
                >
                  {copiedCoords ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'نسخ' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Working Hours & Direct Line */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#0D5B36] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">
                      {lang === 'ar' ? 'أوقات استقبال واستشارات المكتب:' : 'Office Visiting Hours:'}
                    </span>
                    <span className="text-slate-600">
                      {lang === 'ar' ? LAWYER_INFO.officeHoursAr : LAWYER_INFO.officeHoursEn}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#0D5B36] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">
                      {lang === 'ar' ? 'الاتصال المباشر للتنسيق:' : 'Direct Telephone Line:'}
                    </span>
                    <a
                      href="tel:+966568186467"
                      className="font-mono font-bold text-[#0D5B36] hover:underline text-sm"
                      dir="ltr"
                    >
                      +966 56 818 6467
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 mt-6 border-t border-[#EAE1D1]">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D5B36] hover:bg-[#0A472A] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#ECC867]" />
                <span>{lang === 'ar' ? 'فتح الموقع في خرائط Google مباشرة' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={visitWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#FBF9F5] border-2 border-[#0D5B36] text-[#0D5B36] font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-[#0D5B36]" />
                <span>{lang === 'ar' ? 'تنسيق موعد زيارة مسبق عبر واتساب' : 'Schedule In-Person Visit on WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
