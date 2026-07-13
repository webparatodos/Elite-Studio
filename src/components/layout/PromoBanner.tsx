'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { mediaUrl } from '@/lib/media'

const STORAGE_KEY = 'elite-estudio-promo-dismissed'

type PromoBannerData = {
  active?: boolean
  text?: string
  ctaLabel?: string
  ctaUrl?: string
  image?: any
}

export function PromoBanner({ promo }: { promo?: PromoBannerData | null }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!promo?.active || !promo?.text) return
    const dismissed = sessionStorage.getItem(STORAGE_KEY)
    if (!dismissed) setVisible(true)
  }, [promo])

  if (!promo?.active || !promo?.text) return null

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-[65]"
        >
          <div className="relative bg-ink-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
            <button
              onClick={close}
              className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-ink-950/70 text-white/80 hover:text-white text-lg"
              aria-label="Cerrar"
            >
              ×
            </button>
            {promo.image && (
              <div className="relative h-32 w-full">
                <Image src={mediaUrl(promo.image, 500, 250)} alt="" fill className="object-cover" />
              </div>
            )}
            <div className="p-5">
              <p className="text-white/80 text-sm mb-4">{promo.text}</p>
              {promo.ctaLabel && promo.ctaUrl && (
                <Link
                  href={promo.ctaUrl}
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent hover:bg-accent-dark transition-colors text-xs font-semibold uppercase tracking-wide"
                >
                  {promo.ctaLabel}
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
