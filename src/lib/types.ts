export type VehicleCategory = "CAR" | "MOTORCYCLE" | "TRUCK";

export interface VehicleSpecsData {
  id?: string;
  vehicleId?: string;
  transmission: "AUTOMATIC" | "MANUAL";
  fuelType: "EV" | "PETROL" | "DIESEL" | "HYBRID";
  // Car
  seats?: number | null;
  doors?: number | null;
  luggageCapacity?: number | null;
  bodyType?: "SUV" | "SEDAN" | "CONVERTIBLE" | "COUPE" | "HATCHBACK" | string | null;
  // Motorcycle
  engineDisplacementCc?: number | null;
  seatHeightMm?: number | null;
  helmetProvided?: boolean;
  bikeType?: "CRUISER" | "SPORT" | "ADVENTURE" | "NAKED" | null;
  // Truck
  payloadCapacityKg?: number | null;
  bedLengthMeters?: number | null;
  towingCapacityKg?: number | null;
  commercialLicenseRequired?: boolean;
}

export interface VehicleImageData {
  id: string;
  vehicleId: string;
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
  createdAt: string | Date;
  author: {
    name: string;
    avatarUrl?: string | null;
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
  hostId: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
  slug: string;
  description: string;
  locationAddress: string;
  city: string;
  lat: number;
  lng: number;
  dayRate: number;
  weeklyDiscountPercentage: number;
  instantBookable: boolean;
  isActive: boolean;
  agency?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  host: HostData;
  specs: VehicleSpecsData | null;
  images: VehicleImageData[];
  reviews: ReviewData[];
  blackoutDates?: {
    id: string;
    startDate: string | Date;
    endDate: string | Date;
    reason: string;
  }[];
  avgRating?: number;
  reviewCount?: number;
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
