import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "../components/Logo";

const s = StyleSheet.create({
  page: {
    backgroundColor: PDF_THEME.pageBg,
    padding: PDF_THEME.margin,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: PDF_THEME.marcusBlue,
  },
  badge: {
    backgroundColor: PDF_THEME.marcusBlueDim,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 32,
  },
  badgeText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    fontWeight: 600,
    color: PDF_THEME.marcusBlue,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  title: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 32,
    fontWeight: 700,
    color: PDF_THEME.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 14,
    color: PDF_THEME.textSecondary,
    textAlign: "center",
    marginBottom: 48,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: PDF_THEME.marcusBlue,
    borderRadius: 2,
    marginBottom: 32,
  },
  dealerName: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 20,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  dealerUrl: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 12,
    color: PDF_THEME.marcusBlue,
    textAlign: "center",
    marginBottom: 4,
  },
  dealerCity: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 12,
    color: PDF_THEME.textMuted,
    textAlign: "center",
    marginBottom: 4,
  },
  date: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    color: PDF_THEME.textMuted,
    textAlign: "center",
    marginTop: 8,
  },
  footer: {
    position: "absolute",
    bottom: PDF_THEME.margin,
    left: PDF_THEME.margin,
    right: PDF_THEME.margin,
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    color: PDF_THEME.textMuted,
    textAlign: "center",
  },
});

interface CoverPageProps {
  dealerName: string;
  dealerUrl: string;
  dealerCity: string;
  auditDate: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function CoverPage({
  dealerName,
  dealerUrl,
  dealerCity,
  auditDate,
}: CoverPageProps) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.topBar} />
      <View style={s.badge}>
        <Text style={s.badgeText}>Rapport confidentiel</Text>
      </View>
      <Text style={s.title}>Audit Digital Gratuit</Text>
      <Text style={s.subtitle}>
        Analyse complete de votre presence en ligne
      </Text>
      <View style={s.divider} />
      <Text style={s.dealerName}>{dealerName}</Text>
      <Text style={s.dealerUrl}>{dealerUrl}</Text>
      <Text style={s.dealerCity}>{dealerCity}</Text>
      <Text style={s.date}>{formatDate(auditDate)}</Text>
      <View style={s.footer}>
        <Logo size="small" />
        <Text style={s.footerText}>
          Genere par Marcus, copilote IA PrismaFlux Auto
        </Text>
      </View>
    </Page>
  );
}
