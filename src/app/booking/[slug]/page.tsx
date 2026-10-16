"use client";

import { useState, use, Suspense } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  User,
  CreditCard,
  QrCode,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Plane,
  AlertCircle,
  Tag,
  Download,
  Car,
  Copy,
  Check,
} from "lucide-react";
import { INDIAN_VEHICLES } from "@/lib/indianVehicles";
import { INDIAN_CITIES } from "@/lib/indianCities";
import { formatINR } from "@/lib/i18n";
import { calculateQuote, VALID_COUPONS } from "@/lib/pricingEngine";
import { BookingAddons, VehicleData } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

function BookingFlowContent({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, submitKyc } = useAuth();

  const vehicle = INDIAN_VEHICLES.find((v) => v.slug === slug);
  if (!vehicle) {
    notFound();
  }

  // Initial params
  const initialDays = parseInt(searchParams.get("days") || "3", 10);
  const initialChauffeur = searchParams.get("chauffeur") === "true";

  // Stepper state (1: Trip, 2: Addons, 3: KYC, 4: Fare, 5: Payment, 6: Success)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Trip Details
  const [selectedCity, setSelectedCity] = useState(vehicle.city);
  const [deliveryType, setDeliveryType] = useState<"HUB" | "AIRPORT" | "DOORSTEP">("HUB");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 86400000 * (initialDays + 1)).toISOString().split("T")[0]
  );
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropTime, setDropTime] = useState("10:00");
  const [rentalType, setRentalType] = useState<"SELF_DRIVE" | "WITH_CHAUFFEUR">(
    initialChauffeur ? "WITH_CHAUFFEUR" : "SELF_DRIVE"
  );

  // Step 2: Addons
  const [addons, setAddons] = useState<BookingAddons>({
    chauffeur: initialChauffeur,
    childSeat: false,
    zeroDepInsurance: true,
    gpsNavigator: false,
    unlimitedKm: false,
  });

  // Step 3: KYC
  const [dlNumber, setDlNumber] = useState(user?.kyc.drivingLicenseNumber || "DL-1420110054321");
  const [dlExpiry, setDlExpiry] = useState(user?.kyc.dlExpiryDate || "2032-12-31");
  const [maskedAadhaar, setMaskedAadhaar] = useState(user?.kyc.maskedAadhaar || "XXXX-XXXX-8924");
  const [kycConsent, setKycConsent] = useState(true);

  // Step 4: Coupon & Payment Mode
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState<string | null>(null);
  const [paymentOption, setPaymentOption] = useState<"FULL" | "PARTIAL_20">("FULL");

  // Step 5: Payment Gateway simulation
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CARD" | "NETBANKING" | "WALLET">("UPI");
  const [selectedUpiApp, setSelectedUpiApp] = useState("GPAY");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Step 6: Confirmation
  const [bookingId, setBookingId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");

  // Live Quote Calculation
  const quote = calculateQuote({
    vehicle,
    startDate,
    endDate,
    pickupTime,
    dropTime,
    rentalType,
    addons,
    couponCode,
  });

  const amountToPay = paymentOption === "FULL" ? quote.payableNowFull : quote.payableNowPartial;

  // Handle Razorpay simulation
  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const generatedBookingId = `PRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const generatedInvoiceId = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;
      setBookingId(generatedBookingId);
      setInvoiceId(generatedInvoiceId);

      // Save booking in localStorage
      try {
        const stored = localStorage.getItem("pravaas_bookings");
        const list = stored ? JSON.parse(stored) : [];
        list.unshift({
          id: generatedBookingId,
          bookingNumber: generatedBookingId,
          vehicle,
          rentalType,
          city: selectedCity,
          pickupLocation: deliveryType === "AIRPORT" ? "Airport Terminal 2" : "City Hub",
          dropLocation: "City Hub",
          startDate,
          endDate,
          pickupTime,
          dropTime,
          addons,
          quote,
          paymentMode: paymentOption,
          paymentStatus: "CONFIRMED",
          paymentMethod,
          razorpayPaymentId: `pay_rzp_${Date.now()}`,
          status: "UPCOMING",
          createdAt: new Date().toISOString(),
          invoiceNumber: generatedInvoiceId,
        });
        localStorage.setItem("pravaas_bookings", JSON.stringify(list));
      } catch {
        // ignore
      }

      setCurrentStep(6);
    }, 1200);
  };

  const stepsList = [
    { num: 1, title: "Trip Details" },
    { num: 2, title: "Add-ons" },
    { num: 3, title: "Instant KYC" },
    { num: 4, title: "Fare & Tax" },
    { num: 5, title: "Payment" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Progress Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#118AB2]">
              Step {Math.min(currentStep, 5)} of 5
            </span>
            <h1 className="text-2xl font-extrabold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit']">
              Complete Your Reservation
            </h1>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#676C8F] font-semibold">{vehicle.title}</span>
            <p className="text-sm font-extrabold text-[#118AB2]">{formatINR(vehicle.dayRate)}/day</p>
          </div>
        </div>

        {/* Multi-Step Stepper Bar */}
        {currentStep <= 5 && (
          <div className="grid grid-cols-5 gap-2">
            {stepsList.map((s) => (
              <div key={s.num} className="space-y-1.5">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStep >= s.num ? "bg-[#118AB2]" : "bg-[#DFDFD5] dark:bg-[#373D60]"
                  }`}
                />
                <p
                  className={`text-[11px] font-bold hidden sm:block ${
                    currentStep === s.num
                      ? "text-[#118AB2]"
                      : currentStep > s.num
                      ? "text-[#464B71] dark:text-[#F2F2ED]"
                      : "text-[#676C8F]"
                  }`}
                >
                  {s.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= STEP 1: TRIP DETAILS ================= */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit'] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#118AB2]" />
            <span>1. Trip Schedule & Handover Hub</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                Pickup City Hub
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-[#F2F2ED]/50 dark:bg-[#464B71] text-sm font-semibold text-[#464B71] dark:text-[#F2F2ED]"
              >
                {INDIAN_CITIES.map((c) => (
                  <option key={c.id} value={c.name} className="dark:bg-[#272B44]">{c.name} ({c.state})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                Handover Location Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType("HUB")}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                    deliveryType === "HUB" ? "bg-[#464B71] text-[#F2F2ED] dark:bg-[#118AB2]" : "bg-[#F2F2ED]/60 dark:bg-[#464B71] text-[#676C8F] border border-[#DFDFD5] dark:border-[#373D60]"
                  }`}
                >
                  City Hub
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType("AIRPORT")}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                    deliveryType === "AIRPORT" ? "bg-[#464B71] text-[#F2F2ED] dark:bg-[#118AB2]" : "bg-[#F2F2ED]/60 dark:bg-[#464B71] text-[#676C8F] border border-[#DFDFD5] dark:border-[#373D60]"
                  }`}
                >
                  Airport
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType("DOORSTEP")}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                    deliveryType === "DOORSTEP" ? "bg-[#464B71] text-[#F2F2ED] dark:bg-[#118AB2]" : "bg-[#F2F2ED]/60 dark:bg-[#464B71] text-[#676C8F] border border-[#DFDFD5] dark:border-[#373D60]"
                  }`}
                >
                  Doorstep
                </button>
              </div>
            </div>
          </div>

          {deliveryType === "DOORSTEP" && (
            <div>
              <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                Doorstep Delivery Address in {selectedCity}
              </label>
              <input
                type="text"
                placeholder="Apartment, Street, Landmark, PIN Code"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#464B71] text-sm text-[#464B71] dark:text-[#F2F2ED]"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F2F2ED]/60 dark:bg-[#464B71]/60 border border-[#DFDFD5] dark:border-[#373D60]">
              <label className="block text-xs font-bold text-[#676C8F] mb-1">Pickup Date & Time</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]"
                />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="bg-transparent text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F2F2ED]/60 dark:bg-[#464B71]/60 border border-[#DFDFD5] dark:border-[#373D60]">
              <label className="block text-xs font-bold text-[#676C8F] mb-1">Drop-Off Date & Time</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]"
                />
                <input
                  type="time"
                  value={dropTime}
                  onChange={(e) => setDropTime(e.target.value)}
                  className="bg-transparent text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="py-3 px-6 rounded-xl bg-[#118AB2] text-white font-bold text-sm shadow-md hover:brightness-105 transition-all flex items-center gap-2"
            >
              <span>Next: Add-ons & Insurance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: ADD-ONS & CHAUFFEUR ================= */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit'] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#118AB2]" />
            <span>2. Optional Add-ons & Chauffeur Services</span>
          </h2>

          <div className="space-y-3">
            {/* Chauffeur */}
            <label className="flex items-center justify-between p-4 rounded-2xl border border-[#DFDFD5] dark:border-[#373D60] bg-[#F2F2ED]/40 dark:bg-[#464B71]/60 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={addons.chauffeur}
                  onChange={(e) => setAddons({ ...addons, chauffeur: e.target.checked })}
                  className="w-5 h-5 text-[#118AB2] rounded"
                />
                <div>
                  <p className="text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]">
                    Verified Highway Chauffeur
                  </p>
                  <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9]">
                    Uniformed, background-checked professional driver for stress-free interstate drives.
                  </p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#118AB2]">+₹1,200/day</span>
            </label>

            {/* Zero-Dep Cover */}
            <label className="flex items-center justify-between p-4 rounded-2xl border border-[#DFDFD5] dark:border-[#373D60] bg-[#F2F2ED]/40 dark:bg-[#464B71]/60 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={addons.zeroDepInsurance}
                  onChange={(e) => setAddons({ ...addons, zeroDepInsurance: e.target.checked })}
                  className="w-5 h-5 text-[#118AB2] rounded"
                />
                <div>
                  <p className="text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]">
                    Zero-Depreciation Excess Protection
                  </p>
                  <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9]">
                    Reduces your liability to zero in the unlikely event of highway scratches or denting.
                  </p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#118AB2]">+₹399/day</span>
            </label>

            {/* Child Seat */}
            <label className="flex items-center justify-between p-4 rounded-2xl border border-[#DFDFD5] dark:border-[#373D60] bg-[#F2F2ED]/40 dark:bg-[#464B71]/60 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={addons.childSeat}
                  onChange={(e) => setAddons({ ...addons, childSeat: e.target.checked })}
                  className="w-5 h-5 text-[#118AB2] rounded"
                />
                <div>
                  <p className="text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]">
                    ISOFIX Child Safety Seat
                  </p>
                  <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9]">
                    Certified crash-tested infant/toddler car seat installed prior to handover.
                  </p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#118AB2]">+₹250/day</span>
            </label>

            {/* Unlimited Km */}
            <label className="flex items-center justify-between p-4 rounded-2xl border border-[#DFDFD5] dark:border-[#373D60] bg-[#F2F2ED]/40 dark:bg-[#464B71]/60 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={addons.unlimitedKm}
                  onChange={(e) => setAddons({ ...addons, unlimitedKm: e.target.checked })}
                  className="w-5 h-5 text-[#118AB2] rounded"
                />
                <div>
                  <p className="text-sm font-bold text-[#464B71] dark:text-[#F2F2ED]">
                    Unlimited Kilometers Package
                  </p>
                  <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9]">
                    No extra km penalty charges. Drive freely across any state borders.
                  </p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#118AB2]">+₹499/day</span>
            </label>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="py-3 px-5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="py-3 px-6 rounded-xl bg-[#118AB2] text-white font-bold text-sm shadow-md hover:brightness-105 transition-all flex items-center gap-2"
            >
              <span>Next: Instant KYC Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: INSTANT KYC ================= */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit'] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>3. DigiLocker & Motor Vehicles Act KYC</span>
            </h2>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/20">
              DPDP Act 2023 Compliant
            </span>
          </div>

          <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9] leading-relaxed">
            As per Indian transport law, we require a valid Driving Licence. For identity proof, your Aadhaar is strictly stored in <strong>masked format (XXXX-XXXX-1234)</strong>. Full 12-digit numbers are never stored.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                Indian Driving Licence Number <span className="text-[#118AB2]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. DL-1420110054321"
                value={dlNumber}
                onChange={(e) => setDlNumber(e.target.value.toUpperCase())}
                className="w-full p-3 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#464B71] text-sm font-mono tracking-wider font-bold text-[#464B71] dark:text-[#F2F2ED]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                DL Expiry Date <span className="text-[#118AB2]">*</span>
              </label>
              <input
                type="date"
                required
                value={dlExpiry}
                onChange={(e) => setDlExpiry(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#464B71] text-sm font-semibold text-[#464B71] dark:text-[#F2F2ED]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
              Masked Aadhaar Number (Last 4 Digits) <span className="text-[#118AB2]">*</span>
            </label>
            <input
              type="text"
              placeholder="XXXX-XXXX-8924"
              value={maskedAadhaar}
              onChange={(e) => setMaskedAadhaar(e.target.value)}
              className="w-full sm:w-1/2 p-3 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#464B71] text-sm font-mono tracking-wider font-bold text-[#464B71] dark:text-[#F2F2ED]"
            />
          </div>

          <label className="flex items-start gap-2.5 text-xs text-[#676C8F] dark:text-[#A5ABC9] cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={kycConsent}
              onChange={(e) => setKycConsent(e.target.checked)}
              className="w-4 h-4 text-[#118AB2] rounded mt-0.5"
            />
            <span>
              I authorize PRAVAAS Mobility to digitally verify my driving credentials via Parivahan/DigiLocker and agree to the vehicle usage terms under the Motor Vehicles Act 1988.
            </span>
          </label>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="py-3 px-5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              disabled={!kycConsent || !dlNumber}
              onClick={() => {
                submitKyc(dlNumber, dlExpiry, maskedAadhaar);
                setCurrentStep(4);
              }}
              className="py-3 px-6 rounded-xl bg-[#118AB2] text-white font-bold text-sm shadow-md hover:brightness-105 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <span>Next: Fare Breakdown & GST</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: FARE & TAX BREAKDOWN ================= */}
      {currentStep === 4 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit'] flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#118AB2]" />
            <span>4. Transparent Price Breakup (GST 18% Compliant)</span>
          </h2>

          {/* Coupon Input */}
          <div className="p-4 rounded-2xl bg-[#F2F2ED]/50 dark:bg-[#464B71]/60 border border-[#DFDFD5] dark:border-[#373D60] space-y-2">
            <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED]">
              Have a Promo or Festival Coupon Code?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. FIRST100, DIWALI2026, GOAWEEKEND"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  setCouponMsg(null);
                }}
                className="flex-1 p-2.5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#272B44] text-xs font-mono font-bold tracking-wider text-[#464B71] dark:text-[#F2F2ED]"
              />
              <button
                type="button"
                onClick={() => {
                  if (quote.appliedCoupon) {
                    setCouponMsg(`Coupon ${quote.appliedCoupon.code} applied! Saved ₹${quote.appliedCoupon.discountAmount}`);
                  } else {
                    setCouponMsg("Invalid or inapplicable coupon for this order value.");
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-[#464B71] text-[#F2F2ED] text-xs font-bold hover:bg-[#118AB2]"
              >
                Apply
              </button>
            </div>
            {quote.appliedCoupon && (
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{quote.appliedCoupon.description} (-{formatINR(quote.appliedCoupon.discountAmount)})</span>
              </p>
            )}
            {couponMsg && !quote.appliedCoupon && (
              <p className="text-xs text-red-500 font-semibold">{couponMsg}</p>
            )}
          </div>

          {/* Detailed Line Items */}
          <div className="space-y-3 pt-2 text-xs sm:text-sm">
            <div className="flex justify-between text-[#676C8F] dark:text-[#A5ABC9]">
              <span>Base Fare ({quote.totalDays} Days @ {formatINR(vehicle.dayRate)}/day)</span>
              <span className="font-semibold text-[#464B71] dark:text-[#F2F2ED]">{formatINR(quote.baseFare)}</span>
            </div>

            {quote.driverFare > 0 && (
              <div className="flex justify-between text-[#676C8F] dark:text-[#A5ABC9]">
                <span>Chauffeur Service Fee ({quote.totalDays} Days)</span>
                <span className="font-semibold text-[#464B71] dark:text-[#F2F2ED]">{formatINR(quote.driverFare)}</span>
              </div>
            )}

            {quote.addonsTotal > 0 && (
              <div className="flex justify-between text-[#676C8F] dark:text-[#A5ABC9]">
                <span>Selected Add-ons & Protection</span>
                <span className="font-semibold text-[#464B71] dark:text-[#F2F2ED]">{formatINR(quote.addonsTotal)}</span>
              </div>
            )}

            {quote.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-bold">
                <span>Promotional Discount</span>
                <span>-{formatINR(quote.discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#676C8F] dark:text-[#A5ABC9]">
              <span>GST 18% (9% CGST + 9% SGST • SAC 996601)</span>
              <span className="font-semibold text-[#464B71] dark:text-[#F2F2ED]">{formatINR(quote.gstAmount)}</span>
            </div>

            <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/70 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20">
              <span>Refundable Security Deposit (Returned in 2 hrs)</span>
              <span>{formatINR(quote.securityDeposit)}</span>
            </div>

            <div className="pt-3 border-t border-[#DFDFD5] dark:border-[#373D60] flex justify-between items-baseline font-bold text-base sm:text-lg text-[#464B71] dark:text-[#F2F2ED]">
              <span>Total Trip Amount</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#118AB2] num-tabular">
                {formatINR(quote.grandTotal)}
              </span>
            </div>
          </div>

          {/* Payment Option Selector (20% vs Full) */}
          <div className="pt-4 border-t border-[#DFDFD5] dark:border-[#373D60] space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#676C8F]">
              Select Payment Option
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setPaymentOption("FULL")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentOption === "FULL"
                    ? "border-[#118AB2] bg-[#118AB2]/10 ring-2 ring-[#118AB2]/30"
                    : "border-[#DFDFD5] dark:border-[#373D60]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-[#464B71] dark:text-[#F2F2ED]">Pay 100% Full Fare</span>
                  <input type="radio" checked={paymentOption === "FULL"} readOnly className="accent-[#118AB2]" />
                </div>
                <p className="text-xs text-[#676C8F] dark:text-[#8D93B4]">Pay entire amount now. Zero hassles at vehicle pickup.</p>
                <p className="text-base font-extrabold text-[#118AB2] mt-2 num-tabular">
                  {formatINR(quote.payableNowFull)}
                </p>
              </label>

              <label
                onClick={() => setPaymentOption("PARTIAL_20")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentOption === "PARTIAL_20"
                    ? "border-[#118AB2] bg-[#118AB2]/10 ring-2 ring-[#118AB2]/30"
                    : "border-[#DFDFD5] dark:border-[#373D60]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-[#464B71] dark:text-[#F2F2ED]">Pay 20% Now, Rest Later</span>
                  <input type="radio" checked={paymentOption === "PARTIAL_20"} readOnly className="accent-[#118AB2]" />
                </div>
                <p className="text-xs text-[#676C8F] dark:text-[#8D93B4]">
                  Pay 20% booking token + deposit today. Remaining {formatINR(quote.remainingPayableAtPickup)} at pickup.
                </p>
                <p className="text-base font-extrabold text-[#118AB2] mt-2 num-tabular">
                  {formatINR(quote.payableNowPartial)}
                </p>
              </label>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(3)}
              className="py-3 px-5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="py-3 px-6 rounded-xl bg-[#118AB2] text-white font-bold text-sm shadow-md hover:brightness-105 transition-all flex items-center gap-2"
            >
              <span>Proceed to Razorpay Checkout ({formatINR(amountToPay)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 5: RAZORPAY PAYMENT GATEWAY ================= */}
      {currentStep === 5 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DFDFD5] dark:border-[#373D60]">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-[#7CD5C7]/20 text-[#118AB2] border border-[#7CD5C7]/30">
                Razorpay Checkout 2026
              </span>
              <h2 className="text-lg font-bold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit'] mt-1">
                Select Indian Payment Method
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#676C8F]">Amount Due:</span>
              <p className="text-xl font-extrabold text-[#118AB2] num-tabular">
                {formatINR(amountToPay)}
              </p>
            </div>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="grid grid-cols-4 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setPaymentMethod("UPI")}
              className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all ${
                paymentMethod === "UPI"
                  ? "bg-[#118AB2] text-white shadow-md"
                  : "bg-[#F2F2ED] dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]"
              }`}
            >
              <QrCode className="w-5 h-5 text-[#7CD5C7]" />
              <span>UPI / QR</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("CARD")}
              className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all ${
                paymentMethod === "CARD"
                  ? "bg-[#118AB2] text-white shadow-md"
                  : "bg-[#F2F2ED] dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]"
              }`}
            >
              <CreditCard className="w-5 h-5 text-[#7CD5C7]" />
              <span>Cards (RuPay)</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("NETBANKING")}
              className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all ${
                paymentMethod === "NETBANKING"
                  ? "bg-[#118AB2] text-white shadow-md"
                  : "bg-[#F2F2ED] dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]"
              }`}
            >
              <ShieldCheck className="w-5 h-5 text-[#7CD5C7]" />
              <span>NetBanking</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("WALLET")}
              className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all ${
                paymentMethod === "WALLET"
                  ? "bg-[#118AB2] text-white shadow-md"
                  : "bg-[#F2F2ED] dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]"
              }`}
            >
              <Sparkles className="w-5 h-5 text-[#7CD5C7]" />
              <span>Wallets</span>
            </button>
          </div>

          {/* Tab 1: UPI Options */}
          {paymentMethod === "UPI" && (
            <div className="space-y-4 p-5 rounded-2xl bg-[#F2F2ED]/50 dark:bg-[#464B71]/50 border border-[#DFDFD5] dark:border-[#373D60]">
              <p className="text-xs font-bold text-[#464B71] dark:text-[#F2F2ED]">
                Choose UPI App or Scan Dynamic QR
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "GPAY", label: "Google Pay" },
                  { id: "PHONEPE", label: "PhonePe" },
                  { id: "PAYTM", label: "Paytm UPI" },
                ].map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setSelectedUpiApp(app.id)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedUpiApp === app.id
                        ? "border-[#118AB2] bg-white dark:bg-[#272B44] text-[#118AB2] shadow-xs"
                        : "border-[#DFDFD5] dark:border-[#373D60] text-[#464B71] dark:text-[#F2F2ED]"
                    }`}
                  >
                    {app.label}
                  </button>
                ))}
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-[#676C8F]">or enter UPI ID</span>
                <input
                  type="text"
                  placeholder="mobilenumber@upi or name@okhdfcbank"
                  className="mt-1 w-full p-2.5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#272B44] text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED]"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Cards */}
          {paymentMethod === "CARD" && (
            <div className="space-y-3 p-5 rounded-2xl bg-[#F2F2ED]/50 dark:bg-[#464B71]/50 border border-[#DFDFD5] dark:border-[#373D60]">
              <div>
                <label className="block text-xs font-bold text-[#676C8F] mb-1">Card Number (RuPay, Visa, MC)</label>
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8924"
                  className="w-full p-2.5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#272B44] text-xs font-mono font-bold text-[#464B71] dark:text-[#F2F2ED]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#676C8F] mb-1">Valid Thru</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-2.5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#272B44] text-xs font-bold text-[#464B71] dark:text-[#F2F2ED]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#676C8F] mb-1">CVV</label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="•••"
                    className="w-full p-2.5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] bg-white dark:bg-[#272B44] text-xs font-bold text-[#464B71] dark:text-[#F2F2ED]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: NetBanking */}
          {paymentMethod === "NETBANKING" && (
            <div className="p-5 rounded-2xl bg-[#F2F2ED]/50 dark:bg-[#464B71]/50 border border-[#DFDFD5] dark:border-[#373D60] space-y-2">
              <label className="block text-xs font-bold text-[#676C8F]">Popular Indian Banks</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {["HDFC Bank", "State Bank of India (SBI)", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Bank of Baroda"].map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    className="p-2.5 rounded-xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] hover:border-[#118AB2] text-left text-xs text-[#464B71] dark:text-[#F2F2ED]"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Wallets */}
          {paymentMethod === "WALLET" && (
            <div className="p-5 rounded-2xl bg-[#F2F2ED]/50 dark:bg-[#464B71]/50 border border-[#DFDFD5] dark:border-[#373D60] space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {["Paytm Wallet", "Amazon Pay", "Mobikwik", "Freecharge"].map((w) => (
                  <button
                    key={w}
                    type="button"
                    className="p-3 rounded-xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] hover:border-[#118AB2] text-left text-[#464B71] dark:text-[#F2F2ED]"
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(4)}
              className="py-3 px-5 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              disabled={isProcessingPayment}
              onClick={handleSimulatePayment}
              className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#118AB2] to-[#0D6E8E] text-white font-extrabold text-sm shadow-xl hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isProcessingPayment ? "Authorizing via Gateway..." : `Pay ${formatINR(amountToPay)} Now`}</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 6: CONFIRMATION & TICKET PASS ================= */}
      {currentStep === 6 && (
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg animate-bounce border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
              Payment Confirmed • FASTag Active
            </span>
            <h2 className="text-3xl font-extrabold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit'] mt-2">
              Safe Journeys! Your Machine is Reserved
            </h2>
            <p className="text-xs sm:text-sm text-[#676C8F] dark:text-[#A5ABC9] max-w-md mx-auto">
              A confirmation WhatsApp & SMS has been triggered to your registered mobile number with driver and handover details.
            </p>
          </div>

          {/* Ticket Pass Preview */}
          <div className="max-w-md mx-auto p-6 rounded-3xl bg-[#F2F2ED]/50 dark:bg-[#464B71]/80 border border-[#DFDFD5] dark:border-[#373D60] text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-[#DFDFD5] dark:border-[#373D60] pb-2">
              <span className="text-[#676C8F]">Booking Reference:</span>
              <span className="font-bold text-[#118AB2]">{bookingId}</span>
            </div>
            <div className="flex justify-between border-b border-[#DFDFD5] dark:border-[#373D60] pb-2">
              <span className="text-[#676C8F]">Vehicle:</span>
              <span className="font-bold text-[#464B71] dark:text-[#F2F2ED]">{vehicle.title}</span>
            </div>
            <div className="flex justify-between border-b border-[#DFDFD5] dark:border-[#373D60] pb-2">
              <span className="text-[#676C8F]">Pickup Date:</span>
              <span className="font-bold text-[#464B71] dark:text-[#F2F2ED]">{startDate} @ {pickupTime}</span>
            </div>
            <div className="flex justify-between border-b border-[#DFDFD5] dark:border-[#373D60] pb-2">
              <span className="text-[#676C8F]">Location:</span>
              <span className="font-bold text-[#464B71] dark:text-[#F2F2ED]">{selectedCity} Hub</span>
            </div>
            <div className="flex justify-between border-b border-[#DFDFD5] dark:border-[#373D60] pb-2">
              <span className="text-[#676C8F]">Amount Paid Today:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">{formatINR(amountToPay)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#676C8F]">GST Invoice Number:</span>
              <span className="font-bold text-[#464B71] dark:text-[#F2F2ED]">{invoiceId}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#464B71] hover:bg-[#118AB2] text-[#F2F2ED] text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>View In User Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard?tab=invoices"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#DFDFD5] dark:border-[#373D60] text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] hover:bg-[#F2F2ED] dark:hover:bg-[#373D60] transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-[#118AB2]" />
              <span>Download GST Tax Receipt</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Checkout...</div>}>
      <BookingFlowContent slug={slug} />
    </Suspense>
  );
}
