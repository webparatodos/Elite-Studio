import type { MetadataRoute } from 'next'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { SITE_URL } from '@/lib/site'

const SLUGS_QUERY = groq`{
  "services": *[_type == "service" && defined(slug.current)].slug.current,
  "news": *[_type == "news" && defined(slug.current)].slug.current
}`

const STATIC_ROUTES = [
  '',
  '/servicios',
  '/nosotros',
  '/novedades',
  '/music',
  '/contacto',
  '/legal/privacidad',
  '/legal/cookies',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { services, news } = await client.fetch(SLUGS_QUERY)

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))

  const serviceEntries: MetadataRoute.Sitemap = (services || []).map((slug: string) => ({
    url: `${SITE_URL}/servicios/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const newsEntries: MetadataRoute.Sitemap = (news || []).map((slug: string) => ({
    url: `${SITE_URL}/novedades/${slug}`,
    changeFrequency: 'yearly',
    priority: 0.5,
  }))

  return [...staticEntries, ...serviceEntries, ...newsEntries]
}
