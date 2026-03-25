import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  bar: {
    width: 4,
    height: 24,
    borderRadius: 2,
    backgroundColor: PDF_THEME.marcusBlue,
  },
  title: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 16,
    fontWeight: 700,
    color: PDF_THEME.textPrimary,
  },
  subtitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    color: PDF_THEME.textMuted,
    marginTop: 2,
  },
});

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <View style={s.container}>
      <View style={s.bar} />
      <View>
        <Text style={s.title}>{title}</Text>
        {subtitle && <Text style={s.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}
