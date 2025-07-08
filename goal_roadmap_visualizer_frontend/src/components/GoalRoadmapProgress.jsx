import React from "react";
import "../styles/theme.css";

// PUBLIC_INTERFACE
/**
 * Prominent "My Goal Roadmap" section.
 * Shows a visually engaging horizontal progress bar and overall status.
 * Responsive, modern, and matches palette.
 * @param {object} props
 * @param {number} progress - Percentage of goals completed (0-100).
 */
function GoalRoadmapProgress({ progress }) {
  // Clamp progress to 0-100
  const pct = Math.round(Math.max(0, Math.min(100, progress || 0)));
  return (
    <section
      className="goal-roadmap-highlight"
      style={{
        background: "linear-gradient(90deg, var(--primary-color) 60%, var(--secondary-color) 100%)",
        borderRadius: "28px",
        boxShadow: "0 5px 28px rgba(0,87,217,0.12)",
        padding: "32px 30px 26px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: 12,
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        minHeight: 110,
      }}
    >
      <h1
        style={{
          fontSize: "2.1rem",
          fontWeight: 800,
          margin: "0 0 18px 0",
          letterSpacing: "0.01em",
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.07)",
        }}
      >
        My Goal Roadmap
      </h1>
      <div
        style={{
          width: "100%",
          maxWidth: 540,
          margin: "3px 0 0 0",
        }}
      >
        <div
          aria-label={`Roadmap progress: ${pct}%`}
          style={{
            width: "100%",
            height: 22,
            background: "rgba(255,255,255,0.18)",
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 10,
            boxShadow: "0 1.5px 9px 0 rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background:
                "linear-gradient(90deg, var(--accent-color), #fff0ad 90%)",
              borderRadius: 14,
              transition: "width 0.29s cubic-bezier(.54,.15,.34,1.08)",
              boxShadow: pct > 0 ? "0 1.5px 6px #FFD70030" : "none",
            }}
          />
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginTop: 4,
        }}>
          <span style={{
            fontWeight: 500,
            fontSize: 16,
            color: "rgba(255,255,255,0.75)",
            letterSpacing: ".01em",
            marginRight: 8,
          }}>
            {pct === 100 ? "🎉 All goals complete!" : "Progress"}
          </span>
          <span style={{
            fontWeight: "bold",
            fontSize: 19,
            color: "#fff",
            textShadow: "0 2px 8px #0075ED33",
          }}>{pct}%</span>
        </div>
      </div>
      {/* Decorative path dots (subtle) */}
      <svg
        viewBox="0 0 400 22"
        width="100%"
        height="22"
        style={{
          position: "absolute",
          bottom: 12,
          left: 32,
          right: 0,
          opacity: 0.23,
          pointerEvents: "none",
          zIndex: 0,
          display:"none" // Not currently used, for future possible curved path
        }}
        aria-hidden
      >
        <circle cx={20} cy={11} r={5} fill="#FFD700" />
        <circle cx={110} cy={11} r={4} fill="#fff" />
        <circle cx={200} cy={11} r={5} fill="#fff6cc" />
        <circle cx={290} cy={11} r={3.5} fill="#fff" />
        <circle cx={380} cy={11} r={5} fill="#FFD700" />
      </svg>
      <style>
        {`
        @media (max-width: 700px) {
          .goal-roadmap-highlight {
            padding: 19px 7vw 15px 7vw !important;
            border-radius: 16px !important;
            min-height: 72px !important;
          }
          .goal-roadmap-highlight h1 { font-size: 1.16rem !important; margin-bottom: 9px !important;}
        }
        `}
      </style>
    </section>
  );
}

export default GoalRoadmapProgress;
