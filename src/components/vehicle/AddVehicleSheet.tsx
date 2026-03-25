"use client";

import { useState } from "react";
import { X, Camera, FileText, Sparkles, ChevronRight } from "lucide-react";

type AiStatus = "confirmed" | "estimated" | "missing";

interface FormField {
  key: string;
  label: string;
  value: string;
  aiStatus: AiStatus;
  aiConfidence?: number;
  placeholder?: string;
  type?: "text" | "number" | "select";
  options?: string[];
}

const AI_BADGE: Record<AiStatus, { label: string; color: string; bg: string }> = {
  confirmed: { label: "Robin", color: "#00C853", bg: "rgba(0,200,83,0.12)" },
  estimated: { label: "Robin ~", color: "#FFD600", bg: "rgba(255,214,0,0.12)" },
  missing:   { label: "À remplir", color: "#FF1744", bg: "rgba(255,23,68,0.12)" },
};

const INITIAL_FIELDS: FormField[] = [
  { key: "make",         label: "Marque",            value: "",        aiStatus: "missing",    placeholder: "Volkswagen" },
  { key: "model",        label: "Modèle",             value: "",        aiStatus: "missing",    placeholder: "Golf 8 GTI" },
  { key: "year",         label: "Année",              value: "",        aiStatus: "missing",    placeholder: "2022", type: "number" },
  { key: "mileage",      label: "Kilométrage",        value: "",        aiStatus: "missing",    placeholder: "18 400", type: "number" },
  { key: "fuelType",     label: "Carburant",          value: "",        aiStatus: "missing",    type: "select",
    options: ["Essence", "Diesel", "Hybride", "Électrique", "GPL"] },
  { key: "transmission", label: "Boîte de vitesses",  value: "",        aiStatus: "missing",    type: "select",
    options: ["Manuelle", "Automatique", "DSG", "CVT"] },
  { key: "bodyColor",    label: "Couleur",             value: "",        aiStatus: "missing",    placeholder: "Gris Nardo" },
  { key: "price",        label: "Prix de vente (€)",  value: "",        aiStatus: "missing",    placeholder: "34 900", type: "number" },
  { key: "power",        label: "Puissance (ch)",      value: "",        aiStatus: "missing",    placeholder: "245", type: "number" },
  { key: "doors",        label: "Nombre de portes",   value: "5",       aiStatus: "missing",    type: "select",
    options: ["2", "3", "4", "5"] },
];

function simulateAiFill(fields: FormField[]): FormField[] {
  return fields.map((f) => {
    if (f.key === "make")         return { ...f, value: "Volkswagen",  aiStatus: "confirmed", aiConfidence: 98 };
    if (f.key === "model")        return { ...f, value: "Golf 8 GTI",  aiStatus: "confirmed", aiConfidence: 96 };
    if (f.key === "year")         return { ...f, value: "2022",        aiStatus: "confirmed", aiConfidence: 99 };
    if (f.key === "mileage")      return { ...f, value: "18400",       aiStatus: "estimated", aiConfidence: 78 };
    if (f.key === "fuelType")     return { ...f, value: "Essence",     aiStatus: "confirmed", aiConfidence: 97 };
    if (f.key === "transmission") return { ...f, value: "DSG",         aiStatus: "estimated", aiConfidence: 82 };
    if (f.key === "bodyColor")    return { ...f, value: "Gris Nardo",  aiStatus: "confirmed", aiConfidence: 94 };
    if (f.key === "power")        return { ...f, value: "245",         aiStatus: "estimated", aiConfidence: 71 };
    return f;
  });
}

interface Props {
  onClose: () => void;
}

export default function AddVehicleSheet({ onClose }: Props) {
  const [step, setStep] = useState<"upload" | "filling" | "ai-done">("upload");
  const [fields, setFields] = useState<FormField[]>(INITIAL_FIELDS);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  function handleAiFill() {
    setIsAnalyzing(true);
    setStep("filling");
    setTimeout(() => {
      setFields(simulateAiFill(INITIAL_FIELDS));
      setIsAnalyzing(false);
      setStep("ai-done");
    }, 2200);
  }

  function updateField(key: string, value: string) {
    setFields((prev) =>
      prev.map((f) => (f.key === key ? { ...f, value, aiStatus: "confirmed" } : f))
    );
  }

  const missingCount  = fields.filter((f) => f.aiStatus === "missing" && !f.value).length;
  const confirmedCount = fields.filter((f) => f.aiStatus === "confirmed").length;
  const estimatedCount = fields.filter((f) => f.aiStatus === "estimated").length;

  return (
    <>
      {/* Backdrop */}
      <div className="sheet-backdrop" onClick={onClose} />

      {/* Panel */}
      <div className="sheet-panel">
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div>
            <h2 className="font-bold text-white" style={{ fontSize: 17 }}>Nouveau véhicule</h2>
            {step === "ai-done" && (
              <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>
                <span style={{ color: "var(--color-ai-green)" }}>{confirmedCount} confirmés</span>
                {" · "}
                <span style={{ color: "var(--color-ai-yellow)" }}>{estimatedCount} estimés</span>
                {" · "}
                <span style={{ color: "var(--color-ai-red)" }}>{missingCount} à remplir</span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-xl"
            style={{ width: 32, height: 32, background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4">

          {/* STEP 1 — Upload */}
          {step === "upload" && (
            <>
              <p style={{ fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                Ajoutez des photos ou un document. Robin remplit la fiche automatiquement.
              </p>

              {/* Upload zones */}
              <div className="flex gap-3">
                <button
                  onClick={handleAiFill}
                  className="flex-1 flex flex-col items-center justify-center gap-2 rounded-xl py-6 transition-colors"
                  style={{ background: "var(--color-surface)", border: "1px dashed var(--color-border-hover)" }}
                >
                  <Camera size={22} style={{ color: "var(--color-brand)" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)" }}>Photos</span>
                  <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>JPEG, PNG, HEIC</span>
                </button>

                <button
                  onClick={handleAiFill}
                  className="flex-1 flex flex-col items-center justify-center gap-2 rounded-xl py-6 transition-colors"
                  style={{ background: "var(--color-surface)", border: "1px dashed var(--color-border-hover)" }}
                >
                  <FileText size={22} style={{ color: "var(--color-brand)" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)" }}>Document</span>
                  <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>PDF, Carpass</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
                <span style={{ fontSize: 12, color: "var(--color-text-dim)" }}>ou</span>
                <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
              </div>

              <button className="btn-ghost w-full" onClick={() => setStep("ai-done")}>
                Remplir manuellement
              </button>
            </>
          )}

          {/* STEP 2 — Analyzing */}
          {step === "filling" && isAnalyzing && (
            <div className="flex flex-col items-center justify-center gap-4 py-10">
              <div
                className="flex items-center justify-center rounded-full animate-pulse-ring"
                style={{
                  width: 64,
                  height: 64,
                  background: "var(--color-brand-dim)",
                  border: "1px solid var(--color-brand)",
                }}
              >
                <Sparkles size={28} style={{ color: "var(--color-brand)" }} />
              </div>
              <div className="text-center">
                <p className="font-semibold text-white" style={{ fontSize: 15 }}>Robin analyse…</p>
                <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 4 }}>
                  Détection du modèle et extraction des données
                </p>
              </div>
            </div>
          )}

          {/* STEP 3 — Form with AI results */}
          {step === "ai-done" && (
            <>
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: "var(--color-ai-green-bg)", border: "1px solid rgba(0,200,83,0.2)" }}
              >
                <Sparkles size={16} style={{ color: "var(--color-ai-green)", flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: "var(--color-text)", lineHeight: 1.4 }}>
                  Robin a rempli <strong>{confirmedCount + estimatedCount} champs</strong> automatiquement.
                  Vérifiez et corrigez si nécessaire.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {fields.map((f) => {
                  const badge = AI_BADGE[f.aiStatus];
                  const fieldClass = f.aiStatus === "confirmed"
                    ? "field field-ai-green"
                    : f.aiStatus === "estimated"
                    ? "field field-ai-yellow"
                    : "field field-ai-red";

                  return (
                    <div key={f.key} className={fieldClass}>
                      <div className="flex items-center justify-between">
                        <label>{f.label}</label>
                        {f.aiStatus !== "missing" && (
                          <span
                            className="inline-flex items-center rounded-full px-2 py-0.5"
                            style={{ fontSize: 10, fontWeight: 600, color: badge.color, background: badge.bg }}
                          >
                            {badge.label}
                            {f.aiConfidence && ` · ${f.aiConfidence}%`}
                          </span>
                        )}
                      </div>

                      {f.type === "select" ? (
                        <select
                          value={f.value}
                          onChange={(e) => updateField(f.key, e.target.value)}
                        >
                          <option value="">Sélectionner…</option>
                          {f.options?.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={f.type ?? "text"}
                          value={f.value}
                          placeholder={f.placeholder}
                          onChange={(e) => updateField(f.key, e.target.value)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <button className="btn-primary w-full mt-2" style={{ height: 48, fontSize: 15, borderRadius: 14 }}>
                <ChevronRight size={16} />
                Continuer vers Lana
              </button>

              <div style={{ height: 24 }} />
            </>
          )}

        </div>
      </div>
    </>
  );
}
