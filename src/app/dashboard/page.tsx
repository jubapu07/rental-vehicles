"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Car,
  FileText,
  Heart,
  ShieldCheck,
  User,
  Calendar,
  MapPin,
  Clock,
  Download,
  AlertCircle,
  XCircle,
  ExternalLink,
  ChevronRight,
  Printer,
  Sparkles,
  Phone,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useSavedCars } from "@/context/SavedCarsContext";
import { INDIAN_VEHICLES } from "@/lib/indianVehicles";
import { formatINR } from "@/lib/i18n";
import { BookingRecord } from "@/lib/types";

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "bookings";

  const { user } = useAuth();
  const { savedIds, toggleSave } = useSavedCars();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<BookingRecord | null>(null);
  const [cancelModalBooking, setCancelModalBooking] = useState<BookingRecord | null>(null);

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("pravaas_bookings");
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        // Sample seed booking for demo review
        const sampleThar = INDIAN_VEHICLES.find((v) => v.id === "mahindra-thar-2024") || INDIAN_VEHICLES[0];
        const defaultSample: BookingRecord[] = [
          {
            id: "PRV-2026-9812",
            bookingNumber: "PRV-2026-9812",
            vehicle: sampleThar,
            rentalType: "SELF_DRIVE",
            city: "Goa",
            pickupLocation: "Mopa Airport Hub T1",
            dropLocation: "Mopa Airport Hub T1",
            startDate: "2026-11-10",
            endDate: "2026-11-14",
            pickupTime: "11:00",
            dropTime: "11:00",
            addons: {
              chauffeur: false,
              childSeat: false,
              zeroDepInsurance: true,
              gpsNavigator: false,
              unlimitedKm: true,
            },
            quote: {
              totalHours: 96,
              totalDays: 4,
              baseFare: 15596,
              driverFare: 0,
              addonsTotal: 3596,
              discountAmount: 750,
              taxableAmount: 18442,
              gstAmount: 3320,
              securityDeposit: 4000,
              grandTotal: 25762,
              payableNowFull: 25762,
              payableNowPartial: 7990,
              remainingPayableAtPickup: 0,
              appliedCoupon: {
                code: "GOAWEEKEND",
                discountAmount: 750,
                description: "Flat ₹750 off on 3+ day coastal self-drives",
              },
            },
            paymentMode: "FULL",
            paymentStatus: "CONFIRMED",
            paymentMethod: "UPI",
            razorpayPaymentId: "pay_rzp_9812481",
            status: "UPCOMING",
            createdAt: "2026-10-14T10:30:00Z",
            invoiceNumber: "INV-2026-0842",
          },
        ];
        setBookings(defaultSample);
        localStorage.setItem("pravaas_bookings", JSON.stringify(defaultSample));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleCancelBooking = (id: string) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: "CANCELLED" as const } : b));
    setBookings(updated);
    try {
      localStorage.setItem("pravaas_bookings", JSON.stringify(updated));
    } catch {
      // ignore
    }
    setCancelModalBooking(null);
  };

  const savedVehiclesList = INDIAN_VEHICLES.filter((v) => savedIds.includes(v.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner with User Greeting */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B192C] to-[#1E3E62] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
            alt={user?.name || "User"}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-['Outfit']">
                Namaste, {user?.name || "Explorer"}
              </h1>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                KYC Verified
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              +91 {user?.phone || "9876543210"} • {user?.email || "customer@pravaas.in"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/explore"
            className="px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#0D6E8E] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Car className="w-4 h-4" />
            <span>Book New Trip</span>
          </Link>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
        {[
          { id: "bookings", label: `My Bookings (${bookings.length})`, icon: Car },
          { id: "invoices", label: "GST Tax Invoices", icon: FileText },
          { id: "saved", label: `Saved Garage (${savedVehiclesList.length})`, icon: Heart },
          { id: "kyc", label: "KYC Vault", icon: ShieldCheck },
          { id: "profile", label: "Profile & Security", icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl shrink-0 flex items-center gap-2 transition-all ${
                isActive
                  ? "bg-[#0B192C] text-white dark:bg-[#EA580C] shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: BOOKINGS ================= */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No active or past bookings found
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Ready for your next road trip? Explore Thar 4x4, Fortuner, Creta or electric vehicles.
              </p>
              <Link
                href="/explore"
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA580C] text-white text-xs font-bold"
              >
                <span>Browse Rental Fleet</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={booking.vehicle.images[0]?.url || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"}
                    alt={booking.vehicle.title}
                    className="w-28 h-20 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {booking.bookingNumber}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          booking.status === "UPCOMING"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            : booking.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {booking.vehicle.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                      <span><MapPin className="w-3 h-3 inline text-[#EA580C]" /> {booking.city}</span>
                      <span>•</span>
                      <span><Calendar className="w-3 h-3 inline text-blue-500" /> {booking.startDate} to {booking.endDate}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left md:text-right">
                    <p className="text-[11px] text-slate-400">Total Paid (with 18% GST)</p>
                    <p className="text-lg font-extrabold text-[#EA580C] num-tabular">
                      {formatINR(booking.quote.grandTotal)}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-semibold">
                      Security Deposit: {formatINR(booking.quote.securityDeposit)} (Refundable)
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedInvoice(booking);
                        setActiveTab("invoices");
                      }}
                      className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-[#EA580C]"
                    >
                      GST Invoice
                    </button>
                    {booking.status === "UPCOMING" && (
                      <button
                        onClick={() => setCancelModalBooking(booking)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ================= TAB 2: GST INVOICES ================= */}
      {activeTab === "invoices" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 print:shadow-none">
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-[#EA580C]">
                  Tax Invoice (Rule 46 CGST Rules 2017)
                </span>
                <h2 className="text-2xl font-bold font-['Outfit'] mt-1 text-slate-900 dark:text-white">
                  PRAVAAS Mobility Technologies Pvt. Ltd.
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  GSTIN: <strong className="font-mono text-slate-800 dark:text-slate-200">29AAACP8921M1ZT</strong> | State: 29-Karnataka
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#0B192C] text-white text-xs font-bold flex items-center gap-2 hover:brightness-110"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
            </div>

            {/* Invoice Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-xs">
              <div>
                <span className="text-slate-400">Invoice Number:</span>
                <p className="font-mono font-bold text-slate-900 dark:text-white">
                  {selectedInvoice?.invoiceNumber || "INV-2026-0842"}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Invoice Date:</span>
                <p className="font-bold text-slate-900 dark:text-white">
                  {selectedInvoice?.createdAt.split("T")[0] || "2026-10-14"}
                </p>
              </div>
              <div>
                <span className="text-slate-400">SAC Code:</span>
                <p className="font-bold text-slate-900 dark:text-white">996601 (Passenger Transport)</p>
              </div>
              <div>
                <span className="text-slate-400">Payment Status:</span>
                <p className="font-bold text-emerald-600">PAID VIA RAZORPAY UPI</p>
              </div>
            </div>

            {/* Billed To */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Billed To Customer:</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{user?.name || "Arjun Sharma"}</p>
              <p className="text-slate-500">Phone: +91 {user?.phone || "9876543210"} • DL: {user?.kyc.drivingLicenseNumber || "DL-1420110054321"}</p>
              <p className="text-slate-500">Place of Supply: {selectedInvoice?.city || "Goa"} (State Code: 30)</p>
            </div>

            {/* Line Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5">Description</th>
                    <th className="py-2.5">SAC</th>
                    <th className="py-2.5 text-right">Taxable Value</th>
                    <th className="py-2.5 text-right">CGST (9%)</th>
                    <th className="py-2.5 text-right">SGST (9%)</th>
                    <th className="py-2.5 text-right">Total (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="py-3">
                      <p className="font-bold text-slate-900 dark:text-white">
                        Self-Drive Motor Vehicle Rental: {selectedInvoice?.vehicle.title || "Mahindra Thar LX 4x4 Hard Top"}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Period: {selectedInvoice?.startDate || "2026-11-10"} to {selectedInvoice?.endDate || "2026-11-14"} ({selectedInvoice?.quote.totalDays || 4} Days)
                      </p>
                    </td>
                    <td className="py-3 font-mono">996601</td>
                    <td className="py-3 text-right font-bold text-slate-900 dark:text-white">
                      {formatINR(selectedInvoice?.quote.taxableAmount || 18442)}
                    </td>
                    <td className="py-3 text-right">
                      {formatINR(Math.round((selectedInvoice?.quote.gstAmount || 3320) / 2))}
                    </td>
                    <td className="py-3 text-right">
                      {formatINR(Math.round((selectedInvoice?.quote.gstAmount || 3320) / 2))}
                    </td>
                    <td className="py-3 text-right font-extrabold text-slate-900 dark:text-white">
                      {formatINR((selectedInvoice?.quote.taxableAmount || 18442) + (selectedInvoice?.quote.gstAmount || 3320))}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <p className="font-bold text-slate-900 dark:text-white">
                        Refundable Security Deposit (Pure Agent Basis - Non Taxable)
                      </p>
                      <p className="text-[11px] text-slate-500">Refunded within 2 hrs of post-trip vehicle return</p>
                    </td>
                    <td className="py-3 font-mono">—</td>
                    <td className="py-3 text-right font-bold text-slate-900 dark:text-white">
                      {formatINR(selectedInvoice?.quote.securityDeposit || 4000)}
                    </td>
                    <td className="py-3 text-right">₹0</td>
                    <td className="py-3 text-right">₹0</td>
                    <td className="py-3 text-right font-extrabold text-slate-900 dark:text-white">
                      {formatINR(selectedInvoice?.quote.securityDeposit || 4000)}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-900 dark:border-white font-bold text-sm">
                    <td colSpan={5} className="py-3 text-right text-slate-900 dark:text-white">
                      Grand Total Amount Paid (INR):
                    </td>
                    <td className="py-3 text-right text-[#EA580C] font-extrabold text-base num-tabular">
                      {formatINR(selectedInvoice?.quote.grandTotal || 25762)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <p className="text-[10px] text-slate-400 italic">
              * This is a computer-generated tax invoice under Electronic Cash Ledger reconciliation and requires no physical signature.
            </p>
          </div>
        </div>
      )}

      {/* ================= TAB 3: SAVED GARAGE ================= */}
      {activeTab === "saved" && (
        <div className="space-y-4">
          {savedVehiclesList.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Your saved wishlist is empty
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Save machines from our fleet to track pricing and availability.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedVehiclesList.map((car) => (
                <div
                  key={car.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg transition-all p-4 space-y-3"
                >
                  <img
                    src={car.images[0]?.url}
                    alt={car.title}
                    className="w-full h-40 object-cover rounded-2xl"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{car.title}</h4>
                    <p className="text-xs text-slate-500">{car.specs.fuelType} • {car.specs.transmission} • {car.city}</p>
                    <p className="text-base font-extrabold text-[#EA580C] mt-1">{formatINR(car.dayRate)}/day</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleSave(car.id)}
                      className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400"
                    >
                      Remove
                    </button>
                    <Link
                      href={`/vehicles/${car.slug}`}
                      className="flex-1 py-2 rounded-xl bg-[#EA580C] text-white text-xs font-bold text-center"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 4: KYC VAULT ================= */}
      {activeTab === "kyc" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
                DigiLocker Verified
              </span>
              <h2 className="text-xl font-bold font-['Outfit'] mt-1 text-slate-900 dark:text-white">
                KYC Identity & Driving Verification Vault
              </h2>
            </div>
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Indian Driving Licence</span>
              <p className="font-mono text-base font-bold text-slate-900 dark:text-white">
                {user?.kyc.drivingLicenseNumber || "DL-0420180054321"}
              </p>
              <p className="text-xs text-slate-500">
                Valid Till: {user?.kyc.dlExpiryDate || "2032-12-31"} (Active Commercial / Non-Transport)
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified with Parivahan Sarathi</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Masked Identity Proof (DPDP 2023)</span>
              <p className="font-mono text-base font-bold text-slate-900 dark:text-white">
                {user?.kyc.maskedAadhaar || "XXXX-XXXX-8924"}
              </p>
              <p className="text-xs text-slate-500">
                Aadhaar Offline XML e-KYC (UIDAI Compliant)
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero full-Aadhaar storage</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: PROFILE & SECURITY ================= */}
      {activeTab === "profile" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <h2 className="text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
            Profile & Communication Preferences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <label className="block text-slate-500 mb-1">Registered Indian Mobile</label>
              <input
                type="text"
                disabled
                value={`+91 ${user?.phone || "9876543210"}`}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Email for Invoices</label>
              <input
                type="email"
                disabled
                value={user?.email || "customer@pravaas.in"}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-bold"
              />
            </div>
          </div>
        </div>
      )}

      {/* Cancel Booking Confirmation Modal */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-sm w-full space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Cancel Booking {cancelModalBooking.bookingNumber}?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              As per our free cancellation policy, 100% full refund ({formatINR(cancelModalBooking.quote.grandTotal)}) will be credited directly to your original payment account within 2 hours.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setCancelModalBooking(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancelBooking(cancelModalBooking.id)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
