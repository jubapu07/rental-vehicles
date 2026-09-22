"use client";

import Link from "next/link";

export default function RentalAgencyBanner() {
  const agencies = [
    {
      name: "Hertz",
      query: "Hertz",
      logo: (
        <span className="font-black text-xl tracking-tighter text-slate-900 group-hover:text-amber-500 transition-colors">
          Hertz<span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 ml-0.5"></span>
        </span>
      ),
    },
    {
      name: "AVIS",
      query: "Avis",
      logo: (
        <span className="font-black text-xl tracking-wider text-[#D40029] group-hover:scale-105 transition-transform">
          AVIS
        </span>
      ),
    },
    {
      name: "Enterprise",
      query: "Enterprise",
      logo: (
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-xs bg-[#007A33] text-white flex items-center justify-center text-[10px] font-black">
            e
          </div>
          <span className="font-extrabold text-base tracking-tight text-[#007A33]">
            enterprise
          </span>
        </div>
      ),
    },
    {
      name: "National Car Rental",
      query: "National",
      logo: (
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#006A4E] text-white">
          <div className="w-3.5 h-3.5 rounded-xs bg-emerald-400 flex items-center justify-center text-[8px] font-black text-[#006A4E]">
            N
          </div>
          <span className="font-extrabold text-xs tracking-tight uppercase">
            National
          </span>
        </div>
      ),
    },
    {
      name: "Budget",
      query: "Budget",
      logo: (
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-5 bg-[#FF6A13] skew-x-[-18deg] rounded-xs inline-block"></span>
          <span className="font-black text-lg tracking-tight text-[#002868]">
            Budget
          </span>
        </div>
      ),
    },
    {
      name: "ACE RENT A CAR",
      query: "ACE",
      logo: (
        <div className="flex flex-col items-center leading-none">
          <span className="font-black text-sm tracking-wide text-[#003A70]">
            ACE
          </span>
          <span className="text-[7px] font-black tracking-widest text-[#D9272E] uppercase">
            Rent A Car
          </span>
        </div>
      ),
    },
    {
      name: "dollar.",
      query: "Dollar",
      logo: (
        <span className="font-black text-lg tracking-tight text-[#BE123C] lowercase">
          dollar<span className="text-amber-500 font-extrabold">.</span>
        </span>
      ),
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/90 shadow-md p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 md:gap-6">
        {agencies.map((agency) => (
          <Link
            key={agency.name}
            href={`/explore?agency=${encodeURIComponent(agency.query)}`}
            className="group flex items-center justify-center px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer opacity-90 hover:opacity-100 transform hover:-translate-y-0.5"
            title={`View ${agency.name} car rental deals`}
          >
            {agency.logo}
          </Link>
        ))}

        <Link
          href="/explore"
          className="text-xs font-bold text-slate-500 hover:text-[#E05A36] transition-colors px-2 py-1"
        >
          ...and more
        </Link>
      </div>
    </div>
  );
}
