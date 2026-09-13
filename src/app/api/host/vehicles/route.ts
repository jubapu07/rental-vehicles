import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      brand,
      model,
      year,
      category,
      description,
      locationAddress,
      city,
      dayRate,
      weeklyDiscountPercentage,
      instantBookable,
      specs,
      images,
      blackoutStartDate,
      blackoutEndDate,
    } = body;

    if (!title || !brand || !model || !year || !category || !city || !dayRate) {
      return NextResponse.json(
        { success: false, error: "Missing required vehicle fields" },
        { status: 400 }
      );
    }

    // Default host (Marcus Vance or first HOST in db)
    const host = await prisma.user.findFirst({
      where: { role: "HOST" },
    });

    if (!host) {
      return NextResponse.json(
        { success: false, error: "Host profile not found" },
        { status: 400 }
      );
    }

    // Generate unique slug
    const slugBase = `${brand}-${model}-${year}-${city}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const uniqueSlug = `${slugBase}-${Date.now().toString(36)}`;

    // Approximate city coordinates
    const cityCoords: Record<string, { lat: number; lng: number }> = {
      Austin: { lat: 30.2672, lng: -97.7431 },
      Miami: { lat: 25.7617, lng: -80.1918 },
      "Los Angeles": { lat: 34.0522, lng: -118.2437 },
      Denver: { lat: 39.7392, lng: -104.9903 },
      Seattle: { lat: 47.6062, lng: -122.3321 },
      Dallas: { lat: 32.7767, lng: -96.797 },
      "San Francisco": { lat: 37.7749, lng: -122.4194 },
    };
    const coords = cityCoords[city] || { lat: 30.2672, lng: -97.7431 };

    // Format images
    const imageRecords = (images && images.length > 0)
      ? images.map((img: { url: string; caption?: string }, idx: number) => ({
          url: img.url,
          caption: img.caption || `${brand} ${model} photo ${idx + 1}`,
          isCover: idx === 0,
          sortOrder: idx,
        }))
      : [
          {
            url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
            caption: `${brand} ${model} Cover Photo`,
            isCover: true,
            sortOrder: 0,
          },
        ];

    const vehicle = await prisma.vehicle.create({
      data: {
        hostId: host.id,
        title,
        brand,
        model,
        year: parseInt(year, 10),
        category: category.toUpperCase(),
        slug: uniqueSlug,
        description: description || `Premium ${year} ${brand} ${model} located in ${city}.`,
        locationAddress: locationAddress || `${city} Central Mobility Hub`,
        city,
        lat: coords.lat,
        lng: coords.lng,
        dayRate: parseFloat(dayRate),
        weeklyDiscountPercentage: weeklyDiscountPercentage ? parseFloat(weeklyDiscountPercentage) : 12.0,
        instantBookable: instantBookable !== undefined ? Boolean(instantBookable) : true,
        specs: {
          create: {
            transmission: specs?.transmission || "AUTOMATIC",
            fuelType: specs?.fuelType || "PETROL",
            seats: specs?.seats ? parseInt(specs.seats, 10) : null,
            doors: specs?.doors ? parseInt(specs.doors, 10) : null,
            luggageCapacity: specs?.luggageCapacity ? parseInt(specs.luggageCapacity, 10) : null,
            engineDisplacementCc: specs?.engineDisplacementCc ? parseInt(specs.engineDisplacementCc, 10) : null,
            seatHeightMm: specs?.seatHeightMm ? parseInt(specs.seatHeightMm, 10) : null,
            helmetProvided: Boolean(specs?.helmetProvided),
            bikeType: specs?.bikeType || null,
            payloadCapacityKg: specs?.payloadCapacityKg ? parseInt(specs.payloadCapacityKg, 10) : null,
            bedLengthMeters: specs?.bedLengthMeters ? parseFloat(specs.bedLengthMeters) : null,
            towingCapacityKg: specs?.towingCapacityKg ? parseInt(specs.towingCapacityKg, 10) : null,
            commercialLicenseRequired: Boolean(specs?.commercialLicenseRequired),
          },
        },
        images: {
          create: imageRecords,
        },
        ...(blackoutStartDate && blackoutEndDate
          ? {
              blackoutDates: {
                create: {
                  startDate: new Date(blackoutStartDate),
                  endDate: new Date(blackoutEndDate),
                  reason: "HOST_UNAVAILABLE",
                },
              },
            }
          : {}),
      },
      include: {
        specs: true,
        images: true,
        host: true,
      },
    });

    return NextResponse.json({
      success: true,
      vehicle,
      message: "Vehicle listed successfully!",
    });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create vehicle listing" },
      { status: 500 }
    );
  }
}
