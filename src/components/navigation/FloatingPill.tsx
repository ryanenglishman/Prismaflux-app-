"use client";

import Image from "next/image";
import { useOverlay } from "./OverlayContext";
import BlurOverlay from "./BlurOverlay";
import MenuOverlay from "./MenuOverlay";

export default function FloatingPill() {
  const { activeOverlay, openOverlay, closeOverlay } = useOverlay();

  return (
    <>
      {/* The floating pill — always visible unless overlay is open */}
      {activeOverlay === "none" && (
        <div
          className="fixed z-40"
          style={{
            bottom: 33,
            left: 33,
            right: 33,
          }}
        >
          <div
            className="flex items-stretch overflow-hidden"
            style={{
              borderRadius: 20,
              background: "rgba(15, 15, 20, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Left zone — Robin's face → open vehicle add flow */}
            <button
              onClick={() => openOverlay("robin")}
              className="flex items-center gap-3 flex-1 px-4 py-3 transition-all active:scale-95"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                borderRight: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div
                className="relative flex-shrink-0 rounded-full overflow-hidden"
                style={{
                  width: 36,
                  height: 36,
                  background: "rgba(255, 23, 68, 0.15)",
                  border: "2px solid rgba(255, 23, 68, 0.3)",
                }}
              >
                <Image
                  src="/copilotes/robin.png"
                  alt="Robin"
                  width={36}
                  height={36}
                  className="object-cover"
                />
                {/* Online indicator */}
                <div
                  className="absolute"
                  style={{
                    bottom: 0,
                    right: 0,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#00C853",
                    border: "2px solid rgba(15, 15, 20, 0.95)",
                  }}
                />
              </div>
              <div className="flex flex-col items-start">
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  Ajouter
                </span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
                  via Robin
                </span>
              </div>
            </button>

            {/* Right zone — PrismaFlux P logo → open menu */}
            <button
              onClick={() => openOverlay("menu")}
              className="flex items-center justify-center px-5 py-3 transition-all active:scale-95"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: 36,
                  height: 36,
                  background: "rgba(255, 23, 68, 0.15)",
                  border: "1px solid rgba(255, 23, 68, 0.25)",
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#FF1744",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  P
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Robin overlay — vehicle add flow */}
      <BlurOverlay isOpen={activeOverlay === "robin"} onClose={closeOverlay}>
        <div className="robin-flow-panel">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div className="flex items-center gap-2">
              <div
                className="rounded-full overflow-hidden"
                style={{ width: 28, height: 28, background: "rgba(255,23,68,0.15)" }}
              >
                <Image src="/copilotes/robin.png" alt="Robin" width={28} height={28} />
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
                Nouveau véhicule
              </span>
            </div>
            <button
              onClick={closeOverlay}
              className="flex items-center justify-center rounded-full"
              style={{
                width: 32,
                height: 32,
                background: "rgba(255,255,255,0.08)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1 }}>✕</span>
            </button>
          </div>
          {/* Vehicle creation flow will be rendered here in Phase 3 */}
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div
              className="flex items-center justify-center rounded-full mb-4"
              style={{ width: 64, height: 64, background: "rgba(255,23,68,0.12)" }}
            >
              <Image src="/copilotes/robin.png" alt="Robin" width={48} height={48} />
            </div>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#fff", textAlign: "center" }}>
              Robin est prêt
            </p>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                textAlign: "center",
                marginTop: 8,
                lineHeight: 1.5,
              }}
            >
              Scannez un document technique ou prenez des photos du véhicule pour commencer.
            </p>
          </div>
        </div>
      </BlurOverlay>

      {/* Menu overlay */}
      <BlurOverlay isOpen={activeOverlay === "menu"} onClose={closeOverlay}>
        <MenuOverlay />
      </BlurOverlay>
    </>
  );
}
