"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, Bell, SlidersHorizontal, ArrowUpRight } from "lucide-react";
import PriceTrackingModal from "@/components/modals/PriceTrackingModal";
import DealsModal from "@/components/modals/DealsModal";

interface FeatureValueCardsProps {
  currentCity?: string;
}

export default function FeatureValueCards({ currentCity = "Bengaluru, KA" }: FeatureValueCardsProps) {
  const [isPriceTrackingOpen, setIsPriceTrackingOpen] = useState(false);
  const [isDealsOpen, setIsDealsOpen] = useState(false);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Card 1: Deals & Savings */}
          <button
            type="button"
            onClick={() => setIsDealsOpen(true)}
            className="group text-left bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#E05A36]/40 transition-all cursor-pointer flex items-start gap-4 relative overflow-hidden"
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shrink-0 group-hover:bg-[#E05A36] group-hover:text-white transition-colors duration-300">
              <Tag className="w-5 h-5" />
            </div>
            <div className="space-y-1 grow">
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#E05A36] transition-colors">
                Save up to 49% on car rentals. Compare deals from all over the web.
              </p>
              <span className="text-[11px] font-semibold text-[#E05A36] inline-flex items-center gap-1">
                <span>View current promotions</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </button>

          {/* Card 2: Price Tracking Tools */}
          <button
            type="button"
            onClick={() => setIsPriceTrackingOpen(true)}
            className="group text-left bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#E05A36]/40 transition-all cursor-pointer flex items-start gap-4 relative overflow-hidden"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center shrink-0 group-hover:bg-[#0F2432] group-hover:text-white transition-colors duration-300">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-1 grow">
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#0F2432] transition-colors">
                Never overpay with our price tracking tools.
              </p>
              <span className="text-[11px] font-semibold text-blue-600 inline-flex items-center gap-1">
                <span>Set price drop alert</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </button>

          {/* Card 3: Deep Filtering */}
          <Link
            href="/explore"
            className="group text-left bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#E05A36]/40 transition-all cursor-pointer flex items-start gap-4 relative overflow-hidden"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div className="space-y-1 grow">
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                Filter searches by price, agency and more to find your best car rental.
              </p>
              <span className="text-[11px] font-semibold text-emerald-600 inline-flex items-center gap-1">
                <span>Explore all filters</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Modals */}
      <PriceTrackingModal
        isOpen={isPriceTrackingOpen}
        onClose={() => setIsPriceTrackingOpen(false)}
        defaultCity={currentCity}
      />
      <DealsModal
        isOpen={isDealsOpen}
        onClose={() => setIsDealsOpen(false)}
      />
    </>
  );
}
