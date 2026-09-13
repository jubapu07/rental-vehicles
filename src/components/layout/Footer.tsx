import Link from "next/link";
import { Sparkles, Shield, Clock, Award, Compass, Car, Bike, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#090D14] text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-slate-300">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-800/80 text-[#E67E22]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Full Physical Damage Protection</h4>
              <p className="text-xs text-slate-400 mt-1">
                Every booking is insured with 24/7 roadside assistance and up to ₹1 Crore comprehensive liability protection.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-800/80 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Zero Double-Booking Guarantee</h4>
              <p className="text-xs text-slate-400 mt-1">
                Atomic database reservation locks eliminate booking conflicts and host blackout clashes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-800/80 text-[#E05A36]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Instant Contactless Handover</h4>
              <p className="text-xs text-slate-400 mt-1">
                Unlock selected vehicles via smartphone or coordinate fast concierge host handoffs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-slate-800/80 text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Multi-Category Fleet</h4>
              <p className="text-xs text-slate-400 mt-1">
                Switch seamlessly between track cars, adventure motorcycles, and heavy-duty work trucks.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-slate-800">
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E05A36] text-white flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Fleet<span className="text-[#E05A36]">Flow</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-3 max-w-sm leading-relaxed">
              FleetFlow is the next-generation mobility platform connecting vehicle enthusiasts and travelers with verified hosts for premium sports cars, expedition motorcycles, and heavy commercial haulers.
            </p>
            <div className="flex items-center gap-3 mt-4 text-xs font-semibold text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Live Fleet Engine
              </span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Categories</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/explore?category=CAR" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <Car className="w-3.5 h-3.5 text-slate-500" />
                  Performance & Luxury Cars
                </Link>
              </li>
              <li>
                <Link href="/explore?category=MOTORCYCLE" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <Bike className="w-3.5 h-3.5 text-slate-500" />
                  Adventure & Sport Bikes
                </Link>
              </li>
              <li>
                <Link href="/explore?category=TRUCK" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <Truck className="w-3.5 h-3.5 text-slate-500" />
                  Heavy-Duty & EV Trucks
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-white transition-colors">
                  All Vehicles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Popular Hubs</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/explore?city=Bengaluru" className="hover:text-white transition-colors">Bengaluru, KA</Link>
              </li>
              <li>
                <Link href="/explore?city=Mumbai" className="hover:text-white transition-colors">Mumbai, MH</Link>
              </li>
              <li>
                <Link href="/explore?city=Goa" className="hover:text-white transition-colors">Goa</Link>
              </li>
              <li>
                <Link href="/explore?city=New+Delhi" className="hover:text-white transition-colors">New Delhi, NCR</Link>
              </li>
              <li>
                <Link href="/explore?city=Pune" className="hover:text-white transition-colors">Pune, MH</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Host & Portal</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">Host Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">List Your Vehicle</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">Earnings Calculator</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">Renter Verification</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FleetFlow Mobility Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Insurance & Protection</span>
            <span className="hover:text-slate-400 cursor-pointer">Contact Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
