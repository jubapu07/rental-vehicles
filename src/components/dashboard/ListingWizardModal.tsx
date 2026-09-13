"use client";

import { useState } from "react";
import { X, Check, ArrowRight, ArrowLeft, Car, Bike, Truck, Sparkles, Image as ImageIcon } from "lucide-react";

interface ListingWizardModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ListingWizardModal({ onClose, onSuccess }: ListingWizardModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [category, setCategory] = useState<"CAR" | "MOTORCYCLE" | "TRUCK">("CAR");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("2024");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Austin");
  const [locationAddress, setLocationAddress] = useState("");
  const [description, setDescription] = useState("");

  // Category Specific Specs
  // Car
  const [seats, setSeats] = useState("5");
  const [doors, setDoors] = useState("4");
  const [luggageCapacity, setLuggageCapacity] = useState("450");
  const [transmission, setTransmission] = useState("AUTOMATIC");
  const [fuelType, setFuelType] = useState("EV");
  // Bike
  const [engineDisplacementCc, setEngineDisplacementCc] = useState("1000");
  const [seatHeightMm, setSeatHeightMm] = useState("820");
  const [bikeType, setBikeType] = useState("SPORT");
  const [helmetProvided, setHelmetProvided] = useState(true);
  // Truck
  const [payloadCapacityKg, setPayloadCapacityKg] = useState("1000");
  const [bedLengthMeters, setBedLengthMeters] = useState("1.8");
  const [towingCapacityKg, setTowingCapacityKg] = useState("4500");
  const [commercialLicenseRequired, setCommercialLicenseRequired] = useState(false);

  // Photos
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
  );
  const [photo2Url, setPhoto2Url] = useState(
    "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80"
  );
  const [photo3Url, setPhoto3Url] = useState(
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80"
  );

  // Pricing & Blackouts
  const [dayRate, setDayRate] = useState("175");
  const [weeklyDiscountPercentage, setWeeklyDiscountPercentage] = useState("12");
  const [instantBookable, setInstantBookable] = useState(true);
  const [blackoutStartDate, setBlackoutStartDate] = useState("");
  const [blackoutEndDate, setBlackoutEndDate] = useState("");

  // Auto-generate title if empty
  const handleNextStep1 = () => {
    if (!brand || !model) {
      setError("Please specify both Brand and Model.");
      return;
    }
    setError(null);
    if (!title) {
      setTitle(`${year} ${brand} ${model}`);
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const specsPayload = {
      transmission,
      fuelType,
      ...(category === "CAR" && {
        seats: parseInt(seats, 10),
        doors: parseInt(doors, 10),
        luggageCapacity: parseInt(luggageCapacity, 10),
      }),
      ...(category === "MOTORCYCLE" && {
        engineDisplacementCc: parseInt(engineDisplacementCc, 10),
        seatHeightMm: parseInt(seatHeightMm, 10),
        bikeType,
        helmetProvided,
      }),
      ...(category === "TRUCK" && {
        payloadCapacityKg: parseInt(payloadCapacityKg, 10),
        bedLengthMeters: parseFloat(bedLengthMeters),
        towingCapacityKg: parseInt(towingCapacityKg, 10),
        commercialLicenseRequired,
      }),
    };

    const imagesPayload = [
      { url: coverPhotoUrl, caption: `${title} Primary View` },
      ...(photo2Url ? [{ url: photo2Url, caption: `${title} Interior/Side View` }] : []),
      ...(photo3Url ? [{ url: photo3Url, caption: `${title} Detail View` }] : []),
    ];

    try {
      const res = await fetch("/api/host/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          brand,
          model,
          year,
          category,
          description,
          locationAddress: locationAddress || `${city} Central Mobility Hub`,
          city,
          dayRate,
          weeklyDiscountPercentage,
          instantBookable,
          specs: specsPayload,
          images: imagesPayload,
          blackoutStartDate: blackoutStartDate || null,
          blackoutEndDate: blackoutEndDate || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to register vehicle.");
        setLoading(false);
        return;
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Network error while submitting listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-[#0F2432] text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E05A36] bg-[#E05A36]/20 px-2.5 py-0.5 rounded-md">
              Host Onboarding Wizard
            </span>
            <h2 className="text-xl font-black mt-1">List a New Fleet Vehicle</h2>
            <p className="text-xs text-slate-400">Step {step} of 4</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100 flex">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 transition-all duration-300 ${
                s <= step ? "bg-[#E05A36]" : "bg-transparent"
              }`}
            />
          ))}
        </div>

        {/* Wizard Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          {/* STEP 1: Category & Basics */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Select Mobility Category
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setCategory("CAR")}
                    className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                      category === "CAR"
                        ? "border-[#E05A36] bg-[#E05A36]/5 text-[#0F2432] ring-2 ring-[#E05A36]"
                        : "border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Car className="w-6 h-6 mx-auto mb-1.5 text-[#E05A36]" />
                    <span className="text-xs font-bold block">Automobile</span>
                    <span className="text-[10px] text-slate-400">Sedan, Sport, SUV</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory("MOTORCYCLE")}
                    className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                      category === "MOTORCYCLE"
                        ? "border-[#E67E22] bg-[#E67E22]/5 text-[#0F2432] ring-2 ring-[#E67E22]"
                        : "border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Bike className="w-6 h-6 mx-auto mb-1.5 text-[#E67E22]" />
                    <span className="text-xs font-bold block">Motorcycle</span>
                    <span className="text-[10px] text-slate-400">Touring, Sport, Cruiser</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory("TRUCK")}
                    className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                      category === "TRUCK"
                        ? "border-emerald-600 bg-emerald-50 text-[#0F2432] ring-2 ring-emerald-600"
                        : "border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Truck className="w-6 h-6 mx-auto mb-1.5 text-emerald-600" />
                    <span className="text-xs font-bold block">Truck & Hauler</span>
                    <span className="text-[10px] text-slate-400">EV, Heavy-Duty, Bed</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Porsche, BMW, Ford"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F2432]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Model</label>
                  <input
                    type="text"
                    placeholder="e.g. 911, M3, R1250 GS"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F2432]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F2432]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">City Hub</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F2432]"
                  >
                    <option value="Austin">Austin, TX</option>
                    <option value="Miami">Miami, FL</option>
                    <option value="Los Angeles">Los Angeles, CA</option>
                    <option value="Denver">Denver, CO</option>
                    <option value="Seattle">Seattle, WA</option>
                    <option value="Dallas">Dallas, TX</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Handover Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 Congress Ave"
                    value={locationAddress}
                    onChange={(e) => setLocationAddress(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F2432]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Vehicle Description</label>
                <textarea
                  rows={3}
                  placeholder="Highlight unique performance packages, upgrades, or rules..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs font-normal px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0F2432]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2432] hover:bg-[#E05A36] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  <span>Continue to Technical Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Category Attributes */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-slate-800">
                  Configuring attributes for: <span className="text-[#E05A36]">{category}</span>
                </p>
              </div>

              {/* Common Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Transmission</label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="AUTOMATIC">Automatic</option>
                    <option value="MANUAL">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Fuel / Powertrain</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="EV">⚡ Electric (EV)</option>
                    <option value="PETROL">⛽ Petrol / Gasoline</option>
                    <option value="HYBRID">🌿 Hybrid</option>
                    <option value="DIESEL">🚜 Turbo Diesel</option>
                  </select>
                </div>
              </div>

              {/* CAR Specific Fields */}
              {category === "CAR" && (
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Seats</label>
                    <input
                      type="number"
                      value={seats}
                      onChange={(e) => setSeats(e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Doors</label>
                    <input
                      type="number"
                      value={doors}
                      onChange={(e) => setDoors(e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Trunk Liters</label>
                    <input
                      type="number"
                      value={luggageCapacity}
                      onChange={(e) => setLuggageCapacity(e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
              )}

              {/* MOTORCYCLE Specific Fields */}
              {category === "MOTORCYCLE" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Displacement (CC)</label>
                      <input
                        type="number"
                        value={engineDisplacementCc}
                        onChange={(e) => setEngineDisplacementCc(e.target.value)}
                        className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Seat Height (mm)</label>
                      <input
                        type="number"
                        value={seatHeightMm}
                        onChange={(e) => setSeatHeightMm(e.target.value)}
                        className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Bike Class</label>
                      <select
                        value={bikeType}
                        onChange={(e) => setBikeType(e.target.value)}
                        className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300"
                      >
                        <option value="SPORT">Sport</option>
                        <option value="ADVENTURE">Adventure</option>
                        <option value="CRUISER">Cruiser</option>
                        <option value="NAKED">Naked</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                    <input
                      type="checkbox"
                      id="helmet"
                      checked={helmetProvided}
                      onChange={(e) => setHelmetProvided(e.target.checked)}
                      className="w-4 h-4 accent-[#E05A36] rounded"
                    />
                    <label htmlFor="helmet" className="text-xs font-bold text-slate-800">
                      DOT/ECE Certified Helmet Provided with Rental
                    </label>
                  </div>
                </div>
              )}

              {/* TRUCK Specific Fields */}
              {category === "TRUCK" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Payload (kg)</label>
                      <input
                        type="number"
                        value={payloadCapacityKg}
                        onChange={(e) => setPayloadCapacityKg(e.target.value)}
                        className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Bed Length (m)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={bedLengthMeters}
                        onChange={(e) => setBedLengthMeters(e.target.value)}
                        className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Towing (kg)</label>
                      <input
                        type="number"
                        value={towingCapacityKg}
                        onChange={(e) => setTowingCapacityKg(e.target.value)}
                        className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                    <input
                      type="checkbox"
                      id="cdl"
                      checked={commercialLicenseRequired}
                      onChange={(e) => setCommercialLicenseRequired(e.target.checked)}
                      className="w-4 h-4 accent-[#E05A36] rounded"
                    />
                    <label htmlFor="cdl" className="text-xs font-bold text-slate-800">
                      Commercial Driver License (CDL) Required
                    </label>
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2432] hover:bg-[#E05A36] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  <span>Continue to Photography</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: High-Res Photos */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Provide direct CDN image links for editorial presentation on your vehicle profile.
              </p>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#E05A36]" />
                  Cover Photo URL (Primary Card & Bento Spotlight)
                </label>
                <input
                  type="text"
                  value={coverPhotoUrl}
                  onChange={(e) => setCoverPhotoUrl(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Photo 2 (Interior / Cockpit)
                </label>
                <input
                  type="text"
                  value={photo2Url}
                  onChange={(e) => setPhoto2Url(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Photo 3 (Rear / Side Details)
                </label>
                <input
                  type="text"
                  value={photo3Url}
                  onChange={(e) => setPhoto3Url(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              {/* Cover Preview */}
              {coverPhotoUrl && (
                <div className="mt-2 rounded-2xl overflow-hidden aspect-16/9 bg-slate-100 border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverPhotoUrl}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2432] hover:bg-[#E05A36] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  <span>Continue to Rates & Calendar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Pricing & Blackout Calendar */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Day Rate ($ USD)
                  </label>
                  <input
                    type="number"
                    value={dayRate}
                    onChange={(e) => setDayRate(e.target.value)}
                    className="w-full text-sm font-extrabold px-3 py-2.5 rounded-xl border border-slate-300 text-[#0F2432]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Weekly Duration Discount (%)
                  </label>
                  <input
                    type="number"
                    value={weeklyDiscountPercentage}
                    onChange={(e) => setWeeklyDiscountPercentage(e.target.value)}
                    className="w-full text-sm font-extrabold px-3 py-2.5 rounded-xl border border-slate-300 text-emerald-700"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <input
                  type="checkbox"
                  id="instant"
                  checked={instantBookable}
                  onChange={(e) => setInstantBookable(e.target.checked)}
                  className="w-4 h-4 accent-[#E05A36] rounded"
                />
                <label htmlFor="instant" className="text-xs font-bold text-slate-800">
                  Enable Instant Booking (Boosts search rank & booking conversion by 40%)
                </label>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <p className="text-xs font-bold text-slate-900">
                  Optional Initial Blackout Dates (e.g. Maintenance or Personal Use)
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Blackout Start</label>
                    <input
                      type="date"
                      value={blackoutStartDate}
                      onChange={(e) => setBlackoutStartDate(e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Blackout End</label>
                    <input
                      type="date"
                      value={blackoutEndDate}
                      onChange={(e) => setBlackoutEndDate(e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E05A36] hover:bg-[#C94C2B] disabled:opacity-50 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Publishing to Fleet...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Publish Fleet Listing</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
