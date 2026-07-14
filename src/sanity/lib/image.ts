import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

const FALLBACK = 'https://picsum.photos/seed/elite-placeholder/1200/800'

export function imageUrl(source: SanityImageSource | null | undefined, width?: number, height?: number): string {
  if (!source) return FALLBACK
  // quality(60) reduce notablemente el peso del archivo; en formato WebP/AVIF automático la pérdida
  // de calidad percibida es mínima incluso en fotos grandes de hero (recomendación PageSpeed/CWV)
  let img = urlFor(source).auto('format').quality(60)
  if (width) img = img.width(width)
  if (height) img = img.height(height)
  return img.url()
}
