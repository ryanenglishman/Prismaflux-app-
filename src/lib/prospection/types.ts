// ── Types domaine pour la prospection d'entreprises ──

export interface SearchParams {
  location: string;
  radius: number; // km
  businessType: string;
  maxResults: number;
  marginMin: number; // EUR
  marginMax: number; // EUR
}

export interface ProspectBusinessData {
  // Google Maps
  name: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  googleRating: number | null;
  googleReviewCount: number | null;
  latitude: number | null;
  longitude: number | null;
  // CompanyWeb
  companyNumber: string | null;
  grossMargin: number | null;
  revenue: number | null;
  netProfit: number | null;
  employees: number | null;
  legalForm: string | null;
  // Qualification
  isQualified: boolean;
  qualificationNote: string | null;
  enrichedAt: string | null;
}

export interface SearchResult {
  searchId: string;
  status: "pending" | "searching" | "enriching" | "done" | "error";
  totalFound: number;
  totalQualified: number;
  businesses: ProspectBusinessData[];
}
