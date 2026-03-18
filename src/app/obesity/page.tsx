'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle } from 'lucide-react'

const weightMeds = [
  {
    name: 'Tirzepatide (Zepbound)',
    class: 'GIP/GLP-1 RA',
    weightLoss: '~20-22%',
    avgKg: '-20 to -25 kg',
    mechanism: 'Dual GIP and GLP-1 receptor agonist',
    dosing: 'Start 2.5mg/wk × 4wks → 5mg/wk → up to 15mg/wk SC',
    sideEffects: 'Nausea, vomiting, diarrhea, constipation',
    contraindications: 'MEN2, medullary thyroid cancer, personal/family history',
    bmiThreshold: 'BMI ≥30, or ≥27 with weight-related comorbidity',
    t2dBenefit: 'Also lowers A1C 2-2.5% — dual purpose for T2D',
    color: '#9333ea',
    trials: 'SURMOUNT-1, SURMOUNT-2',
  },
  {
    name: 'Semaglutide 2.4mg (Wegovy)',
    class: 'GLP-1 RA',
    weightLoss: '~15%',
    avgKg: '-15 to -17 kg',
    mechanism: 'GLP-1 receptor agonist at higher dose than T2D formulation',
    dosing: 'Start 0.25mg/wk → titrate to 2.4mg/wk over 16-20 weeks SC',
    sideEffects: 'Nausea, vomiting, constipation, gallbladder events',
    contraindications: 'MEN2, medullary thyroid cancer',
    bmiThreshold: 'BMI ≥30, or ≥27 with comorbidity',
    t2dBenefit: 'A1C ↓ 1.5-2%, SELECT trial: CV event reduction even without T2D',
    color: '#7c3aed',
    trials: 'STEP 1-4, SELECT',
  },
  {
    name: 'Liraglutide 3mg (Saxenda)',
    class: 'GLP-1 RA',
    weightLoss: '~6-8%',
    avgKg: '-6 to -8 kg',
    mechanism: 'GLP-1 receptor agonist (daily injection)',
    dosing: 'Start 0.6mg/day → increase weekly to 3mg/day SC',
    sideEffects: 'Nausea, vomiting, diarrhea, headache',
    contraindications: 'MEN2, medullary thyroid cancer, pancreatitis history',
    bmiThreshold: 'BMI ≥30, or ≥27 with comorbidity',
    t2dBenefit: 'Lower A1C by ~1%, LEADER trial CV data',
    color: '#0d6e6e',
    trials: 'SCALE',
  },
  {
    name: 'Phentermine/Topiramate ER (Qsymia)',
    class: 'Sympathomimetic + Anti-seizure',
    weightLoss: '~8-10%',
    avgKg: '-8 to -10 kg',
    mechanism: 'Norepinephrine release + appetite suppression via glutamate inhibition',
    dosing: '3.75mg/23mg × 2wks → 7.5mg/46mg. Max 15mg/92mg/day oral',
    sideEffects: 'Paresthesias, dry mouth, constipation, cognitive effects, teratogenic',
    contraindications: 'Pregnancy, glaucoma, hyperthyroidism, MAOi use',
    bmiThreshold: 'BMI ≥30, or ≥27 with comorbidity',
    t2dBenefit: 'Modest A1C reduction, reduces progression to T2D',
    color: '#d97706',
    trials: 'EQUIP, CONQUER',
  },
  {
    name: 'Naltrexone/Bupropion ER (Contrave)',
    class: 'Opioid antagonist + Antidepressant',
    weightLoss: '~5-6%',
    avgKg: '-5 to -6 kg',
    mechanism: 'Hypothalamic appetite control and reward pathways',
    dosing: '8mg/90mg → titrate over 4 weeks to 32mg/360mg/day oral (divided BID)',
    sideEffects: 'Nausea, headache, insomnia, constipation, increased BP',
    contraindications: 'Seizure disorders, eating disorders, MAOi, uncontrolled HTN',
    bmiThreshold: 'BMI ≥30, or ≥27 with comorbidity',
    t2dBenefit: 'Modest A1C reduction. No significant CV outcome trial data.',
    color: '#2563eb',
    trials: 'COR-I, COR-II',
  },
  {
    name: 'Orlistat (Xenical/Alli)',
    class: 'Lipase Inhibitor',
    weightLoss: '~3%',
    avgKg: '-2 to -3 kg',
    mechanism: 'Inhibits intestinal lipase, reduces fat absorption by ~30%',
    dosing: '120mg TID with fat-containing meals (OTC: 60mg TID)',
    sideEffects: 'Fecal urgency/incontinence, oily discharge, fat-soluble vitamin deficiency',
    contraindications: 'Malabsorption, cholestasis',
    bmiThreshold: 'BMI ≥30, or ≥27 with comorbidity',
    t2dBenefit: 'Modest glucose benefit. Best combined with low-fat diet.',
    color: '#6b7280',
    trials: 'XENDOS',
  },
]

export default function ObesityPage() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [selected, setSelected] = useState<typeof weightMeds[0] | null>(null)

  const weightNum = parseFloat(weight)
  const heightNum = parseFloat(height)
  const bmi = weightNum && heightNum ? weightNum / ((heightNum / 100) ** 2) : null
  const bmiStr = bmi ? bmi.toFixed(1) : null

  const bariatricEligible = bmi && (bmi >= 40 || (bmi >= 35))
  const pharmacoEligible = bmi && bmi >= 27

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Obesity Pharmacotherapy</h1>
        <p className="text-sm text-gray-500 mt-0.5">Weight management in T2D — AACE 2026</p>
      </div>

      {/* BMI Calculator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h2 className="font-semibold text-sm text-gray-800 mb-3">BMI Assessment</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 95"
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

        {bmiStr && (
          <div className="space-y-2">
            <div className="rounded-xl p-4 text-white" style={{ background: 'linear-gradient(135deg, #0d6e6e, #0a5555)' }}>
              <div className="text-white/80 text-sm mb-1">BMI</div>
              <div className="text-3xl font-bold">{bmiStr} kg/m²</div>
              <div className="text-white/80 text-sm mt-1">
                {bmi! >= 40 ? 'Class III Obesity (Severe)' :
                 bmi! >= 35 ? 'Class II Obesity' :
                 bmi! >= 30 ? 'Class I Obesity' :
                 bmi! >= 25 ? 'Overweight' :
                 'Normal Weight'}
              </div>
            </div>

            {pharmacoEligible ? (
              <div className="rounded-lg p-3 bg-green-50 border border-green-200 flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-green-700">Eligible for weight loss pharmacotherapy</div>
                  <div className="text-xs text-green-600">BMI ≥27 with comorbidity (T2D, HTN, dyslipidemia) or BMI ≥30</div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg p-3 bg-amber-50 border border-amber-200 flex items-start gap-2">
                <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-amber-700">BMI below threshold for pharmacotherapy. Focus on intensive lifestyle intervention.</div>
              </div>
            )}

            {bariatricEligible && (
              <div className="rounded-lg p-3 bg-purple-50 border border-purple-200">
                <div className="text-sm font-semibold text-purple-800 mb-1">Bariatric Surgery Eligibility</div>
                <div className="text-xs text-purple-700">
                  {bmi! >= 40
                    ? 'BMI ≥40 — bariatric surgery indicated regardless of comorbidities'
                    : 'BMI 35-39.9 with T2D — bariatric surgery strongly recommended'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Weight Loss Medications Table */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-gray-800">FDA-Approved Weight Loss Medications</h2>
        {weightMeds.map((med) => (
          <div
            key={med.name}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelected(selected?.name === med.name ? null : med)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-bold text-gray-800">{med.name}</div>
                  <div className="text-xs text-gray-500">{med.class}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold" style={{ color: med.color }}>{med.weightLoss}</div>
                  <div className="text-xs text-gray-500">{med.avgKg}</div>
                </div>
              </div>

              <div className="text-xs text-gray-600 mb-2">{med.mechanism}</div>

              <div className="flex flex-wrap gap-1">
                <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: med.color }}>
                  {med.weightLoss} avg loss
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {med.bmiThreshold}
                </span>
              </div>

              {selected?.name === med.name && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">Dosing & Titration</div>
                    <div className="text-xs text-gray-700">{med.dosing}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">Side Effects</div>
                    <div className="text-xs text-gray-700">{med.sideEffects}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-red-600 mb-1">Contraindications</div>
                    <div className="text-xs text-red-700">{med.contraindications}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">T2D Benefit</div>
                    <div className="text-xs text-gray-700">{med.t2dBenefit}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">Key Trials</div>
                    <div className="text-xs text-gray-700">{med.trials}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bariatric Surgery */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Bariatric/Metabolic Surgery Criteria</h2>
        </div>
        <div className="p-4 space-y-3">
          {[
            {
              criteria: 'BMI ≥40 kg/m²',
              rec: 'Strongly recommended regardless of comorbidities',
              color: '#dc2626',
            },
            {
              criteria: 'BMI 35-39.9 kg/m² + T2D',
              rec: 'Strongly recommended — T2D remission rates 50-80% with RYGB/SG',
              color: '#ea580c',
            },
            {
              criteria: 'BMI 30-34.9 kg/m² + T2D inadequately controlled',
              rec: 'Consider metabolic surgery (growing evidence, especially for T2D remission)',
              color: '#d97706',
            },
          ].map(({ criteria, rec, color }) => (
            <div key={criteria} className="rounded-lg p-3 border border-gray-200">
              <div className="text-sm font-semibold mb-1" style={{ color }}>{criteria}</div>
              <div className="text-xs text-gray-600">{rec}</div>
            </div>
          ))}

          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
            <div className="text-sm font-semibold text-blue-800 mb-2">Procedure Outcomes for T2D</div>
            <div className="space-y-1 text-xs text-blue-700">
              <div className="flex justify-between"><span>Roux-en-Y Gastric Bypass (RYGB)</span><span className="font-semibold">T2D remission ~60-80%</span></div>
              <div className="flex justify-between"><span>Sleeve Gastrectomy (SG)</span><span className="font-semibold">T2D remission ~50-70%</span></div>
              <div className="flex justify-between"><span>Adjustable Gastric Band</span><span className="font-semibold">T2D remission ~40-50%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
