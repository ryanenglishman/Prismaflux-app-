"use client";

import { useState } from "react";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import CatalogList from "@/components/catalog/CatalogList";
import CopilotBar from "@/components/navigation/CopilotBar";
import { MOCK_VEHICLES } from "@/lib/mock";

export default function CatalogPage() {
  const [filter, setFilter] = useState("Tous");

  const count = MOCK_VEHICLES.filter((v) => {
    if (filter === "Tous") return true;
    if (filter === "En ligne") return v.status === "published";
    if (filter === "Brouillons") return v.status === "draft";
    if (filter === "Vendus") return v.status === "sold";
    return true;
  }).length;

  return (
    <div
      className="theme-light"
      style={{ minHeight: "100%", padding: "20px 16px 120px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
          Catalogue
        </h1>
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#6B7280",
          }}
        >
          {count} vehicule{count !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Filters */}
      <div className="mb-4">
        <CatalogFilters activeFilter={filter} onFilterChange={setFilter} />
      </div>

      {/* Vehicle list */}
      <CatalogList activeFilter={filter} />

      {/* Copilot bar */}
      <CopilotBar />
    </div>
  );
}
