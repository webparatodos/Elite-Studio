export function toEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`

  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`

  return null
}

export function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg)$/i.test(url)
}
