import { client } from '@/sanity/lib/client'
import { SERVICES_QUERY, NEWS_HOME_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { Hero } from '@/components/home/Hero'
import { ServiciosGrid } from '@/components/home/ServiciosGrid'
import { Nosotros } from '@/components/home/Nosotros'
import { NewsGrid } from '@/components/home/NewsGrid'
import { BannerPromo } from '@/components/home/BannerPromo'
import { ContactSection } from '@/components/ContactSection'

export default async function HomePage() {
  const [services, news, siteSettings] = await Promise.all([
    client.fetch(SERVICES_QUERY),
    client.fetch(NEWS_HOME_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
  ])

  return (
    <>
      <Hero tagline={siteSettings?.tagline} />
      <ServiciosGrid services={services} />
      <Nosotros />
      <NewsGrid news={news} />
      <BannerPromo />
      <ContactSection siteSettings={siteSettings} />
    </>
  )
}
