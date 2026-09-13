import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import UniversalSearchRibbon from "@/components/search/UniversalSearchRibbon";
import VehicleFilterSidebar from "@/components/vehicle/VehicleFilterSidebar";
import VehicleCard from "@/components/vehicle/VehicleCard";
import { VehicleData } from "@/lib/types";
import { SlidersHorizontal } from "lucide-react";

export const dynamic = "force-dynamic";

interface ExplorePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const resolvedParams = await searchParams;

  const category = (resolvedParams.category as string) || "ALL";
  const city = (resolvedParams.city as string) || "";
  const start = (resolvedParams.start as string) || "";
  const end = (resolvedParams.end as string) || "";
  const maxPrice = resolvedParams.maxPrice ? parseFloat(resolvedParams.maxPrice as string) : undefined;
  const instantOnly = resolvedParams.instantOnly === "true";
  const transmission = (resolvedParams.transmission as string) || "ALL";
  const fuelType = (resolvedParams.fuelType as string) || "ALL";
  const minCc = resolvedParams.minCc ? parseInt(resolvedParams.minCc as string, 10) : undefined;
  const bikeType = (resolvedParams.bikeType as string) || "ALL";
  const minPayload = resolvedParams.minPayload ? parseInt(resolvedParams.minPayload as string, 10) : undefined;
  const seats = resolvedParams.seats && resolvedParams.seats !== "ALL" ? parseInt(resolvedParams.seats as string, 10) : undefined;
  const sort = (resolvedParams.sort as string) || "featured";

  // Build Prisma Where Clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { isActive: true };

  if (category && category !== "ALL") {
    where.category = category.toUpperCase();
  }

  if (city && city.trim() !== "") {
    where.city = { contains: city.trim() };
  }

  if (maxPrice !== undefined) {
    where.dayRate = { lte: maxPrice };
  }

  if (instantOnly) {
    where.instantBookable = true;
  }

  // Specs criteria
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const specsWhere: any = {};
  if (transmission && transmission !== "ALL") specsWhere.transmission = transmission.toUpperCase();
  if (fuelType && fuelType !== "ALL") specsWhere.fuelType = fuelType.toUpperCase();
  if (minCc !== undefined) specsWhere.engineDisplacementCc = { gte: minCc };
  if (bikeType && bikeType !== "ALL") specsWhere.bikeType = bikeType.toUpperCase();
  if (minPayload !== undefined) specsWhere.payloadCapacityKg = { gte: minPayload };
  if (seats !== undefined) specsWhere.seats = { gte: seats };

  if (Object.keys(specsWhere).length > 0) {
    where.specs = specsWhere;
  }

  // Collision-free date filtering:
  // If start & end are specified, exclude vehicles with overlapping CONFIRMED/ACTIVE bookings or BlackoutDates!
  if (start && end) {
    const sDate = new Date(start);
    const eDate = new Date(end);
    if (!isNaN(sDate.getTime()) && !isNaN(eDate.getTime()) && sDate < eDate) {
      where.AND = [
        {
          bookings: {
            none: {
              status: { in: ["CONFIRMED", "ACTIVE"] },
              AND: [
                { startDate: { lt: eDate } },
                { endDate: { gt: sDate } },
              ],
            },
          },
        },
        {
          blackoutDates: {
            none: {
              AND: [
                { startDate: { lt: eDate } },
                { endDate: { gt: sDate } },
              ],
            },
          },
        },
      ];
    }
  }

  // Sorting
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let orderBy: any = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { dayRate: "asc" };
  if (sort === "price_desc") orderBy = { dayRate: "desc" };
  if (sort === "year_desc") orderBy = { year: "desc" };

  // Run database queries in parallel
  const [vehicles, carCount, bikeCount, truckCount, totalCount] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      orderBy,
      include: {
        host: true,
        specs: true,
        images: { orderBy: { sortOrder: "asc" } },
        reviews: { include: { author: true } },
      },
    }),
    prisma.vehicle.count({ where: { isActive: true, category: "CAR" } }),
    prisma.vehicle.count({ where: { isActive: true, category: "MOTORCYCLE" } }),
    prisma.vehicle.count({ where: { isActive: true, category: "TRUCK" } }),
    prisma.vehicle.count({ where: { isActive: true } }),
  ]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Header Ribbon in Compact Mode */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
        <UniversalSearchRibbon
          initialCategory={category}
          initialCity={city}
          initialStart={start}
          initialEnd={end}
          compact={true}
        />
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left: Filter Sidebar */}
        <div className="lg:col-span-1">
          <Suspense fallback={<div className="h-96 bg-white rounded-3xl animate-pulse" />}>
            <VehicleFilterSidebar
              facets={{
                total: totalCount,
                cars: carCount,
                motorcycles: bikeCount,
                trucks: truckCount,
              }}
            />
          </Suspense>
        </div>

        {/* Right: Vehicle Results & Sorting */}
        <div className="lg:col-span-3 space-y-6">
          {/* Results Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h1 className="text-lg font-black text-slate-900">
                {category === "ALL" ? "All Mobility Fleet" : `${category.charAt(0) + category.slice(1).toLowerCase()}s`}
                {city ? ` in ${city}` : ""}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing <strong className="text-slate-800">{enrichedVehicles.length}</strong> available vehicles
                {start && end ? ` for certified collision-free dates` : ""}
              </p>
            </div>

            {/* Quick Status / Sort Tag */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Live Inventory
              </span>
            </div>
          </div>

          {/* Vehicle Cards Grid */}
          {enrichedVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {enrichedVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  searchStart={start}
                  searchEnd={end}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 text-2xl">
                🚗
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">No Fleet Matches Found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try widening your price range, clearing specific transmission or category filters, or selecting different travel dates.
                </p>
              </div>
              <a
                href="/explore"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-[#0F2432] text-white text-xs font-bold hover:bg-[#E05A36] transition-colors"
              >
                Reset All Filters
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
