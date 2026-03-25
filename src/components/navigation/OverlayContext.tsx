"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type OverlayTarget = "none" | "robin" | "menu";

interface OverlayContextValue {
  activeOverlay: OverlayTarget;
  openOverlay: (target: OverlayTarget) => void;
  closeOverlay: () => void;
}

const OverlayContext = createContext<OverlayContextValue>({
  activeOverlay: "none",
  openOverlay: () => {},
  closeOverlay: () => {},
});

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [activeOverlay, setActiveOverlay] = useState<OverlayTarget>("none");

  const openOverlay = useCallback((target: OverlayTarget) => {
    setActiveOverlay(target);
  }, []);

  const closeOverlay = useCallback(() => {
    setActiveOverlay("none");
  }, []);

  return (
    <OverlayContext.Provider value={{ activeOverlay, openOverlay, closeOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  return useContext(OverlayContext);
}
