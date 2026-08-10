'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { PageBanner } from '../../components/PageBanner';
import { useLanguage } from '../../context/LanguageContext';

export default function ContactPage() {
  const { t, direction } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      console.log('Contact inquiry sent:', { name, email, subject, message });
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-[var(--color-emerald-bg)] text-[var(--color-text-body)]" dir={direction}>
      <PageBanner 
        title={t('contact:title')} 
        description={t('contact:description')} 
      />

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Contact details Card */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-[4px] card-standard flex flex-col gap-4">
              <h3 className={`text-base font-extrabold text-[var(--color-gold-bright)] ${direction === 'rtl' ? 'border-r-2 pr-2' : 'border-l-2 pl-2'} border-[var(--color-gold-primary)]`}>
                {t('contact:officeAddressTitle')}
              </h3>
              
              <div className="flex flex-col gap-4 text-xs font-semibold text-[var(--color-text-body)]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4.5 h-4.5 text-[var(--color-teal-accent)] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {t('contact:officeAddressText')}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4.5 h-4.5 text-[var(--color-teal-accent)] flex-shrink-0" />
                  <span className="font-mono" dir="ltr">+92 51 4864 945</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4.5 h-4.5 text-[var(--color-teal-accent)] flex-shrink-0" />
                  <span className="font-mono">info@jamiaislamabad.net</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="p-8 bg-[var(--color-emerald-deep)] border border-[var(--color-teal-accent)]/30 rounded-[4px] text-center flex flex-col items-center gap-4 animate-scale-up">
                <CheckCircle className="w-12 h-12 text-[var(--color-teal-accent)]" />
                <h3 className="text-lg font-bold text-[var(--color-gold-bright)]">{t('contact:successTitle')}</h3>
                <p className="text-[var(--color-text-body)] text-xs leading-relaxed max-w-sm">
                  {t('contact:successDesc')}
                </p>
                <button 
                  onClick={() => {
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                    setSubmitted(false);
                  }}
                  className="mt-2 btn-primary-gold px-4 py-2 text-xs"
                >
                  {t('contact:sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 rounded-[4px] card-standard flex flex-col gap-4">
                <h3 className={`text-base font-extrabold text-[var(--color-gold-bright)] ${direction === 'rtl' ? 'border-r-2 pr-2' : 'border-l-2 pl-2'} border-[var(--color-gold-primary)] mb-2`}>
                  {t('contact:formTitle')}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[var(--color-text-muted)]">{t('contact:fullName')}</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('contact:fullNamePlaceholder')}
                      className="w-full px-3 py-2 text-xs border rounded-sm border-[var(--color-emerald-mid)] text-[var(--color-text-body)] bg-[var(--color-emerald-deep)] focus:outline-none focus:border-[var(--color-gold-primary)] transition-all"
                      dir={direction}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[var(--color-text-muted)]">{t('contact:email')}</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('contact:emailPlaceholder')}
                      className="w-full px-3 py-2 text-xs border rounded-sm border-[var(--color-emerald-mid)] text-[var(--color-text-body)] bg-[var(--color-emerald-deep)] focus:outline-none focus:border-[var(--color-gold-primary)] transition-all"
                      dir={direction}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--color-text-muted)]">{t('contact:subject')}</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t('contact:subjectPlaceholder')}
                    className="w-full px-3 py-2 text-xs border rounded-sm border-[var(--color-emerald-mid)] text-[var(--color-text-body)] bg-[var(--color-emerald-deep)] focus:outline-none focus:border-[var(--color-gold-primary)] transition-all"
                    dir={direction}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--color-text-muted)]">{t('contact:message')}</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('contact:messagePlaceholder')}
                    className="w-full px-3 py-2 text-xs border rounded-sm border-[var(--color-emerald-mid)] text-[var(--color-text-body)] bg-[var(--color-emerald-deep)] focus:outline-none focus:border-[var(--color-gold-primary)] transition-all resize-none"
                    dir={direction}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 btn-primary-gold text-xs flex items-center justify-center gap-1.5 mt-2"
                >
                  <Send className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                  {t('contact:submitBtn')}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
