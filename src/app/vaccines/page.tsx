export default function VaccinesPage() {
  const vaccines = [
    {
      name: 'COVID-19',
      schedule: 'Annual updated booster (per CDC guidance)',
      indication: 'All adults with T2D',
      notes: 'Higher risk of severe COVID-19 with diabetes. Stay current with updated formulations.',
      priority: 'high',
    },
    {
      name: 'Influenza',
      schedule: 'Annually (every fall)',
      indication: 'All adults with T2D',
      notes: 'Inactivated quadrivalent preferred. High-dose or adjuvanted preferred for age ≥65.',
      priority: 'high',
    },
    {
      name: 'Pneumococcal (PCV20)',
      schedule: 'Single dose (or PCV15 followed by PPSV23)',
      indication: 'All adults ≥65, or any age with T2D',
      notes: 'PCV20 provides broader coverage (20 serotypes). If given PCV15, follow with PPSV23 ≥1 year later.',
      priority: 'high',
    },
    {
      name: 'Hepatitis B (Heplisav-B or Engerix-B)',
      schedule: '2-dose (Heplisav-B) or 3-dose series if not previously vaccinated',
      indication: 'Unvaccinated adults with T2D',
      notes: 'T2D patients have higher HBV exposure risk (glucose meters, lancets). Heplisav-B (2 doses) preferred for efficacy.',
      priority: 'high',
    },
    {
      name: 'Tdap / Td',
      schedule: 'Tdap once (if not previously given), then Td booster every 10 years',
      indication: 'All adults',
      notes: 'Ensure tetanus coverage is up to date, especially important for wound healing in neuropathy/peripheral vascular disease.',
      priority: 'medium',
    },
    {
      name: 'Shingles (RZV — Shingrix)',
      schedule: '2-dose series (0 and 2-6 months)',
      indication: 'All adults ≥50; consider at any age with immunocompromising conditions',
      notes: 'Recombinant zoster vaccine. >90% efficacy. T2D patients on immunosuppressants are at higher risk.',
      priority: 'high',
    },
    {
      name: 'RSV (Abrysvo or mResvia)',
      schedule: 'Single dose',
      indication: 'Adults ≥60 years',
      notes: 'RSV can cause severe respiratory illness in older adults. Recommended for those ≥60. Discuss with patient.',
      priority: 'medium',
    },
    {
      name: 'Meningococcal (MenACWY / MenB)',
      schedule: 'Per risk-based criteria',
      indication: 'Asplenic patients, complement deficiencies, college students in dorms',
      notes: 'Not routinely required for T2D unless additional risk factors.',
      priority: 'low',
    },
    {
      name: 'HPV (Gardasil 9)',
      schedule: '2-3 dose series',
      indication: 'Up to age 26 (shared decision-making 27-45)',
      notes: 'Routine catch-up vaccination if not previously completed.',
      priority: 'medium',
    },
  ]

  const priorityColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    high: { bg: '#f0fdf4', border: '#16a34a', text: '#15803d', badge: 'bg-green-100 text-green-700' },
    medium: { bg: '#fffbeb', border: '#d97706', text: '#d97706', badge: 'bg-amber-100 text-amber-700' },
    low: { bg: '#f9fafb', border: '#9ca3af', text: '#6b7280', badge: 'bg-gray-100 text-gray-600' },
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Vaccine Recommendations</h1>
        <p className="text-sm text-gray-500 mt-0.5">Immunizations for adults with T2D — AACE 2026 & CDC 2025</p>
      </div>

      {/* Summary box */}
      <div className="rounded-xl p-4 text-white" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}>
        <div className="text-sm font-bold mb-2">Key Point</div>
        <p className="text-sm text-white/90">
          Adults with diabetes are at increased risk for influenza, pneumonia, and hepatitis B complications.
          Ensure all immunizations are up to date at every clinical encounter.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {['COVID-19', 'Flu', 'Pneumococcal', 'Hep B', 'Shingrix'].map((v) => (
            <span key={v} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">{v}</span>
          ))}
        </div>
      </div>

      {/* Vaccines */}
      <div className="space-y-3">
        {vaccines.map((vax) => {
          const colors = priorityColors[vax.priority]
          return (
            <div
              key={vax.name}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
              style={{ borderColor: colors.border + '60' }}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-sm font-bold text-gray-800">{vax.name}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${colors.badge}`}>
                    {vax.priority === 'high' ? 'High Priority' : vax.priority === 'medium' ? 'Recommended' : 'Risk-Based'}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div>
                    <span className="text-xs font-semibold text-gray-600">Schedule: </span>
                    <span className="text-xs text-gray-700">{vax.schedule}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-600">Indication: </span>
                    <span className="text-xs text-gray-700">{vax.indication}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{vax.notes}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick checklist */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Annual Review Checklist</h2>
        </div>
        <div className="p-4 space-y-2">
          {[
            'Influenza vaccine received this season?',
            'COVID-19 boosters up to date?',
            'Pneumococcal vaccination completed? (PCV20 or PCV15+PPSV23)',
            'Hepatitis B series complete?',
            'Shingrix series complete (age ≥50)?',
            'Tdap/Td within last 10 years?',
            'RSV vaccine if age ≥60?',
          ].map((item) => (
            <label key={item} className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="mt-0.5" style={{ accentColor: '#0d6e6e' }} />
              <span className="text-xs text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
