import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/Reveal'

export function BannerPromo() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/elite-campamento/1800/900"
          alt="Campamento de verano Élite Estudio"
          fill
          quality={60}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink-950/75" />
      </div>
      <Reveal className="relative container-px text-center max-w-2xl mx-auto">
        <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">Verano 2026</p>
        <h2 className="font-display text-4xl md:text-6xl mb-6 text-balance">
          Campamento de Danza y Audiovisual
        </h2>
        <p className="text-white/70 text-lg mb-8">
          Una semana intensiva de baile, música y creación audiovisual para jóvenes artistas.
          Plazas limitadas.
        </p>
        <Link
          href="/servicios/campamento"
          className="inline-flex items-center px-8 py-4 rounded-full bg-accent hover:bg-accent-dark transition-colors font-semibold uppercase tracking-wide text-sm"
        >
          Quiero apuntarme
        </Link>
      </Reveal>
    </section>
  )
}
