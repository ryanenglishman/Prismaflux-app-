export const PDF_THEME = {
  // Backgrounds
  pageBg: "#FFFFFF",
  sectionBg: "#F8F9FA",
  cardBg: "#F1F3F5",

  // Text
  textPrimary: "#111827",
  textSecondary: "#4B5563",
  textMuted: "#9CA3AF",

  // Accents
  marcusBlue: "#448AFF",
  marcusBlueDim: "#E3ECFF",
  prismaRed: "#FF1744",
  prismaRedDim: "#FFE5EB",

  // Status
  green: "#00C853",
  greenDim: "#E8F5E9",
  yellow: "#F59E0B",
  yellowDim: "#FFF8E1",
  red: "#FF1744",
  redDim: "#FFE5EB",

  // Borders
  border: "#E5E7EB",
  borderLight: "#F3F4F6",

  // Page dimensions (A4 in points)
  pageWidth: 595.28,
  pageHeight: 841.89,
  margin: 48,

  // Font
  fontFamily: "Inter",
} as const;

export function scoreColor(score: number) {
  if (score >= 70) return PDF_THEME.green;
  if (score >= 50) return PDF_THEME.yellow;
  return PDF_THEME.red;
}

export function scoreColorDim(score: number) {
  if (score >= 70) return PDF_THEME.greenDim;
  if (score >= 50) return PDF_THEME.yellowDim;
  return PDF_THEME.redDim;
}

export function statusColor(status: "ok" | "warn" | "error") {
  if (status === "ok") return PDF_THEME.green;
  if (status === "warn") return PDF_THEME.yellow;
  return PDF_THEME.red;
}

export function statusColorDim(status: "ok" | "warn" | "error") {
  if (status === "ok") return PDF_THEME.greenDim;
  if (status === "warn") return PDF_THEME.yellowDim;
  return PDF_THEME.redDim;
}

export function statusLabel(status: "ok" | "warn" | "error") {
  if (status === "ok") return "OK";
  if (status === "warn") return "A ameliorer";
  return "Critique";
}

export function impactLabel(impact: "high" | "medium" | "low") {
  if (impact === "high") return "Impact eleve";
  if (impact === "medium") return "Impact moyen";
  return "Impact faible";
}

export function difficultyLabel(difficulty: "easy" | "medium" | "hard") {
  if (difficulty === "easy") return "Facile";
  if (difficulty === "medium") return "Moyen";
  return "Complexe";
}
