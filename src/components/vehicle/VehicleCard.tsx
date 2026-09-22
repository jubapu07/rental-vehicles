"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Zap, ShieldCheck, ChevronLeft, ChevronRight, Fuel, Gauge, Weight, Users } from "lucide-react";
import { VehicleData } from "@/lib/types";

interface VehicleCardProps {
  vehicle: VehicleData;
  searchStart?: string;
  searchEnd?: string;
}

export default function VehicleCard({ vehicle, searchStart, searchEnd }: VehicleCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = vehicle.images && vehicle.images.length > 0
    ? vehicle.images
    : [{ url: "/images/vehicles/mahindra-thar.jpg", id: "default", vehicleId: vehicle.id, isCover: true, sortOrder: 0 }];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Compute estimated total if search dates are provided
  let calculatedDays = 0;
  let estimatedTotal = 0;
  if (searchStart && searchEnd) {
    const s = new Date(searchStart);
    const e = new Date(searchEnd);
    if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && e > s) {
      calculatedDays = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
      const base = vehicle.dayRate * calculatedDays;
      const discount = calculatedDays >= 7 ? base * (vehicle.weeklyDiscountPercentage / 100) : 0;
      const fee = (base - discount) * 0.10;
      estimatedTotal = Math.round(base - discount + fee);
    }
  }

  // Generate category micro-spec badge
  const renderSpecBadge = () => {
    if (vehicle.category === "MOTORCYCLE") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-[#E67E22] text-[11px] font-bold border border-amber-500/20">
          <Gauge className="w-3 h-3" />
          {vehicle.specs?.engineDisplacementCc || 1000}cc • {vehicle.specs?.bikeType || "Sport"}
        </span>
      );
    }
    if (vehicle.category === "TRUCK") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 text-[11px] font-bold border border-emerald-500/20">
          <Weight className="w-3 h-3" />
          {vehicle.specs?.payloadCapacityKg || 1000}kg Payload • {vehicle.specs?.bedLengthMeters || 1.8}m Bed
        </span>
      );
    }
    // CAR
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-800 text-[11px] font-bold border border-sky-500/20">
        <Fuel className="w-3 h-3 text-[#E05A36]" />
        {vehicle.specs?.fuelType === "EV" ? "Full EV" : vehicle.specs?.transmission || "Automatic"} • {vehicle.specs?.seats || 5} Seats
      </span>
    );
  };

  const detailUrl = `/vehicles/${vehicle.slug}${
    searchStart && searchEnd ? `?start=${searchStart}&end=${searchEnd}` : ""
  }`;

  return (
    <div className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Carousel Spotlight */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[activeImageIndex].url}
          alt={vehicle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Carousel Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous photo"
              className="w-8 h-8 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next photo"
              className="w-8 h-8 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dot Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 pointer-events-none">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === activeImageIndex ? "w-4 bg-white shadow-md" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 pointer-events-none">
          {vehicle.instantBookable && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#E05A36] text-[10px] font-extrabold shadow-sm">
              <Zap className="w-3 h-3 fill-[#E05A36]" />
              INSTANT
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F2432]/90 backdrop-blur-md text-white text-[10px] font-bold">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Verified Host
          </span>
        </div>

        {/* City Location Tag */}
        <div className="absolute top-3 right-3 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold">
            {vehicle.city}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category Micro-spec badge */}
          <div className="mb-2.5 flex items-center justify-between">
            {renderSpecBadge()}

            {/* Rating */}
            <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{vehicle.avgRating ? vehicle.avgRating.toFixed(1) : "5.0"}</span>
              <span className="text-slate-400 font-normal">
                ({vehicle.reviewCount || (vehicle.reviews ? vehicle.reviews.length : 0)})
              </span>
            </div>
          </div>

          {/* Vehicle Title & Location */}
          <Link href={detailUrl} className="block group-hover:text-[#E05A36] transition-colors">
            <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-1">
              {vehicle.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {vehicle.locationAddress}
          </p>

          {/* Quick specs pill list */}
          <div className="flex items-center gap-3 mt-3 text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span className="flex items-center gap-1">
              <Fuel className="w-3.5 h-3.5 text-slate-400" />
              {vehicle.specs?.fuelType || "Petrol"}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              {vehicle.category === "MOTORCYCLE" ? "1-2 Riders" : `${vehicle.specs?.seats || 5} Seats`}
            </span>
            {vehicle.weeklyDiscountPercentage > 0 && (
              <span className="ml-auto text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {vehicle.weeklyDiscountPercentage}% 7d+ off
              </span>
            )}
          </div>
        </div>

        {/* Pricing Section & CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-slate-900 num-tabular">
                ₹{vehicle.dayRate.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ day</span>
            </div>

            {calculatedDays > 0 && (
              <p className="text-[11px] font-bold text-emerald-700 mt-0.5">
                ₹{estimatedTotal.toLocaleString("en-IN")} total for {calculatedDays} days
              </p>
            )}
          </div>

          <Link
            href={detailUrl}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0F2432] hover:bg-[#E05A36] shadow-xs transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
