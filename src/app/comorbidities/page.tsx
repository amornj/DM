'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'

interface Recommendation {
  drug: string
  evidence: string
  notes: string
  priority: 'mandatory' | 'preferred' | 'consider'
}

export default function ComorbiditiesPage() {
  const [hasHF, setHasHF] = useState(false)
  const [hfType, setHfType] = useState<'HFrEF' | 'HFpEF' | ''>('')
  const [hasCKD, setHasCKD] = useState(false)
  const [egfr, setEgfr] = useState('')
  const [uacr, setUacr] = useState('')
  const [hasASCVD, setHasASCVD] = useState(false)
  const [hasStrokeTIA, setHasStrokeTIA] = useState(false)
  const [hasMASLD, setHasMASLD] = useState(false)
  const [a1c, setA1c] = useState('')

  const egfrNum = parseFloat(egfr)
  const uacrNum = parseFloat(uacr)
  const a1cNum = parseFloat(a1c)

  const recommendations: Recommendation[] = []

  // HF logic
  if (hasHF) {
    recommendations.push({
      drug: 'Empagliflozin 10mg or Dapagliflozin 10mg',
      evidence: `EMPEROR-${hfType === 'HFrEF' ? 'Reduced' : 'Preserved'}, DAPA-HF`,
      notes: `SGLT2i is first-line for ${hfType || 'HF'} — reduces HF hospitalization and CV death. Avoid if eGFR <20.`,
      priority: 'mandatory',
    })
    if (hfType === 'HFrEF') {
      recommendations.push({
        drug: 'ARNI (sacubitril/valsartan) + Beta-blocker + MRA',
        evidence: 'PARADIGM-HF, EMPHASIS-HF',
        notes: 'Part of quadruple therapy for HFrEF. Avoid ACEi within 36h of ARNI.',
        priority: 'mandatory',
      })
    }
  }

  // CKD logic
  if (hasCKD) {
    if (egfrNum >= 20) {
      recommendations.push({
        drug: 'Empagliflozin or Dapagliflozin',
        evidence: 'EMPA-KIDNEY, DAPA-CKD',
        notes: `SGLT2i first for renal protection. eGFR ≥20 for initiating. Can continue down to eGFR ≥15 for cardiac benefit.`,
        priority: 'mandatory',
      })
    }
    if (uacrNum >= 200 && egfrNum >= 25) {
      recommendations.push({
        drug: 'Finerenone 10-20mg',
        evidence: 'FIDELIO-DKD, FIGARO-DKD',
        notes: 'Non-steroidal MRA. Add if UACR ≥200 mg/g + eGFR ≥25. Check K+ — risk of hyperkalemia.',
        priority: 'preferred',
      })
    }
    recommendations.push({
      drug: 'GLP-1 RA (semaglutide or liraglutide)',
      evidence: 'FLOW trial (semaglutide)',
      notes: 'Add GLP-1 RA for additional cardiorenal protection. Semaglutide preferred (FLOW trial data).',
      priority: 'preferred',
    })
    if (egfrNum < 30) {
      recommendations.push({
        drug: 'CAUTION: Metformin — hold if eGFR <30',
        evidence: 'Safety data',
        notes: 'Risk of lactic acidosis. If already on metformin, discontinue or reduce dose at eGFR <30.',
        priority: 'consider',
      })
    }
  }

  // ASCVD logic
  if (hasASCVD) {
    recommendations.push({
      drug: 'GLP-1 RA: Semaglutide, Liraglutide, or Dulaglutide',
      evidence: 'SUSTAIN-6 (sema), LEADER (lira), REWIND (dula)',
      notes: 'GLP-1 RA reduces MACE (CV death, MI, stroke) in established ASCVD. Semaglutide preferred for magnitude of benefit.',
      priority: 'mandatory',
    })
    recommendations.push({
      drug: 'SGLT2i (empagliflozin or canagliflozin)',
      evidence: 'EMPA-REG OUTCOME, CANVAS',
      notes: 'Dual therapy SGLT2i + GLP-1 RA for patients with ASCVD. Synergistic CV and renal benefits.',
      priority: 'preferred',
    })
  }

  // Stroke/TIA
  if (hasStrokeTIA) {
    recommendations.push({
      drug: 'GLP-1 RA: Dulaglutide or Semaglutide',
      evidence: 'REWIND (dulaglutide), SUSTAIN-6 (semaglutide)',
      notes: 'Dulaglutide specifically showed stroke risk reduction in REWIND. Semaglutide also has stroke reduction data (SELECT).',
      priority: 'preferred',
    })
  }

  // MASLD
  if (hasMASLD) {
    recommendations.push({
      drug: 'Semaglutide 2.4mg (Wegovy)',
      evidence: 'NASH resolution trials, SELECT trial',
      notes: 'GLP-1 RA shows MASH resolution benefit. MASH = metabolic associated steatohepatitis.',
      priority: 'preferred',
    })
    recommendations.push({
      drug: 'Tirzepatide (Mounjaro/Zepbound)',
      evidence: 'SYNERGY-NASH trial',
      notes: 'GIP/GLP-1 dual agonist. Strong MASH resolution and fibrosis improvement data.',
      priority: 'preferred',
    })
    recommendations.push({
      drug: 'Pioglitazone 15-45mg',
      evidence: 'PIVENS trial, NASH CRN',
      notes: 'TZD reduces hepatic steatosis and inflammation. Use with caution in HF, bladder cancer history.',
      priority: 'consider',
    })
    recommendations.push({
      drug: 'Resmetirom (Rezdiffra)',
      evidence: 'MAESTRO-NASH trial',
      notes: 'First FDA-approved drug for MASH with fibrosis. THR-beta agonist. 80-100mg daily.',
      priority: 'consider',
    })
  }

  // High A1C
  if (a1cNum > 9) {
    recommendations.push({
      drug: 'Start ≥2 glucose-lowering agents simultaneously',
      evidence: 'AACE 2026 Algorithm',
      notes: `A1C >9% — initiate combination therapy immediately. Consider adding basal insulin if A1C >10% or symptomatic.`,
      priority: 'mandatory',
    })
  }

  const priorityColors = {
    mandatory: { bg: '#fef2f2', border: '#dc2626', text: '#dc2626', badge: 'bg-red-100 text-red-700' },
    preferred: { bg: '#e6f4f4', border: '#0d6e6e', text: '#0d6e6e', badge: 'bg-teal-100 text-teal-700' },
    consider: { bg: '#fffbeb', border: '#d97706', text: '#d97706', badge: 'bg-amber-100 text-amber-700' },
  }

  const anySelected = hasHF || hasCKD || hasASCVD || hasStrokeTIA || hasMASLD

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Comorbidities-Centric Approach</h1>
        <p className="text-sm text-gray-500 mt-0.5">Select comorbidities to get personalized drug recommendations</p>
      </div>

      {/* Patient Inputs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h2 className="font-semibold text-sm text-gray-800 mb-3">Patient Profile</h2>
        <div className="space-y-4">
          {/* A1C */}
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Current A1C (%)</label>
            <input
              type="number"
              step="0.1"
              value={a1c}
              onChange={(e) => setA1c(e.target.value)}
              placeholder="e.g. 8.5"
              className="w-36 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
            {a1cNum > 9 && (
              <span className="ml-2 text-xs text-red-600 font-medium">Start ≥2 therapies simultaneously</span>
            )}
          </div>

          {/* Heart Failure */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={hasHF} onChange={(e) => setHasHF(e.target.checked)} style={{ accentColor: '#0d6e6e' }} />
              <span className="text-sm font-medium text-gray-800">Heart Failure</span>
            </label>
            {hasHF && (
              <div className="ml-6 flex gap-2">
                {(['HFrEF', 'HFpEF'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setHfType(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      hfType === type ? 'text-white border-transparent' : 'text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                    style={hfType === type ? { backgroundColor: '#0d6e6e' } : {}}
                  >
                    {type === 'HFrEF' ? 'HFrEF (EF <40%)' : 'HFpEF (EF ≥50%)'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CKD */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={hasCKD} onChange={(e) => setHasCKD(e.target.checked)} style={{ accentColor: '#0d6e6e' }} />
              <span className="text-sm font-medium text-gray-800">Chronic Kidney Disease (CKD)</span>
            </label>
            {hasCKD && (
              <div className="ml-6 grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">eGFR (mL/min/1.73m²)</label>
                  <input
                    type="number"
                    value={egfr}
                    onChange={(e) => setEgfr(e.target.value)}
                    placeholder="e.g. 45"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">UACR (mg/g)</label>
                  <input
                    type="number"
                    value={uacr}
                    onChange={(e) => setUacr(e.target.value)}
                    placeholder="e.g. 300"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Other comorbidities */}
          {[
            { key: 'ascvd', label: 'Established ASCVD (prior MI, angina, coronary revascularization, ABI <0.9)', state: hasASCVD, setState: setHasASCVD },
            { key: 'stroke', label: 'Prior Stroke or TIA', state: hasStrokeTIA, setState: setHasStrokeTIA },
            { key: 'masld', label: 'MASLD / MASH (metabolic-associated steatotic liver disease)', state: hasMASLD, setState: setHasMASLD },
          ].map(({ key, label, state, setState }) => (
            <label key={key} className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={state}
                onChange={(e) => setState(e.target.checked)}
                style={{ accentColor: '#0d6e6e' }}
                className="mt-0.5"
              />
              <span className="text-sm text-gray-800">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {!anySelected && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
          <Info size={24} className="text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Select one or more comorbidities above to see evidence-based drug recommendations.</p>
        </div>
      )}

      {anySelected && recommendations.length === 0 && (
        <div className="bg-green-50 rounded-xl border border-green-200 p-4 flex gap-3">
          <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-700">Comorbidities selected. Provide additional details (eGFR, UACR, A1C) for specific recommendations.</p>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-800">Drug Recommendations</h2>
          {recommendations.map((rec, idx) => {
            const colors = priorityColors[rec.priority]
            return (
              <div
                key={idx}
                className="rounded-xl border-2 p-4"
                style={{ backgroundColor: colors.bg, borderColor: colors.border }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-sm font-bold" style={{ color: colors.text }}>{rec.drug}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${colors.badge}`}>
                    {rec.priority === 'mandatory' ? 'Mandatory' : rec.priority === 'preferred' ? 'Preferred' : 'Consider'}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mb-1">{rec.notes}</div>
                <div className="text-xs font-medium" style={{ color: colors.text }}>Evidence: {rec.evidence}</div>
              </div>
            )
          })}
        </div>
      )}

      {/* Key Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-700">
          <span className="font-semibold">Key principle:</span> When comorbidities are present (HF, CKD, ASCVD), select agents with proven cardiovascular and renal outcome benefits FIRST, independent of A1C-lowering effect. Add metformin and other agents as needed for glycemic control.
        </div>
      </div>
    </div>
  )
}
