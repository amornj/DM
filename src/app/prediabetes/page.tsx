'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'

export default function PrediabetesPage() {
  const [a1c, setA1c] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')

  const a1cNum = parseFloat(a1c)
  const weightNum = parseFloat(weight)
  const heightNum = parseFloat(height)
  const bmi = weightNum && heightNum ? (weightNum / ((heightNum / 100) ** 2)).toFixed(1) : null

  const isPrediabetes = a1cNum >= 5.7 && a1cNum <= 6.4
  const isDiabetes = a1cNum >= 6.5
  const isNormal = a1cNum > 0 && a1cNum < 5.7

  const bmiNum = bmi ? parseFloat(bmi) : null
  const isObesity = bmiNum && bmiNum >= 30
  const isOverweight = bmiNum && bmiNum >= 25 && bmiNum < 30

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Prediabetes Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">AACE 2026 — Identification & Intervention</p>
      </div>

      {/* Diagnostic Criteria */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Diagnostic Criteria</h2>
        </div>
        <div className="p-4 grid sm:grid-cols-3 gap-3">
          {[
            { test: 'A1C', range: '5.7 – 6.4%', note: 'Prediabetes range' },
            { test: 'Fasting Plasma Glucose (IFG)', range: '100 – 125 mg/dL', note: 'Impaired Fasting Glucose' },
            { test: 'OGTT 2-hr (IGT)', range: '140 – 199 mg/dL', note: 'Impaired Glucose Tolerance' },
          ].map(({ test, range, note }) => (
            <div key={test} className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs font-semibold text-gray-600 mb-1">{test}</div>
              <div className="text-sm font-bold" style={{ color: '#0d6e6e' }}>{range}</div>
              <div className="text-xs text-gray-500 mt-0.5">{note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h2 className="font-semibold text-sm text-gray-800 mb-3">Patient Assessment Calculator</h2>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">A1C (%)</label>
            <input
              type="number"
              step="0.1"
              min="4"
              max="15"
              value={a1c}
              onChange={(e) => setA1c(e.target.value)}
              placeholder="e.g. 6.0"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#0d6e6e' } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 85"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 170"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        {/* Results */}
        {a1cNum > 0 && (
          <div className={`rounded-lg p-3 mb-3 flex items-start gap-2 ${
            isDiabetes ? 'bg-red-50 border border-red-200' :
            isPrediabetes ? 'bg-amber-50 border border-amber-200' :
            'bg-green-50 border border-green-200'
          }`}>
            {isDiabetes ? <AlertTriangle size={16} className="text-red-600 mt-0.5" /> :
             isPrediabetes ? <AlertTriangle size={16} className="text-amber-600 mt-0.5" /> :
             <CheckCircle size={16} className="text-green-600 mt-0.5" />}
            <div>
              <div className={`text-sm font-semibold ${isDiabetes ? 'text-red-700' : isPrediabetes ? 'text-amber-700' : 'text-green-700'}`}>
                {isDiabetes ? 'A1C suggests Diabetes (≥6.5%)' :
                 isPrediabetes ? 'A1C in Prediabetes range (5.7–6.4%)' :
                 'A1C Normal (<5.7%)'}
              </div>
              {isPrediabetes && <div className="text-xs text-amber-600 mt-0.5">Initiate lifestyle intervention. Consider pharmacotherapy if high risk.</div>}
              {isDiabetes && <div className="text-xs text-red-600 mt-0.5">Confirm with repeat testing. Proceed to diabetes management pathway.</div>}
            </div>
          </div>
        )}

        {bmi && (
          <div className="rounded-lg p-3 bg-blue-50 border border-blue-200 flex items-start gap-2">
            <Info size={16} className="text-blue-600 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-blue-700">BMI: {bmi} kg/m²</div>
              <div className="text-xs text-blue-600 mt-0.5">
                {isObesity ? 'Obesity (≥30) — Weight loss pharmacotherapy indicated if prediabetes/diabetes' :
                 isOverweight ? 'Overweight (25–29.9) — Intensive lifestyle intervention recommended' :
                 'Normal weight — Lifestyle modification still important'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lifestyle Interventions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Lifestyle Interventions (First Line)</h2>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex gap-3">
            <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#0d6e6e' }} />
            <div>
              <div className="text-sm font-semibold text-gray-800">Weight Loss ≥7%</div>
              <div className="text-xs text-gray-500">Reduces T2D risk by ~58%. Target 150 min/week moderate activity.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#0d6e6e' }} />
            <div>
              <div className="text-sm font-semibold text-gray-800">Mediterranean / Low-carb Diet</div>
              <div className="text-xs text-gray-500">Reduce refined carbs, sugar-sweetened beverages, processed foods.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#0d6e6e' }} />
            <div>
              <div className="text-sm font-semibold text-gray-800">Physical Activity</div>
              <div className="text-xs text-gray-500">≥150 min/week moderate aerobic + resistance training 2-3×/week.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#0d6e6e' }} />
            <div>
              <div className="text-sm font-semibold text-gray-800">Sleep & Stress Management</div>
              <div className="text-xs text-gray-500">Adequate sleep (7-9 hrs) and stress reduction improve insulin sensitivity.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pharmacotherapy Decision Tree */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Pharmacotherapy — When to Consider</h2>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 p-3">
              <div className="text-sm font-semibold text-gray-800 mb-2">Metformin</div>
              <div className="text-xs text-gray-600 mb-2">Consider if: A1C 5.7–6.4% + BMI ≥35, or age &lt;60, or history of GDM, or lifestyle insufficient after 3-6 months</div>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">A1C ↓ 1-2%</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Weight neutral/loss</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Very low cost</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Dose: 500mg with dinner → 500mg BID → 1000mg BID (max 2000mg/day)</div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3">
              <div className="text-sm font-semibold text-gray-800 mb-2">Pioglitazone</div>
              <div className="text-xs text-gray-600 mb-2">ACT NOW trial: 72% risk reduction in IGT. Consider if insulin resistance, MASLD, or metformin intolerance.</div>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Strong evidence in IGT</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Weight gain</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Edema risk</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Dose: 15-30mg daily. Avoid in HF, bladder cancer.</div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3">
              <div className="text-sm font-semibold text-gray-800 mb-2">Acarbose</div>
              <div className="text-xs text-gray-600 mb-2">STOP-NIDDM trial: 25% risk reduction. Targets postprandial hyperglycemia.</div>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Postprandial glucose</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">GI side effects</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Dose: 25mg TID with meals, titrate to 50-100mg TID.</div>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
              <div className="text-sm font-semibold text-purple-800 mb-2">GLP-1 RA / Tirzepatide (if BMI ≥30)</div>
              <div className="text-xs text-purple-700">For weight-related prediabetes with BMI ≥30 (or ≥27 with complication), consider semaglutide 2.4mg or tirzepatide for weight loss + diabetes prevention.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Autoantibody Screening */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-semibold text-amber-800 mb-1">Autoantibody Screening Triggers</div>
            <p className="text-xs text-amber-700 mb-2">Consider screening for T1D-associated autoantibodies (GAD65, IA-2, ZnT8, IAA) if:</p>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• Rapid deterioration despite oral agents</li>
              <li>• Lean BMI (&lt;25) with hyperglycemia</li>
              <li>• Family history of T1D</li>
              <li>• Age &lt;35 at diabetes onset</li>
              <li>• DKA without precipitating cause</li>
              <li>• Unexplained weight loss</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Follow-up */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h2 className="font-semibold text-sm text-gray-800 mb-3">Monitoring Schedule</h2>
        <div className="space-y-2">
          {[
            { freq: 'Every 3-6 months', task: 'A1C and fasting glucose while on intervention' },
            { freq: 'Annually', task: 'Reassess risk factors, weight, BP, lipids' },
            { freq: 'At 3 months', task: 'Assess lifestyle adherence; adjust pharmacotherapy if needed' },
          ].map(({ freq, task }) => (
            <div key={freq} className="flex items-start gap-3">
              <div className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#e6f4f4', color: '#0d6e6e' }}>{freq}</div>
              <div className="text-xs text-gray-600 mt-1">{task}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
