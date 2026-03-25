import type { CompanyWebClientInterface } from "./client-interface";
import type {
  CompanyWebSearchParams,
  CompanyWebSearchResult,
  CompanyWebFinancialResult,
  CompanyWebEntry,
  CompanyWebFinancials,
} from "./types";

// ── Données mock — entreprises belges avec données financières réalistes ──

interface MockCompanyData {
  entry: CompanyWebEntry;
  financials: CompanyWebFinancials;
}

const MOCK_COMPANIES: Record<string, MockCompanyData> = {
  "Garage Dubois & Fils": {
    entry: {
      companyNumber: "0456.123.456",
      name: "Garage Dubois & Fils SPRL",
      address: "Rue de la Loi 45, 1000 Bruxelles",
      legalForm: "SPRL",
      isActive: true,
    },
    financials: {
      grossMargin: 850000,
      revenue: 3200000,
      netProfit: 120000,
      employees: 12,
      fiscalYear: "2024",
    },
  },
  "AutoCenter Janssens": {
    entry: {
      companyNumber: "0478.234.567",
      name: "AutoCenter Janssens SA",
      address: "Avenue Louise 220, 1050 Ixelles",
      legalForm: "SA",
      isActive: true,
    },
    financials: {
      grossMargin: 1450000,
      revenue: 5800000,
      netProfit: 280000,
      employees: 25,
      fiscalYear: "2024",
    },
  },
  "Carrosserie Van den Berg": {
    entry: {
      companyNumber: "0412.345.678",
      name: "Carrosserie Van den Berg SRL",
      address: "Chaussée de Waterloo 890, 1180 Uccle",
      legalForm: "SRL",
      isActive: true,
    },
    financials: {
      grossMargin: 320000,
      revenue: 980000,
      netProfit: 45000,
      employees: 6,
      fiscalYear: "2024",
    },
  },
  "Peugeot Bruxelles Sud": {
    entry: {
      companyNumber: "0501.456.789",
      name: "Peugeot Bruxelles Sud SA",
      address: "Boulevard de la Plaine 5, 1050 Ixelles",
      legalForm: "SA",
      isActive: true,
    },
    financials: {
      grossMargin: 1800000,
      revenue: 12000000,
      netProfit: 450000,
      employees: 45,
      fiscalYear: "2024",
    },
  },
  "Toyota Drogenbos": {
    entry: {
      companyNumber: "0523.567.890",
      name: "Toyota Motor Belgium Drogenbos SA",
      address: "Grote Baan 120, 1620 Drogenbos",
      legalForm: "SA",
      isActive: true,
    },
    financials: {
      grossMargin: 2100000,
      revenue: 15000000,
      netProfit: 620000,
      employees: 55,
      fiscalYear: "2024",
    },
  },
  "Garage Central Molenbeek": {
    entry: {
      companyNumber: "0434.678.901",
      name: "Garage Central Molenbeek SPRL",
      address: "Rue de Birmingham 67, 1080 Molenbeek",
      legalForm: "SPRL",
      isActive: true,
    },
    financials: {
      grossMargin: 150000,
      revenue: 520000,
      netProfit: 18000,
      employees: 3,
      fiscalYear: "2024",
    },
  },
  "Mercedes-Benz Brussels": {
    entry: {
      companyNumber: "0545.789.012",
      name: "Mercedes-Benz Brussels NV",
      address: "Avenue du Port 100, 1000 Bruxelles",
      legalForm: "NV",
      isActive: true,
    },
    financials: {
      grossMargin: 3500000,
      revenue: 25000000,
      netProfit: 980000,
      employees: 80,
      fiscalYear: "2024",
    },
  },
  "Auto Repair Express": {
    entry: {
      companyNumber: "0567.890.123",
      name: "Auto Repair Express SRL",
      address: "Rue Royale 150, 1000 Bruxelles",
      legalForm: "SRL",
      isActive: true,
    },
    financials: {
      grossMargin: 280000,
      revenue: 750000,
      netProfit: 35000,
      employees: 5,
      fiscalYear: "2024",
    },
  },
  "Renault Evere": {
    entry: {
      companyNumber: "0589.901.234",
      name: "Renault Retail Group Evere SA",
      address: "Avenue Henry Dunant 2, 1140 Evere",
      legalForm: "SA",
      isActive: true,
    },
    financials: {
      grossMargin: 1200000,
      revenue: 8500000,
      netProfit: 210000,
      employees: 30,
      fiscalYear: "2024",
    },
  },
  "Garage de l'Europe": {
    entry: {
      companyNumber: "0401.012.345",
      name: "Garage de l'Europe SCS",
      address: "Rue de Trèves 35, 1040 Etterbeek",
      legalForm: "SCS",
      isActive: true,
    },
    financials: {
      grossMargin: 95000,
      revenue: 340000,
      netProfit: 8000,
      employees: 2,
      fiscalYear: "2023",
    },
  },
  "BMW Brussels": {
    entry: {
      companyNumber: "0612.123.456",
      name: "BMW Brussels SA",
      address: "Boulevard de la Woluwe 46, 1200 Woluwe",
      legalForm: "SA",
      isActive: true,
    },
    financials: {
      grossMargin: 2800000,
      revenue: 18000000,
      netProfit: 750000,
      employees: 65,
      fiscalYear: "2024",
    },
  },
  "Audi Center Zaventem": {
    entry: {
      companyNumber: "0634.234.567",
      name: "Audi Center Zaventem NV",
      address: "Leuvensesteenweg 560, 1930 Zaventem",
      legalForm: "NV",
      isActive: true,
    },
    financials: {
      grossMargin: 1950000,
      revenue: 14000000,
      netProfit: 520000,
      employees: 40,
      fiscalYear: "2024",
    },
  },
  "Citroën Anderlecht": {
    entry: {
      companyNumber: "0456.345.678",
      name: "Citroën Anderlecht SPRL",
      address: "Boulevard Industriel 30, 1070 Anderlecht",
      legalForm: "SPRL",
      isActive: true,
    },
    financials: {
      grossMargin: 680000,
      revenue: 4200000,
      netProfit: 95000,
      employees: 15,
      fiscalYear: "2024",
    },
  },
  "Garage Petit Frères": {
    entry: {
      companyNumber: "0478.456.789",
      name: "Garage Petit Frères SRL",
      address: "Chaussée de Ninove 400, 1070 Anderlecht",
      legalForm: "SRL",
      isActive: true,
    },
    financials: {
      grossMargin: 420000,
      revenue: 1500000,
      netProfit: 55000,
      employees: 8,
      fiscalYear: "2024",
    },
  },
  "Volkswagen Woluwe": {
    entry: {
      companyNumber: "0500.567.890",
      name: "Volkswagen Woluwe SA",
      address: "Avenue de Tervueren 300, 1150 Woluwe",
      legalForm: "SA",
      isActive: true,
    },
    financials: {
      grossMargin: 1600000,
      revenue: 11000000,
      netProfit: 380000,
      employees: 35,
      fiscalYear: "2024",
    },
  },
  "Opel Schaerbeek": {
    entry: {
      companyNumber: "0522.678.901",
      name: "Opel Schaerbeek SRL",
      address: "Rue Royale Sainte-Marie 80, 1030 Schaerbeek",
      legalForm: "SRL",
      isActive: true,
    },
    financials: {
      grossMargin: 540000,
      revenue: 3800000,
      netProfit: 72000,
      employees: 11,
      fiscalYear: "2024",
    },
  },
  "Hyundai Forest": {
    entry: {
      companyNumber: "0544.789.012",
      name: "Hyundai Motor Belgium Forest SA",
      address: "Avenue Van Volxem 200, 1190 Forest",
      legalForm: "SA",
      isActive: true,
    },
    financials: {
      grossMargin: 980000,
      revenue: 6500000,
      netProfit: 165000,
      employees: 20,
      fiscalYear: "2024",
    },
  },
  "Mécanique Générale Lambert": {
    entry: {
      companyNumber: "0466.890.123",
      name: "Mécanique Générale Lambert SCS",
      address: "Rue du Midi 100, 1000 Bruxelles",
      legalForm: "SCS",
      isActive: true,
    },
    financials: {
      grossMargin: 180000,
      revenue: 480000,
      netProfit: 22000,
      employees: 3,
      fiscalYear: "2024",
    },
  },
  "Volvo Brussels North": {
    entry: {
      companyNumber: "0566.901.234",
      name: "Volvo Car Brussels North NV",
      address: "Boulevard Lambermont 350, 1030 Schaerbeek",
      legalForm: "NV",
      isActive: true,
    },
    financials: {
      grossMargin: 1350000,
      revenue: 9800000,
      netProfit: 290000,
      employees: 28,
      fiscalYear: "2024",
    },
  },
  "Garage du Cinquantenaire": {
    entry: {
      companyNumber: "0388.012.345",
      name: "Garage du Cinquantenaire SPRL",
      address: "Avenue de la Renaissance 40, 1000 Bruxelles",
      legalForm: "SPRL",
      isActive: true,
    },
    financials: {
      grossMargin: 75000,
      revenue: 280000,
      netProfit: -5000,
      employees: 2,
      fiscalYear: "2023",
    },
  },
};

export class MockCompanyWebClient implements CompanyWebClientInterface {
  async searchCompany(params: CompanyWebSearchParams): Promise<CompanyWebSearchResult> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const searchName = params.name.toLowerCase();

    // Chercher par correspondance partielle sur le nom
    const matches: CompanyWebEntry[] = [];
    for (const [key, data] of Object.entries(MOCK_COMPANIES)) {
      if (
        key.toLowerCase().includes(searchName) ||
        searchName.includes(key.toLowerCase()) ||
        // Match sur des mots individuels
        searchName.split(/\s+/).some((word) => word.length > 3 && key.toLowerCase().includes(word))
      ) {
        matches.push(data.entry);
      }
    }

    return {
      success: true,
      companies: matches,
    };
  }

  async getCompanyFinancials(companyNumber: string): Promise<CompanyWebFinancialResult> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Chercher par numero d'entreprise
    for (const data of Object.values(MOCK_COMPANIES)) {
      if (data.entry.companyNumber === companyNumber) {
        return {
          success: true,
          financials: data.financials,
        };
      }
    }

    return {
      success: false,
      errors: [{ message: `Entreprise ${companyNumber} non trouvee` }],
    };
  }
}
