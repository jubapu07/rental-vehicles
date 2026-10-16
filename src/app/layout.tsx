import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AppProviders } from "@/context/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRAVAAS Mobility | Premium Self-Drive & Chauffeur Car Rentals Across India",
  description:
    "Rent verified Thar 4x4, Creta, Fortuner, Innova Hycross, and Nexon EV across 12 Indian cities. Zero hidden fees, pre-activated FASTag, 18% GST invoice, and instant security deposit refunds.",
  keywords: [
    "car rental India",
    "self drive cars Bangalore",
    "Thar rental Mumbai",
    "Innova Hycross airport Delhi",
    "car hire Goa",
    "EV rental India",
    "luxury car rental with driver",
  ],
  openGraph: {
    title: "PRAVAAS Mobility | Freedom of the Open Indian Road",
    description:
      "Explore India's premier self-drive and chauffeur fleet with transparent pricing, instant DigiLocker KYC, and doorstep delivery.",
    url: "https://pravaas.in",
    siteName: "PRAVAAS Mobility",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--canvas-bg)] text-[var(--text-main)] antialiased selection:bg-[#118AB2] selection:text-[#F2F2ED]">
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
