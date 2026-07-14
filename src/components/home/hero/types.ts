export type DeviceTier = {
  count: number
  dpr: number
}

export type ParticleData = {
  count: number
  /** Figure-local target position (unscaled, unplaced) for this particle's spot in the body. */
  targetLocal: Float32Array
  /** 0..1 parameter along the particle's curve — used to pivot limbs from their anchor point. */
  tParam: Float32Array
  /** Numeric id per body part, used to pick which deformation applies each frame. */
  partId: Float32Array
  /** Precomputed 0..1 stagger value: low = forms first / dissolves last (e.g. head), high =
   * forms last / dissolves first (e.g. fine detail). Includes per-particle jitter so a whole
   * part doesn't pop in/out as one rigid block. */
  formationDelay: Float32Array
  /** Loose cloud position each particle disperses to — centered on its OWN body-part spot,
   * never far from it, so the dispersed cloud and the formed figure share one visual center. */
  dispersedBase: Float32Array
  /** Per-particle drift parameters: [speedX, speedY, speedZ, phaseX, phaseY, phaseZ, ampScale] */
  drift: Float32Array
  size: Float32Array
  color: Float32Array
}
