import { Reveal } from '@/components/Reveal'
import { ContactForm } from '@/components/ContactForm'

type SiteSettings = {
  phones?: string[] | null
  emails?: string[] | null
  address?: string | null
  mapEmbedUrl?: string | null
  socialLinks?: { platform: string; url: string }[] | null
}

const SOCIAL_LABEL: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  x: 'X',
}

export function ContactSection({ siteSettings }: { siteSettings: SiteSettings }) {
  return (
    <section id="contacto" className="container-px py-28 grid grid-cols-1 lg:grid-cols-2 gap-14">
      <Reveal>
        <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">Hablemos</p>
        <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">Contacto</h2>
        <p className="text-white/60 leading-relaxed mb-8 max-w-md">
          ¿Quieres reservar una clase, alquilar una sala o hablar de tu próximo proyecto
          audiovisual? Escríbenos, llámanos o pásate por el estudio en Madrid. Respondemos en un
          plazo máximo de 24-48 horas laborables.
        </p>

        <div className="space-y-2 mb-8 text-white/70">
          {siteSettings?.address && <p>{siteSettings.address}</p>}
          {siteSettings?.phones?.map((phone) => <p key={phone}>{phone}</p>)}
          {siteSettings?.emails?.map((email) => <p key={email}>{email}</p>)}
        </div>

        {siteSettings?.socialLinks && siteSettings.socialLinks.length > 0 && (
          <div className="flex gap-4 mb-10">
            {siteSettings.socialLinks.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 hover:border-accent hover:text-accent transition-colors text-xs"
              >
                {(SOCIAL_LABEL[s.platform] || s.platform).slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        )}

        <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
          <iframe
            title="Ubicación Élite Estudio"
            src={
              siteSettings?.mapEmbedUrl ||
              'https://www.google.com/maps?q=Madrid,Spain&output=embed'
            }
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="bg-ink-900 border border-white/10 rounded-2xl p-8">
          <ContactForm />
        </div>
      </Reveal>
    </section>
  )
}
