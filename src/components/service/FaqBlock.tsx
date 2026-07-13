import { client } from '@/sanity/lib/client'
import { FAQS_BY_SERVICE_QUERY } from '@/sanity/lib/queries'
import { Reveal } from '@/components/Reveal'
import { FaqAccordion } from '@/components/service/FaqAccordion'

export async function FaqBlock({ serviceId, heading }: { serviceId: string; heading?: string }) {
  const items = await client.fetch(FAQS_BY_SERVICE_QUERY, { serviceId })
  if (!items || items.length === 0) return null

  return (
    <section className="container-px py-16">
      <Reveal>
        <h2 className="font-display text-3xl mb-10">{heading || 'Preguntas Frecuentes'}</h2>
        <FaqAccordion items={items} />
      </Reveal>
    </section>
  )
}
