import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'

export type Crumb = { label: string; href: string }

export function Breadcrumbs({
  items,
  className = 'container-px pt-28 pb-4',
}: {
  items: Crumb[]
  className?: string
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-2 text-xs text-white/40">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              {i === items.length - 1 ? (
                <span className="text-white/60">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-accent transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
