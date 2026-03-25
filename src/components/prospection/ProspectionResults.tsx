"use client";

import { useEffect, useState } from "react";
import { ProspectionResultRow } from "./ProspectionResultRow";

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

interface SearchData {
  search: {
    id: string;
    location: string;
    radius: number;
    businessType: string;
    marginMin: number;
    marginMax: number;
    status: string;
    totalFound: number;
    totalQualified: number;
    createdAt: string;
  };
  businesses: Business[];
}

type SortKey = "name" | "googleRating" | "grossMargin";

interface ProspectionResultsProps {
  searchId: string | null;
}

function formatEUR(amount: number): string {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M €`;
  if (amount >= 1_000) return `${Math.round(amount / 1_000)}K €`;
  return `${amount} €`;
}

export function ProspectionResults({ searchId }: ProspectionResultsProps) {
  const [data, setData] = useState<SearchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQualifiedOnly, setShowQualifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("grossMargin");

  useEffect(() => {
    if (!searchId) return;

    setLoading(true);
    setError(null);

    fetch(`/api/prospection/search/${searchId}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          setData(result);
        }
      })
      .catch(() => setError("Erreur de chargement"))
      .finally(() => setLoading(false));
  }, [searchId]);

  if (!searchId) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <span className="ml-3 text-zinc-500">Chargement des resultats...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-[20px] bg-red-50 text-red-700 text-sm">{error}</div>
    );
  }

  if (!data) return null;

  // Filtrer et trier
  let businesses = [...data.businesses];

  if (showQualifiedOnly) {
    businesses = businesses.filter((b) => b.isQualified);
  }

  businesses.sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "googleRating") return (b.googleRating ?? 0) - (a.googleRating ?? 0);
    if (sortBy === "grossMargin") return (b.grossMargin ?? 0) - (a.grossMargin ?? 0);
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Resume */}
      <div className="flex items-center justify-between p-4 rounded-[20px] bg-zinc-50 border border-zinc-200">
        <div>
          <p className="text-sm text-zinc-500">
            Recherche : <span className="font-medium text-zinc-700">{data.search.businessType}</span> a{" "}
            <span className="font-medium text-zinc-700">{data.search.location}</span> ({data.search.radius}km)
          </p>
          <p className="text-sm text-zinc-500 mt-0.5">
            Fourchette : {formatEUR(data.search.marginMin)} — {formatEUR(data.search.marginMax)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-zinc-900">{data.search.totalFound}</p>
          <p className="text-sm text-zinc-500">
            dont <span className="font-semibold text-emerald-600">{data.search.totalQualified}</span> qualifiees
          </p>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Toggle qualifie */}
        <button
          type="button"
          onClick={() => setShowQualifiedOnly(!showQualifiedOnly)}
          className={`px-4 py-2 rounded-[20px] text-sm font-medium transition-colors ${
            showQualifiedOnly
              ? "bg-emerald-500 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}
        >
          {showQualifiedOnly ? "Qualifiees uniquement" : "Toutes les entreprises"}
        </button>

        {/* Tri */}
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-xs text-zinc-400">Trier par</span>
          {([
            ["grossMargin", "Marge"],
            ["googleRating", "Note"],
            ["name", "Nom"],
          ] as [SortKey, string][]).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSortBy(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                sortBy === key
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Liste */}
      {businesses.length === 0 ? (
        <div className="py-8 text-center text-zinc-400 text-sm">
          Aucune entreprise {showQualifiedOnly ? "qualifiee " : ""}trouvee
        </div>
      ) : (
        <div className="space-y-3">
          {businesses.map((biz) => (
            <ProspectionResultRow key={biz.id} business={biz} />
          ))}
        </div>
      )}
    </div>
  );
}
