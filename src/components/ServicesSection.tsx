import React, { useState } from 'react';
import { SERVICES, UI_TRANSLATIONS } from '../data/content';
import { ServiceItem, Language } from '../types';
import {
  Building2,
  ShieldAlert,
  Briefcase,
  Users,
  Landmark,
  FileText,
  Scale,
  Coins,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileCheck,
  X,
  MessageCircle,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface ServicesSectionProps {
  lang: Language;
  onSelectServiceForConsultation: (service: ServiceItem) => void;
  whatsappNumber: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectServiceForConsultation,
  whatsappNumber,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);
  const t = UI_TRANSLATIONS[lang];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#0D5B36]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-[#0D5B36]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#0D5B36]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#0D5B36]" />;
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-[#0D5B36]" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-[#0D5B36]" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-[#0D5B36]" />;
      case 'Coins':
        return <Coins className="w-6 h-6 text-[#0D5B36]" />;
      default:
        return <Scale className="w-6 h-6 text-[#0D5B36]" />;
    }
  };

  const filteredServices =
    selectedCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === selectedCategory);

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const openWhatsAppForService = (service: ServiceItem) => {
    const title = lang === 'ar' ? service.titleAr : service.titleEn;
    const msg =
      lang === 'ar'
        ? `السلام عليكم ورحمة الله، أود طلب استشارة وتوكيل بخصوص (${title}) لدى مكتب المحامي علي عبدالله الزيلعي.`
        : `Hello, I would like to consult with Advocate Ali Abdullah Al-Zayla'i regarding ${title}.`;
    window.open(`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="services" className="py-20 bg-[#FAF8F5] relative border-t border-[#EAE2D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Explicitly Stating What the Office Does for the Client */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D5C6AC] text-[#0D5B36] text-xs font-bold mb-3 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>
              {lang === 'ar' ? 'ما الذي يمكن لمكتبنا تقديمه لك؟' : 'What Our Firm Can Do For You'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14261C] mb-3 font-amiri">
            {lang === 'ar'
              ? 'خدماتنا وحلولنا القانونية لحماية حقوقك وأعمالك'
              : 'Our Legal Practice & Client Protection Services'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {lang === 'ar'
              ? 'نوفر لك تمثيلاً قضائياً متكاملاً واستشارات وقائية تمنع النزاعات وتحفظ أموالك وأصولك أمام كافة المحاكم والجهات في المملكة.'
              : 'Delivering comprehensive court litigation and preventative advisory safeguarding your assets and enterprise across all Saudi tribunals.'}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: t.servicesSection.filterAll },
            { id: 'commercial', label: t.servicesSection.filterCommercial },
            { id: 'criminal', label: t.servicesSection.filterCriminal },
            { id: 'family', label: t.servicesSection.filterCivil },
            { id: 'realestate', label: t.servicesSection.filterRealEstate },
            { id: 'execution', label: t.servicesSection.filterExecution },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#0D5B36] text-white shadow-md shadow-[#0D5B36]/20'
                  : 'bg-white text-slate-700 hover:text-[#0D5B36] border border-[#E0D5C1] hover:border-[#0D5B36]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid with Clear Client Value */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const title = lang === 'ar' ? service.titleAr : service.titleEn;
            const tagline = lang === 'ar' ? service.taglineAr : service.taglineEn;
            const desc = lang === 'ar' ? service.descriptionAr : service.descriptionEn;

            return (
              <div
                key={service.id}
                className="group p-6 rounded-3xl bg-white border border-[#EAE1D1] hover:border-[#0D5B36] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-[#0D5B36]/5"
              >
                <div>
                  {/* Icon & Category Kicker */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F6F2EA] border border-[#E4D9C4] flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#8B6508] uppercase tracking-wider bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#E8DFC8]">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-[#14261C] mb-1.5 font-amiri group-hover:text-[#0D5B36] transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-[#0D5B36] font-bold mb-3">
                    {tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
                    {desc}
                  </p>

                  {/* What we do for the client list */}
                  <div className="space-y-2 mb-5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D3]">
                    <span className="block text-[11px] font-extrabold text-[#0D5B36] uppercase">
                      {lang === 'ar' ? 'ما سنقوم به من أجلك:' : 'What we do for you:'}
                    </span>
                    {(lang === 'ar' ? service.keyProceduresAr : service.keyProceduresEn)
                      .slice(0, 2)
                      .map((proc, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D5B36] shrink-0 mt-0.5" />
                          <span className="line-clamp-2 leading-tight">{proc}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="text-xs font-bold text-[#8B6508] hover:text-[#0D5B36] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{lang === 'ar' ? 'تفاصيل الخدمة' : 'View Scope'}</span>
                    {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      onSelectServiceForConsultation(service);
                      const el = document.getElementById('consultation');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#0D5B36] hover:bg-[#116F43] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    {lang === 'ar' ? 'طلب الخدمة الآن' : 'Request Service'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detailed Modal */}
      {activeModalService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setActiveModalService(null)}
        >
          <div
            className="bg-white border border-[#D8C7A5] rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative text-[#14261C]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 left-4 sm:top-6 sm:left-6 rtl:left-auto rtl:right-4 rtl:sm:right-6 p-2 rounded-xl bg-[#FAF8F5] hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-[#E0D5C1]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F6F2EA] border border-[#E0D5C1] flex items-center justify-center shrink-0 shadow-xs">
                {getIcon(activeModalService.iconName)}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#14261C] font-amiri">
                  {lang === 'ar' ? activeModalService.titleAr : activeModalService.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-[#0D5B36] font-bold">
                  {lang === 'ar' ? activeModalService.taglineAr : activeModalService.taglineEn}
                </p>
              </div>
            </div>

            {/* In-depth Description */}
            <p className="text-sm text-slate-700 leading-relaxed mb-6 bg-[#FAF8F5] p-4 rounded-2xl border border-[#EBE3D3]">
              {lang === 'ar' ? activeModalService.descriptionAr : activeModalService.descriptionEn}
            </p>

            {/* Key Procedures */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-[#0D5B36] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'ما سنقوم به من أجلك بالتفصيل:' : 'Exact Procedures We Undertake For You:'}</span>
              </h4>
              <ul className="space-y-2">
                {(lang === 'ar' ? activeModalService.keyProceduresAr : activeModalService.keyProceduresEn).map(
                  (proc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#0D5B36] mt-1.5 shrink-0" />
                      <span>{proc}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Required Documents */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-[#8B6508] mb-3 flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                <span>{lang === 'ar' ? 'الوثائق والمستندات المطلوبة منك:' : 'Documents Needed from Client:'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(lang === 'ar' ? activeModalService.requiredDocsAr : activeModalService.requiredDocsEn).map(
                  (doc, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EBE3D3] text-xs text-slate-800 font-medium flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#0D5B36] shrink-0" />
                      <span>{doc}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#EAE1D1]">
              <button
                onClick={() => {
                  const s = activeModalService;
                  setActiveModalService(null);
                  openWhatsAppForService(s);
                }}
                className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0D5B36] to-[#127A48] hover:from-[#116F43] hover:to-[#178F55] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'ar' ? 'استشارة فورية عبر واتساب المحامي' : 'Direct WhatsApp to Lawyer'}</span>
              </button>

              <button
                onClick={() => {
                  const s = activeModalService;
                  setActiveModalService(null);
                  onSelectServiceForConsultation(s);
                  const el = document.getElementById('consultation');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#FAF8F5] hover:bg-white text-slate-800 border border-[#D8C7A5] font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'تعبئة نموذج الاستشارة' : 'Fill Intake Form'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
