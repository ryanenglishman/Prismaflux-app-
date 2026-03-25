"use client";

import { useEffect, type ReactNode } from "react";

interface BlurOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BlurOverlay({ isOpen, onClose, children }: BlurOverlayProps) {
  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="blur-overlay animate-fade-in" onClick={onClose}>
      <div
        className="blur-overlay-content animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
