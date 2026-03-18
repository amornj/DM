'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
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
  X,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/prediabetes', label: 'Prediabetes', icon: Activity },
  { href: '/classification', label: 'Classification', icon: FlaskConical },
  { href: '/dyslipidemia', label: 'Dyslipidemia', icon: BarChart2 },
  { href: '/hypertension', label: 'Hypertension', icon: Heart },
  { href: '/comorbidities', label: 'Comorbidities', icon: Layers },
  { href: '/glucose-centric', label: 'Glucose-Centric', icon: Stethoscope },
  { href: '/insulin', label: 'Insulin', icon: Syringe },
  { href: '/medications', label: 'Medications', icon: Pill },
  { href: '/obesity', label: 'Obesity', icon: Weight },
  { href: '/vaccines', label: 'Vaccines', icon: Shield },
  { href: '/cgm', label: 'CGM Guide', icon: MonitorDot },
  { href: '/ask', label: 'Ask NotebookLM', icon: MessageCircle },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100" style={{ backgroundColor: '#0d6e6e' }}>
          <div>
            <div className="text-white font-bold text-lg">DM</div>
            <div className="text-white/80 text-xs">AACE 2026 T2D Guide</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} color="white" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="overflow-y-auto h-full pb-24 pt-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#e6f4f4] text-[#0d6e6e] border-r-4 border-[#0d6e6e]'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#0d6e6e]'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#0d6e6e]' : 'text-gray-500'} />
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
