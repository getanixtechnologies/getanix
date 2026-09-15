import { schedule } from "@/data/schedule";
export function FeaturedSessions() {
  const sessions = schedule[0].sessions.slice(0, 6);
  return (
    <div className="featured-sessions" data-reveal suppressHydrationWarning>
      {sessions.map((s, i) => (
        <div className="featured-session" key={s.id}>
          <span className="featured-session-index">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <time>{s.time}</time>
            <p className="featured-session-title">{s.title}</p>
            <p className="featured-session-meta">
              {s.type} · {s.speaker}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
