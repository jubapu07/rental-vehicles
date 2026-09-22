"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  ChevronDown,
  ArrowRightLeft,
  X,
  Plane,
  Sparkles,
  Search,
} from "lucide-react";

interface HeroCarHireWidgetProps {
  onSearchChange?: (city: string) => void;
}

export default function HeroCarHireWidget({ onSearchChange }: HeroCarHireWidgetProps) {
  const router = useRouter();

  // State
  const [city, setCity] = useState("Santa Rosa, CA, United States");
  const [dropoffCity, setDropoffCity] = useState("");
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [showDropoffMenu, setShowDropoffMenu] = useState(false);

  const [driverAge, setDriverAge] = useState("25-65");
  const [customAge, setCustomAge] = useState("30");
  const [showAgeMenu, setShowAgeMenu] = useState(false);

  // Dynamic Dates formatted as in screenshot: "Fri 25/9", "Sun 27/9"
  const [startDate, setStartDate] = useState("2026-09-25");
  const [endDate, setEndDate] = useState("2026-09-27");
  const [pickupTime, setPickupTime] = useState("Noon");
  const [dropoffTime, setDropoffTime] = useState("Noon");

  const [suvsOnly, setSuvsOnly] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);

  // Quick Location Suggestions
  const locations = [
    { name: "Santa Rosa, CA, United States", code: "STS", hub: "Sonoma County Airport" },
    { name: "San Francisco, CA, United States", code: "SFO", hub: "Intl Airport & Downtown" },
    { name: "Los Angeles, CA, United States", code: "LAX", hub: "LAX Gateway" },
    { name: "Sacramento, CA, United States", code: "SMF", hub: "Capital Hub" },
    { name: "Bengaluru, KA, India", code: "BLR", hub: "Kempegowda Intl" },
    { name: "Mumbai, MH, India", code: "BOM", hub: "Chhatrapati Shivaji" },
    { name: "Goa, GA, India", code: "GOI", hub: "Dabolim & Mopa" },
    { name: "New Delhi, DL, India", code: "DEL", hub: "Indira Gandhi Intl" },
  ];

  const timeOptions = [
    "Midnight",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "Noon",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  // Helper to format date string to "Fri 25/9" format
  const formatDisplayDate = (dateStr: string) => {
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
        return `${dayName} ${parseInt(parts[2])}/${parseInt(parts[1])}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  // Derive city short title for heading
  const currentCityTitle = city.split(",")[0].trim() || "Santa Rosa";

  const handleCitySelect = (selected: string) => {
    setCity(selected);
    setShowCityDropdown(false);
    if (onSearchChange) onSearchChange(selected.split(",")[0].trim());
  };

  const handleSwapLocations = () => {
    const temp = city;
    setCity(dropoffCity);
    setDropoffCity(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    const cleanCity = city.split(",")[0].trim();
    if (cleanCity) params.set("city", cleanCity);

    if (differentDropoff && dropoffCity.trim()) {
      params.set("dropoffCity", dropoffCity.split(",")[0].trim());
    }

    if (startDate) params.set("start", startDate);
    if (endDate) params.set("end", endDate);
    if (pickupTime) params.set("pickupTime", pickupTime);
    if (dropoffTime) params.set("dropoffTime", dropoffTime);
    if (driverAge) params.set("driverAge", driverAge === "custom" ? customAge : driverAge);

    if (suvsOnly) {
      params.set("suvsOnly", "true");
      params.set("bodyType", "SUV");
    }

    router.push(`/explore?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Dynamic Headline matching screenshot: "...nta Rosa car hire" */}
      <div className="text-left mb-4 sm:mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md flex items-center gap-2">
          <span>{currentCityTitle} car hire</span>
        </h1>
      </div>

      {/* Main White Card Container */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200/90 text-slate-900 relative">
        {/* Top Controls Bar: Drop-off dropdown & Driver's age dropdown */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 text-xs font-bold text-slate-700">
          {/* 1. Drop-off Toggle Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowDropoffMenu(!showDropoffMenu);
                setShowAgeMenu(false);
              }}
              className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span>{differentDropoff ? "Different drop-off" : "Same drop-off"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showDropoffMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowDropoffMenu(false)}
                />
                <div className="absolute left-0 top-full mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setDifferentDropoff(false);
                      setShowDropoffMenu(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-100 flex items-center justify-between cursor-pointer ${
                      !differentDropoff ? "text-[#E05A36] font-bold bg-slate-50" : "text-slate-800"
                    }`}
                  >
                    <span>Same drop-off</span>
                    {!differentDropoff && <span className="w-1.5 h-1.5 rounded-full bg-[#E05A36]"></span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDifferentDropoff(true);
                      setShowDropoffMenu(false);
                      if (!dropoffCity) setDropoffCity("San Francisco, CA, United States");
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-slate-100 flex items-center justify-between cursor-pointer ${
                      differentDropoff ? "text-[#E05A36] font-bold bg-slate-50" : "text-slate-800"
                    }`}
                  >
                    <span>Different drop-off</span>
                    {differentDropoff && <span className="w-1.5 h-1.5 rounded-full bg-[#E05A36]"></span>}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* 2. Driver's Age Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowAgeMenu(!showAgeMenu);
                setShowDropoffMenu(false);
              }}
              className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span>Driver&apos;s age:</span>
              <span className="font-extrabold text-slate-900">
                {driverAge === "custom" ? customAge : driverAge}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showAgeMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowAgeMenu(false)}
                />
                <div className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-30 animate-in fade-in duration-150 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Select Driver Age Range
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setDriverAge("25-65");
                      setShowAgeMenu(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs font-semibold hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                      driverAge === "25-65" ? "bg-slate-100 text-slate-900 font-bold" : "text-slate-700"
                    }`}
                  >
                    <div>
                      <p>Age 25 - 65</p>
                      <p className="text-[10px] text-slate-400 font-normal">Standard rates, no surcharges</p>
                    </div>
                    {driverAge === "25-65" && <span className="w-2 h-2 rounded-full bg-[#E05A36]"></span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDriverAge("18-24");
                      setShowAgeMenu(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs font-semibold hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                      driverAge === "18-24" ? "bg-slate-100 text-slate-900 font-bold" : "text-slate-700"
                    }`}
                  >
                    <div>
                      <p>Age 18 - 24 (Young Driver)</p>
                      <p className="text-[10px] text-slate-400 font-normal">Young renter policy applies</p>
                    </div>
                    {driverAge === "18-24" && <span className="w-2 h-2 rounded-full bg-[#E05A36]"></span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDriverAge("65+");
                      setShowAgeMenu(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs font-semibold hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                      driverAge === "65+" ? "bg-slate-100 text-slate-900 font-bold" : "text-slate-700"
                    }`}
                  >
                    <div>
                      <p>Age 65+</p>
                      <p className="text-[10px] text-slate-400 font-normal">Senior driver options</p>
                    </div>
                    {driverAge === "65+" && <span className="w-2 h-2 rounded-full bg-[#E05A36]"></span>}
                  </button>

                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Or enter custom age:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="18"
                        max="99"
                        value={customAge}
                        onChange={(e) => setCustomAge(e.target.value)}
                        className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-[#E05A36]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setDriverAge("custom");
                          setShowAgeMenu(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#0F2432] text-white text-xs font-bold hover:bg-[#E05A36] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Unified Search Bar Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch gap-2 bg-slate-100/90 p-2 rounded-2xl md:rounded-2xl border border-slate-200">
            {/* Pick-up Location Field */}
            <div className="relative flex-1 bg-white rounded-xl px-3.5 py-2.5 border border-slate-200 shadow-2xs group flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 group-hover:text-[#E05A36] shrink-0 transition-colors" />
              <div className="grow min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Pick-up Location
                </span>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (onSearchChange) onSearchChange(e.target.value.split(",")[0].trim());
                  }}
                  onFocus={() => setShowCityDropdown(true)}
                  placeholder="City, airport, or address"
                  required
                  className="w-full text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-hidden bg-transparent truncate"
                />
              </div>

              {city && (
                <button
                  type="button"
                  onClick={() => setCity("")}
                  className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title="Clear location"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Autocomplete Dropdown */}
              {showCityDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowCityDropdown(false)}
                  />
                  <div className="absolute left-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-40 animate-in fade-in duration-150">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                      Popular Rental Locations
                    </div>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {locations.map((loc) => (
                        <button
                          key={loc.code}
                          type="button"
                          onClick={() => handleCitySelect(loc.name)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-800 cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                              <Plane className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{loc.name}</p>
                              <p className="text-[10px] text-slate-400">{loc.hub}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-black font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                            {loc.code}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Drop-off Location Field (Conditional if different drop-off) */}
            {differentDropoff && (
              <div className="relative flex-1 bg-white rounded-xl px-3.5 py-2.5 border border-slate-200 shadow-2xs group flex items-center gap-2 animate-in slide-in-from-left-2 duration-150">
                <MapPin className="w-4 h-4 text-[#E05A36] shrink-0" />
                <div className="grow min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Drop-off Location
                  </span>
                  <input
                    type="text"
                    value={dropoffCity}
                    onChange={(e) => setDropoffCity(e.target.value)}
                    onFocus={() => setShowDropoffDropdown(true)}
                    placeholder="Enter return city or airport"
                    className="w-full text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-hidden bg-transparent truncate"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSwapLocations}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                  title="Swap pick-up & drop-off"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                </button>

                {showDropoffDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setShowDropoffDropdown(false)}
                    />
                    <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-40 animate-in fade-in duration-150">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                        Drop-off Hubs
                      </div>
                      <div className="space-y-1 max-h-60 overflow-y-auto">
                        {locations.map((loc) => (
                          <button
                            key={loc.code}
                            type="button"
                            onClick={() => {
                              setDropoffCity(loc.name);
                              setShowDropoffDropdown(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-800 cursor-pointer"
                          >
                            <span>{loc.name}</span>
                            <span className="text-[10px] font-mono text-slate-400">{loc.code}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Pick-up Date & Time block */}
            <div className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 border border-slate-200 shadow-2xs shrink-0">
              <div className="relative">
                <div className="flex items-center gap-1.5 cursor-pointer">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
                    {formatDisplayDate(startDate)}
                  </span>
                </div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                />
              </div>

              <span className="text-slate-300">|</span>

              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Drop-off Date & Time block */}
            <div className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 border border-slate-200 shadow-2xs shrink-0">
              <div className="relative">
                <div className="flex items-center gap-1.5 cursor-pointer">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
                    {formatDisplayDate(endDate)}
                  </span>
                </div>
                <input
                  type="date"
                  min={startDate}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                />
              </div>

              <span className="text-slate-300">|</span>

              <select
                value={dropoffTime}
                onChange={(e) => setDropoffTime(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Bright Orange Search Button */}
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-[#FF5B26] hover:bg-[#E54816] text-white font-black text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer shrink-0 flex items-center justify-center gap-2"
            >
              <span>Search</span>
            </button>
          </div>

          {/* Bottom Bar: Checkbox for SUVs only (exact match to screenshot) */}
          <div className="flex items-center justify-end px-1 pt-1">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={suvsOnly}
                onChange={(e) => setSuvsOnly(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#FF5B26] focus:ring-[#FF5B26] cursor-pointer"
              />
              <span className="group-hover:text-slate-900 transition-colors">
                SUVs only
              </span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
