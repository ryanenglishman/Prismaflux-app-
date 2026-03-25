"use client";

import { useMemo } from "react";
import type { VehicleData } from "@/lib/platforms/types";
import AiFieldWrapper from "./AiFieldWrapper";

const VAT_OPTIONS = [
  { value: "21", label: "21% (standard)" },
  { value: "0", label: "0% (marge)" },
];

interface StepPricingProps {
  formData: Partial<VehicleData>;
  confidence: Record<string, number>;
  sources: Record<string, string>;
  onUpdate: (key: string, value: unknown) => void;
}

export default function StepPricing({
  formData,
  confidence,
  sources,
  onUpdate,
}: StepPricingProps) {
  // Auto-calculate net price
  const netPrice = useMemo(() => {
    if (formData.price && formData.vatRate !== undefined) {
      return Math.round(formData.price / (1 + formData.vatRate / 100));
    }
    return formData.price;
  }, [formData.price, formData.vatRate]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Price */}
      <AiFieldWrapper
        fieldKey="price"
        confidence={confidence.price}
        source={sources.price}
        onCorrection={() => onUpdate("price", formData.price)}
      >
        <label>Prix de vente (EUR)</label>
        <input
          type="number"
          placeholder="ex: 34900"
          value={formData.price ?? ""}
          onChange={(e) =>
            onUpdate("price", e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </AiFieldWrapper>

      {/* VAT Rate */}
      <AiFieldWrapper
        fieldKey="vatRate"
        confidence={confidence.vatRate}
        source={sources.vatRate}
        onCorrection={() => onUpdate("vatRate", formData.vatRate)}
      >
        <label>TVA</label>
        <select
          value={formData.vatRate?.toString() ?? "21"}
          onChange={(e) => onUpdate("vatRate", Number(e.target.value))}
        >
          {VAT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </AiFieldWrapper>

      {/* Net Price (auto-calculated) */}
      <AiFieldWrapper fieldKey="netPrice" confidence={confidence.netPrice} source={sources.netPrice}>
        <label>Prix net HT (auto-calcule)</label>
        <input
          type="number"
          value={netPrice ?? formData.netPrice ?? ""}
          readOnly
          style={{ opacity: 0.7 }}
        />
      </AiFieldWrapper>

      {/* Negotiable toggle */}
      <div className="field">
        <label>Negociable</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 0",
          }}
        >
          <button
            type="button"
            onClick={() => onUpdate("isNegotiable", !formData.isNegotiable)}
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              background: formData.isNegotiable
                ? "var(--color-success)"
                : "var(--color-surface-2)",
              position: "relative",
              transition: "background 0.2s ease",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#fff",
                position: "absolute",
                top: 3,
                left: formData.isNegotiable ? 23 : 3,
                transition: "left 0.2s ease",
              }}
            />
          </button>
          <span style={{ fontSize: 14, color: "var(--color-text)" }}>
            {formData.isNegotiable ? "Oui" : "Non"}
          </span>
        </div>
      </div>

      {/* Country of Sale */}
      <AiFieldWrapper
        fieldKey="countryOfSale"
        confidence={confidence.countryOfSale}
        source={sources.countryOfSale}
      >
        <label>Pays de vente</label>
        <select
          value={(formData.countryOfSale as string) ?? "BE"}
          onChange={(e) => onUpdate("countryOfSale", e.target.value)}
        >
          <option value="BE">Belgique</option>
          <option value="FR">France</option>
          <option value="LU">Luxembourg</option>
          <option value="NL">Pays-Bas</option>
          <option value="DE">Allemagne</option>
        </select>
      </AiFieldWrapper>

      {/* Location Postal Code */}
      <AiFieldWrapper
        fieldKey="locationPostalCode"
        confidence={confidence.locationPostalCode}
        source={sources.locationPostalCode}
        onCorrection={() =>
          onUpdate("locationPostalCode", formData.locationPostalCode)
        }
      >
        <label>Code postal</label>
        <input
          type="text"
          placeholder="ex: 1000"
          value={(formData.locationPostalCode as string) ?? ""}
          onChange={(e) => onUpdate("locationPostalCode", e.target.value)}
        />
      </AiFieldWrapper>
    </div>
  );
}
