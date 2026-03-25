"use client";

import { useRef } from "react";
import { Plus, Image as ImageIcon } from "lucide-react";
import type { VehicleData } from "@/lib/platforms/types";

interface StepPhotosProps {
  formData: Partial<VehicleData>;
  onUpdate: (key: string, value: unknown) => void;
}

export default function StepPhotos({ formData, onUpdate }: StepPhotosProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photos = formData.photos ?? [];

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    // For now, create placeholder photo entries from selected files
    const newPhotos = Array.from(fileList).map((file, i) => ({
      id: `photo-${Date.now()}-${i}`,
      url: URL.createObjectURL(file),
      order: photos.length + i,
      type: "exterior" as const,
    }));
    onUpdate("photos", [...photos, ...newPhotos]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
        Ajoutez des photos de votre vehicule. Les annonces avec photos ont beaucoup plus de visibilite.
      </p>

      {/* Photo grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              aspectRatio: "4/3",
              borderRadius: "var(--radius-sm)",
              overflow: "hidden",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              position: "relative",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={`Photo ${photo.order + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}

        {/* Add button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            aspectRatio: "4/3",
            borderRadius: "var(--radius-sm)",
            background: "var(--color-surface)",
            border: "2px dashed var(--color-border-hover)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            cursor: "pointer",
            color: "var(--color-text-muted)",
            transition: "border-color 0.15s",
          }}
        >
          <Plus size={20} />
          <span style={{ fontSize: 11 }}>Ajouter</span>
        </button>
      </div>

      {photos.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "24px 0",
          }}
        >
          <ImageIcon size={32} style={{ color: "var(--color-text-dim)" }} />
          <p style={{ fontSize: 13, color: "var(--color-text-dim)" }}>
            Aucune photo ajoutee
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        style={{ display: "none" }}
      />
    </div>
  );
}
