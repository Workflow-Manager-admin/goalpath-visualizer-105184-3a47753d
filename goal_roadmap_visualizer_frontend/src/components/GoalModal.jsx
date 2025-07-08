import React, { useState, useEffect } from "react";
import "../styles/theme.css";

/**
 * Goal Modal for adding or editing goal nodes.
 * @param {object} props
 * @param {boolean} props.visible - Show or hide the modal
 * @param {function} props.onClose - Called when user closes the modal
 * @param {function} props.onSave - Called with goal object
 * @param {object} props.goal - Initial goal data (or null for new)
 */
 // PUBLIC_INTERFACE
function GoalModal({ visible, onClose, onSave, goal }) {
  const [form, setForm] = useState({
    title: "", description: "", status: "planned"
  });

  useEffect(() => {
    if (goal)
      setForm({
        title: goal.title || "",
        description: goal.description || "",
        status: goal.status || "planned"
      });
    else setForm({ title: "", description: "", status: "planned" });
  }, [goal, visible]);

  if (!visible) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = e => {
    e.preventDefault();
    if (form.title.trim()) {
      onSave({ ...goal, ...form });
    }
  };

  return (
    <div className="modal-overlay" tabIndex={-1} aria-modal="true" role="dialog">
      <div className="modal-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontWeight: 700, margin: 0, color: "var(--primary-color)" }}>
            {goal ? "Edit Goal" : "Add Goal"}
          </h2>
          <button
            aria-label="Close modal"
            style={{
              background: "none", border: "none", fontSize: 21, cursor: "pointer", color: "#aaa", lineHeight: 1
            }}
            onClick={onClose}
          >✕</button>
        </div>
        <form onSubmit={submit}>
          <input
            className="input"
            name="title"
            type="text"
            placeholder="Goal Title"
            required
            value={form.title}
            onChange={handleChange}
            autoFocus
          />
          <textarea
            className="input"
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            rows={3}
            maxLength={400}
          />
          <label style={{
            fontWeight: 500, fontSize: 13, color: "var(--secondary-color)", marginBottom: 4, display: "block"
          }}>
            Status:
          </label>
          <select
            className="input"
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{ marginBottom: 20, fontSize: 15 }}
          >
            <option value="planned">Planned</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Completed</option>
          </select>
          <div style={{display:"flex",justifyContent:"flex-end",gap:10}}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-accent">{goal ? "Save" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GoalModal;
