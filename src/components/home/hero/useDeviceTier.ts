'use client'

import { useMemo } from 'react'
import type { DeviceTier } from './types'

// A single unified pool — every particle is a body particle; there is no separate
// background layer. Count bumped up slightly from the previous figure-only budget now that
// there's no extra ambient overhead to spend the frame budget on.
const DESKTOP: DeviceTier = { count: 5200, dpr: 2 }
const MOBILE: DeviceTier = { count: 2000, dpr: 1 }

function detectTier(): DeviceTier {
  if (typeof window === 'undefined') return DESKTOP

  const isTouch = window.matchMedia?.('(pointer: coarse)').matches
  const narrow = window.innerWidth < 768

  return isTouch || narrow ? MOBILE : DESKTOP
}

export function useDeviceTier() {
  return useMemo(detectTier, [])
}
