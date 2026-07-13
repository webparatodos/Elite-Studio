'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toEmbedUrl, isDirectVideoFile } from '@/lib/video'

type PortfolioItem = {
  id: string
  title: string
  type: 'video' | 'foto' | 'diseno'
  image?: any
  videoUrl?: string
  description?: string
  imageSrc: string
}

export function PortfolioLightbox({ items }: { items: PortfolioItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex !== null ? items[activeIndex] : null

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square rounded-xl overflow-hidden text-left"
          >
            <Image
              src={item.imageSrc}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/50 transition-colors flex items-end p-4">
              <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                {item.type === 'video' ? '▶ ' : ''}
                {item.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ink-950/95 flex items-center justify-center p-6"
            onClick={() => setActiveIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-3xl text-white/80 hover:text-white"
              onClick={() => setActiveIndex(null)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              {active.type === 'video' && active.videoUrl ? (
                <VideoPlayer url={active.videoUrl} />
              ) : (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden">
                  <Image src={active.imageSrc} alt={active.title} fill className="object-contain" />
                </div>
              )}
              <p className="text-white font-display text-xl mt-4">{active.title}</p>
              {active.description && <p className="text-white/60 text-sm mt-1">{active.description}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function VideoPlayer({ url }: { url: string }) {
  const embed = toEmbedUrl(url)
  if (embed) {
    return (
      <div className="relative aspect-video w-full rounded-xl overflow-hidden">
        <iframe
          src={embed}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }
  if (isDirectVideoFile(url)) {
    return (
      <video controls autoPlay className="w-full rounded-xl">
        <source src={url} />
      </video>
    )
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent underline">
      Ver vídeo
    </a>
  )
}
