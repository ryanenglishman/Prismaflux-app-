import puppeteer from "puppeteer";
import type {
  GoogleMapsSearchParams,
  GoogleMapsBusiness,
  GoogleMapsResult,
} from "./types";

async function autoScroll(
  page: puppeteer.Page,
  feedSelector: string,
  maxResults: number
): Promise<void> {
  await page.evaluate(
    async (selector: string, target: number) => {
      const feed = document.querySelector(selector);
      if (!feed) return;

      let previousHeight = 0;
      let stableCount = 0;

      while (stableCount < 3) {
        const items = feed.querySelectorAll(
          '.Nv2PK, div[role="article"]'
        );
        if (items.length >= target) break;

        feed.scrollTop = feed.scrollHeight;
        await new Promise((r) => setTimeout(r, 1500));

        if (feed.scrollHeight === previousHeight) {
          stableCount++;
        } else {
          stableCount = 0;
        }
        previousHeight = feed.scrollHeight;
      }
    },
    feedSelector,
    maxResults
  );
}

export async function scrapeGoogleMaps(
  params: GoogleMapsSearchParams
): Promise<GoogleMapsResult> {
  const { query, location, radius, maxResults } = params;
  const businesses: GoogleMapsBusiness[] = [];
  const errors: string[] = [];

  let browser: puppeteer.Browser | null = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--lang=fr-BE",
      ],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({ "Accept-Language": "fr-BE,fr;q=0.9" });
    await page.setViewport({ width: 1280, height: 800 });

    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(
      query + " " + location
    )}`;
    await page.goto(searchUrl, { waitUntil: "networkidle2", timeout: 30000 });

    // Accept Google cookie consent if it appears
    try {
      const consentButton = await page.$(
        'button[aria-label*="Accepter"], button[aria-label*="Accept"], form[action*="consent"] button'
      );
      if (consentButton) {
        await consentButton.click();
        await page.waitForNavigation({
          waitUntil: "networkidle2",
          timeout: 5000,
        }).catch(() => {});
      }
    } catch {
      // No consent dialog, continue
    }

    // Wait for results feed
    try {
      await page.waitForSelector('div[role="feed"]', { timeout: 10000 });
    } catch {
      errors.push("No results feed found - the search may have returned no results");
      return { success: false, businesses: [], errors };
    }

    // Scroll the feed to load more results
    await autoScroll(page, 'div[role="feed"]', maxResults);

    // Extract businesses
    const rawBusinesses = await page.evaluate(() => {
      const results: Array<{
        name: string;
        address: string;
        phone?: string;
        website?: string;
        rating?: number;
        reviewCount?: number;
      }> = [];

      const items = document.querySelectorAll(
        '.Nv2PK, div[role="article"]'
      );

      items.forEach((item) => {
        try {
          // Extract name
          const nameEl =
            item.querySelector(".qBF1Pd") ||
            item.querySelector(".fontHeadlineSmall");
          const name = nameEl?.textContent?.trim() ?? "";
          if (!name) return;

          // Extract rating
          const ratingEl = item.querySelector(".MW4etd");
          const ratingText = ratingEl?.textContent?.trim();
          const rating = ratingText ? parseFloat(ratingText.replace(",", ".")) : undefined;

          // Extract review count
          const reviewEl = item.querySelector(".UY7F9");
          const reviewText = reviewEl?.textContent?.trim();
          let reviewCount: number | undefined;
          if (reviewText) {
            const match = reviewText.match(/[\d\s.]+/);
            if (match) {
              reviewCount = parseInt(match[0].replace(/[\s.]/g, ""), 10);
            }
          }

          // Extract address and phone from spans
          const infoSpans = item.querySelectorAll(".W4Efsd");
          let address = "";
          let phone: string | undefined;

          infoSpans.forEach((span) => {
            const text = span.textContent?.trim() ?? "";
            // Phone patterns: Belgian (+32), French (+33), or generic
            if (/(\+\d{1,3}[\s.-]?\d|0\d[\s.-]?\d)/.test(text) && !phone) {
              // Extract just the phone part
              const phoneMatch = text.match(
                /(\+?\d[\d\s.\-/]{7,})/
              );
              if (phoneMatch) {
                phone = phoneMatch[1].trim();
              }
            }
            // Address: typically contains a comma or postal code
            if (!address && (text.includes(",") || /\d{4,5}/.test(text))) {
              address = text.replace(/^[^·]*·\s*/, "").trim();
            }
          });

          // Fallback: first W4Efsd as address
          if (!address && infoSpans.length > 0) {
            const firstSpan = infoSpans[infoSpans.length - 1]?.textContent?.trim() ?? "";
            address = firstSpan.replace(/^[^·]*·\s*/, "").trim();
          }

          results.push({ name, address, phone, rating, reviewCount });
        } catch {
          // Skip malformed entries
        }
      });

      return results;
    });

    // Try to extract website for each business (click and get from side panel)
    // For performance, we just take the data we have
    for (const biz of rawBusinesses.slice(0, maxResults)) {
      businesses.push({
        name: biz.name,
        address: biz.address,
        phone: biz.phone,
        website: biz.website,
        rating: biz.rating,
        reviewCount: biz.reviewCount,
      });
    }

    return { success: true, businesses };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown scraping error";
    errors.push(message);
    return { success: false, businesses, errors };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
