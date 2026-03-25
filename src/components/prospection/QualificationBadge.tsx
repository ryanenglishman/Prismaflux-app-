"use client";

interface QualificationBadgeProps {
  isQualified: boolean;
  note?: string | null;
}

export function QualificationBadge({ isQualified, note }: QualificationBadgeProps) {
  return (
    <span
      title={note ?? undefined}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
        isQualified
          ? "bg-emerald-100 text-emerald-800"
          : "bg-zinc-100 text-zinc-500"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isQualified ? "bg-emerald-500" : "bg-zinc-400"
        }`}
      />
      {isQualified ? "Qualifie" : "Non qualifie"}
    </span>
  );
}
