"use client";

import { useState } from "react";
import { MOCK_ACTIVITY } from "@/lib/mock";
import { COPILOTS } from "@/lib/copilots";

function getCopilotByName(name: string) {
  return COPILOTS.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

/** Get unique copilot names from activity data */
function getUniqueCopilots(): string[] {
  const names = new Set(MOCK_ACTIVITY.map((a) => a.copilote));
  return ["Tous", ...Array.from(names)];
}

export default function DashboardFeed() {
  const [activeCopilot, setActiveCopilot] = useState("Tous");
  const copilotNames = getUniqueCopilots();

  const filtered =
    activeCopilot === "Tous"
      ? MOCK_ACTIVITY
      : MOCK_ACTIVITY.filter((a) => a.copilote === activeCopilot);

  return (
    <div>
      {/* Copilot filter pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
        {copilotNames.map((name) => {
          const isActive = name === activeCopilot;
          const copilot = name !== "Tous" ? getCopilotByName(name) : null;
          const accentColor = copilot?.color ?? "#FF1744";

          return (
            <button
              key={name}
              onClick={() => setActiveCopilot(name)}
              className="flex-shrink-0 rounded-full px-4 font-semibold transition-colors"
              style={{
                height: 30,
                fontSize: 12,
                background: isActive
                  ? name === "Tous"
                    ? "#FF1744"
                    : accentColor
                  : "#F3F4F6",
                color: isActive ? "#FFFFFF" : "#6B7280",
                border: isActive
                  ? `1px solid ${name === "Tous" ? "#FF1744" : accentColor}`
                  : "1px solid #E5E7EB",
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Activity entries */}
      <div className="flex flex-col gap-2">
        {filtered.map((a) => {
          const copilot = getCopilotByName(a.copilote);
          const color = copilot?.color ?? "#6B7280";
          const initials =
            copilot?.initials ?? a.copilote.slice(0, 2).toUpperCase();

          return (
            <div
              key={a.id}
              className="flex items-start gap-3 rounded-xl px-3 py-3"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
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
                <p style={{ fontSize: 13, color: "#111827", lineHeight: 1.4 }}>
                  <span style={{ color, fontWeight: 600 }}>{a.copilote}</span>
                  {" "}{a.text}
                </p>
                <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                  {a.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
