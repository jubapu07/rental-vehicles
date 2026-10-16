"use client";

import Link from "next/link";
import { X, Heart, Trash2, ArrowRight, Star } from "lucide-react";
import { useSavedCars } from "@/context/SavedCarsContext";
import { INDIAN_VEHICLES } from "@/lib/indianVehicles";
import { formatINR } from "@/lib/i18n";

interface SavedVehiclesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SavedVehiclesModal({ isOpen, onClose }: SavedVehiclesModalProps) {
  const { savedIds, toggleSave } = useSavedCars();

  if (!isOpen) return null;

  const savedVehicles = INDIAN_VEHICLES.filter((v) => savedIds.includes(v.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#272B44] rounded-3xl shadow-2xl border border-[#DFDFD5] dark:border-[#373D60] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#DFDFD5] dark:border-[#373D60] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#118AB2]/15 text-[#118AB2] flex items-center justify-center border border-[#118AB2]/20">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-['Outfit'] text-[#464B71] dark:text-[#F2F2ED]">
                Saved Garage ({savedVehicles.length})
              </h3>
              <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9]">Your shortlisted cars for upcoming road trips</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F2F2ED] dark:hover:bg-[#373D60] text-[#676C8F] hover:text-[#464B71] dark:hover:text-[#F2F2ED]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {savedVehicles.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F2F2ED] dark:bg-[#464B71] text-[#118AB2] flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-[#464B71] dark:text-[#F2F2ED]">
                Your garage is currently empty
              </p>
              <p className="text-xs text-[#676C8F] dark:text-[#8D93B4] mt-1 max-w-xs mx-auto">
                Tap the heart icon on any Thar, Fortuner, Creta or EV to shortlist it here.
              </p>
              <Link
                href="/explore"
                onClick={onClose}
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-[#464B71] hover:bg-[#118AB2] text-[#F2F2ED] text-xs font-semibold"
              >
                <span>Browse Full Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            savedVehicles.map((car) => (
              <div
                key={car.id}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#F2F2ED]/40 dark:bg-[#464B71]/50 border border-[#DFDFD5] dark:border-[#373D60] hover:border-[#118AB2]/50 transition-all group"
              >
                <img
                  src={car.images[0]?.url || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"}
                  alt={car.title}
                  className="w-24 h-18 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs text-[#7CD5C7] font-semibold mb-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{car.avgRating} ({car.reviewCount})</span>
                    <span className="text-[#DFDFD5]">•</span>
                    <span className="text-[#676C8F] dark:text-[#A5ABC9]">{car.city}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#464B71] dark:text-[#F2F2ED] truncate">
                    {car.title}
                  </h4>
                  <p className="text-xs text-[#676C8F] dark:text-[#8D93B4] truncate">
                    {car.specs.fuelType} • {car.specs.transmission} • {car.specs.seats} Seats
                  </p>
                  <p className="text-sm font-extrabold text-[#118AB2] mt-1">
                    {formatINR(car.dayRate)}
                    <span className="text-xs font-normal text-[#676C8F]"> /day</span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => toggleSave(car.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Link
                    href={`/vehicles/${car.slug}`}
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-lg bg-[#118AB2] text-white text-xs font-bold hover:brightness-105 transition-all flex items-center gap-1"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
