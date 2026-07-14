/**
 * Pure, framework-free timing for the loop. `computeParticleFormation` is evaluated once per
 * particle per frame — each particle carries a `delay` in [0,1] (low = head, high = fine
 * detail) so the silhouette assembles head-first, then torso, arms, legs, and finally the
 * skirt wisps, and dissolves in the exact reverse order — instead of every particle
 * arriving/leaving in lockstep.
 */

export const PHASE = {
  disperseEnd: 1.5,
  formEnd: 4.0,
  holdEnd: 6.0,
  danceEnd: 9.0,
  dissolveEnd: 11.0,
}

export const CYCLE_DURATION = PHASE.dissolveEnd

const FORM_STAGGER_WINDOW = 1.5 // spread of start-times across delay=0..1, within formEnd-disperseEnd=2.5s
const FORM_PARTICLE_DURATION = 1.0 // how long each particle itself takes once it starts
const DISSOLVE_STAGGER_WINDOW = 1.2 // within danceEnd..dissolveEnd=2.0s
const DISSOLVE_PARTICLE_DURATION = 0.8

function smoothstep01(t: number): number {
  const c = Math.min(1, Math.max(0, t))
  return c * c * (3 - 2 * c)
}

/** 0..1..0 envelope shaping the arm/leg/hip movement amplitude — peaks mid dance window. */
export function computeDanceEnvelope(elapsedSeconds: number): number {
  const ct = elapsedSeconds % CYCLE_DURATION
  if (ct >= PHASE.holdEnd && ct < PHASE.danceEnd) {
    const danceT = (ct - PHASE.holdEnd) / (PHASE.danceEnd - PHASE.holdEnd)
    return Math.sin(Math.PI * danceT)
  }
  return 0
}

/** Per-particle formation amount (0 = dispersed, 1 = in place), staggered by `delay`. */
export function computeParticleFormation(elapsedSeconds: number, delay: number): number {
  const ct = elapsedSeconds % CYCLE_DURATION
  const d = Math.min(1, Math.max(0, delay))

  if (ct < PHASE.disperseEnd) return 0

  if (ct < PHASE.formEnd) {
    const localStart = PHASE.disperseEnd + d * FORM_STAGGER_WINDOW
    return smoothstep01((ct - localStart) / FORM_PARTICLE_DURATION)
  }

  if (ct < PHASE.danceEnd) return 1

  if (ct < PHASE.dissolveEnd) {
    const localStart = PHASE.danceEnd + (1 - d) * DISSOLVE_STAGGER_WINDOW
    return 1 - smoothstep01((ct - localStart) / DISSOLVE_PARTICLE_DURATION)
  }

  return 0
}
