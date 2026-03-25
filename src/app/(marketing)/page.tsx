import Link from "next/link";
import {
  Radio, Camera, Globe, BarChart3,
  Zap, Clock, Shield, TrendingUp,
  ChevronRight, Check, Star,
  ArrowRight,
} from "lucide-react";
import CopiloteShowcase from "@/components/marketing/CopiloteShowcase";
import FaqAccordion from "@/components/marketing/FaqAccordion";

const stats = [
  { value: "4", label: "copilotes IA autonomes" },
  { value: "24/7", label: "toujours actifs" },
  { value: "10x", label: "plus rapide" },
  { value: "749\u00A0\u20AC", label: "/mois tout inclus" },
];

const steps = [
  {
    number: "01",
    title: "Inscrivez-vous en 2 minutes",
    description: "Creez votre compte, entrez les informations de votre concession. Aucune carte bancaire requise pour l'essai gratuit de 7 jours.",
  },
  {
    number: "02",
    title: "Vos copilotes se mettent au travail",
    description: "Robin, Lana, Marcus et Pierre commencent immediatement a analyser, publier et optimiser. Ils travaillent pendant que vous vendez.",
  },
  {
    number: "03",
    title: "Suivez les resultats",
    description: "Consultez vos KPIs, vos annonces en ligne et votre reputation depuis un seul tableau de bord. Tout est automatise.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="mkt-hero">
        <div className="mkt-hero-glow" />
        <div className="mkt-container">
          <div className="mkt-hero-badge">
            <Star size={14} /> Plateforme IA pour concessionnaires automobiles
          </div>
          <h1 className="mkt-hero-title">
            4 copilotes IA autonomes<br />
            <span className="mkt-hero-accent">au service de votre concession</span>
          </h1>
          <p className="mkt-hero-sub">
            Robin, Lana, Marcus et Pierre gerent vos annonces, vos photos, votre SEO et votre reporting.
            Vous vous concentrez sur ce qui compte : vendre.
          </p>
          <div className="mkt-hero-ctas">
            <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-lg">
              Essayer gratuitement — 7 jours <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="mkt-btn-ghost-lg">
              Reserver une demo
            </Link>
          </div>
          <div className="mkt-hero-stats">
            {stats.map((s) => (
              <div key={s.label} className="mkt-hero-stat">
                <span className="mkt-hero-stat-value">{s.value}</span>
                <span className="mkt-hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Copilotes Showcase ───────────────────────────────────────── */}
      <section className="mkt-section" id="copilotes">
        <div className="mkt-container">
          <div className="mkt-section-header">
            <span className="mkt-section-tag">Votre equipe IA</span>
            <h2 className="mkt-section-title">Rencontrez vos copilotes</h2>
            <p className="mkt-section-sub">
              Chaque copilote est specialise dans un domaine. Ensemble, ils couvrent tout ce dont votre concession a besoin.
            </p>
          </div>
          <CopiloteShowcase />
        </div>
      </section>

      {/* ─── Features per copilote ─────────────────────────────────────── */}
      <section className="mkt-section mkt-section-alt">
        <div className="mkt-container">
          <div className="mkt-copilote-features">
            {/* Robin */}
            <div className="mkt-feature-row">
              <div className="mkt-feature-content">
                <div className="mkt-feature-icon-wrap" style={{ background: "#FF174415" }}>
                  <Radio size={24} style={{ color: "#FF1744" }} />
                </div>
                <h3 className="mkt-feature-name">Robin</h3>
                <p className="mkt-feature-role" style={{ color: "#FF1744" }}>Multidiffusion & SEO</p>
                <p className="mkt-feature-desc">Robin publie vos vehicules sur AutoScout24, GoCar, 2ememain et plus encore. Il remplit automatiquement les annonces a partir de vos documents et photos, optimise le SEO et synchronise tout en temps reel.</p>
                <ul className="mkt-feature-list">
                  <li><Check size={16} style={{ color: "#FF1744" }} /> Publication multi-plateformes en 1 clic</li>
                  <li><Check size={16} style={{ color: "#FF1744" }} /> Remplissage automatique depuis carte grise & photos</li>
                  <li><Check size={16} style={{ color: "#FF1744" }} /> Optimisation SEO de chaque annonce</li>
                  <li><Check size={16} style={{ color: "#FF1744" }} /> Synchronisation en temps reel</li>
                </ul>
                <Link href="/copilotes/robin" className="mkt-feature-link" style={{ color: "#FF1744" }}>
                  Decouvrir Robin <ChevronRight size={16} />
                </Link>
              </div>
              <div className="mkt-feature-visual" style={{ borderColor: "#FF174430" }}>
                <div className="mkt-feature-screen">
                  <div className="mkt-feature-screen-bar"><span className="mkt-dot" /><span className="mkt-dot" /><span className="mkt-dot" /></div>
                  <div className="mkt-feature-screen-body" style={{ borderTop: "2px solid #FF1744" }}>
                    <div className="mkt-feature-placeholder">
                      <Radio size={48} style={{ color: "#FF1744", opacity: 0.3 }} />
                      <span style={{ color: "var(--color-text-muted)" }}>Interface Robin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lana */}
            <div className="mkt-feature-row mkt-feature-row-reverse">
              <div className="mkt-feature-content">
                <div className="mkt-feature-icon-wrap" style={{ background: "#E040FB15" }}>
                  <Camera size={24} style={{ color: "#E040FB" }} />
                </div>
                <h3 className="mkt-feature-name">Lana</h3>
                <p className="mkt-feature-role" style={{ color: "#E040FB" }}>Studio Photo IA</p>
                <p className="mkt-feature-desc">Lana transforme vos photos brutes en visuels professionnels. Suppression de fond, recadrage intelligent, detection de couleur et generation de posts pour les reseaux sociaux.</p>
                <ul className="mkt-feature-list">
                  <li><Check size={16} style={{ color: "#E040FB" }} /> Suppression de fond automatique</li>
                  <li><Check size={16} style={{ color: "#E040FB" }} /> Recadrage et retouche intelligente</li>
                  <li><Check size={16} style={{ color: "#E040FB" }} /> Filigrane personnalise</li>
                  <li><Check size={16} style={{ color: "#E040FB" }} /> Generation de posts Instagram & Facebook</li>
                </ul>
                <Link href="/copilotes/lana" className="mkt-feature-link" style={{ color: "#E040FB" }}>
                  Decouvrir Lana <ChevronRight size={16} />
                </Link>
              </div>
              <div className="mkt-feature-visual" style={{ borderColor: "#E040FB30" }}>
                <div className="mkt-feature-screen">
                  <div className="mkt-feature-screen-bar"><span className="mkt-dot" /><span className="mkt-dot" /><span className="mkt-dot" /></div>
                  <div className="mkt-feature-screen-body" style={{ borderTop: "2px solid #E040FB" }}>
                    <div className="mkt-feature-placeholder">
                      <Camera size={48} style={{ color: "#E040FB", opacity: 0.3 }} />
                      <span style={{ color: "var(--color-text-muted)" }}>Interface Lana</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Marcus */}
            <div className="mkt-feature-row">
              <div className="mkt-feature-content">
                <div className="mkt-feature-icon-wrap" style={{ background: "#448AFF15" }}>
                  <Globe size={24} style={{ color: "#448AFF" }} />
                </div>
                <h3 className="mkt-feature-name">Marcus</h3>
                <p className="mkt-feature-role" style={{ color: "#448AFF" }}>Audit & Performance Web</p>
                <p className="mkt-feature-desc">Marcus analyse votre site web gratuitement et identifie les problemes de SEO, performance et mobile. Avec Performance+, il connecte vos outils Google pour un suivi en continu.</p>
                <ul className="mkt-feature-list">
                  <li><Check size={16} style={{ color: "#448AFF" }} /> Audit SEO gratuit de votre site</li>
                  <li><Check size={16} style={{ color: "#448AFF" }} /> Score de performance detaille</li>
                  <li><Check size={16} style={{ color: "#448AFF" }} /> Connexion Google Analytics & Search Console</li>
                  <li><Check size={16} style={{ color: "#448AFF" }} /> Recommandations SEO local</li>
                </ul>
                <Link href="/copilotes/marcus" className="mkt-feature-link" style={{ color: "#448AFF" }}>
                  Decouvrir Marcus <ChevronRight size={16} />
                </Link>
              </div>
              <div className="mkt-feature-visual" style={{ borderColor: "#448AFF30" }}>
                <div className="mkt-feature-screen">
                  <div className="mkt-feature-screen-bar"><span className="mkt-dot" /><span className="mkt-dot" /><span className="mkt-dot" /></div>
                  <div className="mkt-feature-screen-body" style={{ borderTop: "2px solid #448AFF" }}>
                    <div className="mkt-feature-placeholder">
                      <Globe size={48} style={{ color: "#448AFF", opacity: 0.3 }} />
                      <span style={{ color: "var(--color-text-muted)" }}>Interface Marcus</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pierre */}
            <div className="mkt-feature-row mkt-feature-row-reverse">
              <div className="mkt-feature-content">
                <div className="mkt-feature-icon-wrap" style={{ background: "#00C85315" }}>
                  <BarChart3 size={24} style={{ color: "#00C853" }} />
                </div>
                <h3 className="mkt-feature-name">Pierre</h3>
                <p className="mkt-feature-role" style={{ color: "#00C853" }}>Reporting & Reputation</p>
                <p className="mkt-feature-desc">Pierre surveille vos KPIs, votre reputation Google et genere des rapports mensuels. Il vous alerte des changements importants et garde un oeil sur vos avis clients.</p>
                <ul className="mkt-feature-list">
                  <li><Check size={16} style={{ color: "#00C853" }} /> Tableau de bord KPI en temps reel</li>
                  <li><Check size={16} style={{ color: "#00C853" }} /> Suivi reputation Google Maps</li>
                  <li><Check size={16} style={{ color: "#00C853" }} /> Rapports mensuels PDF automatiques</li>
                  <li><Check size={16} style={{ color: "#00C853" }} /> Alertes sur les changements importants</li>
                </ul>
                <Link href="/copilotes/pierre" className="mkt-feature-link" style={{ color: "#00C853" }}>
                  Decouvrir Pierre <ChevronRight size={16} />
                </Link>
              </div>
              <div className="mkt-feature-visual" style={{ borderColor: "#00C85330" }}>
                <div className="mkt-feature-screen">
                  <div className="mkt-feature-screen-bar"><span className="mkt-dot" /><span className="mkt-dot" /><span className="mkt-dot" /></div>
                  <div className="mkt-feature-screen-body" style={{ borderTop: "2px solid #00C853" }}>
                    <div className="mkt-feature-placeholder">
                      <BarChart3 size={48} style={{ color: "#00C853", opacity: 0.3 }} />
                      <span style={{ color: "var(--color-text-muted)" }}>Interface Pierre</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────────────────────── */}
      <section className="mkt-section" id="fonctionnement">
        <div className="mkt-container">
          <div className="mkt-section-header">
            <span className="mkt-section-tag">Simple et rapide</span>
            <h2 className="mkt-section-title">Comment ca fonctionne</h2>
            <p className="mkt-section-sub">Demarrez en 3 etapes. Aucune competence technique requise.</p>
          </div>
          <div className="mkt-steps">
            {steps.map((s) => (
              <div key={s.number} className="mkt-step">
                <div className="mkt-step-number">{s.number}</div>
                <h3 className="mkt-step-title">{s.title}</h3>
                <p className="mkt-step-desc">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Advantages ──────────────────────────────────────────────── */}
      <section className="mkt-section mkt-section-alt">
        <div className="mkt-container">
          <div className="mkt-section-header">
            <span className="mkt-section-tag">Pourquoi PrismaFlux</span>
            <h2 className="mkt-section-title">Vos avantages</h2>
          </div>
          <div className="mkt-advantages">
            <div className="mkt-advantage">
              <div className="mkt-advantage-icon"><Zap size={24} /></div>
              <h4>Automatisation complete</h4>
              <p>Vos copilotes gerent la diffusion, les photos, le SEO et le reporting sans intervention.</p>
            </div>
            <div className="mkt-advantage">
              <div className="mkt-advantage-icon"><Clock size={24} /></div>
              <h4>Disponibles 24/7</h4>
              <p>Pas de pause cafe, pas de conges. Vos copilotes travaillent en continu, meme le dimanche.</p>
            </div>
            <div className="mkt-advantage">
              <div className="mkt-advantage-icon"><Shield size={24} /></div>
              <h4>Donnees securisees</h4>
              <p>Vos informations restent les votres. Hebergement europeen, conformite RGPD.</p>
            </div>
            <div className="mkt-advantage">
              <div className="mkt-advantage-icon"><TrendingUp size={24} /></div>
              <h4>ROI mesurable</h4>
              <p>Chaque action est tracee. Vous voyez exactement l&apos;impact de chaque copilote sur vos resultats.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing preview ─────────────────────────────────────────── */}
      <section className="mkt-section" id="tarifs">
        <div className="mkt-container">
          <div className="mkt-section-header">
            <span className="mkt-section-tag">Tarification simple</span>
            <h2 className="mkt-section-title">Un seul plan, tout inclus</h2>
            <p className="mkt-section-sub">Pas de surprises. 4 copilotes, toutes les plateformes essentielles, un prix fixe.</p>
          </div>
          <div className="mkt-pricing-preview">
            <div className="mkt-pricing-card-main">
              <div className="mkt-pricing-badge">Essai gratuit 7 jours</div>
              <h3>PrismaFlux Auto</h3>
              <div className="mkt-pricing-price">
                <span className="mkt-pricing-amount">749</span>
                <div className="mkt-pricing-unit">
                  <span>&euro; / mois</span>
                  <span className="mkt-pricing-annual">599&nbsp;&euro;/mois en annuel</span>
                </div>
              </div>
              <ul className="mkt-pricing-features">
                <li><Check size={16} /> <strong>Robin</strong> — Multidiffusion & SEO</li>
                <li><Check size={16} /> <strong>Lana Basic</strong> — Studio Photo IA</li>
                <li><Check size={16} /> <strong>Marcus</strong> — Audit site web gratuit</li>
                <li><Check size={16} /> <strong>Pierre</strong> — Reporting & reputation</li>
                <li><Check size={16} /> AutoScout24, GoCar, 2ememain inclus</li>
                <li><Check size={16} /> Remplissage IA depuis carte grise & photos</li>
                <li><Check size={16} /> Rapports mensuels automatiques</li>
                <li><Check size={16} /> Support prioritaire</li>
              </ul>
              <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-lg mkt-btn-full">
                Demarrer l&apos;essai gratuit <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mkt-pricing-addons">
              <h4>Modules complementaires</h4>
              <div className="mkt-addon">
                <div>
                  <strong>Lana Performance</strong>
                  <span>Fond studio + posts reseaux sociaux</span>
                </div>
                <span className="mkt-addon-price">449&nbsp;&euro;/mois</span>
              </div>
              <div className="mkt-addon">
                <div>
                  <strong>Marcus Performance+</strong>
                  <span>Analytics & SEO local avance</span>
                </div>
                <span className="mkt-addon-price">299&nbsp;&euro;/mois</span>
              </div>
              <div className="mkt-addon">
                <div>
                  <strong>Site web PrismaFlux</strong>
                  <span>Site concessionnaire SEO-optimise</span>
                </div>
                <span className="mkt-addon-price">Sur devis</span>
              </div>
              <Link href="/tarifs" className="mkt-feature-link" style={{ color: "var(--color-brand)" }}>
                Voir tous les tarifs <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section className="mkt-section mkt-section-alt" id="faq">
        <div className="mkt-container">
          <div className="mkt-section-header">
            <span className="mkt-section-tag">Questions frequentes</span>
            <h2 className="mkt-section-title">Tout ce que vous devez savoir</h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────────────── */}
      <section className="mkt-cta-final">
        <div className="mkt-cta-glow" />
        <div className="mkt-container">
          <h2>Pret a transformer votre concession ?</h2>
          <p>Rejoignez les concessionnaires qui laissent leurs copilotes IA gerer le reste.</p>
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
