"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Car,
  Filter,
  Grid,
  List,
  Search,
  Fuel,
  Gauge,
  Users,
  ShieldCheck,
  Star,
  ArrowRight,
  Heart,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { INDIAN_VEHICLES } from "@/lib/indianVehicles";
import { INDIAN_CITIES } from "@/lib/indianCities";
import { formatINR } from "@/lib/i18n";
import { useSavedCars } from "@/context/SavedCarsContext";

function ExploreContent() {
  const searchParams = useSearchParams();
  const { isSaved, toggleSave } = useSavedCars();

  // Search Param Initializers
  const initialCategory = searchParams.get("category") || "ALL";
  const initialCity = searchParams.get("city") || "ALL";

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedFuel, setSelectedFuel] = useState<string>("ALL");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("ALL");
  const [selectedSeats, setSelectedSeats] = useState<string>("ALL");
  const [selectedBrand, setSelectedBrand] = useState<string>("ALL");
  const [maxPrice, setMaxPrice] = useState<number>(7500);
  const [sortBy, setSortBy] = useState<string>("POPULAR");
  const [viewMode, setViewMode] = useState<"GRID" | "LIST">("GRID");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync when searchParams change
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const c = searchParams.get("city");
    if (c) setSelectedCity(c);
  }, [searchParams]);

  // Unique Brands
  const availableBrands = useMemo(() => {
    return Array.from(new Set(INDIAN_VEHICLES.map((v) => v.brand))).sort();
  }, []);

  // Filter Logic
  const filteredCars = useMemo(() => {
    return INDIAN_VEHICLES.filter((car) => {
      // Category
      if (selectedCategory !== "ALL" && car.category !== selectedCategory) return false;
      // City
      if (selectedCity !== "ALL" && car.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
      // Fuel
      if (selectedFuel !== "ALL" && car.specs.fuelType !== selectedFuel) return false;
      // Transmission
      if (selectedTransmission !== "ALL" && car.specs.transmission !== selectedTransmission) return false;
      // Seats
      if (selectedSeats !== "ALL" && car.specs.seats !== parseInt(selectedSeats, 10)) return false;
      // Brand
      if (selectedBrand !== "ALL" && car.brand !== selectedBrand) return false;
      // Price
      if (car.dayRate > maxPrice) return false;
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = car.title.toLowerCase().includes(q);
        const matchesBrand = car.brand.toLowerCase().includes(q);
        const matchesCity = car.city.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesCity) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "PRICE_ASC") return a.dayRate - b.dayRate;
      if (sortBy === "PRICE_DESC") return b.dayRate - a.dayRate;
      if (sortBy === "RATING") return b.avgRating - a.avgRating;
      return b.reviewCount - a.reviewCount; // POPULAR
    });
  }, [
    selectedCategory,
    selectedCity,
    selectedFuel,
    selectedTransmission,
    selectedSeats,
    selectedBrand,
    maxPrice,
    searchQuery,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory("ALL");
    setSelectedCity("ALL");
    setSelectedFuel("ALL");
    setSelectedTransmission("ALL");
    setSelectedSeats("ALL");
    setSelectedBrand("ALL");
    setMaxPrice(7500);
    setSearchQuery("");
    setSortBy("POPULAR");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#676C8F] mb-1">
            <Link href="/" className="hover:text-[#118AB2]">Home</Link>
            <span>/</span>
            <span className="text-[#464B71] dark:text-[#F2F2ED] font-semibold">Explore Vehicles</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit']">
            Available Rental Fleet Across India
          </h1>
          <p className="text-xs sm:text-sm text-[#676C8F] dark:text-[#A5ABC9]">
            Showing <strong className="text-[#464B71] dark:text-[#F2F2ED]">{filteredCars.length}</strong> verified cars with active FASTags & zero security deposit traps.
          </p>
        </div>

        {/* View Switcher & Filter Trigger */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 rounded-xl bg-[#464B71] text-[#F2F2ED] text-xs font-bold flex items-center gap-2 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#7CD5C7]" />
            <span>Filters ({[selectedCategory, selectedFuel, selectedTransmission].filter(x => x !== "ALL").length})</span>
          </button>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] focus:outline-none focus:ring-2 focus:ring-[#118AB2]"
          >
            <option value="POPULAR">Most Popular Trips</option>
            <option value="PRICE_ASC">Price: Low to High</option>
            <option value="PRICE_DESC">Price: High to Low</option>
            <option value="RATING">Highest Rated (4.9+)</option>
          </select>

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center bg-white/70 dark:bg-[#272B44] p-1 rounded-xl border border-[#DFDFD5] dark:border-[#373D60]">
            <button
              onClick={() => setViewMode("GRID")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "GRID"
                  ? "bg-[#118AB2] text-white shadow-xs"
                  : "text-[#676C8F] hover:text-[#464B71] dark:hover:text-white"
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("LIST")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "LIST"
                  ? "bg-[#118AB2] text-white shadow-xs"
                  : "text-[#676C8F] hover:text-[#464B71] dark:hover:text-white"
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Car Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ================= DESKTOP FILTER SIDEBAR ================= */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white dark:bg-[#272B44] p-6 rounded-3xl border border-[#DFDFD5] dark:border-[#373D60] h-fit sticky top-24 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#DFDFD5] dark:border-[#373D60]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#118AB2]" />
              <h3 className="font-bold text-sm text-[#464B71] dark:text-[#F2F2ED]">Filter Machines</h3>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-[#118AB2] hover:underline flex items-center gap-1 font-bold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Keyword Search */}
          <div>
            <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1.5">
              Quick Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Model, brand, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#F2F2ED]/60 dark:bg-[#464B71]/60 border border-[#DFDFD5] dark:border-[#373D60] text-xs text-[#464B71] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#118AB2]"
              />
              <Search className="w-3.5 h-3.5 text-[#676C8F] absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Hub City */}
          <div>
            <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1.5">
              Hub City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#F2F2ED]/60 dark:bg-[#464B71]/60 border border-[#DFDFD5] dark:border-[#373D60] text-xs font-semibold text-[#464B71] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#118AB2]"
            >
              <option value="ALL">All 12 Indian Cities</option>
              {INDIAN_CITIES.map((c) => (
                <option key={c.id} value={c.name} className="dark:bg-[#272B44]">
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Category */}
          <div>
            <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-2">
              Body Category
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: "ALL", label: "All Fleet" },
                { id: "SUV", label: "SUVs & 4x4 (Thar, Fortuner, XUV700)" },
                { id: "SEDAN", label: "Executive Sedans (City, Verna)" },
                { id: "COMPACT_SUV", label: "Compact SUVs (Nexon, 3XO)" },
                { id: "MPV", label: "7-Seater MPVs (Innova, Carens)" },
                { id: "ELECTRIC", label: "Electric EVs (Nexon EV, Windsor)" },
                { id: "HATCHBACK", label: "Hatchbacks (Swift, Baleno)" },
              ].map((c) => (
                <label
                  key={c.id}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                    selectedCategory === c.id
                      ? "bg-[#F2F2ED] dark:bg-[#373D60] text-[#118AB2] font-bold"
                      : "text-[#676C8F] dark:text-[#A5ABC9] hover:bg-[#F2F2ED]/40 dark:hover:bg-[#3D436A]"
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === c.id}
                    onChange={() => setSelectedCategory(c.id)}
                    className="accent-[#118AB2]"
                  />
                  <span>{c.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1.5">
              Fuel Type
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {["ALL", "PETROL", "DIESEL", "CNG", "ELECTRIC"].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setSelectedFuel(f)}
                  className={`py-1.5 px-2 rounded-lg text-center font-semibold transition-all ${
                    selectedFuel === f
                      ? "bg-[#118AB2] text-white"
                      : "bg-[#F2F2ED]/70 dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]"
                  }`}
                >
                  {f === "ALL" ? "All Fuels" : f}
                </button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1.5">
              Transmission
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {["ALL", "AUTOMATIC", "MANUAL"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTransmission(t)}
                  className={`py-1.5 px-2 rounded-lg text-center font-semibold text-[11px] transition-all ${
                    selectedTransmission === t
                      ? "bg-[#118AB2] text-white"
                      : "bg-[#F2F2ED]/70 dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]"
                  }`}
                >
                  {t === "ALL" ? "Any" : t === "AUTOMATIC" ? "Auto" : "Manual"}
                </button>
              ))}
            </div>
          </div>

          {/* Seating Capacity */}
          <div>
            <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1.5">
              Seating Capacity
            </label>
            <div className="grid grid-cols-4 gap-1.5 text-xs">
              {["ALL", "4", "5", "7"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSeats(s)}
                  className={`py-1.5 rounded-lg text-center font-semibold text-xs transition-all ${
                    selectedSeats === s
                      ? "bg-[#118AB2] text-white"
                      : "bg-[#F2F2ED]/70 dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]"
                  }`}
                >
                  {s === "ALL" ? "All" : `${s} Seats`}
                </button>
              ))}
            </div>
          </div>

          {/* Automaker Brand */}
          <div>
            <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1.5">
              Automaker Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#F2F2ED]/60 dark:bg-[#464B71]/60 border border-[#DFDFD5] dark:border-[#373D60] text-xs font-semibold text-[#464B71] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#118AB2]"
            >
              <option value="ALL">All Brands</option>
              {availableBrands.map((b) => (
                <option key={b} value={b} className="dark:bg-[#272B44]">{b}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-[#464B71] dark:text-[#F2F2ED]">Max Budget / Day</span>
              <span className="font-extrabold text-[#118AB2]">{formatINR(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={1500}
              max={7000}
              step={200}
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
              className="w-full accent-[#118AB2] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#676C8F] mt-0.5">
              <span>₹1,500</span>
              <span>₹7,000+</span>
            </div>
          </div>
        </aside>

        {/* ================= SEARCH RESULTS LISTING ================= */}
        <main className="lg:col-span-3">
          {filteredCars.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#272B44] rounded-3xl border border-[#DFDFD5] dark:border-[#373D60] p-8">
              <div className="w-16 h-16 rounded-full bg-[#F2F2ED] dark:bg-[#464B71] text-[#118AB2] flex items-center justify-center mx-auto mb-4 border border-[#118AB2]/20">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit']">
                No vehicles match your selected filters
              </h3>
              <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9] mt-1 max-w-sm mx-auto">
                Try expanding your price range, choosing another city hub, or clearing specific fuel and transmission filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 px-5 py-2.5 rounded-xl bg-[#118AB2] text-white text-xs font-bold hover:brightness-105"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "GRID" ? (
            /* ================= GRID VIEW ================= */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => {
                const saved = isSaved(car.id);
                const isEv = car.category === "ELECTRIC";

                return (
                  <div
                    key={car.id}
                    className="group flex flex-col rounded-3xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[16/10] bg-[#464B71] overflow-hidden">
                      <img
                        src={car.images[0]?.url || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"}
                        alt={car.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${
                            isEv
                              ? "bg-emerald-700/90 text-white"
                              : "bg-[#464B71]/85 text-[#F2F2ED]"
                          }`}
                        >
                          {isEv ? "Pure EV" : car.category.replace("_", " ")}
                        </span>

                        <button
                          onClick={() => toggleSave(car.id)}
                          className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all"
                          title="Save car"
                          aria-label="Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${saved ? "text-[#118AB2] fill-current" : ""}`} />
                        </button>
                      </div>

                      {/* FASTag Active Pill */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#464B71]/90 backdrop-blur-md text-[#7CD5C7] text-[10px] font-bold border border-[#7CD5C7]/30">
                        <ShieldCheck className="w-3 h-3 text-[#7CD5C7]" />
                        <span>FASTag Active</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Rating & City */}
                        <div className="flex items-center justify-between text-xs text-[#676C8F] mb-1">
                          <span className="font-semibold text-[#464B71] dark:text-[#A5ABC9]">
                            {car.city} Hub
                          </span>
                          <div className="flex items-center gap-1 text-[#7CD5C7] font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-[#464B71] dark:text-[#F2F2ED]">{car.avgRating}</span>
                            <span className="text-[#676C8F] text-[11px]">({car.reviewCount})</span>
                          </div>
                        </div>

                        <h3 className="font-bold text-base text-[#464B71] dark:text-[#F2F2ED] line-clamp-1 group-hover:text-[#118AB2] transition-colors">
                          {car.title}
                        </h3>
                        <p className="text-[11px] text-[#676C8F] line-clamp-1 mt-0.5">
                          {car.variant || car.model}
                        </p>

                        {/* Specs Pill Grid */}
                        <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-[#DFDFD5] dark:border-[#373D60] text-[11px] text-[#676C8F] dark:text-[#A5ABC9]">
                          <div className="flex items-center gap-1">
                            <Fuel className="w-3 h-3 text-[#118AB2]" />
                            <span>{car.specs.fuelType}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Gauge className="w-3 h-3 text-[#7CD5C7]" />
                            <span>{car.specs.transmission === "AUTOMATIC" ? "Auto" : "Manual"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-[#464B71] dark:text-[#F2F2ED]" />
                            <span>{car.specs.seats} Seats</span>
                          </div>
                        </div>

                        {/* Mileage / Range & Clearance */}
                        <div className="flex items-center justify-between text-[11px] text-[#676C8F] dark:text-[#A5ABC9] mt-2 bg-[#F2F2ED]/60 dark:bg-[#464B71]/60 px-2.5 py-1 rounded-lg border border-[#DFDFD5]/60 dark:border-[#373D60]">
                          <span>
                            {isEv
                              ? `⚡ ${car.specs.rangeKm} km Range`
                              : `⛽ ${car.specs.mileageKmpl} km/l ARAI`}
                          </span>
                          <span>{car.specs.groundClearanceMm} mm Clearance</span>
                        </div>
                      </div>

                      {/* Pricing & CTA */}
                      <div className="pt-3 border-t border-[#DFDFD5] dark:border-[#373D60] flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-extrabold text-[#118AB2] font-['Outfit'] num-tabular">
                              {formatINR(car.dayRate)}
                            </span>
                            <span className="text-xs text-[#676C8F]">/day</span>
                          </div>
                          <p className="text-[10px] text-[#676C8F]">
                            Deposit: {formatINR(car.securityDeposit)}
                          </p>
                        </div>

                        <Link
                          href={`/vehicles/${car.slug}`}
                          className="px-4 py-2 rounded-xl bg-[#464B71] hover:bg-[#118AB2] dark:bg-[#118AB2] dark:hover:bg-[#0D6E8E] text-[#F2F2ED] text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ================= LIST VIEW ================= */
            <div className="space-y-4">
              {filteredCars.map((car) => {
                const saved = isSaved(car.id);
                const isEv = car.category === "ELECTRIC";

                return (
                  <div
                    key={car.id}
                    className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] shadow-xs hover:shadow-lg transition-all flex flex-col sm:flex-row gap-5 items-center group"
                  >
                    <div className="relative w-full sm:w-60 h-40 rounded-2xl overflow-hidden bg-[#464B71] shrink-0">
                      <img
                        src={car.images[0]?.url || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"}
                        alt={car.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={() => toggleSave(car.id)}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/40 text-white"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${saved ? "text-[#118AB2] fill-current" : ""}`} />
                      </button>
                    </div>

                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#F2F2ED] dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]">
                          {car.category.replace("_", " ")}
                        </span>
                        <div className="flex items-center gap-1 text-[#7CD5C7] text-xs font-bold">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-[#464B71] dark:text-[#F2F2ED]">{car.avgRating} ({car.reviewCount})</span>
                        </div>
                        <span className="text-[#DFDFD5] text-xs">•</span>
                        <span className="text-xs text-[#676C8F] dark:text-[#A5ABC9]">{car.city} Hub</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#464B71] dark:text-[#F2F2ED] group-hover:text-[#118AB2] transition-colors truncate">
                        {car.title}
                      </h3>
                      <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9] line-clamp-2 mt-1">
                        {car.description}
                      </p>

                      <div className="flex items-center gap-4 mt-3 text-xs text-[#676C8F] dark:text-[#A5ABC9]">
                        <span>{car.specs.fuelType}</span>
                        <span>•</span>
                        <span>{car.specs.transmission}</span>
                        <span>•</span>
                        <span>{car.specs.seats} Seats</span>
                        <span>•</span>
                        <span className="text-[#118AB2] font-semibold">
                          {isEv ? `${car.specs.rangeKm} km Range` : `${car.specs.mileageKmpl} km/l`}
                        </span>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0 w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-[#DFDFD5] dark:border-[#373D60]">
                      <div>
                        <div className="flex items-baseline sm:justify-end gap-1">
                          <span className="text-xl font-extrabold text-[#118AB2] font-['Outfit'] num-tabular">
                            {formatINR(car.dayRate)}
                          </span>
                          <span className="text-xs text-[#676C8F]">/day</span>
                        </div>
                        <p className="text-[10px] text-[#676C8F]">
                          ₹{car.perHourRate}/hr • FASTag Active
                        </p>
                      </div>

                      <Link
                        href={`/vehicles/${car.slug}`}
                        className="mt-2 px-5 py-2.5 rounded-xl bg-[#118AB2] hover:bg-[#0D6E8E] text-white text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <span>Book Machine</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* ================= MOBILE BOTTOM SHEET FILTERS ================= */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex flex-col justify-end">
          <div className="bg-[#F2F2ED] dark:bg-[#272B44] rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 space-y-5 animate-in slide-in-from-bottom duration-200 border-t border-[#DFDFD5] dark:border-[#373D60]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFDFD5] dark:border-[#373D60]">
              <h3 className="font-bold text-base text-[#464B71] dark:text-[#F2F2ED]">Filter Cars</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 rounded-full text-[#676C8F]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hub City */}
            <div>
              <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                Select City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-[#464B71] text-xs font-semibold text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]"
              >
                <option value="ALL">All 12 Cities</option>
                {INDIAN_CITIES.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                Fuel Type
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {["ALL", "PETROL", "DIESEL", "CNG", "ELECTRIC"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFuel(f)}
                    className={`py-2 rounded-xl text-center font-bold text-xs ${
                      selectedFuel === f ? "bg-[#118AB2] text-white" : "bg-white dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] mb-1">
                Transmission
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {["ALL", "AUTOMATIC", "MANUAL"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTransmission(t)}
                    className={`py-2 rounded-xl text-center font-bold text-xs ${
                      selectedTransmission === t ? "bg-[#118AB2] text-white" : "bg-white dark:bg-[#464B71] text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]"
                    }`}
                  >
                    {t === "ALL" ? "Any" : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Max Budget: {formatINR(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={1500}
                max={7000}
                step={200}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-[#118AB2]"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 rounded-xl bg-white dark:bg-[#464B71] text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] border border-[#DFDFD5] dark:border-[#373D60]"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-2 py-3 rounded-xl bg-[#118AB2] text-white text-xs font-bold hover:brightness-105"
              >
                Apply & View ({filteredCars.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Fleet Catalogue...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
