import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🇮🇳 Starting FleetFlow India comprehensive seed with Indian vehicles & INR pricing...");
  await prisma.review.deleteMany();
  await prisma.blackoutDate.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.vehicleImage.deleteMany();
  await prisma.vehicleSpecs.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // 1. Seed Verified Indian Users (Hosts and Renters)
  const hostVikram = await prisma.user.create({
    data: {
      name: "Vikram Malhotra",
      email: "vikram.malhotra@fleetflow.in",
      role: "HOST",
      licenseNumber: "KA-01-2021-9874561",
      verifiedAt: new Date("2024-01-15T10:00:00Z"),
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      phone: "+91 98450 12839",
    },
  });

  const hostAnanya = await prisma.user.create({
    data: {
      name: "Ananya Deshmukh",
      email: "ananya.deshmukh@fleetflow.in",
      role: "HOST",
      licenseNumber: "MH-02-2022-8392014",
      verifiedAt: new Date("2023-11-20T14:30:00Z"),
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      phone: "+91 98201 44920",
    },
  });

  const hostRajesh = await prisma.user.create({
    data: {
      name: "Rajesh Choudhary",
      email: "rajesh.choudhary@fleetflow.in",
      role: "HOST",
      licenseNumber: "DL-04-2020-5541982",
      verifiedAt: new Date("2024-02-01T09:15:00Z"),
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      phone: "+91 98110 33921",
    },
  });

  const customerArjun = await prisma.user.create({
    data: {
      name: "Arjun Mehta",
      email: "arjun.mehta@gmail.com",
      role: "CUSTOMER",
      licenseNumber: "MH-12-2023-1192837",
      verifiedAt: new Date("2024-03-10T11:00:00Z"),
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
      phone: "+91 97654 88201",
    },
  });

  const customerPriya = await prisma.user.create({
    data: {
      name: "Priya Sharma",
      email: "priya.sharma@techscale.io",
      role: "CUSTOMER",
      licenseNumber: "KA-03-2022-7749201",
      verifiedAt: new Date("2024-04-12T16:20:00Z"),
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      phone: "+91 99801 66320",
    },
  });

  console.log("✅ Seeded 5 Indian Users (3 Hosts, 2 Renters)");

  // 2. Indian Vehicle Definitions (16 Vehicles across CAR, MOTORCYCLE, TRUCK)
  const vehicleDefs = [
    // ------------------- CARS (SUVs, 4x4s, EVs) -------------------
    {
      hostId: hostVikram.id,
      title: "2024 Mahindra Thar 4x4 Hard Top (mHawk Diesel AT)",
      brand: "Mahindra",
      model: "Thar 4x4",
      year: 2024,
      category: "CAR",
      slug: "mahindra-thar-4x4-hard-top-2024-bengaluru",
      description: "Iconic true Indian off-roader with 2.2L mHawk Diesel engine (130 HP, 300 Nm torque), 6-speed torque converter automatic, shift-on-the-fly 4x4 with low-range transfer case, touchscreen with Adventure Statistics, and all-terrain tyres. Perfect for Western Ghats expeditions.",
      locationAddress: "Indiranagar 100ft Road",
      city: "Bengaluru",
      lat: 12.9716,
      lng: 77.5946,
      dayRate: 3499.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "DIESEL",
        seats: 4,
        doors: 3,
        luggageCapacity: 600,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80", caption: "Thar rugged stance with all-terrain tyres", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80", caption: "High ground clearance 226mm underbody", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80", caption: "Adventure statistics digital infotainment", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80", caption: "Rugged black hard-top canopy profile", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80", caption: "Deep tread 18-inch deep-dish alloy wheels", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "Drove up to Coorg and Chikmagalur. The low-range 4x4 tackled steep muddy coffee estate slopes effortlessly. Vikram provided clean vehicle with FASTag ready." },
        { authorId: customerPriya.id, rating: 5, comment: "Superb road presence and comfortable automatic transmission in Bengaluru traffic before hitting the highway." },
      ],
    },
    {
      hostId: hostRajesh.id,
      title: "2024 Toyota Fortuner Legender 4x4 AT",
      brand: "Toyota",
      model: "Fortuner Legender",
      year: 2024,
      category: "CAR",
      slug: "toyota-fortuner-legender-4x4-2024-delhi",
      description: "The undisputed king of Indian highways. Handcrafted 2.8L turbo-diesel engine producing 204 HP and a massive 500 Nm torque. Catamaran-style dual front bumpers, quad-LED headlamps, ventilated seats, JBL 11-speaker audio, and bulletproof Toyota reliability.",
      locationAddress: "Aerocity Gateway Terminal",
      city: "New Delhi",
      lat: 28.6139,
      lng: 77.209,
      dayRate: 5999.0,
      weeklyDiscountPercentage: 12.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "DIESEL",
        seats: 7,
        doors: 5,
        luggageCapacity: 750,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80", caption: "Legender aggressive split front grille and dual-tone roof", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1541348263662-e0c86430dc94?auto=format&fit=crop&w=1200&q=80", caption: "Plush maroon and black leather 7-seat cabin", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80", caption: "High commanding driver view of the road", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80", caption: "Aerodynamic sequential rear LED indicators", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80", caption: "18-inch multi-layered machined alloy wheels", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "Took this to Manali and Atal Tunnel. The 500Nm torque makes overtaking uphill loaded with 5 adults effortless. Top notch host!" },
      ],
    },
    {
      hostId: hostAnanya.id,
      title: "2024 Tata Nexon EV Max (Long Range 437km)",
      brand: "Tata",
      model: "Nexon EV Max",
      year: 2024,
      category: "CAR",
      slug: "tata-nexon-ev-max-2024-pune",
      description: "India's bestselling electric SUV. 40.5 kWh battery pack delivering 437 km ARAI range, 143 HP permanent magnet synchronous motor with instant 250 Nm torque. Features electronic parking brake with auto-hold, ventilated front seats, wireless charging, and CCS2 fast charging support.",
      locationAddress: "Koregaon Park Main Road",
      city: "Pune",
      lat: 18.5204,
      lng: 73.8567,
      dayRate: 2799.0,
      weeklyDiscountPercentage: 14.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "EV",
        seats: 5,
        doors: 4,
        luggageCapacity: 350,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80", caption: "Signature teal blue electric SUV styling", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80", caption: "High-tech floating 10.25-inch touchscreen", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80", caption: "Electric rotary gear selector dial with jewel finish", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80", caption: "Aerodynamic dual-tone roof and roof rails", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80", caption: "Low noise aerodynamic diamond-cut alloys", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerPriya.id, rating: 5, comment: "Drove on the Mumbai-Pune Expressway in whisper quiet serenity. Fast charged at expressway food mall in 35 minutes!" },
      ],
    },
    {
      hostId: hostAnanya.id,
      title: "2024 Mahindra XUV700 AX7 Luxury AWD",
      brand: "Mahindra",
      model: "XUV700 AX7",
      year: 2024,
      category: "CAR",
      slug: "mahindra-xuv700-ax7-luxury-2024-mumbai",
      description: "Class-leading Indian luxury SUV. 2.0L mStallion Turbo-Petrol generating 200 HP and 380 Nm torque. Equipped with Level 2 ADAS (Adaptive Cruise, Lane Keep), Skyroof panoramic glass, dual 10.25-inch superscreens, 3D Sony 12-speaker surround sound, and smart all-wheel drive.",
      locationAddress: "Bandra Kurla Complex (BKC)",
      city: "Mumbai",
      lat: 19.076,
      lng: 72.8777,
      dayRate: 3899.0,
      weeklyDiscountPercentage: 12.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "PETROL",
        seats: 7,
        doors: 5,
        luggageCapacity: 800,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1541348263662-e0c86430dc94?auto=format&fit=crop&w=1200&q=80", caption: "Bold twin-peaks logo and clear C-shaped LED DRLs", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80", caption: "Massive Skyroof panoramic glass opened to skyline", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80", caption: "Dual connected digital screens with AdrenoX UI", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80", caption: "Flush motorized smart door handles", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80", caption: "18-inch diamond cut diamond-finish alloys", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "The Level 2 ADAS on the Samruddhi Mahamarg was unbelievable. Car was impeccably maintained by Ananya." },
      ],
    },
    {
      hostId: hostVikram.id,
      title: "2024 Maruti Suzuki Jimny 4x4 Alpha AT",
      brand: "Maruti Suzuki",
      model: "Jimny 4x4",
      year: 2024,
      category: "CAR",
      slug: "maruti-suzuki-jimny-4x4-2024-goa",
      description: "Legendary lightweight off-roader in Kinetic Yellow. 1.5L K15B petrol, ladder frame chassis, 3-link rigid axle suspension with coil springs, and ALLGRIP PRO 4WD system with low-range transfer gear. The ultimate coastal exploration rig for Goa's backwaters and beaches.",
      locationAddress: "Candolim Beach Road",
      city: "Goa",
      lat: 15.2993,
      lng: 74.124,
      dayRate: 2299.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "PETROL",
        seats: 4,
        doors: 5,
        luggageCapacity: 332,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80", caption: "Kinetic Yellow boxy retro styling", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80", caption: "Gunmetal grey alloys and upright windshield", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80", caption: "Functional utilitarian cockpit with SmartPlay Pro+", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80", caption: "Full-size rear-mounted spare wheel on tailgate", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80", caption: "Compact agile footprint for narrow coastal roads", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerPriya.id, rating: 5, comment: "Rented this for 5 days across South Goa and Cabo de Rama. So easy to park and handles rough coastal trails like a champ." },
      ],
    },

    // ------------------- MOTORCYCLES (Adventure, Royal Enfield, Sport) -------------------
    {
      hostId: hostVikram.id,
      title: "2024 Royal Enfield Himalayan 450 (Kamet White)",
      brand: "Royal Enfield",
      model: "Himalayan 450",
      year: 2024,
      category: "MOTORCYCLE",
      slug: "royal-enfield-himalayan-450-2024-bengaluru",
      description: "The next-generation Himalayan powered by the revolutionary 452cc Sherpa liquid-cooled DOHC single delivering 40 HP and 40 Nm of torque. Features Showa 43mm USD front forks with 200mm travel, Tripper Dash with full Google Maps projection, ride-by-wire with switchable rear ABS, and touring saddle.",
      locationAddress: "Koramangala 4th Block",
      city: "Bengaluru",
      lat: 12.9352,
      lng: 77.6245,
      dayRate: 1499.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: true,
      specs: {
        transmission: "MANUAL",
        fuelType: "PETROL",
        engineDisplacementCc: 452,
        seatHeightMm: 825,
        helmetProvided: true,
        bikeType: "ADVENTURE",
      },
      images: [
        { url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80", caption: "Himalayan 450 Kamet White adventure stance", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80", caption: "Full round TFT Tripper Dash with Google navigation", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80", caption: "43mm inverted Showa long-travel front forks", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80", caption: "Cross-spoked 21-inch front off-road wheel", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80", caption: "Rugged tank guard rails and 17-litre fuel capacity", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "Rode to Ooty and Masinagudi. The Sherpa 450 engine has brilliant top-end pull and effortlessly sustained 110 km/h on Mysuru expressway. Vikram provided clean Axor helmet." },
      ],
    },
    {
      hostId: hostVikram.id,
      title: "2024 Royal Enfield Classic 350 (Chrome Red)",
      brand: "Royal Enfield",
      model: "Classic 350 Reborn",
      year: 2024,
      category: "MOTORCYCLE",
      slug: "royal-enfield-classic-350-2024-goa",
      description: "Timeless Indian heritage reborn. 349cc J-series counter-balanced engine with buttery-smooth power delivery and signature gentle thumping exhaust note. Dual-channel ABS, wide touring split-seats, teardrop chrome tank, and spoke wheels. Perfect for leisurely coastal cruises.",
      locationAddress: "Anjuna Beach Flea Market Road",
      city: "Goa",
      lat: 15.5808,
      lng: 73.7423,
      dayRate: 1199.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: true,
      specs: {
        transmission: "MANUAL",
        fuelType: "PETROL",
        engineDisplacementCc: 349,
        seatHeightMm: 805,
        helmetProvided: true,
        bikeType: "CRUISER",
      },
      images: [
        { url: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80", caption: "Chrome Red fuel tank and vintage styling", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80", caption: "Polished engine fins and chrome peashooter exhaust", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80", caption: "Sprung rider saddle with deep cushioning", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80", caption: "Classic analogue speedometer with digital fuel trip", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80", caption: "Front Brembo disc brake setup with dual-channel ABS", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerPriya.id, rating: 5, comment: "Cruising along Morjim and Ashwem at sunset on this Classic 350 was magical. Zero vibration and great fuel economy." },
      ],
    },
    {
      hostId: hostAnanya.id,
      title: "2024 KTM 390 Duke (Electronic Orange)",
      brand: "KTM",
      model: "390 Duke",
      year: 2024,
      category: "MOTORCYCLE",
      slug: "ktm-390-duke-2024-pune",
      description: "The Corner Rocket. 399cc single-cylinder LC4c engine producing 46 HP and 39 Nm torque. Features WP APEX adjustable suspension (5-click rebound and compression), launch control, Supermoto ABS mode, cornering traction control, and 5-inch bonded glass TFT display.",
      locationAddress: "Senapati Bapat Road",
      city: "Pune",
      lat: 18.5308,
      lng: 73.8293,
      dayRate: 1399.0,
      weeklyDiscountPercentage: 12.0,
      instantBookable: true,
      specs: {
        transmission: "MANUAL",
        fuelType: "PETROL",
        engineDisplacementCc: 399,
        seatHeightMm: 820,
        helmetProvided: true,
        bikeType: "SPORT",
      },
      images: [
        { url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80", caption: "Sharp predator front LED headlamp and orange trellis frame", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80", caption: "Bonded glass 5-inch TFT cockpit display", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80", caption: "Underbelly stainless steel sport exhaust", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80", caption: "Radial 4-piston 320mm front disc and WP Apex forks", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80", caption: "Cast aluminum banana swingarm and offset monoshock", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "Carved up Lavasa ghats on a Sunday morning. The chassis dynamics and quickshifter make this bike an absolute riot." },
      ],
    },
    {
      hostId: hostAnanya.id,
      title: "2024 BMW G 310 GS (Rallye Kalamata)",
      brand: "BMW",
      model: "G 310 GS",
      year: 2024,
      category: "MOTORCYCLE",
      slug: "bmw-g-310-gs-2024-mumbai",
      description: "Premium Bavarian adventure engineering tailored for India. 313cc water-cooled single with backward-tilted cylinder generating 34 HP. Ride-by-wire throttle, slipper clutch, gold-anodised upside-down forks, 19-inch front wheel, and ergonomic upright GS touring geometry.",
      locationAddress: "Juhu Tara Road",
      city: "Mumbai",
      lat: 19.1027,
      lng: 72.8267,
      dayRate: 1699.0,
      weeklyDiscountPercentage: 10.0,
      instantBookable: true,
      specs: {
        transmission: "MANUAL",
        fuelType: "PETROL",
        engineDisplacementCc: 313,
        seatHeightMm: 835,
        helmetProvided: true,
        bikeType: "ADVENTURE",
      },
      images: [
        { url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80", caption: "Signature GS adventure beak and gold inverted forks", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80", caption: "Rugged luggage rack and LED tail lamp", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80", caption: "High windshield and auxiliary adventure LED lights", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80", caption: "Multi-spoke cast alloy wheels with Metzeler Tourance tyres", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80", caption: "Compact liquid-cooled single cylinder engine block", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "Rode along Marine Drive and then out to Lonavala. Plush suspension glides over road imperfections seamlessly." },
      ],
    },
    {
      hostId: hostRajesh.id,
      title: "2024 Triumph Scrambler 400X (Carnival Red)",
      brand: "Triumph",
      model: "Scrambler 400X",
      year: 2024,
      category: "MOTORCYCLE",
      slug: "triumph-scrambler-400x-2024-delhi",
      description: "Authentic British scrambler pedigree with 398cc TR-series DOHC engine kicking out 40 HP and 37.5 Nm torque. Features 150mm longer travel suspension, wide braced handlebars, bash plate, switchable off-road ABS and traction control, and 19-inch front wheel for trail mastery.",
      locationAddress: "Connaught Place Radial 3",
      city: "New Delhi",
      lat: 28.6304,
      lng: 77.2177,
      dayRate: 1599.0,
      weeklyDiscountPercentage: 14.0,
      instantBookable: true,
      specs: {
        transmission: "MANUAL",
        fuelType: "PETROL",
        engineDisplacementCc: 398,
        seatHeightMm: 835,
        helmetProvided: true,
        bikeType: "ADVENTURE",
      },
      images: [
        { url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80", caption: "Carnival Red sculpted scrambler tank with protection pads", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80", caption: "Twin stacked high-exit scrambler exhaust can", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80", caption: "Wide motocross style handlebar with handguards", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80", caption: "Headlight stone guard grille and ribbed split seat", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80", caption: "Block-pattern Metzeler Karoo Street tyres", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "Rode to Neemrana and back. Great highway stability and standing up on footpegs on bad rural roads is super comfortable." },
      ],
    },

    // ------------------- TRUCKS & HAULERS (Pickups & Commercials) -------------------
    {
      hostId: hostVikram.id,
      title: "2024 Isuzu D-Max V-Cross 4x4 Z-Prestige AT",
      brand: "Isuzu",
      model: "D-Max V-Cross",
      year: 2024,
      category: "TRUCK",
      slug: "isuzu-d-max-v-cross-4x4-2024-bengaluru",
      description: "India's lifestyle adventure pickup. 1.9L Ddi BluePower Turbo Diesel delivering 163 HP and 360 Nm torque paired with a 6-speed automatic transmission. Features 4x4 Shift-on-the-fly, 1,050 kg cargo payload bed with lockable hard canopy, 3,500 kg towing capacity, and 225mm ground clearance.",
      locationAddress: "Outer Ring Road Bellandur",
      city: "Bengaluru",
      lat: 12.9298,
      lng: 77.6838,
      dayRate: 3999.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "DIESEL",
        payloadCapacityKg: 1050,
        bedLengthMeters: 1.5,
        towingCapacityKg: 3500,
        commercialLicenseRequired: false,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80", caption: "V-Cross imposing chrome front grille and roof rails", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80", caption: "Spacious rear cargo bed with bedliner coating", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80", caption: "Spacious double-cab interior with leather upholstery", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80", caption: "High clearance sidesteps and 18-inch wheels", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80", caption: "Heavy-duty tow hitch receiver", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "Hauled two dirt bikes in the bed to Kolar Gold Fields quarry trails. Incredibly capable truck and very car-like to drive." },
      ],
    },
    {
      hostId: hostRajesh.id,
      title: "2024 Toyota Hilux 4x4 High AT (Heavy Hauler)",
      brand: "Toyota",
      model: "Hilux 4x4",
      year: 2024,
      category: "TRUCK",
      slug: "toyota-hilux-4x4-2024-delhi",
      description: "The indestructible global legend. 2.8L Four-Cylinder Turbo Diesel pushing 204 HP and 500 Nm torque through 4WD with electronic rear differential lock and automatic limited slip differential. Features 700mm water wading capacity, 1,100 kg bed payload, and heavy duty steel underbody armour.",
      locationAddress: "Gurugram Cyber City Hub",
      city: "New Delhi",
      lat: 28.495,
      lng: 77.0895,
      dayRate: 6499.0,
      weeklyDiscountPercentage: 12.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "DIESEL",
        payloadCapacityKg: 1100,
        bedLengthMeters: 1.6,
        towingCapacityKg: 3500,
        commercialLicenseRequired: false,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80", caption: "Hilux bold trapezoidal front grille and skid plate", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80", caption: "Deep cargo deck ready for heavy gear and tools", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80", caption: "Heavy-duty steel leaf spring rear suspension", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80", caption: "Double-cab interior with 8-inch touchscreen audio", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80", caption: "Bridgestone Dueler all-terrain off-road rubber", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerPriya.id, rating: 5, comment: "Rented for an expedition film crew shoot across Rajasthan deserts. Utterly unstoppable through sandy riverbeds!" },
      ],
    },
    {
      hostId: hostAnanya.id,
      title: "2024 Tata Yodha 4x4 Heavy Hauler Crew Cab",
      brand: "Tata",
      model: "Yodha 4x4",
      year: 2024,
      category: "TRUCK",
      slug: "tata-yodha-4x4-2024-pune",
      description: "Rugged Indian commercial workhorse built for the toughest industrial and agricultural logistics. 2.2L VARICOR turbo-diesel engine with 250 Nm flat torque, 4x4 drive, reinforced cargo deck with 1,250 kg rated payload, 4mm thick chassis frame, and seating for 4 crew members.",
      locationAddress: "Bhosari Industrial Hub",
      city: "Pune",
      lat: 18.6277,
      lng: 73.8471,
      dayRate: 2499.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: false,
      specs: {
        transmission: "MANUAL",
        fuelType: "DIESEL",
        payloadCapacityKg: 1250,
        bedLengthMeters: 2.5,
        towingCapacityKg: 3000,
        commercialLicenseRequired: true,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80", caption: "Heavy-duty utilitarian commercial front fascia", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80", caption: "Extra-long 8.2ft drop-side cargo bed", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80", caption: "Heavy semi-elliptical multi-leaf spring suspension", isCover: false, sortOrder: 2 },
        { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80", caption: "Durable vinyl washable commercial 4-seater cab", isCover: false, sortOrder: 3 },
        { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80", caption: "Rugged steel bumper and tow hooks", isCover: false, sortOrder: 4 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "Rented to transport solar panel setups to our site near Satara. Carried the payload effortlessly over unpaved access roads." },
      ],
    },

    // ------------------- SANTA ROSA & CALIFORNIA VEHICLES (SUV, LUXURY, CONVERTIBLE) -------------------
    {
      hostId: hostVikram.id,
      title: "2024 Jeep Grand Cherokee L 4x4 (Overland)",
      brand: "Jeep",
      model: "Grand Cherokee L",
      year: 2024,
      category: "CAR",
      agency: "Hertz",
      slug: "jeep-grand-cherokee-l-4x4-2024-santa-rosa",
      description: "Premium full-size 7-passenger SUV equipped with Quadra-Lift air suspension, 3.6L Pentastar V6, panoramic dual-pane sunroof, McIntosh 19-speaker audio system, and Selec-Terrain 4WD traction management. The quintessential ride for exploring Sonoma wine country, Highway 1 coastal curves, and Redwoods.",
      locationAddress: "Charles M. Schulz - Sonoma County Airport (STS), Santa Rosa, CA",
      city: "Santa Rosa",
      lat: 38.5094,
      lng: -122.8129,
      dayRate: 79.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "PETROL",
        bodyType: "SUV",
        seats: 7,
        doors: 5,
        luggageCapacity: 850,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80", caption: "Jeep Grand Cherokee front three-quarter view", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80", caption: "All-terrain suspension profile", isCover: false, sortOrder: 1 },
        { url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80", caption: "Luxury 7-passenger leather cabin", isCover: false, sortOrder: 2 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "Picked up at Sonoma County STS airport right off my flight. Incredible comfort for driving out to Bodega Bay and Russian River." },
      ],
    },
    {
      hostId: hostAnanya.id,
      title: "2024 Toyota RAV4 Hybrid AWD (XSE)",
      brand: "Toyota",
      model: "RAV4 Hybrid",
      year: 2024,
      category: "CAR",
      agency: "Avis",
      slug: "toyota-rav4-hybrid-awd-2024-santa-rosa",
      description: "America's best-selling compact crossover SUV. Electronic On-Demand All-Wheel Drive, 40+ MPG combined fuel economy, SofTex sports seats, Apple CarPlay/Android Auto, and Toyota Safety Sense 2.5 suite. Effortless city handling and Sonoma valley touring.",
      locationAddress: "Downtown Santa Rosa Station, CA",
      city: "Santa Rosa",
      lat: 38.4404,
      lng: -122.7141,
      dayRate: 59.0,
      weeklyDiscountPercentage: 18.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "HYBRID",
        bodyType: "SUV",
        seats: 5,
        doors: 5,
        luggageCapacity: 690,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80", caption: "RAV4 sporty dual-tone profile", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80", caption: "High efficiency hybrid digital cockpit", isCover: false, sortOrder: 1 },
      ],
      reviews: [
        { authorId: customerPriya.id, rating: 5, comment: "Incredible fuel efficiency driving between Napa and Santa Rosa vineyards. Smooth AWD grip on coastal fog days." },
      ],
    },
    {
      hostId: hostRajesh.id,
      title: "2024 Cadillac Escalade Luxury 4WD (Onyx Edition)",
      brand: "Cadillac",
      model: "Escalade",
      year: 2024,
      category: "CAR",
      agency: "Enterprise",
      slug: "cadillac-escalade-luxury-4wd-2024-santa-rosa",
      description: "The pinnacle of American luxury. 6.2L V8 engine with 420 HP, Magnetic Ride Control, curved 38-inch total diagonal OLED display, AKG Studio Reference 36-speaker sound system, and Super Cruise hands-free driving assistance. Unrivaled road presence.",
      locationAddress: "Sonoma Wine Country Depot, Santa Rosa, CA",
      city: "Santa Rosa",
      lat: 38.451,
      lng: -122.723,
      dayRate: 149.0,
      weeklyDiscountPercentage: 20.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "PETROL",
        bodyType: "SUV",
        seats: 7,
        doors: 5,
        luggageCapacity: 950,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80", caption: "Escalade Onyx Black grille and signature vertical lighting", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80", caption: "38-inch curved OLED dashboard", isCover: false, sortOrder: 1 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "Rented for an executive wedding party in Sonoma. The AKG sound system and massaging seats blew everyone away!" },
      ],
    },
    {
      hostId: hostVikram.id,
      title: "2024 Ford Bronco Badlands Sasquatch 4x4",
      brand: "Ford",
      model: "Bronco Badlands",
      year: 2024,
      category: "CAR",
      agency: "National",
      slug: "ford-bronco-badlands-sasquatch-2024-santa-rosa",
      description: "Built wild for Northern California trails. Features 35-inch mud-terrain tires, Bilstein position-sensitive monotube shocks, front and rear electronic locking differentials, removable doors and hardtop roof, and G.O.A.T. (Goes Over Any Type of Terrain) driving modes.",
      locationAddress: "Railroad Square District, Santa Rosa, CA",
      city: "Santa Rosa",
      lat: 38.4385,
      lng: -122.7198,
      dayRate: 89.0,
      weeklyDiscountPercentage: 14.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "PETROL",
        bodyType: "SUV",
        seats: 5,
        doors: 4,
        luggageCapacity: 720,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80", caption: "Bronco Sasquatch stance with 35-inch off-road wheels", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80", caption: "Removable roof for open-air Pacific Coast cruising", isCover: false, sortOrder: 1 },
      ],
      reviews: [
        { authorId: customerPriya.id, rating: 5, comment: "Took the roof off along Highway 1 from Bodega Bay to Jenner. Unbelievable freedom and head-turning looks!" },
      ],
    },
    {
      hostId: hostAnanya.id,
      title: "2024 Tesla Model Y Long Range AWD",
      brand: "Tesla",
      model: "Model Y",
      year: 2024,
      category: "CAR",
      agency: "Budget",
      slug: "tesla-model-y-long-range-awd-2024-santa-rosa",
      description: "Dual Motor All-Wheel Drive, 310+ miles EPA range, 0-60 in 4.8 seconds, Autopilot, heated vegan leather seats front and rear, glass roof, and instant access to the North Bay Tesla Supercharger network. Zero emissions touring through Sonoma and Mendocino.",
      locationAddress: "Santa Rosa Town & Country Hub, CA",
      city: "Santa Rosa",
      lat: 38.4485,
      lng: -122.711,
      dayRate: 69.0,
      weeklyDiscountPercentage: 16.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "EV",
        bodyType: "SUV",
        seats: 5,
        doors: 5,
        luggageCapacity: 850,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80", caption: "Pearl White Model Y with 20-inch Induction wheels", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80", caption: "Minimalist cockpit with 15-inch center touchscreen", isCover: false, sortOrder: 1 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "Super convenient pickup with phone key. Supercharged in Santa Rosa and drove up to Point Reyes on a single charge." },
      ],
    },
    {
      hostId: hostRajesh.id,
      title: "2024 Chevrolet Tahoe LT 4x4",
      brand: "Chevrolet",
      model: "Tahoe LT",
      year: 2024,
      category: "CAR",
      agency: "Dollar",
      slug: "chevrolet-tahoe-lt-4x4-2024-santa-rosa",
      description: "Generous 3-row comfort for family trips and group adventures. 5.3L EcoTec3 V8 engine, 10-speed transmission, 4WD with Autotrac transfer case, 10.2-inch infotainment with Google built-in, wireless smartphone charging, and up to 8,400 lbs towing capability.",
      locationAddress: "Charles M. Schulz - Sonoma County Airport (STS), Santa Rosa, CA",
      city: "Santa Rosa",
      lat: 38.511,
      lng: -122.815,
      dayRate: 85.0,
      weeklyDiscountPercentage: 12.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "PETROL",
        bodyType: "SUV",
        seats: 8,
        doors: 5,
        luggageCapacity: 920,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80", caption: "Tahoe bold chrome front grille and LED daytime running lamps", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80", caption: "Spacious three-row seating configuration", isCover: false, sortOrder: 1 },
      ],
      reviews: [
        { authorId: customerPriya.id, rating: 5, comment: "Room for 6 adults and all luggage for our wine tour. Dollar agency kiosk had the vehicle washed and waiting." },
      ],
    },
    {
      hostId: hostVikram.id,
      title: "2024 Ford Mustang GT Premium Convertible",
      brand: "Ford",
      model: "Mustang GT",
      year: 2024,
      category: "CAR",
      agency: "ACE",
      slug: "ford-mustang-gt-convertible-2024-santa-rosa",
      description: "The quintessential California dream ride. 5.0L Coyote V8 delivering 486 HP, active valve performance exhaust, power drop-top convertible roof, MagneRide damping, 12.4-inch digital instrument cluster, and Brembo brakes. Pure exhilaration along Highway 1.",
      locationAddress: "Downtown Gateway Plaza, Santa Rosa, CA",
      city: "Santa Rosa",
      lat: 38.442,
      lng: -122.716,
      dayRate: 99.0,
      weeklyDiscountPercentage: 15.0,
      instantBookable: true,
      specs: {
        transmission: "AUTOMATIC",
        fuelType: "PETROL",
        bodyType: "CONVERTIBLE",
        seats: 4,
        doors: 2,
        luggageCapacity: 380,
      },
      images: [
        { url: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80", caption: "Vapor Blue Mustang GT Convertible top down", isCover: true, sortOrder: 0 },
        { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80", caption: "Aggressive front splitter and LED tri-bar headlights", isCover: false, sortOrder: 1 },
      ],
      reviews: [
        { authorId: customerArjun.id, rating: 5, comment: "Top-down coastal sunset drive from Santa Rosa to Bodega Head was unforgettable. The V8 exhaust sounds magnificent!" },
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

    console.log(`  + Seeded Indian vehicle: ${vehicle.title} (₹${vehicle.dayRate}/day)`);
  }

  // 3. Seed Realistic Bookings (Active, Upcoming, Completed) in INR
  const thar = await prisma.vehicle.findFirst({ where: { slug: "mahindra-thar-4x4-hard-top-2024-bengaluru" } });
  const himalayan = await prisma.vehicle.findFirst({ where: { slug: "royal-enfield-himalayan-450-2024-bengaluru" } });
  const fortuner = await prisma.vehicle.findFirst({ where: { slug: "toyota-fortuner-legender-4x4-2024-delhi" } });

  if (thar) {
    // Completed trip
    await prisma.booking.create({
      data: {
        vehicleId: thar.id,
        customerId: customerArjun.id,
        startDate: new Date("2026-08-10T10:00:00Z"),
        endDate: new Date("2026-08-14T18:00:00Z"),
        status: "COMPLETED",
        totalDays: 4,
        dayRateSnapshot: 3499.0,
        discountApplied: 0,
        serviceFee: 1399.6,
        securityDeposit: 5000.0,
        totalPrice: 20395.6,
        stripePaymentIntentId: "pi_fleetflow_in_completed_01",
      },
    });

    // Upcoming booking (collision test)
    await prisma.booking.create({
      data: {
        vehicleId: thar.id,
        customerId: customerPriya.id,
        startDate: new Date("2026-10-15T10:00:00Z"),
        endDate: new Date("2026-10-18T18:00:00Z"),
        status: "CONFIRMED",
        totalDays: 3,
        dayRateSnapshot: 3499.0,
        discountApplied: 0,
        serviceFee: 1049.7,
        securityDeposit: 5000.0,
        totalPrice: 16546.7,
        stripePaymentIntentId: "pi_fleetflow_in_upcoming_02",
      },
    });

    // Blackout Date for maintenance
    await prisma.blackoutDate.create({
      data: {
        vehicleId: thar.id,
        startDate: new Date("2026-10-25T00:00:00Z"),
        endDate: new Date("2026-10-27T23:59:59Z"),
        reason: "MAINTENANCE",
      },
    });
  }

  if (himalayan) {
    // Active Booking
    await prisma.booking.create({
      data: {
        vehicleId: himalayan.id,
        customerId: customerArjun.id,
        startDate: new Date("2026-09-12T09:00:00Z"),
        endDate: new Date("2026-09-16T18:00:00Z"),
        status: "ACTIVE",
        totalDays: 4,
        dayRateSnapshot: 1499.0,
        discountApplied: 0,
        serviceFee: 599.6,
        securityDeposit: 3000.0,
        totalPrice: 9595.6,
        stripePaymentIntentId: "pi_fleetflow_in_active_03",
      },
    });
  }

  if (fortuner) {
    await prisma.booking.create({
      data: {
        vehicleId: fortuner.id,
        customerId: customerPriya.id,
        startDate: new Date("2026-09-20T08:00:00Z"),
        endDate: new Date("2026-09-28T18:00:00Z"),
        status: "CONFIRMED",
        totalDays: 8,
        dayRateSnapshot: 5999.0,
        discountApplied: 5759.04, // 12% weekly discount
        serviceFee: 4223.3,
        securityDeposit: 10000.0,
        totalPrice: 56456.26,
        stripePaymentIntentId: "pi_fleetflow_in_upcoming_04",
      },
    });
  }

  console.log("✅ Seeded Indian Bookings & Maintenance Blackouts");
  console.log("🚀 FleetFlow India Database Seeding Complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
