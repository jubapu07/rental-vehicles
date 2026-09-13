"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Car, Bike, Truck, ArrowRight } from "lucide-react";

interface UniversalSearchRibbonProps {
  initialCategory?: string;
  initialCity?: string;
  initialStart?: string;
  initialEnd?: string;
  onSearchSubmit?: (params: { category: string; city: string; start: string; end: string }) => void;
  compact?: boolean;
}

export default function UniversalSearchRibbon({
  initialCategory = "ALL",
  initialCity = "",
  initialStart = "",
  initialEnd = "",
  onSearchSubmit,
  compact = false,
}: UniversalSearchRibbonProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [city, setCity] = useState<string>(initialCity);
  const [startDate, setStartDate] = useState<string>(initialStart);
  const [endDate, setEndDate] = useState<string>(initialEnd);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Popular mobility hubs
  const popularHubs = [
    { city: "Austin", state: "TX", icon: "🎸" },
    { city: "Miami", state: "FL", icon: "🌴" },
    { city: "Los Angeles", state: "CA", icon: "🎬" },
    { city: "Denver", state: "CO", icon: "🏔️" },
    { city: "Seattle", state: "WA", icon: "🌲" },
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "ALL") params.set("category", selectedCategory);
    if (city.trim()) params.set("city", city.trim());
    if (startDate) params.set("start", startDate);
    if (endDate) params.set("end", endDate);

    if (onSearchSubmit) {
      onSearchSubmit({ category: selectedCategory, city, start: startDate, end: endDate });
    } else {
      router.push(`/explore?${params.toString()}`);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={`w-full ${compact ? "" : "max-w-5xl mx-auto"}`}>
      {/* Category Pill Switcher */}
      {!compact && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
              selectedCategory === "ALL"
                ? "bg-[#0F2432] text-white ring-2 ring-[#0F2432]/20 scale-105"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            All Categories
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("CAR")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
              selectedCategory === "CAR"
                ? "bg-[#0F2432] text-white ring-2 ring-[#E05A36]/50 scale-105"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Car className={`w-3.5 h-3.5 ${selectedCategory === "CAR" ? "text-[#E05A36]" : "text-slate-400"}`} />
            Performance Cars
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("MOTORCYCLE")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
              selectedCategory === "MOTORCYCLE"
                ? "bg-[#0F2432] text-white ring-2 ring-[#E67E22]/50 scale-105"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Bike className={`w-3.5 h-3.5 ${selectedCategory === "MOTORCYCLE" ? "text-[#E67E22]" : "text-slate-400"}`} />
            Motorcycles
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("TRUCK")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
              selectedCategory === "TRUCK"
                ? "bg-[#0F2432] text-white ring-2 ring-emerald-500/50 scale-105"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Truck className={`w-3.5 h-3.5 ${selectedCategory === "TRUCK" ? "text-emerald-400" : "text-slate-400"}`} />
            Trucks & Haulers
          </button>
        </div>
      )}

      {/* Floating Capsule Search Box */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl md:rounded-full p-2.5 shadow-xl border border-slate-200/90 flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-slate-200"
      >
        {/* 1. Location Autocomplete */}
        <div className="relative w-full md:w-4/12 px-4 py-2 group">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
            Where
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#E05A36] shrink-0" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onFocus={() => setShowCityDropdown(true)}
              placeholder="City or Hub (e.g. Austin, Miami)"
              className="w-full text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
            />
            {city && (
              <button
                type="button"
                onClick={() => setCity("")}
                className="text-xs text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Autocomplete dropdown */}
          {showCityDropdown && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowCityDropdown(false)}
              />
              <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                  Popular Mobility Hubs
                </div>
                <div className="space-y-1">
                  {popularHubs.map((hub) => (
                    <button
                      key={hub.city}
                      type="button"
                      onClick={() => {
                        setCity(hub.city);
                        setShowCityDropdown(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{hub.icon}</span>
                        <div>
                          <p className="font-bold text-slate-900">{hub.city}</p>
                          <p className="text-[10px] text-slate-400">{hub.state}, United States</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">Active Hub</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* 2. Check-In Date */}
        <div className="w-full md:w-3/12 px-4 py-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
            Trip Starts
          </label>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="date"
              min={today}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full text-xs font-semibold text-slate-900 focus:outline-hidden bg-transparent"
            />
          </div>
        </div>

        {/* 3. Check-Out Date */}
        <div className="w-full md:w-3/12 px-4 py-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
            Trip Ends
          </label>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="date"
              min={startDate || today}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full text-xs font-semibold text-slate-900 focus:outline-hidden bg-transparent"
            />
          </div>
        </div>

        {/* 4. Action Button */}
        <div className="w-full md:w-2/12 p-1.5 flex justify-end">
          <button
            type="submit"
            className="w-full h-12 md:h-12 rounded-xl md:rounded-full bg-[#E05A36] hover:bg-[#C94C2B] text-white flex items-center justify-center gap-2 font-bold text-xs shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search Fleet</span>
            <ArrowRight className="w-3.5 h-3.5 hidden lg:inline" />
          </button>
        </div>
      </form>
    </div>
  );
}
