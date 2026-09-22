"use client";

import { useState } from "react";
import { X, Bell, TrendingDown, CheckCircle2, Shield, ArrowRight } from "lucide-react";

interface PriceTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCity?: string;
}

export default function PriceTrackingModal({
  isOpen,
  onClose,
  defaultCity = "Bengaluru, KA",
}: PriceTrackingModalProps) {
  const [city, setCity] = useState(defaultCity);
  const [vehicleClass, setVehicleClass] = useState("SUV");
  const [email, setEmail] = useState("");
  const [targetPrice, setTargetPrice] = useState("2499");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-900 via-[#0F2432] to-[#1E3A8A] text-white p-6 pb-7">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E05A36] flex items-center justify-center text-white shadow-lg shadow-[#E05A36]/30">
              <Bell className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Live Price Intelligence
              </span>
              <h3 className="text-xl font-black text-white">Car Rental Price Tracker</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-2 font-normal">
            Never overpay. We track rental car prices across Zoomcar, Revv, Avis, Hertz, and top verified Indian hosts 24/7 and alert you the second rates drop.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900">Price Alert Activated!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  We are now monitoring <strong>{vehicleClass}</strong> rentals in <strong>{city}</strong>.
                  We will email <strong>{email}</strong> the instant rates fall below <strong>₹{parseInt(targetPrice, 10).toLocaleString("en-IN")}/day</strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Location:</span>
                  <strong className="text-slate-900">{city}</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Monitored Category:</span>
                  <strong className="text-slate-900">{vehicleClass}</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Target Rate:</span>
                  <strong className="text-emerald-600 font-bold">₹{parseInt(targetPrice, 10).toLocaleString("en-IN")}/day or lower</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tracking Frequency:</span>
                  <strong className="text-slate-900">Every 15 minutes</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-[#0F2432] text-white text-xs font-bold hover:bg-[#E05A36] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Trend Preview Pill */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">
                    Current Bengaluru Avg: <strong>₹2,899/day</strong> (Down 14% this week)
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold bg-emerald-200/80 px-2 py-0.5 rounded text-emerald-800">
                  Good Time to Track
                </span>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Destination / Rental City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bengaluru, KA or Goa"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E05A36]"
                />
              </div>

              {/* Vehicle Class & Target Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Vehicle Class
                  </label>
                  <select
                    value={vehicleClass}
                    onChange={(e) => setVehicleClass(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#E05A36]"
                  >
                    <option value="SUVs & 4x4s">SUVs & 4x4s (Thar, Scorpio-N, Fortuner)</option>
                    <option value="Hatchbacks & Sedans">Hatchbacks & Sedans (Swift, i20, Slavia)</option>
                    <option value="Motorcycles">Royal Enfield & Adventure Bikes</option>
                    <option value="EVs">Electric Fleet (Nexon EV Max)</option>
                    <option value="All Fleet">Any Mobility Class</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Max Rate (₹/day)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(e.target.value)}
                      placeholder="2499"
                      min="500"
                      max="25000"
                      step="100"
                      required
                      className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E05A36]"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alert Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E05A36]"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero spam guarantee. 1-click unsubscribe anytime.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#E05A36] hover:bg-[#C94C2B] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#E05A36]/30 transition-all cursor-pointer"
              >
                <span>Activate Price Tracking Alert</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
