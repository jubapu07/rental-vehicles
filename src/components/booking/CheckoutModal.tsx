"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, ShieldCheck, CreditCard, Lock, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import { VehicleData, QuoteCalculation } from "@/lib/types";

interface CheckoutModalProps {
  vehicle: VehicleData;
  quote: QuoteCalculation;
  onClose: () => void;
}

export default function CheckoutModal({ vehicle, quote, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("888");
  const [nameOnCard, setNameOnCard] = useState("Arjun Mehta");
  const [confirmedBooking, setConfirmedBooking] = useState<{ id: string; stripePaymentIntentId?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          startDate: quote.startDate,
          endDate: quote.endDate,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || "Failed to process booking reservation.");
        setLoading(false);
        return;
      }

      setConfirmedBooking(data.booking);
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMessage("Network error processing payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const coverImage = vehicle.images.find((i) => i.isCover)?.url || vehicle.images[0]?.url;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-[#0F2432] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E05A36] flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Secure Checkout</h3>
              <p className="text-[11px] text-slate-300">256-Bit Encrypted Mobility Booking</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Confirmed Screen */}
        {confirmedBooking ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Trip Confirmed
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                You&apos;re All Set to Drive!
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Your reservation for the <strong className="text-slate-800">{vehicle.title}</strong> has been secured and synced with host {vehicle.host.name}.
              </p>
            </div>

            {/* Confirmation details badge */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-bold text-slate-900 font-mono">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Stripe Payment Intent:</span>
                <span className="font-medium text-slate-700 font-mono text-[11px]">{confirmedBooking.stripePaymentIntentId}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold">
                <span>Total Charged:</span>
                <span className="text-[#0F2432] num-tabular">₹{quote.totalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push("/dashboard");
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#0F2432] hover:bg-[#E05A36] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Go to Trips Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleConfirmReservation} className="p-6 space-y-6">
            {/* Vehicle preview chip */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage}
                alt={vehicle.title}
                className="w-16 h-12 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{vehicle.title}</p>
                <p className="text-[11px] text-slate-500">{vehicle.locationAddress}, {vehicle.city}</p>
                <p className="text-[11px] font-semibold text-[#E05A36] mt-0.5">
                  {new Date(quote.startDate).toLocaleDateString()} → {new Date(quote.endDate).toLocaleDateString()} ({quote.totalDays} Days)
                </p>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="space-y-2 text-xs border-b border-slate-100 pb-4">
              <div className="flex justify-between text-slate-600">
                <span>₹{quote.dayRate.toLocaleString("en-IN")} × {quote.totalDays} days</span>
                <span className="font-semibold text-slate-900 num-tabular">₹{quote.baseAmount.toLocaleString("en-IN")}</span>
              </div>

              {quote.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Weekly Duration Discount ({quote.weeklyDiscountPercentage}%)</span>
                  <span className="font-bold num-tabular">-₹{quote.discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Platform Service & Protection Fee</span>
                <span className="font-semibold text-slate-900 num-tabular">₹{quote.serviceFee.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Refundable Security Deposit</span>
                <span className="font-semibold text-slate-900 num-tabular">₹{quote.securityDeposit.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between items-center text-sm font-black text-slate-900 border-t border-slate-200 pt-3">
                <span>Total Certified Due</span>
                <span className="text-base text-[#0F2432] num-tabular">₹{quote.totalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Driver License Verification Card */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-emerald-900">Verified Driver Profile</p>
                  <p className="text-[10px] text-emerald-700">Arjun Mehta • Indian Driving License (KA-01-2022-9874561)</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                VERIFIED
              </span>
            </div>

            {/* Mock Stripe Payment Card Form */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                Payment Information (Simulated Stripe)
              </label>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Name on Card</label>
                <input
                  type="text"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F2432]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F2432] pr-10"
                  />
                  <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Expires</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F2432]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">CVC</label>
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F2432]"
                  />
                </div>
              </div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#E05A36] hover:bg-[#C94C2B] disabled:opacity-50 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment Intent...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Authorize & Pay ₹{quote.totalPrice.toLocaleString("en-IN")}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
