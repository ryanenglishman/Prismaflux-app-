"use client";

const FILTERS = ["Tous", "En ligne", "Brouillons", "Vendus"];

interface CatalogFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function CatalogFilters({ activeFilter, onFilterChange }: CatalogFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {FILTERS.map((f) => {
        const isActive = f === activeFilter;
        return (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className="flex-shrink-0 rounded-full px-4 font-semibold transition-colors"
            style={{
              height: 32,
              fontSize: 12,
              background: isActive ? "#FF1744" : "#F3F4F6",
              color: isActive ? "#FFFFFF" : "#6B7280",
              border: isActive ? "1px solid #FF1744" : "1px solid #E5E7EB",
            }}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}
