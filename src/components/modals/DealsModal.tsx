"use client";

import Link from "next/link";
import { X, Tag, ArrowRight, ShieldCheck, Check } from "lucide-react";

interface DealsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DealsModal({ isOpen, onClose }: DealsModalProps) {
  if (!isOpen) return null;

  const deals = [
    {
      title: "Goa Coastal & Beach Thar 4x4 Specials",
      badge: "Save 40%",
      agency: "Zoomcar",
      city: "Goa",
      description: "Rent iconic Mahindra Thar 4x4 hard top or convertible for exploring North & South Goa beaches. Unlimited km & zero security deposit waiver available.",
      promoCode: "GOAWAVES",
      href: "/explore?city=Goa&category=CAR",
    },
    {
      title: "Western Ghats & Coorg Expedition (Scorpio-N & Fortuner)",
      badge: "Save 35%",
      agency: "Revv",
      city: "Bengaluru",
      description: "Heavy-duty 4x4 SUVs with shift-on-the-fly low range transfer cases for coffee estate trails and hill stations.",
      promoCode: "WESTERNGHATS",
      href: "/explore?city=Bengaluru&category=CAR",
    },
    {
      title: "Himalayan 450 Leh-Ladakh Touring Pass",
      badge: "Save 45%",
      agency: "Avis India",
      city: "New Delhi",
      description: "Brand new Royal Enfield Himalayan 450 (Kamet White) pre-fitted with panniers and crash guards for high-altitude passes.",
      promoCode: "LADAKH45",
      href: "/explore?category=MOTORCYCLE",
    },
    {
      title: "Mumbai-Pune Expressway Weekend Super Deals",
      badge: "Save 30%",
      agency: "MyChoize",
      city: "Mumbai",
      description: "Automatic SUVs and Tata Nexon EVs with FASTag pre-installed for seamless Khandala, Lonavala & Mahabaleshwar drives.",
      promoCode: "LONAVALA30",
      href: "/explore?city=Mumbai",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#FFFFFF] dark:bg-[#272B44] rounded-3xl shadow-2xl border border-[#DFDFD5] dark:border-[#373D60] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#464B71] via-[#34395A] to-[#118AB2] text-white p-6 pb-7 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-white/20">
              <Tag className="w-4 h-4 text-[#7CD5C7]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7CD5C7]">
              Exclusive India Rental Discounts
            </span>
          </div>

          <h3 className="text-2xl font-black text-[#F2F2ED] font-['Outfit']">Save Up to 49% Across India</h3>
          <p className="text-xs text-[#DFDFD5] mt-1 font-normal">
            Real-time verified festive coupons across self-drive hatchbacks, 4x4 SUVs, and electric vehicles.
          </p>
        </div>

        {/* Deals list */}
        <div className="p-6 space-y-3.5 max-h-[60vh] overflow-y-auto bg-[#F2F2ED]/30 dark:bg-[#464B71]/30">
          {deals.map((deal) => (
            <div
              key={deal.promoCode}
              className="p-4 rounded-2xl border border-[#DFDFD5] dark:border-[#373D60] hover:border-[#118AB2]/60 hover:shadow-sm transition-all bg-white dark:bg-[#272B44] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#464B71] dark:text-[#F2F2ED]">{deal.title}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#118AB2]/15 text-[#118AB2] dark:text-[#7CD5C7]">
                  {deal.badge}
                </span>
              </div>
              <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9] font-normal leading-relaxed">
                {deal.description}
              </p>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[11px] text-[#676C8F] dark:text-[#8D93B4] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Code: <code className="bg-[#F2F2ED] dark:bg-[#464B71] px-1.5 py-0.5 rounded text-[#118AB2] font-mono font-bold border border-[#DFDFD5] dark:border-[#373D60]">{deal.promoCode}</code></span>
                </div>
                <Link
                  href={deal.href}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#118AB2] hover:text-[#0D6E8E]"
                >
                  <span>Apply Deal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F2F2ED] dark:bg-[#464B71] border-t border-[#DFDFD5] dark:border-[#373D60] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#676C8F] dark:text-[#A5ABC9]">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Discounts automatically applied at checkout</span>
          </div>
          <Link
            href="/explore"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#464B71] dark:bg-[#118AB2] text-white font-bold hover:bg-[#118AB2] transition-colors"
          >
            View All Deals
          </Link>
        </div>
      </div>
    </div>
  );
}
