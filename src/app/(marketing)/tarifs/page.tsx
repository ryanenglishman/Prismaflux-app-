import Link from "next/link";
import { Check, ArrowRight, Star } from "lucide-react";
import PricingToggle from "@/components/marketing/PricingToggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs — PrismaFlux Auto",
  description: "Un seul plan tout inclus a 749 EUR/mois. 4 copilotes IA, 3 plateformes, essai gratuit 7 jours.",
};

const included = [
  "Robin — Multidiffusion & SEO",
  "Lana Basic — Studio Photo IA",
  "Marcus — Audit site web gratuit",
  "Pierre — Reporting & reputation",
  "AutoScout24, GoCar, 2ememain",
  "Remplissage IA depuis carte grise & photos",
  "Synchronisation multi-plateformes temps reel",
  "Rapports mensuels PDF automatiques",
  "Suivi reputation Google Maps",
  "Tableau de bord KPI",
  "Support prioritaire par email",
  "Mises a jour continues",
];

const addons = [
  {
    name: "Lana Performance",
    desc: "Fond studio premium + generation posts Instagram, Facebook & X",
    price: 449,
  },
  {
    name: "Marcus Performance+",
    desc: "Connexion Google Analytics, Search Console, suivi SEO continu",
    price: 299,
  },
  {
    name: "La Centrale",
    desc: "Publication et synchronisation sur La Centrale",
    price: 399,
  },
  {
    name: "mobile.de",
    desc: "Publication et synchronisation sur mobile.de",
    price: 899,
  },
  {
    name: "Site web PrismaFlux",
    desc: "Creation site concessionnaire SEO-optimise",
    price: null,
  },
];

const clips = [
  { duration: "30 secondes", price: 850 },
  { duration: "45 secondes", price: 1150 },
  { duration: "60 secondes", price: 1500 },
];

export default function TarifsPage() {
  return (
    <>
      <section className="mkt-section" style={{ paddingTop: 120 }}>
        <div className="mkt-container">
          <div className="mkt-section-header">
            <span className="mkt-section-tag">Tarification transparente</span>
            <h1 className="mkt-section-title">Un plan simple. Tout inclus.</h1>
            <p className="mkt-section-sub">
              Pas de tiers caches, pas de niveaux compliques. Un seul abonnement avec tout ce dont votre concession a besoin.
            </p>
          </div>

          <PricingToggle included={included} />

          {/* Add-ons */}
          <div className="mkt-tarifs-addons">
            <h2 className="mkt-section-title" style={{ fontSize: 24, marginBottom: 32 }}>Modules complementaires</h2>
            <div className="mkt-addons-grid">
              {addons.map((addon) => (
                <div key={addon.name} className="mkt-addon-card">
                  <div>
                    <h3>{addon.name}</h3>
                    <p>{addon.desc}</p>
                  </div>
                  <span className="mkt-addon-card-price">
                    {addon.price ? `${addon.price}\u00A0\u20AC/mois` : "Sur devis"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Clips */}
          <div className="mkt-tarifs-clips">
            <h2 className="mkt-section-title" style={{ fontSize: 24, marginBottom: 16 }}>Clips publicitaires</h2>
            <p className="mkt-section-sub" style={{ marginBottom: 32 }}>Videos promotionnelles sur mesure pour vos vehicules.</p>
            <div className="mkt-clips-grid">
              {clips.map((clip) => (
                <div key={clip.duration} className="mkt-clip-card">
                  <span className="mkt-clip-duration">{clip.duration}</span>
                  <span className="mkt-clip-price">{clip.price}\u00A0\u20AC</span>
                  <span className="mkt-clip-label">HT / clip</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mkt-cta-final">
        <div className="mkt-container">
          <h2>Pret a demarrer ?</h2>
          <p>7 jours d&apos;essai gratuit. Aucune carte bancaire requise.</p>
          <div className="mkt-hero-ctas">
            <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-lg">
              Essai gratuit — 7 jours <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="mkt-btn-ghost-lg">
              Reserver une demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
