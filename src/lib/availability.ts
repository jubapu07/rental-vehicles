import { prisma } from "./prisma";

/**
 * Checks if a vehicle is available for the given start and end date range.
 * Collision logic: An overlap exists if NOT (endDate <= newStart OR startDate >= newEnd).
 * In other words: (existing.startDate < newEnd && existing.endDate > newStart)
 */
export async function checkVehicleAvailability(
  vehicleId: string,
  startDate: Date,
  endDate: Date,
  excludeBookingId?: string
): Promise<{ available: boolean; reason?: string }> {
  // 1. Verify date validity
  if (startDate >= endDate) {
    return { available: false, reason: "Check-out date must be after check-in date" };
  }

  // 2. Check collision with existing active or confirmed bookings
  const conflictingBookings = await prisma.booking.findMany({
    where: {
      vehicleId,
      status: {
        in: ["CONFIRMED", "ACTIVE", "PENDING"],
      },
      ...(excludeBookingId ? { id: { not: excludeBookingId } } : {}),
      AND: [
        { startDate: { lt: endDate } },
        { endDate: { gt: startDate } },
      ],
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      status: true,
    },
  });

  if (conflictingBookings.length > 0) {
    return {
      available: false,
      reason: "This vehicle is already reserved for the selected dates.",
    };
  }

  // 3. Check collision with host blackout dates (maintenance or unavailable)
  const conflictingBlackouts = await prisma.blackoutDate.findMany({
    where: {
      vehicleId,
      AND: [
        { startDate: { lt: endDate } },
        { endDate: { gt: startDate } },
      ],
    },
  });

  if (conflictingBlackouts.length > 0) {
    const reason = conflictingBlackouts[0].reason === "MAINTENANCE"
      ? "Vehicle is scheduled for routine maintenance during these dates."
      : "Host has blocked out these dates.";
    return { available: false, reason };
  }

  return { available: true };
}

/**
 * Calculates certified quote breakdown with duration discounts,
 * category-based security deposit, and platform fee.
 */
export function calculateQuoteBreakdown({
  dayRate,
  weeklyDiscountPercentage,
  category,
  startDate,
  endDate,
}: {
  dayRate: number;
  weeklyDiscountPercentage: number;
  category: string;
  startDate: Date;
  endDate: Date;
}) {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const totalDays = Math.max(1, diffDays);

  const baseAmount = Math.round(dayRate * totalDays * 100) / 100;
  
  // Weekly discount applies if booking is 7+ days
  const eligibleForDiscount = totalDays >= 7;
  const discountRate = eligibleForDiscount ? weeklyDiscountPercentage / 100 : 0;
  const discountAmount = Math.round(baseAmount * discountRate * 100) / 100;
  const netVehicleCost = Math.round((baseAmount - discountAmount) * 100) / 100;

  // 10% platform service fee on net vehicle cost
  const serviceFee = Math.round(netVehicleCost * 0.10 * 100) / 100;

  // Category-specific refundable security deposit (in INR)
  let securityDeposit = 5000;
  if (category === "MOTORCYCLE") {
    securityDeposit = 3000;
  } else if (category === "TRUCK") {
    securityDeposit = 7500;
  }
  if (dayRate >= 5000) {
    securityDeposit = 10000; // Premium SUV / Extreme Hauler
  }

  const totalPrice = Math.round((netVehicleCost + serviceFee + securityDeposit) * 100) / 100;

  return {
    totalDays,
    dayRate,
    baseAmount,
    weeklyDiscountPercentage: eligibleForDiscount ? weeklyDiscountPercentage : 0,
    discountAmount,
    netVehicleCost,
    serviceFee,
    securityDeposit,
    totalPrice,
  };
}
