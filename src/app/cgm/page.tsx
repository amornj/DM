'use client'

import { useState } from 'react'
import { CheckCircle, AlertTriangle, Info, Activity } from 'lucide-react'

export default function CGMPage() {
  const [tir, setTir] = useState('')
  const [tbr70, setTbr70] = useState('')
  const [tbr54, setTbr54] = useState('')
  const [tar180, setTar180] = useState('')
  const [tar250, setTar250] = useState('')
  const [cv, setCv] = useState('')
  const [gmi, setGmi] = useState('')

  const tirNum = parseFloat(tir)
  const tbr70Num = parseFloat(tbr70)
  const tbr54Num = parseFloat(tbr54)
  const tar180Num = parseFloat(tar180)
  const tar250Num = parseFloat(tar250)
  const cvNum = parseFloat(cv)
  const gmiNum = parseFloat(gmi)

  const tirOk = !isNaN(tirNum) && tirNum >= 70
  const tbr70Ok = !isNaN(tbr70Num) && tbr70Num < 4
  const tbr54Ok = !isNaN(tbr54Num) && tbr54Num < 1
  const tar180Ok = !isNaN(tar180Num) && tar180Num < 25
  const tar250Ok = !isNaN(tar250Num) && tar250Num < 5
  const cvOk = !isNaN(cvNum) && cvNum < 33

  const hasInput = tir || tbr70 || tbr54 || tar180 || tar250 || cv

  const total = tirNum + tbr70Num + tar180Num
  const estimatedA1c = gmiNum ? (gmiNum * 0.9148 + 0.2988).toFixed(1) : null

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">CGM Guide</h1>
        <p className="text-sm text-gray-500 mt-0.5">AACE 2026 — Continuous Glucose Monitoring Targets</p>
      </div>

      {/* Who Should Use CGM */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Who Should Use CGM</h2>
        </div>
        <div className="p-4 space-y-2">
          {[
            { label: 'All patients on insulin (T1D or T2D)', note: 'Basal-bolus or multiple daily injections' },
            { label: 'Hypoglycemia unawareness', note: 'Impaired hypoglycemia symptom recognition' },
            { label: 'Recurrent hypoglycemia (≥2 episodes/week)', note: 'Especially level 2 (<54 mg/dL) or level 3 (severe)' },
            { label: 'Suboptimal glycemic control on intensive regimen', note: 'A1C above individualized target despite therapy' },
            { label: 'T2D on basal insulin with uncontrolled A1C', note: 'Guides basal titration and mealtime patterns' },
            { label: 'Pregnancy with T1D or T2D', note: 'CGM reduces hypoglycemia and improves TIR' },
          ].map(({ label, note }) => (
            <div key={label} className="flex items-start gap-2">
              <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#0d6e6e' }} />
              <div>
                <span className="text-sm font-medium text-gray-800">{label}</span>
                <span className="text-xs text-gray-500 ml-1">— {note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ambulatory Glucose Profile Targets */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>Ambulatory Glucose Profile (AGP) Targets</h2>
        </div>
        <div className="p-4 space-y-3">
          {/* TIR */}
          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-green-800">Time In Range (TIR)</span>
              <span className="text-sm font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Target: &gt;70%</span>
            </div>
            <div className="text-sm text-green-700 font-medium">70 – 180 mg/dL</div>
            <div className="text-xs text-green-600 mt-1">Each 5% increase in TIR ≈ 0.5% decrease in estimated A1C. Pregnancy target: &gt;70% (63–140 mg/dL range).</div>
          </div>

          {/* TBR */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-amber-800">Time Below Range (TBR)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-amber-100 rounded p-2">
                <div className="text-xs font-semibold text-amber-700">Level 1 (&lt;70 mg/dL)</div>
                <div className="text-sm font-bold text-amber-800 mt-0.5">Target: &lt;4%</div>
                <div className="text-xs text-amber-600 mt-0.5">&lt;1% for fragile elderly</div>
              </div>
              <div className="bg-red-100 rounded p-2">
                <div className="text-xs font-semibold text-red-700">Level 2 (&lt;54 mg/dL)</div>
                <div className="text-sm font-bold text-red-800 mt-0.5">Target: &lt;1%</div>
                <div className="text-xs text-red-600 mt-0.5">Clinically significant hypoglycemia</div>
              </div>
            </div>
          </div>

          {/* TAR */}
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-orange-800">Time Above Range (TAR)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-orange-100 rounded p-2">
                <div className="text-xs font-semibold text-orange-700">Level 1 (&gt;180 mg/dL)</div>
                <div className="text-sm font-bold text-orange-800 mt-0.5">Target: &lt;25%</div>
                <div className="text-xs text-orange-600 mt-0.5">Hyperglycemia exposure limit</div>
              </div>
              <div className="bg-red-100 rounded p-2">
                <div className="text-xs font-semibold text-red-700">Level 2 (&gt;250 mg/dL)</div>
                <div className="text-sm font-bold text-red-800 mt-0.5">Target: &lt;5%</div>
                <div className="text-xs text-red-600 mt-0.5">Severe hyperglycemia</div>
              </div>
            </div>
          </div>

          {/* GV */}
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-purple-800">Glycemic Variability (GV)</span>
              <span className="text-sm font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">CV &lt;33%</span>
            </div>
            <div className="text-sm text-purple-700">Coefficient of Variation (CV) — for insulin users</div>
            <div className="text-xs text-purple-600 mt-1">CV &lt;33% indicates stable glycemic control. High CV (≥36%) associated with increased hypoglycemia risk and cardiovascular events even with similar A1C/GMI.</div>
          </div>
        </div>
      </div>

      {/* AGP Quick Checker */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>AGP Target Checker</h2>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">TIR % (70-180)</label>
              <input
                type="number"
                value={tir}
                onChange={e => setTir(e.target.value)}
                placeholder="e.g. 68"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6e6e]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">CV %</label>
              <input
                type="number"
                value={cv}
                onChange={e => setCv(e.target.value)}
                placeholder="e.g. 35"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6e6e]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">TBR % (&lt;70 mg/dL)</label>
              <input
                type="number"
                value={tbr70}
                onChange={e => setTbr70(e.target.value)}
                placeholder="e.g. 5"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6e6e]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">TBR % (&lt;54 mg/dL)</label>
              <input
                type="number"
                value={tbr54}
                onChange={e => setTbr54(e.target.value)}
                placeholder="e.g. 1.5"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6e6e]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">TAR % (&gt;180 mg/dL)</label>
              <input
                type="number"
                value={tar180}
                onChange={e => setTar180(e.target.value)}
                placeholder="e.g. 28"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6e6e]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">TAR % (&gt;250 mg/dL)</label>
              <input
                type="number"
                value={tar250}
                onChange={e => setTar250(e.target.value)}
                placeholder="e.g. 6"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6e6e]/30"
              />
            </div>
          </div>

          {hasInput && (
            <div className="space-y-2 mt-2">
              {tir && (
                <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${tirOk ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {tirOk ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
                  <span><b>TIR {tirNum}%</b> — {tirOk ? 'At target (≥70%)' : `Below target — need +${(70 - tirNum).toFixed(0)}% more`}</span>
                </div>
              )}
              {cv && (
                <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${cvOk ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
                  {cvOk ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
                  <span><b>CV {cvNum}%</b> — {cvOk ? 'Stable glycemic variability' : 'High variability — adjust regimen to reduce GV'}</span>
                </div>
              )}
              {tbr70 && (
                <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${tbr70Ok ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
                  {tbr70Ok ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
                  <span><b>TBR L1 {tbr70Num}%</b> — {tbr70Ok ? 'At target (<4%)' : 'Above target — reduce insulin doses, review timing'}</span>
                </div>
              )}
              {tbr54 && (
                <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${tbr54Ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {tbr54Ok ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
                  <span><b>TBR L2 {tbr54Num}%</b> — {tbr54Ok ? 'At target (<1%)' : 'Clinically significant hypoglycemia — urgent dose reduction'}</span>
                </div>
              )}
              {tar180 && (
                <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${tar180Ok ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
                  {tar180Ok ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
                  <span><b>TAR L1 {tar180Num}%</b> — {tar180Ok ? 'At target (<25%)' : `Above target — intensify therapy`}</span>
                </div>
              )}
              {tar250 && (
                <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${tar250Ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {tar250Ok ? <CheckCircle size={15} /> : <AlertTriangle size={15} />}
                  <span><b>TAR L2 {tar250Num}%</b> — {tar250Ok ? 'At target (<5%)' : 'Severe hyperglycemia — review bolus insulin and carb ratios'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* GMI vs A1C */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>GMI vs A1C Interpretation</h2>
        </div>
        <div className="p-4 space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-sm font-semibold text-blue-800 mb-1">Glucose Management Indicator (GMI)</div>
            <div className="text-xs text-blue-700 mb-2">
              GMI = 3.31 + (0.02392 × mean glucose in mg/dL)<br />
              Approximates A1C from CGM mean glucose over ~14 days.
            </div>
            <div className="text-xs text-blue-600 font-medium">Formula: A1C ≈ GMI × 0.9148 + 0.2988</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-3">
              <AlertTriangle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-700">
                <span className="font-semibold">GMI ≠ Lab A1C</span> — Discordance is common. Lab A1C reflects 90-day RBC glycation while GMI reflects recent 14-day CGM data. Anemia, hemoglobinopathies, or rapid glucose changes cause divergence.
              </div>
            </div>
            <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
              <Info size={15} className="text-gray-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-gray-600">
                <span className="font-semibold">When A1C is unreliable</span> — Use GMI as primary glycemic marker in: hemolytic anemia, iron-deficiency anemia, hemoglobin variants (HbS, HbC), post-transfusion, hemodialysis patients.
              </div>
            </div>
            <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
              <Info size={15} className="text-gray-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-gray-600">
                <span className="font-semibold">TIR-A1C correlation</span> — TIR 70% ≈ A1C 7.0%. Every 10% increase in TIR ≈ 0.8% A1C reduction. Use TIR alongside GMI for comprehensive assessment.
              </div>
            </div>
          </div>

          {/* GMI converter */}
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-700 mb-2">GMI → Estimated Lab A1C Converter</div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                step="0.1"
                value={gmi}
                onChange={e => setGmi(e.target.value)}
                placeholder="Enter GMI %"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6e6e]/30"
              />
              {estimatedA1c && (
                <div className="bg-[#e6f4f4] rounded-lg px-3 py-2 text-sm font-bold" style={{ color: '#0d6e6e' }}>
                  ≈ {estimatedA1c}%
                </div>
              )}
            </div>
            {gmiNum > 0 && estimatedA1c && (
              <div className="text-xs text-gray-500 mt-1.5">
                GMI {gmiNum}% → estimated lab A1C ≈ {estimatedA1c}%
                {Math.abs(gmiNum - parseFloat(estimatedA1c)) > 0.4 && (
                  <span className="text-amber-600 ml-1">(notable discordance — check for RBC/hemoglobin issues)</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CGM Metrics Reference */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100" style={{ backgroundColor: '#e6f4f4' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#0d6e6e' }}>CGM Metrics Quick Reference</h2>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-3 font-semibold text-gray-600">Metric</th>
                  <th className="text-left py-2 pr-3 font-semibold text-gray-600">Range</th>
                  <th className="text-left py-2 font-semibold text-gray-600">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { metric: 'TIR (In Range)', range: '70–180 mg/dL', target: '>70%', ok: true },
                  { metric: 'TBR Level 1', range: '<70 mg/dL', target: '<4%', ok: false },
                  { metric: 'TBR Level 2 (Severe)', range: '<54 mg/dL', target: '<1%', ok: false },
                  { metric: 'TAR Level 1', range: '>180 mg/dL', target: '<25%', ok: false },
                  { metric: 'TAR Level 2 (Severe)', range: '>250 mg/dL', target: '<5%', ok: false },
                  { metric: 'CV (Variability)', range: 'Std Dev / Mean', target: '<33%', ok: true },
                  { metric: 'Sensor Wear Time', range: '—', target: '>70% / 14 days', ok: true },
                ].map(({ metric, range, target, ok }) => (
                  <tr key={metric}>
                    <td className="py-2 pr-3 text-gray-700 font-medium">{metric}</td>
                    <td className="py-2 pr-3 text-gray-500">{range}</td>
                    <td className={`py-2 font-bold ${ok ? 'text-green-700' : 'text-amber-700'}`}>{target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Practical Tips */}
      <div className="bg-[#e6f4f4] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Activity size={16} style={{ color: '#0d6e6e' }} />
          <span className="text-sm font-semibold" style={{ color: '#0d6e6e' }}>Optimizing CGM in Practice</span>
        </div>
        <div className="space-y-1.5 text-xs text-gray-700">
          <div>• Review AGP report at every visit — address highest-priority metric first (TBR L2 &gt; TBR L1 &gt; CV &gt; TIR &gt; TAR)</div>
          <div>• Prioritize eliminating hypoglycemia before targeting hyperglycemia</div>
          <div>• Minimum 14 days of CGM data with &gt;70% sensor wear for valid AGP analysis</div>
          <div>• Pattern management: identify recurring hypoglycemia at specific times before adjusting total insulin dose</div>
          <div>• SGLT2i + CGM: educate patients about euglycemic DKA — glucose may appear normal while ketones are elevated</div>
        </div>
      </div>
    </div>
  )
}
