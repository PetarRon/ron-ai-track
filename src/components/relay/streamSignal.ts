/**
 * One mutable object shared between the LightStream canvas and the sections
 * that want to play with it. The canvas reads it every frame; sections write
 * to it. No React state, so nothing re-renders.
 */
export const streamSignal = {
  /** page-space y where a bright packet should sit on the stream */
  pulseY: 0,
  /** whether the packet is wanted right now (the canvas eases it in and out) */
  pulseOn: false,
  /** 0..1 burst of flow and brightness, decays on its own */
  surge: 0,
};
