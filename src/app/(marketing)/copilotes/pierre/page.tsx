import Link from "next/link";
import {
  BarChart3, Star, FileText, Bell,
  TrendingUp, Eye, Phone, Clock,
  Check, ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pierre — Copilote Reporting & Reputation | PrismaFlux Auto",
  description: "Pierre surveille vos KPIs, votre reputation Google Maps et genere des rapports mensuels automatiques pour votre concession.",
};

const kpis = [
  { icon: Eye, label: "Vues", value: "12 450", trend: "+18%" },
  { icon: Phone, label: "Contacts", value: "87", trend: "+12%" },
  { icon: Star, label: "Note Google", value: "4.7/5", trend: "+0.2" },
  { icon: Clock, label: "Duree moy. vente", value: "23j", trend: "-4j" },
];

const capabilities = [
  {
    icon: BarChart3,
    title: "Tableau de bord KPI",
    desc: "Vues, contacts, taux de contact, vehicules en ligne — tous vos indicateurs en temps reel dans un seul endroit.",
  },
  {
    icon: Star,
    title: "Suivi reputation Google",
    desc: "Pierre surveille votre fiche Google Business, vos avis clients et votre note. Il vous alerte des nouveaux avis.",
  },
  {
    icon: FileText,
    title: "Rapports mensuels PDF",
    desc: "Chaque mois, Pierre genere un rapport complet de votre activite. Pret a presenter a votre direction ou vos associes.",
  },
  {
    icon: Bell,
    title: "Alertes intelligentes",
    desc: "Baisse de vues, avis negatif, vehicule stagnant — Pierre vous previent avant que ca ne devienne un probleme.",
  },
];

export default function PierrePage() {
  return (
    <>
      <section className="mkt-copilote-hero">
        <div className="mkt-container">
          <div className="mkt-copilote-hero-inner">
            <div className="mkt-copilote-hero-content">
              <div className="mkt-copilote-badge" style={{ background: "#00C85315", color: "#00C853" }}>
                <BarChart3 size={16} /> Copilote Reporting
              </div>
              <h1>Pierre</h1>
              <p className="mkt-copilote-tagline">Vos chiffres, toujours sous controle.</p>
              <p className="mkt-copilote-desc">
                Pierre est votre copilote reporting. Il surveille vos KPIs, votre reputation Google Maps et
                genere des rapports mensuels automatiques. Vous savez toujours ou vous en etes.
              </p>
              <div className="mkt-hero-ctas">
                <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-lg" style={{ background: "#00C853" }}>
                  Essayer Pierre gratuitement <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className="mkt-copilote-hero-visual" style={{ borderColor: "#00C85330" }}>
              <div className="mkt-feature-screen">
                <div className="mkt-feature-screen-bar">
                  <span className="mkt-dot" /><span className="mkt-dot" /><span className="mkt-dot" />
                </div>
                <div className="mkt-feature-screen-body" style={{ borderTop: "2px solid #00C853" }}>
                  <div className="mkt-pierre-kpis">
                    {kpis.map((kpi) => (
                      <div key={kpi.label} className="mkt-pierre-kpi">
                        <span className="mkt-pierre-kpi-value">{kpi.value}</span>
                        <span className="mkt-pierre-kpi-label">{kpi.label}</span>
                        <span className="mkt-pierre-kpi-trend" style={{ color: "#00C853" }}>{kpi.trend}</span>
                      </div>
                    ))}
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
            <h2 className="mkt-section-title">Ce que Pierre fait pour vous</h2>
          </div>
          <div className="mkt-capabilities-grid">
            {capabilities.map((cap) => (
              <div key={cap.title} className="mkt-capability-card">
                <div className="mkt-capability-icon" style={{ background: "#00C85315" }}>
                  <cap.icon size={24} style={{ color: "#00C853" }} />
                </div>
                <h3>{cap.title}</h3>
                <p>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mkt-cta-final">
        <div className="mkt-container">
          <h2>Ne pilotez plus a l&apos;aveugle</h2>
          <p>Pierre vous donne les chiffres pour prendre les bonnes decisions.</p>
          <div className="mkt-hero-ctas">
            <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-lg" style={{ background: "#00C853" }}>
              Essai gratuit — 7 jours <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
