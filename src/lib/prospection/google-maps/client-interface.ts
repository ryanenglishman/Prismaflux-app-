import type { GoogleMapsSearchParams, GoogleMapsResult } from "./types";

export interface GoogleMapsClientInterface {
  searchBusinesses(params: GoogleMapsSearchParams): Promise<GoogleMapsResult>;
}
