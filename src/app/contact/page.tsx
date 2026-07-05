'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 select-none">
      
      {/* Hero Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-zinc-950 tracking-tight leading-none">
          Contact Admin Office
        </h1>
        <p className="text-zinc-500 text-xs max-w-xl leading-relaxed">
          Have queries regarding registration, eligibility, or certificates? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact details Card */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-4">
            <h3 className="text-base font-extrabold text-emerald-950 border-l-2 border-emerald-700 pl-2">Office Address</h3>
            
            <div className="flex flex-col gap-4 text-xs font-semibold text-zinc-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  Adjacent Central Jamia Masjid Noor-e-Madina, Street No. B-85, I-8/4, Islamabad, Pakistan
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
                <span className="font-mono">+92 51 4864 945</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
                <span className="font-mono">info@jamiaislamabad.net</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="md:col-span-7">
          {submitted ? (
            <div className="p-8 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-center flex flex-col items-center gap-4 animate-scale-up">
              <CheckCircle className="w-12 h-12 text-emerald-600" />
              <h3 className="text-lg font-bold text-emerald-950">Inquiry Sent Successfully</h3>
              <p className="text-zinc-600 text-xs leading-relaxed max-w-sm">
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
                className="mt-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all duration-200"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-4">
              <h3 className="text-base font-extrabold text-emerald-950 border-l-2 border-emerald-700 pl-2 mb-2">Send an Inquiry</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 text-xs border rounded-lg border-zinc-300 text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-xs border rounded-lg border-zinc-300 text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-700">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Inquiry Topic"
                  className="w-full px-3 py-2 text-xs border rounded-lg border-zinc-300 text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-700">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter details of your inquiry"
                  className="w-full px-3 py-2 text-xs border rounded-lg border-zinc-300 text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-extrabold shadow-md transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                Submit Message
              </button>

            </form>
          )}
        </div>

      </div>

    </div>
  );
}
