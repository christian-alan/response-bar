import { useCallback, useEffect, useRef, useState } from 'react'
import { CommentIcon, PlaneIcon, PlusIcon, SmileIcon } from './icons'
import HeartButton from './HeartButton'
import EmojiPanel from './EmojiPanel'
import { blurPulse, fly, nudge, smear, wink } from '../lib/motion'

/*
 * Geometry (px), taken from the reference video:
 *   rest   — pill 228×72, black button 105×68 at x=275 (separate)
 *   open   — pill 378×72, button 97×60 at x=276, docked inside the pill's end
 * The pill grows under the button; the button barely moves, it just shrinks in.
 */

const tapBase =
  'press absolute top-1.5 grid h-[60px] w-[60px] place-items-center rounded-full hover:bg-[var(--hover)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--ink)]'

const fadeAway = 'pointer-events-none translate-x-[18px] scale-[.92] opacity-0 blur-[6px]'

let chipId = 0

export default function ResponseBar() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [liked, setLiked] = useState(false)
  const [burstKey, setBurstKey] = useState(0)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [chips, setChips] = useState([])

  const barRef = useRef(null)
  const inputRef = useRef(null)
  const btnRef = useRef(null)
  const planeRef = useRef(null)
  const smearRef = useRef(null)
  const smileRef = useRef(null)

  const setBarOpen = useCallback(
    (next) => {
      setEmojiOpen(false)
      if (next === open) return
      setOpen(next)
      blurPulse(btnRef.current)
      smear(smearRef.current)
      if (next) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 120)
      else inputRef.current?.blur()
    },
    [open],
  )

  // Tap outside or Esc collapses everything.
  useEffect(() => {
    const onDown = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setBarOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setBarOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [setBarOpen])

  const addChip = (content, emoji = false) => {
    const id = ++chipId
    setChips((c) => [...c, { id, content, emoji }])
  }

  const send = () => {
    const value = text.trim()
    if (!value) {
      nudge(btnRef.current)
      inputRef.current?.focus()
      return
    }
    fly(planeRef.current)
    addChip(value)
    setText('')
    setTimeout(() => setBarOpen(false), 260)
  }

  const toggleLike = () => {
    setLiked((l) => {
      if (!l) setBurstKey((k) => k + 1)
      return !l
    })
  }

  const toggleEmoji = () => {
    wink(smileRef.current)
    setEmojiOpen((o) => !o)
  }

  const pickEmoji = (char) => {
    setEmojiOpen(false)
    addChip(char, true)
  }

  return (
    <div ref={barRef} className="relative h-[72px] w-[380px] font-sans">
      {/* Sent replies and reactions drift up from the bar */}
      <div aria-live="polite" className="pointer-events-none absolute bottom-[calc(100%+18px)] left-0 right-0 h-0">
        {chips.map((c) => (
          <div
            key={c.id}
            onAnimationEnd={() => setChips((all) => all.filter((x) => x.id !== c.id))}
            className={`surface chip absolute bottom-0 right-2 max-w-[300px] break-words ${
              c.emoji
                ? 'rounded-[24px_24px_8px_24px] px-3 py-2.5 text-[30px] leading-none'
                : 'rounded-[20px_20px_6px_20px] px-4 py-2.5 text-[15px] leading-snug'
            }`}
          >
            <span className="spec" />
            <span className="relative">{c.content}</span>
          </div>
        ))}
      </div>

      <EmojiPanel open={emojiOpen} onPick={pickEmoji} />

      {/* The pill */}
      <div
        onClick={() => open && inputRef.current?.focus()}
        className={`surface absolute left-0 top-0 h-[72px] rounded-[36px] transition-[width] duration-[620ms] ease-spring ${
          open ? 'w-[378px]' : 'w-[228px]'
        }`}
      >
        <span className="spec" />
        <span ref={smearRef} className="smear" />

        <button
          type="button"
          aria-label="Write a reply"
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation()
            if (open) inputRef.current?.focus()
            else setBarOpen(true)
          }}
          className={`${tapBase} transition-[left,background-color,transform,translate,scale,rotate] duration-500 ease-spring ${
            open ? 'left-2.5 cursor-text bg-transparent!' : 'left-4'
          }`}
        >
          <CommentIcon />
        </button>

        <button
          type="button"
          aria-label="React"
          aria-expanded={emojiOpen}
          tabIndex={open ? -1 : 0}
          onClick={toggleEmoji}
          className={`${tapBase} transition-[background-color,transform,opacity,filter,translate,scale,rotate] duration-200 ease-pop left-[83px] ${emojiOpen ? 'bg-[var(--hover)]' : ''} ${open ? fadeAway : ''}`}
        >
          <span ref={smileRef} className="grid">
            <SmileIcon />
          </span>
        </button>

        <HeartButton
          liked={liked}
          burstKey={burstKey}
          onToggle={toggleLike}
          tabIndex={open ? -1 : 0}
          className={`left-[152px] ${open ? fadeAway : ''}`}
        />

        <div
          className={`absolute left-[69px] top-0 flex h-[72px] w-[196px] items-center transition-[opacity,filter,transform,translate,scale,rotate] duration-[450ms] ease-spring ${
            open ? 'pointer-events-auto opacity-100 blur-[0px] delay-[60ms]' : 'pointer-events-none -translate-x-3.5 opacity-0 blur-[8px]'
          }`}
        >
          <label htmlFor="reply" className="sr-only">
            Reply
          </label>
          <input
            id="reply"
            ref={inputRef}
            type="text"
            autoComplete="off"
            placeholder="Write a reply"
            value={text}
            tabIndex={open ? 0 : -1}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                send()
              }
            }}
            className="w-full bg-transparent text-[23px] leading-none tracking-[-0.015em] text-[var(--ink)] caret-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
          />
        </div>
      </div>

      {/* + when apart, send when docked */}
      <button
        ref={btnRef}
        type="button"
        aria-label={open ? 'Send reply' : 'New'}
        onClick={() => (open ? send() : setBarOpen(true))}
        className={`primary press absolute grid place-items-center transition-[left,top,width,height,border-radius,transform,translate,scale,rotate] duration-[550ms] ease-spring focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--ink)] ${
          open ? 'left-[276px] top-1.5 h-[60px] w-[97px] rounded-[30px]' : 'left-[275px] top-0.5 h-[68px] w-[105px] rounded-[34px]'
        }`}
      >
        <PlusIcon
          className={`col-start-1 row-start-1 h-[30px] w-[30px] transition-[opacity,transform,filter,translate,scale,rotate] duration-[380ms] ease-spring ${
            open ? 'rotate-45 scale-[.6] opacity-0 blur-[4px]' : ''
          }`}
        />
        <span ref={planeRef} className="col-start-1 row-start-1">
          <PlaneIcon
            className={`h-[30px] w-[30px] transition-[opacity,transform,filter,translate,scale,rotate] duration-[380ms] ease-spring ${
              open ? '' : '-rotate-45 scale-[.6] opacity-0 blur-[4px]'
            }`}
          />
        </span>
      </button>
    </div>
  )
}
