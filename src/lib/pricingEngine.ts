import { BookingAddons, QuoteBreakdown, VehicleData } from "./types";

export interface CalculateQuoteParams {
  vehicle: VehicleData;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  pickupTime: string; // HH:mm
  dropTime: string; // HH:mm
  rentalType: "SELF_DRIVE" | "WITH_CHAUFFEUR";
  addons: BookingAddons;
  couponCode?: string;
}

export interface AvailableCoupon {
  code: string;
  description: string;
  type: "FLAT" | "PERCENTAGE";
  value: number;
  minAmount: number;
  maxDiscount?: number;
  evOnly?: boolean;
}

export const VALID_COUPONS: AvailableCoupon[] = [
  {
    code: "FIRST100",
    description: "Flat ₹500 off on your first booking with Pravaas",
    type: "FLAT",
    value: 500,
    minAmount: 1500,
  },
  {
    code: "DIWALI2026",
    description: "15% Festive discount on all highway & weekend getaways (up to ₹1,500)",
    type: "PERCENTAGE",
    value: 15,
    minAmount: 3000,
    maxDiscount: 1500,
  },
  {
    code: "GOAWEEKEND",
    description: "Flat ₹750 off on 3+ day coastal self-drives",
    type: "FLAT",
    value: 750,
    minAmount: 5000,
  },
  {
    code: "EVGREEN",
    description: "Special ₹400 green mobility rebate on electric vehicles",
    type: "FLAT",
    value: 400,
    minAmount: 2000,
    evOnly: true,
  },
];

export function calculateBookingDuration(
  startDateStr: string,
  endDateStr: string,
  pickupTimeStr = "10:00",
  dropTimeStr = "10:00"
): { totalDays: number; totalHours: number } {
  try {
    const start = new Date(`${startDateStr}T${pickupTimeStr}:00`);
    const end = new Date(`${endDateStr}T${dropTimeStr}:00`);
    const diffMs = Math.max(0, end.getTime() - start.getTime());
    const totalHours = Math.max(4, Math.ceil(diffMs / (1000 * 60 * 60)));
    const totalDays = Math.max(1, Math.ceil(totalHours / 24));
    return { totalDays, totalHours };
  } catch {
    return { totalDays: 1, totalHours: 24 };
  }
}

export function calculateQuote({
  vehicle,
  startDate,
  endDate,
  pickupTime = "10:00",
  dropTime = "10:00",
  rentalType,
  addons,
  couponCode,
}: CalculateQuoteParams): QuoteBreakdown {
  const { totalDays, totalHours } = calculateBookingDuration(startDate, endDate, pickupTime, dropTime);

  // Base fare: Daily rate applied, weekly discount if >= 7 days
  let baseFare = vehicle.dayRate * totalDays;
  if (totalDays >= 7) {
    const weeklyDiscount = baseFare * (vehicle.weeklyDiscountPercentage / 100);
    baseFare -= weeklyDiscount;
  }

  // Chauffeur fee: ₹1,200 / day
  const driverFare = rentalType === "WITH_CHAUFFEUR" || addons.chauffeur ? 1200 * totalDays : 0;

  // Addons
  let addonsTotal = 0;
  if (addons.childSeat) addonsTotal += 250 * totalDays;
  if (addons.zeroDepInsurance) addonsTotal += 399 * totalDays;
  if (addons.gpsNavigator) addonsTotal += 150 * totalDays;
  if (addons.unlimitedKm) addonsTotal += 499 * totalDays;

  const preDiscountSubtotal = baseFare + driverFare + addonsTotal;

  // Apply Coupon
  let discountAmount = 0;
  let appliedCoupon: QuoteBreakdown["appliedCoupon"] = null;

  if (couponCode) {
    const cleanCode = couponCode.trim().toUpperCase();
    const matched = VALID_COUPONS.find((c) => c.code === cleanCode);

    if (matched && preDiscountSubtotal >= matched.minAmount) {
      if (matched.evOnly && vehicle.category !== "ELECTRIC") {
        // Not eligible for non-EV
      } else {
        if (matched.type === "FLAT") {
          discountAmount = matched.value;
        } else if (matched.type === "PERCENTAGE") {
          const calc = (preDiscountSubtotal * matched.value) / 100;
          discountAmount = matched.maxDiscount ? Math.min(calc, matched.maxDiscount) : calc;
        }
        discountAmount = Math.min(discountAmount, preDiscountSubtotal * 0.4); // max 40% discount
        appliedCoupon = {
          code: matched.code,
          discountAmount,
          description: matched.description,
        };
      }
    }
  }

  const taxableAmount = Math.max(0, preDiscountSubtotal - discountAmount);
  // GST: 18% (9% CGST + 9% SGST)
  const gstAmount = Math.round(taxableAmount * 0.18);
  const securityDeposit = vehicle.securityDeposit;
  const grandTotal = taxableAmount + gstAmount + securityDeposit;

  // Partial Payment: 20% of (Taxable + GST) + Security Deposit upfront
  const rentalFareWithTax = taxableAmount + gstAmount;
  const payableNowPartial = Math.round(rentalFareWithTax * 0.2) + securityDeposit;
  const remainingPayableAtPickup = grandTotal - payableNowPartial;

  return {
    totalHours,
    totalDays,
    baseFare: Math.round(baseFare),
    driverFare,
    addonsTotal,
    discountAmount: Math.round(discountAmount),
    taxableAmount,
    gstAmount,
    securityDeposit,
    grandTotal,
    payableNowFull: grandTotal,
    payableNowPartial,
    remainingPayableAtPickup,
    appliedCoupon,
  };
}
