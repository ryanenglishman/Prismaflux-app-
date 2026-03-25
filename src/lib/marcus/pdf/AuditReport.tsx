import React from "react";
import { Document } from "@react-pdf/renderer";
import type { AuditReportData } from "../types";
import { CoverPage } from "./pages/CoverPage";
import { ScorePage } from "./pages/ScorePage";
import { TechnicalAuditPage } from "./pages/TechnicalAuditPage";
import { SeoPage } from "./pages/SeoPage";
import { LocalPresencePage } from "./pages/LocalPresencePage";
import { CompetitorPage } from "./pages/CompetitorPage";
import { ActionsPage } from "./pages/ActionsPage";
import { CtaPage } from "./pages/CtaPage";

interface AuditReportProps {
  data: AuditReportData;
}

export function AuditReport({ data }: AuditReportProps) {
  return (
    <Document
      title={`Audit Digital — ${data.dealerName}`}
      author="PrismaFlux Auto — Marcus"
      subject="Audit de presence digitale"
      creator="Marcus, copilote IA PrismaFlux"
    >
      <CoverPage
        dealerName={data.dealerName}
        dealerUrl={data.dealerUrl}
        dealerCity={data.dealerCity}
        auditDate={data.auditDate}
      />
      <ScorePage
        globalScore={data.globalScore}
        subScores={data.subScores}
        dealerName={data.dealerName}
      />
      <TechnicalAuditPage checks={data.technicalChecks} />
      <SeoPage checks={data.seoChecks} />
      <LocalPresencePage
        cityMentions={data.localPresence.cityMentions}
        serviceMentions={data.localPresence.serviceMentions}
        missingKeywords={data.localPresence.missingKeywords}
        dealerCity={data.dealerCity}
      />
      <CompetitorPage
        dealerName={data.dealerName}
        competitors={data.competitors}
      />
      <ActionsPage actions={data.priorityActions} />
      <CtaPage />
    </Document>
  );
}
