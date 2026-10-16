export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
          Legal Framework
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
          Rental Terms & Motor Vehicles Act Compliance
        </h1>
        <p className="text-xs text-slate-500 mt-1">Last updated: October 2026 • Effective Pan-India</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Eligibility to Rent & Drive</h2>
          <p>
            In accordance with the Motor Vehicles Act 1988 and Central Motor Vehicles Rules 1989, all renters must be at least 21 years of age and hold an original, unexpired Indian Driving Licence (LMV - Light Motor Vehicle) issued at least 12 months prior to the rental start date. Learners licences are strictly prohibited. Foreign nationals must produce a valid International Driving Permit (IDP) accompanied by their domestic passport and driving licence.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Vehicle Usage & Speed Regulations</h2>
          <p>
            All vehicles in our commercial self-drive fleet are fitted with calibrated electronic speed governors as mandated by the Ministry of Road Transport and Highways (MoRTH). The maximum permissible highway speed is 80 km/h on regular national highways and 120 km/h on access-controlled expressways. Over-speeding triggers an automated audible cabin chime and repeated violations may lead to lease termination.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Tolls & NHAI FASTag Reconciliation</h2>
          <p>
            All vehicles operate with pre-activated NHAI FASTag tags registered under PRAVAAS Mobility. Toll charges incurred during the trip are logged via the National Electronic Toll Collection (NETC) switch. The actual toll deductions will be offset against the refundable security deposit or invoiced on trip closure with zero administrative surcharge.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Fuel Policy (Level-to-Level)</h2>
          <p>
            Vehicles are handed over with a 100% full fuel tank or certified 90%+ EV battery charge. The renter is expected to return the vehicle at the identical fuel or battery mark. Refueling shortfalls are billed strictly at actual IOCL/BPCL market pump rates with zero service mark-up.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">5. Security Deposit & Damage Liability</h2>
          <p>
            A refundable security deposit (₹2,000 to ₹5,000 depending on vehicle segment) is authorized during checkout. If the renter has opted for Zero-Depreciation Protection, accidental minor body scratches or windshield chips are covered with ₹0 personal excess liability. Depository balances are released within 2 hours of vehicle return inspection directly via UPI or original card rails.
          </p>
        </section>
      </div>
    </div>
  );
}
