import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "../components/Logo";
import { SectionTitle } from "../components/SectionTitle";
import { CompetitorRow } from "../components/CompetitorRow";
import type { CompetitorData } from "../../types";

const s = StyleSheet.create({
  page: {
    backgroundColor: PDF_THEME.pageBg,
    padding: PDF_THEME.margin,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  pageNum: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    color: PDF_THEME.textMuted,
  },
  table: {
    borderWidth: 1,
    borderColor: PDF_THEME.border,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 24,
  },
  tableHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: PDF_THEME.sectionBg,
    borderBottomWidth: 1,
    borderBottomColor: PDF_THEME.border,
  },
  thName: {
    flex: 3,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 700,
    color: PDF_THEME.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  th: {
    flex: 1.5,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 700,
    color: PDF_THEME.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "center",
  },
  insightBox: {
    backgroundColor: PDF_THEME.yellowDim,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: PDF_THEME.yellow,
  },
  insightTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 11,
    fontWeight: 700,
    color: PDF_THEME.textPrimary,
    marginBottom: 6,
  },
  insightText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.6,
  },
});

interface CompetitorPageProps {
  dealerName: string;
  competitors: CompetitorData[];
}

export function CompetitorPage({
  dealerName,
  competitors,
}: CompetitorPageProps) {
  const dealerRow: CompetitorData = {
    name: `${dealerName} (vous)`,
    googleRating: null,
    googleReviewCount: null,
    pageSpeedScore: null,
    hasLocalBusiness: false,
  };

  const avgReviews =
    competitors.reduce((sum, c) => sum + (c.googleReviewCount ?? 0), 0) /
    competitors.length;

  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>6 / 8</Text>
      </View>

      <SectionTitle
        title="Analyse Concurrentielle"
        subtitle="Comparaison avec vos principaux concurrents locaux"
      />

      <View style={s.table}>
        <View style={s.tableHeaderRow}>
          <Text style={s.thName}>Concession</Text>
          <Text style={s.th}>Note Google</Text>
          <Text style={s.th}>Nb avis</Text>
          <Text style={s.th}>PageSpeed</Text>
          <Text style={s.th}>Schema Local</Text>
        </View>
        <CompetitorRow data={dealerRow} highlight />
        {competitors.map((c, i) => (
          <CompetitorRow key={i} data={c} />
        ))}
      </View>

      <View style={s.insightBox}>
        <Text style={s.insightTitle}>Ce que cela signifie pour vous</Text>
        <Text style={s.insightText}>
          Vos concurrents ont en moyenne {Math.round(avgReviews)} avis Google.
          Les clients font confiance aux garages avec plus de 100 avis et une
          note superieure a 4.3. Une strategie de collecte d'avis systematique
          peut combler cet ecart en 3-6 mois.
        </Text>
      </View>
    </Page>
  );
}
