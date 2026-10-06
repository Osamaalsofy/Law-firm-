import React, { useState, useEffect } from 'react';
import { UI_TRANSLATIONS, SERVICES, LAWYER_INFO } from '../data/content';
import {
  Language,
  CaseCategory,
  UrgencyLevel,
  ContactMethod,
  ConsultationSubmission,
} from '../types';
import {
  MessageCircle,
  Check,
  Copy,
  Settings,
  Shield,
  PhoneCall,
  User,
  MapPin,
  Clock,
  Send,
  Building2,
  ShieldAlert,
  Briefcase,
  Users,
  Landmark,
  FileText,
  Scale,
  Coins,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface ConsultationFormProps {
  lang: Language;
  preSelectedCategory?: CaseCategory;
  whatsappNumber: string;
  onUpdateWhatsAppNumber: (newNum: string) => void;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  lang,
  preSelectedCategory,
  whatsappNumber,
  onUpdateWhatsAppNumber,
}) => {
  const t = UI_TRANSLATIONS[lang];

  // Active step (1: Category, 2: Client Info, 3: Case details)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [category, setCategory] = useState<CaseCategory>(preSelectedCategory || 'commercial');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('urgent');
  const [preferredMethod, setPreferredMethod] = useState<ContactMethod>('whatsapp');
  const [caseDetails, setCaseDetails] = useState('');
  const [hasDocuments, setHasDocuments] = useState(true);
  const [hasUpcomingCourtDate, setHasUpcomingCourtDate] = useState(false);
  const [courtDateNote, setCourtDateNote] = useState('');

  // Submission & UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchStage, setDispatchStage] = useState<string>('');
  const [submissionSuccess, setSubmissionSuccess] = useState<ConsultationSubmission | null>(null);
  const [copied, setCopied] = useState(false);
  const [recentSubmissions, setRecentSubmissions] = useState<ConsultationSubmission[]>([]);

  useEffect(() => {
    if (preSelectedCategory) {
      setCategory(preSelectedCategory);
      setCurrentStep(2);
    }
  }, [preSelectedCategory]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('alzaylai_consultations');
      if (stored) {
        setRecentSubmissions(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const categoryIcons: Record<CaseCategory, React.ElementType> = {
    commercial: Building2,
    criminal: ShieldAlert,
    labor: Briefcase,
    family: Users,
    realestate: Landmark,
    contracts: FileText,
    arbitration: Scale,
    execution: Coins,
  };

  const getCategoryTitle = (cat: CaseCategory) => {
    const s = SERVICES.find((item) => item.category === cat);
    if (!s) return cat;
    return lang === 'ar' ? s.titleAr : s.titleEn;
  };

  const getUrgencyText = (u: UrgencyLevel) => {
    if (u === 'emergency') return lang === 'ar' ? '🚨 طارئة جداً (جلسة وشيكة / توقيف)' : '🚨 Critical / Imminent Hearing';
    if (u === 'urgent') return lang === 'ar' ? '⚡ عاجلة (خلال ساعات العمل)' : '⚡ Urgent (During Business Hours)';
    return lang === 'ar' ? '📋 عادية (خلال 24 ساعة)' : '📋 Normal (Within 24h)';
  };

  const generateWhatsAppMessage = (refNumber: string) => {
    const categoryName = getCategoryTitle(category);
    const urgencyName = getUrgencyText(urgency);
    const methodName =
      preferredMethod === 'whatsapp'
        ? lang === 'ar' ? 'واتساب مباشر' : 'Direct WhatsApp'
        : preferredMethod === 'call'
        ? lang === 'ar' ? 'اتصال هاتفي' : 'Phone Call'
        : lang === 'ar' ? 'زيارة المكتب' : 'Office Visit';

    const courtNote = hasUpcomingCourtDate
      ? lang === 'ar'
        ? `⚠️ موعد جلسة قضائية قادمة: ${courtDateNote || 'يرجى مراجعة الموعد عاجلاً'}`
        : `⚠️ Upcoming Court Date: ${courtDateNote || 'Urgent court review'}`
      : lang === 'ar'
      ? 'لا يوجد موعد جلسة محدد حالياً'
      : 'No current court hearing date';

    if (lang === 'ar') {
      return `السلام عليكم ورحمة الله وبركاته،
سعادة المحامي علي عبدالله الزيلعي،
أود طلب استشارة وتوكيل قانوني بالبيانات الآتية:

📋 *رقم القيد العدلي:* ${refNumber}
👤 *الاسم / المنشأة:* ${fullName || 'غير محدد'}
📱 *رقم الجوال:* ${phone || 'غير محدد'}
📍 *المدينة:* ${city || 'المملكة العربية السعودية'}
⚖️ *تصنيف القضية:* ${categoryName}
⚠️ *درجة الاستعجال:* ${urgencyName}
📞 *الوسيلة المفضلة:* ${methodName}
🏛️ *حالة الجلسات:* ${courtNote}
📁 *جاهزية المستندات:* ${hasDocuments ? 'نعم، المستندات جاهزة' : 'استفسار أولي'}

📝 *شرح وقائع القضية:*
${caseDetails || 'أرجو التكرم بالاطلاع والتواصل لتحديد الموعد.'}

— أُرسل مباشرة عبر البوابة الرسمية لمكتب المحامي علي عبدالله الزيلعي`;
    } else {
      return `Greetings Advocate Ali Abdullah Al-Zayla'i,
I would like to request legal counsel with the following intake brief:

📋 *Docket Ref:* ${refNumber}
👤 *Client Name:* ${fullName || 'Not specified'}
📱 *Phone:* ${phone || 'Not specified'}
📍 *City:* ${city || 'Saudi Arabia'}
⚖️ *Category:* ${categoryName}
⚠️ *Urgency:* ${urgencyName}
📞 *Preferred Channel:* ${methodName}
🏛️ *Court Hearings:* ${courtNote}
📁 *Documents Ready:* ${hasDocuments ? 'Yes' : 'Initial advisory'}

📝 *Case Narrative & Facts:*
${caseDetails || 'Please advise on scheduling an intake consultation.'}

— Transmitted via the official portal of Advocate Ali Al-Zayla'i`;
    }
  };

  const handleSubmitToOwner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !caseDetails.trim()) {
      alert(
        lang === 'ar'
          ? 'يرجى إكمال البيانات الأساسية (الاسم، الجوال، وشرح موضوع القضية).'
          : 'Please provide required details (Full name, Phone number, Case narrative).'
      );
      return;
    }

    setIsSubmitting(true);
    setDispatchStage(lang === 'ar' ? 'جاري تجهيز مذكرة الاستشارة...' : 'Preparing case memorandum...');

    setTimeout(() => {
      setDispatchStage(lang === 'ar' ? 'إصدار رقم القيد والتوجيه لمكتب المحامي...' : 'Generating docket & routing to lawyer...');

      setTimeout(() => {
        const ref = `AZ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const submission: ConsultationSubmission = {
          id: Date.now().toString(),
          refCode: ref,
          fullName,
          phone,
          city,
          category,
          urgency,
          preferredMethod,
          caseDetails,
          hasDocuments,
          createdAt: new Date().toISOString(),
          status: 'pending',
        };

        const updated = [submission, ...recentSubmissions.slice(0, 4)];
        setRecentSubmissions(updated);
        try {
          localStorage.setItem('alzaylai_consultations', JSON.stringify(updated));
        } catch {
          // ignore
        }

        setSubmissionSuccess(submission);
        setIsSubmitting(false);

        // Open WhatsApp to the lawyer with pre-filled message
        const msg = generateWhatsAppMessage(ref);
        const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
        const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');
      }, 700);
    }, 600);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const previewMessage = generateWhatsAppMessage('AZ-2026-LIVE');

  return (
    <section id="consultation" className="py-20 bg-white relative border-t border-[#EAE2D2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF7EE] border border-[#BCE4C6] text-[#0D5B36] text-xs font-bold mb-3">
            <Send className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'نموذج مباشر يُرسل إلى المحامي' : 'Direct Intake Dispatched to Attorney'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14261C] mb-2 font-amiri">
            {lang === 'ar' ? 'نموذج طلب الاستشارة والتواصل القضائي' : 'Legal Intake & Case Brief Form'}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {lang === 'ar'
              ? 'املأ بيانات قضيتك بالخطوات البسيطة أدناه ليتم صياغة ملخص رسمي وإرساله مباشرة إلى مكتب المحامي علي عبدالله الزيلعي عبر الواتساب.'
              : 'Complete your case summary below to generate a formal intake brief dispatched directly to Advocate Ali Al-Zayla\'i.'}
          </p>
        </div>

        {/* Tactile 3-Step Indicator Bar */}
        <div className="max-w-3xl mx-auto mb-8 bg-[#FAF8F5] p-2 rounded-2xl border border-[#E2D8C5] shadow-xs">
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                currentStep === 1
                  ? 'bg-[#0D5B36] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">1</span>
              <span>{lang === 'ar' ? 'نوع القضية' : 'Case Category'}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                currentStep === 2
                  ? 'bg-[#0D5B36] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">2</span>
              <span>{lang === 'ar' ? 'بيانات الموكل' : 'Your Contact'}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                currentStep === 3
                  ? 'bg-[#0D5B36] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">3</span>
              <span>{lang === 'ar' ? 'تفاصيل الموضوع' : 'Case Facts'}</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border-2 border-[#E2D8C5] rounded-3xl p-6 sm:p-8 shadow-md">
            <form onSubmit={handleSubmitToOwner} className="space-y-6">
              {/* STEP 1: SELECT CATEGORY TACTILE CARDS */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8DFC8]">
                    <span className="text-xs font-extrabold text-[#0D5B36] uppercase tracking-wide">
                      {lang === 'ar' ? 'الخطوة 1 من 3: اختر تصنيف القضية أو الخدمة' : 'Step 1 of 3: Select Legal Practice Area'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {SERVICES.map((srv) => {
                      const Icon = categoryIcons[srv.category] || Scale;
                      const isSelected = category === srv.category;
                      return (
                        <button
                          key={srv.category}
                          type="button"
                          onClick={() => setCategory(srv.category)}
                          className={`p-3.5 rounded-2xl text-start transition-all cursor-pointer border flex flex-col justify-between ${
                            isSelected
                              ? 'bg-white border-[#0D5B36] shadow-md shadow-[#0D5B36]/10 text-[#0D5B36] ring-2 ring-[#0D5B36]/20'
                              : 'bg-white border-[#E0D5C1] text-slate-700 hover:border-[#0D5B36]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isSelected ? 'bg-[#0D5B36] text-white' : 'bg-[#FAF8F5] text-slate-700'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-[#0D5B36]" />}
                          </div>
                          <span className="text-xs font-bold font-amiri block leading-tight">
                            {lang === 'ar' ? srv.titleAr : srv.titleEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 rounded-xl bg-[#0D5B36] hover:bg-[#116F43] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>{lang === 'ar' ? 'التالي: بيانات التواصل' : 'Next: Contact Info'}</span>
                      {lang === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CLIENT CONTACT INFORMATION */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8DFC8]">
                    <span className="text-xs font-extrabold text-[#0D5B36] uppercase tracking-wide">
                      {lang === 'ar' ? 'الخطوة 2 من 3: بيانات الموكل للتواصل المباشر' : 'Step 2 of 3: Client Contact Details'}
                    </span>
                    <span className="text-xs font-bold text-[#8B6508]">
                      {getCategoryTitle(category)}
                    </span>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#14261C] mb-1.5">
                      {lang === 'ar' ? 'الاسم الكامل أو اسم المنشأة *' : 'Full Name / Company Name *'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={lang === 'ar' ? 'مثال: محمد بن سعد القحطاني' : 'e.g. Mohammed Al-Qahtani'}
                        className="w-full bg-white border border-[#D8CCB8] focus:border-[#0D5B36] rounded-xl px-4 py-3 text-sm text-[#14261C] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0D5B36]"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute top-3.5 ltr:right-3.5 rtl:left-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#14261C] mb-1.5">
                        {lang === 'ar' ? 'رقم الجوال أو الواتساب *' : 'Phone / WhatsApp Number *'}
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="05xxxxxxxx"
                          className="w-full bg-white border border-[#D8CCB8] focus:border-[#0D5B36] rounded-xl px-4 py-3 text-sm text-[#14261C] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0D5B36] font-mono"
                        />
                        <PhoneCall className="w-4 h-4 text-slate-400 absolute top-3.5 ltr:right-3.5 rtl:left-3.5 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#14261C] mb-1.5">
                        {lang === 'ar' ? 'المدينة / المنطقة' : 'City / Region'}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder={lang === 'ar' ? 'أدخل اسم مدينتك' : 'Enter your city'}
                          className="w-full bg-white border border-[#D8CCB8] focus:border-[#0D5B36] rounded-xl px-4 py-3 text-sm text-[#14261C] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0D5B36]"
                        />
                        <MapPin className="w-4 h-4 text-slate-400 absolute top-3.5 ltr:right-3.5 rtl:left-3.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Preferred Channel */}
                  <div>
                    <label className="block text-xs font-bold text-[#14261C] mb-1.5">
                      {lang === 'ar' ? 'وسيلة التواصل المفضلة' : 'Preferred Communication Channel'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'whatsapp', label: lang === 'ar' ? 'واتساب' : 'WhatsApp', icon: MessageCircle },
                        { id: 'call', label: lang === 'ar' ? 'اتصال هاتفي' : 'Phone Call', icon: PhoneCall },
                        { id: 'in_person', label: lang === 'ar' ? 'المكتب' : 'In Person', icon: User },
                      ].map((ch) => {
                        const Icon = ch.icon;
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => setPreferredMethod(ch.id as ContactMethod)}
                            className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                              preferredMethod === ch.id
                                ? 'bg-white border-[#0D5B36] text-[#0D5B36] shadow-xs'
                                : 'bg-[#FAF8F5] border-[#E0D5C1] text-slate-600'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{ch.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
                    >
                      {lang === 'ar' ? 'السابق' : 'Back'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!fullName.trim() || !phone.trim()) {
                          alert(lang === 'ar' ? 'يرجى كتابة الاسم ورقم الجوال.' : 'Please enter your name and phone.');
                          return;
                        }
                        setCurrentStep(3);
                      }}
                      className="px-6 py-3 rounded-xl bg-[#0D5B36] hover:bg-[#116F43] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>{lang === 'ar' ? 'التالي: تفاصيل القضية' : 'Next: Case Details'}</span>
                      {lang === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CASE DETAILS & DISPATCH */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8DFC8]">
                    <span className="text-xs font-extrabold text-[#0D5B36] uppercase tracking-wide">
                      {lang === 'ar' ? 'الخطوة 3 من 3: تفاصيل الوقائع وموعد الجلسة' : 'Step 3 of 3: Case Facts & Urgent Dates'}
                    </span>
                    <span className="text-xs font-bold text-[#8B6508]">
                      {fullName}
                    </span>
                  </div>

                  {/* Urgency Level Buttons */}
                  <div>
                    <label className="block text-xs font-bold text-[#14261C] mb-1.5">
                      {lang === 'ar' ? 'درجة الاستعجال *' : 'Urgency Level *'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'normal', label: lang === 'ar' ? 'عادية (24 س)' : 'Normal (24h)' },
                        { id: 'urgent', label: lang === 'ar' ? 'عاجلة (اليوم)' : 'Urgent (Today)' },
                        { id: 'emergency', label: lang === 'ar' ? 'طارئة جداً' : 'Emergency' },
                      ].map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => setUrgency(u.id as UrgencyLevel)}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            urgency === u.id
                              ? u.id === 'emergency'
                                ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-xs'
                                : 'bg-[#EBF7EE] border-[#0D5B36] text-[#0D5B36] shadow-xs'
                              : 'bg-white border-[#E0D5C1] text-slate-600'
                          }`}
                        >
                          {u.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Court Date Toggle */}
                  <div className="p-3.5 rounded-2xl bg-white border border-[#E2D8C5] space-y-2">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-xs font-bold text-[#14261C]">
                        {lang === 'ar' ? 'هل لديك جلسة قضائية قادمة في المحكمة أو النيابة؟' : 'Do you have an upcoming court/prosecution hearing?'}
                      </span>
                      <input
                        type="checkbox"
                        checked={hasUpcomingCourtDate}
                        onChange={(e) => setHasUpcomingCourtDate(e.target.checked)}
                        className="w-4 h-4 rounded text-[#0D5B36] cursor-pointer"
                      />
                    </label>
                    {hasUpcomingCourtDate && (
                      <input
                        type="text"
                        value={courtDateNote}
                        onChange={(e) => setCourtDateNote(e.target.value)}
                        placeholder={lang === 'ar' ? 'اذكر تاريخ الجلسة واسم المحكمة (مثال: المحكمة التجارية بعد يومين)' : 'Hearing date & court (e.g. Commercial Court in 2 days)'}
                        className="w-full bg-[#FAF8F5] border border-[#D8CCB8] rounded-xl px-3 py-2 text-xs text-[#14261C] mt-2"
                      />
                    )}
                  </div>

                  {/* Case Details Narrative */}
                  <div>
                    <label className="block text-xs font-bold text-[#14261C] mb-1.5">
                      {lang === 'ar' ? 'شرح مختصر لموضوع القضية والمطالبات *' : 'Brief Case Narrative & Demands *'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={caseDetails}
                      onChange={(e) => setCaseDetails(e.target.value)}
                      placeholder={lang === 'ar' ? 'اذكر باختصار أطراف النزاع، المطالبة المالية أو الحقوقية، وأي مستندات لديك...' : 'Summarize the dispute, financial claim, or rights involved...'}
                      className="w-full bg-white border border-[#D8CCB8] focus:border-[#0D5B36] rounded-xl p-3.5 text-xs text-[#14261C] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0D5B36] resize-none leading-relaxed"
                    />
                  </div>

                  {/* Ready Docs checkbox */}
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700 font-semibold">
                    <input
                      type="checkbox"
                      checked={hasDocuments}
                      onChange={(e) => setHasDocuments(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0D5B36] cursor-pointer"
                    />
                    <span>{lang === 'ar' ? 'لدي أوراق وصكوك وعقود جاهزة للإرسال فوراً عبر الواتساب' : 'I have case documents ready to send on WhatsApp'}</span>
                  </label>

                  {/* Tactile Final Dispatch Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0D5B36] via-[#106A3F] to-[#147A49] hover:from-[#116F43] hover:to-[#178F55] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-[#0D5B36]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{dispatchStage || 'جاري المعالجة...'}</span>
                        </div>
                      ) : (
                        <>
                          <MessageCircle className="w-5 h-5" />
                          <span>{lang === 'ar' ? 'إرسال الطلب مباشرة إلى مكتب المحامي' : 'Dispatch Directly to Lawyer on WhatsApp'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-slate-500 hover:text-slate-800 font-bold"
                    >
                      {lang === 'ar' ? 'الرجوع للبيانات' : 'Edit Contact'}
                    </button>
                    <span className="text-[11px] text-[#0D5B36] font-bold flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" />
                      {lang === 'ar' ? 'سرية مهنية مصونة نظاماً' : 'Privilege Protected'}
                    </span>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Live Dispatch Memo Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live Case Brief Bubble */}
            <div className="bg-[#FAF8F5] border border-[#E0D4C0] rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC8] mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0D5B36] animate-pulse" />
                  <span className="text-xs font-extrabold text-[#0D5B36]">
                    {lang === 'ar' ? 'معاينة المذكرة التي ستصل للمحامي:' : 'Live Brief Sent to Lawyer:'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(previewMessage)}
                  className="text-xs text-slate-600 hover:text-[#0D5B36] font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#0D5B36]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ' : 'Copy')}</span>
                </button>
              </div>

              {/* Chat Viewport in WhatsApp Paper Style */}
              <div className="bg-[#EFEAE2] rounded-2xl p-4 border border-[#E0D7C6] text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto shadow-inner">
                {previewMessage}
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-white border border-[#EAE1D1] text-[11px] text-slate-600 font-medium">
                {lang === 'ar'
                  ? '⚡ يتم إرسال هذا النموذج مباشرة إلى رقم هاتف المحامي المعتمد فور الضغط على الزر، مع فتح تطبيق الواتساب تلقائياً.'
                  : '⚡ Dispatched directly to the certified attorney’s line with automatic WhatsApp app integration.'}
              </div>
            </div>

            {/* Verified Official Line Display */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2D8C5] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EBF7EE] border border-[#BCE4C6] flex items-center justify-center text-[#0D5B36]">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-medium">
                    {lang === 'ar' ? 'خط التواصل المعتمد للمحامي:' : 'Official Lawyer Line:'}
                  </span>
                  <a
                    href="tel:+966568186467"
                    className="text-[#0D5B36] font-mono font-extrabold text-sm hover:underline tracking-wider"
                    dir="ltr"
                  >
                    +966 56 818 6467
                  </a>
                </div>
              </div>
              <a
                href={`https://wa.me/966568186467?text=${encodeURIComponent(
                  lang === 'ar'
                    ? 'السلام عليكم ورحمة الله، أود الاستفسار والتواصل مع مكتب المحامي علي عبدالله الزيلعي.'
                    : 'Greetings, I would like to consult with Advocate Ali Al-Zayla\'i.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white border border-[#D5C6AC] hover:bg-[#FAF8F5] text-[#0D5B36] text-xs font-bold flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'محادثة فورية' : 'Chat'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Success Modal */}
      {submissionSuccess && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSubmissionSuccess(null)}
        >
          <div
            className="bg-white border border-[#D8C7A5] rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center relative shadow-2xl text-[#14261C]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-[#EBF7EE] border border-[#BCE4C6] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-[#0D5B36]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#14261C] mb-2 font-amiri">
              {lang === 'ar' ? 'تم إرسال الطلب بنجاح إلى مكتب المحامي!' : 'Intake Dispatched Successfully!'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed font-normal">
              {lang === 'ar'
                ? 'تم تسجيل استشارتك وإصدار رقم قيد مرجعي، وفتح محادثة واتساب الرسمية مع المحامي علي عبدالله الزيلعي لمتابعة الإجراءات.'
                : 'Your case brief has been docketed and launched on WhatsApp for Advocate Ali Al-Zayla\'i to review.'}
            </p>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E4D9C4] mb-6 flex items-center justify-between">
              <div className="text-start">
                <span className="block text-[11px] text-slate-500 font-medium">{lang === 'ar' ? 'رقم القيد العدلي:' : 'Docket Reference:'}</span>
                <span className="text-lg font-mono font-extrabold text-[#0D5B36] tracking-wider">
                  {submissionSuccess.refCode}
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(submissionSuccess.refCode)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-xs text-slate-800 border border-[#D5C6AC] font-bold flex items-center gap-1.5 shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#0D5B36]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ الكود' : 'Copy')}</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const msg = generateWhatsAppMessage(submissionSuccess.refCode);
                  const cleanNumber = '966568186467';
                  window.open(
                    `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`,
                    '_blank'
                  );
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0D5B36] to-[#127A48] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إعادة فتح محادثة الواتساب' : 'Re-open WhatsApp Chat'}</span>
              </button>

              <button
                onClick={() => setSubmissionSuccess(null)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#FAF8F5] hover:bg-slate-100 text-slate-700 border border-[#E0D5C1] text-sm font-bold cursor-pointer"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
