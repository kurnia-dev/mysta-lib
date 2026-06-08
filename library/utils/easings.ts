export const easings = {
  /** Smooth ease-out: cubic-bezier(0.22, 1, 0.36, 1) */
  smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
  easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),
  easeInCubic: (t: number): number => t * t * t,
  easeInOutCubic: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};
