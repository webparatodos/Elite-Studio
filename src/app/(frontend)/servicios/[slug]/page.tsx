import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { SERVICES_QUERY_FULL, SERVICE_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { mediaUrl, mediaAlt } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'
import { Reveal } from '@/components/Reveal'
import { ServiceBlocks } from '@/components/service/ServiceBlocks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'

export async function generateStaticParams() {
  const services = await client.fetch(SERVICES_QUERY_FULL)
  return services.map((s: any) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await client.fetch(SERVICE_BY_SLUG_QUERY, { slug })
  if (!service) return {}
  return buildMetadata({
    seo: service.seo,
    fallbackTitle: service.title,
    fallbackDescription: service.shortDescription,
    fallbackImage: service.heroImage,
    path: `/servicios/${service.slug}`,
  })
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await client.fetch(SERVICE_BY_SLUG_QUERY, { slug })
  if (!service) notFound()

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    url: `${SITE_URL}/servicios/${service.slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Élite Estudio',
      url: SITE_URL,
    },
    areaServed: 'Madrid',
    image: service.heroImage ? mediaUrl(service.heroImage, 1200, 900) : undefined,
  }

  return (
    <div>
      <JsonLd data={serviceJsonLd} />
      <section className="relative h-[70vh] w-full overflow-hidden flex items-end">
        <Image
          src={mediaUrl(service.heroImage, 1920, 1080)}
          alt={mediaAlt(service.heroImage, `${service.title} en Élite Estudio Madrid`)}
          fill
          quality={60}
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/10" />
        <div className="absolute top-24 left-0 right-0">
          <Breadcrumbs
            className="container-px"
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Servicios', href: '/servicios' },
              { label: service.title, href: `/servicios/${service.slug}` },
            ]}
          />
        </div>
        <div className="relative container-px pb-16">
          <Reveal>
            <h1 className="font-display text-5xl md:text-7xl text-balance">{service.title}</h1>
          </Reveal>
        </div>
      </section>

      <section className="container-px py-20 max-w-3xl">
        <Reveal>
          <p className="text-white/70 text-lg leading-relaxed mb-10">{service.shortDescription}</p>
          {service.description && (
            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText value={service.description} />
            </div>
          )}
        </Reveal>
      </section>

      {service.features?.length > 0 && (
        <section className="container-px py-16 bg-ink-900/40">
          <Reveal>
            <h2 className="font-display text-3xl mb-10">Detalles</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.features.map((f: any, i: number) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="bg-ink-900 border border-white/10 rounded-2xl p-6 h-full">
                  <h3 className="font-display text-lg mb-2">{f.title}</h3>
                  <p className="text-white/60 text-sm">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {service.gallery?.length > 0 && (
        <section className="container-px py-16">
          <Reveal>
            <h2 className="font-display text-3xl mb-10">Galería</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {service.gallery.map((img: any, i: number) => (
              <Reveal
                key={i}
                delay={(i % 3) * 0.06}
                className="relative aspect-square rounded-xl overflow-hidden"
              >
                <Image
                  src={mediaUrl(img, 800, 800)}
                  alt={mediaAlt(img, `Galería de ${service.title} en Élite Estudio Madrid`)}
                  fill
                  quality={60}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <ServiceBlocks blocks={service.blocks} serviceId={service.id} />

      <section className="container-px py-24 text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl mb-6 text-balance">
            ¿Listo para dar el siguiente paso?
          </h2>
          <Link
            href="/contacto"
            className="inline-flex items-center px-8 py-4 rounded-full bg-accent hover:bg-accent-dark transition-colors font-semibold uppercase tracking-wide text-sm"
          >
            Contactar ahora
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
