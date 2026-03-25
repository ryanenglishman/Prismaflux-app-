"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Star } from "lucide-react";

export default function PricingToggle({ included }: { included: string[] }) {
  const [annual, setAnnual] = useState(false);
  const monthly = 749;
  const annualPrice = 599;

  return (
    <div className="mkt-pricing-toggle-wrap">
      <div className="mkt-pricing-toggle">
        <button
          className={`mkt-toggle-btn ${!annual ? "mkt-toggle-btn-active" : ""}`}
          onClick={() => setAnnual(false)}
        >
          Mensuel
        </button>
        <button
          className={`mkt-toggle-btn ${annual ? "mkt-toggle-btn-active" : ""}`}
          onClick={() => setAnnual(true)}
        >
          Annuel <span className="mkt-toggle-badge">-20%</span>
        </button>
      </div>

      <div className="mkt-pricing-card-hero">
        <div className="mkt-pricing-badge">
          <Star size={14} /> Essai gratuit 7 jours
        </div>
        <h3>PrismaFlux Auto</h3>
        <div className="mkt-pricing-price">
          <span className="mkt-pricing-amount">{annual ? annualPrice : monthly}</span>
          <div className="mkt-pricing-unit">
            <span>&euro; / mois</span>
            {annual && <span className="mkt-pricing-annual">Facture annuellement</span>}
            {!annual && <span className="mkt-pricing-annual">Sans engagement</span>}
          </div>
        </div>
        {annual && (
          <p className="mkt-pricing-savings">
            Vous economisez {(monthly - annualPrice) * 12}&nbsp;&euro; par an
          </p>
        )}
        <ul className="mkt-pricing-features">
          {included.map((item) => (
            <li key={item}><Check size={16} /> {item}</li>
          ))}
        </ul>
        <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-lg mkt-btn-full">
          Demarrer l&apos;essai gratuit <ArrowRight size={18} />
        </Link>
        <p style={{ textAlign: "center", color: "var(--color-text-muted)", fontSize: 13, marginTop: 12 }}>
          Aucune carte bancaire requise
        </p>
      </div>
    </div>
  );
}
