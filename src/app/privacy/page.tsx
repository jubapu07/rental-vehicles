export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
          Digital Personal Data Protection Act 2023
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-2">
          Privacy Policy & Data Fiduciary Obligations
        </h1>
        <p className="text-xs text-slate-500 mt-1">Effective under Indian Data Protection Board Guidelines</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Data Principal Rights</h2>
          <p>
            PRAVAAS Mobility acts as a Data Fiduciary under the Digital Personal Data Protection Act 2023 (DPDP Act). You have explicit rights to access, correct, complete, and request erasure of your personal data upon completion of regulatory compliance retention periods mandated by Indian law.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Masked Aadhaar Storage & UIDAI Compliance</h2>
          <p>
            In strict compliance with Supreme Court of India guidelines and UIDAI regulations, PRAVAAS Mobility <strong>never stores full 12-digit Aadhaar numbers</strong> on any physical or cloud server. All identity documents are processed through DigiLocker and stored exclusively in masked format (e.g., <code>XXXX-XXXX-1234</code>).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Telematics & GPS Fleet Location Data</h2>
          <p>
            Vehicles are equipped with GPS tracking solely for emergency roadside assistance, stolen vehicle recovery, automated FASTag toll verification, and geo-fencing against unauthorized international border crossings. We never sell or share driving telemetry with commercial advertisers or third-party marketing entities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Data Deletion Requests</h2>
          <p>
            Users may submit an account erasure request by emailing our designated Data Protection Officer (DPO) at <code>privacy@pravaas.in</code>. All non-statutory personal identifiers will be purged within 30 days of trip closure and GST tax invoice settlement.
          </p>
        </section>
      </div>
    </div>
  );
}
