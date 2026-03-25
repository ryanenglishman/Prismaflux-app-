export interface GoogleMapsSearchParams {
  query: string;
  location: string;
  radius: number;
  maxResults: number;
}

export interface GoogleMapsBusiness {
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
}

export interface GoogleMapsResult {
  success: boolean;
  businesses: GoogleMapsBusiness[];
  errors?: string[];
}
