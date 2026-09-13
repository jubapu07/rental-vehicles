"use client";

import { useState, useEffect } from "react";
import { Zap, ShieldCheck, AlertTriangle, Calendar, Sparkles } from "lucide-react";
import { VehicleData, QuoteCalculation } from "@/lib/types";
import CheckoutModal from "./CheckoutModal";

interface StickyReservationModuleProps {
  vehicle: VehicleData;
  initialStart?: string;
  initialEnd?: string;
}

export default function StickyReservationModule({
  vehicle,
  initialStart = "",
  initialEnd = "",
}: StickyReservationModuleProps) {
  // Set default tomorrow + 3 days if empty
  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const getFourDaysOut = () => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split("T")[0];
  };

  const [startDate, setStartDate] = useState(initialStart || getTomorrow());
  const [endDate, setEndDate] = useState(initialEnd || getFourDaysOut());
  const [quote, setQuote] = useState<QuoteCalculation | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  // Fetch live quote calculation whenever dates change
  useEffect(() => {
    if (!startDate || !endDate) return;

    const s = new Date(startDate);
    const e = new Date(endDate);
    if (s >= e) {
      setAvailabilityError("Trip end date must be after start date.");
      setQuote(null);
      return;
    }

    let isMounted = true;
    const fetchQuote = async () => {
      setLoadingQuote(true);
      setAvailabilityError(null);

      try {
        const res = await fetch(`/api/vehicles/${vehicle.id}/calculate-quote`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ startDate, endDate }),
        });
        const data = await res.json();

        if (!isMounted) return;

        if (data.available && data.quote) {
          setQuote(data.quote);
          setAvailabilityError(null);
        } else {
          setQuote(null);
          setAvailabilityError(data.reason || "Vehicle is unavailable for these dates.");
        }
      } catch (err) {
        console.error("Quote fetch error:", err);
      } finally {
        if (isMounted) setLoadingQuote(false);
      }
    };

    fetchQuote();
    return () => {
      isMounted = false;
    };
  }, [vehicle.id, startDate, endDate]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="sticky top-28 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6">
      {/* Price Header */}
      <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900 num-tabular">
              ₹{vehicle.dayRate.toLocaleString("en-IN")}
            </span>
            <span className="text-sm font-semibold text-slate-500">/ day</span>
          </div>
          {vehicle.weeklyDiscountPercentage > 0 && (
            <p className="text-[11px] font-bold text-emerald-700 mt-1">
              {vehicle.weeklyDiscountPercentage}% discount on trips of 7+ days
            </p>
          )}
        </div>

        {vehicle.instantBookable ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-[#E05A36] text-xs font-black border border-amber-200">
            <Zap className="w-3.5 h-3.5 fill-[#E05A36]" />
            Instant Book
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            Host Approval
          </span>
        )}
      </div>

      {/* Date Range Selector */}
      <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-50 border border-slate-200">
        <div className="p-2.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Trip Start
          </label>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="date"
              min={today}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden"
            />
          </div>
        </div>

        <div className="p-2.5 border-l border-slate-200">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Trip End
          </label>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="date"
              min={startDate || today}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Collision / Error Alert */}
      {availabilityError && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in duration-200">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
          <div>
            <p className="font-bold">Collision Detected</p>
            <p className="text-[11px] mt-0.5">{availabilityError}</p>
          </div>
        </div>
      )}

      {/* Certified Quote Breakdown */}
      {loadingQuote ? (
        <div className="py-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
          <div className="w-4 h-4 border-2 border-[#E05A36] border-t-transparent rounded-full animate-spin" />
          <span>Computing certified quote...</span>
        </div>
      ) : quote ? (
        <div className="space-y-3 text-xs border-t border-slate-100 pt-4">
          <div className="flex justify-between text-slate-600">
            <span>₹{quote.dayRate.toLocaleString("en-IN")} × {quote.totalDays} days</span>
            <span className="font-semibold text-slate-900 num-tabular">₹{quote.baseAmount.toLocaleString("en-IN")}</span>
          </div>

          {quote.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Duration discount ({quote.weeklyDiscountPercentage}%)</span>
              <span className="num-tabular">-₹{quote.discountAmount.toLocaleString("en-IN")}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-600">
            <span className="underline decoration-dotted cursor-help" title="Covers 24/7 roadside assistance, host verification and booking insurance">
              Platform Service Fee (10%)
            </span>
            <span className="font-semibold text-slate-900 num-tabular">₹{quote.serviceFee.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span className="underline decoration-dotted cursor-help" title="100% refunded after trip upon safe vehicle return">
              Refundable Security Deposit
            </span>
            <span className="font-semibold text-slate-900 num-tabular">₹{quote.securityDeposit.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between items-baseline border-t border-slate-200 pt-3 text-sm font-black text-slate-900">
            <span>Total Certified Quote</span>
            <span className="text-xl text-[#0F2432] num-tabular">₹{quote.totalPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>
      ) : null}

      {/* CTA Button */}
      <button
        type="button"
        disabled={loadingQuote || !quote || Boolean(availabilityError)}
        onClick={() => setIsCheckoutOpen(true)}
        className="w-full py-4 px-6 rounded-2xl bg-[#E05A36] hover:bg-[#C94C2B] disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-98"
      >
        {vehicle.instantBookable ? (
          <>
            <Zap className="w-4 h-4 fill-white" />
            <span>Instant Book</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Request Reservation</span>
          </>
        )}
      </button>

      {/* Guarantee Footnote */}
      <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>You won&apos;t be charged until dates are certified</span>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && quote && (
        <CheckoutModal
          vehicle={vehicle}
          quote={quote}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </div>
  );
}
