import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { TALENT_QUERY } from '@/sanity/lib/queries'
import { mediaUrl } from '@/lib/media'
import { Reveal } from '@/components/Reveal'

const SOCIAL_LABEL: Record<string, string> = {
  instagram: 'IG',
  tiktok: 'TT',
  youtube: 'YT',
  x: 'X',
}

export async function TalentBlock({ heading }: { heading?: string }) {
  const talent = await client.fetch(TALENT_QUERY)
  if (!talent || talent.length === 0) return null

  return (
    <section className="container-px py-16">
      <Reveal>
        <h2 className="font-display text-3xl mb-10">{heading || 'Nuestro Roster'}</h2>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {talent.map((t: any, i: number) => (
          <Reveal key={t.id} delay={(i % 4) * 0.06}>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 group">
              <Image
                src={mediaUrl(t.photo, 500, 650)}
                alt={t.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
            </div>
            <h3 className="font-display text-base">{t.name}</h3>
            <p className="text-white/50 text-sm mb-1">{t.specialty}</p>
            {t.socialLinks && t.socialLinks.length > 0 && (
              <div className="flex gap-2">
                {t.socialLinks.map((s: any) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent hover:underline"
                  >
                    {SOCIAL_LABEL[s.platform] || s.platform}
                  </a>
                ))}
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
