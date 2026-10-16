"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Car,
  Fuel,
  Gauge,
  Users,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  CheckCircle2,
  Heart,
  ArrowRight,
  Sparkles,
  Info,
  Clock,
  RotateCcw,
  Zap,
  Luggage,
} from "lucide-react";
import { INDIAN_VEHICLES } from "@/lib/indianVehicles";
import { formatINR } from "@/lib/i18n";
import { useSavedCars } from "@/context/SavedCarsContext";

export default function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // Find vehicle by slug
  const vehicle = INDIAN_VEHICLES.find((v) => v.slug === slug);
  if (!vehicle) {
    notFound();
  }

  const { isSaved, toggleSave } = useSavedCars();
  const saved = isSaved(vehicle.id);
  const isEv = vehicle.category === "ELECTRIC";

  // Gallery state
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Rental duration preview state
  const [days, setDays] = useState(3);
  const [withChauffeur, setWithChauffeur] = useState(false);

  // Calculation preview
  const baseRental = vehicle.dayRate * days;
  const chauffeurFee = withChauffeur ? 1200 * days : 0;
  const subtotal = baseRental + chauffeurFee;
  const gst = Math.round(subtotal * 0.18);
  const totalPayable = subtotal + gst + vehicle.securityDeposit;

  // Similar vehicles (same category, different model)
  const similarVehicles = INDIAN_VEHICLES.filter(
    (v) => v.category === vehicle.category && v.id !== vehicle.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* 1. Breadcrumb & Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DFDFD5] dark:border-[#373D60]">
        <div className="flex items-center gap-2 text-xs text-[#676C8F]">
          <Link href="/" className="hover:text-[#118AB2]">Home</Link>
          <span>/</span>
          <Link href="/explore" className="hover:text-[#118AB2]">Fleet</Link>
          <span>/</span>
          <Link href={`/explore?category=${vehicle.category}`} className="hover:text-[#118AB2]">
            {vehicle.category.replace("_", " ")}
          </Link>
          <span>/</span>
          <span className="text-[#464B71] dark:text-[#F2F2ED] font-semibold truncate max-w-xs">
            {vehicle.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleSave(vehicle.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              saved
                ? "bg-[#118AB2]/15 border-[#118AB2]/30 text-[#118AB2]"
                : "border-[#DFDFD5] dark:border-[#373D60] text-[#464B71] dark:text-[#F2F2ED] hover:border-[#118AB2]"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current text-[#118AB2]" : ""}`} />
            <span>{saved ? "Saved in Garage" : "Shortlist Machine"}</span>
          </button>
        </div>
      </div>

      {/* 2. Top Overview Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7CD5C7]/20 text-[#118AB2] dark:text-[#7CD5C7] border border-[#7CD5C7]/30">
            {vehicle.brand} • {vehicle.category.replace("_", " ")}
          </span>
          <div className="flex items-center gap-1 text-[#7CD5C7] text-xs font-bold">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-[#464B71] dark:text-[#F2F2ED]">{vehicle.avgRating}</span>
            <span className="text-[#676C8F] font-normal">({vehicle.reviewCount} road trip reviews)</span>
          </div>
          <span className="text-[#DFDFD5] text-xs">•</span>
          <div className="flex items-center gap-1 text-xs text-[#676C8F] dark:text-[#A5ABC9]">
            <MapPin className="w-3.5 h-3.5 text-[#118AB2]" />
            <span>{vehicle.city} Hub ({vehicle.locationAddress})</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit']">
          {vehicle.title}
        </h1>
        <p className="text-sm text-[#676C8F] dark:text-[#8D93B4] mt-1">{vehicle.variant}</p>
      </div>

      {/* 3. Main Section: Gallery & Details + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols: Gallery, Specs, Features, Security Deposit, Reviews */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Gallery Showcase */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-[#464B71] shadow-lg border border-[#DFDFD5] dark:border-[#373D60]">
              <img
                src={vehicle.images[activeImageIdx]?.url || vehicle.images[0]?.url}
                alt={vehicle.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs backdrop-blur-md bg-black/50 px-4 py-2 rounded-xl">
                <span>{vehicle.images[activeImageIdx]?.caption || "Exterior Stance"}</span>
                <span className="text-[#F2F2ED]/80">
                  {activeImageIdx + 1} of {vehicle.images.length} Photos
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {vehicle.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {vehicle.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIdx(i)}
                    className={`relative w-24 h-16 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIdx === i
                        ? "border-[#118AB2] scale-95 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.caption || ""} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Indian Highlights Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-3xl bg-white/70 dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60]">
            <div className="text-center p-3 rounded-2xl bg-[#F2F2ED] dark:bg-[#464B71] shadow-xs border border-[#DFDFD5] dark:border-[#373D60]">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-[#676C8F]">NHAI FASTag</p>
              <p className="text-xs font-extrabold text-[#464B71] dark:text-[#F2F2ED]">Pre-Loaded</p>
            </div>
            <div className="text-center p-3 rounded-2xl bg-[#F2F2ED] dark:bg-[#464B71] shadow-xs border border-[#DFDFD5] dark:border-[#373D60]">
              <Clock className="w-5 h-5 text-[#7CD5C7] mx-auto mb-1" />
              <p className="text-[11px] font-bold text-[#676C8F]">Security Deposit</p>
              <p className="text-xs font-extrabold text-[#464B71] dark:text-[#F2F2ED]">
                {formatINR(vehicle.securityDeposit)}
              </p>
            </div>
            <div className="text-center p-3 rounded-2xl bg-[#F2F2ED] dark:bg-[#464B71] shadow-xs border border-[#DFDFD5] dark:border-[#373D60]">
              <Car className="w-5 h-5 text-[#118AB2] mx-auto mb-1" />
              <p className="text-[11px] font-bold text-[#676C8F]">Free Mileage</p>
              <p className="text-xs font-extrabold text-[#464B71] dark:text-[#F2F2ED]">
                {vehicle.freeKmPerDay} km / day
              </p>
            </div>
            <div className="text-center p-3 rounded-2xl bg-[#F2F2ED] dark:bg-[#464B71] shadow-xs border border-[#DFDFD5] dark:border-[#373D60]">
              <RotateCcw className="w-5 h-5 text-[#118AB2] mx-auto mb-1" />
              <p className="text-[11px] font-bold text-[#676C8F]">Deposit Refund</p>
              <p className="text-xs font-extrabold text-[#464B71] dark:text-[#F2F2ED]">2 Hrs on UPI</p>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit']">
              Vehicle Technical Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#272B44] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#118AB2]/15 text-[#118AB2] flex items-center justify-center shrink-0">
                  <Fuel className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-[#676C8F] font-semibold">Fuel & Powertrain</p>
                  <p className="text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]">{vehicle.specs.fuelType}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#272B44] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7CD5C7]/20 text-[#118AB2] flex items-center justify-center shrink-0">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-[#676C8F] font-semibold">Transmission</p>
                  <p className="text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]">{vehicle.specs.transmission}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#272B44] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#464B71]/10 dark:bg-[#F2F2ED]/10 text-[#464B71] dark:text-[#F2F2ED] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-[#676C8F] font-semibold">Seating Capacity</p>
                  <p className="text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]">{vehicle.specs.seats} Adults</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#272B44] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-[#676C8F] font-semibold">
                    {isEv ? "ARAI Certified Range" : "ARAI Mileage"}
                  </p>
                  <p className="text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]">
                    {isEv ? `${vehicle.specs.rangeKm} km` : `${vehicle.specs.mileageKmpl} km/l`}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#272B44] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7CD5C7]/20 text-[#7CD5C7] flex items-center justify-center shrink-0">
                  <Luggage className="w-5 h-5 text-[#118AB2]" />
                </div>
                <div>
                  <p className="text-[11px] text-[#676C8F] font-semibold">Boot Space</p>
                  <p className="text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]">{vehicle.specs.luggageCapacity} Liters</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#272B44] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#118AB2]/15 text-[#118AB2] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-[#676C8F] font-semibold">Ground Clearance</p>
                  <p className="text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]">{vehicle.specs.groundClearanceMm} mm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Highway Personality */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit']">
              About This Machine
            </h3>
            <p className="text-sm text-[#676C8F] dark:text-[#A5ABC9] leading-relaxed">
              {vehicle.description}
            </p>
          </div>

          {/* Features Checklist */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit']">
              Convenience & Safety Equipment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vehicle.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-[#464B71] dark:text-[#F2F2ED]">
                  <CheckCircle2 className="w-4 h-4 text-[#118AB2] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5 text-xs text-[#464B71] dark:text-[#F2F2ED]">
                <CheckCircle2 className="w-4 h-4 text-[#118AB2] shrink-0" />
                <span>All-India Tourist Permit & Comprehensive Zero-Dep Cover</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#464B71] dark:text-[#F2F2ED]">
                <CheckCircle2 className="w-4 h-4 text-[#118AB2] shrink-0" />
                <span>Sanitized Cabin with Level-to-Level Fuel Policy</span>
              </div>
            </div>
          </div>

          {/* Verified Customer Reviews */}
          <div className="space-y-4 pt-4 border-t border-[#DFDFD5] dark:border-[#373D60]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit']">
                Traveler Road Trip Reviews ({vehicle.reviews.length})
              </h3>
              <div className="flex items-center gap-1 text-sm font-bold text-[#7CD5C7]">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-[#464B71] dark:text-[#F2F2ED]">{vehicle.avgRating} Out of 5.0</span>
              </div>
            </div>

            <div className="space-y-3">
              {vehicle.reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#464B71] dark:text-[#F2F2ED]">{r.author.name}</p>
                      {r.tripRoute && (
                        <p className="text-[11px] text-[#118AB2] font-semibold flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{r.tripRoute}</span>
                        </p>
                      )}
                    </div>
                    <div className="flex items-center text-[#7CD5C7]">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9] leading-relaxed italic">
                    &ldquo;{r.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Machines */}
          {similarVehicles.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#DFDFD5] dark:border-[#373D60]">
              <h3 className="text-lg font-bold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit']">
                Similar Machines in {vehicle.category.replace("_", " ")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarVehicles.map((sim) => (
                  <Link
                    key={sim.id}
                    href={`/vehicles/${sim.slug}`}
                    className="p-3 rounded-2xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] hover:border-[#118AB2] transition-all group"
                  >
                    <img
                      src={sim.images[0]?.url || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"}
                      alt={sim.title}
                      className="w-full h-28 object-cover rounded-xl mb-2 group-hover:scale-102 transition-transform"
                    />
                    <h4 className="text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] truncate">
                      {sim.title}
                    </h4>
                    <p className="text-xs font-extrabold text-[#118AB2] mt-1">
                      {formatINR(sim.dayRate)} <span className="text-[10px] text-[#676C8F] font-normal">/day</span>
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Sticky Pricing & Quick Checkout Trigger */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4 bg-white dark:bg-[#272B44] p-6 rounded-3xl border border-[#DFDFD5] dark:border-[#373D60] shadow-xl">
            {/* Price Header */}
            <div className="flex items-baseline justify-between pb-4 border-b border-[#DFDFD5] dark:border-[#373D60]">
              <div>
                <span className="text-2xl font-extrabold text-[#118AB2] font-['Outfit'] num-tabular">
                  {formatINR(vehicle.dayRate)}
                </span>
                <span className="text-xs text-[#676C8F] font-medium"> / day</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Instant Book
              </span>
            </div>

            {/* Quick Trip Estimator */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                  Trip Duration (Days)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 3, 5, 7].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDays(d)}
                      className={`flex-1 py-1.5 rounded-xl font-bold transition-all ${
                        days === d
                          ? "bg-[#118AB2] text-white shadow-xs"
                          : "bg-[#F2F2ED] dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60] hover:bg-white"
                      }`}
                    >
                      {d} {d === 1 ? "Day" : "Days"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chauffeur Toggle */}
              {vehicle.isChauffeurAvailable && (
                <label className="flex items-center justify-between p-3 rounded-2xl bg-[#F2F2ED]/50 dark:bg-[#464B71]/60 border border-[#DFDFD5] dark:border-[#373D60] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={withChauffeur}
                      onChange={(e) => setWithChauffeur(e.target.checked)}
                      className="w-4 h-4 text-[#118AB2] rounded focus:ring-[#118AB2]"
                    />
                    <div>
                      <p className="font-bold text-[#464B71] dark:text-[#F2F2ED]">Add Chauffeur</p>
                      <p className="text-[10px] text-[#676C8F]">Uniformed & highway-verified driver</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#118AB2]">+₹1,200/day</span>
                </label>
              )}
            </div>

            {/* Price Breakdown Accordion */}
            <div className="pt-3 border-t border-[#DFDFD5] dark:border-[#373D60] space-y-2 text-xs">
              <div className="flex justify-between text-[#676C8F] dark:text-[#A5ABC9]">
                <span>Base Rental ({days} days)</span>
                <span className="font-semibold text-[#464B71] dark:text-[#F2F2ED]">{formatINR(baseRental)}</span>
              </div>
              {withChauffeur && (
                <div className="flex justify-between text-[#676C8F] dark:text-[#A5ABC9]">
                  <span>Chauffeur Fee ({days} days)</span>
                  <span className="font-semibold text-[#464B71] dark:text-[#F2F2ED]">{formatINR(chauffeurFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#676C8F] dark:text-[#A5ABC9]">
                <span>GST (18% HSN 996601)</span>
                <span className="font-semibold text-[#464B71] dark:text-[#F2F2ED]">{formatINR(gst)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                <span>Refundable Security Deposit</span>
                <span>{formatINR(vehicle.securityDeposit)}</span>
              </div>

              <div className="pt-2 border-t border-[#DFDFD5] dark:border-[#373D60] flex justify-between font-bold text-sm text-[#464B71] dark:text-[#F2F2ED]">
                <span>Estimated Total</span>
                <span className="font-extrabold text-[#118AB2] num-tabular text-base">
                  {formatINR(totalPayable)}
                </span>
              </div>
            </div>

            {/* Partial Pay note */}
            <div className="p-2.5 rounded-xl bg-[#F2F2ED] dark:bg-[#464B71]/80 border border-[#DFDFD5] dark:border-[#373D60] text-[11px] text-[#676C8F] dark:text-[#A5ABC9]">
              💡 <strong>Partial Payment Available:</strong> Pay only 20% today, balance at vehicle handover.
            </div>

            {/* Direct Booking CTA */}
            <Link
              href={`/booking/${vehicle.slug}?days=${days}&chauffeur=${withChauffeur ? "true" : "false"}`}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#118AB2] to-[#0D6E8E] hover:brightness-110 text-white font-extrabold text-sm shadow-xl hover:shadow-orange-950/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Proceed to Fast Booking</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="text-[10px] text-[#676C8F] text-center">
              Free cancellation up to 24 hrs prior to pickup • No paperwork
            </p>
          </div>
        </div>
      </div>

      {/* 4. Mobile Sticky Bottom Booking CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-4 bg-[#F2F2ED]/95 dark:bg-[#464B71]/95 backdrop-blur-md border-t border-[#DFDFD5] dark:border-[#373D60] shadow-2xl flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-[#676C8F]">Total with 18% GST:</span>
          <p className="text-lg font-extrabold text-[#118AB2] font-['Outfit'] num-tabular">
            {formatINR(totalPayable)}
          </p>
        </div>
        <Link
          href={`/booking/${vehicle.slug}?days=${days}&chauffeur=${withChauffeur ? "true" : "false"}`}
          className="py-3 px-6 rounded-xl bg-[#118AB2] text-white text-xs font-bold shadow-md flex items-center gap-1.5"
        >
          <span>Book Machine</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
