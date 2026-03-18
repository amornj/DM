'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle } from 'lucide-react'

export default function DyslipideminaPage() {
  const [ldl, setLdl] = useState('')
  const [risk, setRisk] = useState('')
  const [tg, setTg] = useState('')

  const ldlNum = parseFloat(ldl)
  const tgNum = parseFloat(tg)

  const getLdlTarget = (riskCat: string) => {
    switch (riskCat) {
      case 'extreme': return { target: '<55 mg/dL', reduction: '≥50%', label: 'Extreme Risk' }
      case 'very-high': return { target: '<55 mg/dL', reduction: '≥50%', label: 'Very High Risk' }
      case 'high': return { target: '<70 mg/dL', reduction: '≥50%', label: 'High Risk' }
      case 'moderate': return { target: '<100 mg/dL', reduction: 'Moderate statin', label: 'Moderate Risk' }
      case 'low': return { target: '<130 mg/dL', reduction: 'Lifestyle ± low-dose statin', label: 'Low Risk' }
      default: return null
    }
  }

  const target = getLdlTarget(risk)
  const ldlAtTarget = target && ldlNum > 0 && ldlNum < parseFloat(target.target.replace('<', '').replace(' mg/dL', ''))

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dyslipidemia Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">AACE 2026 — Lipid Targets & Therapy Algorithm</p>
      </div>

      {/* Risk Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>ASCVD Risk Categories & LDL-C Targets</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            {
              risk: 'Extreme Risk',
              target: '<55 mg/dL',
              criteria: 'ASCVD + T2D, or T2D + CKD (eGFR <30), or familial hypercholesterolemia + ASCVD, or multiple major ASCVD events',
              color: '#dc2626',
              bg: '#fef2f2',
            },
            {
              risk: 'Very High Risk',
              target: '<55 mg/dL',
              criteria: 'T2D + 1 ASCVD risk factor (age ≥40, HTN, dyslipidemia, smoking, obesity) or established ASCVD without T2D',
              color: '#ea580c',
              bg: '#fff7ed',
            },
            {
              risk: 'High Risk',
              target: '<70 mg/dL',
              criteria: 'T2D without other risk factors, age <40, or CKD eGFR 30-60',
              color: '#d97706',
              bg: '#fffbeb',
            },
            {
              risk: 'Moderate Risk',
              target: '<100 mg/dL',
              criteria: 'T2D, age <40, short duration, no risk factors',
              color: '#059669',
              bg: '#f0fdf4',
            },
          ].map(({ risk: r, target: t, criteria, color, bg }) => (
            <div key={r} className="p-4" style={{ backgroundColor: bg }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold" style={{ color }}>{r}</span>
                <span className="text-sm font-bold" style={{ color }}>LDL-C {t}</span>
              </div>
              <p className="text-xs text-gray-600">{criteria}</p>
            </div>
          ))}
        </div>
      </div>

      {/* LDL Calculator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h2 className="font-semibold text-sm text-gray-800 mb-3">LDL-C Target Checker</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Current LDL-C (mg/dL)</label>
            <input
              type="number"
              value={ldl}
              onChange={(e) => setLdl(e.target.value)}
              placeholder="e.g. 85"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Risk Category</label>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
            >
              <option value="">Select...</option>
              <option value="extreme">Extreme Risk</option>
              <option value="very-high">Very High Risk</option>
              <option value="high">High Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>
        {target && ldlNum > 0 && (
          <div className={`rounded-lg p-3 flex items-start gap-2 ${ldlAtTarget ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            {ldlAtTarget ? <CheckCircle size={16} className="text-green-600 mt-0.5" /> : <AlertTriangle size={16} className="text-red-600 mt-0.5" />}
            <div>
              <div className={`text-sm font-semibold ${ldlAtTarget ? 'text-green-700' : 'text-red-700'}`}>
                {ldlAtTarget ? 'LDL-C at target' : 'LDL-C above target'}
              </div>
              <div className={`text-xs ${ldlAtTarget ? 'text-green-600' : 'text-red-600'}`}>
                Target for {target.label}: {target.target}
                {!ldlAtTarget && ` — Need to reduce by ${(ldlNum - parseFloat(target.target.replace('<', '').replace(' mg/dL', ''))).toFixed(0)} mg/dL`}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Statin Therapy Guide */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Statin Therapy</h2>
        </div>
        <div className="p-4 space-y-3">
          <div className="rounded-lg border-2 p-3" style={{ borderColor: '#dc2626', backgroundColor: '#fef2f2' }}>
            <div className="text-sm font-bold text-red-700 mb-2">High-Intensity Statins (LDL ↓ ≥50%)</div>
            <div className="space-y-1 text-xs text-gray-700">
              <div className="flex justify-between"><span>Atorvastatin 40-80mg/day</span><span className="text-red-600">First line</span></div>
              <div className="flex justify-between"><span>Rosuvastatin 20-40mg/day</span><span className="text-red-600">Alternative</span></div>
            </div>
          </div>
          <div className="rounded-lg border-2 p-3" style={{ borderColor: '#d97706', backgroundColor: '#fffbeb' }}>
            <div className="text-sm font-bold text-amber-700 mb-2">Moderate-Intensity Statins (LDL ↓ 30-50%)</div>
            <div className="space-y-1 text-xs text-gray-700">
              <div className="flex justify-between"><span>Atorvastatin 10-20mg/day</span><span className="text-amber-600">High risk</span></div>
              <div className="flex justify-between"><span>Rosuvastatin 5-10mg/day</span><span className="text-amber-600">Alternative</span></div>
              <div className="flex justify-between"><span>Simvastatin 20-40mg/day</span><span className="text-amber-600">Less preferred</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add-on Therapy */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Add-on Therapy (Stepwise)</h2>
        </div>
        <div className="p-4">
          <div className="flex items-stretch gap-0">
            {[
              { step: '1', drug: 'Max-dose statin', desc: 'Start here. Titrate to max tolerated dose first.', color: '#0d6e6e' },
              { step: '2', drug: 'Ezetimibe 10mg', desc: 'Add if LDL still above target. ↓LDL ~20% additional.', color: '#0891b2' },
              { step: '3', drug: 'Bempedoic Acid', desc: 'Add if still above target. Especially for statin intolerance. ↓LDL ~17% more.', color: '#7c3aed' },
              { step: '4', drug: 'PCSK9 Inhibitor', desc: 'Evolocumab 140mg Q2W or Alirocumab 75-150mg Q2W. ↓LDL up to 60% more.', color: '#dc2626' },
            ].map(({ step, drug, desc, color }, idx, arr) => (
              <div key={step} className="flex flex-col items-center" style={{ flex: 1 }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: color }}>{step}</div>
                {idx < arr.length - 1 && (
                  <div className="hidden sm:flex text-gray-300 text-lg mx-1 items-center">→</div>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2 mt-3">
            {[
              { step: '1', drug: 'Max-dose statin', desc: 'Titrate to max tolerated dose first.', color: '#0d6e6e' },
              { step: '2', drug: 'Ezetimibe 10mg', desc: 'Add-on: ↓LDL ~20% additional.', color: '#0891b2' },
              { step: '3', drug: 'Bempedoic Acid 180mg', desc: 'Useful in statin intolerance/SAMS. ↓LDL ~17% additional.', color: '#7c3aed' },
              { step: '4', drug: 'PCSK9 Inhibitor', desc: 'Evolocumab/Alirocumab. ↓LDL up to 60% additional.', color: '#dc2626' },
            ].map(({ step, drug, desc, color }) => (
              <div key={step} className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: color }}>{step}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{drug}</div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SAMS Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Statin-Associated Muscle Symptoms (SAMS)</h2>
        </div>
        <div className="p-4 space-y-2">
          <div className="text-xs text-gray-600 mb-2">If myalgia/weakness on statin:</div>
          {[
            'Hold statin for 2-4 weeks; assess if symptoms resolve',
            'Check CK level (>10× ULN = myositis; consider rhabdomyolysis)',
            'Trial alternative statin (rosuvastatin, pravastatin, fluvastatin) at lower dose',
            'Consider bempedoic acid + ezetimibe as statin-free regimen',
            'Q10 supplementation (limited evidence but commonly used)',
          ].map((step, i) => (
            <div key={i} className="flex gap-2 text-xs text-gray-600">
              <span className="font-bold" style={{ color: '#0d6e6e' }}>{i + 1}.</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hypertriglyceridemia */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Hypertriglyceridemia</h2>
        </div>
        <div className="p-4">
          <div className="mb-3">
            <label className="text-xs font-medium text-gray-600 block mb-1">Triglycerides (mg/dL)</label>
            <input
              type="number"
              value={tg}
              onChange={(e) => setTg(e.target.value)}
              placeholder="e.g. 250"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </div>
          {tgNum > 0 && (
            <div className={`rounded-lg p-3 mb-3 text-xs font-medium ${
              tgNum >= 1000 ? 'bg-red-50 text-red-700 border border-red-200' :
              tgNum >= 500 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
              tgNum >= 200 ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
              'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {tgNum >= 1000 ? 'Severely elevated — HIGH pancreatitis risk. Urgent treatment with fibrate + low-fat diet + alcohol cessation.' :
               tgNum >= 500 ? 'Very high — Pancreatitis risk. Start fibrate. Low-fat diet (<10% fat). Rule out secondary causes.' :
               tgNum >= 200 ? 'Elevated — Lifestyle first. Consider fibrate or icosapent ethyl if CVD risk.' :
               'Normal range (<200 mg/dL)'}
            </div>
          )}
          <div className="space-y-2">
            {[
              { drug: 'Lifestyle (first)', detail: 'Reduce refined carbs, alcohol, simple sugars; increase omega-3 foods; achieve glycemic control' },
              { drug: 'Fenofibrate / Gemfibrozil', detail: 'TG >500: first line for pancreatitis prevention. ↓TG 30-50%' },
              { drug: 'Icosapent ethyl (Vascepa) 4g/day', detail: 'TG 135-500 + statin + ASCVD risk: reduces CV events (REDUCE-IT). ↓TG ~20-30%' },
              { drug: 'Omega-3 fatty acids (fish oil)', detail: 'High doses (4g/day) ↓TG 20-30%; mixed CV evidence' },
            ].map(({ drug, detail }) => (
              <div key={drug} className="flex gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#0d6e6e' }} />
                <div>
                  <div className="text-sm font-medium text-gray-800">{drug}</div>
                  <div className="text-xs text-gray-500">{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
