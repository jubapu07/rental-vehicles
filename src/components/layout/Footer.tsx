"use client";

import Link from "next/link";
import {
  Compass,
  Phone,
  Mail,
  ShieldCheck,
  MapPin,
  Lock,
  FileText,
  Clock,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { INDIAN_CITIES } from "@/lib/indianCities";

export default function Footer() {
  return (
    <footer className="bg-[#141624] text-[#A5ABC9] border-t border-[#373D60]">
      {/* 1. Trust & Safety Strip */}
      <div className="border-b border-[#373D60] bg-[#11131F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#118AB2]/20 text-[#7CD5C7] flex items-center justify-center shrink-0 border border-[#118AB2]/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F2F2ED] uppercase tracking-wider">Zero Hidden Charges</p>
              <p className="text-[11px] text-[#8D93B4]">100% Refundable Security Deposit</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F2F2ED] uppercase tracking-wider">Pre-loaded FASTag</p>
              <p className="text-[11px] text-[#8D93B4]">Glide through NHAI toll plazas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7CD5C7]/20 text-[#7CD5C7] flex items-center justify-center shrink-0 border border-[#7CD5C7]/30">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F2F2ED] uppercase tracking-wider">24x7 Pan-India RSA</p>
              <p className="text-[11px] text-[#8D93B4]">Nationwide Roadside Assistance</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#118AB2]/20 text-[#118AB2] flex items-center justify-center shrink-0 border border-[#118AB2]/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F2F2ED] uppercase tracking-wider">DPDP Act 2023</p>
              <p className="text-[11px] text-[#8D93B4]">Masked Aadhaar & Data Privacy</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & About */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#118AB2] to-[#0D6E8E] text-white flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6 text-[#F2F2ED]" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#F2F2ED] font-['Outfit']">
              PRAVAAS<span className="text-[#118AB2]">.</span>
            </span>
          </Link>
          <p className="text-xs text-[#8D93B4] leading-relaxed max-w-sm">
            PRAVAAS Mobility Technologies Pvt. Ltd. is India&apos;s leading self-drive and chauffeur platform. Verified high-performance SUVs, executive sedans, and long-range EVs equipped with FASTags, zero-deposit surprises, and doorstep delivery.
          </p>

          <div className="pt-2 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#F2F2ED]">
              <Phone className="w-4 h-4 text-[#7CD5C7]" />
              <span>24x7 Toll Free: 1800-202-PRAVAAS (+91 800 202 7728)</span>
            </div>
            <div className="flex items-center gap-2 text-[#F2F2ED]">
              <Mail className="w-4 h-4 text-[#7CD5C7]" />
              <span>concierge@pravaas.in</span>
            </div>
            <div className="flex items-center gap-2 text-[#F2F2ED]">
              <CreditCard className="w-4 h-4 text-[#7CD5C7]" />
              <span>Razorpay Verified Merchant (UPI, RuPay, Netbanking, Cards)</span>
            </div>
          </div>
        </div>

        {/* Fleet Categories */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#F2F2ED]">Fleet Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/explore?category=SUV" className="hover:text-[#7CD5C7] transition-colors">Thar & Highway SUVs (4x4)</Link></li>
            <li><Link href="/explore?category=SEDAN" className="hover:text-[#7CD5C7] transition-colors">Executive Sedans (City, Verna)</Link></li>
            <li><Link href="/explore?category=COMPACT_SUV" className="hover:text-[#7CD5C7] transition-colors">Compact SUVs (Nexon, Brezza, 3XO)</Link></li>
            <li><Link href="/explore?category=MPV" className="hover:text-[#7CD5C7] transition-colors">7-Seater MPVs (Innova, Carens)</Link></li>
            <li><Link href="/explore?category=HATCHBACK" className="hover:text-[#7CD5C7] transition-colors">City Hatchbacks (Swift, Baleno)</Link></li>
            <li><Link href="/explore?category=ELECTRIC" className="text-[#7CD5C7] hover:text-[#F2F2ED] font-semibold transition-colors">Electric Mobility (Nexon EV, ZS EV)</Link></li>
          </ul>
        </div>

        {/* Indian Operating Cities */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#F2F2ED]">Hub Locations</h4>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
            {INDIAN_CITIES.map((city) => (
              <li key={city.id}>
                <Link href={`/explore?city=${city.name}`} className="hover:text-[#7CD5C7] transition-colors flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-[#8D93B4]" />
                  <span>{city.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Compliance & Policy Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#F2F2ED]">Standards & Legal</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/about" className="hover:text-[#7CD5C7] transition-colors">About PRAVAAS</Link></li>
            <li><Link href="/contact" className="hover:text-[#7CD5C7] transition-colors">Contact & 24x7 RSA</Link></li>
            <li><Link href="/terms" className="hover:text-[#7CD5C7] transition-colors">Rental Terms & Motor Vehicles Act</Link></li>
            <li><Link href="/privacy" className="hover:text-[#7CD5C7] transition-colors">Privacy Policy (DPDP 2023)</Link></li>
            <li><Link href="/cancellation-policy" className="hover:text-[#7CD5C7] transition-colors">Cancellation & Instant Refund Rules</Link></li>
            <li><Link href="/dashboard?tab=invoices" className="hover:text-[#7CD5C7] transition-colors">GST Tax Invoice FAQ</Link></li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Legal & GSTIN bar */}
      <div className="border-t border-[#373D60] bg-[#141624] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8D93B4]">
          <div>
            <p>© 2026 PRAVAAS Mobility Technologies Pvt. Ltd. All rights reserved.</p>
            <p className="mt-0.5">
              GSTIN: <span className="font-mono text-[#F2F2ED]">29AAACP8921M1ZT</span> | SAC Code: <span className="font-mono text-[#F2F2ED]">996601</span> (Passenger Motor Vehicle Rental Services)
            </p>
          </div>
          <div className="flex items-center gap-4 text-[#A5ABC9]">
            <span>PCI-DSS Level 1 Gateway Hosting</span>
            <span>•</span>
            <span>DigiLocker Compliant</span>
            <span>•</span>
            <span>NHAI FASTag Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
