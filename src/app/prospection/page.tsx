"use client";

import { useState } from "react";
import { ProspectionSearchForm } from "@/components/prospection/ProspectionSearchForm";
import { ProspectionResults } from "@/components/prospection/ProspectionResults";

export default function ProspectionPage() {
  const [searchId, setSearchId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-3xl mx-auto px-[33px] py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900">Prospection</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Trouvez des entreprises qualifiees dans votre zone
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-[20px] border border-zinc-200 p-6 mb-8">
          <ProspectionSearchForm onSearchComplete={setSearchId} />
        </div>

        {/* Resultats */}
        <ProspectionResults searchId={searchId} />
      </div>
    </div>
  );
}
