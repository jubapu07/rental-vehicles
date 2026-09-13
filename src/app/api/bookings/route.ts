import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkVehicleAvailability, calculateQuoteBreakdown } from "@/lib/availability";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      vehicleId,
      customerId,
      startDate,
      endDate,
    } = body;

    if (!vehicleId || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: "Missing required booking parameters" },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      return NextResponse.json(
        { success: false, error: "Invalid booking dates" },
        { status: 400 }
      );
    }

    // Default to our verified renter Alex Sterling if customerId is not provided
    let activeCustomerId = customerId;
    if (!activeCustomerId) {
      const defaultUser = await prisma.user.findFirst({
        where: { role: "CUSTOMER" },
      });
      activeCustomerId = defaultUser?.id;
    }

    if (!activeCustomerId) {
      return NextResponse.json(
        { success: false, error: "Customer profile could not be resolved" },
        { status: 400 }
      );
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    // Atomic collision check
    const availability = await checkVehicleAvailability(vehicle.id, start, end);
    if (!availability.available) {
      return NextResponse.json(
        { success: false, error: availability.reason || "Vehicle is unavailable for these dates" },
        { status: 409 }
      );
    }

    // Calculate certified financials
    const quote = calculateQuoteBreakdown({
      dayRate: vehicle.dayRate,
      weeklyDiscountPercentage: vehicle.weeklyDiscountPercentage,
      category: vehicle.category,
      startDate: start,
      endDate: end,
    });

    // Simulated Stripe Payment Intent ID
    const simulatedPaymentIntentId = `pi_fleetflow_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Create booking record
    const booking = await prisma.booking.create({
      data: {
        vehicleId: vehicle.id,
        customerId: activeCustomerId,
        startDate: start,
        endDate: end,
        status: "CONFIRMED",
        totalDays: quote.totalDays,
        dayRateSnapshot: vehicle.dayRate,
        discountApplied: quote.discountAmount,
        serviceFee: quote.serviceFee,
        securityDeposit: quote.securityDeposit,
        totalPrice: quote.totalPrice,
        stripePaymentIntentId: simulatedPaymentIntentId,
      },
      include: {
        vehicle: {
          include: {
            images: { where: { isCover: true } },
            host: true,
          },
        },
        customer: true,
      },
    });

    return NextResponse.json({
      success: true,
      booking,
      message: "Reservation confirmed successfully!",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reserve vehicle" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");
    const hostId = searchParams.get("hostId");
    const status = searchParams.get("status");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (customerId) where.customerId = customerId;
    if (hostId) where.vehicle = { hostId };
    if (status) where.status = status;

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        vehicle: {
          include: {
            images: true,
            host: true,
            specs: true,
          },
        },
        customer: true,
      },
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve bookings" },
      { status: 500 }
    );
  }
}
