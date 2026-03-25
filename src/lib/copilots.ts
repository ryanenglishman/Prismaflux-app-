export interface Copilot {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  avatarPath: string;
  initials: string;
  isAvailable: boolean;
}

export const COPILOTS: Copilot[] = [
  {
    id: "robin",
    name: "Robin",
    role: "Multidiffusion",
    description: "Publication, SEO et auto-remplissage des fiches véhicules",
    color: "#FF1744",
    avatarPath: "/copilotes/robin.png",
    initials: "RB",
    isAvailable: true,
  },
  {
    id: "lana-basic",
    name: "Lana",
    role: "Studio Véhicule",
    description: "Retouche photo IA et détourage automatique",
    color: "#E040FB",
    avatarPath: "/copilotes/lana.png",
    initials: "LA",
    isAvailable: true,
  },
  {
    id: "ben",
    name: "Ben",
    role: "Coach Vente",
    description: "Assistant IA pour la vente et le closing",
    color: "#00BFA5",
    avatarPath: "/copilotes/ben.png",
    initials: "BN",
    isAvailable: false,
  },
  {
    id: "marcus",
    name: "Marcus",
    role: "Performance Web",
    description: "Audit site web, SEO local et veille concurrentielle",
    color: "#448AFF",
    avatarPath: "/copilotes/marcus.png",
    initials: "MC",
    isAvailable: true,
  },
  {
    id: "pierre",
    name: "Pierre",
    role: "Reporting",
    description: "Rapports exécutifs et suivi de réputation",
    color: "#FF9100",
    avatarPath: "/copilotes/pierre.png",
    initials: "PR",
    isAvailable: true,
  },
  {
    id: "lana-performance",
    name: "Lana Performance",
    role: "Réseaux Sociaux",
    description: "Création de contenu pour Facebook, Instagram et X",
    color: "#E040FB",
    avatarPath: "/copilotes/lana-perf.png",
    initials: "LP",
    isAvailable: true,
  },
];

export function getCopilotById(id: string): Copilot | undefined {
  return COPILOTS.find((c) => c.id === id);
}
