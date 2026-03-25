"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  Camera,
  Globe,
  BarChart2,
  LayoutGrid,
} from "lucide-react";

const TABS = [
  { href: "/robin",   icon: Zap,         label: "Robin" },
  { href: "/lana",    icon: Camera,      label: "Lana" },
  { href: "/marcus",  icon: Globe,       label: "Marcus" },
  { href: "/pierre",  icon: BarChart2,   label: "Pierre" },
  { href: "/catalog", icon: LayoutGrid,  label: "Catalogue" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around"
      style={{
        height: "var(--bottomnav-h)",
        background: "rgba(6, 6, 8, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid var(--color-border)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {TABS.map(({ href, icon: Icon, label }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 flex-1 py-2 transition-opacity"
            style={{ opacity: active ? 1 : 0.45 }}
          >
            <Icon
              size={20}
              style={{ color: active ? "var(--color-brand)" : "var(--color-text)" }}
              strokeWidth={active ? 2.5 : 1.8}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: active ? 600 : 400,
                color: active ? "var(--color-brand)" : "var(--color-text)",
                letterSpacing: "0.02em",
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
