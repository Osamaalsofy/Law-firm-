import React from 'react';
import { EmblemLogo } from './EmblemLogo';
import { LAWYER_INFO, UI_TRANSLATIONS } from '../data/content';
import { Language } from '../types';
import { Shield, BookOpen, Award, Scale, CheckCircle2, MapPin } from 'lucide-react';

interface AboutLawyerProps {
  lang: Language;
}

export const AboutLawyer: React.FC<AboutLawyerProps> = ({ lang }) => {
  const t = UI_TRANSLATIONS[lang];

  return (
    <section id="about" className="py-20 bg-white relative border-t border-[#EAE2D2]">
      {/* Subtle Najdi pattern divider top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Office Interior Photo & Emblem Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md rounded-3xl bg-[#FAF8F5] border border-[#E4D9C4] p-6 shadow-xl overflow-hidden">
              {/* Photo preview of Saudi law office */}
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 border border-[#E0D5C1] shadow-inner">
                <img
                  src="/src/assets/images/saudi_law_office_1791284926955.jpg"
                  alt="مقر مكتب المحامي علي عبدالله الزيلعي للمحاماة"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <div className="flex items-center gap-1.5 text-xs text-white font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#ECC867]" />
                    <span>{lang === 'ar' ? 'مقر مكتب المحامي علي عبدالله الزيلعي' : 'Advocate Ali Al-Zayla\'i Law Office'}</span>
                  </div>
                </div>
              </div>

              {/* Large Emblem Centered */}
              <div className="mb-4 flex justify-center -mt-12 relative z-10">
                <div className="bg-white p-2 rounded-full shadow-lg border border-[#E2D6C0]">
                  <EmblemLogo size="lg" showSubtitle={false} theme="saudi-royal" />
                </div>
              </div>

              {/* Name & Title */}
              <h3 className="text-2xl font-bold text-[#14291E] font-amiri mb-1 text-center">
                {lang === 'ar' ? LAWYER_INFO.nameAr : LAWYER_INFO.nameEn}
              </h3>
              <p className="text-xs text-[#0D5B36] font-bold tracking-wide mb-4 text-center">
                {lang === 'ar' ? LAWYER_INFO.titleAr : LAWYER_INFO.titleEn}
              </p>

              {/* Motto quote in Saudi calligraphy box */}
              <div className="p-4 rounded-xl bg-white border border-[#EBE3D3] text-xs text-slate-700 italic mb-5 text-center shadow-xs">
                {lang === 'ar' ? LAWYER_INFO.mottoAr : LAWYER_INFO.mottoEn}
              </div>

              {/* Official Credentials tags */}
              <div className="grid grid-cols-2 gap-2 text-start text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#EAE1D1]">
                  <span className="text-[10px] text-slate-500 block font-medium">
                    {lang === 'ar' ? 'ترخيص وزارة العدل:' : 'MoJ License:'}
                  </span>
                  <span className="font-mono text-[#0D5B36] font-extrabold text-sm">{LAWYER_INFO.licenseNo}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#EAE1D1]">
                  <span className="text-[10px] text-slate-500 block font-medium">
                    {lang === 'ar' ? 'الاختصاص القضائي:' : 'Jurisdiction:'}
                  </span>
                  <span className="text-slate-800 font-bold text-xs">
                    {lang === 'ar' ? 'كافة محاكم المملكة' : 'Courts across KSA'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D5B36] mb-2">
                <Scale className="w-4 h-4" />
                <span>{lang === 'ar' ? 'سيرة مهنية وميثاق شرف عدلي' : 'Judicial Standing & Ethical Charter'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#14261C] mb-4 font-amiri leading-tight">
                {t.about.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mb-4">
                {t.about.paragraph1}
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {t.about.paragraph2}
              </p>
            </div>

            {/* Core Pillars */}
            <div className="pt-2">
              <h3 className="text-base sm:text-lg font-bold text-[#8B6508] font-amiri mb-4">
                {t.about.pillarsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: t.about.pillar1Title, desc: t.about.pillar1Desc, icon: Shield },
                  { title: t.about.pillar2Title, desc: t.about.pillar2Desc, icon: BookOpen },
                  { title: t.about.pillar3Title, desc: t.about.pillar3Desc, icon: Scale },
                  { title: t.about.pillar4Title, desc: t.about.pillar4Desc, icon: Award },
                ].map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] hover:border-[#0D5B36] transition-all shadow-xs"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-white border border-[#E0D5C1] flex items-center justify-center text-[#0D5B36] shadow-xs">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-[#14261C] font-amiri">{pillar.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{pillar.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Official Standing Track Record & Metrics (Transferred from Hero Section) */}
        <div className="mt-14 pt-10 border-t border-[#EAE1D1]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] text-center shadow-xs hover:border-[#0D5B36] transition-colors">
              <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#0D5B36] block">
                +15
              </span>
              <span className="text-xs sm:text-sm text-slate-700 font-bold block mt-1">
                {lang === 'ar' ? 'عاماً من الخبرة القضائية' : 'Years Judicial Experience'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                {lang === 'ar' ? 'ممارسة مستمرة أمام محاكم المملكة' : 'Active practice across Saudi courts'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] text-center shadow-xs hover:border-[#0D5B36] transition-colors">
              <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#0D5B36] block">
                +1,450
              </span>
              <span className="text-xs sm:text-sm text-slate-700 font-bold block mt-1">
                {lang === 'ar' ? 'قضية واستشارة ناجحة' : 'Successful Cases & Briefs'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                {lang === 'ar' ? 'نزاعات تجارية ومدنية وجنائية' : 'Commercial, civil & criminal matters'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] text-center shadow-xs hover:border-[#0D5B36] transition-colors">
              <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#0D5B36] block">
                98.4%
              </span>
              <span className="text-xs sm:text-sm text-slate-700 font-bold block mt-1">
                {lang === 'ar' ? 'نسبة رضا الموكلين' : 'Client Satisfaction Rate'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                {lang === 'ar' ? 'التزام تام بالسرية وحفظ الحقوق' : 'Strict confidentiality & dedication'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
