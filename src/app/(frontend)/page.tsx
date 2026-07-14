import { client } from '@/sanity/lib/client'
import { SERVICES_QUERY, NEWS_HOME_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { SITE_URL } from '@/lib/site'
import { Hero } from '@/components/home/Hero'
import { ServiciosGrid } from '@/components/home/ServiciosGrid'
import { Nosotros } from '@/components/home/Nosotros'
import { NewsGrid } from '@/components/home/NewsGrid'
import { BannerPromo } from '@/components/home/BannerPromo'
import { ContactSection } from '@/components/ContactSection'
import { JsonLd } from '@/components/JsonLd'

export default async function HomePage() {
  const [services, news, siteSettings] = await Promise.all([
    client.fetch(SERVICES_QUERY),
    client.fetch(NEWS_HOME_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
  ])

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteSettings?.siteName || 'Élite Estudio',
    description: siteSettings?.tagline,
    url: SITE_URL,
    telephone: siteSettings?.phones?.[0],
    email: siteSettings?.emails?.[0],
    address: siteSettings?.address
      ? { '@type': 'PostalAddress', streetAddress: siteSettings.address, addressLocality: 'Madrid', addressCountry: 'ES' }
      : undefined,
    areaServed: 'Madrid',
    sameAs: (siteSettings?.socialLinks || []).map((s: any) => s.url),
  }

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <Hero tagline={siteSettings?.tagline} />
      <ServiciosGrid services={services} />
      <Nosotros />
      <NewsGrid news={news} />
      <BannerPromo />
      <ContactSection siteSettings={siteSettings} />
    </>
  )
}
