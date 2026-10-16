"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What documents are required for self-drive car rental in India?",
      a: "Under the Motor Vehicles Act 1988, you need: (1) An active, non-expired original Indian Driving Licence (held for at least 1 year), and (2) Proof of Identity via DigiLocker. In accordance with the Digital Personal Data Protection (DPDP) Act 2023, Pravaas only stores masked Aadhaar (last 4 digits visible) or Passport/Voter ID. International driving permits (IDP) are accepted alongside home country licences for foreign nationals.",
    },
    {
      q: "How does the refundable security deposit work, and when do I get it back?",
      a: "Our security deposit ranges from ₹2,000 for hatchbacks to ₹5,000 for luxury SUVs like the Fortuner and Thar. Unlike traditional operators who hold funds for 7-14 days, Pravaas processes your refund automatically within 2 hours of post-trip vehicle inspection directly back to your original UPI ID, debit card, or credit card.",
    },
    {
      q: "How do FASTag highway tolls and interstate permits work?",
      a: "Every Pravaas vehicle comes with a pre-activated NHAI FASTag sticker. You can breeze through any expressway or NH toll lane without carrying cash. Toll deductions are synced in real-time and settled transparently from your security deposit balance or payable on trip closure. All vehicles hold valid All-India Commercial Tourist Permits.",
    },
    {
      q: "What is your fuel policy?",
      a: "We follow a fair 'Level-to-Level' (Full-to-Full) policy. You receive the vehicle with a 100% full tank and simply return it with a full tank. If you return with less, fuel is billed strictly at prevailing Indian Oil/BPCL market pump rates with zero penalty markup.",
    },
    {
      q: "What are the speed limit regulations?",
      a: "In compliance with Government of India and Ministry of Road Transport and Highways (MoRTH) regulations, commercial self-drive vehicles are fitted with calibrated speed governors capped at 80 km/h or 120 km/h on access-controlled expressways. A gentle audible warning chimes if the limit is exceeded.",
    },
    {
      q: "What is the cancellation and refund policy?",
      a: "We offer maximum flexibility for Indian travelers: (1) Free cancellation with 100% full refund up to 24 hours before pickup time. (2) Cancellations within 6-24 hours incur a nominal 20% booking charge. (3) If your flight is delayed or cancelled, simply provide the airline PNR for a free trip reschedule.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#118AB2]">
          Clarity & Compliance
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit'] mt-1">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-[#676C8F] dark:text-[#A5ABC9] mt-2">
          Everything you need to know about KYC, FASTag tolls, speed limits, and deposits.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#464B71] dark:text-[#F2F2ED]"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#118AB2] shrink-0" />
                  <span>{f.q}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#676C8F] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#118AB2]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#676C8F] dark:text-[#A5ABC9] leading-relaxed border-t border-[#DFDFD5] dark:border-[#373D60]">
                  <p>{f.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
