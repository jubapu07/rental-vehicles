import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get("category");
    const city = searchParams.get("city");
    const startDateStr = searchParams.get("start");
    const endDateStr = searchParams.get("end");
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
    const transmission = searchParams.get("transmission");
    const fuelType = searchParams.get("fuelType");
    const instantOnly = searchParams.get("instantOnly") === "true";
    const sort = searchParams.get("sort") || "featured";
    const searchQuery = searchParams.get("search") || searchParams.get("q");

    // Category-specific filters
    const minCc = searchParams.get("minCc") ? parseInt(searchParams.get("minCc")!, 10) : undefined;
    const bikeType = searchParams.get("bikeType");
    const helmetProvided = searchParams.get("helmet") === "true";
    const minPayload = searchParams.get("minPayload") ? parseInt(searchParams.get("minPayload")!, 10) : undefined;
    const minSeats = searchParams.get("seats") ? parseInt(searchParams.get("seats")!, 10) : undefined;

    // Build base query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      isActive: true,
    };

    if (category && category !== "ALL") {
      where.category = category.toUpperCase();
    }

    if (city && city.trim() !== "") {
      where.city = {
        contains: city.trim(),
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.dayRate = {};
      if (minPrice !== undefined) where.dayRate.gte = minPrice;
      if (maxPrice !== undefined) where.dayRate.lte = maxPrice;
    }

    if (instantOnly) {
      where.instantBookable = true;
    }

    if (searchQuery && searchQuery.trim() !== "") {
      const q = searchQuery.trim();
      where.OR = [
        { brand: { contains: q } },
        { model: { contains: q } },
        { title: { contains: q } },
        { city: { contains: q } },
      ];
    }

    // Specs relation filters
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const specsFilter: any = {};
    if (transmission && transmission !== "ALL") {
      specsFilter.transmission = transmission.toUpperCase();
    }
    if (fuelType && fuelType !== "ALL") {
      specsFilter.fuelType = fuelType.toUpperCase();
    }
    if (minCc !== undefined) {
      specsFilter.engineDisplacementCc = { gte: minCc };
    }
    if (bikeType && bikeType !== "ALL") {
      specsFilter.bikeType = bikeType.toUpperCase();
    }
    if (helmetProvided) {
      specsFilter.helmetProvided = true;
    }
    if (minPayload !== undefined) {
      specsFilter.payloadCapacityKg = { gte: minPayload };
    }
    if (minSeats !== undefined) {
      specsFilter.seats = { gte: minSeats };
    }

    if (Object.keys(specsFilter).length > 0) {
      where.specs = specsFilter;
    }

    // Collision-free date filtering:
    // If startDate and endDate are provided, exclude vehicles that have an overlapping
    // CONFIRMED/ACTIVE booking or BlackoutDate:
    if (startDateStr && endDateStr) {
      const start = new Date(startDateStr);
      const end = new Date(endDateStr);

      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && start < end) {
        where.AND = [
          // Exclude vehicles with conflicting bookings
          {
            bookings: {
              none: {
                status: { in: ["CONFIRMED", "ACTIVE"] },
                AND: [
                  { startDate: { lt: end } },
                  { endDate: { gt: start } },
                ],
              },
            },
          },
          // Exclude vehicles with conflicting blackout dates
          {
            blackoutDates: {
              none: {
                AND: [
                  { startDate: { lt: end } },
                  { endDate: { gt: start } },
                ],
              },
            },
          },
        ];
      }
    }

    // Sort order
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = { createdAt: "desc" };
    if (sort === "price_asc") {
      orderBy = { dayRate: "asc" };
    } else if (sort === "price_desc") {
      orderBy = { dayRate: "desc" };
    } else if (sort === "year_desc") {
      orderBy = { year: "desc" };
    }

    // Fetch vehicles with relations
    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy,
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            verifiedAt: true,
            avatarUrl: true,
          },
        },
        specs: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
        reviews: {
          include: {
            author: {
              select: {
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
        blackoutDates: true,
      },
    });

    // Compute review statistics per vehicle
    const enrichedVehicles = vehicles.map((v) => {
      const totalReviews = v.reviews.length;
      const avgRating = totalReviews > 0
        ? Math.round((v.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews) * 10) / 10
        : 5.0;

      return {
        ...v,
        avgRating,
        reviewCount: totalReviews,
      };
    });

    // Calculate dynamic facet counts across all active vehicles
    const [carCount, bikeCount, truckCount, totalCount] = await Promise.all([
      prisma.vehicle.count({ where: { isActive: true, category: "CAR" } }),
      prisma.vehicle.count({ where: { isActive: true, category: "MOTORCYCLE" } }),
      prisma.vehicle.count({ where: { isActive: true, category: "TRUCK" } }),
      prisma.vehicle.count({ where: { isActive: true } }),
    ]);

    return NextResponse.json({
      success: true,
      vehicles: enrichedVehicles,
      facets: {
        total: totalCount,
        cars: carCount,
        motorcycles: bikeCount,
        trucks: truckCount,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/vehicles:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
