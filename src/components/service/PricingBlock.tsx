import { client } from '@/sanity/lib/client'
import { PRICING_BY_SERVICE_QUERY } from '@/sanity/lib/queries'
import { Reveal } from '@/components/Reveal'

const TYPE_LABEL: Record<string, string> = {
  general: 'General',
  'ini-inter': 'Iniciación / Intermedio',
  suelta: 'Clase suelta',
  kids: 'Kids',
}

export async function PricingBlock({ serviceId, heading }: { serviceId: string; heading?: string }) {
  const items = await client.fetch(PRICING_BY_SERVICE_QUERY, { serviceId })
  if (!items || items.length === 0) return null

  return (
    <section className="container-px py-16">
      <Reveal>
        <h2 className="font-display text-3xl mb-10">{heading || 'Precios y Bonos'}</h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item: any, i: number) => (
          <Reveal key={item.id} delay={(i % 3) * 0.06}>
            <div className="bg-ink-900 border border-white/10 rounded-2xl p-6 h-full flex flex-col">
              {item.type && (
                <span className="text-accent text-xs uppercase tracking-wide mb-2">
                  {TYPE_LABEL[item.type] || item.type}
                </span>
              )}
              <h3 className="font-display text-lg mb-1">{item.name}</h3>
              <p className="font-display text-3xl mb-2">{item.price}</p>
              {item.duration && <p className="text-white/40 text-xs mb-3">{item.duration}</p>}
              {item.description && <p className="text-white/60 text-sm mt-auto">{item.description}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
