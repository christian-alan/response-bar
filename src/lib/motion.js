// Small helpers around the Web Animations API, so one-shot effects
// (blur pulse, nudge, wink, paper-plane flight) can replay on every trigger.

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function play(el, keyframes, options) {
  if (!el || reduced()) return
  el.animate(keyframes, options)
}

export const blurPulse = (el) =>
  play(el, [{ filter: 'blur(0)' }, { filter: 'blur(5px)', offset: 0.35 }, { filter: 'blur(0)' }], {
    duration: 320,
    easing: 'ease-out',
  })

export const smear = (el) =>
  play(el, [{ opacity: 0 }, { opacity: 0.95, offset: 0.35 }, { opacity: 0 }], { duration: 340, easing: 'ease-out' })

export const nudge = (el) =>
  play(
    el,
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-4px)', offset: 0.2 },
      { transform: 'translateX(4px)', offset: 0.45 },
      { transform: 'translateX(-2px)', offset: 0.7 },
      { transform: 'translateX(0)' },
    ],
    { duration: 360, easing: 'ease' },
  )

export const wink = (el) =>
  play(
    el,
    [
      { transform: 'rotate(0)' },
      { transform: 'rotate(-14deg) scale(1.12)', offset: 0.3 },
      { transform: 'rotate(8deg)', offset: 0.65 },
      { transform: 'rotate(0)' },
    ],
    { duration: 500, easing: 'cubic-bezier(.3,1.35,.5,1)' },
  )

export const fly = (el) =>
  play(
    el,
    [
      { transform: 'none', opacity: 1 },
      { transform: 'translate(26px,-22px) scale(.7)', opacity: 0, offset: 0.45 },
      { transform: 'translate(-20px,18px) scale(.7)', opacity: 0, offset: 0.46 },
      { transform: 'none', opacity: 1 },
    ],
    { duration: 500, easing: 'cubic-bezier(.5,0,.2,1)' },
  )
