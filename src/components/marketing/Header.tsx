"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const copilotes = [
  { name: "Robin", role: "Multidiffusion & SEO", href: "/copilotes/robin", color: "#FF1744" },
  { name: "Lana", role: "Studio Photo IA", href: "/copilotes/lana", color: "#E040FB" },
  { name: "Marcus", role: "Audit & Performance Web", href: "/copilotes/marcus", color: "#448AFF" },
  { name: "Pierre", role: "Reporting & Reputation", href: "/copilotes/pierre", color: "#00C853" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copilotesOpen, setCopilotesOpen] = useState(false);

  return (
    <header className="mkt-header">
      <div className="mkt-header-inner">
        <Link href="/" className="mkt-logo">
          <span className="mkt-logo-icon">P</span>
          <span className="mkt-logo-text">PrismaFlux <span className="mkt-logo-auto">Auto</span></span>
        </Link>

        <nav className="mkt-nav-desktop">
          <div
            className="mkt-nav-dropdown"
            onMouseEnter={() => setCopilotesOpen(true)}
            onMouseLeave={() => setCopilotesOpen(false)}
          >
            <button className="mkt-nav-link">
              Copilotes IA <ChevronDown size={14} style={{ transition: "transform .2s", transform: copilotesOpen ? "rotate(180deg)" : "" }} />
            </button>
            {copilotesOpen && (
              <div className="mkt-dropdown-menu">
                {copilotes.map((c) => (
                  <Link key={c.name} href={c.href} className="mkt-dropdown-item">
                    <span className="mkt-dropdown-dot" style={{ background: c.color }} />
                    <div>
                      <div className="mkt-dropdown-name">{c.name}</div>
                      <div className="mkt-dropdown-role">{c.role}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/tarifs" className="mkt-nav-link">Tarifs</Link>
          <Link href="/#fonctionnement" className="mkt-nav-link">Fonctionnement</Link>
          <Link href="/#faq" className="mkt-nav-link">FAQ</Link>
        </nav>

        <div className="mkt-header-actions">
          <Link href="/robin" className="mkt-nav-link mkt-login-link">Connexion</Link>
          <Link href="/essai-gratuit" className="mkt-btn-cta">
            Essai gratuit — 7 jours
          </Link>
        </div>

        <button className="mkt-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mkt-mobile-menu">
          <div className="mkt-mobile-section-label">Copilotes IA</div>
          {copilotes.map((c) => (
            <Link key={c.name} href={c.href} className="mkt-mobile-link" onClick={() => setMobileOpen(false)}>
              <span className="mkt-dropdown-dot" style={{ background: c.color }} />
              {c.name} — {c.role}
            </Link>
          ))}
          <div className="mkt-mobile-divider" />
          <Link href="/tarifs" className="mkt-mobile-link" onClick={() => setMobileOpen(false)}>Tarifs</Link>
          <Link href="/#fonctionnement" className="mkt-mobile-link" onClick={() => setMobileOpen(false)}>Fonctionnement</Link>
          <Link href="/#faq" className="mkt-mobile-link" onClick={() => setMobileOpen(false)}>FAQ</Link>
          <div className="mkt-mobile-divider" />
          <Link href="/robin" className="mkt-mobile-link" onClick={() => setMobileOpen(false)}>Connexion</Link>
          <Link href="/essai-gratuit" className="mkt-btn-cta mkt-btn-cta-full" onClick={() => setMobileOpen(false)}>
            Essai gratuit — 7 jours
          </Link>
        </div>
      )}
    </header>
  );
}
