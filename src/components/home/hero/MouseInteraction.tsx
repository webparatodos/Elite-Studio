'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { useHeroShared } from './HeroSharedContext'

/**
 * Projects the pointer onto the z=0 world plane every frame and writes the result into the
 * shared `mouseWorld` ref that ParticleSystem reads during its own per-frame position pass.
 *
 * `state.pointer` in R3F defaults to (0, 0) — the canvas center — until the very first real
 * pointer event, which is indistinguishable from "the mouse is genuinely resting at the
 * center". Gating on that alone made the repulsion active at full strength from frame one for
 * every visitor, constantly nudging the formed silhouette apart. Instead we track real
 * `pointerenter`/`pointerleave` DOM events on the canvas itself, so `active` only ramps up
 * once the cursor has actually entered, and decays back to 0 once it leaves.
 */
export function MouseInteraction() {
  const { mouseWorld } = useHeroShared()
  const { camera, gl } = useThree()

  const rayDir = useRef(new Vector3())
  const worldPoint = useRef(new Vector3())
  const isOver = useRef(false)

  useEffect(() => {
    const dom = gl.domElement
    const handleEnter = () => {
      isOver.current = true
    }
    const handleLeave = () => {
      isOver.current = false
    }
    dom.addEventListener('pointerenter', handleEnter)
    dom.addEventListener('pointermove', handleEnter)
    dom.addEventListener('pointerleave', handleLeave)
    dom.addEventListener('pointercancel', handleLeave)
    return () => {
      dom.removeEventListener('pointerenter', handleEnter)
      dom.removeEventListener('pointermove', handleEnter)
      dom.removeEventListener('pointerleave', handleLeave)
      dom.removeEventListener('pointercancel', handleLeave)
    }
  }, [gl])

  useFrame((state) => {
    const { pointer } = state

    rayDir.current.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize()
    const distance = rayDir.current.z !== 0 ? -camera.position.z / rayDir.current.z : 0
    worldPoint.current.copy(camera.position).addScaledVector(rayDir.current, distance)

    mouseWorld.x = worldPoint.current.x
    mouseWorld.y = worldPoint.current.y
    mouseWorld.active += ((isOver.current ? 1 : 0) - mouseWorld.active) * 0.15
  })

  return null
}
