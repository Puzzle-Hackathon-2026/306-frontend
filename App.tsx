import { useState } from 'react'
import VistaCiudadana from './components/VistaCiudadana'
import PanelOperativo from './components/PanelOperativo'
import ModuloB from './components/ModuloB'
import ModuloC from './components/ModuloC'

type Vista = 'ciudadana' | 'operativo' | 'moduloB' | 'moduloC'

const tabs: { id: Vista; label: string; badge?: string }[] = [
  { id: 'ciudadana', label: 'Vista Ciudadana' },
  { id: 'operativo', label: 'Panel Operativo' },
  { id: 'moduloB', label: 'Módulo B', badge: 'Cobertura Equitativa' },
  { id: 'moduloC', label: 'Módulo C', badge: 'Reciclaje' },
]

export default function App() {
  const [vista, setVista] = useState<Vista>('ciudadana')

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-white">
      {/* Top nav */}
      <header className="border-b border-[#D4E0D9] bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#16643A] rounded-sm flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L14 5v6l-6 3L2 11V5l6-3z" fill="white" opacity="0.9"/>
                  <path d="M8 2v12M2 5l6 3 6-3" stroke="white" strokeWidth="0.8" opacity="0.5"/>
                </svg>
              </div>
              <span style={{ fontFamily: "'Outfit', sans-serif" }} className="font-700 text-[#111A14] text-[15px] tracking-tight">
                CleanCity <span className="text-[#16643A]">SPS</span>
              </span>
            </div>

            {/* Tabs */}
            <nav className="flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setVista(tab.id)}
                  className={`relative px-3 py-1.5 text-[13px] font-medium rounded-md transition-all duration-150 ${
                    vista === tab.id
                      ? 'bg-[#16643A] text-white'
                      : 'text-[#5A6B5E] hover:text-[#111A14] hover:bg-[#F0F4F1]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Status indicator */}
            <div className="flex items-center gap-1.5 text-[12px] text-[#5A6B5E]">
              <span className="w-1.5 h-1.5 bg-[#16643A] rounded-full animate-pulse" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>EN VIVO</span>
            </div>
          </div>
        </div>
      </header>

      {/* View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {vista === 'ciudadana' && <VistaCiudadana />}
        {vista === 'operativo' && <PanelOperativo />}
        {vista === 'moduloB' && <ModuloB />}
        {vista === 'moduloC' && <ModuloC />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#D4E0D9] mt-12 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-[11px] text-[#5A6B5E]">
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            CleanCity SPS · San Pedro Sula, Honduras · Hackathon 2026
          </span>
          <span>Módulos B + C declarados</span>
        </div>
      </footer>
    </div>
  )
}
