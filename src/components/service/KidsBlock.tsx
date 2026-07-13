import { Reveal } from '@/components/Reveal'

type Group = { ageRange?: string; schedule?: string; price?: string }

export function KidsBlock({
  heading,
  text,
  groups,
}: {
  heading?: string
  text?: string
  groups?: Group[]
}) {
  return (
    <section className="container-px py-16 bg-ink-900/40">
      <Reveal>
        <h2 className="font-display text-3xl mb-4">{heading || 'Élite Kids'}</h2>
        {text && <p className="text-white/60 max-w-2xl mb-10">{text}</p>}
      </Reveal>
      {groups && groups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {groups.map((g, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="bg-ink-900 border border-white/10 rounded-2xl p-6">
                <p className="text-accent text-sm uppercase tracking-wide mb-2">{g.ageRange}</p>
                <p className="text-white/80 mb-1">{g.schedule}</p>
                <p className="font-display text-2xl">{g.price}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
