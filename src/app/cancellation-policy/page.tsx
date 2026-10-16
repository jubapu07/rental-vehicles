import { Clock, ShieldCheck, RotateCcw, AlertCircle } from "lucide-react";

export default function CancellationPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
          Fair & Transparent
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
          Cancellation & Instant Refund Policy
        </h1>
        <p className="text-xs text-slate-500 mt-1">Guaranteed 2-hour refund turnarounds via UPI and Cards</p>
      </div>

      {/* Cancellation Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center font-bold text-xs">
            &gt; 24h
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">100% Full Refund</h3>
          <p className="text-xs text-slate-500">
            Cancel 24 hours or more before scheduled pickup time for a 100% refund of base fare, driver fee, and deposits.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center font-bold text-xs">
            6-24h
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">80% Refund</h3>
          <p className="text-xs text-slate-500">
            Cancel between 6 and 24 hours prior to pickup. A nominal 20% holding fee applies. Full security deposit refunded.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 flex items-center justify-center font-bold text-xs">
            Flight
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Free Reschedule</h3>
          <p className="text-xs text-slate-500">
            Airport delivery booked? If your flight is delayed or cancelled by the airline, provide your PNR for a free trip reschedule.
          </p>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Refund Processing Rails</h2>
        <p>
          All refunds are initiated instantaneously via the Razorpay Refund API. UPI refunds (Google Pay, PhonePe, Paytm, BHIM) settle in your bank account within <strong>2 to 15 minutes</strong>. Credit and debit card refunds reflect according to your issuing bank&apos;s cycle (typically 2-4 business days).
        </p>
      </div>
    </div>
  );
}
