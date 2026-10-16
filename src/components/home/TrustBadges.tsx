"use client";

import { ShieldCheck, Zap, RefreshCw, Headphones, Fuel, FileCheck } from "lucide-react";

export default function TrustBadges() {
  const perks = [
    {
      icon: ShieldCheck,
      title: "Zero Hidden Deposit Scams",
      desc: "Transparent ₹2,000 to ₹5,000 security deposit with instant UPI refund within 2 hours of check-in.",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      icon: Zap,
      title: "Pre-loaded FASTag Toll Sync",
      desc: "All cars equipped with active NHAI FASTags. No waiting at cash toll lanes across state borders.",
      color: "text-[#118AB2]",
      bg: "bg-[#118AB2]/15 dark:bg-[#118AB2]/20",
    },
    {
      icon: FileCheck,
      title: "60-Second DigiLocker KYC",
      desc: "Fast digital verification using your Driving Licence and masked Aadhaar (DPDP Act 2023 compliant).",
      color: "text-[#7CD5C7]",
      bg: "bg-[#7CD5C7]/20 dark:bg-[#7CD5C7]/20",
    },
    {
      icon: Headphones,
      title: "24x7 Pan-India RSA Support",
      desc: "Dedicated roadside assistance network across 10,000+ national and state highway patrol points.",
      color: "text-[#118AB2]",
      bg: "bg-[#118AB2]/10 dark:bg-[#118AB2]/25",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {perks.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] shadow-xs hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#464B71] dark:text-[#F2F2ED] font-['Outfit'] mb-1.5">
                {p.title}
              </h3>
              <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9] leading-relaxed">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
