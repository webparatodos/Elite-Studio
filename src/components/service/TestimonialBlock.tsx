import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { TESTIMONIALS_BY_SERVICE_QUERY } from '@/sanity/lib/queries'
import { mediaUrl } from '@/lib/media'
import { Reveal } from '@/components/Reveal'

export async function TestimonialBlock({ serviceId, heading }: { serviceId: string; heading?: string }) {
  const items = await client.fetch(TESTIMONIALS_BY_SERVICE_QUERY, { serviceId })
  if (!items || items.length === 0) return null

  return (
    <section className="container-px py-16 bg-ink-900/40">
      <Reveal>
        <h2 className="font-display text-3xl mb-10">{heading || 'Testimonios'}</h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item: any, i: number) => (
          <Reveal key={item.id} delay={(i % 3) * 0.06}>
            <div className="bg-ink-900 border border-white/10 rounded-2xl p-6 h-full flex flex-col">
              <p className="text-white/70 text-sm leading-relaxed mb-6 flex-1">“{item.text}”</p>
              <div className="flex items-center gap-3">
                {item.photo && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image src={mediaUrl(item.photo, 80, 80)} alt={item.name} fill className="object-cover" />
                  </div>
                )}
                <span className="text-sm font-semibold">{item.name}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
