import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import RoadmapCanvas from "./RoadmapCanvas";
import GoalModal from "./GoalModal";
import "../styles/theme.css";

// PUBLIC_INTERFACE
/**
 * Main dashboard layout for GoalPath.
 * - Side nav, header, roadmap canvas, modals.
 * - Responsive, minimalist, modern.
 */
function DashboardLayout() {
  // Demo in-memory goals, will be fetched/managed in full app
  const [goals, setGoals] = useState([
    { id: 1, title: "Launch MVP", status: "planned", description: "Ship first working version" },
    { id: 2, title: "Get first 100 users", status: "in-progress", description: "Beta testers on board!" },
    { id: 3, title: "SEO Optimization", status: "done", description: "" },
  ]);
  const [modal, setModal] = useState({ open: false, goal: null });
  const [nav, setNav] = useState("roadmap");

  // Simulated user info
  const user = { name: "Julie Carter", email: "julie@example.com", avatar: "" };

  const handleOpenModal = (goal = null) => setModal({ open: true, goal });
  const handleCloseModal = () => setModal({ open: false, goal: null });

  const handleSaveGoal = (goal) => {
    if (goal.id) {
      setGoals(gs => gs.map(g => g.id === goal.id ? { ...goal } : g));
    } else {
      setGoals(gs => [...gs, { ...goal, id: Math.max(...gs.map(g=>g.id), 0) + 1 }]);
    }
    handleCloseModal();
  };
  const handleMoveGoal = (goal, newStatus) => {
    setGoals(gs => gs.map(g => g.id === goal.id ? { ...g, status: newStatus } : g));
  };

  return (
    <div className="dashboard-root">
      <Sidebar onNav={setNav} active={nav} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopHeader section={
          nav === "roadmap" ? "Roadmap" : nav.charAt(0).toUpperCase() + nav.slice(1)
        } user={user} />
        <main className="dashboard-content">
          {nav === "roadmap" && (
            <>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                <button
                  className="btn btn-accent"
                  onClick={() => handleOpenModal()}
                  style={{ minWidth: 120 }}
                >+ Add Goal</button>
              </div>
              <RoadmapCanvas
                goals={goals}
                onEdit={handleOpenModal}
                onMove={handleMoveGoal}
              />
            </>
          )}
          {nav === "goals" && (
            <div className="surface-card" style={{textAlign:"center",padding:40}}>
              <h2 style={{margin:0, color:"var(--primary-color)"}}>Goals</h2>
              <p style={{color:"#aaa"}}>List and filter all your goals here (coming soon!)</p>
            </div>
          )}
          {nav === "progress" && (
            <div className="surface-card" style={{textAlign:"center",padding:40}}>
              <h2 style={{margin:0, color:"var(--primary-color)"}}>Progress Overview</h2>
              <p style={{color:"#aaa"}}>Visualizations coming soon.</p>
            </div>
          )}
        </main>
      </div>
      <GoalModal
        visible={modal.open}
        goal={modal.goal}
        onClose={handleCloseModal}
        onSave={handleSaveGoal}
      />
    </div>
  );
}

export default DashboardLayout;
