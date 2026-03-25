"use client";

import { useState } from "react";

interface PipelineResult {
  success: boolean;
  prompt?: { imagePrompt: string; theme: string; style: string };
  content?: { title: string; description: string; altText: string };
  linkedin?: { post: string };
  pin?: { pinId: string; createdAt: string };
  error?: string;
  durationMs: number;
  imageSizeBytes?: number;
  note?: string;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PipelineResult | null>(null);

  async function runTest() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/marketing/pinterest/test", {
        method: "POST",
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({
        success: false,
        error: err instanceof Error ? err.message : String(err),
        durationMs: 0,
      });
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        color: "#e4e4e7",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #27272a",
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, #eab308, #f59e0b)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 700,
            color: "#0a0a0f",
          }}
        >
          P
        </div>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
            PrismaFlux — Agent Pinterest
          </h1>
          <p style={{ fontSize: 13, color: "#71717a", margin: 0 }}>
            Publication automatique quotidienne a 18h CET
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {/* Status Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <StatusCard label="Pipeline" value="GPT-4o + gpt-image-1" color="#22c55e" />
          <StatusCard label="Format" value="JPEG 1024x1536" color="#3b82f6" />
          <StatusCard label="Cron" value="18h CET / jour" color="#eab308" />
          <StatusCard label="Plateformes" value="Pinterest + LinkedIn" color="#ec4899" />
        </div>

        {/* Endpoints */}
        <section style={{ marginBottom: 32 }}>
          <h2
            style={{
              fontSize: 15,
              fontWeight: 600,
              marginBottom: 12,
              color: "#a1a1aa",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Endpoints API
          </h2>
          <div
            style={{
              background: "#18181b",
              borderRadius: 12,
              border: "1px solid #27272a",
              overflow: "hidden",
            }}
          >
            <EndpointRow
              method="GET"
              path="/api/marketing/pinterest/boards"
              desc="Lister les tableaux Pinterest"
            />
            <EndpointRow
              method="POST"
              path="/api/marketing/pinterest/generate"
              desc="Pipeline complet (auth requise)"
            />
            <EndpointRow
              method="POST"
              path="/api/marketing/pinterest/test"
              desc="Test sans publier"
            />
          </div>
        </section>

        {/* Test Button */}
        <section style={{ marginBottom: 32 }}>
          <h2
            style={{
              fontSize: 15,
              fontWeight: 600,
              marginBottom: 12,
              color: "#a1a1aa",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Test du pipeline
          </h2>
          <button
            onClick={runTest}
            disabled={loading}
            style={{
              background: loading
                ? "#27272a"
                : "linear-gradient(135deg, #eab308, #f59e0b)",
              color: loading ? "#71717a" : "#0a0a0f",
              border: "none",
              borderRadius: 10,
              padding: "12px 28px",
              fontSize: 15,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Generation en cours..." : "Lancer un test (dry-run)"}
          </button>
          <p style={{ fontSize: 13, color: "#71717a", marginTop: 8 }}>
            Genere image + contenu Pinterest + post LinkedIn sans publier.
            Necessite OPENAI_API_KEY.
          </p>
        </section>

        {/* Result */}
        {result && (
          <section>
            <h2
              style={{
                fontSize: 15,
                fontWeight: 600,
                marginBottom: 12,
                color: "#a1a1aa",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Resultat
            </h2>
            <div
              style={{
                background: "#18181b",
                borderRadius: 12,
                border: `1px solid ${result.success ? "#22c55e33" : "#ef444433"}`,
                padding: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: result.success ? "#22c55e" : "#ef4444",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontWeight: 600 }}>
                  {result.success ? "Succes" : "Echec"}
                </span>
                <span style={{ color: "#71717a", fontSize: 13 }}>
                  — {(result.durationMs / 1000).toFixed(1)}s
                </span>
              </div>

              {result.error && (
                <div
                  style={{
                    background: "#1c1012",
                    border: "1px solid #ef444433",
                    borderRadius: 8,
                    padding: 12,
                    color: "#fca5a5",
                    fontSize: 14,
                    fontFamily: "monospace",
                  }}
                >
                  {result.error}
                </div>
              )}

              {result.prompt && (
                <ResultBlock title="Theme" value={result.prompt.theme} />
              )}
              {result.content && (
                <>
                  <ResultBlock title="Titre Pinterest" value={result.content.title} />
                  <ResultBlock
                    title="Description Pinterest"
                    value={result.content.description}
                  />
                </>
              )}
              {result.linkedin && (
                <ResultBlock title="Post LinkedIn" value={result.linkedin.post} />
              )}
              {result.imageSizeBytes && (
                <ResultBlock
                  title="Image"
                  value={`${(result.imageSizeBytes / 1024).toFixed(0)} KB — JPEG 1024x1536`}
                />
              )}
              {result.note && (
                <p
                  style={{
                    color: "#eab308",
                    fontSize: 13,
                    marginTop: 12,
                    fontStyle: "italic",
                  }}
                >
                  {result.note}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Env Vars */}
        <section style={{ marginTop: 32 }}>
          <h2
            style={{
              fontSize: 15,
              fontWeight: 600,
              marginBottom: 12,
              color: "#a1a1aa",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Variables d&apos;environnement
          </h2>
          <div
            style={{
              background: "#18181b",
              borderRadius: 12,
              border: "1px solid #27272a",
              overflow: "hidden",
            }}
          >
            <EnvRow name="OPENAI_API_KEY" desc="GPT-4o + gpt-image-1" required />
            <EnvRow
              name="PINTEREST_ACCESS_TOKEN"
              desc="developers.pinterest.com"
              required
            />
            <EnvRow name="PINTEREST_BOARD_ID" desc="ID du tableau cible" required />
            <EnvRow name="CRON_SECRET" desc="Auth Vercel Cron" required />
            <EnvRow
              name="NOTIFICATION_WEBHOOK_URL"
              desc="Email/Slack via webhook"
              required={false}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#18181b",
        borderRadius: 12,
        border: "1px solid #27272a",
        padding: "16px 20px",
      }}
    >
      <p style={{ fontSize: 12, color: "#71717a", margin: 0, marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ fontSize: 15, fontWeight: 600, margin: 0, color }}>{value}</p>
    </div>
  );
}

function EndpointRow({
  method,
  path,
  desc,
}: {
  method: string;
  path: string;
  desc: string;
}) {
  const methodColor = method === "GET" ? "#22c55e" : "#3b82f6";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderBottom: "1px solid #27272a",
      }}
    >
      <span
        style={{
          background: methodColor + "22",
          color: methodColor,
          fontSize: 11,
          fontWeight: 700,
          padding: "2px 8px",
          borderRadius: 4,
          fontFamily: "monospace",
        }}
      >
        {method}
      </span>
      <code style={{ fontSize: 13, color: "#e4e4e7" }}>{path}</code>
      <span style={{ fontSize: 13, color: "#71717a", marginLeft: "auto" }}>
        {desc}
      </span>
    </div>
  );
}

function ResultBlock({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ marginTop: 12 }}>
      <p
        style={{
          fontSize: 12,
          color: "#71717a",
          margin: 0,
          marginBottom: 4,
          fontWeight: 600,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: 14,
          margin: 0,
          color: "#d4d4d8",
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function EnvRow({
  name,
  desc,
  required,
}: {
  name: string;
  desc: string;
  required: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 16px",
        borderBottom: "1px solid #27272a",
      }}
    >
      <code style={{ fontSize: 13, color: "#eab308", fontWeight: 600 }}>
        {name}
      </code>
      <span style={{ fontSize: 13, color: "#71717a" }}>{desc}</span>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 11,
          color: required ? "#f87171" : "#71717a",
          fontWeight: 600,
        }}
      >
        {required ? "requis" : "optionnel"}
      </span>
    </div>
  );
}
