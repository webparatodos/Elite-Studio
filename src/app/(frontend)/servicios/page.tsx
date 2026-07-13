import { client } from '@/sanity/lib/client'
import { SERVICES_QUERY } from '@/sanity/lib/queries'
import { ServiciosGrid } from '@/components/home/ServiciosGrid'
import { Reveal } from '@/components/Reveal'

export default async function ServiciosPage() {
  const services = await client.fetch(SERVICES_QUERY)

  return (
    <div className="pt-40">
      <div className="container-px pb-10">
        <Reveal>
          <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">Élite Estudio</p>
          <h1 className="font-display text-5xl md:text-6xl text-balance">Servicios</h1>
        </Reveal>
      </div>
      <ServiciosGrid services={services} />
    </div>
  )
}
