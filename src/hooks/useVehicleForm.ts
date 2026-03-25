"use client";

import { useState, useCallback } from "react";
import type { VehicleData } from "@/lib/platforms/types";

const TOTAL_STEPS = 6;

// Fields required per step for basic validation
const STEP_REQUIRED_FIELDS: Record<number, (keyof VehicleData)[]> = {
  0: [],                                          // Upload (no required fields)
  1: ["make", "model", "bodyType", "offerType"],  // Basic Info
  2: [],                                          // Details (all optional)
  3: [],                                          // Photos (optional for now)
  4: ["price"],                                   // Pricing
  5: [],                                          // Review
};

export interface UseVehicleFormReturn {
  formData: Partial<VehicleData>;
  confidence: Record<string, number>;
  sources: Record<string, string>;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateField: (key: string, value: unknown) => void;
  setAutofillResults: (result: {
    extractedFields: Record<string, unknown>;
    confidence: Record<string, number>;
    sources: Record<string, string>;
  }) => void;
  isStepValid: (step: number) => boolean;
}

export function useVehicleForm(): UseVehicleFormReturn {
  const [formData, setFormData] = useState<Partial<VehicleData>>({
    equipment: [],
    photos: [],
    currency: "EUR",
    countryOfSale: "BE",
    vehicleType: "car",
  });

  const [confidence, setConfidence] = useState<Record<string, number>>({});
  const [sources, setSources] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < TOTAL_STEPS) {
      setCurrentStep(step);
    }
  }, []);

  const updateField = useCallback((key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Mark user-corrected fields
    setConfidence((prev) => ({ ...prev, [key]: 1.0 }));
    setSources((prev) => ({ ...prev, [key]: "user" }));
  }, []);

  const setAutofillResults = useCallback(
    (result: {
      extractedFields: Record<string, unknown>;
      confidence: Record<string, number>;
      sources: Record<string, string>;
    }) => {
      setFormData((prev) => ({ ...prev, ...result.extractedFields }));
      setConfidence((prev) => ({ ...prev, ...result.confidence }));
      setSources((prev) => ({ ...prev, ...result.sources }));
    },
    []
  );

  const isStepValid = useCallback(
    (step: number): boolean => {
      const required = STEP_REQUIRED_FIELDS[step] ?? [];
      const data = formData as Record<string, unknown>;
      return required.every((field) => {
        const val = data[field];
        return val !== undefined && val !== null && val !== "";
      });
    },
    [formData]
  );

  return {
    formData,
    confidence,
    sources,
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    updateField,
    setAutofillResults,
    isStepValid,
  };
}
