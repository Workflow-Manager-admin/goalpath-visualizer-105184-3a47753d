import React from "react";
import "../styles/theme.css";

// PUBLIC_INTERFACE
/**
 * Sidebar navigation for dashboard layout.
 * Collapses to icons on mobile. Primary color, soft shadows, rounded corners.
 */
function Sidebar({ onNav, active }) {
  const navItems = [
    { key: "roadmap", label: "Roadmap", icon: "🛣️" },
    { key: "goals", label: "Goals", icon: "🎯" },
    { key: "progress", label: "Progress", icon: "📈" },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div style={{
        fontWeight: 700, letterSpacing: "0.03em",
        fontSize: 22, marginBottom: 28, display: "flex", alignItems: "center", gap: 6
      }}>
        <span style={{
          width: 36, height: 36, background: "var(--accent-color)", borderRadius: "50%",
          display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#191c23"
        }}>🌟</span>
        <span style={{ fontSize: 18, letterSpacing: "0.02em" }}>GoalPath</span>
      </div>
      <nav style={{ width: "100%" }}>
        {navItems.map((item) => (
          <div
            key={item.key}
            className="sidebar-nav-item"
            onClick={() => onNav && onNav(item.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 32px",
              borderRadius: "11px",
              margin: "4px 16px",
              background: active === item.key ? "rgba(255,255,255,0.16)" : "transparent",
              fontWeight: active === item.key ? 600 : 400,
              fontSize: 17,
              cursor: "pointer",
              transition: "background 0.15s, color 0.18s"
            }}
            aria-current={active === item.key ? "page" : undefined}
            tabIndex="0"
          >
            <span style={{ fontSize: 20, width: 28, textAlign: "center" }}>{item.icon}</span>
            <span className="sidebar-nav-label" style={{
              display: "inline-block"
            }}>{item.label}</span>
          </div>
        ))}
      </nav>
      <div style={{ flex: 1 }}></div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.64)", marginBottom: 4 }}>
        <span>&copy; 2024</span>
      </div>
    </aside>
  );
}

export default Sidebar;
