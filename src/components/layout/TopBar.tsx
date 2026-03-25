"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export default function TopBar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4"
      style={{
        height: "var(--topbar-h)",
        background: "rgba(6, 6, 8, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* Logo */}
      <Link href="/robin" className="flex items-center gap-2">
        <div
          className="flex items-center justify-center font-black text-white text-base rounded-lg"
          style={{
            width: 32,
            height: 32,
            background: "var(--color-brand)",
            fontSize: 15,
            letterSpacing: "-0.02em",
          }}
        >
          P
        </div>
        <span
          className="font-semibold text-white"
          style={{ fontSize: 15, letterSpacing: "-0.03em" }}
        >
          PrismaFlux
        </span>
      </Link>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <button
          className="flex items-center justify-center rounded-xl transition-colors"
          style={{
            width: 36,
            height: 36,
            background: "transparent",
            color: "var(--color-text-muted)",
          }}
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        {/* Avatar placeholder */}
        <button
          className="flex items-center justify-center rounded-full font-semibold text-white text-xs"
          style={{
            width: 32,
            height: 32,
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            fontSize: 11,
          }}
          aria-label="Mon compte"
        >
          JD
        </button>
      </div>
    </header>
  );
}
