import { client } from '@/sanity/lib/client'
import { FAQS_BY_SERVICE_QUERY } from '@/sanity/lib/queries'
import { Reveal } from '@/components/Reveal'
import { FaqAccordion } from '@/components/service/FaqAccordion'
import { JsonLd } from '@/components/JsonLd'

export async function FaqBlock({ serviceId, heading }: { serviceId: string; heading?: string }) {
  const items = await client.fetch(FAQS_BY_SERVICE_QUERY, { serviceId })
  if (!items || items.length === 0) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item: any) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <section className="container-px py-16">
      <JsonLd data={jsonLd} />
      <Reveal>
        <h2 className="font-display text-3xl mb-10">{heading || 'Preguntas Frecuentes'}</h2>
        <FaqAccordion items={items} />
      </Reveal>
    </section>
  )
}
