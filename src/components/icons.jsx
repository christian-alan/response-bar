// Stroke icons drawn to match the reference: 32px grid, 2.3px rounded strokes.

export function CommentIcon(props) {
  return (
    <svg viewBox="0 0 32 32" className="glyph h-8 w-8" aria-hidden="true" {...props}>
      <path d="M8 6.5h16a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H14l-4.6 4.2c-.4.4-1 .1-1-.4V22.5H8a3 3 0 0 1-3-3v-10a3 3 0 0 1 3-3z" />
      <path d="M10.5 12h11M10.5 16.5h7" />
    </svg>
  )
}

export function SmileIcon(props) {
  return (
    <svg viewBox="0 0 32 32" className="glyph h-8 w-8" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="11.5" />
      <path d="M11.3 18.6c1.1 1.7 2.8 2.6 4.7 2.6s3.6-.9 4.7-2.6" />
      <circle cx="12.2" cy="13" r=".6" fill="currentColor" strokeWidth="2" />
      <circle cx="19.8" cy="13" r=".6" fill="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function HeartIcon({ filled, className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`glyph relative z-[1] h-8 w-8 transition-[fill,stroke] duration-200 ${className}`}
      style={filled ? { fill: 'var(--like)', stroke: 'var(--like)' } : undefined}
      aria-hidden="true"
      {...props}
    >
      <path d="M16 26.2S5.5 20 5.5 12.6A5.6 5.6 0 0 1 16 9.8a5.6 5.6 0 0 1 10.5 2.8C26.5 20 16 26.2 16 26.2z" />
    </svg>
  )
}

export function PlusIcon(props) {
  return (
    <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M15 6.5v17M6.5 15h17" />
    </svg>
  )
}

export function PlaneIcon(props) {
  return (
    <svg viewBox="0 0 30 30" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24.6 5.2 4.9 13.1c-.9.4-.8 1.6.1 1.9l7.3 2.4 2.4 7.3c.3.9 1.5 1 1.9.1l7.9-19.7c.3-.6-.3-1.2-.9-.9z" />
    </svg>
  )
}
