"use client";

import { Camera, Wand2, Lock } from "lucide-react";

export default function LanaPage() {
  return (
    <div className="px-4 pt-5 flex flex-col gap-4">

      {/* Lana Basic — Header */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, transparent 100%)", border: "1px solid rgba(168,85,247,0.2)" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex items-center justify-center rounded-full text-2xl"
            style={{ width: 48, height: 48, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}
          >
            📸
          </div>
          <div>
            <h1 className="font-bold text-white" style={{ fontSize: 18 }}>Lana</h1>
            <p style={{ fontSize: 12, color: "rgba(168,85,247,0.9)" }}>Vehicle Studio · Inclus</p>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
          Lana retouche automatiquement vos photos : fond uniforme, recadrage intelligent, détection de couleur.
        </p>
      </div>

      {/* Lana Basic features */}
      <div>
        <p className="font-semibold text-white mb-3" style={{ fontSize: 14 }}>Lana Basic — Inclus</p>
        {[
          { icon: "🎨", title: "Fond uniforme", desc: "Fond blanc ou gris studio appliqué automatiquement" },
          { icon: "✂️", title: "Recadrage intelligent", desc: "Centrage et recadrage du véhicule optimisé" },
          { icon: "🎯", title: "Détection couleur", desc: "Couleur exacte identifiée depuis la photo" },
          { icon: "💧", title: "Watermark concession", desc: "Logo apposé automatiquement sur chaque photo" },
        ].map((f) => (
          <div
            key={f.title}
            className="flex items-start gap-3 mb-3 rounded-xl p-3"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            <span className="text-xl flex-shrink-0">{f.icon}</span>
            <div>
              <p className="font-semibold text-white" style={{ fontSize: 13 }}>{f.title}</p>
              <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lana Performance — Upsell */}
      <div
        className="rounded-2xl p-4 relative overflow-hidden"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-hover)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wand2 size={16} style={{ color: "#FFD600" }} />
            <span className="font-bold text-white" style={{ fontSize: 14 }}>Lana Performance</span>
          </div>
          <span
            className="flex items-center gap-1 rounded-full px-2 py-0.5"
            style={{ fontSize: 10, fontWeight: 600, color: "#FFD600", background: "rgba(255,214,0,0.12)" }}
          >
            <Lock size={9} />
            449 €/mois
          </span>
        </div>

        {[
          { icon: "🪄", title: "Suppression d'arrière-fond", desc: "Fond transparent propre pour vos bannières et réseaux" },
          { icon: "📱", title: "Contenu réseaux sociaux", desc: "Facebook, Instagram, X — posts générés par IA pour chaque véhicule" },
        ].map((f) => (
          <div key={f.title} className="flex items-start gap-3 mb-3 last:mb-0">
            <span className="text-lg flex-shrink-0">{f.icon}</span>
            <div>
              <p className="font-semibold text-white" style={{ fontSize: 13 }}>{f.title}</p>
              <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 1 }}>{f.desc}</p>
            </div>
          </div>
        ))}

        <button className="btn-primary w-full mt-4" style={{ height: 42 }}>
          Activer Lana Performance
        </button>
      </div>

      <div style={{ height: 8 }} />
    </div>
  );
}
