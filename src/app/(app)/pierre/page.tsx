"use client";

import { BarChart2, TrendingUp, TrendingDown, Star } from "lucide-react";

const KPI_ROWS = [
  { label: "Vues totales (7j)",   value: "1 240", delta: "+14%",  up: true },
  { label: "Contacts reçus",      value: "23",    delta: "+3",     up: true },
  { label: "Taux de contact",     value: "1,85%", delta: "-0.2%", up: false },
  { label: "Note Google",         value: "4,7 ⭐", delta: "+0.1", up: true },
  { label: "Véhicules en ligne",  value: "3",     delta: "=",      up: true },
  { label: "Délai moy. de vente", value: "18j",   delta: "-3j",    up: true },
];

const TOP_VEHICLES = [
  { name: "VW Golf 8 GTI",     views: 340, contacts: 8 },
  { name: "BMW 320d",          views: 210, contacts: 5 },
  { name: "Mercedes C 200d",   views: 175, contacts: 3 },
];

export default function PierrePage() {
  return (
    <div className="px-4 pt-5 flex flex-col gap-4">

      {/* Header */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "linear-gradient(135deg, rgba(0,200,83,0.12) 0%, transparent 100%)", border: "1px solid rgba(0,200,83,0.2)" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 40, height: 40, background: "rgba(0,200,83,0.15)", border: "1px solid rgba(0,200,83,0.3)" }}
          >
            <BarChart2 size={18} style={{ color: "#00C853" }} />
          </div>
          <div>
            <h1 className="font-bold text-white" style={{ fontSize: 18 }}>Pierre</h1>
            <p style={{ fontSize: 12, color: "#00C853" }}>Reporting & Réputation · Inclus</p>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
          Vos performances en un coup d'œil. Rapport mensuel généré automatiquement le 1er de chaque mois.
        </p>
      </div>

      {/* KPIs */}
      <div>
        <p className="font-semibold text-white mb-3" style={{ fontSize: 14 }}>Cette semaine</p>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--color-border)" }}
        >
          {KPI_ROWS.map((k, i) => (
            <div
              key={k.label}
              className="flex items-center justify-between px-4 py-3"
              style={{
                borderTop: i > 0 ? "1px solid var(--color-border)" : "none",
                background: "var(--color-surface)",
              }}
            >
              <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{k.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white" style={{ fontSize: 14 }}>{k.value}</span>
                <span
                  className="flex items-center gap-0.5 rounded-full px-2 py-0.5"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: k.up ? "#00C853" : "#FF1744",
                    background: k.up ? "rgba(0,200,83,0.12)" : "rgba(255,23,68,0.12)",
                  }}
                >
                  {k.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                  {k.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top vehicles */}
      <div>
        <p className="font-semibold text-white mb-3" style={{ fontSize: 14 }}>Meilleures annonces</p>
        <div className="flex flex-col gap-2">
          {TOP_VEHICLES.map((v, i) => (
            <div
              key={v.name}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <span
                className="flex-shrink-0 font-black"
                style={{ fontSize: 16, width: 24, color: i === 0 ? "#FFD600" : "var(--color-text-dim)" }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate" style={{ fontSize: 13 }}>{v.name}</p>
                <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 1 }}>
                  {v.views} vues · {v.contacts} contacts
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p className="font-bold" style={{ fontSize: 13, color: "#448AFF" }}>{v.contacts}</p>
                <p style={{ fontSize: 10, color: "var(--color-text-dim)" }}>contacts</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reputation */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Star size={16} style={{ color: "#FFD600" }} />
          <p className="font-semibold text-white" style={{ fontSize: 14 }}>Réputation Google</p>
        </div>
        <div className="flex items-end gap-3">
          <span className="font-black text-white" style={{ fontSize: 40, lineHeight: 1, letterSpacing: "-0.04em" }}>4,7</span>
          <div className="pb-1">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} style={{ color: i <= 4 ? "#FFD600" : "var(--color-border-hover)" }} fill={i <= 4 ? "#FFD600" : "none"} />
              ))}
            </div>
            <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 3 }}>142 avis · +7 ce mois</p>
          </div>
        </div>
        <button
          className="btn-ghost w-full mt-4"
          style={{ fontSize: 12, height: 38 }}
        >
          Voir les avis sans réponse
        </button>
      </div>

      {/* Monthly report CTA */}
      <div
        className="rounded-2xl p-4 flex items-center gap-3"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-xl"
          style={{ width: 44, height: 44, background: "var(--color-brand-dim)", border: "1px solid rgba(255,23,68,0.2)" }}
        >
          📄
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white" style={{ fontSize: 13 }}>Rapport mensuel — Mars 2026</p>
          <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 1 }}>Généré le 1er avril · PDF disponible</p>
        </div>
        <button className="btn-primary" style={{ height: 34, padding: "0 12px", fontSize: 12 }}>
          Voir
        </button>
      </div>

      <div style={{ height: 8 }} />
    </div>
  );
}
