export type VehicleCategory =
  | "HATCHBACK"
  | "SEDAN"
  | "COMPACT_SUV"
  | "SUV"
  | "MPV"
  | "ELECTRIC"
  | "CAR"
  | "MOTORCYCLE"
  | "TRUCK";

export type FuelType = "PETROL" | "DIESEL" | "CNG" | "ELECTRIC" | "HYBRID" | "EV";

export type Transmission = "MANUAL" | "AUTOMATIC";

export interface VehicleSpecsData {
  id?: string;
  vehicleId?: string;
  transmission: Transmission;
  fuelType: FuelType;
  seats: number;
  doors?: number;
  luggageCapacity?: number; // In Liters
  bodyType?: string;
  mileageKmpl?: number; // ARAI / Real-world km/l
  batteryCapacityKwh?: number; // For EV
  rangeKm?: number; // For EV
  groundClearanceMm?: number; // Ground clearance in mm
  engineDisplacementCc?: number;
  helmetProvided?: boolean;
  bikeType?: string | null;
  payloadCapacityKg?: number;
  bedLengthMeters?: number;
  towingCapacityKg?: number;
  commercialLicenseRequired?: boolean;
}

export interface VehicleImageData {
  id: string;
  vehicleId?: string;
  url: string;
  caption?: string | null;
  isCover: boolean;
  sortOrder: number;
}

export interface ReviewData {
  id: string;
  vehicleId: string;
  authorId: string;
  rating: number;
  comment: string;
  tripRoute?: string;
  createdAt: string | Date;
  author: {
    name: string;
    avatarUrl?: string | null;
    city?: string;
  };
}

export interface HostData {
  id: string;
  name: string;
  email: string;
  role: string;
  verifiedAt?: string | Date | null;
  avatarUrl?: string | null;
  phone?: string | null;
}

export interface VehicleData {
  id: string;
  hostId?: string;
  title: string;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  category: VehicleCategory;
  slug: string;
  description: string;
  locationAddress: string;
  city: string;
  lat: number;
  lng: number;
  
  // Indian Pricing (INR)
  perHourRate: number;
  dayRate: number; // Daily rate (INR)
  weeklyDiscountPercentage: number;
  perWeekRate?: number;
  securityDeposit: number;
  freeKmPerDay: number;
  extraKmRate: number;
  
  // Specific Indian Attributes
  fastagEnabled: boolean;
  isChauffeurAvailable: boolean;
  features: string[];
  instantBookable: boolean;
  isActive: boolean;
  agency?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  host: HostData;
  specs: VehicleSpecsData;
  images: VehicleImageData[];
  reviews: ReviewData[];
  blackoutDates?: {
    id: string;
    startDate: string | Date;
    endDate: string | Date;
    reason: string;
  }[];
  avgRating: number;
  reviewCount: number;
}

export interface IndianCity {
  id: string;
  name: string;
  slug: string;
  state: string;
  airport: string;
  railwayHub: string;
  popularAreas: string[];
  popularRoutes: string[];
}

export interface BookingAddons {
  chauffeur: boolean;
  childSeat: boolean;
  zeroDepInsurance: boolean;
  gpsNavigator: boolean;
  unlimitedKm: boolean;
}

export interface QuoteBreakdown {
  totalHours: number;
  totalDays: number;
  baseFare: number;
  driverFare: number;
  addonsTotal: number;
  discountAmount: number;
  taxableAmount: number;
  gstAmount: number; // 18% GST (9% CGST + 9% SGST)
  securityDeposit: number; // 100% Refundable
  grandTotal: number;
  payableNowFull: number;
  payableNowPartial: number; // 20% upfront
  remainingPayableAtPickup: number;
  appliedCoupon?: {
    code: string;
    discountAmount: number;
    description: string;
  } | null;
}

export interface UserKYCState {
  drivingLicenseNumber: string;
  dlExpiryDate: string;
  dlVerified: boolean;
  idProofType: "AADHAAR" | "PASSPORT" | "VOTER_ID";
  maskedAadhaar: string; // "XXXX-XXXX-1234"
  isVerified: boolean;
  submittedAt?: string;
}

export interface BookingRecord {
  id: string;
  bookingNumber: string; // e.g. PRV-2026-8912
  vehicle: VehicleData;
  rentalType: "SELF_DRIVE" | "WITH_CHAUFFEUR";
  city: string;
  pickupLocation: string;
  dropLocation: string;
  startDate: string;
  endDate: string;
  pickupTime: string;
  dropTime: string;
  addons: BookingAddons;
  quote: QuoteBreakdown;
  paymentMode: "FULL" | "PARTIAL_20";
  paymentStatus: "CONFIRMED" | "PENDING" | "REFUNDED" | "CANCELLED";
  paymentMethod: "UPI" | "CARD" | "NETBANKING" | "WALLET";
  razorpayPaymentId?: string;
  status: "UPCOMING" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  invoiceNumber: string;
}

export interface QuoteCalculation {
  startDate: string;
  endDate: string;
  totalDays: number;
  dayRate: number;
  baseAmount: number;
  weeklyDiscountPercentage: number;
  discountAmount: number;
  netVehicleCost: number;
  serviceFee: number;
  securityDeposit: number;
  totalPrice: number;
  isAvailable: boolean;
  unavailableReason?: string;
}

