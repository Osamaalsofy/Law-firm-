import React from 'react';
import { EmblemLogo } from './EmblemLogo';
import { LAWYER_INFO, UI_TRANSLATIONS } from '../data/content';
import { Language } from '../types';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = UI_TRANSLATIONS[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F6F2EA] text-slate-700 text-xs border-t border-[#E4D9C4] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E0D5C1]">
          {/* Col 1: Emblem & Firm Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <EmblemLogo size="md" showSubtitle={false} theme="saudi-royal" />
              <div>
                <h3 className="text-lg font-bold text-[#14261C] font-amiri leading-tight">
                  {lang === 'ar' ? LAWYER_INFO.firmNameAr : LAWYER_INFO.firmNameEn}
                </h3>
                <p className="text-xs text-[#0D5B36] font-bold mt-0.5">
                  {lang === 'ar' ? LAWYER_INFO.titleAr : LAWYER_INFO.titleEn}
                </p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed font-normal text-xs max-w-sm">
              {lang === 'ar'
                ? 'صرح قانوني سعودي مرخص يقدم الدعم القضائي وصياغة العقود التجارية والمدنية وحماية حقوق الموكلين بمختلف محاكم المملكة وفق أحكام الشريعة والأنظمة المرعية.'
                : 'A licensed Saudi legal practice delivering robust litigation, contract advisory, and dispute resolution across all tribunals in the Kingdom under Sharia and statutory codes.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#D8C9AE] text-[11px] text-[#0D5B36] font-bold shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0D5B36]" />
              <span>
                {lang === 'ar'
                  ? `ترخيص وزارة العدل رقم ${LAWYER_INFO.licenseNo} · المملكة العربية السعودية`
                  : `Ministry of Justice License #${LAWYER_INFO.licenseNo} · KSA`}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-[#14261C] font-amiri">
              {lang === 'ar' ? 'أقسام البوابة العدلية' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-[#0D5B36] transition-colors font-medium">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0D5B36] transition-colors font-medium">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#consultation" className="hover:text-[#0D5B36] transition-colors font-medium">
                  {t.nav.consultation}
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-[#0D5B36] transition-colors font-medium">
                  {t.nav.estimator}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#0D5B36] transition-colors font-medium">
                  {lang === 'ar' ? 'مقر المكتب والخرائط' : 'Office Location'}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#0D5B36] transition-colors font-medium">
                  {t.nav.testimonials}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-[#14261C] font-amiri">
              {lang === 'ar' ? 'المقر وساعات الاستقبال' : 'Headquarters & Inquiries'}
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0D5B36] shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/5hn1F3Y4aPxKMAc2A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-800 hover:text-[#0D5B36] hover:underline"
                >
                  {lang === 'ar'
                    ? 'المملكة العربية السعودية (عرض الموقع على الخريطة ↗)'
                    : 'Saudi Arabia (Open in Google Maps ↗)'}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0D5B36] shrink-0" />
                <a href="tel:+966568186467" className="font-mono text-[#0D5B36] font-extrabold hover:underline" dir="ltr">
                  +966 56 818 6467
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0D5B36] shrink-0" />
                <a href={`mailto:${LAWYER_INFO.email}`} className="text-slate-800 font-medium hover:text-[#0D5B36] hover:underline">
                  {LAWYER_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#0D5B36] shrink-0 mt-0.5" />
                <span className="text-slate-700">{lang === 'ar' ? LAWYER_INFO.officeHoursAr : LAWYER_INFO.officeHoursEn}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="py-6 border-b border-[#E0D5C1] text-[11px] text-slate-600 leading-relaxed text-center font-normal">
          <p>{t.footer.disclaimer}</p>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-slate-600 font-medium">{t.footer.rights}</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#D8C9AE] hover:bg-[#F2ECE0] text-slate-800 font-bold transition-colors cursor-pointer shadow-xs"
          >
            <span>{lang === 'ar' ? 'العودة للأعلى' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#0D5B36]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
