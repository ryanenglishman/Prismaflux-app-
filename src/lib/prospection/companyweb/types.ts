// ── Types pour le client CompanyWeb ──

export interface CompanyWebSearchParams {
  name: string;
  city?: string;
}

export interface CompanyWebEntry {
  companyNumber: string; // BCE format 0XXX.XXX.XXX
  name: string;
  address?: string;
  legalForm?: string;
  isActive: boolean;
}

export interface CompanyWebFinancials {
  grossMargin?: number; // marge brute annuelle EUR
  revenue?: number; // chiffre d'affaires
  netProfit?: number; // benefice net
  employees?: number;
  fiscalYear?: string;
}

export interface CompanyWebSearchResult {
  success: boolean;
  companies: CompanyWebEntry[];
  errors?: { message: string }[];
}

export interface CompanyWebFinancialResult {
  success: boolean;
  financials?: CompanyWebFinancials;
  errors?: { message: string }[];
}
