'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 shadow-md" style={{ backgroundColor: '#0d6e6e' }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-lg">DM</span>
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">DM</div>
              <div className="text-white/70 text-xs leading-tight">AACE 2026 T2D Management</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/comorbidities" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Comorbidities</Link>
            <Link href="/glucose-centric" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Glucose</Link>
            <Link href="/medications" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Medications</Link>
            <Link href="/ask" className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors">Ask AI</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-4 px-4">
        <div className="max-w-5xl mx-auto text-center text-xs text-gray-500">
          <p className="font-medium text-gray-700 mb-1">Medical Disclaimer</p>
          <p>This tool is for educational and clinical decision support purposes only. It does not replace professional medical judgment. Always verify recommendations against current guidelines and individual patient circumstances.</p>
          <p className="mt-1">Based on AACE 2026 Algorithm for Management of Adults with Type 2 Diabetes.</p>
        </div>
      </footer>

      {/* Floating hamburger button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: '#0d6e6e' }}
        aria-label="Open menu"
      >
        <Menu size={24} color="white" />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  )
}
