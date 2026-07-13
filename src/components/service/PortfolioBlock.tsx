import { client } from '@/sanity/lib/client'
import { PORTFOLIO_BY_SERVICE_QUERY } from '@/sanity/lib/queries'
import { mediaUrl } from '@/lib/media'
import { Reveal } from '@/components/Reveal'
import { PortfolioLightbox } from '@/components/service/PortfolioLightbox'

export async function PortfolioBlock({ serviceId, heading }: { serviceId: string; heading?: string }) {
  const items = await client.fetch(PORTFOLIO_BY_SERVICE_QUERY, { serviceId })
  if (!items || items.length === 0) return null

  const withSrc = items.map((item: any) => ({
    ...item,
    imageSrc: mediaUrl(item.image, 800, 800),
  }))

  return (
    <section className="container-px py-16 bg-ink-900/40">
      <Reveal>
        <h2 className="font-display text-3xl mb-10">{heading || 'Portfolio'}</h2>
      </Reveal>
      <PortfolioLightbox items={withSrc} />
    </section>
  )
}
