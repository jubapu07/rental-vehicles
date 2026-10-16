"use client";

import { useState } from "react";
import { Tag, Sparkles, Copy, Check, ArrowRight } from "lucide-react";
import { VALID_COUPONS } from "@/lib/pricingEngine";
import Link from "next/link";

export default function FestiveOffers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#464B71] via-[#272B44] to-[#141624] text-[#F2F2ED] relative overflow-hidden shadow-2xl border border-[#373D60]">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#118AB2]/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#118AB2]/20 text-[#7CD5C7] text-xs font-bold mb-2 border border-[#118AB2]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#7CD5C7]" />
              <span>Festive & Long Weekend Special Deals</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-['Outfit']">
              Exclusive Bharat Highway Offers
            </h2>
            <p className="text-xs sm:text-sm text-[#A5ABC9] mt-1 max-w-xl">
              Apply coupon codes during checkout to save instantly on your self-drive road trip.
            </p>
          </div>

          <Link
            href="/explore"
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-[#118AB2] hover:bg-[#0D6E8E] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
          >
            <span>Redeem On Any Car</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALID_COUPONS.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <div
                key={coupon.code}
                className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-[#373D60] hover:border-[#7CD5C7]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-extrabold tracking-wider text-[#7CD5C7] bg-[#118AB2]/25 px-2.5 py-0.5 rounded-md border border-[#118AB2]/40">
                      {coupon.code}
                    </span>
                    <span className="text-[10px] text-[#A5ABC9] font-semibold">
                      Min: ₹{coupon.minAmount}
                    </span>
                  </div>
                  <p className="text-xs text-[#F2F2ED] leading-snug">
                    {coupon.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className={`mt-4 w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isCopied
                      ? "bg-emerald-600 text-white"
                      : "bg-white/15 hover:bg-white/25 text-[#F2F2ED]"
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
