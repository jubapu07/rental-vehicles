"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Zap, RotateCcw, Car, Bike, Truck } from "lucide-react";

interface VehicleFilterSidebarProps {
  facets?: {
    total: number;
    cars: number;
    motorcycles: number;
    trucks: number;
  };
}

export default function VehicleFilterSidebar({ facets }: VehicleFilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Read current URL parameters
  const currentCategory = searchParams.get("category") || "ALL";
  const currentMaxPrice = searchParams.get("maxPrice") || "10000";
  const currentInstantOnly = searchParams.get("instantOnly") === "true";
  const currentTransmission = searchParams.get("transmission") || "ALL";
  const currentFuelType = searchParams.get("fuelType") || "ALL";
  const currentMinCc = searchParams.get("minCc") || "0";
  const currentBikeType = searchParams.get("bikeType") || "ALL";
  const currentMinPayload = searchParams.get("minPayload") || "0";
  const currentSeats = searchParams.get("seats") || "ALL";
  const currentAgency = searchParams.get("agency") || "ALL";
  const currentSuvsOnly = searchParams.get("suvsOnly") === "true";

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "ALL" || value === "0") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.push(`/explore?${params.toString()}`);
    });
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams();
    // Keep dates and city if present
    if (searchParams.get("city")) params.set("city", searchParams.get("city")!);
    if (searchParams.get("start")) params.set("start", searchParams.get("start")!);
    if (searchParams.get("end")) params.set("end", searchParams.get("end")!);

    startTransition(() => {
      router.push(`/explore?${params.toString()}`);
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-7">
      {/* Header & Reset */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-slate-100 text-[#0F2432]">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">Fleet Filters</h3>
            <p className="text-[11px] text-slate-500 font-medium">Refine your vehicle search</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetFilters}
          className="flex items-center gap-1 text-[11px] font-bold text-[#E05A36] hover:text-[#C94C2B] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* 1. Category Switcher */}
      <div>
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
          Mobility Category
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => updateParam("category", "ALL")}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              currentCategory === "ALL"
                ? "bg-[#0F2432] text-white shadow-xs"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <span>All Fleet</span>
            {facets && <span className="text-[10px] opacity-75">({facets.total})</span>}
          </button>

          <button
            type="button"
            onClick={() => updateParam("category", "CAR")}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              currentCategory === "CAR"
                ? "bg-[#0F2432] text-white shadow-xs ring-2 ring-[#E05A36]/40"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-[#E05A36]" />
              <span>Cars</span>
            </div>
            {facets && <span className="text-[10px] opacity-75">({facets.cars})</span>}
          </button>

          <button
            type="button"
            onClick={() => updateParam("category", "MOTORCYCLE")}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              currentCategory === "MOTORCYCLE"
                ? "bg-[#0F2432] text-white shadow-xs ring-2 ring-[#E67E22]/40"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-[#E67E22]" />
              <span>Bikes</span>
            </div>
            {facets && <span className="text-[10px] opacity-75">({facets.motorcycles})</span>}
          </button>

          <button
            type="button"
            onClick={() => updateParam("category", "TRUCK")}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
              currentCategory === "TRUCK"
                ? "bg-[#0F2432] text-white shadow-xs ring-2 ring-emerald-500/40"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Trucks</span>
            </div>
            {facets && <span className="text-[10px] opacity-75">({facets.trucks})</span>}
          </button>
        </div>
      </div>

      {/* 2. Instant Book Toggle */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#E05A36] fill-[#E05A36]" />
          <div>
            <p className="text-xs font-bold text-slate-900">Instant Book Only</p>
            <p className="text-[10px] text-slate-500">No waiting for host approval</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={currentInstantOnly}
          onChange={(e) => updateParam("instantOnly", e.target.checked ? "true" : null)}
          className="w-4 h-4 accent-[#E05A36] rounded cursor-pointer"
        />
      </div>

      {/* 2b. SUVs Only Toggle (Matching Screenshot Feature) */}
      <div>
        <button
          type="button"
          onClick={() => {
            if (currentSuvsOnly) {
              updateParam("suvsOnly", null);
              updateParam("bodyType", null);
            } else {
              updateParam("suvsOnly", "true");
              updateParam("bodyType", "SUV");
            }
          }}
          className={`w-full py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
            currentSuvsOnly
              ? "bg-[#FF5B26] text-white border-[#FF5B26] shadow-sm"
              : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            <span>SUVs & 4x4s Only</span>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              currentSuvsOnly ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
            }`}
          >
            {currentSuvsOnly ? "Active" : "Filter"}
          </span>
        </button>
      </div>

      {/* 2c. Rental Agency Filter (Hertz, Avis, Enterprise, etc.) */}
      <div>
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
          Rental Agency
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {["ALL", "Hertz", "Avis", "Enterprise", "National", "Budget", "ACE", "Dollar"].map((ag) => (
            <button
              key={ag}
              type="button"
              onClick={() => updateParam("agency", ag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all text-left truncate cursor-pointer ${
                currentAgency === ag
                  ? "bg-[#0F2432] text-white shadow-xs"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {ag === "ALL" ? "All Agencies" : ag}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Daily Rate Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Max Daily Rate
          </label>
          <span className="text-sm font-extrabold text-[#0F2432] num-tabular">
            ₹{parseInt(currentMaxPrice || "10000", 10).toLocaleString("en-IN")}/day
          </span>
        </div>
        <input
          type="range"
          min="800"
          max="10000"
          step="200"
          value={currentMaxPrice}
          onChange={(e) => updateParam("maxPrice", e.target.value)}
          className="w-full accent-[#E05A36] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹800/day</span>
          <span>₹10,000+/day</span>
        </div>
      </div>

      {/* 4. Category-Specific Dynamic Filters */}
      {/* 4A. MOTORCYCLE FACETS */}
      {currentCategory === "MOTORCYCLE" && (
        <div className="space-y-5 border-t border-slate-100 pt-5 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Min Engine CC
              </label>
              <span className="text-xs font-bold text-[#E67E22]">
                {currentMinCc === "0" ? "Any CC" : `${currentMinCc}cc+`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1800"
              step="100"
              value={currentMinCc}
              onChange={(e) => updateParam("minCc", e.target.value)}
              className="w-full accent-[#E67E22] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Any</span>
              <span>800cc</span>
              <span>1800cc</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Bike Class
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {["ALL", "ADVENTURE", "SPORT", "CRUISER", "NAKED"].map((bType) => (
                <button
                  key={bType}
                  type="button"
                  onClick={() => updateParam("bikeType", bType)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-left transition-all ${
                    currentBikeType === bType
                      ? "bg-[#0F2432] text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {bType === "ALL" ? "All Classes" : bType.charAt(0) + bType.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4B. TRUCK FACETS */}
      {currentCategory === "TRUCK" && (
        <div className="space-y-5 border-t border-slate-100 pt-5 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Min Payload Capacity
              </label>
              <span className="text-xs font-bold text-emerald-700">
                {currentMinPayload === "0" ? "Any Payload" : `${currentMinPayload}kg+`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1500"
              step="100"
              value={currentMinPayload}
              onChange={(e) => updateParam("minPayload", e.target.value)}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Any</span>
              <span>750kg</span>
              <span>1500kg</span>
            </div>
          </div>
        </div>
      )}

      {/* 4C. CAR FACETS */}
      {currentCategory === "CAR" && (
        <div className="space-y-5 border-t border-slate-100 pt-5 animate-in fade-in duration-200">
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Seating Capacity
            </label>
            <div className="flex gap-2">
              {["ALL", "2", "4", "5"].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => updateParam("seats", num)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentSeats === num
                      ? "bg-[#0F2432] text-white"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {num === "ALL" ? "Any" : `${num}+`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Common Specs: Transmission & Fuel */}
      <div className="border-t border-slate-100 pt-5 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            Transmission
          </label>
          <div className="flex gap-2">
            {[
              { id: "ALL", label: "All" },
              { id: "AUTOMATIC", label: "Automatic" },
              { id: "MANUAL", label: "Manual" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => updateParam("transmission", t.id)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentTransmission === t.id
                    ? "bg-[#0F2432] text-white"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            Power / Fuel Type
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "ALL", label: "All Types" },
              { id: "EV", label: "⚡ 100% Electric" },
              { id: "PETROL", label: "⛽ High Octane" },
              { id: "HYBRID", label: "🌿 Hybrid" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => updateParam("fuelType", f.id)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-left transition-all ${
                  currentFuelType === f.id
                    ? "bg-[#0F2432] text-white"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
