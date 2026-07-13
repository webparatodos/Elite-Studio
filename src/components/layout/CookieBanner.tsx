'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'elite-estudio-cookie-consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [configuring, setConfiguring] = useState(false)
  const [analytics, setAnalytics] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)
  }, [])

  const save = (value: { accepted: boolean; analytics: boolean }) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] p-4">
      <div className="container-px mx-auto max-w-3xl bg-ink-900 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/60">
        <p className="text-sm text-white/70 mb-4">
          Usamos cookies propias y de terceros para mejorar tu experiencia. Puedes aceptar todas,
          rechazarlas o configurar tus preferencias.
        </p>

        {configuring && (
          <label className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="accent-accent"
            />
            Cookies analíticas
          </label>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => save({ accepted: true, analytics: true })}
            className="px-5 py-2 rounded-full bg-accent text-sm font-semibold hover:bg-accent-dark transition-colors"
          >
            Aceptar todas
          </button>
          <button
            onClick={() => save({ accepted: false, analytics: false })}
            className="px-5 py-2 rounded-full border border-white/20 text-sm hover:bg-white/5 transition-colors"
          >
            Rechazar
          </button>
          {!configuring ? (
            <button
              onClick={() => setConfiguring(true)}
              className="px-5 py-2 rounded-full text-sm text-white/60 hover:text-white transition-colors"
            >
              Configurar
            </button>
          ) : (
            <button
              onClick={() => save({ accepted: true, analytics })}
              className="px-5 py-2 rounded-full text-sm text-white/60 hover:text-white transition-colors"
            >
              Guardar preferencias
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
