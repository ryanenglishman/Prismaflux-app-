"use client";

import Image from "next/image";
import Link from "next/link";
import { BarChart3, Camera, Plus, ImageIcon } from "lucide-react";
import { useOverlay } from "@/components/navigation/OverlayContext";
import VehicleCard from "@/components/robin/VehicleCard";
import ActivityFeed from "@/components/robin/ActivityFeed";
import { MOCK_VEHICLES, MOCK_ACTIVITY } from "@/lib/mock";

export default function RobinHome() {
  const { openOverlay } = useOverlay();

  const published = MOCK_VEHICLES.filter((v) => v.status === "published").length;
  const drafts = MOCK_VEHICLES.filter((v) => v.status === "draft").length;
  const recentVehicles = MOCK_VEHICLES.slice(0, 3);

  return (
    <div
      className="flex flex-col"
      style={{ minHeight: "100%", background: "#060608", padding: 5 }}
    >
      {/* ── Header section ──────────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,23,68,0.18) 0%, rgba(6,6,8,0) 100%)",
          border: "1px solid var(--color-border)",
          padding: "18px 18px 16px",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            {/* Robin identity row */}
            <div className="flex items-center gap-2 mb-1">
              <Image
                src="/copilotes/robin.png"
                alt="Robin"
                width={40}
                height={40}
                className="rounded-full"
                style={{ objectFit: "cover" }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--color-brand)",
                }}
              >
                Robin
              </span>
              <span
                className="flex items-center gap-1 rounded-full px-2 py-0.5"
                style={{
                  fontSize: 10,
                  background: "rgba(0,200,83,0.15)",
                  color: "#00C853",
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#00C853",
                    display: "inline-block",
                  }}
                />
                En ligne
              </span>
            </div>

            {/* Welcome text */}
            <h1
              className="font-bold text-white"
              style={{ fontSize: 20, letterSpacing: "-0.03em" }}
            >
              Bonjour, Jean-Denis
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "var(--color-text-muted)",
                marginTop: 4,
                lineHeight: 1.4,
              }}
            >
              {published} annonces en ligne sur {MOCK_VEHICLES.length} v{"\u00e9"}hicules
            </p>
          </div>

          {/* Dashboard link */}
          <Link
            href="/dashboard"
            className="flex-shrink-0 flex items-center justify-center rounded-xl transition-colors"
            style={{
              width: 40,
              height: 40,
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
            }}
          >
            <BarChart3 size={18} style={{ color: "var(--color-text-muted)" }} />
          </Link>
        </div>

        {/* ── Stats row ─────────────────────────────────────────── */}
        <div className="flex gap-3 mt-4">
          {[
            { label: "En ligne", value: published, color: "#00C853" },
            { label: "Brouillons", value: drafts, color: "#FFD600" },
            { label: "Vues / 7j", value: "1 240", color: "var(--color-text)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex-1 flex flex-col items-center rounded-xl py-2.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span
                className="font-bold"
                style={{
                  fontSize: 18,
                  color: stat.color,
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "var(--color-text-muted)",
                  marginTop: 1,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick actions ───────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { label: "Scanner", Icon: Camera },
          { label: "Ajouter", Icon: Plus },
          { label: "Photos", Icon: ImageIcon },
        ].map(({ label, Icon }) => (
          <button
            key={label}
            onClick={() => openOverlay("robin")}
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl py-4 transition-colors active:scale-95"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <Icon size={20} style={{ color: "var(--color-text)" }} />
            <span
              style={{
                fontSize: 12,
                color: "var(--color-text-muted)",
                fontWeight: 500,
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Recent publications ─────────────────────────────────── */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2
            className="font-semibold text-white"
            style={{ fontSize: 14 }}
          >
            Publications r{"\u00e9"}centes
          </h2>
          <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
            {recentVehicles.length} / {MOCK_VEHICLES.length}
          </span>
        </div>

        <div
          className="overflow-hidden"
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: 16,
          }}
        >
          {recentVehicles.map((v) => (
            <VehicleCard key={v.id} v={v} />
          ))}
        </div>
      </div>

      {/* ── Activity feed ───────────────────────────────────────── */}
      <div className="mt-5 mb-4">
        <h2
          className="font-semibold text-white mb-3 px-1"
          style={{ fontSize: 14 }}
        >
          Activit{"\u00e9"} r{"\u00e9"}cente
        </h2>
        <ActivityFeed activities={MOCK_ACTIVITY} limit={5} />
      </div>
    </div>
  );
}
