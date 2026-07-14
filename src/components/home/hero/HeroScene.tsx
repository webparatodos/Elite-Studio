'use client'

import type { RefObject } from 'react'
import { Canvas } from '@react-three/fiber'
import { useDeviceTier } from './useDeviceTier'
import { HeroSharedProvider } from './HeroSharedContext'
import { HeroCanvasBoundary } from './HeroCanvasBoundary'
import { ParticleSystem } from './ParticleSystem'
import { CameraRig } from './CameraRig'
import { Lighting } from './Lighting'
import { MouseInteraction } from './MouseInteraction'
import { ScrollController } from './ScrollController'

export function HeroScene({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const tier = useDeviceTier()

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Static gradient base: paints instantly, remains as the fallback if WebGL fails,
          and shows through the transparent canvas as ambient background tone. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,rgba(255,46,99,0.10),rgba(10,10,11,0.98)_65%)]" />

      <HeroCanvasBoundary>
        <HeroSharedProvider sectionRef={sectionRef} dpr={tier.dpr}>
          {/* frameloop intentionally left at its default ("always") — this scene must keep
              rendering every frame, it never gates on visibility or reduced-motion. */}
          <Canvas
            className="!absolute inset-0"
            dpr={[1, tier.dpr]}
            camera={{ position: [0, 0.6, 4.6], fov: 30, near: 0.1, far: 20 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <Lighting />
            <CameraRig />
            <ParticleSystem count={tier.count} />
            <MouseInteraction />
            <ScrollController />
          </Canvas>
        </HeroSharedProvider>
      </HeroCanvasBoundary>
    </div>
  )
}
