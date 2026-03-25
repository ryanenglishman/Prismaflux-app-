export interface AuditCheckItem {
  label: string;
  status: "ok" | "warn" | "error";
  detail: string;
  recommendation?: string;
}

export interface CompetitorData {
  name: string;
  googleRating: number | null;
  googleReviewCount: number | null;
  pageSpeedScore: number | null;
  hasLocalBusiness: boolean;
}

export interface PriorityAction {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  difficulty: "easy" | "medium" | "hard";
}

export interface AuditReportData {
  dealerName: string;
  dealerUrl: string;
  dealerCity: string;
  auditDate: string;
  globalScore: number;
  subScores: {
    technique: number;
    seo: number;
    local: number;
  };
  technicalChecks: AuditCheckItem[];
  seoChecks: AuditCheckItem[];
  localPresence: {
    cityMentions: number;
    serviceMentions: string[];
    missingKeywords: string[];
  };
  competitors: CompetitorData[];
  priorityActions: PriorityAction[];
}
