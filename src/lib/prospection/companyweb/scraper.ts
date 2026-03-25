import * as cheerio from "cheerio";
import type {
  CompanyWebEntry,
  CompanyWebFinancials,
  CompanyWebSearchResult,
  CompanyWebFinancialResult,
} from "./types";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept-Language": "fr-BE,fr;q=0.9,nl;q=0.8",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

/**
 * Parse Belgian number formats: 1.234.567,89 or 1 234 567,89
 */
function parseFinValue(text: string): number | undefined {
  if (!text) return undefined;

  // Remove currency symbols and whitespace around
  let cleaned = text.replace(/[€\s]/g, "").trim();

  // Handle Belgian format: 1.234.567,89
  // Remove thousand separators (dots), replace comma with dot for decimal
  if (cleaned.includes(",")) {
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  }

  // Remove any remaining non-numeric chars except dot and minus
  cleaned = cleaned.replace(/[^0-9.\-]/g, "");

  const value = parseFloat(cleaned);
  return isNaN(value) ? undefined : value;
}

/**
 * Extract BCE number from a string. Pattern: 4digits.3digits.3digits
 */
function extractBCE(text: string): string | null {
  const match = text.match(/(\d{4})[.\s]?(\d{3})[.\s]?(\d{3})/);
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}`;
  }
  return null;
}

export async function searchCompanyWeb(params: {
  name: string;
  city?: string;
}): Promise<CompanyWebSearchResult> {
  const companies: CompanyWebEntry[] = [];
  const errors: string[] = [];

  try {
    const searchTerm = params.city
      ? `${params.name} ${params.city}`
      : params.name;

    const url = `https://www.companyweb.be/fr/chercher?s=${encodeURIComponent(searchTerm)}`;

    const response = await fetch(url, { headers: HEADERS });

    if (!response.ok) {
      errors.push(`CompanyWeb search returned ${response.status}`);
      return { success: false, companies, errors };
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Find company links
    $('a[href*="/fr/entreprise/"]').each((_, el) => {
      const href = $(el).attr("href") ?? "";
      const linkText = $(el).text().trim();

      // Extract BCE number from the href or surrounding text
      const bce = extractBCE(href) || extractBCE(linkText);
      if (!bce) return;

      const name = linkText.replace(/\d{4}\.?\d{3}\.?\d{3}/, "").trim() || linkText;

      // Try to find legal form from surrounding context
      const parentText = $(el).parent().text();
      let legalForm: string | undefined;
      const legalFormMatch = parentText.match(
        /(SA|SRL|SPRL|SCRL|SC|ASBL|SNC|SCS|GCV|BV|NV|VOF|BVBA|CVBA|VZW)/i
      );
      if (legalFormMatch) {
        legalForm = legalFormMatch[1].toUpperCase();
      }

      // Avoid duplicates
      if (!companies.find((c) => c.companyNumber === bce)) {
        companies.push({
          companyNumber: bce,
          name: name || "Inconnu",
          legalForm,
        });
      }
    });

    return { success: true, companies };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "CompanyWeb search error";
    errors.push(message);
    return { success: false, companies, errors };
  }
}

export async function getCompanyFinancials(
  companyNumber: string
): Promise<CompanyWebFinancialResult> {
  const errors: string[] = [];

  try {
    // Clean number: remove dots and spaces
    const cleanNumber = companyNumber.replace(/[\s.]/g, "");
    const url = `https://www.companyweb.be/fr/entreprise/${cleanNumber}`;

    const response = await fetch(url, { headers: HEADERS });

    if (!response.ok) {
      errors.push(`CompanyWeb financials returned ${response.status}`);
      return { success: false, errors };
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const financials: CompanyWebFinancials = {};

    // Keywords to search for in both French and Dutch
    const keywordMap: Record<string, keyof CompanyWebFinancials> = {
      "marge brute": "grossMargin",
      brutomarge: "grossMargin",
      "chiffre d'affaires": "revenue",
      omzet: "revenue",
      "résultat net": "netProfit",
      nettoresultaat: "netProfit",
      personnel: "employees",
      werknemers: "employees",
    };

    // Strategy 1: Parse tables
    $("table tr, table tbody tr").each((_, row) => {
      const cells = $(row).find("td, th");
      if (cells.length < 2) return;

      const label = $(cells[0]).text().trim().toLowerCase();
      const valueText = $(cells[1]).text().trim();

      for (const [keyword, field] of Object.entries(keywordMap)) {
        if (label.includes(keyword) && !financials[field]) {
          const parsed = parseFinValue(valueText);
          if (parsed !== undefined) {
            if (field === "employees") {
              financials[field] = Math.round(parsed);
            } else {
              (financials as Record<string, number>)[field] = parsed;
            }
          }
        }
      }
    });

    // Strategy 2: Parse dl/dt/dd elements
    $("dl").each((_, dl) => {
      $(dl)
        .find("dt")
        .each((_, dt) => {
          const label = $(dt).text().trim().toLowerCase();
          const dd = $(dt).next("dd");
          if (!dd.length) return;

          const valueText = dd.text().trim();

          for (const [keyword, field] of Object.entries(keywordMap)) {
            if (label.includes(keyword) && !financials[field]) {
              const parsed = parseFinValue(valueText);
              if (parsed !== undefined) {
                if (field === "employees") {
                  financials[field] = Math.round(parsed);
                } else {
                  (financials as Record<string, number>)[field] = parsed;
                }
              }
            }
          }
        });
    });

    // Strategy 3: Text-based fallback search on body text
    const bodyText = $("body").text();
    const lines = bodyText.split("\n").map((l) => l.trim());

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      for (const [keyword, field] of Object.entries(keywordMap)) {
        if (lowerLine.includes(keyword) && !financials[field]) {
          // Look for a number near the keyword
          const keywordIndex = lowerLine.indexOf(keyword);
          const surrounding = line.substring(
            keywordIndex,
            keywordIndex + keyword.length + 60
          );
          // Find monetary values like 1.234.567,89 or 1234567
          const valueMatch = surrounding.match(
            /[\d][.\d\s]*[,\d]+(?:\s*€)?/
          );
          if (valueMatch) {
            const parsed = parseFinValue(valueMatch[0]);
            if (parsed !== undefined) {
              if (field === "employees") {
                financials[field] = Math.round(parsed);
              } else {
                (financials as Record<string, number>)[field] = parsed;
              }
            }
          }
        }
      }
    }

    return { success: true, financials };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "CompanyWeb financials error";
    errors.push(message);
    return { success: false, errors };
  }
}
