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

      <div className="relative w-full max-w-lg bg-white dark:bg-[#272B44] rounded-3xl shadow-2xl border border-[#DFDFD5] dark:border-[#373D60] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#464B71] via-[#34395A] to-[#118AB2] text-white p-6 pb-7">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#118AB2] flex items-center justify-center text-white shadow-lg shadow-[#118AB2]/30">
              <Bell className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7CD5C7]">
                Live Price Intelligence
              </span>
              <h3 className="text-xl font-black text-[#F2F2ED] font-['Outfit']">Car Rental Price Tracker</h3>
            </div>
          </div>
          <p className="text-xs text-[#DFDFD5] mt-2 font-normal">
            Never overpay. We track rental car prices across certified Indian hosts 24/7 and alert you the second rates drop.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 bg-[#F2F2ED]/20 dark:bg-[#464B71]/30">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-900/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-[#464B71] dark:text-[#F2F2ED]">Price Alert Activated!</h4>
                <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9] max-w-sm mx-auto">
                  We are now monitoring <strong>{vehicleClass}</strong> rentals in <strong>{city}</strong>.
                  We will email <strong>{email}</strong> the instant rates fall below <strong>₹{parseInt(targetPrice, 10).toLocaleString("en-IN")}/day</strong>.
                </p>
              </div>

              <div className="bg-[#F2F2ED] dark:bg-[#464B71] border border-[#DFDFD5] dark:border-[#373D60] rounded-2xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between text-[#676C8F] dark:text-[#A5ABC9]">
                  <span>Location:</span>
                  <strong className="text-[#464B71] dark:text-[#F2F2ED]">{city}</strong>
                </div>
                <div className="flex justify-between text-[#676C8F] dark:text-[#A5ABC9]">
                  <span>Monitored Category:</span>
                  <strong className="text-[#464B71] dark:text-[#F2F2ED]">{vehicleClass}</strong>
                </div>
                <div className="flex justify-between text-[#676C8F] dark:text-[#A5ABC9]">
                  <span>Target Rate:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">₹{parseInt(targetPrice, 10).toLocaleString("en-IN")}/day or lower</strong>
                </div>
                <div className="flex justify-between text-[#676C8F] dark:text-[#A5ABC9]">
                  <span>Tracking Frequency:</span>
                  <strong className="text-[#464B71] dark:text-[#F2F2ED]">Every 15 minutes</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-[#464B71] dark:bg-[#118AB2] text-white text-xs font-bold hover:bg-[#118AB2] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Trend Preview Pill */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#7CD5C7]/15 border border-[#7CD5C7]/30 text-xs text-[#464B71] dark:text-[#F2F2ED]">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-[#118AB2] shrink-0" />
                  <span className="font-semibold">
                    Current Bengaluru Avg: <strong>₹2,899/day</strong> (Down 14% this week)
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold bg-[#7CD5C7]/30 px-2 py-0.5 rounded text-[#118AB2] dark:text-[#7CD5C7]">
                  Good Time to Track
                </span>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                  Destination / Rental City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bengaluru, KA or Goa"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#464B71] text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] focus:outline-hidden focus:ring-2 focus:ring-[#118AB2]"
                />
              </div>

              {/* Vehicle Class & Target Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                    Vehicle Class
                  </label>
                  <select
                    value={vehicleClass}
                    onChange={(e) => setVehicleClass(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] bg-white dark:bg-[#464B71] focus:outline-hidden focus:ring-2 focus:ring-[#118AB2]"
                  >
                    <option value="SUVs & 4x4s">SUVs & 4x4s (Thar, Scorpio-N, Fortuner)</option>
                    <option value="Hatchbacks & Sedans">Hatchbacks & Sedans (Swift, i20, Slavia)</option>
                    <option value="EVs">Electric Fleet (Nexon EV Max)</option>
                    <option value="All Fleet">Any Mobility Class</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                    Target Max Rate (₹/day)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#676C8F] font-bold text-xs">
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
                      className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#464B71] text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] focus:outline-hidden focus:ring-2 focus:ring-[#118AB2]"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                  Alert Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#464B71] text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] focus:outline-hidden focus:ring-2 focus:ring-[#118AB2]"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#676C8F] dark:text-[#8D93B4] pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero spam guarantee. 1-click unsubscribe anytime.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#118AB2] hover:bg-[#0D6E8E] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#118AB2]/30 transition-all cursor-pointer"
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
