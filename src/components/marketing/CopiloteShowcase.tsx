"use client";

import { useState } from "react";
import Link from "next/link";
import { Radio, Camera, Globe, BarChart3, ArrowRight } from "lucide-react";

const copilotes = [
  {
    id: "robin",
    name: "Robin",
    role: "Multidiffusion & SEO",
    description: "Robin publie vos vehicules sur AutoScout24, GoCar, 2ememain et plus encore. Il remplit automatiquement les annonces a partir de vos documents et photos, optimise le SEO et synchronise tout en temps reel.",
    Icon: Radio,
    color: "#FF1744",
    features: [
      "Publication multi-plateformes en 1 clic",
      "Remplissage automatique depuis carte grise & photos",
      "Optimisation SEO de chaque annonce",
      "Synchronisation en temps reel",
    ],
  },
  {
    id: "lana",
    name: "Lana",
    role: "Studio Photo IA",
    description: "Lana transforme vos photos brutes en visuels professionnels. Suppression de fond, recadrage intelligent, detection de couleur et generation de posts pour les reseaux sociaux.",
    Icon: Camera,
    color: "#E040FB",
    features: [
      "Suppression de fond automatique",
      "Recadrage et retouche intelligente",
      "Filigrane personnalise",
      "Generation de posts Instagram & Facebook",
    ],
  },
  {
    id: "marcus",
    name: "Marcus",
    role: "Audit & Performance Web",
    description: "Marcus analyse votre site web gratuitement et identifie les problemes de SEO, performance et mobile. Avec Performance+, il connecte vos outils Google pour un suivi en continu.",
    Icon: Globe,
    color: "#448AFF",
    features: [
      "Audit SEO gratuit de votre site",
      "Score de performance detaille",
      "Connexion Google Analytics & Search Console",
      "Recommandations SEO local",
    ],
  },
  {
    id: "pierre",
    name: "Pierre",
    role: "Reporting & Reputation",
    description: "Pierre surveille vos KPIs, votre reputation Google et genere des rapports mensuels. Il vous alerte des changements importants et garde un oeil sur vos avis clients.",
    Icon: BarChart3,
    color: "#00C853",
    features: [
      "Tableau de bord KPI en temps reel",
      "Suivi reputation Google Maps",
      "Rapports mensuels PDF automatiques",
      "Alertes sur les changements importants",
    ],
  },
];

export default function CopiloteShowcase() {
  const [active, setActive] = useState(0);
  const c = copilotes[active];

  return (
    <div className="mkt-showcase">
      <div className="mkt-showcase-tabs">
        {copilotes.map((cop, i) => (
          <button
            key={cop.id}
            className={`mkt-showcase-tab ${i === active ? "mkt-showcase-tab-active" : ""}`}
            onClick={() => setActive(i)}
            style={i === active ? { borderColor: cop.color, background: `${cop.color}10` } : {}}
          >
            <cop.Icon size={20} style={{ color: i === active ? cop.color : "var(--color-text-muted)" }} />
            <span className="mkt-showcase-tab-name">{cop.name}</span>
          </button>
        ))}
      </div>

      <div className="mkt-showcase-content" style={{ borderColor: `${c.color}30` }}>
        <div className="mkt-showcase-header">
          <div className="mkt-showcase-avatar" style={{ background: `${c.color}20`, color: c.color }}>
            <c.Icon size={32} />
          </div>
          <div>
            <h3 className="mkt-showcase-name" style={{ color: c.color }}>{c.name}</h3>
            <p className="mkt-showcase-role">{c.role}</p>
          </div>
        </div>
        <p className="mkt-showcase-desc">{c.description}</p>
        <ul className="mkt-showcase-features">
          {c.features.map((f) => (
            <li key={f}>
              <span className="mkt-showcase-check" style={{ color: c.color }}>&#10003;</span>
              {f}
            </li>
          ))}
        </ul>
        <Link href={`/copilotes/${c.id}`} className="mkt-btn-cta" style={{ background: c.color }}>
          Decouvrir {c.name} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
