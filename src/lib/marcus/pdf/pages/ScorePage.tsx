import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME, scoreColor } from "../theme";
import { ScoreGauge } from "../components/ScoreGauge";
import { Logo } from "../components/Logo";
import { SectionTitle } from "../components/SectionTitle";

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
  center: {
    alignItems: "center",
    marginVertical: 24,
  },
  summary: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 13,
    color: PDF_THEME.textSecondary,
    textAlign: "center",
    lineHeight: 1.6,
    marginTop: 16,
    maxWidth: 400,
  },
  barsContainer: {
    marginTop: 40,
    gap: 16,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  barLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 11,
    fontWeight: 500,
    color: PDF_THEME.textPrimary,
    width: 80,
  },
  barTrack: {
    flex: 1,
    height: 16,
    backgroundColor: PDF_THEME.borderLight,
    borderRadius: 8,
  },
  barFill: {
    height: 16,
    borderRadius: 8,
  },
  barScore: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 11,
    fontWeight: 700,
    width: 40,
    textAlign: "right",
  },
});

interface ScorePageProps {
  globalScore: number;
  subScores: { technique: number; seo: number; local: number };
  dealerName: string;
}

function ScoreBar({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  const color = scoreColor(score);
  return (
    <View style={s.barRow}>
      <Text style={s.barLabel}>{label}</Text>
      <View style={s.barTrack}>
        <View
          style={[
            s.barFill,
            { width: `${Math.min(score, 100)}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={[s.barScore, { color }]}>{score}</Text>
    </View>
  );
}

export function ScorePage({
  globalScore,
  subScores,
  dealerName,
}: ScorePageProps) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>2 / 8</Text>
      </View>

      <SectionTitle
        title="Score Global"
        subtitle={`Evaluation de la presence digitale de ${dealerName}`}
      />

      <View style={s.center}>
        <ScoreGauge score={globalScore} size={160} />
        <Text style={s.summary}>
          {globalScore >= 70
            ? "Votre presence en ligne est solide. Quelques optimisations vous permettraient de devancer vos concurrents."
            : globalScore >= 50
              ? "Votre site a des bases correctes mais plusieurs points critiques freinent votre visibilite en ligne."
              : "Votre presence digitale necessite des ameliorations significatives. Vos concurrents ont une avance notable."}
        </Text>
      </View>

      <View style={s.barsContainer}>
        <ScoreBar label="Technique" score={subScores.technique} />
        <ScoreBar label="SEO" score={subScores.seo} />
        <ScoreBar label="Local" score={subScores.local} />
      </View>
    </Page>
  );
}
