"use client";

import type { MockVehicle } from "@/lib/mock";

const STATUS_LABELS: Record<MockVehicle["status"], { label: string; color: string; bg: string }> = {
  published: { label: "En ligne",  color: "#00C853", bg: "rgba(0, 200, 83, 0.12)" },
  draft:     { label: "Brouillon", color: "#FFD600", bg: "rgba(255, 214, 0, 0.12)" },
  sold:      { label: "Vendu",     color: "rgba(255,255,255,0.4)", bg: "rgba(255,255,255,0.06)" },
};

export default function VehicleCard({ v }: { v: MockVehicle }) {
  const s = STATUS_LABELS[v.status];

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 transition-colors active:opacity-80"
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        cursor: "pointer",
      }}
    >
      {/* Photo placeholder */}
      <div
        className="flex-shrink-0 rounded-xl flex items-center justify-center"
        style={{
          width: 60,
          height: 46,
          background: "var(--color-surface-2)",
          border: "1px solid var(--color-border)",
          fontSize: 22,
        }}
      >
        🚗
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span
            className="font-semibold truncate"
            style={{ fontSize: 14, color: "var(--color-text)" }}
          >
            {v.make} {v.model}
          </span>
          <span
            className="font-bold flex-shrink-0"
            style={{ fontSize: 14, color: "var(--color-text)" }}
          >
            {v.price.toLocaleString("fr-BE")} €
          </span>
        </div>

        <div
          className="flex items-center gap-2 mt-0.5"
          style={{ fontSize: 12, color: "var(--color-text-muted)" }}
        >
          <span>{v.year}</span>
          <span style={{ color: "var(--color-border-hover)" }}>·</span>
          <span>{v.mileage.toLocaleString("fr-BE")} km</span>
          <span style={{ color: "var(--color-border-hover)" }}>·</span>
          <span>{v.fuelType}</span>
        </div>

        <div className="flex items-center gap-2 mt-1.5">
          {/* Status badge */}
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
            style={{
              fontSize: 10,
              color: s.color,
              background: s.bg,
              letterSpacing: "0.02em",
            }}
          >
            {s.label}
          </span>

          {/* Platforms */}
          {v.publishedOn.length > 0 && (
            <span
              style={{ fontSize: 10, color: "var(--color-text-dim)" }}
            >
              {v.publishedOn.join(" · ")}
            </span>
          )}

          {/* AI completion */}
          <span
            className="ml-auto flex-shrink-0"
            style={{ fontSize: 10, color: v.aiCompletionPct >= 90 ? "var(--color-ai-green)" : v.aiCompletionPct >= 70 ? "var(--color-ai-yellow)" : "var(--color-ai-red)" }}
          >
            {v.aiCompletionPct}%
          </span>
        </div>
      </div>
    </div>
  );
}
