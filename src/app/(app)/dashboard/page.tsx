"use client";

import DashboardFeed from "@/components/dashboard/DashboardFeed";
import CopilotBar from "@/components/navigation/CopilotBar";

export default function DashboardPage() {
  return (
    <div
      className="theme-light"
      style={{ minHeight: "100%", padding: "20px 16px 120px" }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#111827",
          marginBottom: 16,
        }}
      >
        Tableau de bord
      </h1>

      {/* Activity feed */}
      <DashboardFeed />

      {/* Copilot bar */}
      <CopilotBar />
    </div>
  );
}
