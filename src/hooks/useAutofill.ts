"use client";

import { useState, useCallback } from "react";
import type { AutofillResult } from "@/lib/ai/types";

export interface UseAutofillReturn {
  autofill: (files: File[]) => Promise<AutofillResult>;
  isAnalyzing: boolean;
}

export function useAutofill(): UseAutofillReturn {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const autofill = useCallback(async (files: File[]): Promise<AutofillResult> => {
    setIsAnalyzing(true);

    try {
      const formData = new FormData();

      for (const file of files) {
        if (file.type === "application/pdf") {
          formData.append("documents", file);
        } else {
          formData.append("photos", file);
        }
      }

      const res = await fetch("/api/robin/autofill", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Erreur lors de l'analyse");
      }

      const result: AutofillResult = await res.json();
      return result;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return { autofill, isAnalyzing };
}
