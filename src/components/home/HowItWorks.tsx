"use client";

import { Search, FileCheck, KeyRound, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      icon: Search,
      title: t.step1Title,
      desc: t.step1Desc,
      tag: "Zero Surprises",
    },
    {
      num: "02",
      icon: FileCheck,
      title: t.step2Title,
      desc: t.step2Desc,
      tag: "Paperless & Safe",
    },
    {
      num: "03",
      icon: KeyRound,
      title: t.step3Title,
      desc: t.step3Desc,
      tag: "Sanitized & Full Tank",
    },
    {
      num: "04",
      icon: RotateCcw,
      title: t.step4Title,
      desc: t.step4Desc,
      tag: "Instant 2-Hour Refund",
    },
  ];

  return (
    <section className="bg-[#F2F2ED]/60 dark:bg-[#464B71] py-16 border-y border-[#DFDFD5] dark:border-[#373D60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#118AB2]">
            Simple & Transparent
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit'] mt-1">
            {t.howItWorksTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#676C8F] dark:text-[#A5ABC9] mt-2">
            No lengthy dealership paperwork, no waiting in line at airport counters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative p-7 rounded-3xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] shadow-xs hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#118AB2]/15 text-[#118AB2] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-extrabold text-[#DFDFD5] dark:text-[#373D60] font-['Outfit']">
                    {s.num}
                  </span>
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#118AB2] bg-[#118AB2]/10 dark:bg-[#118AB2]/20 px-2.5 py-0.5 rounded-full border border-[#118AB2]/20">
                  {s.tag}
                </span>

                <h3 className="text-base font-bold text-[#464B71] dark:text-[#F2F2ED] mt-2.5 mb-1.5 font-['Outfit']">
                  {s.title}
                </h3>
                <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
