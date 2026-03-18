'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function GlucoseCentricPage() {
  const [a1c, setA1c] = useState('')
  const [weight, setWeight] = useState<'lose' | 'neutral' | 'gain' | ''>('')
  const [symptomatic, setSymptomatic] = useState(false)
  const [glucose, setGlucose] = useState('')

  const a1cNum = parseFloat(a1c)
  const glucoseNum = parseFloat(glucose)

  const getTier = () => {
    if (symptomatic || glucoseNum >= 300 || a1cNum >= 10) return 'insulin'
    if (a1cNum > 9) return 'triple'
    if (a1cNum >= 7.5) return 'dual'
    if (a1cNum >= 6.5) return 'mono'
    return null
  }

  const tier = getTier()

  const getWeightPref = () => {
    if (weight === 'lose') return ['GLP-1 RA', 'SGLT2i', 'Metformin']
    if (weight === 'gain') return ['Metformin', 'DPP-4i', 'SGLT2i']
    return ['Metformin', 'GLP-1 RA', 'SGLT2i', 'DPP-4i']
  }

  const weightPrefs = getWeightPref()

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Glucose-Centric Approach</h1>
        <p className="text-sm text-gray-500 mt-0.5">A1C-based therapy selection — AACE 2026</p>
      </div>

      {/* A1C Tier Visual */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>A1C-Based Therapy Tiers</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            {
              range: 'A1C <7.5%',
              tier: 'Monotherapy',
              drugs: 'Metformin, GLP-1 RA, SGLT2i, or TZD',
              detail: 'Start one agent. Reassess at 3 months. Prefer agents with CV/renal benefit if risk factors present.',
              color: '#059669',
              bg: '#f0fdf4',
            },
            {
              range: 'A1C 7.5-9%',
              tier: 'Dual Therapy',
              drugs: 'Add GLP-1 RA, SGLT2i, DPP-4i, TZD, or SU to metformin',
              detail: 'Two-agent combination. Prefer GLP-1 RA or SGLT2i if weight loss or CV benefit needed.',
              color: '#d97706',
              bg: '#fffbeb',
            },
            {
              range: 'A1C >9%',
              tier: 'Triple Therapy or Insulin',
              drugs: 'Triple combination or add basal insulin',
              detail: 'Start ≥2 agents simultaneously. If A1C >10% or symptomatic → basal insulin + oral agents.',
              color: '#ea580c',
              bg: '#fff7ed',
            },
            {
              range: 'Symptomatic, A1C ≥10%, BG >300',
              tier: 'Insulin Required',
              drugs: 'Basal insulin ± bolus insulin, continue oral agents',
              detail: 'Immediate insulin therapy. De-intensify once glucose controlled and A1C improves.',
              color: '#dc2626',
              bg: '#fef2f2',
            },
          ].map(({ range, tier: t, drugs, detail, color, bg }) => (
            <div key={range} className="p-4" style={{ backgroundColor: bg }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>{range}</span>
                <span className="text-sm font-bold" style={{ color }}>{t}</span>
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">{drugs}</div>
              <div className="text-xs text-gray-500 mt-0.5">{detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Assessment */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h2 className="font-semibold text-sm text-gray-800 mb-3">Patient Assessment Tool</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">A1C (%)</label>
              <input
                type="number"
                step="0.1"
                value={a1c}
                onChange={(e) => setA1c(e.target.value)}
                placeholder="e.g. 8.2"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Random Glucose (mg/dL)</label>
              <input
                type="number"
                value={glucose}
                onChange={(e) => setGlucose(e.target.value)}
                placeholder="e.g. 280"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 block mb-2">Weight Goal</label>
            <div className="flex gap-2">
              {[
                { value: 'lose', label: 'Weight Loss' },
                { value: 'neutral', label: 'Neutral' },
                { value: 'gain', label: 'Avoid Gain' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setWeight(value as typeof weight)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    weight === value ? 'text-white border-transparent' : 'text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                  style={weight === value ? { backgroundColor: '#0d6e6e' } : {}}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={symptomatic}
              onChange={(e) => setSymptomatic(e.target.checked)}
              style={{ accentColor: '#0d6e6e' }}
            />
            <span className="text-sm text-gray-800">Symptomatic (polyuria, polydipsia, weight loss, blurred vision)</span>
          </label>
        </div>

        {/* Result */}
        {tier && (
          <div className="mt-4 rounded-xl border-2 p-4" style={{
            borderColor: tier === 'insulin' ? '#dc2626' : tier === 'triple' ? '#ea580c' : tier === 'dual' ? '#d97706' : '#059669',
            backgroundColor: tier === 'insulin' ? '#fef2f2' : tier === 'triple' ? '#fff7ed' : tier === 'dual' ? '#fffbeb' : '#f0fdf4',
          }}>
            <div className="text-sm font-bold mb-1" style={{
              color: tier === 'insulin' ? '#dc2626' : tier === 'triple' ? '#ea580c' : tier === 'dual' ? '#d97706' : '#059669',
            }}>
              {tier === 'insulin' ? 'Insulin Required' : tier === 'triple' ? 'Triple Therapy Recommended' : tier === 'dual' ? 'Dual Therapy Recommended' : 'Monotherapy Recommended'}
            </div>
            {weight && (
              <div className="text-xs text-gray-600">
                <span className="font-medium">Preferred agents (weight goal — {weight === 'lose' ? 'weight loss' : weight === 'gain' ? 'avoid gain' : 'neutral'}): </span>
                {weightPrefs.join(' → ')}
              </div>
            )}
            {tier === 'insulin' && (
              <div className="mt-2 text-xs text-red-700 font-medium">
                Start basal insulin immediately. Continue oral agents. Target FBG 80-130 mg/dL.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Drug Hierarchy by Weight */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Drug Preference by Weight Effect</h2>
        </div>
        <div className="p-4 space-y-3">
          <div className="rounded-lg bg-green-50 border border-green-200 p-3">
            <div className="text-sm font-semibold text-green-700 mb-2">Weight Loss (Weight Positive)</div>
            <div className="space-y-1.5">
              {[
                { drug: 'Tirzepatide (GIP/GLP-1 RA)', loss: '-8 to -12 kg', note: 'Highest weight loss' },
                { drug: 'Semaglutide 2.4mg', loss: '-6 to -15 kg', note: 'Approved for obesity' },
                { drug: 'Semaglutide 1-2mg', loss: '-4 to -6 kg', note: 'T2D dosing' },
                { drug: 'SGLT2i (empagliflozin)', loss: '-2 to -3 kg', note: 'Moderate loss' },
                { drug: 'GLP-1 RA (liraglutide, dulaglutide)', loss: '-2 to -3 kg', note: 'Moderate loss' },
                { drug: 'Metformin', loss: '-0.5 to -1.5 kg', note: 'Slight loss' },
              ].map(({ drug, loss, note }) => (
                <div key={drug} className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 font-medium">{drug}</span>
                  <span className="text-green-600 font-semibold">{loss}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
            <div className="text-sm font-semibold text-gray-700 mb-2">Weight Neutral</div>
            <div className="text-xs text-gray-600">DPP-4i (sitagliptin, linagliptin) — no significant weight change</div>
          </div>

          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <div className="text-sm font-semibold text-amber-700 mb-2">Weight Gain (Avoid if Obese)</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-gray-700">SU (glipizide, glimepiride)</span><span className="text-amber-600">+1 to +2 kg</span></div>
              <div className="flex justify-between"><span className="text-gray-700">TZD (pioglitazone)</span><span className="text-amber-600">+2 to +4 kg</span></div>
              <div className="flex justify-between"><span className="text-gray-700">Insulin</span><span className="text-amber-600">+2 to +4 kg</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hypoglycemia Risk */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Hypoglycemia Risk</h2>
        </div>
        <div className="p-4 grid sm:grid-cols-3 gap-3">
          {[
            { level: 'Low Risk', drugs: 'Metformin, GLP-1 RA, SGLT2i, DPP-4i, TZD', color: '#059669', bg: '#f0fdf4' },
            { level: 'Moderate Risk', drugs: 'Basal insulin (especially with meals missed)', color: '#d97706', bg: '#fffbeb' },
            { level: 'High Risk', drugs: 'SU (especially glyburide), Bolus insulin, NPH insulin', color: '#dc2626', bg: '#fef2f2' },
          ].map(({ level, drugs, color, bg }) => (
            <div key={level} className="rounded-lg p-3" style={{ backgroundColor: bg }}>
              <div className="text-sm font-bold mb-1" style={{ color }}>{level}</div>
              <div className="text-xs text-gray-600">{drugs}</div>
            </div>
          ))}
        </div>
      </div>

      {/* A1C Target Goals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>A1C Target Goals</h2>
        </div>
        <div className="p-4 space-y-2">
          {[
            { target: '<6.5%', patient: 'Younger, newly diagnosed, no hypoglycemia risk, long life expectancy', color: '#059669' },
            { target: '<7.0%', patient: 'Most adults with T2D — standard target', color: '#0d6e6e' },
            { target: '<7.5%', patient: 'Moderate hypoglycemia risk or comorbidities', color: '#d97706' },
            { target: '<8.0%', patient: 'Elderly, frail, limited life expectancy, severe hypoglycemia risk', color: '#dc2626' },
          ].map(({ target, patient, color }) => (
            <div key={target} className="flex gap-3 items-start p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-sm font-bold w-16 flex-shrink-0" style={{ color }}>{target}</div>
              <div className="text-xs text-gray-600">{patient}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">
          <span className="font-semibold">Important:</span> The glucose-centric approach applies when no dominant comorbidity (HF, CKD, ASCVD) is present. When comorbidities exist, prioritize agents with proven organ-protective benefits regardless of A1C level.
        </p>
      </div>
    </div>
  )
}
