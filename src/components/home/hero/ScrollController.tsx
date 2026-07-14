'use client'

import { useFrame } from '@react-three/fiber'
import { useHeroShared } from './HeroSharedContext'

/** Tracks how far the user has scrolled past the hero (0 = fully in view, 1 = scrolled past)
 * so ParticleSystem can lift + fade the figure instead of a flat opacity fade. Read-only side
 * effect on a shared ref — never pauses or gates the animation loop itself. */
export function ScrollController() {
  const { sectionRef, scroll } = useHeroShared()

  useFrame((_, delta) => {
    const el = sectionRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const progress = rect.top >= 0 ? 0 : Math.min(1, -rect.top / (rect.height * 0.9))
    scroll.value += (progress - scroll.value) * Math.min(1, delta * 5)
  })

  return null
}
