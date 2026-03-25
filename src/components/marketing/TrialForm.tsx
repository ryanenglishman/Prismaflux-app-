"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function TrialForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mkt-contact-success">
        <div className="mkt-contact-success-icon">&#10003;</div>
        <h3>Bienvenue !</h3>
        <p>Votre essai gratuit est en cours de creation. Vous recevrez un email de confirmation dans quelques instants.</p>
      </div>
    );
  }

  return (
    <form className="mkt-trial-form" onSubmit={handleSubmit}>
      <h3>Creez votre compte</h3>
      <div className="mkt-form-field">
        <label htmlFor="trialName">Prenom & Nom</label>
        <input id="trialName" type="text" required placeholder="Jean Dupont" />
      </div>
      <div className="mkt-form-field">
        <label htmlFor="trialEmail">Email professionnel</label>
        <input id="trialEmail" type="email" required placeholder="jean@maconcession.be" />
      </div>
      <div className="mkt-form-field">
        <label htmlFor="trialCompany">Nom de la concession</label>
        <input id="trialCompany" type="text" required placeholder="Auto Dupont SPRL" />
      </div>
      <div className="mkt-form-field">
        <label htmlFor="trialPhone">Telephone</label>
        <input id="trialPhone" type="tel" placeholder="+32 4XX XX XX XX" />
      </div>
      <button type="submit" className="mkt-btn-cta mkt-btn-lg mkt-btn-full">
        Demarrer mon essai gratuit <ArrowRight size={18} />
      </button>
      <p className="mkt-trial-legal">
        En vous inscrivant, vous acceptez nos conditions d&apos;utilisation et notre politique de confidentialite.
        Aucune carte bancaire requise.
      </p>
    </form>
  );
}
