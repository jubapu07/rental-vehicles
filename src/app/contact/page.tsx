"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";
import { INDIAN_CITIES } from "@/lib/indianCities";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
          24x7 Roadside & Concierge Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          We&apos;re With You on Every Kilometer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Pan-India Highway SOS dispatch, booking extensions, and airport concierge assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <Phone className="w-6 h-6 text-[#EA580C]" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Toll-Free Pan-India SOS</h3>
          <p className="text-xs text-slate-500">Immediate roadside assistance across 10,000+ national highway points.</p>
          <p className="font-mono text-sm font-bold text-[#EA580C] pt-2">1800-202-PRAVAAS</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <MessageSquare className="w-6 h-6 text-emerald-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">WhatsApp Concierge</h3>
          <p className="text-xs text-slate-500">Real-time FASTag balance queries, trip extensions, and vehicle handovers.</p>
          <p className="font-mono text-sm font-bold text-emerald-600 pt-2">+91 800 202 7728</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <Mail className="w-6 h-6 text-blue-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Executive Corporate Fleet</h3>
          <p className="text-xs text-slate-500">GST invoices, long-term monthly rentals, and luxury chauffeur fleets.</p>
          <p className="font-mono text-sm font-bold text-blue-600 pt-2">concierge@pravaas.in</p>
        </div>
      </div>

      {/* Message Form */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl max-w-2xl mx-auto space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">
          Send Our Highway Operations Team a Note
        </h2>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Message Dispatched!</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-300">
              Our duty manager will connect via SMS or phone within 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Mobile Number (+91)</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 mb-1">City Hub or Highway Location</label>
              <select className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                {INDIAN_CITIES.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-500 mb-1">Message or Query</label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about your upcoming trip, airport pickup requirement, or corporate booking..."
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#EA580C] text-white text-xs font-bold hover:brightness-105"
            >
              Submit Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
