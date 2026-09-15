import { partners } from "@/data/partners";
import { Asterisk, BookOpen, Radio, Orbit, Users } from "lucide-react";
const icons = [Asterisk, Orbit, Radio, BookOpen, Users];
export function SponsorGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={"sponsor-strip " + (compact ? "compact" : "")}>
      {partners.slice(0, compact ? 3 : 5).map((group, i) => {
        const Icon = icons[i];
        return (
          <div className="sponsor-cluster" key={group.category}>
            <p className="eyebrow">{group.category}</p>
            <div className="sponsor-marks">
              {group.slots.map((slot) => (
                <span className="sponsor-mark" key={slot} title={slot}>
                  <Icon size={15} strokeWidth={1.3} />
                  <em>Partner mark</em>
                </span>
              ))}
            </div>
          </div>
        );
      })}
      <small className="sponsor-note">Partnership opportunities open</small>
    </div>
  );
}
