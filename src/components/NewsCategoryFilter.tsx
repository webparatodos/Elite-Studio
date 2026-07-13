'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const CATEGORY_LABEL: Record<string, string> = {
  baile: 'Baile',
  audiovisual: 'Audiovisual',
  eventos: 'Eventos',
  formacion: 'Formación',
  agencia: 'Agencia',
}

export function NewsCategoryFilter({ categories }: { categories: string[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('categoria')

  const setCategory = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) params.set('categoria', category)
    else params.delete('categoria')
    params.delete('page')
    router.push(`/novedades${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false })
  }

  if (categories.length === 0) return null

  return (
    <div className="container-px flex flex-wrap gap-3 mb-10">
      <button
        onClick={() => setCategory(null)}
        className={`px-4 py-2 rounded-full text-sm border transition-colors ${
          !active ? 'bg-accent border-accent text-white' : 'border-white/20 text-white/60 hover:border-white/40'
        }`}
      >
        Todas
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm border transition-colors ${
            active === cat
              ? 'bg-accent border-accent text-white'
              : 'border-white/20 text-white/60 hover:border-white/40'
          }`}
        >
          {CATEGORY_LABEL[cat] || cat}
        </button>
      ))}
    </div>
  )
}
