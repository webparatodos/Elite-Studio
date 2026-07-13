import Link from 'next/link'
import Image from 'next/image'
import { mediaUrl } from '@/lib/media'
import { Reveal } from '@/components/Reveal'

type NewsItem = {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedDate: string
  featuredImage?: any
}

export function NewsGrid({ news }: { news: NewsItem[] }) {
  return (
    <section className="container-px py-28 bg-ink-900/40">
      <Reveal>
        <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">Actualidad</p>
        <h2 className="font-display text-4xl md:text-5xl mb-14 text-balance">Novedades</h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 0.08}>
            <Link href={`/novedades/${item.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4">
                <Image
                  src={mediaUrl(item.featuredImage, 800, 600)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-2">
                {new Date(item.publishedDate).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm line-clamp-2 mb-3">{item.excerpt}</p>
              <span className="text-accent text-sm font-semibold">Leer más →</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
