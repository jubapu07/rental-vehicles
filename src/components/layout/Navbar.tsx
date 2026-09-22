"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Car,
  Bike,
  Truck,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  Search,
  Heart,
  User,
  LogOut,
} from "lucide-react";
import SavedVehiclesModal from "@/components/modals/SavedVehiclesModal";
import AuthModal from "@/components/modals/AuthModal";

export default function Navbar() {
  const pathname = usePathname();

  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(2);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
  } | null>(null);

  useEffect(() => {
    // Check saved vehicles count
    try {
      const storedFavs = localStorage.getItem("fleetflow_favorites");
      if (storedFavs) {
        const parsed = JSON.parse(storedFavs);
        setSavedCount(Array.isArray(parsed) ? parsed.length : 0);
      }
      const storedUser = localStorage.getItem("fleetflow_auth_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // ignore
    }
  }, [isSavedModalOpen, isAuthModalOpen]);

  const handleSignOut = () => {
    try {
      localStorage.removeItem("fleetflow_auth_user");
    } catch {
      // ignore
    }
    setUser(null);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#0F2432] text-white flex items-center justify-center shadow-md group-hover:bg-[#E05A36] transition-colors duration-300">
              <Sparkles className="w-6 h-6 text-[#E67E22] group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-[#0F2432]">
                  Fleet<span className="text-[#E05A36]">Flow</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  PRO
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-normal">
                Multi-Category Mobility
              </p>
            </div>
          </Link>

          {/* Category Jump Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80">
            <Link
              href="/explore"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                pathname === "/explore" && !pathname.includes("category=")
                  ? "bg-[#0F2432] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              All Fleet
            </Link>
            <Link
              href="/explore?category=CAR"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
            >
              <Car className="w-3.5 h-3.5 text-[#E05A36]" />
              Cars & SUVs
            </Link>
            <Link
              href="/explore?category=MOTORCYCLE"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
            >
              <Bike className="w-3.5 h-3.5 text-[#E67E22]" />
              Motorcycles
            </Link>
            <Link
              href="/explore?category=TRUCK"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
            >
              <Truck className="w-3.5 h-3.5 text-[#0F2432]" />
              Trucks & Haulers
            </Link>
          </nav>

          {/* Right Actions matching screenshot: Heart + Sign In + Dashboard */}
          <div className="flex items-center gap-3">
            {/* 1. Heart / Favorites Button (Exact match from screenshot) */}
            <button
              type="button"
              onClick={() => setIsSavedModalOpen(true)}
              className="relative p-2.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-700 hover:text-rose-500 cursor-pointer shadow-2xs group"
              title="Saved Vehicles"
              aria-label="Favorites"
            >
              <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E05A36] text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                  {savedCount}
                </span>
              )}
            </button>

            {/* 2. User Sign In or Profile Badge (Exact match from screenshot: [👤 Sign in]) */}
            {!user ? (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 shadow-2xs transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-700" />
                <span>Sign in</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
                  title="Go to Dashboard"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/40"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                      <span>{user.name.split(" ")[0]}</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium leading-none">
                      {user.role === "HOST" ? "Verified Host" : "Member"}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Dashboard shortcut link */}
            <Link
              href="/dashboard"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#0F2432] hover:bg-slate-100 border border-slate-200 transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#E05A36]" />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Modals */}
      <SavedVehiclesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        onRemove={() => setSavedCount((prev) => Math.max(0, prev - 1))}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedUser) => setUser(loggedUser)}
      />
    </>
  );
}
