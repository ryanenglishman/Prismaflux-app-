const eurFormatter = new Intl.NumberFormat("fr-BE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function qualifyBusiness(
  grossMargin: number | null | undefined,
  marginMin: number,
  marginMax: number
): { isQualified: boolean; note: string } {
  if (grossMargin === null || grossMargin === undefined) {
    return {
      isQualified: false,
      note: "Marge brute inconnue",
    };
  }

  if (grossMargin >= marginMin && grossMargin <= marginMax) {
    return {
      isQualified: true,
      note: `Marge brute de ${eurFormatter.format(grossMargin)} (cible : ${eurFormatter.format(marginMin)} - ${eurFormatter.format(marginMax)})`,
    };
  }

  if (grossMargin < marginMin) {
    return {
      isQualified: false,
      note: `Marge brute de ${eurFormatter.format(grossMargin)} en dessous du minimum de ${eurFormatter.format(marginMin)}`,
    };
  }

  return {
    isQualified: false,
    note: `Marge brute de ${eurFormatter.format(grossMargin)} au-dessus du maximum de ${eurFormatter.format(marginMax)}`,
  };
}
