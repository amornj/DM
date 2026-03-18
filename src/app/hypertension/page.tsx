'use client'

import { useState } from 'react'
import { CheckCircle, AlertTriangle } from 'lucide-react'

export default function HypertensionPage() {
  const [systolic, setSystolic] = useState('')
  const [diastolic, setDiastolic] = useState('')
  const [hasCKD, setHasCKD] = useState(false)
  const [hasASCVD, setHasASCVD] = useState(false)
  const [hasHF, setHasHF] = useState(false)

  const sys = parseFloat(systolic)
  const dia = parseFloat(diastolic)
  const atTarget = sys > 0 && dia > 0 && sys < 130 && dia < 80

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Hypertension Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">AACE 2026 — BP Goals & Treatment Algorithm</p>
      </div>

      {/* BP Goal */}
      <div className="rounded-xl p-4 text-white" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>
        <div className="text-sm font-medium text-white/80 mb-1">Blood Pressure Target</div>
        <div className="text-3xl font-bold">&lt;130/80 mmHg</div>
        <div className="text-sm text-white/80 mt-1">For most adults with T2D (AACE 2026)</div>
        <div className="text-xs text-white/70 mt-1">&lt;120/80 if tolerated and low hypotension risk (consider in high CV risk)</div>
      </div>

      {/* BP Assessment */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h2 className="font-semibold text-sm text-gray-800 mb-3">BP Assessment</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Systolic (mmHg)</label>
            <input
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              placeholder="e.g. 145"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Diastolic (mmHg)</label>
            <input
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              placeholder="e.g. 90"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        {sys > 0 && dia > 0 && (
          <div className={`rounded-lg p-3 mb-3 flex items-start gap-2 ${atTarget ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            {atTarget ? <CheckCircle size={16} className="text-green-600 mt-0.5" /> : <AlertTriangle size={16} className="text-red-600 mt-0.5" />}
            <div>
              <div className={`text-sm font-semibold ${atTarget ? 'text-green-700' : 'text-red-700'}`}>
                {atTarget ? 'BP at target (<130/80)' : `BP above target — ${sys}/${dia} mmHg`}
              </div>
              {!atTarget && (
                <div className="text-xs text-red-600 mt-0.5">
                  {sys >= 180 || dia >= 120 ? 'Hypertensive crisis — urgent evaluation required' :
                   sys >= 160 || dia >= 100 ? 'Stage 2 HTN — initiate dual therapy' :
                   'Stage 1 HTN — initiate therapy or intensify existing regimen'}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {[
            { label: 'CKD present', key: 'ckd', state: hasCKD, setState: setHasCKD },
            { label: 'ASCVD present', key: 'ascvd', state: hasASCVD, setState: setHasASCVD },
            { label: 'Heart Failure', key: 'hf', state: hasHF, setState: setHasHF },
          ].map(({ label, key, state, setState }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={state}
                onChange={(e) => setState(e.target.checked)}
                style={{ accentColor: '#0d6e6e' }}
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Treatment Algorithm */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Step-by-Step Treatment Algorithm</h2>
        </div>
        <div className="p-4 space-y-3">
          {/* Step 1 */}
          <div className="rounded-lg border-2 p-3" style={{ borderColor: '#0d6e6e', backgroundColor: '#e6f4f4' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0d6e6e' }}>1</div>
              <div className="text-sm font-bold" style={{ color: '#0d6e6e' }}>Lifestyle Modifications (all patients)</div>
            </div>
            <ul className="text-xs text-gray-700 space-y-1 ml-8">
              <li>• Weight loss (every 1kg loss → ~1 mmHg BP reduction)</li>
              <li>• DASH diet (↓ Na to &lt;2.3g/day, ↑ K, Mg, Ca)</li>
              <li>• Aerobic exercise 150 min/week</li>
              <li>• Limit alcohol (&lt;1-2 drinks/day)</li>
              <li>• Stop smoking</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="rounded-lg border border-gray-200 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#0891b2' }}>2</div>
              <div className="text-sm font-bold text-gray-800">First-Line Pharmacotherapy</div>
            </div>
            <div className="space-y-2 ml-8 text-xs">
              <div className="p-2 rounded bg-blue-50 border border-blue-200">
                <span className="font-semibold text-blue-800">ACEi or ARB (preferred in T2D)</span>
                <div className="text-blue-700 mt-0.5">
                  {hasCKD ? 'Strongly preferred — renoprotective (reduces proteinuria, slows CKD progression)' :
                   hasHF ? 'Preferred — ACEi/ARB + beta-blocker for HFrEF' :
                   'Preferred due to renal protection and metabolic benefits'}
                </div>
                <div className="mt-1 text-gray-600">
                  ACEi: Lisinopril 10-40mg, Ramipril 5-10mg, Enalapril 10-40mg
                </div>
                <div className="text-gray-600">ARB: Losartan 50-100mg, Irbesartan 150-300mg, Olmesartan 20-40mg</div>
              </div>
              <div className="text-gray-500">Do NOT combine ACEi + ARB (increased adverse effects without added benefit)</div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-lg border border-gray-200 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#7c3aed' }}>3</div>
              <div className="text-sm font-bold text-gray-800">Add Second Agent (if BP still above target)</div>
            </div>
            <div className="space-y-1 ml-8 text-xs text-gray-600">
              <div className="p-2 rounded bg-purple-50 border border-purple-100">
                <span className="font-semibold text-purple-800">Add CCB (amlodipine 5-10mg) or Thiazide (chlorthalidone 12.5-25mg)</span>
                <div className="text-purple-700 mt-0.5">CCB preferred if angina or isolated systolic HTN. Thiazide preferred if edema or volume overload.</div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="rounded-lg border border-gray-200 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#d97706' }}>4</div>
              <div className="text-sm font-bold text-gray-800">Triple Therapy</div>
            </div>
            <div className="text-xs text-gray-600 ml-8">
              ACEi/ARB + CCB + Thiazide — consider fixed-dose combination pills for adherence
            </div>
          </div>

          {/* Resistant HTN */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">!</div>
              <div className="text-sm font-bold text-red-700">Resistant HTN (BP ≥130/80 on ≥3 agents including diuretic)</div>
            </div>
            <div className="text-xs text-red-700 ml-8 space-y-1">
              <div>• Add spironolactone 25-50mg (most effective add-on per PATHWAY-2)</div>
              <div>• Rule out secondary HTN: sleep apnea, CKD, primary aldosteronism, renal artery stenosis</div>
              <div>• Check medication adherence</div>
              <div>• Refer to HTN specialist</div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Considerations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Special Considerations</h2>
        </div>
        <div className="p-4 space-y-3">
          {[
            {
              condition: 'T2D + CKD',
              rec: 'ACEi or ARB mandatory. Target BP <130/80. Add finerenone if UACR >200 + eGFR ≥25. SGLT2i for cardiorenal protection.',
              color: '#0891b2',
            },
            {
              condition: 'T2D + HFrEF',
              rec: 'ACEi/ARBi/ARNI + beta-blocker + MRA + SGLT2i (quadruple therapy). Target BP <130/80 but avoid hypotension.',
              color: '#7c3aed',
            },
            {
              condition: 'T2D + ASCVD',
              rec: 'ACEi/ARB first-line. Add CCB or thiazide as needed. Avoid beta-blockers as first-line unless post-MI or HFrEF.',
              color: '#dc2626',
            },
            {
              condition: 'Orthostatic Hypotension',
              rec: 'Common in autonomic neuropathy. Measure BP standing. Avoid excessive BP lowering. Target SBP 130-150 in elderly.',
              color: '#d97706',
            },
          ].map(({ condition, rec, color }) => (
            <div key={condition} className="rounded-lg border border-gray-200 p-3">
              <div className="text-sm font-semibold mb-1" style={{ color }}>{condition}</div>
              <div className="text-xs text-gray-600">{rec}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
