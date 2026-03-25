"use client";

import { useState } from "react";
import { RangeSlider } from "./RangeSlider";

const RADIUS_OPTIONS = [5, 10, 25, 50, 100];

interface ProspectionSearchFormProps {
  onSearchComplete: (searchId: string) => void;
}

export function ProspectionSearchForm({ onSearchComplete }: ProspectionSearchFormProps) {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(25);
  const [businessType, setBusinessType] = useState("");
  const [maxResults, setMaxResults] = useState(20);
  const [marginMin, setMarginMin] = useState(200_000);
  const [marginMax, setMarginMax] = useState(2_000_000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/prospection/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location,
          radius,
          businessType,
          maxResults,
          marginMin,
          marginMax,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de la recherche");
        return;
      }

      onSearchComplete(data.searchId);
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Localite */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-zinc-700 mb-1">
          Ville / Province / Code postal
        </label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Bruxelles, Liege, 1000..."
          required
          className="w-full px-4 py-3 rounded-[20px] border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Rayon */}
      <div>
        <span className="block text-sm font-medium text-zinc-700 mb-2">Rayon de recherche</span>
        <div className="flex gap-2">
          {RADIUS_OPTIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRadius(r)}
              className={`flex-1 py-2 rounded-[20px] text-sm font-medium transition-colors ${
                radius === r
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      {/* Type d'entreprise */}
      <div>
        <label htmlFor="businessType" className="block text-sm font-medium text-zinc-700 mb-1">
          Type d&apos;entreprise
        </label>
        <input
          id="businessType"
          type="text"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          placeholder="garage automobile, concessionnaire, carrosserie..."
          required
          className="w-full px-4 py-3 rounded-[20px] border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Nombre d'entreprises */}
      <div>
        <label htmlFor="maxResults" className="block text-sm font-medium text-zinc-700 mb-1">
          Nombre d&apos;entreprises a rechercher
        </label>
        <input
          id="maxResults"
          type="number"
          min={1}
          max={200}
          value={maxResults}
          onChange={(e) => setMaxResults(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-[20px] border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Fourchette marge brute */}
      <RangeSlider
        label="Fourchette marge brute annuelle"
        min={0}
        max={5_000_000}
        step={50_000}
        valueMin={marginMin}
        valueMax={marginMax}
        onChange={(min, max) => {
          setMarginMin(min);
          setMarginMax(max);
        }}
      />

      {/* Erreur */}
      {error && (
        <div className="p-3 rounded-[20px] bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !location || !businessType}
        className="w-full py-3 px-6 rounded-[20px] bg-blue-500 text-white font-medium text-base hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Recherche en cours...
          </span>
        ) : (
          "Rechercher"
        )}
      </button>
    </form>
  );
}
