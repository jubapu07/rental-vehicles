"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Heart, Trash2, ArrowRight, Star, ExternalLink } from "lucide-react";

export interface SavedVehicleItem {
  id: string;
  title: string;
  category: string;
  dayRate: number;
  city: string;
  imageUrl?: string;
  rating?: number;
  slug?: string;
}

interface SavedVehiclesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems?: SavedVehicleItem[];
  onRemove?: (id: string) => void;
}

export default function SavedVehiclesModal({
  isOpen,
  onClose,
  savedItems: propItems,
  onRemove,
}: SavedVehiclesModalProps) {
  const [items, setItems] = useState<SavedVehicleItem[]>(propItems || []);

  // Sync or load from localStorage
  useEffect(() => {
    if (propItems) {
      setItems(propItems);
      return;
    }

    try {
      const stored = localStorage.getItem("fleetflow_favorites");
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        // Preload default sample saved vehicles so the modal is instantly rich
        const defaultSample: SavedVehicleItem[] = [
          {
            id: "sample-1",
            title: "2024 Jeep Grand Cherokee L 4x4",
            category: "CAR",
            dayRate: 79,
            city: "Santa Rosa",
            imageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80",
            rating: 5.0,
            slug: "jeep-grand-cherokee-l-4x4-2024-santa-rosa",
          },
          {
            id: "sample-2",
            title: "2024 Toyota RAV4 Hybrid AWD",
            category: "CAR",
            dayRate: 59,
            city: "Santa Rosa",
            imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
            rating: 4.9,
            slug: "toyota-rav4-hybrid-awd-2024-santa-rosa",
          },
        ];
        setItems(defaultSample);
        localStorage.setItem("fleetflow_favorites", JSON.stringify(defaultSample));
      }
    } catch {
      // Fallback
    }
  }, [propItems, isOpen]);

  const handleRemove = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    try {
      localStorage.setItem("fleetflow_favorites", JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (onRemove) onRemove(id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 border border-rose-200 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Saved Vehicles</h3>
              <p className="text-xs text-slate-500 font-medium">
                {items.length} {items.length === 1 ? "vehicle" : "vehicles"} saved for your trip
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto space-y-3 grow">
          {items.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700">No saved vehicles yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the heart icon on any vehicle card while browsing to save it here for comparison.
              </p>
              <Link
                href="/explore"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F2432] text-white text-xs font-bold hover:bg-[#E05A36] transition-colors"
              >
                <span>Explore Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            items.map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.imageUrl || "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=400&q=80"}
                  alt={v.title}
                  className="w-20 h-16 rounded-xl object-cover shrink-0"
                />

                <div className="grow min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E05A36]">
                      {v.city}
                    </span>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center text-[10px] font-bold text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{v.rating || 5.0}</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 truncate">{v.title}</h4>
                  <p className="text-xs font-black text-slate-900 mt-0.5">
                    ${v.dayRate} <span className="text-[10px] font-normal text-slate-500">/day</span>
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    href={v.slug ? `/vehicles/${v.slug}` : `/explore?city=${v.city}`}
                    onClick={onClose}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-[#0F2432] hover:text-white text-slate-700 transition-colors"
                    title="View details"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleRemove(v.id)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-500 transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/explore"
              onClick={onClose}
              className="text-xs font-bold text-[#E05A36] hover:underline"
            >
              Continue Browsing
            </Link>
            <Link
              href={`/explore?city=${items[0]?.city || "Santa Rosa"}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F2432] hover:bg-[#E05A36] text-white text-xs font-bold transition-colors"
            >
              <span>Compare & Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
