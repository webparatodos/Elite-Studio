import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import {
  NEWS_LIST_QUERY,
  NEWS_LIST_BY_CATEGORY_QUERY,
  NEWS_COUNT_QUERY,
  NEWS_COUNT_BY_CATEGORY_QUERY,
  NEWS_CATEGORIES_QUERY,
} from '@/sanity/lib/queries'
import { NewsGrid } from '@/components/home/NewsGrid'
import { NewsCategoryFilter } from '@/components/NewsCategoryFilter'
import { Reveal } from '@/components/Reveal'

const PAGE_SIZE = 9

export default async function NovedadesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; categoria?: string }>
}) {
  const { page: pageParam, categoria } = await searchParams
  const page = Number(pageParam) || 1
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const [news, total, categories] = await Promise.all([
    categoria
      ? client.fetch(NEWS_LIST_BY_CATEGORY_QUERY, { category: categoria, start, end })
      : client.fetch(NEWS_LIST_QUERY, { start, end }),
    categoria
      ? client.fetch(NEWS_COUNT_BY_CATEGORY_QUERY, { category: categoria })
      : client.fetch(NEWS_COUNT_QUERY),
    client.fetch(NEWS_CATEGORIES_QUERY),
  ])

  const hasPrevPage = page > 1
  const hasNextPage = end < total
  const query = categoria ? `&categoria=${categoria}` : ''

  return (
    <div className="pt-40">
      <div className="container-px pb-8">
        <Reveal>
          <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">Élite Estudio</p>
          <h1 className="font-display text-5xl md:text-6xl text-balance mb-10">Novedades</h1>
        </Reveal>
        <NewsCategoryFilter categories={categories || []} />
      </div>

      <NewsGrid news={news} />

      <div className="container-px pb-24 flex justify-center gap-4">
        {hasPrevPage && (
          <Link
            href={`/novedades?page=${page - 1}${query}`}
            className="px-6 py-3 rounded-full border border-white/20 hover:border-accent hover:text-accent transition-colors text-sm"
          >
            ← Anterior
          </Link>
        )}
        {hasNextPage && (
          <Link
            href={`/novedades?page=${page + 1}${query}`}
            className="px-6 py-3 rounded-full border border-white/20 hover:border-accent hover:text-accent transition-colors text-sm"
          >
            Siguiente →
          </Link>
        )}
      </div>
    </div>
  )
}
