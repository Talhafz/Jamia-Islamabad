import commonUr from './locales/ur/common.json';
import homeUr from './locales/ur/home.json';
import aboutUr from './locales/ur/about.json';
import admissionsUr from './locales/ur/admissions.json';
import admissionFormUr from './locales/ur/admissionForm.json';
import studentsUr from './locales/ur/students.json';
import contactUr from './locales/ur/contact.json';
import facultyUr from './locales/ur/faculty.json';
import galleryUr from './locales/ur/gallery.json';
import faqsUr from './locales/ur/faqs.json';
import termsUr from './locales/ur/terms.json';
import privacyUr from './locales/ur/privacy.json';

import commonEn from './locales/en/common.json';
import homeEn from './locales/en/home.json';
import aboutEn from './locales/en/about.json';
import admissionsEn from './locales/en/admissions.json';
import admissionFormEn from './locales/en/admissionForm.json';
import studentsEn from './locales/en/students.json';
import contactEn from './locales/en/contact.json';
import facultyEn from './locales/en/faculty.json';
import galleryEn from './locales/en/gallery.json';
import faqsEn from './locales/en/faqs.json';
import termsEn from './locales/en/terms.json';
import privacyEn from './locales/en/privacy.json';

import commonAr from './locales/ar/common.json';
import homeAr from './locales/ar/home.json';
import aboutAr from './locales/ar/about.json';
import admissionsAr from './locales/ar/admissions.json';
import admissionFormAr from './locales/ar/admissionForm.json';
import studentsAr from './locales/ar/students.json';
import contactAr from './locales/ar/contact.json';
import facultyAr from './locales/ar/faculty.json';
import galleryAr from './locales/ar/gallery.json';
import faqsAr from './locales/ar/faqs.json';
import termsAr from './locales/ar/terms.json';
import privacyAr from './locales/ar/privacy.json';

export type Language = 'ur' | 'en' | 'ar';

export const translations = {
  ur: {
    common: commonUr,
    home: homeUr,
    about: aboutUr,
    admissions: admissionsUr,
    admissionForm: admissionFormUr,
    students: studentsUr,
    contact: contactUr,
    faculty: facultyUr,
    gallery: galleryUr,
    faqs: faqsUr,
    terms: termsUr,
    privacy: privacyUr,
  },
  en: {
    common: commonEn,
    home: homeEn,
    about: aboutEn,
    admissions: admissionsEn,
    admissionForm: admissionFormEn,
    students: studentsEn,
    contact: contactEn,
    faculty: facultyEn,
    gallery: galleryEn,
    faqs: faqsEn,
    terms: termsEn,
    privacy: privacyEn,
  },
  ar: {
    common: commonAr,
    home: homeAr,
    about: aboutAr,
    admissions: admissionsAr,
    admissionForm: admissionFormAr,
    students: studentsAr,
    contact: contactAr,
    faculty: facultyAr,
    gallery: galleryAr,
    faqs: faqsAr,
    terms: termsAr,
    privacy: privacyAr,
  },
};
