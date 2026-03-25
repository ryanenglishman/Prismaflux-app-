"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mkt-contact-success">
        <div className="mkt-contact-success-icon">&#10003;</div>
        <h3>Demande envoyee !</h3>
        <p>Nous vous recontactons dans les 24 heures pour planifier votre demo.</p>
      </div>
    );
  }

  return (
    <form className="mkt-contact-form" onSubmit={handleSubmit}>
      <div className="mkt-form-row">
        <div className="mkt-form-field">
          <label htmlFor="firstName">Prenom</label>
          <input id="firstName" type="text" required placeholder="Jean" />
        </div>
        <div className="mkt-form-field">
          <label htmlFor="lastName">Nom</label>
          <input id="lastName" type="text" required placeholder="Dupont" />
        </div>
      </div>
      <div className="mkt-form-field">
        <label htmlFor="email">Email professionnel</label>
        <input id="email" type="email" required placeholder="jean@maconcession.be" />
      </div>
      <div className="mkt-form-field">
        <label htmlFor="company">Nom de la concession</label>
        <input id="company" type="text" required placeholder="Auto Dupont SPRL" />
      </div>
      <div className="mkt-form-field">
        <label htmlFor="phone">Telephone (optionnel)</label>
        <input id="phone" type="tel" placeholder="+32 4XX XX XX XX" />
      </div>
      <div className="mkt-form-field">
        <label htmlFor="message">Message (optionnel)</label>
        <textarea id="message" rows={3} placeholder="Dites-nous ce qui vous interesse..." />
      </div>
      <button type="submit" className="mkt-btn-cta mkt-btn-lg mkt-btn-full">
        Demander une demo <Send size={16} />
      </button>
    </form>
  );
}
