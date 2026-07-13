import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { MUSIC_PAGE_QUERY } from '@/sanity/lib/queries'
import { mediaUrl } from '@/lib/media'
import { Reveal } from '@/components/Reveal'
import { PortfolioLightbox } from '@/components/service/PortfolioLightbox'

export default async function MusicPage() {
  const page = await client.fetch(MUSIC_PAGE_QUERY)

  const heroTitle = page?.heroTitle || 'MUSIC'
  const heroSubtitle =
    page?.heroSubtitle ||
    'Producción musical, grabación y ensayo para artistas urbanos en el corazón de Madrid.'
  const ctaLabel = page?.ctaLabel || 'Contacta con nosotros'
  const ctaUrl = page?.ctaUrl || '/contacto'

  const portfolio = (page?.portfolio || []).map((item: any) => ({
    ...item,
    imageSrc: mediaUrl(item.image, 800, 800),
  }))

  return (
    <div>
      <section className="relative h-[70vh] w-full overflow-hidden flex items-end">
        <Image
          src={mediaUrl(page?.heroImage, 1920, 1080)}
          alt={heroTitle}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/10" />
        <div className="relative container-px pb-16">
          <Reveal>
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">Élite Estudio</p>
            <h1 className="font-display text-5xl md:text-7xl text-balance">{heroTitle}</h1>
          </Reveal>
        </div>
      </section>

      <section className="container-px py-20 max-w-3xl">
        <Reveal>
          <p className="text-white/70 text-lg leading-relaxed">{heroSubtitle}</p>
          {page?.description && (
            <div className="prose prose-invert prose-lg max-w-none mt-6">
              <PortableText value={page.description} />
            </div>
          )}
        </Reveal>
      </section>

      {portfolio.length > 0 && (
        <section className="container-px py-16 bg-ink-900/40">
          <Reveal>
            <h2 className="font-display text-3xl mb-10">Portfolio</h2>
          </Reveal>
          <PortfolioLightbox items={portfolio} />
        </section>
      )}

      <section className="container-px py-24 text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl mb-6 text-balance">
            ¿Tienes un proyecto musical en mente?
          </h2>
          <Link
            href={ctaUrl}
            className="inline-flex items-center px-8 py-4 rounded-full bg-accent hover:bg-accent-dark transition-colors font-semibold uppercase tracking-wide text-sm"
          >
            {ctaLabel}
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
