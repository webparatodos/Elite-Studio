import type { Metadata } from 'next'
import { imageUrl } from '@/sanity/lib/image'
import { SITE_URL } from '@/lib/site'

type SeoField = {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: any
  noIndex?: boolean | null
} | null | undefined

const SITE_NAME = 'Élite Estudio'

export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
  path,
}: {
  seo?: SeoField
  fallbackTitle: string
  fallbackDescription?: string | null
  fallbackImage?: any
  /** Ruta relativa (ej. "/servicios/clases-de-baile") para el canonical tag. */
  path?: string
}): Metadata {
  const title = seo?.metaTitle || fallbackTitle
  const description = seo?.metaDescription || fallbackDescription || undefined
  const image = seo?.ogImage || fallbackImage
  const imageSrc = image ? imageUrl(image, 1200, 630) : undefined

  // Solo añadimos "| Élite Estudio" si el resultado sigue cabiendo en ~60 caracteres
  // (recomendación SEO); títulos de contenido ya largos (ej. noticias) se dejan tal cual.
  const suffixed = `${title} | ${SITE_NAME}`
  const pageTitle = suffixed.length <= 60 ? suffixed : title

  return {
    title: pageTitle,
    description,
    alternates: path ? { canonical: `${SITE_URL}${path}` } : undefined,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      url: path ? `${SITE_URL}${path}` : undefined,
      images: imageSrc ? [{ url: imageSrc, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageSrc ? [imageSrc] : undefined,
    },
  }
}
