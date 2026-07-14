'use client'

import { createContext, useContext, useRef, type ReactNode, type RefObject } from 'react'

export type MouseWorld = { x: number; y: number; active: number }

type HeroShared = {
  sectionRef: RefObject<HTMLElement | null>
  mouseWorld: MouseWorld
  scroll: { value: number }
  dpr: number
}

const HeroSharedCtx = createContext<HeroShared | null>(null)

export function HeroSharedProvider({
  sectionRef,
  dpr,
  children,
}: {
  sectionRef: RefObject<HTMLElement | null>
  dpr: number
  children: ReactNode
}) {
  const stateRef = useRef<HeroShared | null>(null)
  if (!stateRef.current) {
    stateRef.current = {
      sectionRef,
      mouseWorld: { x: 0, y: 0, active: 0 },
      scroll: { value: 0 },
      dpr,
    }
  }
  return <HeroSharedCtx.Provider value={stateRef.current}>{children}</HeroSharedCtx.Provider>
}

export function useHeroShared(): HeroShared {
  const ctx = useContext(HeroSharedCtx)
  if (!ctx) throw new Error('useHeroShared must be used within HeroSharedProvider')
  return ctx
}
