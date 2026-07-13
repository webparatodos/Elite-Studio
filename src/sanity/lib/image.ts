import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

const FALLBACK = 'https://picsum.photos/seed/elite-placeholder/1200/800'

export function imageUrl(source: SanityImageSource | null | undefined, width?: number, height?: number): string {
  if (!source) return FALLBACK
  let img = urlFor(source).auto('format')
  if (width) img = img.width(width)
  if (height) img = img.height(height)
  return img.url()
}
