"use client";

import Link from "next/link";
import { COPILOTS } from "@/lib/copilots";

const COPILOT_ROUTES: Record<string, string> = {
  robin: "/robin",
  "lana-basic": "/lana",
  ben: "/ben",
  marcus: "/marcus",
  pierre: "/pierre",
  "lana-performance": "/lana",
};

interface CopilotBarProps {
  activeCopilotId?: string;
}

export default function CopilotBar({ activeCopilotId }: CopilotBarProps) {
  return (
    <div className="copilot-bar">
      <div className="flex gap-2 px-3 py-2 overflow-x-auto no-scrollbar">
        {COPILOTS.map((copilot) => {
          const isActive = copilot.id === activeCopilotId;
          const href = COPILOT_ROUTES[copilot.id] || "/robin";

          return (
            <Link
              key={copilot.id}
              href={href}
              className="flex flex-col items-center gap-1 flex-shrink-0 rounded-xl px-3 py-2 transition-all"
              style={{
                textDecoration: "none",
                background: isActive ? `${copilot.color}18` : "transparent",
                minWidth: 56,
              }}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 32,
                  height: 32,
                  background: isActive ? copilot.color : "#F3F4F6",
                  color: isActive ? "#fff" : copilot.color,
                  fontWeight: 700,
                  fontSize: 11,
                  transition: "all 0.2s",
                }}
              >
                {copilot.initials}
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? copilot.color : "#9CA3AF",
                  whiteSpace: "nowrap",
                }}
              >
                {copilot.name}
              </span>
              {!copilot.isAvailable && (
                <span
                  style={{
                    fontSize: 8,
                    color: "#D1D5DB",
                    fontWeight: 500,
                  }}
                >
                  Bientôt
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
