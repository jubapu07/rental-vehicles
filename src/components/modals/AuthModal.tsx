"use client";

import { useState } from "react";
import { X, Smartphone, Mail, ShieldCheck, ArrowRight, CheckCircle2, KeyRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { requestPhoneOtp, verifyPhoneOtp, signInWithEmail } = useAuth();

  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [step, setStep] = useState<"phone_input" | "otp_verify">("phone_input");
  
  // Phone OTP state
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email state
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setIsSubmitting(true);

    const res = await requestPhoneOtp(phone);
    setIsSubmitting(false);

    if (res.success) {
      setStep("otp_verify");
      setStatusMsg({ text: res.message, isError: false });
    } else {
      setStatusMsg({ text: res.message, isError: true });
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setIsSubmitting(true);

    const res = await verifyPhoneOtp(phone, otp, fullName);
    setIsSubmitting(false);

    if (res.success) {
      setStatusMsg({ text: res.message, isError: false });
      setTimeout(() => {
        onClose();
        setStep("phone_input");
        setOtp("");
      }, 700);
    } else {
      setStatusMsg({ text: res.message, isError: true });
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await signInWithEmail(email, fullName || "Pravaas Member");
    setIsSubmitting(false);
    onClose();
  };

  const handleQuickDemo = async (role: "CUSTOMER" | "ADMIN") => {
    if (role === "ADMIN") {
      await signInWithEmail("admin@pravaas.in", "Operations Lead (Admin)");
    } else {
      await signInWithEmail("traveler@pravaas.in", "Arjun Sharma (Verified Customer)");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#272B44] rounded-3xl shadow-2xl border border-[#DFDFD5] dark:border-[#373D60] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 pb-4 bg-gradient-to-r from-[#464B71] to-[#3D436A] text-[#F2F2ED]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#118AB2] text-white">
              Instant Access
            </span>
            <span className="text-xs text-[#A5ABC9]">Fast & DigiLocker Ready</span>
          </div>
          <h2 className="text-2xl font-bold font-['Outfit']">
            Sign In to <span className="text-[#7CD5C7]">PRAVAAS</span>
          </h2>
          <p className="text-xs text-[#A5ABC9] mt-1">
            Book verified cars, track deposits & access GST tax invoices
          </p>

          {/* Mode Switcher */}
          <div className="flex mt-4 p-1 bg-black/30 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                setMode("phone");
                setStep("phone_input");
                setStatusMsg(null);
              }}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                mode === "phone" ? "bg-[#F2F2ED] text-[#464B71] shadow-sm font-bold" : "text-[#F2F2ED]/80 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#118AB2]" />
              +91 Mobile OTP
            </button>
            <button
              onClick={() => {
                setMode("email");
                setStatusMsg(null);
              }}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                mode === "email" ? "bg-[#F2F2ED] text-[#464B71] shadow-sm font-bold" : "text-[#F2F2ED]/80 hover:text-white"
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-[#118AB2]" />
              Email Login
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {statusMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                statusMsg.isError
                  ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-800"
                  : "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
              }`}
            >
              {statusMsg.isError ? <X className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {mode === "phone" && step === "phone_input" && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                  Full Name (as per Driving Licence)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikram Malhotra"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] text-sm focus:outline-none focus:ring-2 focus:ring-[#118AB2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                  Indian Mobile Number <span className="text-[#118AB2]">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-[#DFDFD5] dark:border-[#373D60] bg-[#F2F2ED] dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] text-sm font-semibold">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-4 py-2.5 rounded-r-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] text-sm tracking-wider font-medium focus:outline-none focus:ring-2 focus:ring-[#118AB2]"
                  />
                </div>
                <p className="text-[11px] text-[#676C8F] mt-1">
                  10-digit mobile number starting with 6, 7, 8, or 9
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || phone.length < 10}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#118AB2] to-[#0D6E8E] text-white font-semibold text-sm shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? "Sending OTP..." : "Get 6-Digit OTP"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {mode === "phone" && step === "otp_verify" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED]">
                    Enter OTP sent to +91 {phone}
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep("phone_input")}
                    className="text-xs text-[#118AB2] hover:underline"
                  >
                    Change Number
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-4 py-3 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] text-center tracking-[0.5em] text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#118AB2]"
                  />
                  <KeyRound className="w-4 h-4 text-[#676C8F] absolute left-3 top-3.5" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#676C8F] mt-1.5">
                  <span>Test demo code: <strong className="text-emerald-600">123456</strong></span>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-[#118AB2] hover:underline font-bold"
                  >
                    Resend Code
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otp.length < 6}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#118AB2] to-[#0D6E8E] text-white font-semibold text-sm shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? "Verifying..." : "Verify & Continue"}</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </form>
          )}

          {mode === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Radhika Apte"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] text-sm focus:outline-none focus:ring-2 focus:ring-[#118AB2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                  Email Address <span className="text-[#118AB2]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] text-sm focus:outline-none focus:ring-2 focus:ring-[#118AB2]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full py-3 px-4 rounded-xl bg-[#464B71] hover:bg-[#118AB2] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>Continue with Email</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Demo Test Buttons */}
          <div className="pt-3 border-t border-[#DFDFD5] dark:border-[#373D60]">
            <p className="text-[11px] font-semibold text-[#676C8F] uppercase tracking-wider mb-2 text-center">
              Quick Role Switch for Review
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("CUSTOMER")}
                className="py-2 px-3 rounded-lg bg-[#F2F2ED] hover:bg-[#DFDFD5] dark:bg-[#464B71] dark:hover:bg-[#373D60] text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60] transition-colors"
              >
                Verified Customer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("ADMIN")}
                className="py-2 px-3 rounded-lg bg-[#118AB2]/15 hover:bg-[#118AB2]/25 text-xs font-bold text-[#118AB2] border border-[#118AB2]/30 transition-colors"
              >
                Admin Panel Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
