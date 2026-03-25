"use client";

import Link from "next/link";
import { useOverlay } from "./OverlayContext";
import { COPILOTS } from "@/lib/copilots";
import { Settings, User, ChevronRight } from "lucide-react";

const MENU_LINKS = [
  { href: "/robin", label: "Robin", subtitle: "Multidiffusion" },
  { href: "/catalog", label: "Catalogue", subtitle: "Vos véhicules" },
  { href: "/dashboard", label: "Tableau de bord", subtitle: "Activité des copilotes" },
  { href: "/lana", label: "Lana", subtitle: "Studio véhicule" },
  { href: "/marcus", label: "Marcus", subtitle: "Performance web" },
  { href: "/pierre", label: "Pierre", subtitle: "Reporting" },
];

export default function MenuOverlay() {
  const { closeOverlay } = useOverlay();

  return (
    <div className="menu-overlay theme-light">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 40,
              height: 40,
              background: "#FF1744",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            P
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>PrismaFlux Auto</p>
            <p style={{ fontSize: 12, color: "#6B7280" }}>Jean-Denis • Garage du Parc</p>
          </div>
        </div>
        <button
          onClick={closeOverlay}
          className="flex items-center justify-center rounded-full"
          style={{
            width: 32,
            height: 32,
            background: "#F3F4F6",
          }}
        >
          <span style={{ fontSize: 18, color: "#6B7280", lineHeight: 1 }}>✕</span>
        </button>
      </div>

      {/* Navigation links */}
      <div className="px-3 pb-2">
        {MENU_LINKS.map((link) => {
          const copilot = COPILOTS.find(
            (c) => `/${c.id}` === link.href || link.href === `/${c.id.split("-")[0]}`
          );

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeOverlay}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors"
              style={{ textDecoration: "none" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#F3F4F6";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Copilot avatar or icon */}
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: copilot
                    ? `${copilot.color}18`
                    : "#F3F4F6",
                  color: copilot?.color || "#6B7280",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {copilot?.initials || link.label.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>{link.label}</p>
                <p style={{ fontSize: 12, color: "#9CA3AF" }}>{link.subtitle}</p>
              </div>
              <ChevronRight size={16} style={{ color: "#D1D5DB" }} />
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#E5E7EB", margin: "4px 20px" }} />

      {/* Account section */}
      <div className="px-3 pt-2 pb-6">
        <Link
          href="/settings"
          onClick={closeOverlay}
          className="flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{ textDecoration: "none" }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 36, height: 36, background: "#F3F4F6" }}
          >
            <Settings size={16} style={{ color: "#6B7280" }} />
          </div>
          <div className="flex-1">
            <p style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Paramètres</p>
            <p style={{ fontSize: 12, color: "#9CA3AF" }}>Compte et préférences</p>
          </div>
          <ChevronRight size={16} style={{ color: "#D1D5DB" }} />
        </Link>
      </div>
    </div>
  );
}
