"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Bike, Truck, ShieldCheck, Sparkles, LayoutDashboard, Search } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
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

        {/* Category Jump Pills */}
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
            Cars
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

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#0F2432] hover:bg-slate-100 border border-slate-200 transition-all"
          >
            <LayoutDashboard className="w-4 h-4 text-[#E05A36]" />
            <span className="hidden sm:inline">Fleet Dashboard</span>
          </Link>

          <Link
            href="/explore"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0F2432] hover:bg-[#E05A36] shadow-sm hover:shadow-md transition-all duration-200"
          >
            Book a Ride
          </Link>

          {/* User Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Marcus Vance"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/30 border border-white"
            />
            <div className="hidden lg:block text-left">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900">Marcus V.</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Verified Host</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
