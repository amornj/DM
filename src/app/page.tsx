import Link from 'next/link'
import {
  Activity,
  FlaskConical,
  Heart,
  Stethoscope,
  Layers,
  BarChart2,
  Syringe,
  Pill,
  Weight,
  Shield,
  MonitorDot,
  MessageCircle,
  AlertTriangle,
} from 'lucide-react'

const sections = [
  {
    href: '/prediabetes',
    icon: Activity,
    title: 'Prediabetes',
    description: 'IFG/IGT criteria, lifestyle interventions, pharmacotherapy',
    color: '#14b8a6',
  },
  {
    href: '/classification',
    icon: FlaskConical,
    title: 'Classification',
    description: 'T1D vs T2D diagnostic algorithm, autoantibodies, phenotype',
    color: '#0d6e6e',
  },
  {
    href: '/dyslipidemia',
    icon: BarChart2,
    title: 'Dyslipidemia',
    description: 'LDL-C targets, statin therapy, PCSK9 inhibitors, triglycerides',
    color: '#0891b2',
  },
  {
    href: '/hypertension',
    icon: Heart,
    title: 'Hypertension',
    description: 'BP goals <130/80, ACEi/ARB first-line, step therapy',
    color: '#dc2626',
  },
  {
    href: '/comorbidities',
    icon: Layers,
    title: 'Comorbidities',
    description: 'HF, CKD, ASCVD, Stroke/TIA, MASLD — drug recommendations',
    color: '#7c3aed',
  },
  {
    href: '/glucose-centric',
    icon: Stethoscope,
    title: 'Glucose-Centric',
    description: 'A1C-based therapy tiers: mono, dual, triple, insulin',
    color: '#0d6e6e',
  },
  {
    href: '/insulin',
    icon: Syringe,
    title: 'Insulin',
    description: 'Basal dosing calculator, titration guide, BeAM calculator',
    color: '#d97706',
  },
  {
    href: '/medications',
    icon: Pill,
    title: 'Medications',
    description: 'Full T2D drug profiles, searchable, filterable by class',
    color: '#059669',
  },
  {
    href: '/obesity',
    icon: Weight,
    title: 'Obesity',
    description: 'Weight loss medications, dosing, bariatric surgery criteria',
    color: '#0d6e6e',
  },
  {
    href: '/vaccines',
    icon: Shield,
    title: 'Vaccines',
    description: 'Recommended immunizations for adults with T2D',
    color: '#2563eb',
  },
  {
    href: '/cgm',
    icon: MonitorDot,
    title: 'CGM Guide',
    description: 'TIR targets, TAR/TBR, GMI vs A1C, TIR calculator',
    color: '#0d6e6e',
  },
  {
    href: '/ask',
    icon: MessageCircle,
    title: 'Ask NotebookLM',
    description: 'AI-powered Q&A on T2D management guidelines',
    color: '#0d6e6e',
  },
]

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #0d6e6e 0%, #0a5555 100%)' }}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">DM — AACE 2026</h1>
            <p className="text-white/80 text-sm mb-3">Type 2 Diabetes Management</p>
            <p className="text-white/90 text-sm max-w-md">
              Clinical decision support based on the 2026 AACE Algorithm. Navigate to any section for evidence-based recommendations, calculators, and drug profiles.
            </p>
          </div>
          <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-white/20 items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-2xl">Rx</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/comorbidities" className="bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors">
            Comorbidities Tool
          </Link>
          <Link href="/insulin" className="bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors">
            Insulin Calculator
          </Link>
          <Link href="/ask" className="bg-white text-[#0d6e6e] text-xs font-bold px-3 py-1.5 rounded-full hover:bg-white/90 transition-colors">
            Ask AI
          </Link>
        </div>
      </div>

      {/* Navigation Grid */}
      <div>
        <h2 className="text-base font-semibold text-gray-700 mb-3">Clinical Modules</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {sections.map(({ href, icon: Icon, title, description, color }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: color + '1a' }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-[#0d6e6e] transition-colors">{title}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{description}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-800 font-semibold text-sm mb-1">Medical Disclaimer</p>
          <p className="text-amber-700 text-xs leading-relaxed">
            This application is intended for licensed healthcare professionals as a clinical decision support tool only.
            It does not constitute medical advice and should not replace individual clinical judgment.
            Always verify recommendations against current guidelines and tailor treatment to individual patient needs.
            Based on the AACE 2026 Algorithm for Management of Adults with Type 2 Diabetes.
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: '13', label: 'Clinical Modules' },
          { value: '27+', label: 'Drug Profiles' },
          { value: '2026', label: 'AACE Guidelines' },
        ].map(({ value, label }) => (
          <div key={label} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
            <div className="text-xl font-bold" style={{ color: '#0d6e6e' }}>{value}</div>
            <div className="text-gray-500 text-xs mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
