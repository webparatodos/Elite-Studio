'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getNavItems } from '@/lib/nav'

type SiteSettings = {
  siteName?: string | null
  tiendaUrl?: string | null
}

export function Header({ siteSettings }: { siteSettings: SiteSettings }) {
  const [open, setOpen] = useState(false)
  const navItems = getNavItems(siteSettings?.tiendaUrl || '#tienda')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink-950/80 backdrop-blur-md border-b border-white/5">
      <div className="container-px flex items-center justify-between h-20">
        <Link href="/" className="font-display text-xl tracking-tight">
          {siteSettings?.siteName || 'ÉLITE ESTUDIO'}
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                target={item.label === 'Tienda' ? '_blank' : undefined}
                rel={item.label === 'Tienda' ? 'noopener noreferrer' : undefined}
                className="text-sm uppercase tracking-wide text-white/80 hover:text-accent transition-colors py-8"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 hidden group-hover:block">
                  <div className="w-64 bg-ink-900 border border-white/10 rounded-xl shadow-2xl shadow-black/50 p-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-white/70 rounded-lg hover:bg-white/5 hover:text-accent transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link
          href="/contacto"
          className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full bg-accent text-white text-sm font-semibold uppercase tracking-wide hover:bg-accent-dark transition-colors"
        >
          Contacto
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Abrir menú"
        >
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-4 h-0.5 bg-white self-end" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink-950 z-[60] flex flex-col"
          >
            <div className="container-px flex items-center justify-between h-20">
              <span className="font-display text-xl">{siteSettings?.siteName || 'ÉLITE ESTUDIO'}</span>
              <button onClick={() => setOpen(false)} className="p-2 text-2xl" aria-label="Cerrar menú">
                ×
              </button>
            </div>
            <motion.nav
              initial="closed"
              animate="open"
              variants={{ open: { transition: { staggerChildren: 0.05 } } }}
              className="flex-1 overflow-y-auto container-px flex flex-col gap-2 py-8"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    closed: { opacity: 0, x: -20 },
                    open: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl py-3 block"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 flex flex-col gap-1 mb-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="text-white/60 py-1.5 text-sm"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
