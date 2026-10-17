import { EMOJIS } from '../lib/emojis'

/**
 * Horizontally scrolling reactions that spring up out of the smiley.
 * A vertical mouse wheel scrolls it sideways.
 */
export default function EmojiPanel({ open, onPick }) {
  const onWheel = (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) e.currentTarget.scrollLeft += e.deltaY
  }

  return (
    <div
      role="dialog"
      aria-label="Reactions"
      aria-hidden={!open}
      className={`surface absolute bottom-[calc(100%+14px)] left-0 h-16 w-[378px] origin-[113px_100%] rounded-[32px] transition-[opacity,filter,transform,translate,scale,rotate] duration-500 ease-spring ${
        open ? 'pointer-events-auto opacity-100 blur-[0px]' : 'pointer-events-none translate-y-2.5 scale-[.86] opacity-0 blur-[8px]'
      }`}
    >
      <span className="spec" />
      <div
        onWheel={onWheel}
        className="emoji-scroll relative flex h-full snap-x snap-proximity items-center gap-0.5 overflow-x-auto overflow-y-hidden rounded-[32px] px-3.5"
      >
        {EMOJIS.map((e) => (
          <button
            key={e.label}
            type="button"
            aria-label={e.label}
            tabIndex={open ? 0 : -1}
            onClick={() => onPick(e.char)}
            className="grid h-12 w-12 flex-none snap-start place-items-center rounded-full text-[28px] leading-none transition-[background-color,transform,translate,scale,rotate] duration-300 ease-pop hover:scale-[1.18] hover:bg-[var(--hover)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--ink)] active:scale-90"
          >
            {e.char}
          </button>
        ))}
      </div>
    </div>
  )
}
