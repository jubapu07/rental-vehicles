"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Car,
  Zap,
  Star,
  Fuel,
  Gauge,
  Users,
  Heart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { INDIAN_VEHICLES } from "@/lib/indianVehicles";
import { VehicleCategory, VehicleData } from "@/lib/types";
import { formatINR } from "@/lib/i18n";
import { useSavedCars } from "@/context/SavedCarsContext";

export default function PopularCarsTabs() {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const { isSaved, toggleSave } = useSavedCars();

  const tabs = [
    { id: "ALL", label: "All Popular" },
    { id: "SUV", label: "SUVs & 4x4", icon: Car },
    { id: "SEDAN", label: "Sedans" },
    { id: "COMPACT_SUV", label: "Compact SUVs" },
    { id: "MPV", label: "7-Seater MPVs" },
    { id: "ELECTRIC", label: "Electric (EV)", icon: Zap, isEv: true },
    { id: "HATCHBACK", label: "City Hatchbacks" },
  ];

  const filteredVehicles =
    activeTab === "ALL"
      ? INDIAN_VEHICLES.slice(0, 8)
      : INDIAN_VEHICLES.filter((v) => v.category === activeTab);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#118AB2]">
            Verified Pan-India Fleet
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit'] mt-1">
            Curated for Indian Terrains
          </h2>
          <p className="text-xs sm:text-sm text-[#676C8F] dark:text-[#A5ABC9] mt-1">
            Gliding over city traffic, monsoon potholes, or winding mountain hairpins.
          </p>
        </div>

        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#118AB2] hover:text-[#0D6E8E] transition-colors group"
        >
          <span>Explore All 25+ Machines</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                isActive
                  ? tab.isEv
                    ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/20"
                    : "bg-[#464B71] text-[#F2F2ED] shadow-md dark:bg-[#118AB2]"
                  : "bg-white/80 dark:bg-[#272B44] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60] hover:bg-white dark:hover:bg-[#373D60]"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5 text-[#7CD5C7]" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVehicles.map((car) => {
          const saved = isSaved(car.id);
          const isEv = car.category === "ELECTRIC";

          return (
            <div
              key={car.id}
              className="group flex flex-col rounded-3xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#464B71]">
                <img
                  src={car.images[0]?.url || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"}
                  alt={car.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${
                      isEv
                        ? "bg-emerald-700/90 text-white"
                        : "bg-[#464B71]/85 text-[#F2F2ED]"
                    }`}
                  >
                    {isEv ? "Pure EV" : car.category.replace("_", " ")}
                  </span>

                  {/* Heart / Wishlist Button */}
                  <button
                    onClick={() => toggleSave(car.id)}
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all"
                    title={saved ? "Remove from saved" : "Save car"}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${saved ? "text-[#118AB2] fill-current" : ""}`} />
                  </button>
                </div>

                {/* FASTag Active Pill */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#464B71]/90 backdrop-blur-md text-[#7CD5C7] text-[10px] font-bold border border-[#7CD5C7]/30">
                  <ShieldCheck className="w-3 h-3 text-[#7CD5C7]" />
                  <span>FASTag Active</span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Rating & City */}
                  <div className="flex items-center justify-between text-xs text-[#676C8F] mb-1">
                    <span className="font-semibold text-[#464B71] dark:text-[#A5ABC9]">
                      {car.city}
                    </span>
                    <div className="flex items-center gap-1 text-[#7CD5C7] font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-[#464B71] dark:text-[#F2F2ED]">{car.avgRating}</span>
                      <span className="text-[#676C8F] text-[11px]">({car.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-[#464B71] dark:text-[#F2F2ED] line-clamp-1 group-hover:text-[#118AB2] transition-colors">
                    {car.title}
                  </h3>
                  <p className="text-[11px] text-[#676C8F] line-clamp-1 mt-0.5">
                    {car.variant || car.model}
                  </p>

                  {/* Key Indian Specs Grid */}
                  <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-[#DFDFD5] dark:border-[#373D60] text-[11px] text-[#676C8F] dark:text-[#A5ABC9]">
                    <div className="flex items-center gap-1">
                      <Fuel className="w-3 h-3 text-[#118AB2]" />
                      <span>{car.specs.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-[#7CD5C7]" />
                      <span>{car.specs.transmission === "AUTOMATIC" ? "Auto" : "Manual"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#464B71] dark:text-[#F2F2ED]" />
                      <span>{car.specs.seats} Seats</span>
                    </div>
                  </div>

                  {/* Mileage / Range & Ground Clearance */}
                  <div className="flex items-center justify-between text-[11px] text-[#676C8F] dark:text-[#A5ABC9] mt-2 bg-[#F2F2ED]/60 dark:bg-[#464B71]/60 px-2.5 py-1 rounded-lg border border-[#DFDFD5]/60 dark:border-[#373D60]">
                    <span>
                      {isEv
                        ? `⚡ ${car.specs.rangeKm} km Range`
                        : `⛽ ${car.specs.mileageKmpl} km/l ARAI`}
                    </span>
                    <span>{car.specs.groundClearanceMm} mm Clearance</span>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-3 border-t border-[#DFDFD5] dark:border-[#373D60] flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-extrabold text-[#118AB2] font-['Outfit'] num-tabular">
                        {formatINR(car.dayRate)}
                      </span>
                      <span className="text-xs text-[#676C8F]">/day</span>
                    </div>
                    <p className="text-[10px] text-[#676C8F]">
                      ₹{car.perHourRate}/hr • 250 km free
                    </p>
                  </div>

                  <Link
                    href={`/vehicles/${car.slug}`}
                    className="px-4 py-2 rounded-xl bg-[#464B71] hover:bg-[#118AB2] dark:bg-[#118AB2] dark:hover:bg-[#0D6E8E] text-[#F2F2ED] text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
