"use client";

import { Star, MapPin, Quote, ShieldCheck } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Rohan & Megha Nair",
      city: "Bengaluru",
      route: "Bengaluru to Ooty (Kalhatty 36 Hairpin Ghats)",
      car: "Tata Nexon EV Empowered+ LR",
      rating: 5,
      comment: "Renting an EV for a hill station sounded adventurous, but Pravaas's team guided us on the fast charger network in Mysore. The regenerative braking made going down Kalhatty ghats so reassuring. Zero fatigue!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "Karan Joharwal",
      city: "Delhi NCR",
      route: "Delhi to Manali & Atal Tunnel",
      car: "Mahindra Thar LX 4x4 Hard Top",
      rating: 5,
      comment: "Took the Thar up past Solang into Lahaul valley. The 4x4 low range pulled effortlessly through mud and slush near Sissu. Deposit was returned to my PhonePe UPI within 90 minutes of drop-off at T3 airport.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "Dr. Arvind & Sunita Swaminathan",
      city: "Mumbai",
      route: "Mumbai to Goa via Atal Setu",
      car: "Toyota Innova Hycross Hybrid",
      rating: 5,
      comment: "The Ottoman seats in the Hycross are unmatched. My 72-year-old mother didn't feel a bump on the Konkan highway. The pre-loaded FASTag meant zero stopping at toll plazas. Truly world class.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#118AB2]">
          Verified Road Trip Stories
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#464B71] dark:text-[#F2F2ED] font-['Outfit'] mt-1">
          Loved by Indian Highway Explorers
        </h2>
        <p className="text-xs sm:text-sm text-[#676C8F] dark:text-[#A5ABC9] mt-2">
          Real feedback from verified travelers who completed journeys across our 12 hub cities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="p-7 rounded-3xl bg-white dark:bg-[#272B44] border border-[#DFDFD5] dark:border-[#373D60] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#7CD5C7]">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#DFDFD5] dark:text-[#373D60]" />
              </div>

              {/* Route Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#118AB2]/10 text-[#118AB2] text-[11px] font-bold mb-3 border border-[#118AB2]/20">
                <MapPin className="w-3 h-3" />
                <span>{r.route}</span>
              </div>

              <p className="text-xs text-[#676C8F] dark:text-[#A5ABC9] leading-relaxed italic">
                &ldquo;{r.comment}&rdquo;
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-[#DFDFD5] dark:border-[#373D60] flex items-center gap-3">
              <img
                src={r.avatar}
                alt={r.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-[#464B71] dark:text-[#F2F2ED] flex items-center gap-1">
                  <span>{r.name}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                </p>
                <p className="text-[11px] text-[#676C8F] dark:text-[#8D93B4]">
                  {r.city} • <span className="text-[#118AB2] font-semibold">{r.car}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
