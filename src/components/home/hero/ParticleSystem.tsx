'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { BufferAttribute, BufferGeometry, ShaderMaterial } from 'three'
import { CHEST, generateParticleData, HIP, PART_ID, SHOULDER_R, SUPPORT_FOOT } from './ParticleMorph'
import { particleFragmentShader, particleVertexShader } from './shaders'
import { useHeroShared } from './HeroSharedContext'
import { computeDanceEnvelope, computeParticleFormation } from './cycle'

// Places the figure at ~70% of the hero's width and ~42% of its height, sized to ~45% of the
// hero's visible height — tuned against the camera in HeroScene/CameraRig.
export const FIGURE_SCALE = 0.95
export const FIGURE_OFFSET: [number, number, number] = [1.54, 0.21, 0]

const MOUSE_RADIUS = 0.9
const MOUSE_FORCE = 0.4

function rotateAroundPivot(x: number, y: number, pivotX: number, pivotY: number, angle: number): [number, number] {
  const relX = x - pivotX
  const relY = y - pivotY
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return [pivotX + relX * c - relY * s, pivotY + relX * s + relY * c]
}

export function ParticleSystem({ count }: { count: number }) {
  const { mouseWorld, scroll, dpr } = useHeroShared()
  const geometryRef = useRef<BufferGeometry>(null)
  const materialRef = useRef<ShaderMaterial>(null)

  const data = useMemo(() => generateParticleData(count), [count])
  const positions = useMemo(() => data.dispersedBase.slice(), [data])

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime
    const danceEnvelope = computeDanceEnvelope(elapsed)

    // Small, continuous "alive" motions — never a big swing. `danceEnvelope` just nudges
    // their amplitude up a little during the dance window instead of driving a separate
    // large movement.
    const breathing = Math.sin(elapsed * 1.3) * 0.018
    const swayAngle = Math.sin(elapsed * 0.45) * 0.03 * (1 + danceEnvelope * 0.7)
    const shoulderAngle = Math.sin(elapsed * 0.6) * 0.045 * (1 + danceEnvelope * 0.6)
    const armMoveAngle = Math.sin(elapsed * 0.9 + 1.3) * 0.08 * (1 + danceEnvelope * 0.8)
    const hipSwayAngle = Math.sin(elapsed * 0.35 + 0.7) * 0.022 * (1 + danceEnvelope * 0.4)
    const legMoveAngle = Math.sin(elapsed * 0.7 + 0.4) * 0.05 * (1 + danceEnvelope * 0.5)
    const skirtSwayAmp = 0.05 * (1 + danceEnvelope * 0.5)

    const mouseActive = mouseWorld.active
    const scrollLift = scroll.value

    const { targetLocal, tParam, partId, formationDelay, dispersedBase, drift } = data

    for (let i = 0; i < data.count; i++) {
      const i3 = i * 3
      const i7 = i * 7

      const formation = computeParticleFormation(elapsed, formationDelay[i])

      // dispersedBase is stored in figure-local units (same space as targetLocal), so it must
      // go through the exact same scale+offset as the formed pose — otherwise the dispersed
      // cloud and the formed figure render in two different places (the original bug here).
      const ampVar = drift[i7 + 6]
      const dispBaseX = dispersedBase[i3] * FIGURE_SCALE + FIGURE_OFFSET[0]
      const dispBaseY = dispersedBase[i3 + 1] * FIGURE_SCALE + FIGURE_OFFSET[1]
      const dispBaseZ = dispersedBase[i3 + 2] * FIGURE_SCALE + FIGURE_OFFSET[2]
      const dispX = dispBaseX + Math.sin(elapsed * drift[i7 + 0] + drift[i7 + 3]) * 0.11 * ampVar
      const dispY = dispBaseY + Math.sin(elapsed * drift[i7 + 1] + drift[i7 + 4]) * 0.18 * ampVar
      const dispZ = dispBaseZ + Math.sin(elapsed * drift[i7 + 2] + drift[i7 + 5]) * 0.13 * ampVar

      let lx = targetLocal[i3]
      let ly = targetLocal[i3 + 1]
      let lz = targetLocal[i3 + 2]
      const t = tParam[i]
      const part = partId[i]

      if (part === PART_ID.torso) {
        ly += breathing
      }

      // Hip sway: rotates the pelvis/legRaised/skirt/torso/arms/head around the planted
      // support foot, like a subtle weight shift — the support leg itself stays put so it
      // still reads as "fully extended and grounded".
      if (part !== PART_ID.legSupport) {
        ;[lx, ly] = rotateAroundPivot(lx, ly, SUPPORT_FOOT[0], SUPPORT_FOOT[1], hipSwayAngle)
      }

      // Torso "balanceo": sways the whole upper body (torso/neck/head/arms/skirt) gently
      // from the hip.
      if (
        part === PART_ID.torso ||
        part === PART_ID.neck ||
        part === PART_ID.head ||
        part === PART_ID.armRaised ||
        part === PART_ID.armOpen ||
        part === PART_ID.skirt
      ) {
        ;[lx, ly] = rotateAroundPivot(lx, ly, HIP[0], HIP[1], swayAngle)
      }

      // Small shoulder-girdle rotation carries the head/neck/arms.
      if (part === PART_ID.armRaised || part === PART_ID.armOpen || part === PART_ID.head || part === PART_ID.neck) {
        ;[lx, ly] = rotateAroundPivot(lx, ly, CHEST[0], CHEST[1], shoulderAngle)
      }

      // The raised arm additionally drifts a few degrees on its own, pivoting from the
      // shoulder (t=0) so the hand (t=1) moves the most.
      if (part === PART_ID.armRaised) {
        ;[lx, ly] = rotateAroundPivot(lx, ly, SHOULDER_R[0], SHOULDER_R[1], armMoveAngle * t)
      }

      // The raised (attitude) leg shifts a few degrees around the hip.
      if (part === PART_ID.legRaised) {
        ;[lx, ly] = rotateAroundPivot(lx, ly, HIP[0], HIP[1], legMoveAngle * t)
      }

      if (part === PART_ID.skirt) {
        const phase = elapsed * 1.1 + t * Math.PI * 2
        lx += Math.sin(phase) * skirtSwayAmp
        lz += Math.cos(phase) * skirtSwayAmp * 0.6
      }

      const worldX = lx * FIGURE_SCALE + FIGURE_OFFSET[0]
      const worldY = ly * FIGURE_SCALE + FIGURE_OFFSET[1]
      const worldZ = lz * FIGURE_SCALE + FIGURE_OFFSET[2]

      let finalX = dispX + (worldX - dispX) * formation
      let finalY = dispY + (worldY - dispY) * formation
      let finalZ = dispZ + (worldZ - dispZ) * formation

      if (mouseActive > 0.01) {
        const dx = finalX - mouseWorld.x
        const dy = finalY - mouseWorld.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0.0001) {
          const f = (1 - dist / MOUSE_RADIUS) * mouseActive
          finalX += (dx / dist) * f * MOUSE_FORCE
          finalY += (dy / dist) * f * MOUSE_FORCE
        }
      }

      finalY += scrollLift * (2.2 + ampVar)

      positions[i3] = finalX
      positions[i3 + 1] = finalY
      positions[i3 + 2] = finalZ
    }

    const geom = geometryRef.current
    if (geom) {
      const posAttr = geom.attributes.position as BufferAttribute
      posAttr.needsUpdate = true
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uPixelRatio.value = dpr
      materialRef.current.uniforms.uOpacity.value = Math.max(0, 1 - scrollLift * 1.1)
    }
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[data.size, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[data.color, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={{ uPixelRatio: { value: dpr }, uOpacity: { value: 1 } }}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        transparent
        depthWrite={false}
      />
    </points>
  )
}
