"use client";

import { useRef, useCallback } from "react";
import { Upload, Camera, FolderOpen, Sparkles } from "lucide-react";

interface DocumentUploadProps {
  onFilesSelected: (files: File[]) => void;
  isAnalyzing?: boolean;
}

const ACCEPTED_TYPES = ".pdf,.jpg,.jpeg,.png,.heic";

export default function DocumentUpload({ onFilesSelected, isAnalyzing }: DocumentUploadProps) {
  const dropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      onFilesSelected(Array.from(fileList));
    },
    [onFilesSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  if (isAnalyzing) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: "48px 20px",
        }}
      >
        <div
          className="animate-pulse-ring"
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--color-brand-dim)",
            border: "1px solid var(--color-brand)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sparkles size={28} style={{ color: "var(--color-brand)" }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text)" }}>
            Robin analyse vos documents...
          </p>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 4 }}>
            Detection du modele et extraction des donnees
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Drag & drop zone */}
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: "2px dashed var(--color-border-hover)",
          borderRadius: "var(--radius-lg)",
          padding: "32px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          background: "var(--color-surface)",
          transition: "border-color 0.15s",
        }}
      >
        <Upload size={28} style={{ color: "var(--color-text-muted)" }} />
        <p style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text)" }}>
          Glissez vos fichiers ici
        </p>
        <p style={{ fontSize: 12, color: "var(--color-text-dim)" }}>
          PDF, JPEG, PNG, HEIC
        </p>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        {/* Camera capture */}
        <button
          className="btn-ghost"
          style={{ flex: 1, gap: 6 }}
          onClick={() => cameraInputRef.current?.click()}
        >
          <Camera size={16} />
          Camera
        </button>

        {/* File picker */}
        <button
          className="btn-ghost"
          style={{ flex: 1, gap: 6 }}
          onClick={() => fileInputRef.current?.click()}
        >
          <FolderOpen size={16} />
          Parcourir
        </button>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        style={{ display: "none" }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleFiles(e.target.files)}
        style={{ display: "none" }}
      />
    </div>
  );
}
