// ── Types pour le client Google Maps ──

export interface GoogleMapsSearchParams {
  query: string; // ex: "garage automobile"
  location: string; // ex: "Bruxelles, Belgique"
  radius: number; // en metres (API)
  maxResults: number;
}

export interface GoogleMapsBusiness {
  placeId: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  latitude: number;
  longitude: number;
}

export interface GoogleMapsResult {
  success: boolean;
  businesses: GoogleMapsBusiness[];
  errors?: { message: string }[];
}
