import { imageUrl } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'

export function mediaUrl(
  image: SanityImageSource | null | undefined,
  width?: number,
  height?: number,
): string {
  return imageUrl(image, width, height)
}
