import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkVehicleAvailability, calculateQuoteBreakdown } from "@/lib/availability";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { startDate, endDate } = body;

    if (!startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: "Both startDate and endDate are required" },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { success: false, error: "Invalid date format provided" },
        { status: 400 }
      );
    }

    // Find vehicle
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: { specs: true },
    });

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    // Check availability (bookings & blackouts)
    const availability = await checkVehicleAvailability(vehicle.id, start, end);

    if (!availability.available) {
      return NextResponse.json({
        success: true,
        available: false,
        reason: availability.reason,
        quote: null,
      });
    }

    // Calculate certified quote
    const quote = calculateQuoteBreakdown({
      dayRate: vehicle.dayRate,
      weeklyDiscountPercentage: vehicle.weeklyDiscountPercentage,
      category: vehicle.category,
      startDate: start,
      endDate: end,
    });

    return NextResponse.json({
      success: true,
      available: true,
      quote: {
        ...quote,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error in /api/vehicles/[id]/calculate-quote:", error);
    return NextResponse.json(
      { success: false, error: "Quote calculation failed" },
      { status: 500 }
    );
  }
}
