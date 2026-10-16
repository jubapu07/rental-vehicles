import Link from "next/link";
import { Compass, ShieldCheck, MapPin, Sparkles, Award, ArrowRight } from "lucide-react";
import { INDIAN_CITIES } from "@/lib/indianCities";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
          Bharat&apos;s Mobility Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
          Engineering the Future of Indian Road Trips
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          PRAVAAS Mobility (प्रवास) was born out of a simple frustration: why does renting a car in India involve painful security deposit withholding, hidden FASTag surcharges, and broken vehicles? We set out to build India&apos;s most reliable automotive rental fleet.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-[#EA580C] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white font-['Outfit']">
            Curated for Real Indian Roads
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            From the 226 mm high-clearance Mahindra Thar for Spiti and Ladakh to the ultra-efficient Toyota Innova Hycross for cross-country highway runs, our fleet is chosen for Bharat&apos;s unique asphalt.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white font-['Outfit']">
            Asli Bharosa (Genuine Trust)
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            All security deposits are returned automatically within 2 hours of check-in. Pre-loaded NHAI FASTags ensure zero cash queuing at toll plazas.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white font-['Outfit']">
            Electric Highway Revolution
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We operate India&apos;s largest long-range EV rental network with Nexon EV, Punch EV, and MG ZS EV backed by fast-charging station route guides.
          </p>
        </div>
      </div>

      {/* Operating Network */}
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">
          Our 12 Active Hubs Across India
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
          {INDIAN_CITIES.map((c) => (
            <div key={c.id} className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-slate-900 dark:text-white">{c.name}</p>
              <p className="text-[11px] text-slate-400">{c.airport}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
