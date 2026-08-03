'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

import { PageBanner } from '../../components/PageBanner';

export default function ContactPage() {
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
    <div className="w-full flex flex-col items-center bg-[var(--color-emerald-bg)] min-h-screen">
      <PageBanner 
        title="Contact Admin Office" 
        description="Have queries regarding registration, eligibility, or certificates? Get in touch with our team." 
      />

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Contact details Card */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="card-standard p-6 rounded-2xl bg-[var(--color-panel)] shadow-md flex flex-col gap-4">
              <h3 className="text-base font-extrabold text-[var(--color-gold-primary)] border-l-2 border-[var(--color-gold-muted)] pl-2">Office Address</h3>
              
              <div className="flex flex-col gap-4 text-xs font-semibold text-[var(--color-text-body)]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4.5 h-4.5 text-[var(--color-teal-accent)] flex-shrink-0 mt-0.5" />
                  <span>
                    Adjacent Central Jamia Masjid Noor-e-Madina, Street No. B-85, I-8/4, Islamabad, Pakistan
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
              <div className="p-8 bg-[var(--color-panel)] border border-[var(--color-gold-muted)]/40 rounded-2xl text-center flex flex-col items-center gap-4 animate-scale-up">
                <CheckCircle className="w-12 h-12 text-[var(--color-teal-accent)]" />
                <h3 className="text-lg font-bold text-[var(--color-gold-primary)]">Inquiry Sent Successfully</h3>
                <p className="text-[var(--color-text-body)] text-xs leading-relaxed max-w-sm">
                  Thank you for contacting us. Our administrator will review your message and reply via email shortly.
                </p>
                <button 
                  onClick={() => {
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                    setSubmitted(false);
                  }}
                  className="mt-2 px-4 py-2 bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-bright)] text-[var(--color-emerald-deep)] rounded-lg text-xs font-extrabold transition-all duration-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-standard p-6 rounded-2xl bg-[var(--color-panel)] shadow-md flex flex-col gap-4">
                <h3 className="text-base font-extrabold text-[var(--color-gold-primary)] border-l-2 border-[var(--color-gold-muted)] pl-2 mb-2">Send an Inquiry</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[var(--color-gold-bright)]">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 text-xs border rounded-lg border-[var(--color-emerald-mid)] text-[var(--color-text-body)] bg-[var(--color-emerald-deep)] focus:outline-none focus:border-[var(--color-gold-primary)] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[var(--color-gold-bright)]">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 text-xs border rounded-lg border-[var(--color-emerald-mid)] text-[var(--color-text-body)] bg-[var(--color-emerald-deep)] focus:outline-none focus:border-[var(--color-gold-primary)] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--color-gold-bright)]">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Inquiry Topic"
                    className="w-full px-3 py-2 text-xs border rounded-lg border-[var(--color-emerald-mid)] text-[var(--color-text-body)] bg-[var(--color-emerald-deep)] focus:outline-none focus:border-[var(--color-gold-primary)] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--color-gold-bright)]">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter details of your inquiry"
                    className="w-full px-3 py-2 text-xs border rounded-lg border-[var(--color-emerald-mid)] text-[var(--color-text-body)] bg-[var(--color-emerald-deep)] focus:outline-none focus:border-[var(--color-gold-primary)] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-bright)] text-[var(--color-emerald-deep)] rounded-lg text-xs font-extrabold shadow-md transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  Submit Message
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
