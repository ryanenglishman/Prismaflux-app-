"use client";

import { MOCK_VEHICLES, type MockVehicle } from "@/lib/mock";

const ALL_PLATFORMS = ["AutoScout24", "GoCar", "2ememain"];

const PLATFORM_KEY_MAP: Record<string, string> = {
  AutoScout24: "autoscout24",
  GoCar: "gocar",
  "2ememain": "2ememain",
};

function getPlatformBadgeStyle(vehicle: MockVehicle, platform: string) {
  const key = PLATFORM_KEY_MAP[platform];
  const readiness = vehicle.platformReadiness?.[key];
  const isPublished = vehicle.publishedOn.includes(platform);

  if (isPublished && readiness && readiness.filled === readiness.total) {
    // Published & complete -> green
    return { background: "rgba(0, 200, 83, 0.12)", color: "#00C853", border: "1px solid rgba(0, 200, 83, 0.2)" };
  }
  if (readiness && readiness.filled > 0 && readiness.filled < readiness.total) {
    // Partially filled -> yellow/pending
    return { background: "rgba(255, 214, 0, 0.12)", color: "#B8960C", border: "1px solid rgba(255, 214, 0, 0.2)" };
  }
  if (isPublished) {
    // Published but no readiness data -> green
    return { background: "rgba(0, 200, 83, 0.12)", color: "#00C853", border: "1px solid rgba(0, 200, 83, 0.2)" };
  }
  // Not published -> gray
  return { background: "#F3F4F6", color: "#9CA3AF", border: "1px solid #E5E7EB" };
}

interface CatalogListProps {
  activeFilter: string;
}

export default function CatalogList({ activeFilter }: CatalogListProps) {
  const filtered = MOCK_VEHICLES.filter((v) => {
    if (activeFilter === "Tous") return true;
    if (activeFilter === "En ligne") return v.status === "published";
    if (activeFilter === "Brouillons") return v.status === "draft";
    if (activeFilter === "Vendus") return v.status === "sold";
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <span style={{ fontSize: 40 }}>🚗</span>
        <p className="font-semibold mt-4" style={{ fontSize: 15, color: "#111827" }}>
          Aucun vehicule trouve
        </p>
        <p style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
          Modifiez votre recherche ou ajoutez un vehicule.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #E5E7EB",
      }}
    >
      {filtered.map((v, idx) => (
        <div
          key={v.id}
          className="flex items-center gap-3 px-4 py-3 transition-colors active:opacity-80"
          style={{
            background: "#FFFFFF",
            borderBottom: idx < filtered.length - 1 ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
          }}
        >
          {/* Photo placeholder */}
          <div
            className="flex-shrink-0 rounded-xl flex items-center justify-center"
            style={{
              width: 60,
              height: 46,
              background: "#F3F4F6",
              border: "1px solid #E5E7EB",
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
                style={{ fontSize: 14, color: "#111827" }}
              >
                {v.make} {v.model}
              </span>
              <span
                className="font-bold flex-shrink-0"
                style={{ fontSize: 14, color: "#111827" }}
              >
                {v.price.toLocaleString("fr-BE")} €
              </span>
            </div>

            <div
              className="flex items-center gap-2 mt-0.5"
              style={{ fontSize: 12, color: "#6B7280" }}
            >
              <span>{v.year}</span>
              <span style={{ color: "#D1D5DB" }}>·</span>
              <span>{v.mileage.toLocaleString("fr-BE")} km</span>
              <span style={{ color: "#D1D5DB" }}>·</span>
              <span>{v.fuelType}</span>
            </div>

            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              {/* Platform badges */}
              {ALL_PLATFORMS.map((platform) => {
                const style = getPlatformBadgeStyle(v, platform);
                const key = PLATFORM_KEY_MAP[platform];
                const readiness = v.platformReadiness?.[key];
                const label = platform === "AutoScout24" ? "AS24" : platform === "2ememain" ? "2eM" : platform;

                return (
                  <span
                    key={platform}
                    className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                    style={{
                      fontSize: 9,
                      color: style.color,
                      background: style.background,
                      border: style.border,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {label}
                    {readiness && (
                      <span style={{ marginLeft: 3, fontSize: 8, opacity: 0.8 }}>
                        {readiness.filled}/{readiness.total}
                      </span>
                    )}
                  </span>
                );
              })}

              {/* AI completion */}
              <span
                className="ml-auto flex-shrink-0 font-medium"
                style={{
                  fontSize: 10,
                  color:
                    v.aiCompletionPct >= 90
                      ? "#00C853"
                      : v.aiCompletionPct >= 70
                        ? "#B8960C"
                        : "#FF1744",
                }}
              >
                IA {v.aiCompletionPct}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
