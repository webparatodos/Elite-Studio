import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { NEWS_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { groq } from 'next-sanity'
import { mediaUrl, mediaAlt } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'
import { Reveal } from '@/components/Reveal'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'

const NEWS_SLUGS_QUERY = groq`*[_type == "news"]{ "slug": slug.current }`

export async function generateStaticParams() {
  const news = await client.fetch(NEWS_SLUGS_QUERY)
  return news.map((n: any) => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = await client.fetch(NEWS_BY_SLUG_QUERY, { slug })
  if (!item) return {}
  return buildMetadata({
    seo: item.seo,
    fallbackTitle: item.title,
    fallbackDescription: item.excerpt,
    fallbackImage: item.featuredImage,
    path: `/novedades/${item.slug}`,
  })
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await client.fetch(NEWS_BY_SLUG_QUERY, { slug })
  if (!item) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.excerpt,
    datePublished: item.publishedDate,
    image: item.featuredImage ? mediaUrl(item.featuredImage, 1200, 675) : undefined,
    author: { '@type': 'Organization', name: 'Élite Estudio' },
    publisher: { '@type': 'Organization', name: 'Élite Estudio' },
    mainEntityOfPage: `${SITE_URL}/novedades/${item.slug}`,
  }

  return (
    <article className="pb-24">
      <JsonLd data={articleJsonLd} />
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Novedades', href: '/novedades' },
          { label: item.title, href: `/novedades/${item.slug}` },
        ]}
      />
      <div className="container-px max-w-3xl mx-auto">
        <Reveal>
          <p className="text-white/40 text-xs uppercase tracking-wide mb-4">
            {new Date(item.publishedDate).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <h1 className="font-display text-4xl md:text-6xl mb-10 text-balance">{item.title}</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
            <Image
              src={mediaUrl(item.featuredImage, 1200, 675)}
              alt={mediaAlt(item.featuredImage, item.title)}
              fill
              quality={60}
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          {item.content && (
            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText value={item.content} />
            </div>
          )}
        </Reveal>
      </div>
    </article>
  )
}
