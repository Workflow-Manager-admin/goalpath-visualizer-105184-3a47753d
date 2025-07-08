import React, { useState } from "react";
import "../styles/theme.css";

/**
 * RoadmapCanvas displays goal nodes in columns by status.
 * Nodes can be dragged between columns.
 * @param {object} props
 * @param {array} props.goals - The array of goal objects
 * @param {function} props.onEdit - Called when editing a goal
 * @param {function} props.onMove - Called when a goal is moved (id, newStatus)
 */
 // PUBLIC_INTERFACE
function RoadmapCanvas({ goals, onEdit, onMove }) {
  // Drag state
  const [drag, setDrag] = useState({ goal: null, from: "", over: "" });

  // Columns
  const statuses = [
    { key: "planned", label: "Planned", color: "var(--primary-color)" },
    { key: "in-progress", label: "In Progress", color: "var(--secondary-color)" },
    { key: "done", label: "Completed", color: "var(--accent-color)" }
  ];

  // Count progress
  const total = (goals||[]).length;
  const done = (goals||[]).filter(g => g.status === "done").length;
  const progress = total ? Math.round((done/total)*100) : 0;

  // Drag handlers
  const handleDragStart = (goal, from) => {
    setDrag({ goal, from, over: "" });
  };
  const handleDragEnd = () => setDrag({ goal: null, from: "", over: "" });
  const handleDragOver = status => e => {
    e.preventDefault();
    setDrag(d => ({ ...d, over: status }));
  };
  const handleDrop = status => e => {
    e.preventDefault();
    if (drag.goal && status !== drag.goal.status && onMove) {
      onMove(drag.goal, status);
    }
    setDrag({ goal: null, from: "", over: "" });
  };

  return (
    <div className="surface-card" style={{
      display: "flex", flexDirection: "column", gap: 30, paddingTop: 24, minHeight: 360
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 18, marginBottom: 10, justifyContent: "space-between"
      }}>
        <h2 style={{
          fontWeight: 700, fontSize: 24, margin: 0, color: "var(--primary-color)"
        }}>Roadmap</h2>
        <div style={{
          flex: 1, marginLeft: 16, marginRight: 12,
          alignSelf: "center", display: "flex", alignItems: "center", gap:12
        }}>
          <span style={{
            fontWeight: 400, fontSize: 14, color: "#adb6bb"
          }}>Progress:</span>
          <div style={{
            height: 15, width: 110, borderRadius: 14, background: "#e0e5ea", position: "relative", overflow: "hidden"
          }}>
            <div style={{
              background: "linear-gradient(90deg, var(--secondary-color), var(--accent-color))",
              width: `${progress}%`, height: "100%", borderRadius: 14, transition: "width 0.25s"
            }}></div>
          </div>
          <span style={{
            fontWeight: 600, fontSize: 14, marginLeft: 5, color: "#4e6271"
          }}>{progress}%</span>
        </div>
      </div>
      <div style={{
        display: "flex", gap: 30, justifyContent: "space-between", flexWrap: "wrap"
      }}>
        {statuses.map((col) => (
          <div
            key={col.key}
            onDragOver={handleDragOver(col.key)}
            onDrop={handleDrop(col.key)}
            style={{
              flex: 1, minWidth: 180, margin: 4,
              background: drag.over === col.key ? "#f4f7fd" : "transparent",
              borderRadius: "18px",
              transition: "background 0.15s"
            }}
          >
            <div style={{
              marginBottom: 10, fontWeight: 600, color: col.color, fontSize: 17, minHeight: 22
            }}>{col.label}</div>
            <div style={{ 
              display:"flex", flexDirection:"column", gap: 13
            }}>
              {(goals||[]).filter(g=>g.status===col.key).map(goal => (
                <div
                  key={goal.id}
                  draggable
                  onDragStart={() => handleDragStart(goal, col.key)}
                  onDragEnd={handleDragEnd}
                  className="soft-shadow rounded"
                  style={{
                    cursor: "grab",
                    userSelect: "none",
                    background: "#fff",
                    borderLeft: `6px solid ${col.color}`,
                    padding: "16px 18px",
                    borderRadius: "12px",
                    boxShadow: drag.goal?.id === goal.id ? "0 3px 20px rgba(0,87,217,0.10)" : "var(--shadow-light)",
                    opacity: drag.goal?.id === goal.id ? 0.68 : 1,
                    fontWeight: 500,
                    color: "#363e47",
                    marginRight: 3,
                    marginBottom: 2,
                    minHeight: 56,
                    display: "flex", flexDirection: "row",alignItems:"center"
                  }}
                  onClick={() => onEdit(goal)}
                  tabIndex={0}
                  aria-label={`Edit goal: ${goal.title}`}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16 }}>
                      {goal.title}
                    </div>
                    {goal.description && (
                      <div style={{
                        fontSize: 13, color: "#869ab3", fontWeight: 400, marginTop: 3, textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"
                      }}>{goal.description}</div>
                    )}
                  </div>
                  <div style={{ marginLeft: 10, fontSize: 19, color: col.color }}>
                    {col.key === "done" ? "✔️" : col.key === "in-progress" ? "⏳" : "📝"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadmapCanvas;
