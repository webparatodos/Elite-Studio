import Link from 'next/link'

type SiteSettings = {
  siteName?: string | null
  footerText?: string | null
  socialLinks?: { platform: string; url: string }[] | null
  emails?: string[] | null
  phones?: string[] | null
}

const SOCIAL_LABEL: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  x: 'X',
}

export function Footer({ siteSettings }: { siteSettings: SiteSettings }) {
  return (
    <footer className="border-t border-white/5 bg-ink-900">
      <div className="container-px py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-xl mb-3">{siteSettings?.siteName || 'ÉLITE ESTUDIO'}</p>
          <p className="text-white/50 text-sm leading-relaxed">
            {siteSettings?.footerText ||
              'Estudio de danza y productora audiovisual en Madrid. Formación, producción y espacios para creadores.'}
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-white/40 mb-4">Contacto</p>
          <ul className="space-y-2 text-sm text-white/70">
            {siteSettings?.phones?.map((phone) => <li key={phone}>{phone}</li>)}
            {siteSettings?.emails?.map((email) => <li key={email}>{email}</li>)}
          </ul>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-white/40 mb-4">Legal</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/legal/privacidad" className="hover:text-accent transition-colors">
                Política de Privacidad
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" className="hover:text-accent transition-colors">
                Política de Cookies
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-white/40 mb-4">Síguenos</p>
          <ul className="space-y-2 text-sm text-white/70">
            {siteSettings?.socialLinks?.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {SOCIAL_LABEL[s.platform] || s.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <p className="container-px text-xs text-white/30">
          © {new Date().getFullYear()} {siteSettings?.siteName || 'Élite Estudio'}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  )
}
