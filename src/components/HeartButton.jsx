import { HeartIcon } from './icons'

const ANGLES = [0, 51, 103, 154, 206, 257, 309]
// X's confetti pairs (classic). The glass variant recolours them from --like in CSS.
const PAIRS = [
  ['#9fc7fa', '#9cd8c3'],
  ['#f48ea7', '#cc8ef5'],
  ['#9cd8c3', '#f48ea7'],
  ['#cc8ef5', '#9fc7fa'],
  ['#f9b27a', '#f48ea7'],
  ['#9fc7fa', '#f9b27a'],
  ['#f48ea7', '#9cd8c3'],
]

function Burst() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="burst-ring" />
      {ANGLES.map((a, i) => (
        <span key={a}>
          <span className="burst-dot" style={{ '--a': `${a}deg`, '--c': PAIRS[i][0] }} />
          <span className="burst-dot sm" style={{ '--a': `${a}deg`, '--c': PAIRS[i][1] }} />
        </span>
      ))}
    </span>
  )
}

/**
 * Like toggle with an X-style burst: a disc swells and hollows into a ring,
 * the heart pops in with overshoot, and seven pairs of dots scatter.
 * Unliking is instant, as on X.
 */
export default function HeartButton({ liked, burstKey, onToggle, className = '', tabIndex }) {
  return (
    <button
      type="button"
      aria-label="Like"
      aria-pressed={liked}
      tabIndex={tabIndex}
      onClick={onToggle}
      className={`press absolute top-1.5 grid h-[60px] w-[60px] place-items-center overflow-visible rounded-full transition-[background-color,transform,opacity,filter,translate,scale,rotate] duration-200 ease-pop hover:bg-[var(--hover)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--ink)] ${className}`}
    >
      {liked && burstKey > 0 && <Burst key={burstKey} />}
      <HeartIcon key={liked ? `on-${burstKey}` : 'off'} filled={liked} className={liked && burstKey > 0 ? 'heart-pop' : ''} />
    </button>
  )
}
