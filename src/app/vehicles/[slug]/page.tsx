import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BentoGallery from "@/components/vehicle/BentoGallery";
import StickyReservationModule from "@/components/booking/StickyReservationModule";
import {
  Star,
  ShieldCheck,
  Zap,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Gauge,
  Fuel,
  Weight,
  Users,
  Calendar,
  Sparkles,
  Info,
} from "lucide-react";
import { VehicleData } from "@/lib/types";

export const dynamic = "force-dynamic";

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VehicleDetailPage({ params, searchParams }: VehiclePageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const start = (resolvedSearchParams.start as string) || "";
  const end = (resolvedSearchParams.end as string) || "";

  // Fetch vehicle by slug
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
    include: {
      host: true,
      specs: true,
      images: { orderBy: { sortOrder: "asc" } },
      reviews: {
        include: { author: true },
        orderBy: { createdAt: "desc" },
      },
      blackoutDates: true,
    },
  });

  if (!vehicle) {
    notFound();
  }

  // Review statistics
  const totalReviews = vehicle.reviews.length;
  const avgRating = totalReviews > 0
    ? Math.round((vehicle.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews) * 10) / 10
    : 5.0;

  const enrichedVehicle: VehicleData = {
    ...vehicle,
    category: vehicle.category as "CAR" | "MOTORCYCLE" | "TRUCK",
    specs: vehicle.specs as unknown as VehicleData["specs"],
    avgRating,
    reviewCount: totalReviews,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Location Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#0F2432] text-white text-xs font-bold uppercase tracking-wider">
            {vehicle.category}
          </span>
          {vehicle.instantBookable && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-[#E05A36] text-xs font-extrabold border border-amber-200">
              <Zap className="w-3.5 h-3.5 fill-[#E05A36]" />
              Instant Bookable
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified Fleet Host
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {vehicle.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-600 mt-2">
              <div className="flex items-center gap-1 font-bold text-slate-900">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{avgRating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({totalReviews} verified reviews)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E05A36]" />
                <span>{vehicle.locationAddress}, {vehicle.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid 5-Photo Gallery */}
      <BentoGallery images={vehicle.images} title={vehicle.title} />

      {/* Two-Column Layout: Left 65% Specs & Details | Right 35% Sticky Booking Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 items-start">
        {/* Left Column (65%) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Host Card Banner */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={vehicle.host.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                alt={vehicle.host.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/30"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-base text-slate-900">Hosted by {vehicle.host.name}</h3>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Identity & Driving Record Verified • Fast 15-min response time
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Premier Host
            </span>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900">Technical Specifications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Spec 1: Transmission */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <Gauge className="w-4 h-4 text-[#E05A36] mb-1.5" />
                <p className="text-[10px] uppercase font-bold text-slate-400">Transmission</p>
                <p className="text-xs font-extrabold text-slate-900 capitalize">
                  {vehicle.specs?.transmission.toLowerCase()}
                </p>
              </div>

              {/* Spec 2: Fuel */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <Fuel className="w-4 h-4 text-[#E67E22] mb-1.5" />
                <p className="text-[10px] uppercase font-bold text-slate-400">Powertrain</p>
                <p className="text-xs font-extrabold text-slate-900">
                  {vehicle.specs?.fuelType === "EV" ? "100% Electric" : vehicle.specs?.fuelType}
                </p>
              </div>

              {/* Category-Specific Specs */}
              {vehicle.category === "MOTORCYCLE" && (
                <>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <Gauge className="w-4 h-4 text-[#0F2432] mb-1.5" />
                    <p className="text-[10px] uppercase font-bold text-slate-400">Displacement</p>
                    <p className="text-xs font-extrabold text-slate-900">
                      {vehicle.specs?.engineDisplacementCc} cc
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <Users className="w-4 h-4 text-emerald-600 mb-1.5" />
                    <p className="text-[10px] uppercase font-bold text-slate-400">Seat Height</p>
                    <p className="text-xs font-extrabold text-slate-900">
                      {vehicle.specs?.seatHeightMm} mm
                    </p>
                  </div>
                </>
              )}

              {vehicle.category === "TRUCK" && (
                <>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <Weight className="w-4 h-4 text-emerald-600 mb-1.5" />
                    <p className="text-[10px] uppercase font-bold text-slate-400">Payload Capacity</p>
                    <p className="text-xs font-extrabold text-slate-900">
                      {vehicle.specs?.payloadCapacityKg} kg
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <Weight className="w-4 h-4 text-[#0F2432] mb-1.5" />
                    <p className="text-[10px] uppercase font-bold text-slate-400">Towing Max</p>
                    <p className="text-xs font-extrabold text-slate-900">
                      {vehicle.specs?.towingCapacityKg} kg
                    </p>
                  </div>
                </>
              )}

              {vehicle.category === "CAR" && (
                <>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <Users className="w-4 h-4 text-[#0F2432] mb-1.5" />
                    <p className="text-[10px] uppercase font-bold text-slate-400">Capacity</p>
                    <p className="text-xs font-extrabold text-slate-900">
                      {vehicle.specs?.seats} Passengers
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <Weight className="w-4 h-4 text-emerald-600 mb-1.5" />
                    <p className="text-[10px] uppercase font-bold text-slate-400">Luggage Space</p>
                    <p className="text-xs font-extrabold text-slate-900">
                      {vehicle.specs?.luggageCapacity} Liters
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-lg font-black text-slate-900">About this {vehicle.category.toLowerCase()}</h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {vehicle.description}
            </p>
          </div>

          {/* Rental Guidelines & Protection */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-[#E05A36]" />
              Rental Guidelines & Protection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Unlimited Roadside Assistance</strong>
                  24/7 flat tire, lock-out, and dispatch covered across nationwide highways.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Refundable Security Deposit</strong>
                  Pre-authorized at checkout and automatically released within 48h of return.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Clean & Sanitized Handover</strong>
                  Vehicle is inspected and fully fueled/charged prior to your arrival.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Flexible 24h Cancellation</strong>
                  Free cancellation with 100% refund up to 24 hours before your trip start time.
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="space-y-6 border-t border-slate-200 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900">Renter Reviews</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Authentic ratings from verified platform renters
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-base font-extrabold text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{avgRating.toFixed(1)}</span>
                <span className="text-slate-400 text-xs font-normal">/ 5.0</span>
              </div>
            </div>

            <div className="space-y-4">
              {vehicle.reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rev.author.avatarUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"}
                        alt={rev.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{rev.author.name}</p>
                        <p className="text-[10px] text-slate-400">
                          {new Date(rev.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (35%): Sticky Reservation Module */}
        <div className="lg:col-span-4">
          <StickyReservationModule
            vehicle={enrichedVehicle}
            initialStart={start}
            initialEnd={end}
          />
        </div>
      </div>
    </div>
  );
}
