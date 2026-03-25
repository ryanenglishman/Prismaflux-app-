"use client";

import { useState } from "react";
import { Plus, Zap, Eye, TrendingUp, RotateCcw } from "lucide-react";
import VehicleCard from "@/components/robin/VehicleCard";
import AddVehicleSheet from "@/components/vehicle/AddVehicleSheet";
import { MOCK_VEHICLES, MOCK_ACTIVITY } from "@/lib/mock";

const ACTIVITY_ICONS: Record<string, React.FC<{ size: number; style?: React.CSSProperties }>> = {
  publish: Zap,
  photo:   Eye,
  sync:    RotateCcw,
  report:  TrendingUp,
  review:  Eye,
};

export default function RobinPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const published = MOCK_VEHICLES.filter((v) => v.status === "published").length;
  const drafts    = MOCK_VEHICLES.filter((v) => v.status === "draft").length;

  return (
    <div className="flex flex-col" style={{ minHeight: "100%" }}>

      {/* Hero card — Robin greeting */}
      <div
        className="mx-4 mt-4 rounded-2xl overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, rgba(255,23,68,0.18) 0%, rgba(6,6,8,0) 100%)",
          border: "1px solid var(--color-border)",
          padding: "18px 18px 16px",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: 32, height: 32, background: "var(--color-brand-dim)", border: "1px solid rgba(255,23,68,0.3)" }}
              >
                <Zap size={15} style={{ color: "var(--color-brand)" }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-brand)" }}>Robin</span>
              <span
                className="flex items-center gap-1 rounded-full px-2 py-0.5"
                style={{ fontSize: 10, background: "rgba(0,200,83,0.15)", color: "#00C853", fontWeight: 600 }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00C853", display: "inline-block" }} />
                En ligne
              </span>
            </div>
            <h1 className="font-bold text-white" style={{ fontSize: 20, letterSpacing: "-0.03em" }}>
              Bonjour, Jean-Denis 👋
            </h1>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 4, lineHeight: 1.4 }}>
              {published} annonces en ligne sur {MOCK_VEHICLES.length} véhicules.
              {drafts > 0 && ` ${drafts} brouillon${drafts > 1 ? "s" : ""} en attente.`}
            </p>
          </div>
          {/* Robin avatar image */}
          <div
            className="flex-shrink-0 rounded-2xl flex items-center justify-center text-3xl"
            style={{
              width: 60,
              height: 60,
              background: "rgba(255,23,68,0.08)",
              border: "1px solid rgba(255,23,68,0.2)",
            }}
          >
            🏎️
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mt-4">
          {[
            { label: "En ligne",   value: published, color: "#00C853" },
            { label: "Brouillons", value: drafts,    color: "#FFD600" },
            { label: "Vues / 7j",  value: "1 240",   color: "var(--color-text)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex-1 flex flex-col items-center rounded-xl py-2.5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)" }}
            >
              <span className="font-bold" style={{ fontSize: 18, color: stat.color, letterSpacing: "-0.03em" }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 10, color: "var(--color-text-muted)", marginTop: 1 }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add vehicle button — tachymètre style */}
      <div className="flex justify-center mt-5 px-4">
        <button
          onClick={() => setSheetOpen(true)}
          className="animate-pulse-ring flex items-center gap-3 rounded-2xl px-6 font-bold text-white transition-transform active:scale-95"
          style={{
            height: 56,
            background: "var(--color-brand)",
            fontSize: 15,
            letterSpacing: "-0.01em",
            width: "100%",
            justifyContent: "center",
            boxShadow: "0 4px 24px rgba(255,23,68,0.35)",
          }}
        >
          <Plus size={20} strokeWidth={2.5} />
          Ajouter un véhicule
        </button>
      </div>

      {/* Section vehicles */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-4 mb-2">
          <h2 className="font-semibold text-white" style={{ fontSize: 14 }}>Catalogue</h2>
          <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{MOCK_VEHICLES.length} véhicules</span>
        </div>

        <div
          className="overflow-hidden"
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: 16,
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          {MOCK_VEHICLES.map((v, i) => (
            <div key={v.id} style={i > 0 ? undefined : undefined}>
              <VehicleCard v={v} />
            </div>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className="mt-6 px-4 mb-4">
        <h2 className="font-semibold text-white mb-3" style={{ fontSize: 14 }}>Activité récente</h2>
        <div className="flex flex-col gap-2">
          {MOCK_ACTIVITY.map((a) => {
            const Icon = ACTIVITY_ICONS[a.type] ?? Zap;
            return (
              <div
                key={a.id}
                className="flex items-start gap-3 rounded-xl px-3 py-3"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-lg mt-0.5"
                  style={{ width: 28, height: 28, background: "var(--color-surface-2)" }}
                >
                  <Icon size={13} style={{ color: "var(--color-brand)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, color: "var(--color-text)", lineHeight: 1.4 }}>
                    <span style={{ color: "var(--color-brand)", fontWeight: 600 }}>{a.copilote}</span>
                    {" "}{a.text}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--color-text-dim)", marginTop: 2 }}>{a.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add vehicle sheet */}
      {sheetOpen && <AddVehicleSheet onClose={() => setSheetOpen(false)} />}
    </div>
  );
}
