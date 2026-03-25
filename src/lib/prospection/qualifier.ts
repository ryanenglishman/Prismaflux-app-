// ── Logique de qualification des entreprises ──

export interface QualificationResult {
  isQualified: boolean;
  note: string;
}

export function qualifyBusiness(
  grossMargin: number | null | undefined,
  marginMin: number,
  marginMax: number
): QualificationResult {
  if (grossMargin == null) {
    return {
      isQualified: false,
      note: "Marge brute non disponible",
    };
  }

  if (grossMargin >= marginMin && grossMargin <= marginMax) {
    return {
      isQualified: true,
      note: `Marge brute ${formatEUR(grossMargin)} dans la fourchette cible`,
    };
  }

  if (grossMargin < marginMin) {
    return {
      isQualified: false,
      note: `Marge brute ${formatEUR(grossMargin)} en dessous du minimum (${formatEUR(marginMin)})`,
    };
  }

  return {
    isQualified: false,
    note: `Marge brute ${formatEUR(grossMargin)} au-dessus du maximum (${formatEUR(marginMax)})`,
  };
}

function formatEUR(amount: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
