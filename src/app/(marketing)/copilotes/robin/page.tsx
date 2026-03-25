import Link from "next/link";
import {
  Radio, Upload, FileText, Search, RefreshCw,
  Check, ArrowRight, Zap, Globe, Image as ImageIcon,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robin — Copilote Multidiffusion & SEO | PrismaFlux Auto",
  description: "Robin publie vos vehicules sur toutes les plateformes en 1 clic. Remplissage automatique, optimisation SEO, synchronisation en temps reel.",
};

const capabilities = [
  {
    icon: Upload,
    title: "Publication multi-plateformes",
    desc: "AutoScout24, GoCar, 2ememain et plus encore. Robin publie vos annonces partout en un seul clic, sans copier-coller.",
  },
  {
    icon: FileText,
    title: "Remplissage automatique IA",
    desc: "Scannez une carte grise ou prenez des photos — Robin extrait automatiquement les donnees du vehicule avec un taux de precision de plus de 90%.",
  },
  {
    icon: Search,
    title: "Optimisation SEO",
    desc: "Chaque annonce est optimisee pour apparaitre en premier dans les resultats de recherche des plateformes.",
  },
  {
    icon: RefreshCw,
    title: "Synchronisation en temps reel",
    desc: "Prix mis a jour, vehicule vendu, nouvelle photo ? Robin synchronise tout instantanement sur toutes les plateformes.",
  },
];

const workflow = [
  { step: "1", title: "Ajoutez un vehicule", desc: "Prenez en photo la carte grise ou entrez le VIN. Robin s'occupe du reste." },
  { step: "2", title: "Robin remplit l'annonce", desc: "Les champs sont remplis automatiquement par l'IA. Verifiez et ajustez si besoin." },
  { step: "3", title: "Publiez partout", desc: "Un clic pour publier sur toutes vos plateformes. Robin adapte le format pour chacune." },
  { step: "4", title: "Synchronisation continue", desc: "Modifications, prix, statuts — tout reste a jour automatiquement." },
];

const platforms = [
  { name: "AutoScout24", included: true },
  { name: "GoCar", included: true },
  { name: "2ememain", included: true },
  { name: "Catalogue PrismaFlux", included: true },
  { name: "La Centrale", included: false, price: "399\u00A0\u20AC/mois" },
  { name: "mobile.de", included: false, price: "899\u00A0\u20AC/mois" },
];

export default function RobinPage() {
  return (
    <>
      {/* Hero */}
      <section className="mkt-copilote-hero">
        <div className="mkt-container">
          <div className="mkt-copilote-hero-inner">
            <div className="mkt-copilote-hero-content">
              <div className="mkt-copilote-badge" style={{ background: "#FF174415", color: "#FF1744" }}>
                <Radio size={16} /> Copilote Multidiffusion
              </div>
              <h1>Robin</h1>
              <p className="mkt-copilote-tagline">Vos annonces sur toutes les plateformes. Automatiquement.</p>
              <p className="mkt-copilote-desc">
                Robin est votre copilote de diffusion. Il publie vos vehicules sur toutes les plateformes majeures,
                remplit automatiquement les annonces depuis vos documents et photos, et garde tout synchronise en temps reel.
              </p>
              <div className="mkt-hero-ctas">
                <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-lg">
                  Essayer Robin gratuitement <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className="mkt-copilote-hero-visual" style={{ borderColor: "#FF174430" }}>
              <div className="mkt-feature-screen">
                <div className="mkt-feature-screen-bar">
                  <span className="mkt-dot" /><span className="mkt-dot" /><span className="mkt-dot" />
                </div>
                <div className="mkt-feature-screen-body" style={{ borderTop: "2px solid #FF1744" }}>
                  <div className="mkt-feature-placeholder">
                    <Radio size={48} style={{ color: "#FF1744", opacity: 0.3 }} />
                    <span style={{ color: "var(--color-text-muted)" }}>Interface Robin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mkt-section">
        <div className="mkt-container">
          <div className="mkt-section-header">
            <h2 className="mkt-section-title">Ce que Robin fait pour vous</h2>
          </div>
          <div className="mkt-capabilities-grid">
            {capabilities.map((cap) => (
              <div key={cap.title} className="mkt-capability-card">
                <div className="mkt-capability-icon" style={{ background: "#FF174415" }}>
                  <cap.icon size={24} style={{ color: "#FF1744" }} />
                </div>
                <h3>{cap.title}</h3>
                <p>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="mkt-section mkt-section-alt">
        <div className="mkt-container">
          <div className="mkt-section-header">
            <h2 className="mkt-section-title">Comment Robin travaille</h2>
          </div>
          <div className="mkt-workflow">
            {workflow.map((w) => (
              <div key={w.step} className="mkt-workflow-step">
                <div className="mkt-workflow-number" style={{ color: "#FF1744" }}>{w.step}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="mkt-section">
        <div className="mkt-container">
          <div className="mkt-section-header">
            <h2 className="mkt-section-title">Plateformes supportees</h2>
          </div>
          <div className="mkt-platforms-grid">
            {platforms.map((p) => (
              <div key={p.name} className="mkt-platform-card">
                <div className="mkt-platform-name">
                  <Globe size={18} style={{ color: p.included ? "#00C853" : "var(--color-text-muted)" }} />
                  {p.name}
                </div>
                {p.included ? (
                  <span className="mkt-platform-badge-included"><Check size={14} /> Inclus</span>
                ) : (
                  <span className="mkt-platform-badge-addon">{p.price}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mkt-cta-final">
        <div className="mkt-container">
          <h2>Laissez Robin gerer vos annonces</h2>
          <p>Publiez plus vite. Vendez plus vite.</p>
          <div className="mkt-hero-ctas">
            <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-lg">
              Essai gratuit — 7 jours <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
