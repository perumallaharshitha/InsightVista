// src/files/cards/Kpi.jsx
import React from 'react';
import './Kpi.css'; // We'll create this CSS next

/**
 * A Key Performance Indicator (KPI) card component.
 * @param {string} title - The title of the KPI (e.g., "Total Sales").
 * @param {string} value - The formatted value (e.g., "$1,234,567").
 * @param {string} [icon] - Optional emoji or icon for visual flair.
 */
export default function Kpi({ title, value, icon = '✨' }) {
  // TODO: Replace simple display with an actual number animation library later
  
  return (
    <div className="kpi-card">
      <div className="kpi-icon-container">
        <span className="kpi-icon">{icon}</span>
      </div>
      <div className="kpi-content">
        <p className="kpi-title">{title}</p>
        <h3 className="kpi-value">{value}</h3>
      </div>
    </div>
  );
}