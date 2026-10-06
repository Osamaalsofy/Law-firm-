import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Language } from '../types';

interface FloatingWhatsAppProps {
  lang: Language;
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  lang,
  whatsappNumber,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const quickPrompts =
    lang === 'ar'
      ? [
          { text: 'السلام عليكم، أود حجز استشارة عاجلة اليوم.', label: 'استشارة عاجلة اليوم' },
          { text: 'السلام عليكم، لدي موعد جلسة قضائية قادمة وأحتاج مذكرة دفاع.', label: 'مذكرة دفاع لجلسة' },
          { text: 'السلام عليكم، أود استشارة بخصوص عقد تجاري / تأسيس شركة.', label: 'عقود وشركات تجارية' },
          { text: 'السلام عليكم، أود استشارة بخصوص قسمة تركة وحصر ورثة.', label: 'قسمة تركة وأحوال شخصية' },
        ]
      : [
          { text: 'Hello, I need an urgent legal consultation today.', label: 'Urgent Consultation' },
          { text: 'Hello, I have an upcoming court hearing and need a defense memorandum.', label: 'Upcoming Court Plea' },
          { text: 'Hello, I need legal counsel regarding corporate contracts or M&A.', label: 'Corporate & Contracts' },
          { text: 'Hello, I need guidance on inheritance division & family assets.', label: 'Estate Partition' },
        ];

  const handleSendPrompt = (text: string) => {
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-40 flex flex-col items-end rtl:items-start select-none">
      {/* Quick Chat Popup in Clean White Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white border border-[#BDE3C7] rounded-3xl shadow-2xl p-4 text-start animate-in fade-in slide-in-from-bottom-3 backdrop-blur-md">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D2]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#EBF7EE] border border-[#BCE4C6] flex items-center justify-center text-[#0D5B36]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#14261C] font-amiri">
                  {lang === 'ar' ? 'مكتب المحامي علي عبدالله الزيلعي' : 'Advocate Ali Al-Zayla\'i'}
                </p>
                <span className="text-[10px] text-[#0D5B36] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D5B36] animate-pulse" />
                  {lang === 'ar' ? 'متصل الآن للاستشارات' : 'Online for Consultations'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-slate-700 font-medium">
            {lang === 'ar'
              ? 'مرحباً بك، اختر نوع الاستشارة للبدء الفوري في محادثة واتساب الرسمية للمحامي:'
              : 'Welcome. Select your consultation category to start an instant WhatsApp conversation:'}
          </div>

          {/* Quick options */}
          <div className="space-y-2 mb-3">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(p.text)}
                className="w-full text-start p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EBF7EE] hover:border-[#0D5B36] border border-[#E2D8C5] text-xs font-semibold text-slate-800 transition-colors flex items-center justify-between gap-2 cursor-pointer group"
              >
                <span>{p.label}</span>
                <Send className="w-3 h-3 text-[#0D5B36] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#EAE2D2] text-center">
            <button
              onClick={() =>
                handleSendPrompt(
                  lang === 'ar'
                    ? 'السلام عليكم ورحمة الله، أود التحدث مع المحامي علي الزيلعي.'
                    : 'Greetings, I would like to consult with Advocate Ali Al-Zayla\'i.'
                )
              }
              className="text-[11px] text-[#0D5B36] hover:underline font-bold"
            >
              {lang === 'ar' ? 'أو افتح المحادثة مباشرة دون تحديد 💬' : 'Or open open chat directly 💬'}
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button in Saudi Royal Green - Simple Clean Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#0D5B36] hover:bg-[#116F43] text-white shadow-lg shadow-[#0D5B36]/30 cursor-pointer focus:outline-none transition-colors"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white/20" />
        <span className="hidden sm:inline-block text-xs font-bold tracking-wide">
          {lang === 'ar' ? 'استشارة واتساب' : 'WhatsApp'}
        </span>
      </button>
    </div>
  );
};
