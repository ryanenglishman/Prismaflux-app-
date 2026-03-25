import type { GoogleMapsClientInterface } from "./client-interface";
import type { GoogleMapsSearchParams, GoogleMapsResult, GoogleMapsBusiness } from "./types";

// ── Données mock réalistes — garages/concessionnaires belges ──

const MOCK_BUSINESSES: GoogleMapsBusiness[] = [
  {
    placeId: "ChIJ_1",
    name: "Garage Dubois & Fils",
    address: "Rue de la Loi 45, 1000 Bruxelles",
    phone: "+32 2 511 23 45",
    website: "https://www.garagedubois.be",
    rating: 4.3,
    reviewCount: 127,
    latitude: 50.8466,
    longitude: 4.3528,
  },
  {
    placeId: "ChIJ_2",
    name: "AutoCenter Janssens",
    address: "Avenue Louise 220, 1050 Ixelles",
    phone: "+32 2 640 89 01",
    website: "https://www.autocenterjanssens.be",
    rating: 4.6,
    reviewCount: 203,
    latitude: 50.8283,
    longitude: 4.3621,
  },
  {
    placeId: "ChIJ_3",
    name: "Carrosserie Van den Berg",
    address: "Chaussée de Waterloo 890, 1180 Uccle",
    phone: "+32 2 375 12 34",
    rating: 3.9,
    reviewCount: 58,
    latitude: 50.8012,
    longitude: 4.3445,
  },
  {
    placeId: "ChIJ_4",
    name: "Peugeot Bruxelles Sud",
    address: "Boulevard de la Plaine 5, 1050 Ixelles",
    phone: "+32 2 629 40 00",
    website: "https://www.peugeot-bxlsud.be",
    rating: 4.1,
    reviewCount: 312,
    latitude: 50.8198,
    longitude: 4.3946,
  },
  {
    placeId: "ChIJ_5",
    name: "Toyota Drogenbos",
    address: "Grote Baan 120, 1620 Drogenbos",
    phone: "+32 2 377 88 00",
    website: "https://www.toyota-drogenbos.be",
    rating: 4.4,
    reviewCount: 189,
    latitude: 50.7712,
    longitude: 4.3201,
  },
  {
    placeId: "ChIJ_6",
    name: "Garage Central Molenbeek",
    address: "Rue de Birmingham 67, 1080 Molenbeek-Saint-Jean",
    phone: "+32 2 411 56 78",
    rating: 3.7,
    reviewCount: 42,
    latitude: 50.8561,
    longitude: 4.3256,
  },
  {
    placeId: "ChIJ_7",
    name: "Mercedes-Benz Brussels",
    address: "Avenue du Port 100, 1000 Bruxelles",
    phone: "+32 2 421 90 00",
    website: "https://www.mercedes-brussels.be",
    rating: 4.5,
    reviewCount: 445,
    latitude: 50.8637,
    longitude: 4.3489,
  },
  {
    placeId: "ChIJ_8",
    name: "Auto Repair Express",
    address: "Rue Royale 150, 1000 Bruxelles",
    phone: "+32 2 217 33 44",
    website: "https://www.autorepairexpress.be",
    rating: 4.0,
    reviewCount: 89,
    latitude: 50.8553,
    longitude: 4.3618,
  },
  {
    placeId: "ChIJ_9",
    name: "Renault Evere",
    address: "Avenue Henry Dunant 2, 1140 Evere",
    phone: "+32 2 726 50 00",
    website: "https://www.renault-evere.be",
    rating: 4.2,
    reviewCount: 167,
    latitude: 50.8756,
    longitude: 4.3987,
  },
  {
    placeId: "ChIJ_10",
    name: "Garage de l'Europe",
    address: "Rue de Trèves 35, 1040 Etterbeek",
    phone: "+32 2 230 67 89",
    rating: 3.5,
    reviewCount: 31,
    latitude: 50.8384,
    longitude: 4.3783,
  },
  {
    placeId: "ChIJ_11",
    name: "BMW Brussels",
    address: "Boulevard de la Woluwe 46, 1200 Woluwe-Saint-Lambert",
    phone: "+32 2 761 80 00",
    website: "https://www.bmw-brussels.be",
    rating: 4.7,
    reviewCount: 520,
    latitude: 50.8456,
    longitude: 4.4332,
  },
  {
    placeId: "ChIJ_12",
    name: "Audi Center Zaventem",
    address: "Leuvensesteenweg 560, 1930 Zaventem",
    phone: "+32 2 720 30 00",
    website: "https://www.audi-zaventem.be",
    rating: 4.4,
    reviewCount: 278,
    latitude: 50.8812,
    longitude: 4.4701,
  },
  {
    placeId: "ChIJ_13",
    name: "Citroën Anderlecht",
    address: "Boulevard Industriel 30, 1070 Anderlecht",
    phone: "+32 2 521 45 67",
    website: "https://www.citroen-anderlecht.be",
    rating: 3.8,
    reviewCount: 95,
    latitude: 50.8345,
    longitude: 4.3012,
  },
  {
    placeId: "ChIJ_14",
    name: "Garage Petit Frères",
    address: "Chaussée de Ninove 400, 1070 Anderlecht",
    phone: "+32 2 523 11 22",
    rating: 4.1,
    reviewCount: 73,
    latitude: 50.8423,
    longitude: 4.2956,
  },
  {
    placeId: "ChIJ_15",
    name: "Volkswagen Woluwe",
    address: "Avenue de Tervueren 300, 1150 Woluwe-Saint-Pierre",
    phone: "+32 2 770 60 00",
    website: "https://www.vw-woluwe.be",
    rating: 4.3,
    reviewCount: 201,
    latitude: 50.8378,
    longitude: 4.4256,
  },
  {
    placeId: "ChIJ_16",
    name: "Opel Schaerbeek",
    address: "Rue Royale Sainte-Marie 80, 1030 Schaerbeek",
    phone: "+32 2 215 78 90",
    website: "https://www.opel-schaerbeek.be",
    rating: 3.6,
    reviewCount: 48,
    latitude: 50.8623,
    longitude: 4.3712,
  },
  {
    placeId: "ChIJ_17",
    name: "Hyundai Forest",
    address: "Avenue Van Volxem 200, 1190 Forest",
    phone: "+32 2 344 50 00",
    website: "https://www.hyundai-forest.be",
    rating: 4.0,
    reviewCount: 134,
    latitude: 50.8134,
    longitude: 4.3234,
  },
  {
    placeId: "ChIJ_18",
    name: "Mécanique Générale Lambert",
    address: "Rue du Midi 100, 1000 Bruxelles",
    phone: "+32 2 512 90 12",
    rating: 4.8,
    reviewCount: 22,
    latitude: 50.8456,
    longitude: 4.3489,
  },
  {
    placeId: "ChIJ_19",
    name: "Volvo Brussels North",
    address: "Boulevard Lambermont 350, 1030 Schaerbeek",
    phone: "+32 2 241 00 00",
    website: "https://www.volvo-brussels.be",
    rating: 4.5,
    reviewCount: 167,
    latitude: 50.8734,
    longitude: 4.3812,
  },
  {
    placeId: "ChIJ_20",
    name: "Garage du Cinquantenaire",
    address: "Avenue de la Renaissance 40, 1000 Bruxelles",
    phone: "+32 2 735 44 55",
    rating: 3.4,
    reviewCount: 15,
    latitude: 50.8412,
    longitude: 4.3934,
  },
];

export class MockGoogleMapsClient implements GoogleMapsClientInterface {
  async searchBusinesses(params: GoogleMapsSearchParams): Promise<GoogleMapsResult> {
    // Simuler un delai reseau
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Filtrer par query (match partiel sur le nom, case-insensitive)
    const query = params.query.toLowerCase();
    let results = MOCK_BUSINESSES.filter((b) => {
      const name = b.name.toLowerCase();
      // Match large : "garage", "auto", marque, etc.
      return (
        name.includes(query) ||
        query.split(/\s+/).some((word) => name.includes(word)) ||
        // Toujours inclure si le query contient "garage" ou "auto" ou "concessionnaire"
        query.includes("garage") ||
        query.includes("auto") ||
        query.includes("concessionnaire") ||
        query.includes("voiture")
      );
    });

    // Limiter au nombre demande
    results = results.slice(0, params.maxResults);

    return {
      success: true,
      businesses: results,
    };
  }
}
