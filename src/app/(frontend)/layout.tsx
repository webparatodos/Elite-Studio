import type { Metadata } from 'next'
import { Archivo_Black, Inter } from 'next/font/google'
import React from 'react'

import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { PromoBanner } from '@/components/layout/PromoBanner'

import './globals.css'

// Revalida el contenido de Sanity cada 60s en producción (heredado por todas las páginas
// de este layout), para que los cambios hechos en el Studio se reflejen sin rebuild manual.
export const revalidate = 60

const display = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY)
  return {
    metadataBase: new URL(SITE_URL),
    ...buildMetadata({
      seo: siteSettings?.seo,
      fallbackTitle: 'Danza y Producción Audiovisual en Madrid',
      fallbackDescription:
        siteSettings?.tagline ||
        'Estudio de baile y productora audiovisual en Madrid. Clases, formación profesional, alquiler de salas, producción artística y audiovisual.',
      path: '/',
    }),
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY)

  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans bg-ink-950 text-white antialiased">
        <Header siteSettings={siteSettings} />
        <main>{children}</main>
        <Footer siteSettings={siteSettings} />
        <PromoBanner promo={siteSettings?.promoBanner} />
        <CookieBanner />
      </body>
    </html>
  )
}
