import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { ContactSection } from '@/components/ContactSection'
import { Reveal } from '@/components/Reveal'

export default async function ContactoPage() {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY)

  return (
    <div className="pt-40">
      <div className="container-px pb-4">
        <Reveal>
          <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">Élite Estudio</p>
          <h1 className="font-display text-5xl md:text-6xl text-balance">Contacto</h1>
        </Reveal>
      </div>
      <ContactSection siteSettings={siteSettings} />
    </div>
  )
}
