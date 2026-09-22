"use client";

import { useState } from "react";
import { X, User, ShieldCheck, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: { name: string; email: string; role: string; avatarUrl?: string }) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");

  if (!isOpen) return null;

  const handleDemoLogin = (role: "HOST" | "CUSTOMER") => {
    const demoUser =
      role === "HOST"
        ? {
            name: "Vikram Malhotra",
            email: "vikram.malhotra@fleetflow.in",
            role: "HOST",
            avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
          }
        : {
            name: "Arjun Mehta",
            email: "arjun.mehta@gmail.com",
            role: "CUSTOMER",
            avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80",
          };

    try {
      localStorage.setItem("fleetflow_auth_user", JSON.stringify(demoUser));
    } catch {
      // ignore
    }
    if (onLoginSuccess) onLoginSuccess(demoUser);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      name: name || (tab === "signin" ? email.split("@")[0] : "Verified Traveler"),
      email: email || "traveler@example.com",
      role: "CUSTOMER",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    };
    try {
      localStorage.setItem("fleetflow_auth_user", JSON.stringify(user));
    } catch {
      // ignore
    }
    if (onLoginSuccess) onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0F2432] text-white p-6 pb-7 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#E05A36] text-white flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              FleetFlow Mobility Account
            </span>
          </div>

          <h3 className="text-xl font-black">
            {tab === "signin" ? "Welcome back to FleetFlow" : "Create Your Member Profile"}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Access your saved car rentals, manage bookings, and unlock special member rates.
          </p>

          {/* Tab Switcher */}
          <div className="flex bg-slate-800/80 p-1 rounded-xl mt-4 border border-slate-700">
            <button
              type="button"
              onClick={() => setTab("signin")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                tab === "signin" ? "bg-white text-slate-900 shadow-xs" : "text-slate-300 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab("signup")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                tab === "signup" ? "bg-white text-slate-900 shadow-xs" : "text-slate-300 hover:text-white"
              }`}
            >
              New Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {/* Quick Demo Login Option */}
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Instant 1-Click Demo Profiles</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin("CUSTOMER")}
                className="py-2 px-3 rounded-xl bg-white hover:bg-amber-100 border border-amber-200 text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <User className="w-3.5 h-3.5 text-[#E05A36]" />
                <span>As Renter (Arjun)</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("HOST")}
                className="py-2 px-3 rounded-xl bg-white hover:bg-amber-100 border border-amber-200 text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>As Host (Vikram)</span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <hr className="w-full border-slate-200" />
            <span className="absolute bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Or continue with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === "signup" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E05A36]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcus@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E05A36]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E05A36]"
                />
              </div>
            </div>

            {tab === "signup" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Driver&apos;s License Number (Optional)
                </label>
                <input
                  type="text"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  placeholder="CA-D1928301"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E05A36]"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#E05A36] hover:bg-[#C94C2B] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
            >
              <span>{tab === "signin" ? "Sign In to FleetFlow" : "Complete Registration"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
