import Link from "next/link";
import { Check, ArrowRight, Shield, Clock, CreditCard } from "lucide-react";
import type { Metadata } from "next";
import TrialForm from "@/components/marketing/TrialForm";

export const metadata: Metadata = {
  title: "Essai gratuit 7 jours — PrismaFlux Auto",
  description: "Essayez PrismaFlux Auto gratuitement pendant 7 jours. 4 copilotes IA, toutes les fonctionnalites. Sans carte bancaire.",
};

const guarantees = [
  { icon: Clock, text: "7 jours d'essai complet" },
  { icon: CreditCard, text: "Aucune carte bancaire" },
  { icon: Shield, text: "Annulation en 1 clic" },
];

const features = [
  "Robin — Publication multi-plateformes",
  "Lana — Studio Photo IA",
  "Marcus — Audit SEO gratuit",
  "Pierre — Reporting & KPIs",
  "AutoScout24, GoCar, 2ememain",
  "Remplissage IA automatique",
  "Support par email",
];

export default function EssaiGratuitPage() {
  return (
    <section className="mkt-section" style={{ paddingTop: 120 }}>
      <div className="mkt-container">
        <div className="mkt-trial-layout">
          <div className="mkt-trial-left">
            <span className="mkt-section-tag">Essai gratuit</span>
            <h1 style={{ fontSize: 36, marginTop: 16, marginBottom: 16 }}>
              Testez vos copilotes IA<br />pendant 7 jours
            </h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: 16, marginBottom: 32 }}>
              Acces complet a toutes les fonctionnalites. Sans engagement, sans carte bancaire.
            </p>

            <div className="mkt-trial-guarantees">
              {guarantees.map((g) => (
                <div key={g.text} className="mkt-trial-guarantee">
                  <g.icon size={20} style={{ color: "var(--color-brand)" }} />
                  <span>{g.text}</span>
                </div>
              ))}
            </div>

            <div className="mkt-trial-features">
              <h4>Inclus dans l&apos;essai :</h4>
              <ul>
                {features.map((f) => (
                  <li key={f}><Check size={16} style={{ color: "#00C853" }} /> {f}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mkt-trial-right">
            <TrialForm />
          </div>
        </div>
      </div>
    </section>
  );
}
