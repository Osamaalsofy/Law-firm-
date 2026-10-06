/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, ServiceItem, CaseCategory } from './types';
import { LAWYER_INFO } from './data/content';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ConsultationForm } from './components/ConsultationForm';
import { AboutLawyer } from './components/AboutLawyer';
import { ConsultationEstimator } from './components/ConsultationEstimator';
import { TestimonialsFAQ } from './components/TestimonialsFAQ';
import { OfficeLocationSection } from './components/OfficeLocationSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  // Default to Arabic first as requested
  const [lang, setLang] = useState<Language>('ar');
  const [whatsappNumber, setWhatsappNumber] = useState<string>(LAWYER_INFO.defaultWhatsApp);
  const [preSelectedCategory, setPreSelectedCategory] = useState<CaseCategory | undefined>();

  // Sync dir and lang attributes on <html> tag
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleUpdateWhatsAppNumber = (newNum: string) => {
    setWhatsappNumber(newNum);
    try {
      localStorage.setItem('alzaylai_wa_number', newNum);
    } catch {
      // ignore
    }
  };

  const handleSelectServiceForConsultation = (service: ServiceItem) => {
    setPreSelectedCategory(service.category);
  };

  const handleOpenConsultation = () => {
    const el = document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAF8F5] text-[#14261C] ${lang === 'ar' ? 'font-cairo' : 'font-sans'}`}>
      {/* Sticky Luxury Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        whatsappNumber={whatsappNumber}
      />

      <main>
        {/* Cinematic Hero */}
        <Hero
          lang={lang}
          onOpenConsultation={handleOpenConsultation}
          whatsappNumber={whatsappNumber}
        />

        {/* About the Lawyer & Judicial Standing */}
        <AboutLawyer lang={lang} />

        {/* Legal Practice Areas & Detailed Procedures */}
        <ServicesSection
          lang={lang}
          onSelectServiceForConsultation={handleSelectServiceForConsultation}
          whatsappNumber={whatsappNumber}
        />

        {/* Central Consultation Request & Direct WhatsApp Form */}
        <ConsultationForm
          lang={lang}
          preSelectedCategory={preSelectedCategory}
          whatsappNumber={whatsappNumber}
          onUpdateWhatsAppNumber={handleUpdateWhatsAppNumber}
        />

        {/* Procedural Scope & Fee Tier Estimator */}
        <ConsultationEstimator
          lang={lang}
          whatsappNumber={whatsappNumber}
        />

        {/* Testimonials & Legal FAQs */}
        <TestimonialsFAQ lang={lang} />

        {/* Office Location & Interactive Google Map */}
        <OfficeLocationSection
          lang={lang}
          whatsappNumber={whatsappNumber}
        />
      </main>

      {/* Floating Action Button */}
      <FloatingWhatsApp
        lang={lang}
        whatsappNumber={whatsappNumber}
      />

      {/* Dignified Footer */}
      <Footer lang={lang} />
    </div>
  );
}
