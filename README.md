# FleetFlow PRO - Indian Multi-Category Car Hire & Rental Platform

A modern, responsive vehicle rental web application built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Prisma SQLite, fully localized for the Indian self-drive and mobility market with INR (₹) pricing standards.

## Features

- **Panoramic Coastal Hero & Mobility Hubs**: Dynamic destination car hire selector (`Bengaluru car hire`, `Goa car hire`, `Mumbai car hire`, etc.), same/different drop-off toggle, and driver age selector (25–65, 18–24, 65+, custom).
- **Search Ribbon**: Fast autocomplete for Indian airports & metro hubs (Kempegowda BLR, Dabolim & Mopa GOI, Chhatrapati Shivaji BOM, Indira Gandhi DEL, etc.), date & time pickers with Noon selectors, and quick `SUVs only` filter.
- **Top Indian Rental Agencies**: Direct agency filtering for Zoomcar, Revv, Avis India, Hertz India, MyChoize, Myles, and Budget India.
- **Authentic Model-Matched Fleet Imagery**: Every single vehicle card and detail view features authentic, high-resolution photography accurately depicting the named vehicle (Thar 4x4, Fortuner Legender, Scorpio-N, Jimny 4x4, Himalayan 450, Classic 350, KTM Duke, Swift, Innova Hycross, Activa 6G, etc.) served directly from local assets.
- **Indian Vehicle Fleet (INR ₹ Pricing)**:
  - **SUVs & 4x4 Off-Roaders**: Mahindra Thar 4x4 Hard Top, Mahindra Scorpio-N 4XPLOR, Toyota Fortuner Legender 4x4, Mahindra XUV700 AX7L, Hyundai Creta SX(O), Tata Safari Dark Edition, Maruti Suzuki Jimny 4x4.
  - **Family MPVs & Premium Sedans**: Toyota Innova Hycross ZX(O) Hybrid, Maruti Suzuki Swift ZXi+, Skoda Slavia 1.5 TSI, BMW 330Li M Sport.
  - **Bikes & Adventure Motorcycles**: Royal Enfield Himalayan 450, Royal Enfield Classic 350 Reborn, Royal Enfield Hunter 350, Honda Activa 6G DLX.
  - **Utility & Pickup Haulers**: Toyota Hilux 4x4 AT, Isuzu D-Max V-Cross 4x4, Mahindra Bolero Camper Gold.
- **Interactive Value Propositions**:
  - Roadtrip Deals & Promo Codes modal (Goa Monsoon, Western Ghats, Leh-Ladakh, Lonavala Getaways - up to 49% savings)
  - Live price tracking alert modal with simulated INR trend monitoring
  - Advanced faceted fleet filters (INR ₹500–₹15,000/day slider, categories, body style, transmission, fuel type)
- **Top Navigation**: Real-time saved vehicles drawer (`🤍`) with INR rate estimates and member authentication modal (`👤 Sign in`) with instant 1-click verified Indian demo profiles (Vikram M. / Arjun M.).

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Seed database with Indian vehicles:
```bash
npx tsx prisma/seed.ts
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

