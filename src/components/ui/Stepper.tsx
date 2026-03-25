"use client";

interface StepDef {
  label: string;
}

interface StepperProps {
  steps: StepDef[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%", padding: "0 4px" }}>
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        const isFuture = i > currentStep;

        const dotColor = isCompleted
          ? "#00C853"
          : isActive
          ? "#FF1744"
          : "rgba(255,255,255,0.2)";

        const labelColor = isCompleted
          ? "#00C853"
          : isActive
          ? "#FFFFFF"
          : "rgba(255,255,255,0.3)";

        const lineColor = isCompleted
          ? "#00C853"
          : "rgba(255,255,255,0.1)";

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              flex: i < steps.length - 1 ? 1 : "none",
            }}
          >
            {/* Dot + label */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 32 }}>
              <div
                style={{
                  width: isActive ? 12 : 8,
                  height: isActive ? 12 : 8,
                  borderRadius: "50%",
                  background: dotColor,
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? "0 0 0 4px rgba(255,23,68,0.2)" : "none",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 600 : 400,
                  color: labelColor,
                  whiteSpace: "nowrap",
                  transition: "color 0.2s ease",
                }}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting line */}
            {i < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: lineColor,
                  marginInline: 4,
                  marginBottom: 18,
                  borderRadius: 1,
                  transition: "background 0.2s ease",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
