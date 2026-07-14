import type { ParticleData } from './types'

/**
 * Builds ONE dancer silhouette (filled volume, not an outline) from tapered "limb" ribbons —
 * a spine curve (quadratic Bezier) plus a width profile along its length, with particles
 * filling the full cross-section and biased toward denser regions (head/chest/hips/thighs)
 * and thinner ones (arms/forearms/calves). There is no separate "background" particle pool:
 * every particle returned here belongs to the body, and its own resting/disperse position is
 * a small cloud around its OWN spot on the body — so the dispersed cloud and the formed
 * figure are the same set of points sharing the same visual center.
 */

export const PART_ID = {
  head: 0,
  neck: 1,
  torso: 2,
  armRaised: 3,
  armOpen: 4,
  legSupport: 5,
  legRaised: 6,
  skirt: 7,
} as const

/** Formation stagger: low = forms first / dissolves last. Order requested: head, torso, arms,
 * legs, then fine detail (skirt). */
const PART_DELAY: Record<keyof typeof PART_ID, number> = {
  head: 0,
  neck: 0.08,
  torso: 0.26,
  armOpen: 0.46,
  armRaised: 0.5,
  legSupport: 0.7,
  legRaised: 0.74,
  skirt: 1.0,
}

type Vec3 = [number, number, number]

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(4242)

function quadraticBezier(p0: Vec3, p1: Vec3, p2: Vec3, t: number): Vec3 {
  const u = 1 - t
  return [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
    u * u * p0[2] + 2 * u * t * p1[2] + t * t * p2[2],
  ]
}

function quadraticBezierTangent(p0: Vec3, p1: Vec3, p2: Vec3, t: number): Vec3 {
  return [
    2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]),
    2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]),
    2 * (1 - t) * (p1[2] - p0[2]) + 2 * t * (p2[2] - p1[2]),
  ]
}

/** Cheap smooth pseudo-noise (sum of a few sines) — an organic, low-frequency wobble rather
 * than per-pixel static, so the silhouette's edge ripples gently along its length. */
function smoothNoise(t: number, seed: number): number {
  return Math.sin(t * 17.1 + seed) * 0.5 + Math.sin(t * 41.3 + seed * 2.7) * 0.3 + Math.sin(t * 83.7 + seed * 5.1) * 0.2
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function smoothstep01(t: number): number {
  const c = Math.min(1, Math.max(0, t))
  return c * c * (3 - 2 * c)
}

/** Piecewise width along a limb, eased (not linear) between keyframes so the taper reads as
 * an organic curve rather than a faceted, "mathematical" polygon. */
function widthAt(keyframes: Array<[number, number]>, t: number): number {
  for (let i = 0; i < keyframes.length - 1; i++) {
    const [t0, w0] = keyframes[i]
    const [t1, w1] = keyframes[i + 1]
    if (t >= t0 && t <= t1) return lerp(w0, w1, smoothstep01((t - t0) / (t1 - t0 || 1)))
  }
  return keyframes[keyframes.length - 1][1]
}

// --- Landmarks (figure-local space: y up, origin at the supporting foot) -------------------

export const HIP: Vec3 = [0, 0.5, 0]
const WAIST: Vec3 = [0, 0.62, 0.01]
export const CHEST: Vec3 = [0, 0.78, 0.01]
const NECK_TOP: Vec3 = [0, 0.835, 0.01]
const HEAD_CENTER: Vec3 = [0, 0.917, 0.01]
const HEAD_RADIUS = 0.066
export const SUPPORT_FOOT: Vec3 = [0.03, 0.0, 0.015]

// Shoulders carry a slight tilt (one higher than the other).
const SHOULDER_L: Vec3 = [-0.11, 0.765, 0.01]
export const SHOULDER_R: Vec3 = [0.11, 0.79, 0.015]

// One arm raised gracefully above the head (looping outward first so it never overlaps the
// head circle), the other open to the side with a soft downward curve.
const ARM_RAISED: [Vec3, Vec3, Vec3] = [SHOULDER_R, [0.3, 0.95, 0.02], [0.16, 1.22, 0.0]]
const ARM_OPEN: [Vec3, Vec3, Vec3] = [SHOULDER_L, [-0.33, 0.66, 0.05], [-0.5, 0.48, 0.07]]

// Supporting leg: fully extended, straight down, close to the body's centerline.
const LEG_SUPPORT: [Vec3, Vec3, Vec3] = [[0.05, 0.5, 0], [0.045, 0.25, 0.01], SUPPORT_FOOT]
// Raised leg: attitude à la seconde — kicked out clearly to the side (not just back in Z,
// which would hide behind the support leg from the front) with the knee bent and the foot
// curling back up toward waist height.
const LEG_RAISED: [Vec3, Vec3, Vec3] = [[-0.05, 0.5, 0], [-0.32, 0.56, 0.06], [-0.2, 0.76, 0.16]]

const TORSO: [Vec3, Vec3, Vec3] = [HIP, [0.015, 0.62, 0.015], CHEST]

// A feminine hourglass: wider hips, marked waist, gentle bust curve, narrower shoulder line.
const TORSO_WIDTH: Array<[number, number]> = [
  [0, 0.205], // hips
  [0.16, 0.195], // high hip / glute curve
  [0.42, 0.1], // waist — clearly marked
  [0.68, 0.145], // under-bust
  [0.85, 0.16], // bust
  [1, 0.14], // shoulder line
]
const ARM_WIDTH: Array<[number, number]> = [
  [0, 0.072],
  [0.5, 0.046],
  [1, 0.028],
]
const LEG_WIDTH: Array<[number, number]> = [
  [0, 0.128], // upper thigh
  [0.18, 0.148], // thigh/glute bulge — the widest point
  [0.5, 0.078], // knee
  [0.72, 0.066], // calf bulge
  [1, 0.038], // ankle
]
const NECK_WIDTH: Array<[number, number]> = [
  [0, 0.05],
  [1, 0.042],
]

type Sample = { pos: Vec3; t: number }

/** Non-uniform t sampling via rejection sampling — lets a limb be visibly denser in one
 * region (e.g. thigh) than another (e.g. calf) instead of a flat particle-per-length rate. */
function sampleTByDensity(n: number, densityFn: (t: number) => number): number[] {
  const ts: number[] = []
  let attempts = 0
  while (ts.length < n && attempts < n * 40) {
    attempts++
    const t = rand()
    if (rand() < densityFn(t)) ts.push(t)
  }
  while (ts.length < n) ts.push(rand())
  return ts
}

/** Fills a tapered ribbon around a spine curve — the core building block that gives every
 * limb real volume instead of a single traced line. */
function sampleLimb(
  curve: [Vec3, Vec3, Vec3],
  n: number,
  widthKeyframes: Array<[number, number]>,
  seed: number,
  densityFn?: (t: number) => number,
): Sample[] {
  const out: Sample[] = []
  const ts = densityFn ? sampleTByDensity(n, densityFn) : Array.from({ length: n }, (_, i) => (n <= 1 ? 0.5 : i / (n - 1)))

  for (let i = 0; i < n; i++) {
    const t = ts[i]
    const center = quadraticBezier(curve[0], curve[1], curve[2], t)
    const tangent = quadraticBezierTangent(curve[0], curve[1], curve[2], t)

    let px = -tangent[1]
    let py = tangent[0]
    const plen = Math.hypot(px, py) || 1
    px /= plen
    py /= plen

    const baseWidth = widthAt(widthKeyframes, t)
    const wobble = 1 + smoothNoise(t * 6.0, seed) * 0.16
    const w = baseWidth * wobble

    // Fill the cross-section (mild center bias) rather than tracing only the edge.
    const u = rand() * 2 - 1
    const r = Math.sign(u) * Math.pow(Math.abs(u), 0.85)
    const radial = r * (w / 2)
    const fineJitter = (rand() - 0.5) * w * 0.18
    const depthJitter = (rand() - 0.5) * w * 0.45

    out.push({
      pos: [center[0] + px * (radial + fineJitter), center[1] + py * (radial + fineJitter), center[2] + depthJitter],
      t,
    })
  }
  return out
}

/** Filled disc (not a ring) so the head reads as a solid round volume. */
function sampleHead(center: Vec3, radius: number, n: number): Sample[] {
  const out: Sample[] = []
  for (let i = 0; i < n; i++) {
    const a = rand() * Math.PI * 2
    const rr = radius * Math.sqrt(rand()) * (1 + smoothNoise(a, 3.1) * 0.06)
    out.push({
      pos: [center[0] + Math.cos(a) * rr, center[1] + Math.sin(a) * rr * 0.94, center[2] + (rand() - 0.5) * radius * 0.8],
      t: i / n,
    })
  }
  return out
}

/** A soft flared hem hugging the waist — just enough to hint at a skirt caught mid-turn,
 * not a starburst of confetti. Stays close to the body (small radius) and biased to the
 * front/sides rather than a full ring, so it reads as fabric, not noise. */
function sampleSkirt(center: Vec3, n: number): Sample[] {
  const out: Sample[] = []
  const baseR = 0.1
  const flare = 0.07
  const angleStart = -Math.PI * 0.55
  const angleSpan = Math.PI * 1.1
  for (let i = 0; i < n; i++) {
    const t = n <= 1 ? 0.5 : i / (n - 1)
    const a = angleStart + angleSpan * t + (rand() - 0.5) * 0.18
    const flareAmt = (baseR + flare * (0.5 + 0.5 * Math.sin(a * 1.4))) * (0.8 + rand() * 0.3)
    const y = center[1] - 0.04 + (rand() - 0.5) * 0.05 - Math.abs(t - 0.5) * 0.04
    out.push({ pos: [center[0] + Math.cos(a) * flareAmt, y, center[2] + Math.sin(a) * flareAmt * 0.6], t })
  }
  return out
}

// Density bias functions: >1 keeps more candidates in that region (denser), <1 thins it out.
const torsoDensity = (t: number) => {
  // dense at hips (t~0) and bust/chest (t~0.85), lighter at the waist (t~0.42)
  const waistDip = Math.exp(-Math.pow((t - 0.42) / 0.16, 2)) * 0.55
  const chestBump = Math.exp(-Math.pow((t - 0.85) / 0.2, 2)) * 0.3
  const hipBump = Math.exp(-Math.pow(t / 0.22, 2)) * 0.3
  return Math.min(1, 0.65 + chestBump + hipBump - waistDip)
}
const legDensity = (t: number) => {
  // dense through the thigh (t<0.4), thinning toward the calf/ankle
  if (t < 0.35) return 1
  if (t < 0.6) return 0.72
  return 0.42
}
const armDensity = (t: number) => {
  // slightly denser near the shoulder, thinning toward the forearm/hand
  if (t < 0.4) return 0.85
  return 0.55
}

const PART_WEIGHTS: Array<{ part: keyof typeof PART_ID; weight: number }> = [
  { part: 'head', weight: 0.09 },
  { part: 'neck', weight: 0.025 },
  { part: 'torso', weight: 0.26 },
  { part: 'armRaised', weight: 0.095 },
  { part: 'armOpen', weight: 0.105 },
  { part: 'legSupport', weight: 0.19 },
  { part: 'legRaised', weight: 0.19 },
  { part: 'skirt', weight: 0.045 },
]

function buildSilhouette(totalCount: number) {
  const positions: Vec3[] = []
  const tParams: number[] = []
  const partIds: number[] = []

  for (const { part, weight } of PART_WEIGHTS) {
    const n = Math.max(20, Math.round(totalCount * weight))
    let samples: Sample[]

    switch (part) {
      case 'head':
        samples = sampleHead(HEAD_CENTER, HEAD_RADIUS, n)
        break
      case 'neck':
        samples = sampleLimb([CHEST, [0.002, 0.807, 0.01], NECK_TOP], n, NECK_WIDTH, 9.4)
        break
      case 'torso':
        samples = sampleLimb(TORSO, n, TORSO_WIDTH, 1.7, torsoDensity)
        break
      case 'armRaised':
        samples = sampleLimb(ARM_RAISED, n, ARM_WIDTH, 5.2, armDensity)
        break
      case 'armOpen':
        samples = sampleLimb(ARM_OPEN, n, ARM_WIDTH, 8.8, armDensity)
        break
      case 'legSupport':
        samples = sampleLimb(LEG_SUPPORT, n, LEG_WIDTH, 2.3, legDensity)
        break
      case 'legRaised':
        samples = sampleLimb(LEG_RAISED, n, LEG_WIDTH, 6.6, legDensity)
        break
      case 'skirt':
        samples = sampleSkirt(WAIST, n)
        break
    }

    for (const s of samples) {
      positions.push(s.pos)
      tParams.push(s.t)
      partIds.push(PART_ID[part])
    }
  }

  return { positions, tParams, partIds }
}

export function generateParticleData(totalCount: number): ParticleData {
  const { positions, tParams, partIds } = buildSilhouette(totalCount)
  const count = positions.length

  const targetLocal = new Float32Array(count * 3)
  const tParam = new Float32Array(count)
  const partId = new Float32Array(count)
  const formationDelay = new Float32Array(count)
  const dispersedBase = new Float32Array(count * 3)
  const drift = new Float32Array(count * 7)
  const size = new Float32Array(count)
  const color = new Float32Array(count * 3)

  const PINK: Vec3 = [1.0, 0.18, 0.39]
  const WHITE: Vec3 = [1.0, 1.0, 1.0]

  const partNameById = Object.fromEntries(Object.entries(PART_ID).map(([k, v]) => [v, k])) as Record<number, keyof typeof PART_ID>

  const setDrift = (i: number) => {
    drift[i * 7 + 0] = 0.06 + rand() * 0.1
    drift[i * 7 + 1] = 0.05 + rand() * 0.08
    drift[i * 7 + 2] = 0.05 + rand() * 0.09
    drift[i * 7 + 3] = rand() * Math.PI * 2
    drift[i * 7 + 4] = rand() * Math.PI * 2
    drift[i * 7 + 5] = rand() * Math.PI * 2
    drift[i * 7 + 6] = 0.7 + rand() * 0.6
  }

  for (let i = 0; i < count; i++) {
    const p = positions[i]
    targetLocal[i * 3] = p[0]
    targetLocal[i * 3 + 1] = p[1]
    targetLocal[i * 3 + 2] = p[2]
    const t = tParams[i]
    tParam[i] = t
    partId[i] = partIds[i]

    const partName = partNameById[partIds[i]]
    // Group-level stagger (per body part) plus a small per-point jitter along the limb (t)
    // so a part grows outward from its anchor rather than popping in as one rigid block.
    const jitter = (t - 0.5) * 0.16 + (rand() - 0.5) * 0.08
    formationDelay[i] = Math.min(1, Math.max(0, PART_DELAY[partName] + jitter))

    // Disperses into a tight cloud around this particle's OWN resting spot — same visual
    // center as the formed figure, never drifting to a different part of the hero.
    const scatter = 0.85
    dispersedBase[i * 3] = p[0] + (rand() - 0.5) * scatter * 2
    dispersedBase[i * 3 + 1] = p[1] + (rand() - 0.5) * scatter * 2
    dispersedBase[i * 3 + 2] = p[2] + (rand() - 0.5) * scatter * 1.3

    setDrift(i)

    const isPink = rand() < 0.7
    const c = isPink ? PINK : WHITE
    // Depth-based brightness: particles toward the front (larger local z) read slightly
    // brighter, back ones slightly dimmer — a cheap pseudo-lighting cue so the body reads
    // as a volume instead of a flat cutout.
    const depthShade = 0.82 + Math.min(1, Math.max(-1, p[2] / 0.22)) * 0.18 + 0.15
    color[i * 3] = c[0] * depthShade
    color[i * 3 + 1] = c[1] * depthShade
    color[i * 3 + 2] = c[2] * depthShade

    size[i] = 2.4 + rand() * 1.1 // ~20% smaller than the previous generation, denser packing
  }

  return { count, targetLocal, tParam, partId, formationDelay, dispersedBase, drift, size, color }
}
