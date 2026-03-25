import type {
  CompanyWebSearchParams,
  CompanyWebSearchResult,
  CompanyWebFinancialResult,
} from "./types";

export interface CompanyWebClientInterface {
  searchCompany(params: CompanyWebSearchParams): Promise<CompanyWebSearchResult>;
  getCompanyFinancials(companyNumber: string): Promise<CompanyWebFinancialResult>;
}
