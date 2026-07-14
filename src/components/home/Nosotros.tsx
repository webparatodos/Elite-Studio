import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/Reveal'

export function Nosotros() {
  return (
    <section className="container-px py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      <Reveal>
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
          <Image
            src="https://picsum.photos/seed/elite-nosotros/900/1100"
            alt="Equipo de Élite Estudio ensayando"
            fill
            quality={60}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">Quiénes somos</p>
        <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">
          Un estudio hecho por y para artistas
        </h2>
        <p className="text-white/70 text-lg leading-relaxed mb-4">
          Desde nuestras salas en Madrid formamos bailarines, producimos contenido audiovisual y
          acompañamos a artistas en cada etapa de su carrera. Creemos en el movimiento como
          lenguaje y en la técnica como libertad.
        </p>
        <p className="text-white/50 leading-relaxed mb-8">
          Un equipo multidisciplinar de coreógrafos, productores y diseñadores trabajando bajo un
          mismo techo para que tu proyecto artístico llegue más lejos.
        </p>
        <Link
          href="/nosotros"
          className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/30 hover:border-accent hover:text-accent transition-colors font-semibold uppercase tracking-wide text-sm"
        >
          Conócenos
        </Link>
      </Reveal>
    </section>
  )
}
