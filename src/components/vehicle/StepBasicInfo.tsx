"use client";

import { useMemo } from "react";
import type { VehicleData } from "@/lib/platforms/types";
import {
  AS24_MAKES,
  AS24_BODY_TYPES,
  AS24_BODY_COLORS,
  AS24_FUEL_CATEGORIES,
  AS24_TRANSMISSIONS,
} from "@/lib/platforms/autoscout24/references";
import AiFieldWrapper from "./AiFieldWrapper";

// Deduplicate fuel/transmission display values
const FUEL_OPTIONS = Array.from(
  new Set(
    Object.entries(AS24_FUEL_CATEGORIES)
      .filter(([key]) => {
        // Only keep French labels for display
        const frenchKeys = [
          "essence", "gazole", "electrique", "hybride",
          "hybride rechargeable", "gpl", "gnc", "hydrogene", "bioethanol",
        ];
        return frenchKeys.includes(key);
      })
      .map(([key]) => key)
  )
);

const TRANSMISSION_OPTIONS = ["manuelle", "automatique", "semi-automatique"];

const OFFER_TYPE_OPTIONS = [
  { value: "occasion", label: "Occasion" },
  { value: "neuf", label: "Neuf" },
  { value: "demonstration", label: "Demo" },
];

interface StepBasicInfoProps {
  formData: Partial<VehicleData>;
  confidence: Record<string, number>;
  sources: Record<string, string>;
  onUpdate: (key: string, value: unknown) => void;
}

export default function StepBasicInfo({
  formData,
  confidence,
  sources,
  onUpdate,
}: StepBasicInfoProps) {
  // Get models for selected make
  const models = useMemo(() => {
    if (!formData.make) return [];
    const makeEntry = AS24_MAKES.find(
      (m) => m.name.toLowerCase() === (formData.make as string).toLowerCase()
    );
    return makeEntry?.models ?? [];
  }, [formData.make]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Make */}
      <AiFieldWrapper
        fieldKey="make"
        confidence={confidence.make}
        source={sources.make}
        onCorrection={() => onUpdate("make", formData.make)}
      >
        <label>Marque</label>
        <select
          value={(formData.make as string) ?? ""}
          onChange={(e) => {
            onUpdate("make", e.target.value);
            // Reset model when make changes
            onUpdate("model", "");
          }}
        >
          <option value="">Selectionner...</option>
          {AS24_MAKES.map((make) => (
            <option key={make.id} value={make.name}>
              {make.name}
            </option>
          ))}
        </select>
      </AiFieldWrapper>

      {/* Model */}
      <AiFieldWrapper
        fieldKey="model"
        confidence={confidence.model}
        source={sources.model}
        onCorrection={() => onUpdate("model", formData.model)}
      >
        <label>Modele</label>
        <select
          value={(formData.model as string) ?? ""}
          onChange={(e) => onUpdate("model", e.target.value)}
          disabled={!formData.make}
        >
          <option value="">Selectionner...</option>
          {models.map((model) => (
            <option key={model.id} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </AiFieldWrapper>

      {/* Body Type */}
      <AiFieldWrapper
        fieldKey="bodyType"
        confidence={confidence.bodyType}
        source={sources.bodyType}
        onCorrection={() => onUpdate("bodyType", formData.bodyType)}
      >
        <label>Type de carrosserie</label>
        <select
          value={(formData.bodyType as string) ?? ""}
          onChange={(e) => onUpdate("bodyType", e.target.value)}
        >
          <option value="">Selectionner...</option>
          {AS24_BODY_TYPES.map((bt) => (
            <option key={bt.id} value={bt.name}>
              {bt.name}
            </option>
          ))}
        </select>
      </AiFieldWrapper>

      {/* Offer Type */}
      <AiFieldWrapper
        fieldKey="offerType"
        confidence={confidence.offerType}
        source={sources.offerType}
        onCorrection={() => onUpdate("offerType", formData.offerType)}
      >
        <label>Type d&apos;offre</label>
        <select
          value={(formData.offerType as string) ?? ""}
          onChange={(e) => onUpdate("offerType", e.target.value)}
        >
          <option value="">Selectionner...</option>
          {OFFER_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </AiFieldWrapper>

      {/* First Registration Date */}
      <AiFieldWrapper
        fieldKey="firstRegistrationDate"
        confidence={confidence.firstRegistrationDate}
        source={sources.firstRegistrationDate}
        onCorrection={() =>
          onUpdate("firstRegistrationDate", formData.firstRegistrationDate)
        }
      >
        <label>Date de premiere immatriculation</label>
        <input
          type="date"
          value={(formData.firstRegistrationDate as string) ?? ""}
          onChange={(e) => onUpdate("firstRegistrationDate", e.target.value)}
        />
      </AiFieldWrapper>

      {/* Mileage */}
      <AiFieldWrapper
        fieldKey="mileage"
        confidence={confidence.mileage}
        source={sources.mileage}
        onCorrection={() => onUpdate("mileage", formData.mileage)}
      >
        <label>Kilometrage</label>
        <input
          type="number"
          placeholder="ex: 45000"
          value={formData.mileage ?? ""}
          onChange={(e) =>
            onUpdate("mileage", e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </AiFieldWrapper>

      {/* Fuel Type */}
      <AiFieldWrapper
        fieldKey="fuelType"
        confidence={confidence.fuelType}
        source={sources.fuelType}
        onCorrection={() => onUpdate("fuelType", formData.fuelType)}
      >
        <label>Carburant</label>
        <select
          value={(formData.fuelType as string) ?? ""}
          onChange={(e) => onUpdate("fuelType", e.target.value)}
        >
          <option value="">Selectionner...</option>
          {FUEL_OPTIONS.map((fuel) => (
            <option key={fuel} value={fuel}>
              {fuel.charAt(0).toUpperCase() + fuel.slice(1)}
            </option>
          ))}
        </select>
      </AiFieldWrapper>

      {/* Transmission */}
      <AiFieldWrapper
        fieldKey="transmission"
        confidence={confidence.transmission}
        source={sources.transmission}
        onCorrection={() => onUpdate("transmission", formData.transmission)}
      >
        <label>Transmission</label>
        <select
          value={(formData.transmission as string) ?? ""}
          onChange={(e) => onUpdate("transmission", e.target.value)}
        >
          <option value="">Selectionner...</option>
          {TRANSMISSION_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </AiFieldWrapper>

      {/* Body Color */}
      <AiFieldWrapper
        fieldKey="bodyColor"
        confidence={confidence.bodyColor}
        source={sources.bodyColor}
        onCorrection={() => onUpdate("bodyColor", formData.bodyColor)}
      >
        <label>Couleur</label>
        <select
          value={(formData.bodyColor as string) ?? ""}
          onChange={(e) => onUpdate("bodyColor", e.target.value)}
        >
          <option value="">Selectionner...</option>
          {AS24_BODY_COLORS.map((color) => (
            <option key={color.id} value={color.name}>
              {color.name}
            </option>
          ))}
        </select>
      </AiFieldWrapper>
    </div>
  );
}
