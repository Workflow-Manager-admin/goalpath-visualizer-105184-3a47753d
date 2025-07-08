import React from "react";
import "../styles/theme.css";

// PUBLIC_INTERFACE
/**
 * Top header displaying dashboard name, section, and user info.
 * Fixed at top, soft shadow, minimalist layout.
 */
function TopHeader({ section, user }) {
  return (
    <header className="dashboard-header">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{
          fontWeight: 600, fontSize: 19, color: "var(--primary-color)"
        }}>GoalPath</span>
        {section && (
          <span style={{
            marginLeft: 16, fontSize: 16,
            color: "var(--secondary-color)", fontWeight: 500, letterSpacing: "0.02em"
          }}>{section}</span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{
          fontWeight: 500, fontSize: 15, color: "var(--text-primary)",
          letterSpacing: "0.01em"
        }}>
          {user?.name ? (
            <>{user.name} <span style={{fontWeight: 400, color: "#aaa"}}>({user.email})</span></>
          ) : "User"}
        </span>
        <span style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "var(--secondary-color)", display: "inline-flex",
          alignItems: "center", justifyContent: "center", color: "#fff",
          fontSize: 19, fontWeight: 600
        }}>
          {user?.avatar ? <img alt="avatar" src={user.avatar} style={{
            borderRadius: "50%", width: "100%", height: "100%", objectFit: "cover"
          }}/> : (user?.name ? user.name[0] : "U")}
        </span>
      </div>
    </header>
  );
}

export default TopHeader;
