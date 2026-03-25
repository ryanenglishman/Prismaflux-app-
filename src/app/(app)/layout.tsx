"use client";

import { OverlayProvider } from "@/components/navigation/OverlayContext";
import FloatingPill from "@/components/navigation/FloatingPill";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <OverlayProvider>
      <div className="flex flex-col h-full" style={{ background: "var(--color-bg)" }}>
        <main className="flex-1 overflow-y-auto pb-28">
          {children}
        </main>
        <FloatingPill />
      </div>
    </OverlayProvider>
  );
}
