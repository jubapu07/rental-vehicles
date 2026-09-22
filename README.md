# FleetFlow PRO - Multi-Category Car Hire & Rental Platform

A modern, responsive vehicle rental web application built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Prisma SQLite.

## Features

- **Panoramic Coastal Hero**: Dynamic destination search (`[City] car hire`), same/different drop-off selector, and driver age filter.
- **Search Ribbon**: Fast autocomplete for airports and hubs, date & time pickers with Noon selectors, and `SUVs only` filter toggle.
- **Rental Agency Partners**: Dedicated banner for Hertz, AVIS, Enterprise, National, Budget, ACE Rent A Car, and Dollar with direct fleet filtering.
- **Interactive Value Propositions**:
  - Deals & promo codes modal (up to 49% savings)
  - Live price tracking alert modal with simulated trend monitoring
  - Advanced faceted fleet filters (price slider, categories, body style, transmission, fuel type)
- **Top Navigation**: Real-time saved vehicles favorites drawer (`🤍`) and member authentication modal (`👤 Sign in`) with instant 1-click verified demo profiles.
- **Multi-Category Fleet**: Cars, SUVs, adventure motorcycles, and heavy-duty hauler trucks across Santa Rosa, CA and metro hubs.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Seed database:
```bash
npx tsx prisma/seed.ts
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.
