import Link from "next/link";
import {
  Globe, Search, Smartphone, Gauge, MapPin, BarChart3,
  Check, ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marcus — Copilote Audit & Performance Web | PrismaFlux Auto",
  description: "Marcus analyse votre site web, votre SEO et connecte vos outils Google. Audit gratuit, suivi continu, recommandations actionnables.",
};

const auditChecks = [
  { icon: Search, label: "SEO technique", desc: "Balises meta, schema, sitemap, robots.txt" },
  { icon: Gauge, label: "Performance", desc: "PageSpeed, temps de chargement, Core Web Vitals" },
  { icon: Smartphone, label: "Mobile-friendly", desc: "Responsive, viewport, touch targets" },
  { icon: MapPin, label: "SEO local", desc: "Mots-cles locaux, Google Business Profile" },
];

const tools = [
  "Google Business Profile",
  "Google Search Console",
  "Google Analytics 4",
  "Meta Business Suite",
  "Google Ads",
  "Trustpilot",
  "WhatsApp Business",
];

export default function MarcusPage() {
  return (
    <>
      <section className="mkt-copilote-hero">
        <div className="mkt-container">
          <div className="mkt-copilote-hero-inner">
            <div className="mkt-copilote-hero-content">
              <div className="mkt-copilote-badge" style={{ background: "#448AFF15", color: "#448AFF" }}>
                <Globe size={16} /> Copilote Performance Web
              </div>
              <h1>Marcus</h1>
              <p className="mkt-copilote-tagline">Votre site web a son meilleur niveau.</p>
              <p className="mkt-copilote-desc">
                Marcus analyse votre site web gratuitement et identifie les problemes de SEO, performance et mobile.
                Avec Performance+, il connecte vos outils Google pour un suivi en continu et des recommandations actionnables.
              </p>
              <div className="mkt-hero-ctas">
                <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-lg" style={{ background: "#448AFF" }}>
                  Audit gratuit de votre site <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className="mkt-copilote-hero-visual" style={{ borderColor: "#448AFF30" }}>
              <div className="mkt-feature-screen">
                <div className="mkt-feature-screen-bar">
                  <span className="mkt-dot" /><span className="mkt-dot" /><span className="mkt-dot" />
                </div>
                <div className="mkt-feature-screen-body" style={{ borderTop: "2px solid #448AFF" }}>
                  <div className="mkt-marcus-score">
                    <div className="mkt-marcus-score-circle">
                      <span>55</span>
                      <small>/100</small>
                    </div>
                    <p style={{ color: "var(--color-text-muted)", fontSize: 13 }}>Score SEO</p>
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
            <h2 className="mkt-section-title">Audit complet en quelques secondes</h2>
            <p className="mkt-section-sub">Entrez votre URL. Marcus fait le reste.</p>
          </div>
          <div className="mkt-capabilities-grid">
            {auditChecks.map((check) => (
              <div key={check.label} className="mkt-capability-card">
                <div className="mkt-capability-icon" style={{ background: "#448AFF15" }}>
                  <check.icon size={24} style={{ color: "#448AFF" }} />
                </div>
                <h3>{check.label}</h3>
                <p>{check.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mkt-section mkt-section-alt">
        <div className="mkt-container">
          <div className="mkt-section-header">
            <h2 className="mkt-section-title">Marcus Performance+</h2>
            <p className="mkt-section-sub">Connectez vos outils pour un suivi continu. 299 &euro;/mois.</p>
          </div>
          <div className="mkt-tools-grid">
            {tools.map((tool) => (
              <div key={tool} className="mkt-tool-card">
                <BarChart3 size={20} style={{ color: "#448AFF" }} />
                <span>{tool}</span>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", color: "var(--color-text-muted)", marginTop: 24, fontSize: 15 }}>
            Rapport mensuel automatique avec recommandations SEO personnalisees.
          </p>
        </div>
      </section>

      <section className="mkt-section">
        <div className="mkt-container">
          <div className="mkt-section-header">
            <h2 className="mkt-section-title">Pas de site web ?</h2>
            <p className="mkt-section-sub">PrismaFlux cree votre site concessionnaire SEO-optimise, avec les bons mots-cles pour votre zone geographique.</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/contact" className="mkt-btn-cta mkt-btn-lg" style={{ background: "#448AFF" }}>
              Demander un devis <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mkt-cta-final">
        <div className="mkt-container">
          <h2>Votre site web merite mieux</h2>
          <p>Laissez Marcus identifier et corriger les problemes invisibles.</p>
          <div className="mkt-hero-ctas">
            <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-lg" style={{ background: "#448AFF" }}>
              Audit gratuit <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
