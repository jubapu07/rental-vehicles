"use client";

import Link from "next/link";

export default function RentalAgencyBanner() {
  const agencies = [
    {
      name: "Zoomcar",
      query: "Zoomcar",
      logo: (
        <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform">
          <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-black shadow-xs">
            Z
          </div>
          <span className="font-black text-lg tracking-tight text-[#0F2432]">
            zoom<span className="text-[#10B981]">car</span>
          </span>
        </div>
      ),
    },
    {
      name: "Revv",
      query: "Revv",
      logo: (
        <div className="flex items-center gap-1 group-hover:scale-105 transition-transform">
          <span className="font-black text-xl tracking-tighter text-[#0EA5E9]">
            re<span className="text-[#0284C7] italic">vv</span>
          </span>
          <span className="text-[8px] font-bold uppercase tracking-widest px-1 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
            Self-Drive
          </span>
        </div>
      ),
    },
    {
      name: "Avis India",
      query: "Avis",
      logo: (
        <div className="flex items-baseline gap-1 group-hover:scale-105 transition-transform">
          <span className="font-black text-xl tracking-wider text-[#D40029]">
            AVIS
          </span>
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">
            India
          </span>
        </div>
      ),
    },
    {
      name: "Hertz India",
      query: "Hertz",
      logo: (
        <div className="flex items-center gap-1 group-hover:scale-105 transition-transform">
          <span className="font-black text-xl tracking-tighter text-slate-900">
            Hertz<span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 ml-0.5"></span>
          </span>
        </div>
      ),
    },
    {
      name: "MyChoize",
      query: "MyChoize",
      logo: (
        <div className="flex items-center gap-1 group-hover:scale-105 transition-transform">
          <span className="font-extrabold text-base tracking-tight text-[#9333EA]">
            My<span className="font-black text-[#7E22CE]">Choize</span>
          </span>
          <span className="text-[7px] font-semibold text-slate-400 uppercase">
            ORIX
          </span>
        </div>
      ),
    },
    {
      name: "Myles",
      query: "Myles",
      logo: (
        <div className="flex items-center gap-1 group-hover:scale-105 transition-transform">
          <span className="font-black text-lg tracking-tight text-[#DC2626]">
            myles<span className="text-amber-500">.</span>
          </span>
        </div>
      ),
    },
    {
      name: "Budget India",
      query: "Budget",
      logo: (
        <div className="flex items-center gap-1 group-hover:scale-105 transition-transform">
          <span className="w-2.5 h-4.5 bg-[#FF6A13] skew-x-[-18deg] rounded-xs inline-block"></span>
          <span className="font-black text-base tracking-tight text-[#002868]">
            Budget
          </span>
        </div>
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
            title={`View ${agency.name} car rental deals across India`}
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
