'use client'

import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import { t2dMedications } from '@/data/medications'

const drugClasses = ['All', 'Biguanide', 'SGLT2i', 'GLP-1 RA', 'GIP/GLP-1 RA', 'DPP-4i', 'TZD', 'SU', 'Basal Insulin', 'Bolus Insulin', 'Non-steroidal MRA', 'THR-beta Agonist']
const weightOptions = ['All', 'Loss', 'Neutral', 'Gain']
const cvOptions = ['All', 'CV Benefit', 'Neutral']

export default function MedicationsPage() {
  const [search, setSearch] = useState('')
  const [classFilter, setClassFilter] = useState('All')
  const [weightFilter, setWeightFilter] = useState('All')
  const [cvFilter, setCvFilter] = useState('All')
  const [selectedDrug, setSelectedDrug] = useState<typeof t2dMedications[0] | null>(null)

  const filtered = useMemo(() => {
    return t2dMedications.filter((d) => {
      const matchSearch = !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.class.toLowerCase().includes(search.toLowerCase()) ||
        (d.brand?.toLowerCase().includes(search.toLowerCase()))

      const matchClass = classFilter === 'All' || d.class === classFilter

      const matchWeight = weightFilter === 'All' ||
        (weightFilter === 'Loss' && (d.weightEffect.toLowerCase().includes('-') || d.weightEffect.toLowerCase().includes('loss'))) ||
        (weightFilter === 'Neutral' && d.weightEffect.toLowerCase().includes('neutral')) ||
        (weightFilter === 'Gain' && d.weightEffect.includes('+'))

      const matchCV = cvFilter === 'All' ||
        (cvFilter === 'CV Benefit' && !d.cvBenefit.toLowerCase().includes('neutral') && !d.cvBenefit.toLowerCase().includes('unknown')) ||
        (cvFilter === 'Neutral' && (d.cvBenefit.toLowerCase().includes('neutral') || d.cvBenefit.toLowerCase().includes('unknown')))

      return matchSearch && matchClass && matchWeight && matchCV
    })
  }, [search, classFilter, weightFilter, cvFilter])

  const hypoColors: Record<string, string> = {
    'Low': '#059669',
    'High': '#dc2626',
    'Moderate': '#d97706',
  }

  const costColors: Record<string, string> = {
    'Low': '#059669',
    'Medium': '#d97706',
    'High': '#dc2626',
  }

  const classColors: Record<string, string> = {
    'SGLT2i': '#0891b2',
    'GLP-1 RA': '#7c3aed',
    'GIP/GLP-1 RA': '#9333ea',
    'DPP-4i': '#0d6e6e',
    'Biguanide': '#059669',
    'TZD': '#d97706',
    'SU': '#dc2626',
    'Basal Insulin': '#ea580c',
    'Bolus Insulin': '#f97316',
    'Non-steroidal MRA': '#2563eb',
    'THR-beta Agonist': '#be185d',
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Pharmacotherapy Profiles</h1>
        <p className="text-sm text-gray-500 mt-0.5">{t2dMedications.length} drugs — searchable & filterable</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, brand, or class..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 bg-white"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Filter size={14} className="text-gray-500" />
          <span className="text-xs font-semibold text-gray-600">Filters</span>
        </div>
        <div className="space-y-2">
          <div>
            <div className="text-xs text-gray-500 mb-1">Drug Class</div>
            <div className="flex flex-wrap gap-1">
              {drugClasses.map((c) => (
                <button
                  key={c}
                  onClick={() => setClassFilter(c)}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                    classFilter === c ? 'text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                  }`}
                  style={classFilter === c ? { backgroundColor: classColors[c] || '#0d6e6e' } : {}}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500 mb-1">Weight Effect</div>
              <div className="flex gap-1">
                {weightOptions.map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeightFilter(w)}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      weightFilter === w ? 'bg-[#0d6e6e] text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">CV Outcome</div>
              <div className="flex gap-1">
                {cvOptions.map((cv) => (
                  <button
                    key={cv}
                    onClick={() => setCvFilter(cv)}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      cvFilter === cv ? 'bg-[#0d6e6e] text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {cv}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs text-gray-500">{filtered.length} drug{filtered.length !== 1 ? 's' : ''} found</div>

      {/* Drug Cards */}
      <div className="space-y-2">
        {filtered.map((drug) => (
          <div
            key={drug.name}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedDrug(selectedDrug?.name === drug.name ? null : drug)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-bold text-gray-800">{drug.name}</div>
                  {drug.brand && <div className="text-xs text-gray-500">{drug.brand}</div>}
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full text-white font-medium flex-shrink-0"
                  style={{ backgroundColor: classColors[drug.class] || '#0d6e6e' }}
                >
                  {drug.class}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <div className="text-xs text-gray-400">A1C ↓</div>
                  <div className="text-xs font-semibold text-gray-700">{drug.a1cReduction}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Weight</div>
                  <div className="text-xs font-semibold text-gray-700">{drug.weightEffect}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Hypo Risk</div>
                  <div className="text-xs font-semibold" style={{ color: hypoColors[drug.hypoRisk] || '#6b7280' }}>{drug.hypoRisk}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Cost</div>
                  <div className="text-xs font-semibold" style={{ color: costColors[drug.cost] }}>{drug.cost}</div>
                </div>
              </div>

              {/* Expanded Detail */}
              {selectedDrug?.name === drug.name && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">Dosing</div>
                    <div className="text-xs text-gray-700">{drug.dosing}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">CV Benefit</div>
                    <div className="text-xs text-gray-700">{drug.cvBenefit}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">Renal Benefit</div>
                    <div className="text-xs text-gray-700">{drug.renalBenefit}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">MASLD/MASH Benefit</div>
                    <div className="text-xs text-gray-700">{drug.maslBenefit}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-1">Key Effects / Side Effects</div>
                    <div className="flex flex-wrap gap-1">
                      {drug.keyEffects.map((e) => (
                        <span key={e} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{e}</span>
                      ))}
                    </div>
                  </div>
                  {drug.contraindications.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-red-600 mb-1">Contraindications / Cautions</div>
                      <div className="flex flex-wrap gap-1">
                        {drug.contraindications.map((c) => (
                          <span key={c} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-200">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">No medications match your search/filter criteria.</div>
      )}
    </div>
  )
}
