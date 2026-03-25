import React from "react";
import { View, Text, Svg, Circle, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";

const s = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  wordmark: {
    fontFamily: PDF_THEME.fontFamily,
    fontWeight: 700,
    color: PDF_THEME.textPrimary,
  },
  sub: {
    fontFamily: PDF_THEME.fontFamily,
    fontWeight: 400,
    color: PDF_THEME.textMuted,
  },
});

interface LogoProps {
  size?: "small" | "large";
}

export function Logo({ size = "small" }: LogoProps) {
  const circleR = size === "large" ? 18 : 11;
  const svgSize = circleR * 2 + 4;
  const fontSize = size === "large" ? 22 : 13;
  const subSize = size === "large" ? 12 : 8;

  return (
    <View style={s.row}>
      <Svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
        <Circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={circleR}
          fill={PDF_THEME.prismaRed}
        />
      </Svg>
      <View>
        <Text style={[s.wordmark, { fontSize }]}>PrismaFlux Auto</Text>
        {size === "large" && (
          <Text style={[s.sub, { fontSize: subSize }]}>
            Vos copilotes IA pour l'automobile
          </Text>
        )}
      </View>
    </View>
  );
}
