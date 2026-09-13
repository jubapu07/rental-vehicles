import Link from "next/link";
import { prisma } from "@/lib/prisma";
import UniversalSearchRibbon from "@/components/search/UniversalSearchRibbon";
import VehicleCard from "@/components/vehicle/VehicleCard";
import { Car, Bike, Truck, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { VehicleData } from "@/lib/types";

// Force dynamic rendering to always query fresh active database records
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch featured vehicles from active database
  const vehicles = await prisma.vehicle.findMany({
    where: { isActive: true },
    take: 8,
    orderBy: { createdAt: "desc" },
    include: {
      host: true,
      specs: true,
      images: { orderBy: { sortOrder: "asc" } },
      reviews: {
        include: {
          author: true,
        },
      },
    },
  });

  // Calculate review averages
  const enrichedVehicles: VehicleData[] = vehicles.map((v) => {
    const totalReviews = v.reviews.length;
    const avgRating = totalReviews > 0
      ? Math.round((v.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews) * 10) / 10
      : 5.0;

    return {
      ...v,
      category: v.category as "CAR" | "MOTORCYCLE" | "TRUCK",
      specs: v.specs as unknown as VehicleData["specs"],
      avgRating,
      reviewCount: totalReviews,
    };
  });

  // Dynamic fleet counts
  const [totalVehicles, totalBookings, totalHosts] = await Promise.all([
    prisma.vehicle.count({ where: { isActive: true } }),
    prisma.booking.count(),
    prisma.user.count({ where: { role: "HOST" } }),
  ]);

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-[#F8FAFC]">
        {/* Background Ambient Glows */}
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-400/15 via-[#E05A36]/15 to-emerald-400/10 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto text-center space-y-8">
          {/* Top Live Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xs border border-slate-200">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-800">
              Live Fleet Engine Active • Collision-Free Range Verification
            </span>
          </div>

          {/* Bold Editorial Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0F2432] tracking-tight leading-[1.08]">
              Freedom Across <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F2432] via-[#E05A36] to-[#E67E22]">
                Every Category
              </span>{" "}
              of Mobility.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Rent verified sports cars, world-touring adventure motorcycles, and heavy-duty hauler trucks from certified hosts. Zero dummy inventory, guaranteed real-time availability.
            </p>
          </div>

          {/* View A: Universal Multi-Category Search Ribbon */}
          <div className="pt-2">
            <UniversalSearchRibbon />
          </div>

          {/* Quick Hub Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-500">
            <span className="text-slate-400">Popular Departure Hubs:</span>
            {["Bengaluru, KA", "Mumbai, MH", "Goa, GA", "New Delhi, DL", "Pune, MH", "Hyderabad, TS"].map((hub) => (
              <Link
                key={hub}
                href={`/explore?city=${encodeURIComponent(hub.split(",")[0])}`}
                className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
              >
                {hub}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY SHOWCASE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E05A36]">
              Engineered for Every Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F2432] mt-1">
              Select Your Class of Transport
            </h2>
          </div>
          <Link
            href="/explore"
            className="flex items-center gap-1.5 text-xs font-bold text-[#0F2432] hover:text-[#E05A36] transition-colors"
          >
            <span>Explore All {totalVehicles} Vehicles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Performance Cars */}
          <Link
            href="/explore?category=CAR"
            className="group relative rounded-3xl overflow-hidden aspect-4/3 md:aspect-3/4 bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-end p-6 text-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
              alt="Performance Cars"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="relative z-10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E05A36] flex items-center justify-center text-white shadow-md">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black">Performance & Luxury Cars</h3>
              <p className="text-xs text-slate-300 font-normal line-clamp-2">
                Porsches, BMW M, and high-performance EVs designed for precision coast highway touring.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#E67E22] group-hover:translate-x-1 transition-transform">
                <span>View Sport Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Card 2: Adventure Motorcycles */}
          <Link
            href="/explore?category=MOTORCYCLE"
            className="group relative rounded-3xl overflow-hidden aspect-4/3 md:aspect-3/4 bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-end p-6 text-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
              alt="Motorcycles"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="relative z-10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E67E22] flex items-center justify-center text-white shadow-md">
                <Bike className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black">Expedition & Sport Bikes</h3>
              <p className="text-xs text-slate-300 font-normal line-clamp-2">
                BMW GS boxers, Ducati superbikes, and Harley cruisers ready with certified safety gear.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#E67E22] group-hover:translate-x-1 transition-transform">
                <span>View Two-Wheeler Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Card 3: Trucks & Haulers */}
          <Link
            href="/explore?category=TRUCK"
            className="group relative rounded-3xl overflow-hidden aspect-4/3 md:aspect-3/4 bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-end p-6 text-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80"
              alt="Trucks & Haulers"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="relative z-10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black">Heavy Haulers & EV Trucks</h3>
              <p className="text-xs text-slate-300 font-normal line-clamp-2">
                Ford F-150 Lightning, Rivian R1T, and Cummins turbo diesels with heavy towing capacity.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>View Heavy Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FEATURED VERIFIED FLEET GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Verified Host Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F2432] mt-2">
              Featured Active Fleet
            </h2>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
          >
            <span>View Full Inventory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {enrichedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* BENCHMARKED TRUST & ENGINEERING PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F2432] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#E05A36]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E05A36] bg-[#E05A36]/20 px-3 py-1 rounded-full">
              The FleetFlow Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">
              Built on Atomic Relational Integrity & Comprehensive Protection
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Traditional rental desks make you wait in line only to discover your car isn&apos;t there. FleetFlow pairs strict database date allocation with peer-to-peer host verification for absolute peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 border-t border-slate-800 pt-8">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Real-Time Timestamp Overlap</h4>
              <p className="text-xs text-slate-400">
                Bookings are certified atomically: if an interval overlaps an existing trip, reservation attempts are immediately rejected.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Verified Driver Credentials</h4>
              <p className="text-xs text-slate-400">
                Renters and hosts undergo strict driver license verification and background safety screenings.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Transparent All-In Pricing</h4>
              <p className="text-xs text-slate-400">
                No hidden counter surcharges. Duration discounts, platform fees, and refundable security deposits are itemized upfront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM METRICS COUNTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-black text-[#0F2432] num-tabular">
              {totalVehicles}+
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Active Fleet Vehicles
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-[#E05A36] num-tabular">
              100%
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Collision-Free Guarantee
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-[#0F2432] num-tabular">
              {totalHosts}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Certified Host Partners
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-emerald-600 num-tabular">
              4.9★
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Average Renter Rating
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="max-w-xl mx-auto space-y-3">
          <Sparkles className="w-8 h-8 text-[#E05A36] mx-auto" />
          <h2 className="text-3xl font-black text-[#0F2432]">
            Ready to Take the Wheel?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Browse our curated fleet of sports cars, adventure motorcycles, and hauler trucks across Bengaluru, Mumbai, Goa, New Delhi, and Pune.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/explore"
            className="px-6 py-3.5 rounded-2xl bg-[#0F2432] hover:bg-[#E05A36] text-white font-extrabold text-xs shadow-md transition-colors"
          >
            Explore Active Fleet
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs shadow-xs transition-colors"
          >
            Become a Host & List Fleet
          </Link>
        </div>
      </section>
    </div>
  );
}
