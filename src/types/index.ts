export type Language = 'ar' | 'en';

export type CaseCategory =
  | 'commercial'
  | 'criminal'
  | 'labor'
  | 'family'
  | 'realestate'
  | 'contracts'
  | 'arbitration'
  | 'execution';

export type UrgencyLevel = 'normal' | 'urgent' | 'emergency';

export type ContactMethod = 'whatsapp' | 'call' | 'in_person';

export interface ServiceItem {
  id: string;
  category: CaseCategory;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  iconName: string;
  keyProceduresAr: string[];
  keyProceduresEn: string[];
  requiredDocsAr: string[];
  requiredDocsEn: string[];
  targetAudienceAr: string;
  targetAudienceEn: string;
}

export interface ConsultationSubmission {
  id: string;
  refCode: string;
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  category: CaseCategory;
  urgency: UrgencyLevel;
  preferredMethod: ContactMethod;
  caseDetails: string;
  hasDocuments: boolean;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'contacted';
}

export interface TestimonialItem {
  id: string;
  clientNameAr: string;
  clientNameEn: string;
  roleAr: string;
  roleEn: string;
  caseTypeAr: string;
  caseTypeEn: string;
  commentAr: string;
  commentEn: string;
  rating: number;
  year: string;
}

export interface FAQItem {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}
