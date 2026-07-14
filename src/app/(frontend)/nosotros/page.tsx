import Image from 'next/image'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { TEAM_QUERY } from '@/sanity/lib/queries'
import { mediaUrl } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { Reveal } from '@/components/Reveal'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    fallbackTitle: 'Conócenos en Élite Estudio Madrid',
    fallbackDescription:
      'Conoce la historia, la misión y el equipo de Élite Estudio, escuela de danza y productora audiovisual en Madrid.',
    path: '/nosotros',
  })
}

export default async function NosotrosPage() {
  const team = await client.fetch(TEAM_QUERY)

  return (
    <div className="pt-40 pb-24">
      <div className="container-px max-w-3xl mb-20">
        <Reveal>
          <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">Élite Estudio</p>
          <h1 className="font-display text-5xl md:text-6xl mb-8 text-balance">Nuestra historia</h1>
          <p className="text-white/70 text-lg leading-relaxed mb-4">
            Élite Estudio nació de la necesidad de crear un espacio en Madrid donde la danza, la
            música y la imagen conviven bajo un mismo techo. Desde nuestros inicios como pequeña
            escuela de barrio hasta convertirnos en una productora integral, nuestra misión no ha
            cambiado: acompañar a cada artista en su proceso de crecimiento.
          </p>
          <p className="text-white/50 leading-relaxed">
            Hoy formamos a cientos de alumnos al año, producimos contenido audiovisual para
            marcas y artistas, y representamos talento en el sector del entretenimiento urbano.
          </p>
        </Reveal>
      </div>

      <div className="container-px mb-20">
        <Reveal>
          <h2 className="font-display text-3xl mb-10">Misión</h2>
          <p className="text-white/60 max-w-2xl leading-relaxed">
            Democratizar el acceso a una formación artística de alto nivel y ofrecer a nuestros
            alumnos y clientes las herramientas técnicas y creativas para hacer de su pasión una
            profesión.
          </p>
        </Reveal>
      </div>

      {team.length > 0 && (
        <div className="container-px mb-20">
          <Reveal>
            <h2 className="font-display text-3xl mb-10">Equipo</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member: any, i: number) => (
              <Reveal key={member.id} delay={(i % 4) * 0.06}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={mediaUrl(member.photo, 500, 650)}
                    alt={member.name}
                    fill
                    quality={60}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display text-base">{member.name}</h3>
                <p className="text-white/50 text-sm">{member.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <div className="container-px">
        <Reveal>
          <h2 className="font-display text-3xl mb-10">Galería</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Reveal
              key={i}
              delay={(i % 4) * 0.06}
              className="relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src={`https://picsum.photos/seed/elite-galeria-${i}/600/600`}
                alt="Galería Élite Estudio"
                fill
                quality={60}
                sizes="25vw"
                className="object-cover"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
