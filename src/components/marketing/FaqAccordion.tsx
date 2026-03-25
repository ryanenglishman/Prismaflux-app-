"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Qu'est-ce qu'un copilote IA ?",
    a: "Un copilote IA est un assistant autonome specialise dans un domaine precis de votre concession. Contrairement a un simple outil, il travaille en continu, prend des decisions intelligentes et s'adapte a votre activite. Pensez a lui comme un membre de votre equipe qui ne dort jamais.",
  },
  {
    q: "Combien de temps faut-il pour demarrer ?",
    a: "L'inscription prend 2 minutes. Vos copilotes commencent a travailler immediatement. Robin peut publier votre premier vehicule dans les 10 minutes suivant votre inscription.",
  },
  {
    q: "Ai-je besoin de competences techniques ?",
    a: "Absolument pas. PrismaFlux est concu pour les concessionnaires, pas pour les developpeurs. L'interface est intuitive et vos copilotes gerent la technique pour vous.",
  },
  {
    q: "Quelles plateformes sont incluses dans l'abonnement ?",
    a: "AutoScout24, GoCar et 2ememain sont inclus dans l'abonnement de base a 749 EUR/mois. Des plateformes supplementaires comme La Centrale ou mobile.de sont disponibles en modules complementaires.",
  },
  {
    q: "L'essai gratuit est-il sans engagement ?",
    a: "Oui, 100%. Essayez pendant 7 jours avec toutes les fonctionnalites. Aucune carte bancaire n'est demandee. Si vous ne souhaitez pas continuer, il n'y a rien a faire.",
  },
  {
    q: "Comment Robin remplit-il les annonces automatiquement ?",
    a: "Robin utilise l'intelligence artificielle pour extraire les informations de vos documents (carte grise, certificat de conformite) et de vos photos (couleur, type de carrosserie). Il remplit ensuite les champs des annonces avec un taux de precision superieur a 90%.",
  },
  {
    q: "Mes donnees sont-elles en securite ?",
    a: "Vos donnees sont hebergees en Europe et nous sommes conformes au RGPD. Nous ne partageons jamais vos informations avec des tiers. Chaque concession a un environnement isole et securise.",
  },
  {
    q: "Puis-je annuler a tout moment ?",
    a: "Oui. Pas de contrat a long terme, pas de frais d'annulation. Vous pouvez arreter votre abonnement mensuel a tout moment.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mkt-faq-list">
      {faqs.map((faq, i) => (
        <div key={i} className={`mkt-faq-item ${open === i ? "mkt-faq-item-open" : ""}`}>
          <button className="mkt-faq-question" onClick={() => setOpen(open === i ? null : i)}>
            <span>{faq.q}</span>
            <ChevronDown
              size={18}
              style={{ transition: "transform .2s", transform: open === i ? "rotate(180deg)" : "" }}
            />
          </button>
          {open === i && <div className="mkt-faq-answer">{faq.a}</div>}
        </div>
      ))}
    </div>
  );
}
