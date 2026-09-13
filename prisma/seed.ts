import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Purging old records and starting FleetFlow comprehensive seed...");
  await prisma.review.deleteMany();
  await prisma.blackoutDate.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.vehicleImage.deleteMany();
  await prisma.vehicleSpecs.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // 1. Seed Verified Users (Hosts and Renters)
  const hostMarcus = await prisma.user.create({
    data: {
      name: "Marcus Vance",
      email: "marcus.vance@fleetflow.io",
      role: "HOST",
      licenseNumber: "TX-9482017A",
      verifiedAt: new Date("2024-01-15T10:00:00Z"),
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      phone: "+1 (512) 883-9120",
    },
  });

  const hostElena = await prisma.user.create({
    data: {
      name: "Elena Rostova",
      email: "elena.rostova@fleetflow.io",
      role: "HOST",
      licenseNumber: "FL-3301982B",
      verifiedAt: new Date("2023-11-20T14:30:00Z"),
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      phone: "+1 (305) 774-2201",
    },
  });

  const hostDevon = await prisma.user.create({
    data: {
      name: "Devon Miller",
      email: "devon.miller@fleetflow.io",
      role: "HOST",
      licenseNumber: "CO-7102944C",
      verifiedAt: new Date("2024-02-01T09:15:00Z"),
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      phone: "+1 (720) 441-9983",
    },
  });

  const customerAlex = await prisma.user.create({
    data: {
      name: "Alex Sterling",
      email: "alex.sterling@gmail.com",
      role: "CUSTOMER",
      licenseNumber: "CA-8839201D",
      verifiedAt: new Date("2024-03-10T11:00:00Z"),
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      phone: "+1 (310) 555-0192",
    },
  });

  const customerSophia = await prisma.user.create({
    data: {
      name: "Sophia Chen",
      email: "sophia.chen@techventures.io",
      role: "CUSTOMER",
      licenseNumber: "WA-1192837E",
      verifiedAt: new Date("2024-04-12T16:20:00Z"),
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      phone: "+1 (206) 555-8841",
    },
  });

  console.log("✅ Seeded 5 Users (3 Hosts, 2 Renters)");

  // 2. Vehicle Definitions (14 Vehicles across CAR, MOTORCYCLE, TRUCK)
  const vehicleDefs = [
    // ------------------- CARS -------------------
    {
      hostId: hostMarcus.id,
      title: "2024 Tesla Model S Plaid (1,020 HP)",
      brand: "Tesla",
      model: "Model S Plaid",
      year: 2024,
      category: "CAR",
      slug: "tesla-model-s-plaid-2024-austin",
      description: "Experience mind-bending 0-60 in 1.99s with tri-motor all-wheel drive, full carbon ceramic interior accents, yoke steering, and 400+ miles of real-world battery range. Flawlessly maintained with Supercharging enabled.",
      locationAddress: "2200 South Congress Ave",
      city: "Austin",
      lat: 30.2456,
      lng: -97.7513,
      dayRate: 189.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "EV",
        seats: 5,
        doors: 4,
        luggageCapacity: 793,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80", caption: "Front three-quarter dynamic stance", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80", caption: "Cockpit with ultra-high resolution center display", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80", caption: "Sleek aerodynamic roofline", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80", caption: "Rear active carbon spoiler profile", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80", caption: "Clean wheels with red brake calipers", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerAlex.id, rating: 5, comment: "Insane acceleration and buttery smooth ride. Marcus was an incredible host, the car was pristine and at 90% charge upon pickup." },
        { authorId: customerSophia.id, rating: 5, comment: "Renting this for a weekend tech summit in downtown Austin was a highlight of my trip. Autopilot on MoPac was flawless." },
      ],
    },
    {
      hostId: hostElena.id,
      title: "2023 Porsche 911 GT3 (Shark Blue)",
      brand: "Porsche",
      model: "911 GT3",
      year: 2023,
      category: "CAR",
      slug: "porsche-911-gt3-shark-blue-miami",
      description: "The pinnacle of naturally aspirated engineering. 4.0L flat-six spinning to 9,000 RPM delivering 502 HP through an lightning-fast 7-speed PDK transmission. Finished in head-turning Shark Blue with Front Axle Lift.",
      locationAddress: "1100 Ocean Drive",
      city: "Miami",
      lat: 25.7825,
      lng: -80.1303,
      dayRate: 349.0,
      weeklyDiscountPercentage: 10.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "PETROL",
        seats: 2,
        doors: 2,
        luggageCapacity: 132,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80", caption: "Porsche GT3 track-ready front splitter", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80", caption: "Aggressive swan-neck rear wing", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80", caption: "Alcantara racing interior and sport chrono dial", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1611821064430-0d40291d0f0d?auto=format&fit=crop&w=1200&q=80", caption: "Central dual sport exhaust tips", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80", caption: "Forged center-lock alloy wheels", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerAlex.id, rating: 5, comment: "The sound at 9,000 RPM cruising across Biscayne Bay is unforgettable. Elena is top-tier host with concierge handover." },
      ],
    },
    {
      hostId: hostMarcus.id,
      title: "2024 BMW M4 Competition Coupe",
      brand: "BMW",
      model: "M4 Competition",
      year: 2024,
      category: "CAR",
      slug: "bmw-m4-competition-2024-los-angeles",
      description: "503 HP S58 Twin-Turbo Inline-6 mated to M xDrive. Carbon bucket seats, executive package, heads-up display, and Harman Kardon surround audio. The ultimate canyon carver for Angeles Crest Highway.",
      locationAddress: "8500 Wilshire Blvd",
      city: "Los Angeles",
      lat: 34.0658,
      lng: -118.3768,
      dayRate: 219.0,
      weeklyDiscountPercentage: 12.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "PETROL",
        seats: 4,
        doors: 2,
        luggageCapacity: 440,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80", caption: "Bold M-twin kidney grille and Isle of Man Green finish", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80", caption: "Staggered 19/20 inch M light alloy rims", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80", caption: "M carbon bucket sport seats", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80", caption: "Rear quad exhaust diffusers", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80", caption: "Full curved digital cockpit display", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerAlex.id, rating: 5, comment: "Took this up the PCH and Mulholland Drive. Incredible grip and precision. Seamless handoff." },
      ],
    },
    {
      hostId: hostDevon.id,
      title: "2024 Range Rover Autobiography V8",
      brand: "Land Rover",
      model: "Range Rover Autobiography",
      year: 2024,
      category: "CAR",
      slug: "range-rover-autobiography-2024-denver",
      description: "First-class luxury with twin-turbocharged 523 HP V8, executive class rear seating with hot stone massage, all-wheel steering, and air suspension tailored for both Rocky Mountain snow and city elegance.",
      locationAddress: "1600 California St",
      city: "Denver",
      lat: 39.7454,
      lng: -104.9922,
      dayRate: 279.0,
      weeklyDiscountPercentage: 14.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "HYBRID",
        seats: 5,
        doors: 4,
        luggageCapacity: 818,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80", caption: "Monolithic luxury SUV silhouette", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1541348263662-e0c86430dc94?auto=format&fit=crop&w=1200&q=80", caption: "Semi-aniline leather executive cabin", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80", caption: "Panoramic sunroof framing the alpine skies", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80", caption: "Meridian 3D signature audio system", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80", caption: "23-inch forged diamond-turned wheels", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerSophia.id, rating: 5, comment: "We drove to Vail and Aspen in total comfort. Heated massage seats made the mountain drive a dream." },
      ],
    },
    {
      hostId: hostElena.id,
      title: "2023 Mercedes-AMG G 63 (Night Package)",
      brand: "Mercedes-Benz",
      model: "G 63 AMG",
      year: 2023,
      category: "CAR",
      slug: "mercedes-amg-g-63-2023-miami",
      description: "Iconic military-inspired presence powered by a handcrafted 577 HP 4.0L Biturbo V8 with side-exit exhaust roar. Designo Diamond White with G Manufaktur red/black quilted Nappa leather interior.",
      locationAddress: "1900 Collins Ave",
      city: "Miami",
      lat: 25.7946,
      lng: -80.1298,
      dayRate: 389.0,
      weeklyDiscountPercentage: 10.0,
      instantBookable: false,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "PETROL",
        seats: 5,
        doors: 4,
        luggageCapacity: 667,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80", caption: "Matte black Night Package G-Wagon", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80", caption: "Side-exit dual chrome exhaust pipes", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80", caption: "Panamericana AMG front grille", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1541348263662-e0c86430dc94?auto=format&fit=crop&w=1200&q=80", caption: "Red leather diamond stitching and IWC dashboard clock", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80", caption: "22-inch forged cross-spoke wheels", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerAlex.id, rating: 5, comment: "Turned heads everywhere in South Beach and Brickell. The side exhaust rumble is unmatched." },
      ],
    },

    // ------------------- MOTORCYCLES -------------------
    {
      hostId: hostDevon.id,
      title: "2023 BMW R1250 GS Adventure (Triple Black)",
      brand: "BMW",
      model: "R1250 GS Adventure",
      year: 2023,
      category: "MOTORCYCLE",
      slug: "bmw-r1250-gs-adventure-2023-denver",
      description: "The benchmark world-touring adventure bike. 1254cc ShiftCam Boxer twin producing 136 HP and 143 Nm of torque. Equipped with dynamic ESA suspension, aluminium panniers, heated grips, and 30-liter expedition fuel tank.",
      locationAddress: "2401 Blake St",
      city: "Denver",
      lat: 39.7561,
      lng: -104.9942,
      dayRate: 145.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: true,
      specs: {
        transmission: "MANUAL",
        fuelType: "PETROL",
        engineDisplacementCc: 1254,
        seatHeightMm: 890,
        helmetProvided: true,
        bikeType: "ADVENTURE",
      },
      images: [
        { url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80", caption: "Rugged adventure tourer ready for the Rockies", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80", caption: "Cockpit with full 6.5-inch TFT connectivity display", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80", caption: "Twin-cylinder Boxer cylinder head protection", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80", caption: "Spoked cross-spoke tubeless off-road wheels", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80", caption: "High touring windscreen and auxiliary LED fog lamps", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerSophia.id, rating: 5, comment: "Rode Trail Ridge Road in Rocky Mountain National Park. Super stable even in windy switchbacks, and Devon provided Shoei helmets." },
      ],
    },
    {
      hostId: hostMarcus.id,
      title: "2024 Ducati Panigale V4 S (Corse Livery)",
      brand: "Ducati",
      model: "Panigale V4 S",
      year: 2024,
      category: "MOTORCYCLE",
      slug: "ducati-panigale-v4-s-2024-austin",
      description: "Direct descendant of MotoGP. 1103cc Desmosedici Stradale V4 engine screaming out 215.5 HP at 13,000 RPM. Features Öhlins Smart EC 2.0 electronic suspension, Brembo Stylema brakes, and biplane aerodynamic winglets.",
      locationAddress: "1200 E 6th St",
      city: "Austin",
      lat: 30.2642,
      lng: -97.7289,
      dayRate: 195.0,
      weeklyDiscountPercentage: 10.0,
      instantBookable: true,
      specs: {
        transmission: "MANUAL",
        fuelType: "PETROL",
        engineDisplacementCc: 1103,
        seatHeightMm: 835,
        helmetProvided: true,
        bikeType: "SPORT",
      },
      images: [
        { url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80", caption: "Italian superbike aggression in Ducati Corse red", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80", caption: "Carbon fiber front aerodynamic winglets", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80", caption: "Single-sided aluminum swingarm profile", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80", caption: "Brembo Stylema calipers and Öhlins golden forks", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80", caption: "Under-belly titanium Akrapovic exhaust line", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerAlex.id, rating: 5, comment: "Rode this near COTA during MotoGP weekend. Nothing on earth accelerates like this V4 engine. Pristine machine." },
      ],
    },
    {
      hostId: hostElena.id,
      title: "2023 Harley-Davidson Fat Boy 114 (Vivid Black)",
      brand: "Harley-Davidson",
      model: "Fat Boy 114",
      year: 2023,
      category: "MOTORCYCLE",
      slug: "harley-davidson-fat-boy-114-2023-los-angeles",
      description: "The original fat-custom icon. Massive 1868cc Milwaukee-Eight 114 V-Twin engine producing deep rumbling low-end torque. Solid Lakester cast aluminium disc wheels and low-slung 675mm seat height for relaxed Pacific Coast cruising.",
      locationAddress: "1400 Ocean Ave",
      city: "Los Angeles",
      lat: 34.0125,
      lng: -118.4952,
      dayRate: 155.0,
      weeklyDiscountPercentage: 12.0,
      instantBookable: true,
      specs: {
        transmission: "MANUAL",
        fuelType: "PETROL",
        engineDisplacementCc: 1868,
        seatHeightMm: 675,
        helmetProvided: true,
        bikeType: "CRUISER",
      },
      images: [
        { url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80", caption: "Muscular fat-custom American cruiser stance", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80", caption: "Signature steamroller solid cast aluminum wheels", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80", caption: "Bright satin chrome finishes on the Milwaukee-Eight 114", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80", caption: "Wide footprint 240mm rear cruiser tire", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80", caption: "Signature LED headlamp ring nacelle", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerAlex.id, rating: 5, comment: "Cruising down Santa Monica Boulevard towards Venice Beach on this bike was pure cinematic joy." },
      ],
    },
    {
      hostId: hostDevon.id,
      title: "2023 Triumph Bonneville T120 (Cranberry Red)",
      brand: "Triumph",
      model: "Bonneville T120",
      year: 2023,
      category: "MOTORCYCLE",
      slug: "triumph-bonneville-t120-2023-seattle",
      description: "Timeless British modern classic. 1200cc high-torque parallel twin, wire-spoke wheels, twin peashooter exhausts, dual riding modes (Road/Rain), cruise control, and torque-assist clutch. Perfect for urban Puget Sound explorations.",
      locationAddress: "1901 1st Ave",
      city: "Seattle",
      lat: 47.6101,
      lng: -122.3421,
      dayRate: 125.0,
      weeklyDiscountPercentage: 14.0,
      instantBookable: true,
      specs: {
        transmission: "MANUAL",
        fuelType: "PETROL",
        engineDisplacementCc: 1200,
        seatHeightMm: 790,
        helmetProvided: true,
        bikeType: "NAKED",
      },
      images: [
        { url: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80", caption: "Heritage British parallel twin with sculpted fuel tank", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80", caption: "Chrome engine covers and twin throttle bodies", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80", caption: "Handcrafted ribbed bench saddle", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80", caption: "Twin analogue clocks with integrated multi-function LCDs", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80", caption: "Wire spoked wheels and Brembo front discs", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerAlex.id, rating: 5, comment: "Effortless torque and upright ergonomic comfort. Perfect bike to take across Bainbridge Island." },
      ],
    },
    {
      hostId: hostDevon.id,
      title: "2024 KTM 890 Adventure R (Rally Ready)",
      brand: "KTM",
      model: "890 Adventure R",
      year: 2024,
      category: "MOTORCYCLE",
      slug: "ktm-890-adventure-r-2024-denver",
      description: "Dakar-bred rally performer with 889cc parallel twin churning out 105 HP. WP XPLOR fully adjustable suspension, cornering ABS with dedicated Offroad mode, and low-slung horseshoe fuel tank for superb balance on technical terrain.",
      locationAddress: "1350 Larimer St",
      city: "Denver",
      lat: 39.7497,
      lng: -104.9996,
      dayRate: 139.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: true,
      specs: {
        transmission: "MANUAL",
        fuelType: "PETROL",
        engineDisplacementCc: 889,
        seatHeightMm: 880,
        helmetProvided: false,
        bikeType: "ADVENTURE",
      },
      images: [
        { url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80", caption: "Aggressive orange rally graphics and tall ground clearance", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80", caption: "WP XPLOR upside-down front forks", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80", caption: "High-mount off-road rally seat and tank profile", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80", caption: "Knobby Michelin Anakee Wild dual-sport tires", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80", caption: "Aluminum skid plate engine belly guard", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerSophia.id, rating: 5, comment: "Took this over Guanella Pass. Suspension ate up every rocky washboard road without a stutter." },
      ],
    },

    // ------------------- TRUCKS & HAULERS -------------------
    {
      hostId: hostMarcus.id,
      title: "2024 Ford F-150 Lightning Platinum EV",
      brand: "Ford",
      model: "F-150 Lightning",
      year: 2024,
      category: "TRUCK",
      slug: "ford-f-150-lightning-platinum-2024-austin",
      description: "The electric revolution in full-size trucks. 580 HP dual electric motors, 775 lb-ft of torque, Mega Power Frunk with 400L lockable dry storage, 9.6 kW Pro Power Onboard generator, and 10,000 lbs maximum towing capacity.",
      locationAddress: "300 Guadalupe St",
      city: "Austin",
      lat: 30.2662,
      lng: -97.7471,
      dayRate: 169.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "EV",
        payloadCapacityKg: 1000,
        bedLengthMeters: 1.7,
        towingCapacityKg: 4535,
        commercialLicenseRequired: false,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80", caption: "Signature cross-cab front LED light bar", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80", caption: "Durable composite bed with tailgate work surface", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80", caption: "Spacious Crew Cab leather interior with fold-flat workstation", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80", caption: "Mega Power Frunk opened showing internal power outlets", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80", caption: "22-inch bright machined aluminum wheels", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerSophia.id, rating: 5, comment: "Rented this for hauling film equipment across Austin hill country. The frunk power outlets powered all our gear on location!" },
        { authorId: customerAlex.id, rating: 5, comment: "Silent, remarkably fast, and so comfortable on the highway. Marcus is the gold standard for fleet hosts." },
      ],
    },
    {
      hostId: hostElena.id,
      title: "2024 Rivian R1T Adventure (Quad-Motor)",
      brand: "Rivian",
      model: "R1T Adventure",
      year: 2024,
      category: "TRUCK",
      slug: "rivian-r1t-adventure-2024-seattle",
      description: "835 HP quad-motor all-wheel drive with independent torque vectoring at each wheel. Gear Tunnel pass-through storage, powered tonneau cover, integrated air compressor, and 14.9 inches of adjustable ground clearance for any Pacific Northwest trek.",
      locationAddress: "1201 3rd Ave",
      city: "Seattle",
      lat: 47.6074,
      lng: -122.3361,
      dayRate: 185.0,
      weeklyDiscountPercentage: 12.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "EV",
        payloadCapacityKg: 800,
        bedLengthMeters: 1.4,
        towingCapacityKg: 5000,
        commercialLicenseRequired: false,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80", caption: "Rivian stadium front headlamps in Glacier White", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80", caption: "Rear wrap-around red LED lightbar and cargo bed", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80", caption: "Signature transversal Gear Tunnel open for baggage", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80", caption: "Warm minimalist vegan leather cabin with natural wood trim", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80", caption: "20-inch all-terrain tire package with Pirelli rubber", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerAlex.id, rating: 5, comment: "Drove out to Mount Rainier. Handles like a sports sedan on curvy roads and crawled effortlessly over snow and gravel." },
      ],
    },
    {
      hostId: hostMarcus.id,
      title: "2023 RAM 2500 Heavy Duty Cummins Diesel",
      brand: "RAM",
      model: "2500 Heavy Duty",
      year: 2023,
      category: "TRUCK",
      slug: "ram-2500-heavy-duty-cummins-2023-austin",
      description: "Commercial heavy hauler with the legendary 6.7L Cummins Turbo Diesel churning out 850 lb-ft of brute torque. 8-foot long bed, fifth-wheel gooseneck prep group, RamBox bedside lockable storage, and trailer camera guidance.",
      locationAddress: "901 E Ben White Blvd",
      city: "Austin",
      lat: 30.2224,
      lng: -97.7551,
      dayRate: 215.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: false,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "DIESEL",
        payloadCapacityKg: 1420,
        bedLengthMeters: 2.4,
        towingCapacityKg: 8950,
        commercialLicenseRequired: true,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80", caption: "Heavy-duty chrome front grille and dual towing mirrors", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80", caption: "Full 8-foot spray-in bed liner with cargo tiedown cleats", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80", caption: "Heavy duty steel trailer hitch receiver", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80", caption: "Spacious Crew Cab with 12-inch Uconnect touchscreen", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80", caption: "Heavy-duty rear leaf spring suspension and axle", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerSophia.id, rating: 5, comment: "Hauled a 28ft race trailer with zero effort. The Cummins diesel didn't even notice the weight." },
      ],
    },
    {
      hostId: hostDevon.id,
      title: "2024 Toyota Tacoma TRD Pro Hybrid",
      brand: "Toyota",
      model: "Tacoma TRD Pro",
      year: 2024,
      category: "TRUCK",
      slug: "toyota-tacoma-trd-pro-2024-denver",
      description: "The premier mid-size overlanding platform. 326 HP i-FORCE MAX Hybrid powertrain, FOX QS3 2.5-inch Internal Bypass shocks, IsoDynamic performance front seats with internal air-over-oil dampening, and high-clearance ARB metal bumper.",
      locationAddress: "1401 Lawrence St",
      city: "Denver",
      lat: 39.7483,
      lng: -104.9972,
      dayRate: 149.0,
      weeklyDiscountPercentage: 12.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "HYBRID",
        payloadCapacityKg: 775,
        bedLengthMeters: 1.5,
        towingCapacityKg: 2950,
        commercialLicenseRequired: false,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80", caption: "TRD Pro heritage heritage TOYOTA heritage script grille", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80", caption: "FOX internal bypass shock reservoirs and red suspension arms", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80", caption: "Composite bed with 2400W AC power inverter outlet", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80", caption: "TRD Pro IsoDynamic front sport seats", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80", caption: "Goodyear Territory R/T 33-inch tires and black alloy rims", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerAlex.id, rating: 5, comment: "Overlanded near Breckenridge. Smooth on the asphalt and unstoppable in the mud and dirt." },
      ],
    },
  ];

  for (const vDef of vehicleDefs) {
    const { specs, images, reviews, ...baseFields } = vDef;
    const vehicle = await prisma.vehicle.create({
      data: {
        ...baseFields,
        specs: {
          create: specs,
        },
        images: {
          create: images,
        },
      },
    });

    // Add reviews
    for (const r of reviews) {
      await prisma.review.create({
        data: {
          vehicleId: vehicle.id,
          authorId: r.authorId,
          rating: r.rating,
          comment: r.comment,
        },
      });
    }

    console.log(`  + Seeded vehicle: ${vehicle.title} (${vehicle.category})`);
  }

  // 3. Seed Realistic Bookings (Active, Upcoming, Completed)
  const tesla = await prisma.vehicle.findFirst({ where: { slug: "tesla-model-s-plaid-2024-austin" } });
  const bmwBike = await prisma.vehicle.findFirst({ where: { slug: "bmw-r1250-gs-adventure-2023-denver" } });
  const fordTruck = await prisma.vehicle.findFirst({ where: { slug: "ford-f-150-lightning-platinum-2024-austin" } });

  if (tesla) {
    // Completed trip
    await prisma.booking.create({
      data: {
        vehicleId: tesla.id,
        customerId: customerAlex.id,
        startDate: new Date("2026-08-10T10:00:00Z"),
        endDate: new Date("2026-08-14T18:00:00Z"),
        status: "COMPLETED",
        totalDays: 4,
        dayRateSnapshot: 189.0,
        discountApplied: 0,
        serviceFee: 75.6,
        securityDeposit: 500.0,
        totalPrice: 1331.6,
        stripePaymentIntentId: "pi_fleetflow_demo_completed_01",
      },
    });

    // Upcoming booking for next month (test collision detection)
    await prisma.booking.create({
      data: {
        vehicleId: tesla.id,
        customerId: customerSophia.id,
        startDate: new Date("2026-10-15T10:00:00Z"),
        endDate: new Date("2026-10-18T18:00:00Z"),
        status: "CONFIRMED",
        totalDays: 3,
        dayRateSnapshot: 189.0,
        discountApplied: 0,
        serviceFee: 56.7,
        securityDeposit: 500.0,
        totalPrice: 1123.7,
        stripePaymentIntentId: "pi_fleetflow_demo_upcoming_02",
      },
    });

    // Blackout Date for maintenance
    await prisma.blackoutDate.create({
      data: {
        vehicleId: tesla.id,
        startDate: new Date("2026-10-25T00:00:00Z"),
        endDate: new Date("2026-10-27T23:59:59Z"),
        reason: "MAINTENANCE",
      },
    });
  }

  if (bmwBike) {
    // Active Booking
    await prisma.booking.create({
      data: {
        vehicleId: bmwBike.id,
        customerId: customerAlex.id,
        startDate: new Date("2026-09-12T09:00:00Z"),
        endDate: new Date("2026-09-16T18:00:00Z"),
        status: "ACTIVE",
        totalDays: 4,
        dayRateSnapshot: 145.0,
        discountApplied: 0,
        serviceFee: 58.0,
        securityDeposit: 400.0,
        totalPrice: 1038.0,
        stripePaymentIntentId: "pi_fleetflow_demo_active_03",
      },
    });
  }

  if (fordTruck) {
    await prisma.booking.create({
      data: {
        vehicleId: fordTruck.id,
        customerId: customerSophia.id,
        startDate: new Date("2026-09-20T08:00:00Z"),
        endDate: new Date("2026-09-28T18:00:00Z"),
        status: "CONFIRMED",
        totalDays: 8,
        dayRateSnapshot: 169.0,
        discountApplied: 202.8, // 15% weekly discount
        serviceFee: 114.92,
        securityDeposit: 500.0,
        totalPrice: 1766.12,
        stripePaymentIntentId: "pi_fleetflow_demo_upcoming_04",
      },
    });
  }

  console.log("✅ Seeded Bookings & Maintenance Blackout Windows");
  console.log("🚀 FleetFlow Database Seeding Complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
