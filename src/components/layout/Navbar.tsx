"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  MapPin,
  Heart,
  User,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  LogOut,
  FileText,
  Car,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSavedCars } from "@/context/SavedCarsContext";
import { INDIAN_CITIES } from "@/lib/indianCities";
import AuthModal from "@/components/modals/AuthModal";
import SavedVehiclesModal from "@/components/modals/SavedVehiclesModal";

export default function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { count: savedCount } = useSavedCars();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Bengaluru");

  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F2F2ED]/90 dark:bg-[#1B1E30]/95 backdrop-blur-md border-b border-[#DFDFD5] dark:border-[#373D60] shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* 1. Left: Brand & City Selector */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#464B71] to-[#3D436A] text-white flex items-center justify-center shadow-md group-hover:scale-105 group-hover:from-[#118AB2] group-hover:to-[#0D6E8E] transition-all duration-300">
                <Compass className="w-6 h-6 text-[#7CD5C7] group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-2xl tracking-tight text-[#464B71] dark:text-[#F2F2ED] font-['Outfit']">
                    PRAVAAS<span className="text-[#118AB2]">.</span>
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#7CD5C7]/20 dark:bg-[#7CD5C7]/30 text-[#118AB2] dark:text-[#7CD5C7] border border-[#7CD5C7]/40">
                    BHARAT
                  </span>
                </div>
                <p className="text-[11px] font-medium text-[#676C8F] dark:text-[#A5ABC9]">
                  {language === "hi" ? "प्रीमियम सेल्फ़-ड्राइव एवं शॉफ़र" : "Premium Self-Drive & Chauffeur"}
                </p>
              </div>
            </Link>

            {/* City Selector Dropdown */}
            <div className="relative hidden lg:block" ref={cityDropdownRef}>
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] hover:border-[#118AB2] transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-[#118AB2]" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#676C8F]" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 p-2 bg-[#FFFFFF] dark:bg-[#272B44] rounded-2xl shadow-xl border border-[#DFDFD5] dark:border-[#373D60] z-50 animate-in fade-in zoom-in-95 duration-150">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#676C8F] px-3 py-1">
                    Select Indian City ({INDIAN_CITIES.length})
                  </p>
                  <div className="max-h-64 overflow-y-auto space-y-0.5">
                    {INDIAN_CITIES.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedCity(c.name);
                          setIsCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          selectedCity === c.name
                            ? "bg-[#F2F2ED] dark:bg-[#373D60] text-[#118AB2] font-bold"
                            : "text-[#464B71] dark:text-[#F2F2ED] hover:bg-[#F2F2ED]/60 dark:hover:bg-[#3D436A]"
                        }`}
                      >
                        <span>{c.name}</span>
                        <span className="text-[10px] text-[#676C8F] dark:text-[#9BA2C4]">{c.state}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Middle: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/60 dark:bg-[#272B44]/90 p-1.5 rounded-full border border-[#DFDFD5] dark:border-[#373D60]">
            <Link
              href="/explore"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                pathname === "/explore" && !pathname.includes("category=")
                  ? "bg-[#464B71] text-[#F2F2ED] dark:bg-[#118AB2] shadow-xs"
                  : "text-[#464B71] dark:text-[#F2F2ED] hover:text-[#118AB2] hover:bg-white dark:hover:bg-[#373D60]"
              }`}
            >
              <span>All Fleet</span>
            </Link>
            <Link
              href="/explore?category=SUV"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] hover:text-[#118AB2] hover:bg-white dark:hover:bg-[#373D60] transition-all"
            >
              <Car className="w-3.5 h-3.5 text-[#118AB2]" />
              <span>SUVs & 4x4</span>
            </Link>
            <Link
              href="/explore?category=SEDAN"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] hover:text-[#118AB2] hover:bg-white dark:hover:bg-[#373D60] transition-all"
            >
              <span>Sedans</span>
            </Link>
            <Link
              href="/explore?category=ELECTRIC"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-white dark:hover:bg-[#373D60] transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-[#7CD5C7]" />
              <span>EVs</span>
            </Link>
            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                pathname === "/dashboard"
                  ? "bg-[#464B71] text-[#F2F2ED] dark:bg-[#118AB2]"
                  : "text-[#464B71] dark:text-[#F2F2ED] hover:text-[#118AB2] hover:bg-white dark:hover:bg-[#373D60]"
              }`}
            >
              <span>Dashboard</span>
            </Link>
          </nav>

          {/* 3. Right: Controls & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher (EN / HI) */}
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="p-2 rounded-xl bg-white/70 hover:bg-white dark:bg-[#272B44] dark:hover:bg-[#373D60] border border-[#DFDFD5] dark:border-[#373D60] text-[#464B71] dark:text-[#F2F2ED] text-xs font-bold transition-colors flex items-center gap-1"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#118AB2]" />
              <span>{language === "en" ? "हिन्दी" : "EN"}</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/70 hover:bg-white dark:bg-[#272B44] dark:hover:bg-[#373D60] border border-[#DFDFD5] dark:border-[#373D60] text-[#464B71] dark:text-[#F2F2ED] transition-colors"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-[#7CD5C7]" /> : <Moon className="w-4 h-4 text-[#464B71]" />}
            </button>

            {/* Wishlist / Saved Cars */}
            <button
              onClick={() => setIsSavedOpen(true)}
              className="relative p-2 rounded-xl bg-white/70 hover:bg-white dark:bg-[#272B44] dark:hover:bg-[#373D60] border border-[#DFDFD5] dark:border-[#373D60] text-[#464B71] dark:text-[#F2F2ED] transition-colors"
              title="Saved Cars"
              aria-label="Saved Cars"
            >
              <Heart className={`w-4 h-4 ${savedCount > 0 ? "text-[#118AB2] fill-current" : ""}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#118AB2] text-[#F2F2ED] text-[10px] font-extrabold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Auth Button or User Menu */}
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/70 dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] hover:border-[#118AB2] transition-all"
                >
                  <img
                    src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#676C8F]" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 p-2 bg-[#FFFFFF] dark:bg-[#272B44] rounded-2xl shadow-2xl border border-[#DFDFD5] dark:border-[#373D60] z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-[#DFDFD5] dark:border-[#373D60]">
                      <p className="text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#676C8F] truncate">+91 {user.phone}</p>
                      <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="w-3 h-3" />
                        <span>KYC Verified</span>
                      </div>
                    </div>
                    <div className="py-1 space-y-0.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#464B71] dark:text-[#F2F2ED] hover:bg-[#F2F2ED] dark:hover:bg-[#3D436A] transition-colors"
                      >
                        <Car className="w-3.5 h-3.5 text-[#118AB2]" />
                        <span>My Bookings</span>
                      </Link>
                      <Link
                        href="/dashboard?tab=invoices"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#464B71] dark:text-[#F2F2ED] hover:bg-[#F2F2ED] dark:hover:bg-[#3D436A] transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#7CD5C7]" />
                        <span>GST Tax Invoices</span>
                      </Link>
                      {user.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#118AB2] hover:bg-[#F2F2ED] dark:hover:bg-[#373D60] transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Admin Control Panel</span>
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#464B71] to-[#3D436A] hover:from-[#118AB2] hover:to-[#0D6E8E] text-[#F2F2ED] text-xs font-bold shadow-md hover:shadow-orange-950/20 transition-all duration-300"
              >
                <User className="w-3.5 h-3.5 text-[#7CD5C7]" />
                <span>+91 Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/70 dark:bg-[#272B44] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden p-4 border-t border-[#DFDFD5] dark:border-[#373D60] bg-[#F2F2ED] dark:bg-[#464B71] space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/80 dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60]">
              <span className="text-xs font-semibold text-[#676C8F]">Current City:</span>
              <span className="text-xs font-bold text-[#118AB2] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {selectedCity}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/explore"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-white/80 dark:bg-[#272B44] text-[#464B71] dark:text-[#F2F2ED] flex items-center gap-2 border border-[#DFDFD5] dark:border-[#373D60]"
              >
                <Car className="w-4 h-4 text-[#118AB2]" />
                <span>All Vehicles</span>
              </Link>
              <Link
                href="/explore?category=SUV"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-white/80 dark:bg-[#272B44] text-[#464B71] dark:text-[#F2F2ED] flex items-center gap-2 border border-[#DFDFD5] dark:border-[#373D60]"
              >
                <span>SUVs & 4x4</span>
              </Link>
              <Link
                href="/explore?category=ELECTRIC"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-white/80 dark:bg-[#272B44] text-emerald-600 flex items-center gap-2 border border-[#DFDFD5] dark:border-[#373D60]"
              >
                <Zap className="w-4 h-4 fill-current text-[#7CD5C7]" />
                <span>Electric (EV)</span>
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-white/80 dark:bg-[#272B44] text-[#464B71] dark:text-[#F2F2ED] flex items-center gap-2 border border-[#DFDFD5] dark:border-[#373D60]"
              >
                <span>My Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <SavedVehiclesModal isOpen={isSavedOpen} onClose={() => setIsSavedOpen(false)} />
    </>
  );
}
