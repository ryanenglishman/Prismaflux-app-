import type { GoogleMapsClientInterface } from "./google-maps/client-interface";
import type { CompanyWebClientInterface } from "./companyweb/client-interface";
import { MockGoogleMapsClient } from "./google-maps/mock-client";
import { MockCompanyWebClient } from "./companyweb/mock-client";

// ── Factory: cree le bon client selon le mode (env var) ──

function createGoogleMapsClient(): GoogleMapsClientInterface {
  const mode = process.env.GOOGLE_MAPS_MODE ?? "mock";

  if (mode === "live") {
    console.warn(
      "[PrismaFlux] GOOGLE_MAPS_MODE=live mais scraper non implemente — fallback sur mock"
    );
    return new MockGoogleMapsClient();
  }

  return new MockGoogleMapsClient();
}

function createCompanyWebClient(): CompanyWebClientInterface {
  const mode = process.env.COMPANYWEB_MODE ?? "mock";

  if (mode === "live") {
    console.warn(
      "[PrismaFlux] COMPANYWEB_MODE=live mais scraper non implemente — fallback sur mock"
    );
    return new MockCompanyWebClient();
  }

  return new MockCompanyWebClient();
}

// ── Singletons ──

let googleMapsClient: GoogleMapsClientInterface | null = null;
let companyWebClient: CompanyWebClientInterface | null = null;

export function getGoogleMapsClient(): GoogleMapsClientInterface {
  if (!googleMapsClient) {
    googleMapsClient = createGoogleMapsClient();
  }
  return googleMapsClient;
}

export function getCompanyWebClient(): CompanyWebClientInterface {
  if (!companyWebClient) {
    companyWebClient = createCompanyWebClient();
  }
  return companyWebClient;
}
