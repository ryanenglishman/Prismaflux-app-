export interface CompanyWebEntry {
  companyNumber: string;
  name: string;
  legalForm?: string;
}

export interface CompanyWebFinancials {
  grossMargin?: number;
  revenue?: number;
  netProfit?: number;
  employees?: number;
}

export interface CompanyWebSearchResult {
  success: boolean;
  companies: CompanyWebEntry[];
  errors?: string[];
}

export interface CompanyWebFinancialResult {
  success: boolean;
  financials?: CompanyWebFinancials;
  errors?: string[];
}
