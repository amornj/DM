'use client'

import { useState } from 'react'
import { CheckCircle, AlertTriangle, ChevronRight, ChevronLeft } from 'lucide-react'

type Step = 1 | 2 | 3 | 4 | 5

export default function ClassificationPage() {
  const [step, setStep] = useState<Step>(1)
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({})

  const updateAnswer = (key: string, value: string | boolean) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const StepIndicator = () => (
    <div className="flex items-center gap-1 mb-5">
      {[1, 2, 3, 4, 5].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              s === step ? 'text-white' : s < step ? 'text-white' : 'bg-gray-100 text-gray-400'
            }`}
            style={s === step ? { backgroundColor: '#0d6e6e' } : s < step ? { backgroundColor: '#0d6e6e', opacity: 0.6 } : {}}
          >
            {s < step ? '✓' : s}
          </div>
          {s < 5 && <div className={`w-6 h-0.5 ${s < step ? '' : 'bg-gray-200'}`} style={s < step ? { backgroundColor: '#0d6e6e', opacity: 0.4 } : {}} />}
        </div>
      ))}
      <div className="ml-2 text-xs text-gray-500">Step {step} of 5</div>
    </div>
  )

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Diabetes Classification</h1>
        <p className="text-sm text-gray-500 mt-0.5">Step-by-step diagnostic algorithm</p>
      </div>

      <StepIndicator />

      {/* Step 1: Confirm DM Diagnosis */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
            <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Step 1 — Confirm Diabetes Diagnosis</h2>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-600 mb-4">Diabetes requires ONE of the following criteria (confirmed on repeat, or two criteria on same day):</p>
            <div className="space-y-2 mb-4">
              {[
                { test: 'Fasting Plasma Glucose (FPG)', value: '≥126 mg/dL (7.0 mmol/L)', note: '8+ hr fast' },
                { test: 'OGTT 2-hour Glucose', value: '≥200 mg/dL (11.1 mmol/L)', note: '75g glucose load' },
                { test: 'A1C', value: '≥6.5%', note: 'Certified lab method' },
                { test: 'Random Glucose + Symptoms', value: '≥200 mg/dL', note: 'Polyuria, polydipsia, unexplained weight loss' },
              ].map(({ test, value, note }) => (
                <div key={test} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle size={16} style={{ color: '#0d6e6e' }} className="flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{test}</div>
                    <div className="text-sm font-bold" style={{ color: '#0d6e6e' }}>{value}</div>
                    <div className="text-xs text-gray-500">{note}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { updateAnswer('diagnosed', true); setStep(2) }}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: '#0d6e6e' }}
              >
                Yes — Diagnosis Confirmed
              </button>
              <button
                onClick={() => updateAnswer('diagnosed', false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                No — Not Confirmed
              </button>
            </div>
            {answers.diagnosed === false && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-700">If borderline, reassess in 3-6 months. Screen for prediabetes criteria. Rule out secondary causes of hyperglycemia (medications, stress, illness).</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: T2D Phenotype */}
      {step === 2 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
            <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Step 2 — T2D Phenotype Assessment</h2>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-600 mb-4">Classic T2D features (check all that apply):</p>
            <div className="space-y-2 mb-4">
              {[
                { key: 'obesity', label: 'BMI ≥25 (or ≥23 in Asian Americans)', detail: 'Insulin resistance marker' },
                { key: 'acanthosis', label: 'Acanthosis nigricans', detail: 'Dark velvety skin in skin folds' },
                { key: 'gdm', label: 'History of GDM', detail: 'Gestational diabetes increases T2D risk 7-10×' },
                { key: 'family', label: 'Family history of T2D', detail: 'First-degree relative with T2D' },
                { key: 'gradual', label: 'Gradual onset >35 years', detail: 'Typical T2D onset pattern' },
                { key: 'metabolic', label: 'Metabolic syndrome features', detail: 'HTN, dyslipidemia, elevated TG, low HDL' },
              ].map(({ key, label, detail }) => (
                <label key={key} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={!!answers[key]}
                    onChange={(e) => updateAnswer(key, e.target.checked)}
                    className="mt-0.5"
                    style={{ accentColor: '#0d6e6e' }}
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-800">{label}</div>
                    <div className="text-xs text-gray-500">{detail}</div>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors flex items-center justify-center gap-1"
                style={{ backgroundColor: '#0d6e6e' }}
              >
                Next — Check Red Flags <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Red Flags */}
      {step === 3 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#fff3cd' }}>
            <h2 className="font-semibold text-sm text-amber-800">Step 3 — Red Flags for Non-T2D</h2>
          </div>
          <div className="p-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex gap-2">
              <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700">These features suggest the patient may NOT have typical T2D. Further evaluation required.</p>
            </div>
            <div className="space-y-2 mb-4">
              {[
                { key: 'rapid', label: 'Rapid progression to insulin dependence', detail: 'Insulin required within 3 years of diagnosis' },
                { key: 'lean', label: 'Lean phenotype at diabetes onset', detail: 'BMI <25, no metabolic syndrome features' },
                { key: 'dka', label: 'Prone to DKA', detail: 'Especially on SGLT2 inhibitor (SGLT2i-DKA)' },
                { key: 'young', label: 'Age <35 at onset', detail: 'Consider T1D, MODY, or secondary DM' },
                { key: 'family_t1d', label: 'Family history of T1D or autoimmune disease', detail: 'Increases pre-test probability for T1D' },
              ].map(({ key, label, detail }) => (
                <label key={key} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors border border-amber-100">
                  <input
                    type="checkbox"
                    checked={!!answers[key]}
                    onChange={(e) => updateAnswer(key, e.target.checked)}
                    className="mt-0.5"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-800">{label}</div>
                    <div className="text-xs text-gray-500">{detail}</div>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors flex items-center justify-center gap-1"
                style={{ backgroundColor: '#0d6e6e' }}
              >
                Next — T1D Assessment <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: T1D Assessment */}
      {step === 4 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
            <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Step 4 — T1D Autoimmune Assessment</h2>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-600 mb-3">If red flags present, order autoimmune markers:</p>
            <div className="space-y-2 mb-4">
              {[
                { ab: 'GAD65 (anti-glutamic acid decarboxylase)', sensitivity: '~70-80% sensitive for T1D', key: 'gad' },
                { ab: 'IA-2 (anti-islet antigen-2)', sensitivity: '~60-70% sensitive for T1D', key: 'ia2' },
                { ab: 'ZnT8 (zinc transporter 8)', sensitivity: '~60-70% sensitive for T1D', key: 'znt8' },
                { ab: 'IAA (insulin autoantibodies)', sensitivity: 'More useful in children/young adults', key: 'iaa' },
              ].map(({ ab, sensitivity, key }) => (
                <div key={key} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="text-sm font-medium text-blue-800">{ab}</div>
                  <div className="text-xs text-blue-600">{sensitivity}</div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="text-sm font-semibold text-gray-800 mb-2">C-Peptide Interpretation</div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">C-Peptide &lt;200 pmol/L (age &lt;35)</span>
                  <span className="font-medium text-red-600">→ T1D likely</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">C-Peptide &lt;200 pmol/L (any age) + autoAb+</span>
                  <span className="font-medium text-red-600">→ T1D confirmed</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">C-Peptide &gt;600 pmol/L</span>
                  <span className="font-medium text-green-600">→ T2D or MODY</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(3)} className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors flex items-center justify-center gap-1"
                style={{ backgroundColor: '#0d6e6e' }}
              >
                Next — Other Types <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Other Types */}
      {step === 5 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
            <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Step 5 — Other Types of Diabetes</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {[
                {
                  type: 'MODY (Monogenic Diabetes)',
                  features: 'Strong family history (autosomal dominant), young lean onset, responsive to low-dose SU',
                  tests: 'Genetic testing: HNF1A, HNF4A, GCK mutations',
                  color: '#7c3aed',
                },
                {
                  type: 'Cushing Syndrome',
                  features: 'Moon face, buffalo hump, striae, HTN, osteoporosis, proximal weakness',
                  tests: '24-hr UFC, 1mg overnight DST, midnight salivary cortisol',
                  color: '#0891b2',
                },
                {
                  type: 'Acromegaly',
                  features: 'Enlarged hands/feet, coarsened facial features, headaches, visual changes',
                  tests: 'IGF-1 level, oral glucose suppression test for GH',
                  color: '#0891b2',
                },
                {
                  type: 'Pancreatic DM (Type 3c)',
                  features: 'History of pancreatitis, pancreatic surgery, cystic fibrosis, hemochromatosis',
                  tests: 'Fecal elastase, CT pancreas, serum ferritin',
                  color: '#d97706',
                },
                {
                  type: 'Medication-Induced',
                  features: 'Steroids, antipsychotics (olanzapine, clozapine), tacrolimus, statins',
                  tests: 'Review medication history; hyperglycemia usually resolves with drug discontinuation',
                  color: '#dc2626',
                },
                {
                  type: 'CIADM (Check-point inhibitor-associated DM)',
                  features: 'DM onset after immunotherapy (anti-PD-1/PD-L1). Often presents with DKA.',
                  tests: 'C-peptide (low), autoantibodies may be negative, GAD may be positive',
                  color: '#dc2626',
                },
              ].map(({ type, features, tests, color }) => (
                <div key={type} className="rounded-lg border border-gray-200 p-3">
                  <div className="text-sm font-semibold mb-1" style={{ color }}>{type}</div>
                  <div className="text-xs text-gray-600 mb-1.5">{features}</div>
                  <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">Workup: {tests}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-4 w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: '#0d6e6e' }}
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
