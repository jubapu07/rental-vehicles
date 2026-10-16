"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Car,
  UserCheck,
  Plane,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { INDIAN_CITIES } from "@/lib/indianCities";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroCarHireWidget() {
  const router = useRouter();
  const { t } = useLanguage();

  const [rentalType, setRentalType] = useState<"SELF_DRIVE" | "WITH_CHAUFFEUR">("SELF_DRIVE");
  const [city, setCity] = useState("Bengaluru");
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 86400000 * 4).toISOString().split("T")[0]
  );
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropTime, setDropTime] = useState("10:00");
  const [airportDelivery, setAirportDelivery] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      city,
      type: rentalType,
      startDate,
      endDate,
      pickupTime,
      dropTime,
      airport: airportDelivery ? "true" : "false",
    });
    router.push(`/explore?${query.toString()}`);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#464B71] via-[#272B44] to-[#141624] text-[#F2F2ED]">
      {/* Background Animated Speed Lines */}
      <div className="absolute inset-0 road-speed-lines opacity-20 pointer-events-none" />

      {/* Decorative Radial Warm Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#118AB2]/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-[#7CD5C7]/15 blur-[110px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#7CD5C7]/30 text-xs font-semibold text-[#7CD5C7]">
            <Sparkles className="w-3.5 h-3.5 text-[#7CD5C7]" />
            <span>Bharat&apos;s Next-Gen Mobility Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#7CD5C7] animate-ping" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Outfit'] leading-[1.15]">
            Freedom of the Open <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#F2F2ED] via-[#7CD5C7] to-[#118AB2] bg-clip-text text-transparent">
              Indian Highway
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#A5ABC9] max-w-2xl font-normal leading-relaxed">
            {t.searchHeroSubtitle}
          </p>
        </div>

        {/* 2. Interactive Booking Search Widget Box */}
        <div className="mt-10 max-w-5xl mx-auto">
          <div className="bg-[#FFFFFF]/95 dark:bg-[#272B44]/95 backdrop-blur-xl rounded-3xl p-4 sm:p-7 shadow-2xl border border-[#DFDFD5] dark:border-[#373D60] text-[#464B71] dark:text-[#F2F2ED]">
            
            {/* Rental Mode Tabs (Self-Drive vs Chauffeur) */}
            <div className="flex items-center justify-between flex-wrap gap-3 pb-5 border-b border-[#DFDFD5] dark:border-[#373D60]">
              <div className="flex items-center gap-1.5 bg-[#F2F2ED] dark:bg-[#464B71] p-1.5 rounded-2xl border border-[#DFDFD5] dark:border-[#373D60]">
                <button
                  type="button"
                  onClick={() => setRentalType("SELF_DRIVE")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    rentalType === "SELF_DRIVE"
                      ? "bg-[#118AB2] text-white shadow-md"
                      : "text-[#676C8F] dark:text-[#A5ABC9] hover:text-[#464B71] dark:hover:text-white"
                  }`}
                >
                  <Car className="w-4 h-4 text-[#7CD5C7]" />
                  <span>{t.selfDriveTab}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRentalType("WITH_CHAUFFEUR")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    rentalType === "WITH_CHAUFFEUR"
                      ? "bg-[#118AB2] text-white shadow-md"
                      : "text-[#676C8F] dark:text-[#A5ABC9] hover:text-[#464B71] dark:hover:text-white"
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-[#7CD5C7]" />
                  <span>{t.chauffeurTab}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-extrabold">
                    Uniformed
                  </span>
                </button>
              </div>

              {/* Airport / Doorstep Checkbox */}
              <label className="flex items-center gap-2 text-xs font-semibold text-[#676C8F] dark:text-[#A5ABC9] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={airportDelivery}
                  onChange={(e) => setAirportDelivery(e.target.checked)}
                  className="w-4 h-4 text-[#118AB2] rounded focus:ring-[#118AB2] border-[#DFDFD5] dark:border-[#373D60]"
                />
                <Plane className="w-3.5 h-3.5 text-[#118AB2]" />
                <span>Deliver to Airport Terminal</span>
              </label>
            </div>

            {/* Inputs Form Grid */}
            <form onSubmit={handleSearch} className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {/* City Selection */}
              <div className="lg:col-span-1 p-3 rounded-2xl bg-[#F2F2ED]/60 dark:bg-[#464B71]/60 border border-[#DFDFD5] dark:border-[#373D60] focus-within:border-[#118AB2] transition-all">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#676C8F] dark:text-[#9BA2C4] mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#118AB2]" />
                  <span>City / Hub</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#464B71] dark:text-white focus:outline-none cursor-pointer"
                >
                  {INDIAN_CITIES.map((c) => (
                    <option key={c.id} value={c.name} className="dark:bg-[#272B44] text-[#464B71] dark:text-white">
                      {c.name} ({c.state})
                    </option>
                  ))}
                </select>
              </div>

              {/* Pickup Date & Time */}
              <div className="p-3 rounded-2xl bg-[#F2F2ED]/60 dark:bg-[#464B71]/60 border border-[#DFDFD5] dark:border-[#373D60] focus-within:border-[#118AB2] transition-all">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#676C8F] dark:text-[#9BA2C4] mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#118AB2]" />
                  <span>Pickup</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#464B71] dark:text-white focus:outline-none"
                  />
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-[#464B71] dark:text-white focus:outline-none"
                  >
                    <option value="08:00" className="dark:bg-[#272B44]">08:00 AM</option>
                    <option value="10:00" className="dark:bg-[#272B44]">10:00 AM</option>
                    <option value="14:00" className="dark:bg-[#272B44]">02:00 PM</option>
                    <option value="18:00" className="dark:bg-[#272B44]">06:00 PM</option>
                    <option value="22:00" className="dark:bg-[#272B44]">10:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Drop Date & Time */}
              <div className="p-3 rounded-2xl bg-[#F2F2ED]/60 dark:bg-[#464B71]/60 border border-[#DFDFD5] dark:border-[#373D60] focus-within:border-[#118AB2] transition-all">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#676C8F] dark:text-[#9BA2C4] mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#7CD5C7]" />
                  <span>Drop-Off</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#464B71] dark:text-white focus:outline-none"
                  />
                  <select
                    value={dropTime}
                    onChange={(e) => setDropTime(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-[#464B71] dark:text-white focus:outline-none"
                  >
                    <option value="08:00" className="dark:bg-[#272B44]">08:00 AM</option>
                    <option value="10:00" className="dark:bg-[#272B44]">10:00 AM</option>
                    <option value="14:00" className="dark:bg-[#272B44]">02:00 PM</option>
                    <option value="18:00" className="dark:bg-[#272B44]">06:00 PM</option>
                    <option value="22:00" className="dark:bg-[#272B44]">10:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Fast Perks Pill */}
              <div className="hidden lg:flex flex-col justify-center px-4 py-2 rounded-2xl bg-[#F2F2ED] dark:bg-[#464B71]/80 border border-[#DFDFD5] dark:border-[#373D60] text-[11px]">
                <div className="flex items-center gap-1 text-[#118AB2] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Includes FASTag</span>
                </div>
                <span className="text-[#676C8F] dark:text-[#8D93B4] text-[10px]">
                  250 km/day free • Doorstep delivery
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#118AB2] to-[#0D6E8E] hover:brightness-110 text-white font-extrabold text-sm shadow-xl hover:shadow-orange-950/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t.searchVehicles}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* 3. Live Animated Counters */}
        <div className="mt-12 pt-8 border-t border-[#373D60] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#F2F2ED] font-['Outfit'] num-tabular">
              1,50,000+
            </p>
            <p className="text-xs text-[#8D93B4] font-medium">Safe Indian Road Trips</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#F2F2ED] font-['Outfit'] num-tabular">
              12 Cities
            </p>
            <p className="text-xs text-[#8D93B4] font-medium">Airports & Metro Hubs</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#F2F2ED] font-['Outfit'] num-tabular">
              500+ Fleet
            </p>
            <p className="text-xs text-[#8D93B4] font-medium">Thar, Fortuner, Hycross & EVs</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#7CD5C7] font-['Outfit'] num-tabular">
              4.92 ★
            </p>
            <p className="text-xs text-[#8D93B4] font-medium">Verified Customer Rating</p>
          </div>
        </div>

      </div>
    </section>
  );
}
