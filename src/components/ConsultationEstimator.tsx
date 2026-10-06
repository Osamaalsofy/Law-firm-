import React, { useState } from 'react';
import { UI_TRANSLATIONS } from '../data/content';
import { Language } from '../types';
import { PhoneCall, FileText, Gavel, Building, Clock, CheckCircle2, MessageCircle } from 'lucide-react';

interface ConsultationEstimatorProps {
  lang: Language;
  whatsappNumber: string;
}

export const ConsultationEstimator: React.FC<ConsultationEstimatorProps> = ({
  lang,
  whatsappNumber,
}) => {
  const t = UI_TRANSLATIONS[lang];
  const [selectedTier, setSelectedTier] = useState<number>(1);

  const tiers = [
    {
      id: 0,
      title: t.estimator.option1Title,
      desc: t.estimator.option1Desc,
      time: t.estimator.option1Time,
      icon: PhoneCall,
      deliverablesAr: ['مناقشة شفهية مباشرة 30 دقيقة', 'تحديد الموقف الإجرائي الأولي', 'توجيه بالمستندات اللازمة إن لزم الأمر'],
      deliverablesEn: ['30-minute direct verbal legal consultation', 'Preliminary procedural guidance', 'Checklist of evidentiary documents needed'],
    },
    {
      id: 1,
      title: t.estimator.option2Title,
      desc: t.estimator.option2Desc,
      time: t.estimator.option2Time,
      icon: FileText,
      deliverablesAr: ['فحص شامل لكافة المستندات والوثائق', 'مذكرة رأي قانوني مكتوبة وموقعة', 'استراتيجية عمل مقترحة لربح الدعوى'],
      deliverablesEn: ['Comprehensive case file audit', 'Formal signed written legal advisory brief', 'Proposed actionable defense/claim roadmap'],
    },
    {
      id: 2,
      title: t.estimator.option3Title,
      desc: t.estimator.option3Desc,
      time: t.estimator.option3Time,
      icon: Gavel,
      deliverablesAr: ['وكالة شرعية معتمدة عبر ناجز', 'صياغة المذكرات وحضور كافة الجلسات', 'متابعة الاستئناف والطعن حتى الحكم النهائي'],
      deliverablesEn: ['Certified Power of Attorney on Najiz', 'Drafting all court pleas & personal hearing representation', 'Appellate and Supreme Court follow-up through final verdict'],
    },
    {
      id: 3,
      title: t.estimator.option4Title,
      desc: t.estimator.option4Desc,
      time: t.estimator.option4Time,
      icon: Building,
      deliverablesAr: ['مستشار قانوني مخصص لمنشأتك', 'صياغة وتدقيق العقود واللوائح الدورية', 'أولوية قصوى لكافة الاستفسارات ومتابعة النزاعات'],
      deliverablesEn: ['Dedicated external legal counsel for your enterprise', 'Routine contract drafting & labor code compliance', 'Priority hotline response & dispute preemption'],
    },
  ];

  const currentTier = tiers[selectedTier];
  const cleanWa = whatsappNumber.replace(/[^0-9]/g, '');

  const handleLaunchTierWhatsApp = () => {
    const text =
      lang === 'ar'
        ? `السلام عليكم ورحمة الله، أود حجز مسار (${currentTier.title}) لدى مكتب المحامي علي عبدالله الزيلعي. أرجو التفضل ببيان الخطوات وتحديد الموعد.`
        : `Greetings, I would like to inquire about booking the tier (${currentTier.title}) with Advocate Ali Abdullah Al-Zayla'i. Please advise on next steps.`;
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="estimator" className="py-20 bg-[#FAF8F5] relative border-t border-[#EAE2D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#14261C] mb-3 font-amiri">
            {t.estimator.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {t.estimator.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Selection Column (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <span className="block text-xs font-bold text-[#0D5B36] uppercase tracking-wider mb-2">
              {t.estimator.selectType}
            </span>
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const isSelected = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`w-full p-4 rounded-2xl text-start transition-all cursor-pointer border flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-white border-[#0D5B36] shadow-md shadow-[#0D5B36]/10 text-[#14261C]'
                      : 'bg-[#FAF8F5] border-[#E2D8C5] text-slate-700 hover:bg-white hover:border-[#0D5B36]'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                      isSelected ? 'bg-[#0D5B36] text-white font-bold' : 'bg-[#F2ECE0] text-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold block leading-tight font-amiri text-[#14261C]">
                      {tier.title}
                    </span>
                    <span className="text-[11px] text-[#8B6508] font-bold block mt-0.5">
                      ⏱ {tier.time}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Selected Tier Details (7 cols) in White Card */}
          <div className="md:col-span-7 bg-white border border-[#E0D5C1] rounded-3xl p-6 sm:p-8 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE1] mb-5">
              <h3 className="text-xl font-bold text-[#14261C] font-amiri">
                {currentTier.title}
              </h3>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7EE] border border-[#BCE4C6] text-xs font-bold text-[#0D5B36]">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentTier.time}</span>
              </div>
            </div>

            <p className="text-sm text-slate-700 mb-6 leading-relaxed font-normal">
              {currentTier.desc}
            </p>

            <div className="mb-8">
              <h4 className="text-xs font-bold text-[#8B6508] uppercase tracking-wider mb-3">
                {lang === 'ar' ? 'ما تشمله هذه الخدمة القانونية:' : 'Included Deliverables & Scope:'}
              </h4>
              <ul className="space-y-2.5">
                {(lang === 'ar' ? currentTier.deliverablesAr : currentTier.deliverablesEn).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#0D5B36] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleLaunchTierWhatsApp}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#0D5B36] to-[#127A48] hover:from-[#116F43] hover:to-[#178F55] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#0D5B36]/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.estimator.requestEstimateNow}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
