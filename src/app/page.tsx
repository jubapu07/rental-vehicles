import HeroCarHireWidget from "@/components/home/HeroCarHireWidget";
import TrustBadges from "@/components/home/TrustBadges";
import PopularCarsTabs from "@/components/home/PopularCarsTabs";
import HowItWorks from "@/components/home/HowItWorks";
import FestiveOffers from "@/components/home/FestiveOffers";
import Testimonials from "@/components/home/Testimonials";
import FaqSection from "@/components/home/FaqSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="space-y-4 pb-16">
      {/* 1. Hero with Animated Car & Booking Widget */}
      <HeroCarHireWidget />

      {/* 2. Indian Trust & FASTag Badges */}
      <TrustBadges />

      {/* 3. Popular Indian Fleet with Live Category Switcher */}
      <PopularCarsTabs />

      {/* 4. How It Works (DigiLocker KYC, Delivery, Instant Refund) */}
      <HowItWorks />

      {/* 5. Indian Festive & Weekend Promo Offers */}
      <FestiveOffers />

      {/* 6. Real Highway Testimonials */}
      <Testimonials />

      {/* 7. Comprehensive FAQ */}
      <FaqSection />
    </div>
  );
}
