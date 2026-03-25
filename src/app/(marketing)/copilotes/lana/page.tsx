import Link from "next/link";
import {
  Camera, Scissors, Palette, Share2, Sparkles,
  Check, ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lana — Copilote Studio Photo IA | PrismaFlux Auto",
  description: "Lana transforme vos photos de vehicules en visuels professionnels. Suppression de fond, retouche IA, generation de posts reseaux sociaux.",
};

const capabilities = [
  {
    icon: Scissors,
    title: "Suppression de fond",
    desc: "Lana detecte et supprime automatiquement l'arriere-plan de vos photos pour un rendu studio professionnel.",
  },
  {
    icon: Sparkles,
    title: "Retouche intelligente",
    desc: "Recadrage automatique, correction de luminosite et mise en valeur du vehicule. Vos photos deviennent irresistibles.",
  },
  {
    icon: Palette,
    title: "Detection de couleur",
    desc: "Lana identifie automatiquement la couleur du vehicule depuis vos photos pour remplir les champs des annonces.",
  },
  {
    icon: Share2,
    title: "Posts reseaux sociaux",
    desc: "Avec Lana Performance, generez des posts optimises pour Instagram, Facebook et X directement depuis vos photos.",
  },
];

export default function LanaPage() {
  return (
    <>
      <section className="mkt-copilote-hero">
        <div className="mkt-container">
          <div className="mkt-copilote-hero-inner">
            <div className="mkt-copilote-hero-content">
              <div className="mkt-copilote-badge" style={{ background: "#E040FB15", color: "#E040FB" }}>
                <Camera size={16} /> Copilote Studio Photo
              </div>
              <h1>Lana</h1>
              <p className="mkt-copilote-tagline">Des photos pro en quelques secondes.</p>
              <p className="mkt-copilote-desc">
                Lana est votre copilote photo. Elle transforme vos cliches bruts en visuels professionnels,
                supprime les fonds, retouche intelligemment et peut meme creer vos posts pour les reseaux sociaux.
              </p>
              <div className="mkt-hero-ctas">
                <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-lg" style={{ background: "#E040FB" }}>
                  Essayer Lana gratuitement <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className="mkt-copilote-hero-visual" style={{ borderColor: "#E040FB30" }}>
              <div className="mkt-feature-screen">
                <div className="mkt-feature-screen-bar">
                  <span className="mkt-dot" /><span className="mkt-dot" /><span className="mkt-dot" />
                </div>
                <div className="mkt-feature-screen-body" style={{ borderTop: "2px solid #E040FB" }}>
                  <div className="mkt-feature-placeholder">
                    <Camera size={48} style={{ color: "#E040FB", opacity: 0.3 }} />
                    <span style={{ color: "var(--color-text-muted)" }}>Interface Lana</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mkt-section">
        <div className="mkt-container">
          <div className="mkt-section-header">
            <h2 className="mkt-section-title">Ce que Lana fait pour vous</h2>
          </div>
          <div className="mkt-capabilities-grid">
            {capabilities.map((cap) => (
              <div key={cap.title} className="mkt-capability-card">
                <div className="mkt-capability-icon" style={{ background: "#E040FB15" }}>
                  <cap.icon size={24} style={{ color: "#E040FB" }} />
                </div>
                <h3>{cap.title}</h3>
                <p>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mkt-section mkt-section-alt">
        <div className="mkt-container">
          <div className="mkt-section-header">
            <h2 className="mkt-section-title">Deux formules, selon vos besoins</h2>
          </div>
          <div className="mkt-lana-plans">
            <div className="mkt-lana-plan">
              <h3>Lana Basic</h3>
              <p className="mkt-lana-plan-price">Inclus dans l&apos;abonnement</p>
              <ul>
                <li><Check size={16} style={{ color: "#E040FB" }} /> Suppression de fond automatique</li>
                <li><Check size={16} style={{ color: "#E040FB" }} /> Recadrage intelligent</li>
                <li><Check size={16} style={{ color: "#E040FB" }} /> Detection de couleur</li>
                <li><Check size={16} style={{ color: "#E040FB" }} /> Filigrane personnalise</li>
              </ul>
            </div>
            <div className="mkt-lana-plan mkt-lana-plan-perf">
              <div className="mkt-pricing-badge">Performance</div>
              <h3>Lana Performance</h3>
              <p className="mkt-lana-plan-price">449 &euro;/mois</p>
              <ul>
                <li><Check size={16} style={{ color: "#E040FB" }} /> Tout de Lana Basic</li>
                <li><Check size={16} style={{ color: "#E040FB" }} /> Fond studio premium</li>
                <li><Check size={16} style={{ color: "#E040FB" }} /> Generation posts Instagram</li>
                <li><Check size={16} style={{ color: "#E040FB" }} /> Generation posts Facebook & X</li>
                <li><Check size={16} style={{ color: "#E040FB" }} /> Templates personnalisables</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mkt-cta-final">
        <div className="mkt-container">
          <h2>Des photos qui font vendre</h2>
          <p>Laissez Lana sublimer chaque vehicule de votre stock.</p>
          <div className="mkt-hero-ctas">
            <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-lg" style={{ background: "#E040FB" }}>
              Essai gratuit — 7 jours <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
