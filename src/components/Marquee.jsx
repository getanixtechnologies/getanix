// Infinite marquee: the list is rendered twice and the track slides by exactly half its width.
export default function Marquee({ items, variant = 'dark', reverse = false, speed = 38 }) {
  const row = (hidden) => (
    <ul className="marquee-group" aria-hidden={hidden}>
      {items.map((it, i) => (
        <li key={i}>
          <span>{it}</span>
          <svg className="marquee-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" /></svg>
        </li>
      ))}
    </ul>
  )
  return (
    <div className={`marquee marquee-${variant} ${reverse ? 'is-reverse' : ''}`} style={{ '--speed': `${speed}s` }}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
