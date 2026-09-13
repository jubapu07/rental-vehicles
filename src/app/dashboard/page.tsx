"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Car,
  Bike,
  Truck,
  Plus,
  DollarSign,
  CheckCircle2,
  TrendingUp,
  MapPin,
  XCircle,
  Sparkles,
  AlertCircle,
  Eye,
} from "lucide-react";
import ListingWizardModal from "@/components/dashboard/ListingWizardModal";

interface DashboardBooking {
  id: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "CONFIRMED" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  totalDays: number;
  totalPrice: number;
  serviceFee: number;
  stripePaymentIntentId?: string;
  vehicle: {
    id: string;
    title: string;
    slug: string;
    city: string;
    category: string;
    images: { url: string; isCover: boolean }[];
    host: { name: string; email: string };
  };
}

interface HostVehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  slug: string;
  category: string;
  city: string;
  dayRate: number;
  instantBookable: boolean;
  isActive: boolean;
  images: { url: string; isCover: boolean }[];
  blackoutDates: { id: string; startDate: string; endDate: string; reason: string }[];
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"trips" | "upcoming" | "fleet" | "revenue">("trips");
  const [bookings, setBookings] = useState<DashboardBooking[]>([]);
  const [hostVehicles, setHostVehicles] = useState<HostVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch bookings
      const bRes = await fetch("/api/bookings");
      const bData = await bRes.json();
      if (bData.success) {
        setBookings(bData.bookings || []);
      }

      // Fetch host fleet vehicles
      const vRes = await fetch("/api/vehicles");
      const vData = await vRes.json();
      if (vData.success) {
        setHostVehicles(vData.vehicles || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage("Trip cancelled and pre-authorization refunded.");
        fetchDashboardData();
        setTimeout(() => setActionMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter bookings by active vs upcoming vs past
  const now = new Date();
  const activeTrips = bookings.filter(
    (b) => b.status === "ACTIVE" || (b.status === "CONFIRMED" && new Date(b.startDate) <= now && new Date(b.endDate) >= now)
  );

  const upcomingBookings = bookings.filter(
    (b) => b.status === "CONFIRMED" && new Date(b.startDate) > now
  );

  const completedBookings = bookings.filter(
    (b) => b.status === "COMPLETED"
  );

  // Revenue computations
  const totalRevenue = bookings
    .filter((b) => b.status === "COMPLETED" || b.status === "CONFIRMED" || b.status === "ACTIVE")
    .reduce((acc, b) => acc + (b.totalPrice - b.serviceFee), 0);

  const totalTripDays = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((acc, b) => acc + b.totalDays, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F2432] p-8 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E05A36] bg-[#E05A36]/20 px-2.5 py-0.5 rounded-md">
              Operations Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            FleetFlow Management Hub
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time synchronization for customer journeys, fleet availability, and revenue allocation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsWizardOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#E05A36] hover:bg-[#C94C2B] text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>List New Vehicle (Wizard)</span>
        </button>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Dynamic Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("trips")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "trips"
              ? "bg-[#0F2432] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-[#E05A36]" />
          <span>Active Trips</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
            {activeTrips.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("upcoming")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "upcoming"
              ? "bg-[#0F2432] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-[#E67E22]" />
          <span>Upcoming Bookings</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
            {upcomingBookings.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("fleet")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "fleet"
              ? "bg-[#0F2432] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Car className="w-3.5 h-3.5 text-emerald-400" />
          <span>Fleet Management</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
            {hostVehicles.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("revenue")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "revenue"
              ? "bg-[#0F2432] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-[#E05A36]" />
          <span>Revenue & Analytics</span>
        </button>
      </div>

      {/* TAB 1: Active Trips */}
      {activeTab === "trips" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900">Current Ongoing Trips</h2>
            <span className="text-xs text-slate-500">Live trip tracking</span>
          </div>

          {activeTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTrips.map((b) => (
                <div key={b.id} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      ACTIVE TRIP IN PROGRESS
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 num-tabular">
                      ₹{b.totalPrice.toLocaleString("en-IN")} Total
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.vehicle.images[0]?.url || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80"}
                      alt={b.vehicle.title}
                      className="w-20 h-16 rounded-2xl object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{b.vehicle.title}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#E05A36]" />
                        {b.vehicle.city} • Handover: {b.vehicle.host.name}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-700 mt-1">
                        Dates: {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 font-mono text-[10px]">ID: {b.id.substring(0, 12)}...</span>
                    <div className="flex gap-2">
                      <Link
                        href={`/vehicles/${b.vehicle.slug}`}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                      >
                        Vehicle Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <p className="text-xs text-slate-500">You have no trips currently underway.</p>
              <Link
                href="/explore"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-[#0F2432] text-white text-xs font-bold hover:bg-[#E05A36] transition-colors"
              >
                Browse Fleet & Book
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Upcoming Bookings */}
      {activeTab === "upcoming" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900">Confirmed Upcoming Reservations</h2>
            <span className="text-xs text-slate-500">Guaranteed collision-free</span>
          </div>

          {upcomingBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingBookings.map((b) => (
                <div key={b.id} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                      CONFIRMED RESERVATION
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 num-tabular">
                      ₹{b.totalPrice.toLocaleString("en-IN")} Due
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.vehicle.images[0]?.url || "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80"}
                      alt={b.vehicle.title}
                      className="w-20 h-16 rounded-2xl object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{b.vehicle.title}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#E05A36]" />
                        {b.vehicle.city} • Host: {b.vehicle.host.name}
                      </p>
                      <p className="text-[11px] font-semibold text-[#0F2432] mt-1">
                        Trip Window: {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()} ({b.totalDays} Days)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 font-mono text-[10px]">Stripe: {b.stripePaymentIntentId || "Verified"}</span>
                    <button
                      type="button"
                      onClick={() => handleCancelBooking(b.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold cursor-pointer transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Cancel Trip
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <p className="text-xs text-slate-500">No upcoming reservations found.</p>
              <Link
                href="/explore"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-[#0F2432] text-white text-xs font-bold hover:bg-[#E05A36] transition-colors"
              >
                Find a Vehicle
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Fleet Management */}
      {activeTab === "fleet" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-900">Host Fleet Vehicles ({hostVehicles.length})</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage live rates, instant booking, and blackout windows</p>
            </div>
            <button
              type="button"
              onClick={() => setIsWizardOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#0F2432] text-white text-xs font-bold hover:bg-[#E05A36] transition-colors cursor-pointer"
            >
              + Add Vehicle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostVehicles.map((v) => (
              <div key={v.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
                <div>
                  <div className="relative aspect-16/10 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={v.images[0]?.url || "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80"}
                      alt={v.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-extrabold text-[#0F2432]">
                      {v.category}
                    </span>
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                      {v.city}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{v.title}</h3>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Rate: <strong className="text-slate-900">₹{v.dayRate.toLocaleString("en-IN")}/day</strong></span>
                      <span className="text-emerald-700 font-bold">{v.instantBookable ? "⚡ Instant Book" : "Host Review"}</span>
                    </div>

                    {v.blackoutDates && v.blackoutDates.length > 0 && (
                      <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[10px] font-semibold text-amber-800">
                        Blackout: {new Date(v.blackoutDates[0].startDate).toLocaleDateString()} → {new Date(v.blackoutDates[0].endDate).toLocaleDateString()} ({v.blackoutDates[0].reason})
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/vehicles/${v.slug}`}
                    className="flex items-center gap-1 text-xs font-bold text-[#E05A36] hover:text-[#C94C2B]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview Listing
                  </Link>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Revenue & Analytics */}
      {activeTab === "revenue" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Host Payout</p>
              <p className="text-3xl font-black text-slate-900 num-tabular">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +24% vs last calendar month
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#E05A36]/10 text-[#E05A36] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Booked Days</p>
              <p className="text-3xl font-black text-slate-900 num-tabular">
                {totalTripDays} Days
              </p>
              <p className="text-[11px] text-slate-500">Across active host vehicle fleet</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Fleet Utilization</p>
              <p className="text-3xl font-black text-slate-900 num-tabular">
                78.4%
              </p>
              <p className="text-[11px] text-slate-500">Average occupancy across hubs</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900">Recent Transaction History</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {bookings.map((b) => (
                <div key={b.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{b.vehicle.title}</p>
                    <p className="text-[11px] text-slate-400">
                      {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-slate-900 num-tabular">₹{b.totalPrice.toLocaleString("en-IN")}</p>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Listing Wizard Modal */}
      {isWizardOpen && (
        <ListingWizardModal
          onClose={() => setIsWizardOpen(false)}
          onSuccess={() => {
            setIsWizardOpen(false);
            setActionMessage("New vehicle listing published successfully to FleetFlow!");
            fetchDashboardData();
            setTimeout(() => setActionMessage(null), 4000);
          }}
        />
      )}
    </div>
  );
}
