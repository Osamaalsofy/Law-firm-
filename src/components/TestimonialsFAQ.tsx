import React, { useState } from 'react';
import { TESTIMONIALS, FAQS, UI_TRANSLATIONS } from '../data/content';
import { Language } from '../types';
import { Star, ChevronDown, ChevronUp, HelpCircle, MessageSquareQuote } from 'lucide-react';

interface TestimonialsFAQProps {
  lang: Language;
}

export const TestimonialsFAQ: React.FC<TestimonialsFAQProps> = ({ lang }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const t = UI_TRANSLATIONS[lang];

  return (
    <section id="testimonials" className="py-20 bg-white relative border-t border-[#EAE2D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Block */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D5B36] mb-2">
              <MessageSquareQuote className="w-4 h-4" />
              <span>{lang === 'ar' ? 'شهادات الثقة والتقدير' : 'Client Testimonials & Endorsements'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#14261C] mb-3 font-amiri">
              {lang === 'ar' ? 'ما يقوله موكلونا عن الترافع والاستشارات' : 'What Our Clients Say About Our Representation'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E2D8C5] hover:border-[#0D5B36] transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  {/* Stars in Saudi Gold */}
                  <div className="flex items-center gap-1 mb-4 text-[#D4AF37]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed mb-6 italic">
                    "{lang === 'ar' ? item.commentAr : item.commentEn}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAE1D1]">
                  <div className="font-bold text-[#14261C] text-sm font-amiri">
                    {lang === 'ar' ? item.clientNameAr : item.clientNameEn}
                  </div>
                  <div className="text-xs text-[#0D5B36] font-bold mt-0.5">
                    {lang === 'ar' ? item.roleAr : item.roleEn}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">
                    ⚖️ {lang === 'ar' ? item.caseTypeAr : item.caseTypeEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Block */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D5B36] mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الأسئلة الشائعة والإجراءات' : 'Frequently Asked Questions'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#14261C] font-amiri">
              {lang === 'ar' ? 'إجابات على استفسارات الموكلين الأكثر تكراراً' : 'Common Inquiries on Retainers & Legal Procedures'}
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E2D8C5] bg-[#FAF8F5] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-[#14261C] font-amiri">
                      {lang === 'ar' ? faq.questionAr : faq.questionEn}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#0D5B36] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-[#EAE1D1] bg-white font-normal">
                      {lang === 'ar' ? faq.answerAr : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
