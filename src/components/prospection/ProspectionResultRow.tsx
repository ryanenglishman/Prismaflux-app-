"use client";

import { QualificationBadge } from "./QualificationBadge";

interface Business {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  googleRating: number | null;
  googleReviewCount: number | null;
  companyNumber: string | null;
  grossMargin: number | null;
  revenue: number | null;
  netProfit: number | null;
  employees: number | null;
  legalForm: string | null;
  isQualified: boolean;
  qualificationNote: string | null;
}

function formatEUR(amount: number | null): string {
  if (amount == null) return "—";
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function renderStars(rating: number | null): string {
  if (rating == null) return "—";
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  return "★".repeat(full) + (half ? "½" : "") + " " + rating.toFixed(1);
}

export function ProspectionResultRow({ business }: { business: Business }) {
  return (
    <div
      className={`p-4 rounded-[20px] border transition-colors ${
        business.isQualified
          ? "border-emerald-200 bg-emerald-50/30"
          : "border-zinc-200 bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-zinc-900 truncate">{business.name}</h3>
          {business.address && (
            <p className="text-sm text-zinc-500 mt-0.5">{business.address}</p>
          )}
        </div>
        <QualificationBadge
          isQualified={business.isQualified}
          note={business.qualificationNote}
        />
      </div>

      {/* Grid info */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
        {/* Google Rating */}
        <div>
          <span className="text-zinc-400 text-xs">Google</span>
          <p className="text-zinc-700">
            {renderStars(business.googleRating)}
            {business.googleReviewCount != null && (
              <span className="text-zinc-400 ml-1">({business.googleReviewCount})</span>
            )}
          </p>
        </div>

        {/* Marge brute */}
        <div>
          <span className="text-zinc-400 text-xs">Marge brute</span>
          <p className={`font-medium ${business.isQualified ? "text-emerald-700" : "text-zinc-700"}`}>
            {formatEUR(business.grossMargin)}
          </p>
        </div>

        {/* CA */}
        <div>
          <span className="text-zinc-400 text-xs">CA</span>
          <p className="text-zinc-700">{formatEUR(business.revenue)}</p>
        </div>

        {/* Telephone */}
        <div>
          <span className="text-zinc-400 text-xs">Tel</span>
          <p className="text-zinc-700">
            {business.phone ? (
              <a href={`tel:${business.phone}`} className="hover:text-blue-500">
                {business.phone}
              </a>
            ) : (
              "—"
            )}
          </p>
        </div>

        {/* Site web */}
        <div>
          <span className="text-zinc-400 text-xs">Site web</span>
          <p className="text-zinc-700 truncate">
            {business.website ? (
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {new URL(business.website).hostname}
              </a>
            ) : (
              <span className="text-zinc-400">Aucun</span>
            )}
          </p>
        </div>

        {/* N entreprise */}
        <div>
          <span className="text-zinc-400 text-xs">N° BCE</span>
          <p className="text-zinc-700 font-mono text-xs">
            {business.companyNumber || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
