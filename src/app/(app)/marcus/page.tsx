"use client";

import { useState } from "react";
import { Globe, Search, ChevronRight, Check, AlertTriangle, X as XIcon } from "lucide-react";

const CONNECTIONS = [
  { id: "gbp",   label: "Google Business Profile", icon: "🔍", desc: "Avis, horaires, photos, Q&A" },
  { id: "gsc",   label: "Google Search Console",    icon: "📊", desc: "Mots-clés, positions, erreurs" },
  { id: "ga4",   label: "Google Analytics 4",       icon: "📈", desc: "Trafic, rebond, sources" },
  { id: "meta",  label: "Facebook / Instagram",     icon: "👥", desc: "Fans, engagement, fréquence" },
  { id: "gads",  label: "Google Ads",               icon: "📣", desc: "Performance campagnes locales" },
  { id: "trust", label: "Trustpilot",               icon: "⭐", desc: "Note et avis clients" },
  { id: "wa",    label: "WhatsApp Business",        icon: "💬", desc: "Messages et contacts" },
];

const AUDIT_RESULTS = [
  { type: "ok",   label: "HTTPS actif",                    detail: "Certificat valide jusqu'au 2027-01-15" },
  { type: "ok",   label: "Mobile-friendly",                detail: "Score mobile Google : 91/100" },
  { type: "warn", label: "Schema LocalBusiness manquant",  detail: "Google ne connaît pas votre secteur exact" },
  { type: "error",label: "PageSpeed mobile : 41/100",      detail: "Temps de chargement > 5s — perte de visiteurs" },
  { type: "warn", label: "Balise H1 génériques",           detail: '"Bienvenue" n\'attire pas de trafic local' },
  { type: "error",label: "Pas de mots-clés locaux",        detail: '"achat voiture Liège" absent du site' },
];

const TYPE_STYLES = {
  ok:    { icon: Check,         color: "#00C853", bg: "rgba(0,200,83,0.12)" },
  warn:  { icon: AlertTriangle, color: "#FFD600", bg: "rgba(255,214,0,0.12)" },
  error: { icon: XIcon,         color: "#FF1744", bg: "rgba(255,23,68,0.12)" },
};

export default function MarcusPage() {
  const [url, setUrl] = useState("");
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  function handleScan() {
    if (!url) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 1800);
  }

  const score = 55;

  return (
    <div className="px-4 pt-5 flex flex-col gap-4">

      {/* Header */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "linear-gradient(135deg, rgba(68,138,255,0.15) 0%, transparent 100%)", border: "1px solid rgba(68,138,255,0.2)" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 40, height: 40, background: "rgba(68,138,255,0.15)", border: "1px solid rgba(68,138,255,0.3)" }}
          >
            <Globe size={18} style={{ color: "#448AFF" }} />
          </div>
          <div>
            <h1 className="font-bold text-white" style={{ fontSize: 18 }}>Marcus</h1>
            <p style={{ fontSize: 12, color: "#448AFF" }}>SEO & Site web · Inclus</p>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
          Marcus analyse votre présence en ligne et vous dit exactement quoi améliorer pour attirer plus de clients locaux.
        </p>
      </div>

      {/* URL input */}
      {!scanned && (
        <div className="flex flex-col gap-3">
          <div className="field">
            <label>URL de votre site web</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://votre-concession.be"
                style={{ flex: 1 }}
              />
            </div>
          </div>
          <button
            className="btn-primary"
            onClick={handleScan}
            disabled={!url || scanning}
            style={{ opacity: !url ? 0.5 : 1 }}
          >
            {scanning ? (
              <>
                <div
                  className="animate-spin rounded-full border-2 border-white/20 border-t-white"
                  style={{ width: 16, height: 16 }}
                />
                Analyse en cours…
              </>
            ) : (
              <>
                <Search size={16} />
                Analyser mon site
              </>
            )}
          </button>
          <p style={{ fontSize: 11, color: "var(--color-text-dim)", textAlign: "center" }}>
            Scan gratuit — aucune connexion requise
          </p>
        </div>
      )}

      {/* Audit results */}
      {scanned && (
        <>
          {/* Score */}
          <div
            className="flex items-center gap-4 rounded-2xl p-4"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-full font-black"
              style={{
                width: 64,
                height: 64,
                background: score >= 70 ? "rgba(0,200,83,0.15)" : score >= 50 ? "rgba(255,214,0,0.15)" : "rgba(255,23,68,0.15)",
                border: `2px solid ${score >= 70 ? "#00C853" : score >= 50 ? "#FFD600" : "#FF1744"}`,
                fontSize: 22,
                color: score >= 70 ? "#00C853" : score >= 50 ? "#FFD600" : "#FF1744",
              }}
            >
              {score}
            </div>
            <div>
              <p className="font-bold text-white" style={{ fontSize: 16 }}>Score global</p>
              <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>{url}</p>
              <p style={{ fontSize: 12, color: "#FF1744", marginTop: 4 }}>2 erreurs critiques à corriger</p>
            </div>
          </div>

          {/* Results list */}
          <div className="flex flex-col gap-2">
            {AUDIT_RESULTS.map((r) => {
              const s = TYPE_STYLES[r.type as keyof typeof TYPE_STYLES];
              const Icon = s.icon;
              return (
                <div
                  key={r.label}
                  className="flex items-start gap-3 rounded-xl p-3"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-lg mt-0.5"
                    style={{ width: 28, height: 28, background: s.bg }}
                  >
                    <Icon size={13} style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-white" style={{ fontSize: 13 }}>{r.label}</p>
                    <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 1 }}>{r.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scan again */}
          <button className="btn-ghost w-full" onClick={() => setScanned(false)}>
            Changer d'URL
          </button>
        </>
      )}

      {/* Connections */}
      <div>
        <p className="font-semibold text-white mb-3" style={{ fontSize: 14 }}>Connecter des outils</p>
        <div className="flex flex-col gap-2">
          {CONNECTIONS.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <span className="text-xl flex-shrink-0">{c.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate" style={{ fontSize: 13 }}>{c.label}</p>
                <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 1 }}>{c.desc}</p>
              </div>
              <button
                className="flex-shrink-0 flex items-center gap-1 rounded-lg px-3 py-1.5 font-semibold"
                style={{ fontSize: 11, background: "var(--color-brand-dim)", color: "var(--color-brand)", border: "1px solid rgba(255,23,68,0.3)" }}
              >
                Connecter <ChevronRight size={11} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 8 }} />
    </div>
  );
}
