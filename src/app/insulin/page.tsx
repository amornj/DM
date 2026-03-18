'use client'

import { useState } from 'react'
import { Info, AlertTriangle } from 'lucide-react'

export default function InsulinPage() {
  const [weight, setWeight] = useState('')
  const [a1c, setA1c] = useState('')
  const [fbg, setFbg] = useState('')
  const [beamSupper, setBeamSupper] = useState('')
  const [beamBreakfast, setBeamBreakfast] = useState('')

  const weightNum = parseFloat(weight)
  const a1cNum = parseFloat(a1c)
  const fbgNum = parseFloat(fbg)

  const basalDose = weightNum > 0 && a1cNum > 0 ? (() => {
    const rate = a1cNum >= 8 ? [0.2, 0.3] : [0.1, 0.2]
    return { min: (weightNum * rate[0]).toFixed(0), max: (weightNum * rate[1]).toFixed(0) }
  })() : null

  const getTitration = () => {
    if (!fbgNum) return null
    if (fbgNum < 40) return { action: 'Reduce by 20-40%', color: '#dc2626', urgency: 'URGENT — Severe hypoglycemia' }
    if (fbgNum < 70) return { action: 'Reduce by 10-20%', color: '#dc2626', urgency: 'Hypoglycemia' }
    if (fbgNum <= 109) return { action: 'No change', color: '#059669', urgency: 'At target' }
    if (fbgNum <= 139) return { action: '+1 unit', color: '#d97706', urgency: 'Slightly above target' }
    if (fbgNum <= 180) return { action: '+10% or +1 unit', color: '#ea580c', urgency: 'Above target' }
    return { action: '+20% or +2 units', color: '#dc2626', urgency: 'Well above target' }
  }

  const titration = getTitration()

  const beamDiff = beamSupper && beamBreakfast
    ? parseFloat(beamSupper) - parseFloat(beamBreakfast)
    : null

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Insulin Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">Basal dosing, titration, and calculators — AACE 2026</p>
      </div>

      {/* Basal Insulin Dosing Calculator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Basal Insulin Starting Dose Calculator</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Body Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 80"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">A1C (%)</label>
              <input
                type="number"
                step="0.1"
                value={a1c}
                onChange={(e) => setA1c(e.target.value)}
                placeholder="e.g. 9.0"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          {basalDose && (
            <div className="rounded-xl p-4 text-white mb-4" style={{ background: 'linear-gradient(135deg, #0d6e6e, #0a5555)' }}>
              <div className="text-sm font-medium text-white/80 mb-1">Starting Basal Insulin Dose</div>
              <div className="text-3xl font-bold">{basalDose.min} – {basalDose.max} units/day</div>
              <div className="text-sm text-white/80 mt-1">
                {a1cNum >= 8 ? '0.2-0.3 U/kg/day (A1C ≥8%)' : '0.1-0.2 U/kg/day (A1C <8%)'}
              </div>
              <div className="text-xs text-white/70 mt-2">
                Give once daily at bedtime (or same time daily). Preferred: glargine U-100, glargine U-300, or degludec.
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-700 mb-2">Dosing Formula Reference</div>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>A1C &lt;8%:</span>
                <span className="font-medium" style={{ color: '#0d6e6e' }}>0.1–0.2 U/kg/day</span>
              </div>
              <div className="flex justify-between">
                <span>A1C ≥8%:</span>
                <span className="font-medium" style={{ color: '#0d6e6e' }}>0.2–0.3 U/kg/day</span>
              </div>
              <div className="flex justify-between">
                <span>Typical max basal:</span>
                <span className="font-medium" style={{ color: '#0d6e6e' }}>0.5 U/kg/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FBG Titration Guide */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>FBG-Based Titration Guide</h2>
        </div>
        <div className="p-4">
          <div className="mb-3">
            <label className="text-xs font-medium text-gray-600 block mb-1">Fasting Blood Glucose (mg/dL)</label>
            <input
              type="number"
              value={fbg}
              onChange={(e) => setFbg(e.target.value)}
              placeholder="e.g. 165"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>

          {titration && (
            <div className="rounded-lg p-3 mb-4 border" style={{
              backgroundColor: titration.color + '15',
              borderColor: titration.color,
            }}>
              <div className="text-sm font-bold mb-0.5" style={{ color: titration.color }}>{titration.urgency}</div>
              <div className="text-base font-bold" style={{ color: titration.color }}>Dose adjustment: {titration.action}</div>
            </div>
          )}

          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-600 mb-2">Titration Reference Table</div>
            {[
              { fbg: '<40 mg/dL', action: 'Reduce 20-40%', color: '#dc2626', bg: '#fef2f2' },
              { fbg: '40-69 mg/dL', action: 'Reduce 10-20%', color: '#dc2626', bg: '#fef2f2' },
              { fbg: '70-109 mg/dL', action: 'No change (target)', color: '#059669', bg: '#f0fdf4' },
              { fbg: '110-139 mg/dL', action: '+1 unit', color: '#d97706', bg: '#fffbeb' },
              { fbg: '140-180 mg/dL', action: '+10% or +1 unit', color: '#ea580c', bg: '#fff7ed' },
              { fbg: '>180 mg/dL', action: '+20% or +2 units', color: '#dc2626', bg: '#fef2f2' },
            ].map(({ fbg: f, action, color, bg }) => (
              <div key={f} className="flex items-center justify-between p-2 rounded-lg text-xs" style={{ backgroundColor: bg }}>
                <span className="font-medium text-gray-700">FBG {f}</span>
                <span className="font-semibold" style={{ color }}>{action}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Titrate every 2-3 days based on average of last 3 FBG readings. Target FBG 80-130 mg/dL.</p>
        </div>
      </div>

      {/* BeAM Calculator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>BeAM Calculator (Before evening meal — Before morning)</h2>
        </div>
        <div className="p-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3 flex gap-2">
            <Info size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700">
              <strong>BeAM = Blood glucose before supper – Blood glucose before breakfast.</strong><br/>
              Positive value suggests postprandial glucose from lunch/dinner is contributing to overbasalization. Consider adding prandial insulin or switching to basal-bolus.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">BG Before Supper (mg/dL)</label>
              <input
                type="number"
                value={beamSupper}
                onChange={(e) => setBeamSupper(e.target.value)}
                placeholder="e.g. 180"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">BG Before Breakfast (mg/dL)</label>
              <input
                type="number"
                value={beamBreakfast}
                onChange={(e) => setBeamBreakfast(e.target.value)}
                placeholder="e.g. 130"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              />
            </div>
          </div>
          {beamDiff !== null && (
            <div className={`rounded-lg p-3 text-sm font-semibold border ${
              beamDiff > 50 ? 'bg-amber-50 border-amber-200 text-amber-700' :
              beamDiff > 0 ? 'bg-green-50 border-green-200 text-green-700' :
              'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <div>BeAM Score: {beamDiff} mg/dL</div>
              <div className="font-normal text-xs mt-0.5">
                {beamDiff > 50
                  ? 'Overbasalization likely — consider adding prandial insulin at largest meal or switching to premixed/basal-bolus'
                  : beamDiff > 0
                  ? 'Mild postprandial hyperglycemia — consider adjusting meal composition or adding GLP-1 RA'
                  : 'Basal insulin covering well — postprandial glucose not a significant contributor'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Insulin Types */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Insulin Types & Profiles</h2>
        </div>
        <div className="p-4 space-y-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Basal Insulins</div>
          {[
            { name: 'Glargine U-100 (Lantus/Basaglar)', onset: '1-2h', peak: 'Peakless', duration: '20-24h', freq: 'Once daily', note: 'Most common basal, generic available' },
            { name: 'Glargine U-300 (Toujeo)', onset: '6h', peak: 'Peakless', duration: '>24h', freq: 'Once daily', note: 'Less nocturnal hypoglycemia vs U-100' },
            { name: 'Degludec (Tresiba)', onset: '1h', peak: 'Peakless', duration: '>40h', freq: 'Once daily (flexible)', note: 'Flexible timing, less hypoglycemia' },
            { name: 'Icodec (Awiqli)', onset: 'Gradual', peak: 'Peakless', duration: '~1 week', freq: 'Once WEEKLY', note: 'Newest basal insulin — weekly dosing' },
            { name: 'NPH (Humulin N/Novolin N)', onset: '1-2h', peak: '4-10h', duration: '12-18h', freq: 'BID-TID', note: 'Peaks — higher nocturnal hypo risk. Cheapest.' },
          ].map(({ name, onset, peak, duration, freq, note }) => (
            <div key={name} className="rounded-lg border border-gray-200 p-3">
              <div className="text-sm font-semibold text-gray-800 mb-1">{name}</div>
              <div className="grid grid-cols-3 gap-1 mb-1">
                <div className="text-xs"><span className="text-gray-500">Onset:</span> <span className="font-medium">{onset}</span></div>
                <div className="text-xs"><span className="text-gray-500">Peak:</span> <span className="font-medium">{peak}</span></div>
                <div className="text-xs"><span className="text-gray-500">Duration:</span> <span className="font-medium">{duration}</span></div>
              </div>
              <div className="text-xs text-gray-500"><span className="font-medium">Frequency:</span> {freq}</div>
              <div className="text-xs text-gray-500 mt-0.5">{note}</div>
            </div>
          ))}

          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 mt-3">Bolus (Rapid-Acting) Insulins</div>
          {[
            { name: 'Aspart (NovoLog/Fiasp)', onset: '10-20min', peak: '1-3h', duration: '3-5h', note: 'Fiasp is ultra-rapid' },
            { name: 'Lispro (Humalog/Admelog)', onset: '15-30min', peak: '1-2h', duration: '3-5h', note: 'Take 0-15min before meal' },
            { name: 'Glulisine (Apidra)', onset: '15-30min', peak: '1-2h', duration: '3-4h', note: 'Take 0-15min before meal' },
          ].map(({ name, onset, peak, duration, note }) => (
            <div key={name} className="rounded-lg border border-gray-200 p-3">
              <div className="text-sm font-semibold text-gray-800 mb-1">{name}</div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-xs"><span className="text-gray-500">Onset:</span> <span className="font-medium">{onset}</span></div>
                <div className="text-xs"><span className="text-gray-500">Peak:</span> <span className="font-medium">{peak}</span></div>
                <div className="text-xs"><span className="text-gray-500">Duration:</span> <span className="font-medium">{duration}</span></div>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Overbasalization */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-semibold text-amber-800 mb-2">Overbasalization Detection</div>
            <div className="text-xs text-amber-700 space-y-1">
              <div>Signs of overbasalization (basal dose &gt;0.5 U/kg/day without reaching target A1C):</div>
              <ul className="space-y-0.5 mt-1 ml-2">
                <li>• FBG at target but A1C still elevated (suggests PPG problem)</li>
                <li>• Recurrent hypoglycemia</li>
                <li>• BeAM score &gt;50 mg/dL</li>
                <li>• Weight gain without A1C improvement</li>
              </ul>
              <div className="mt-2 font-medium">Action: Switch to basal-bolus regimen or add GLP-1 RA for PPG control</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hypoglycemia Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#fef2f2' }}>
          <h2 className="font-semibold text-sm text-red-700">Hypoglycemia Management (15-15 Rule)</h2>
        </div>
        <div className="p-4 space-y-2">
          {[
            { step: '1', text: 'If conscious: 15g fast-acting carbs (4 glucose tablets, 4 oz juice, 3-4 glucose gels)' },
            { step: '2', text: 'Wait 15 minutes, recheck blood glucose' },
            { step: '3', text: 'If BG <70 still: repeat 15g carbs' },
            { step: '4', text: 'Once resolved: eat a snack with protein + carb to prevent recurrence' },
            { step: '5', text: 'If unconscious or unable to swallow: Glucagon 1mg IM/SQ or Nasal glucagon 3mg' },
          ].map(({ step, text }) => (
            <div key={step} className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{step}</div>
              <div className="text-xs text-gray-700 mt-1">{text}</div>
            </div>
          ))}
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            <strong>Prescribe glucagon kit</strong> for all patients on insulin or SU. Educate patient AND caregiver on use.
          </div>
        </div>
      </div>
    </div>
  )
}
