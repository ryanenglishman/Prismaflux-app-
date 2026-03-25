"use client";

import type { ReactNode } from "react";

interface AiFieldWrapperProps {
  fieldKey: string;
  confidence?: number;
  source?: string;
  children: ReactNode;
  onCorrection?: () => void;
}

export default function AiFieldWrapper({
  fieldKey,
  confidence,
  source,
  children,
  onCorrection,
}: AiFieldWrapperProps) {
  const isAiFilled = source !== undefined && source !== "user";
  const isUserCorrected = source === "user" && confidence === 1.0;

  // Determine confidence class for the yellow left border
  const fieldClass = isAiFilled ? "field-ai-yellow" : "";

  // Confidence label
  let confidenceLabel: string | null = null;
  if (isAiFilled && confidence !== undefined) {
    const pct = Math.round(confidence * 100);
    if (pct >= 90) {
      confidenceLabel = `Devine avec ${pct}% de certitude par Robin`;
    } else if (pct >= 70) {
      confidenceLabel = `Devine a ${pct}% de certitude par Robin`;
    }
  }

  return (
    <div className={`field ${fieldClass}`} data-field-key={fieldKey}>
      {children}

      {confidenceLabel && (
        <span
          style={{
            fontSize: 11,
            color: "var(--color-ai-yellow)",
            marginTop: 2,
            display: "block",
          }}
        >
          {confidenceLabel}
        </span>
      )}

      {isUserCorrected && onCorrection && (
        <span
          style={{
            fontSize: 11,
            color: "var(--color-text-dim)",
            marginTop: 2,
            display: "block",
            fontStyle: "italic",
          }}
        >
          Pour ameliorer le travail de Robin
        </span>
      )}
    </div>
  );
}
