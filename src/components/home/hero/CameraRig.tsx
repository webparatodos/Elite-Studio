'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'

/**
 * Very small, heavily-damped parallax: the camera drifts a few hundredths of a unit toward
 * the pointer and breathes gently on its own — enough to read as real depth without ever
 * looking like it's chasing the cursor.
 */
export function CameraRig() {
  const { camera } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    target.current.x = state.pointer.x * 0.25
    target.current.y = state.pointer.y * 0.15

    const idleDrift = Math.sin(state.clock.elapsedTime * 0.15) * 0.05

    const damp = 1 - Math.pow(0.001, delta)
    camera.position.x += (target.current.x - camera.position.x) * damp
    camera.position.y += (target.current.y + idleDrift - camera.position.y) * damp
    camera.lookAt(0.6, 0.6, 0)
  })

  return null
}
