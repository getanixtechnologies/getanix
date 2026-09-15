"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, MapPin, Mic2, Minus, Plus } from "lucide-react";
import { schedule } from "@/data/schedule";
export function ScheduleTimeline({ compact = false }: { compact?: boolean }) {
  const [day, setDay] = useState(0);
  const tabs = useRef<HTMLDivElement>(null);
  const data = schedule[day];
  return (
    <div className="schedule-widget">
      <div
        className="day-tabs"
        role="tablist"
        aria-label="Festival day"
        ref={tabs}
      >
        {schedule.map((d, i) => (
          <button
            id={"day-tab-" + i}
            key={d.day}
            role="tab"
            aria-selected={day === i}
            aria-controls="day-panel"
            tabIndex={day === i ? 0 : -1}
            onClick={() => setDay(i)}
            onKeyDown={(e) => {
              let next = day;
              if (e.key === "ArrowRight") next = (day + 1) % 4;
              else if (e.key === "ArrowLeft") next = (day + 3) % 4;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = 3;
              else return;
              e.preventDefault();
              setDay(next);
              tabs.current?.querySelectorAll("button")[next]?.focus();
            }}
          >
            <span>Day {d.day}</span>
            <small>{d.date}</small>
          </button>
        ))}
      </div>
      <div
        id="day-panel"
        role="tabpanel"
        aria-labelledby={"day-tab-" + day}
        className="timeline"
      >
        <p className="timeline-theme">
          0{data.day} / {data.theme}
        </p>
        {data.sessions.slice(0, compact ? 3 : 6).map((s) => (
          <details className="session" key={s.id}>
            <summary>
              <time>{s.time}</time>
              <span className="session-dot" />
              <span className="session-heading">
                <strong>{s.title}</strong>
                <small>{s.type}</small>
              </span>
              <span className="session-icon">
                <Plus size={18} className="plus" />
                <Minus size={18} className="minus" />
              </span>
            </summary>
            <div className="session-detail">
              <p>{s.description}</p>
              <p>
                <Mic2 size={14} />
                {s.speaker}
              </p>
              <p>
                <MapPin size={14} />
                {s.venue}
              </p>
            </div>
          </details>
        ))}
      </div>
      {compact && (
        <a href="/schedule" className="schedule-more">
          Explore the full programme <ArrowUpRight size={17} />
        </a>
      )}
    </div>
  );
}
