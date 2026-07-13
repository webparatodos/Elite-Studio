import type { Metadata } from 'next'
import { Archivo_Black, Inter } from 'next/font/google'
import React from 'react'

import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { PromoBanner } from '@/components/layout/PromoBanner'

import './globals.css'

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

export const metadata: Metadata = {
  title: 'Élite Estudio | Danza, Producción Audiovisual y Formación',
  description:
    'Estudio de baile y productora audiovisual en Madrid. Clases, formación profesional, alquiler de salas, producción artística y audiovisual.',
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
