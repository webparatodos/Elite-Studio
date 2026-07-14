'use client'

import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { FogExp2 } from 'three'

/**
 * Particles are unlit (colour comes straight from the fragment shader), so "lighting" here
 * is really depth cueing: an exponential fog that fades far particles toward black gives a
 * cheap but convincing sense of real depth without any extra draw calls or lit materials.
 */
export function Lighting() {
  const { scene } = useThree()

  useEffect(() => {
    const fog = new FogExp2('#0a0a0b', 0.14)
    scene.fog = fog
    return () => {
      scene.fog = null
    }
  }, [scene])

  return <ambientLight intensity={0.15} />
}
