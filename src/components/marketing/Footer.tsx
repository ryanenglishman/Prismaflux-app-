import Link from "next/link";

const copilotes = [
  { name: "Robin", href: "/copilotes/robin" },
  { name: "Lana", href: "/copilotes/lana" },
  { name: "Marcus", href: "/copilotes/marcus" },
  { name: "Pierre", href: "/copilotes/pierre" },
];

export default function Footer() {
  return (
    <footer className="mkt-footer">
      <div className="mkt-footer-inner">
        <div className="mkt-footer-grid">
          <div className="mkt-footer-brand">
            <div className="mkt-logo">
              <span className="mkt-logo-icon">P</span>
              <span className="mkt-logo-text">PrismaFlux <span className="mkt-logo-auto">Auto</span></span>
            </div>
            <p className="mkt-footer-desc">
              La plateforme IA qui gere la diffusion, les photos, le SEO et le reporting de votre concession automobile. Automatiquement.
            </p>
          </div>

          <div className="mkt-footer-col">
            <h4>Copilotes</h4>
            {copilotes.map((c) => (
              <Link key={c.name} href={c.href}>{c.name}</Link>
            ))}
          </div>

          <div className="mkt-footer-col">
            <h4>Produit</h4>
            <Link href="/tarifs">Tarifs</Link>
            <Link href="/#fonctionnement">Fonctionnement</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/robin">Application</Link>
          </div>

          <div className="mkt-footer-col">
            <h4>Contact</h4>
            <a href="mailto:contact@prismaflux.com">contact@prismaflux.com</a>
            <Link href="/contact">Reserver une demo</Link>
          </div>
        </div>

        <div className="mkt-footer-bottom">
          <span>&copy; {new Date().getFullYear()} PrismaFlux Auto. Tous droits reserves.</span>
          <div className="mkt-footer-legal">
            <Link href="/mentions-legales">Mentions legales</Link>
            <Link href="/confidentialite">Confidentialite</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
