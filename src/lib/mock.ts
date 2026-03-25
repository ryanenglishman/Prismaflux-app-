export type AiStatus = "confirmed" | "estimated" | "missing";

export interface MockVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  color: string;
  status: "published" | "draft" | "sold";
  publishedOn: string[];
  photoUrl?: string;
  aiCompletionPct: number;
}

export const MOCK_VEHICLES: MockVehicle[] = [
  {
    id: "v1",
    make: "Volkswagen",
    model: "Golf 8 GTI",
    year: 2022,
    price: 34900,
    mileage: 18400,
    fuelType: "Essence",
    color: "Gris Nardo",
    status: "published",
    publishedOn: ["AutoScout24", "GoCar", "2ememain"],
    aiCompletionPct: 97,
  },
  {
    id: "v2",
    make: "BMW",
    model: "Série 3 320d",
    year: 2021,
    price: 29500,
    mileage: 34200,
    fuelType: "Diesel",
    color: "Blanc Alpin",
    status: "published",
    publishedOn: ["AutoScout24", "GoCar"],
    aiCompletionPct: 91,
  },
  {
    id: "v3",
    make: "Audi",
    model: "A4 40 TFSI",
    year: 2023,
    price: 41200,
    mileage: 8700,
    fuelType: "Essence",
    color: "Bleu Navarra",
    status: "draft",
    publishedOn: [],
    aiCompletionPct: 74,
  },
  {
    id: "v4",
    make: "Mercedes",
    model: "Classe C 200d",
    year: 2020,
    price: 26900,
    mileage: 52000,
    fuelType: "Diesel",
    color: "Noir Obsidian",
    status: "published",
    publishedOn: ["AutoScout24"],
    aiCompletionPct: 88,
  },
  {
    id: "v5",
    make: "Tesla",
    model: "Model 3 Long Range",
    year: 2023,
    price: 38500,
    mileage: 12100,
    fuelType: "Électrique",
    color: "Rouge Multi-Couches",
    status: "draft",
    publishedOn: [],
    aiCompletionPct: 42,
  },
];

export const MOCK_ACTIVITY = [
  { id: "a1", copilote: "Robin",   text: "a publié la Golf GTI sur AutoScout24",         time: "Il y a 2h",  type: "publish" },
  { id: "a2", copilote: "Lana",    text: "a retouché 6 photos de la BMW Série 3",        time: "Il y a 4h",  type: "photo" },
  { id: "a3", copilote: "Robin",   text: "a synchronisé les prix sur GoCar",             time: "Il y a 5h",  type: "sync" },
  { id: "a4", copilote: "Pierre",  text: "a généré le rapport hebdomadaire",             time: "Hier",        type: "report" },
  { id: "a5", copilote: "Marcus",  text: "a détecté 3 nouveaux avis Google à répondre", time: "Hier",        type: "review" },
];
