import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { NEWS_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { groq } from 'next-sanity'
import { mediaUrl } from '@/lib/media'
import { Reveal } from '@/components/Reveal'

const NEWS_SLUGS_QUERY = groq`*[_type == "news"]{ "slug": slug.current }`

export async function generateStaticParams() {
  const news = await client.fetch(NEWS_SLUGS_QUERY)
  return news.map((n: any) => ({ slug: n.slug }))
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await client.fetch(NEWS_BY_SLUG_QUERY, { slug })
  if (!item) notFound()

  return (
    <article className="pt-40 pb-24">
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
              alt={item.title}
              fill
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
