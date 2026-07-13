'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function Hero({ tagline }: { tagline?: string | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-placeholder.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/40 to-ink-950" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full container-px flex flex-col justify-end pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="uppercase tracking-[0.3em] text-accent text-sm mb-4"
        >
          Danza · Producción Audiovisual · Formación
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[13vw] leading-[0.9] md:text-8xl lg:text-9xl text-balance"
        >
          MUÉVETE
          <br />
          <span className="text-accent">SIN LÍMITES</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-xl text-white/70 text-lg"
        >
          {tagline ||
            'Un espacio en Madrid donde el baile, la música y la imagen se convierten en oficio y en arte.'}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex gap-4"
        >
          <Link
            href="/contacto"
            className="inline-flex items-center px-7 py-3.5 rounded-full bg-accent hover:bg-accent-dark transition-colors font-semibold uppercase tracking-wide text-sm"
          >
            Contacta con nosotros
          </Link>
          <Link
            href="/servicios"
            className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/30 hover:border-white transition-colors font-semibold uppercase tracking-wide text-sm"
          >
            Ver servicios
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
