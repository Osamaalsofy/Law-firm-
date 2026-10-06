import React from 'react';
import { EmblemLogo } from './EmblemLogo';
import { LAWYER_INFO } from '../data/content';
import { Language } from '../types';
import { ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import saudiCultureHero from '../assets/images/saudi_culture_hero_1791285547892.jpg';

interface HeroProps {
  lang: Language;
  onOpenConsultation: () => void;
  whatsappNumber: string;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenConsultation,
}) => {
  return (
    <section className="relative min-h-[82vh] flex items-center pt-28 pb-16 overflow-hidden bg-[#FAF8F5]">
      {/* Authentic Saudi Cultural Architecture Background (Diriyah Najdi Limestone & Palm Shadows) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={saudiCultureHero}
          alt="العمارة التراثية النجدية السعودية - مكتب المحامي علي الزيلعي"
          className="w-full h-full object-cover object-center filter brightness-100 contrast-105 saturate-105 scale-100 opacity-95 transition-opacity duration-300"
        />
        {/* Subtle Bottom & Radial Transition to Preserve High Image Visibility while Keeping Text Readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/60 via-[#FAF8F5]/30 to-transparent rtl:bg-gradient-to-l rtl:from-[#FAF8F5]/70 rtl:via-[#FAF8F5]/30 rtl:to-transparent" />
      </div>

      {/* Hero Content shifted to the right side (Start in RTL) and well-organized */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl flex flex-col items-start text-start rtl:items-start rtl:text-start ltr:items-start ltr:text-start">
          {/* 1. Official License Stamp Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#D5C6AC] shadow-xs mb-4">
            <ShieldCheck className="w-4 h-4 text-[#0D5B36]" />
            <span className="text-xs sm:text-sm text-[#0D5B36] font-bold tracking-wide">
              {lang === 'ar'
                ? `المملكة العربية السعودية · ترخيص وزارة العدل رقم ${LAWYER_INFO.licenseNo}`
                : `Kingdom of Saudi Arabia · MoJ Bar License #${LAWYER_INFO.licenseNo}`}
            </span>
          </div>

          {/* 2. Official Emblem Logo */}
          <div className="mb-4 drop-shadow-sm">
            <EmblemLogo size="lg" showSubtitle={false} theme="saudi-royal" />
          </div>

          {/* 3. Crisp Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#14261C] mb-4 leading-[1.2] font-amiri text-balance">
            {lang === 'ar' ? LAWYER_INFO.firmNameAr : LAWYER_INFO.firmNameEn}
          </h1>

          {/* 4. Single-Sentence Clear Value Proposition */}
          <p className="max-w-xl text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-8">
            {lang === 'ar'
              ? 'نحمي مصالحكم ونصيغ عقودكم ونترافع عنكم أمام كافة محاكم المملكة والنيابة العامة بنزاهة واحترافية وسرية تامة.'
              : 'Protecting your interests, drafting airtight contracts, and representing you before all Saudi courts with integrity and absolute confidentiality.'}
          </p>

          {/* 5. Clean Action Button (Direct Consultation Request) */}
          <div className="w-full sm:w-auto">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0D5B36] via-[#106A3F] to-[#147A49] hover:from-[#116F43] hover:to-[#178F55] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#0D5B36]/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'طلب استشارة قانونية فورية' : 'Request Consultation Now'}</span>
              {lang === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
