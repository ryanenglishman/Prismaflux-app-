"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import VehicleCard from "@/components/robin/VehicleCard";
import { MOCK_VEHICLES } from "@/lib/mock";

const FILTERS = ["Tous", "En ligne", "Brouillons", "Vendus"];

export default function CatalogPage() {
  const [filter, setFilter] = useState("Tous");
  const [query, setQuery] = useState("");

  const filtered = MOCK_VEHICLES.filter((v) => {
    const matchFilter =
      filter === "Tous" ||
      (filter === "En ligne"   && v.status === "published") ||
      (filter === "Brouillons" && v.status === "draft") ||
      (filter === "Vendus"     && v.status === "sold");

    const q = query.toLowerCase();
    const matchQuery = !q || `${v.make} ${v.model}`.toLowerCase().includes(q);
    return matchFilter && matchQuery;
  });

  return (
    <div className="flex flex-col" style={{ minHeight: "100%" }}>

      {/* Search */}
      <div className="px-4 pt-4">
        <div
          className="flex items-center gap-2 rounded-xl px-3"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            height: 44,
          }}
        >
          <Search size={16} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un véhicule…"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14,
              color: "var(--color-text)",
            }}
          />
          <button style={{ color: "var(--color-text-muted)" }}>
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 mt-3 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="flex-shrink-0 rounded-full px-4 font-semibold transition-colors"
            style={{
              height: 32,
              fontSize: 12,
              background: filter === f ? "var(--color-brand)" : "var(--color-surface)",
              color: filter === f ? "#fff" : "var(--color-text-muted)",
              border: `1px solid ${filter === f ? "var(--color-brand)" : "var(--color-border)"}`,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="flex items-center justify-between px-4 mt-4 mb-2">
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)" }}>
          {filtered.length} véhicule{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* List */}
      {filtered.length > 0 ? (
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: 16,
            marginLeft: 16,
            marginRight: 16,
            overflow: "hidden",
          }}
        >
          {filtered.map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <span style={{ fontSize: 40 }}>🚗</span>
          <p className="font-semibold text-white mt-4" style={{ fontSize: 15 }}>Aucun véhicule trouvé</p>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 4 }}>
            Modifiez votre recherche ou ajoutez un véhicule.
          </p>
        </div>
      )}

      <div style={{ height: 16 }} />
    </div>
  );
}
