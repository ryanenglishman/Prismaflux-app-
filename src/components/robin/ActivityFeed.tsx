"use client";

import { COPILOTS } from "@/lib/copilots";

export interface Activity {
  id: string;
  copilote: string;
  text: string;
  time: string;
  type: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  limit?: number;
}

function getCopilotByName(name: string) {
  return COPILOTS.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

export default function ActivityFeed({ activities, limit }: ActivityFeedProps) {
  const items = limit ? activities.slice(0, limit) : activities;

  return (
    <div className="flex flex-col gap-2">
      {items.map((a) => {
        const copilot = getCopilotByName(a.copilote);
        const color = copilot?.color ?? "var(--color-text-muted)";
        const initials = copilot?.initials ?? a.copilote.slice(0, 2).toUpperCase();

        return (
          <div
            key={a.id}
            className="flex items-start gap-3 rounded-xl px-3 py-3"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Colored circle with copilot initials */}
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5"
              style={{
                width: 30,
                height: 30,
                background: `${color}18`,
                border: `1.5px solid ${color}40`,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color,
                  letterSpacing: "0.02em",
                }}
              >
                {initials}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 13, color: "var(--color-text)", lineHeight: 1.4 }}>
                <span style={{ color, fontWeight: 600 }}>{a.copilote}</span>
                {" "}{a.text}
              </p>
              <p style={{ fontSize: 11, color: "var(--color-text-dim)", marginTop: 2 }}>
                {a.time}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
