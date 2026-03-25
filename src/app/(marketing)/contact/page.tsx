import Link from "next/link";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import ContactForm from "@/components/marketing/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Reservez une demo | PrismaFlux Auto",
  description: "Reservez une demo personnalisee de PrismaFlux Auto. Decouvrez comment nos copilotes IA peuvent transformer votre concession.",
};

export default function ContactPage() {
  return (
    <section className="mkt-section" style={{ paddingTop: 120 }}>
      <div className="mkt-container">
        <div className="mkt-section-header">
          <span className="mkt-section-tag">Parlons-en</span>
          <h1 className="mkt-section-title">Reservez une demo</h1>
          <p className="mkt-section-sub">
            Decouvrez en 20 minutes comment Robin, Lana, Marcus et Pierre peuvent transformer votre concession.
          </p>
        </div>

        <div className="mkt-contact-grid">
          <div className="mkt-contact-form-wrap">
            <ContactForm />
          </div>
          <div className="mkt-contact-info">
            <div className="mkt-contact-info-card">
              <Mail size={20} style={{ color: "var(--color-brand)" }} />
              <div>
                <h4>Email</h4>
                <a href="mailto:contact@prismaflux.com">contact@prismaflux.com</a>
              </div>
            </div>
            <div className="mkt-contact-info-card">
              <MessageCircle size={20} style={{ color: "var(--color-brand)" }} />
              <div>
                <h4>Demo en visio</h4>
                <p>20 minutes, sans engagement. On vous montre tout.</p>
              </div>
            </div>
            <div className="mkt-contact-benefits">
              <h4>Ce que vous verrez</h4>
              <ul>
                <li>Robin qui publie un vehicule en 30 secondes</li>
                <li>Lana qui retouche vos photos automatiquement</li>
                <li>Marcus qui analyse votre site en direct</li>
                <li>Pierre qui genere vos rapports</li>
              </ul>
            </div>
            <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-full">
              Ou essayez directement — 7 jours gratuits <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
