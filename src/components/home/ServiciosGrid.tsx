import Link from 'next/link'
import Image from 'next/image'
import { mediaUrl, mediaAlt } from '@/lib/media'
import { Reveal } from '@/components/Reveal'

type Service = {
  id: string
  title: string
  slug: string
  shortDescription: string
  heroImage?: any
}

export function ServiciosGrid({ services }: { services: Service[] }) {
  return (
    <section className="container-px py-28">
      <Reveal>
        <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">Lo que hacemos</p>
        <h2 className="font-display text-4xl md:text-5xl mb-14 text-balance">
          Nuestros Servicios
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={(i % 3) * 0.08}>
            <Link
              href={`/servicios/${service.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink-800"
            >
              <Image
                src={mediaUrl(service.heroImage, 800, 1000)}
                alt={mediaAlt(service.heroImage, `Servicio ${service.title} en Élite Estudio Madrid`)}
                fill
                quality={60}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-display text-xl mb-2">{service.title}</h3>
                <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-24 overflow-hidden">
                  {service.shortDescription}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Descubrir más →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
