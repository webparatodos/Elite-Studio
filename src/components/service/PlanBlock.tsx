import { Reveal } from '@/components/Reveal'

type Item = { title?: string; description?: string }

export function PlanBlock({ heading, items }: { heading?: string; items?: Item[] }) {
  if (!items || items.length === 0) return null

  return (
    <section className="container-px py-16">
      <Reveal>
        <h2 className="font-display text-3xl mb-10">{heading}</h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <Reveal key={i} delay={(i % 3) * 0.06}>
            <div className="bg-ink-900 border border-white/10 rounded-2xl p-6 h-full">
              <h3 className="font-display text-lg mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
