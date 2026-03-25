"use client";

import { useMemo } from "react";
import type { VehicleData } from "@/lib/platforms/types";
import AiFieldWrapper from "./AiFieldWrapper";

const DRIVETRAIN_OPTIONS = [
  { value: "avant", label: "Traction avant" },
  { value: "arriere", label: "Propulsion" },
  { value: "integrale", label: "Integrale (4x4)" },
];

interface StepDetailsProps {
  formData: Partial<VehicleData>;
  confidence: Record<string, number>;
  sources: Record<string, string>;
  onUpdate: (key: string, value: unknown) => void;
}

export default function StepDetails({
  formData,
  confidence,
  sources,
  onUpdate,
}: StepDetailsProps) {
  // Auto-calculate HP from kW
  const powerHp = useMemo(() => {
    if (formData.power) {
      return Math.round(formData.power * 1.35962);
    }
    return undefined;
  }, [formData.power]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Power (kW) */}
      <AiFieldWrapper
        fieldKey="power"
        confidence={confidence.power}
        source={sources.power}
        onCorrection={() => onUpdate("power", formData.power)}
      >
        <label>Puissance (kW)</label>
        <input
          type="number"
          placeholder="ex: 110"
          value={formData.power ?? ""}
          onChange={(e) => {
            const val = e.target.value ? Number(e.target.value) : undefined;
            onUpdate("power", val);
            // Auto-calculate HP
            if (val) {
              onUpdate("powerHp", Math.round(val * 1.35962));
            }
          }}
        />
      </AiFieldWrapper>

      {/* Power HP (auto-calculated) */}
      <AiFieldWrapper fieldKey="powerHp" confidence={confidence.powerHp} source={sources.powerHp}>
        <label>Puissance (ch) — auto-calcule</label>
        <input
          type="number"
          value={powerHp ?? formData.powerHp ?? ""}
          readOnly
          style={{ opacity: 0.7 }}
        />
      </AiFieldWrapper>

      {/* Engine Size */}
      <AiFieldWrapper
        fieldKey="engineSize"
        confidence={confidence.engineSize}
        source={sources.engineSize}
        onCorrection={() => onUpdate("engineSize", formData.engineSize)}
      >
        <label>Cylindree (cc)</label>
        <input
          type="number"
          placeholder="ex: 1998"
          value={formData.engineSize ?? ""}
          onChange={(e) =>
            onUpdate("engineSize", e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </AiFieldWrapper>

      {/* Drivetrain */}
      <AiFieldWrapper
        fieldKey="drivetrain"
        confidence={confidence.drivetrain}
        source={sources.drivetrain}
        onCorrection={() => onUpdate("drivetrain", formData.drivetrain)}
      >
        <label>Transmission</label>
        <select
          value={(formData.drivetrain as string) ?? ""}
          onChange={(e) => onUpdate("drivetrain", e.target.value)}
        >
          <option value="">Selectionner...</option>
          {DRIVETRAIN_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </AiFieldWrapper>

      {/* Gears */}
      <AiFieldWrapper
        fieldKey="gears"
        confidence={confidence.gears}
        source={sources.gears}
        onCorrection={() => onUpdate("gears", formData.gears)}
      >
        <label>Nombre de vitesses</label>
        <select
          value={formData.gears ?? ""}
          onChange={(e) =>
            onUpdate("gears", e.target.value ? Number(e.target.value) : undefined)
          }
        >
          <option value="">Selectionner...</option>
          {[4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </AiFieldWrapper>

      {/* Cylinders */}
      <AiFieldWrapper
        fieldKey="cylinders"
        confidence={confidence.cylinders}
        source={sources.cylinders}
        onCorrection={() => onUpdate("cylinders", formData.cylinders)}
      >
        <label>Nombre de cylindres</label>
        <select
          value={formData.cylinders ?? ""}
          onChange={(e) =>
            onUpdate("cylinders", e.target.value ? Number(e.target.value) : undefined)
          }
        >
          <option value="">Selectionner...</option>
          {[2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </AiFieldWrapper>

      {/* CO2 Emission */}
      <AiFieldWrapper
        fieldKey="co2Emission"
        confidence={confidence.co2Emission}
        source={sources.co2Emission}
        onCorrection={() => onUpdate("co2Emission", formData.co2Emission)}
      >
        <label>Emission CO2 (g/km)</label>
        <input
          type="number"
          placeholder="ex: 120"
          value={formData.co2Emission ?? ""}
          onChange={(e) =>
            onUpdate("co2Emission", e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </AiFieldWrapper>

      {/* Doors */}
      <AiFieldWrapper
        fieldKey="doors"
        confidence={confidence.doors}
        source={sources.doors}
        onCorrection={() => onUpdate("doors", formData.doors)}
      >
        <label>Portes</label>
        <select
          value={formData.doors ?? ""}
          onChange={(e) =>
            onUpdate("doors", e.target.value ? Number(e.target.value) : undefined)
          }
        >
          <option value="">Selectionner...</option>
          {[2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </AiFieldWrapper>

      {/* Seats */}
      <AiFieldWrapper
        fieldKey="seats"
        confidence={confidence.seats}
        source={sources.seats}
        onCorrection={() => onUpdate("seats", formData.seats)}
      >
        <label>Places</label>
        <select
          value={formData.seats ?? ""}
          onChange={(e) =>
            onUpdate("seats", e.target.value ? Number(e.target.value) : undefined)
          }
        >
          <option value="">Selectionner...</option>
          {[2, 4, 5, 6, 7, 8, 9].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </AiFieldWrapper>

      {/* Description */}
      <AiFieldWrapper
        fieldKey="description"
        confidence={confidence.description}
        source={sources.description}
        onCorrection={() => onUpdate("description", formData.description)}
      >
        <label>Description</label>
        <textarea
          rows={4}
          placeholder="Decrivez le vehicule..."
          value={(formData.description as string) ?? ""}
          onChange={(e) => onUpdate("description", e.target.value)}
          style={{ resize: "vertical" }}
        />
      </AiFieldWrapper>
    </div>
  );
}
